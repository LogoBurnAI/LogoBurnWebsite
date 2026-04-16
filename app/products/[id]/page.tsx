'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { getProductById, getRetailPrice } from '@/lib/products'
import { useCartStore } from '@/lib/cart-store'
import { CartItem } from '@/types'
import { Sparkles, ShoppingCart, Pencil, Clock, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const product = getProductById(params.id as string)
  const addItem = useCartStore(s => s.addItem)

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedFinish, setSelectedFinish] = useState(product?.finishes[0])
  const [quantity, setQuantity] = useState(1)

  if (!product || !selectedSize || !selectedFinish) {
    return <div className="section container">Product not found.</div>
  }

  const retailPrice = getRetailPrice(selectedSize.b2signPrice + selectedFinish.priceAdder)

  function handleAddToCart() {
    const item: CartItem = {
      id: Math.random().toString(36).slice(2),
      product,
      selectedSize,
      selectedFinish,
      quantity,
      designDataUrl: null,
      designPrompt: null,
      retailPrice,
      notes: '',
    }
    addItem(item)
    toast.success(`${product.name} added to cart!`)
  }

  function handleDesignAndBuy() {
    // Navigate to designer with product pre-selected
    router.push(`/designer?product=${product.id}&size=${selectedSize.id}&finish=${selectedFinish.id}`)
  }

  return (
    <div className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product visual */}
          <div className="card p-0 overflow-hidden">
            <div className="h-96 flex items-center justify-center text-8xl"
              style={{ background: 'var(--surface2)' }}>
              {product.category === 'Banners' ? '🎯' :
               product.category === 'Displays' ? '🖼️' :
               product.category === 'Table Covers' ? '🎪' :
               product.category === 'Canopies' ? '⛺' :
               product.category === 'Flags' ? '🏁' : '✨'}
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-2">Product Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <div><span className="font-medium" style={{ color: 'var(--text)' }}>Material:</span> {product.material}</div>
                <div><span className="font-medium" style={{ color: 'var(--text)' }}>Turnaround:</span> {product.turnaround}</div>
                <div><span className="font-medium" style={{ color: 'var(--text)' }}>Category:</span> {product.category}</div>
                <div><span className="font-medium" style={{ color: 'var(--text)' }}>Sizes:</span> {product.sizes.length} options</div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>{product.category}</div>
            <h1 className="text-3xl font-black mb-3">{product.name}</h1>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{product.description}</p>

            {/* Size selector */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Size</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map(size => (
                  <button key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-xl text-sm font-medium text-left transition-all ${
                      selectedSize.id === size.id
                        ? 'border-2'
                        : 'border'
                    }`}
                    style={{
                      background: 'var(--surface2)',
                      borderColor: selectedSize.id === size.id ? 'var(--accent)' : 'var(--border)',
                      color: selectedSize.id === size.id ? 'var(--accent)' : 'var(--text)',
                    }}>
                    <div className="flex items-center justify-between">
                      <span>{size.label}</span>
                      {selectedSize.id === size.id && <Check size={14} />}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      ${getRetailPrice(size.b2signPrice)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish selector */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Finish</h3>
              <div className="flex flex-col gap-2">
                {product.finishes.map(finish => (
                  <button key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className="p-3 rounded-xl text-sm text-left transition-all border"
                    style={{
                      background: 'var(--surface2)',
                      borderColor: selectedFinish.id === finish.id ? 'var(--accent)' : 'var(--border)',
                    }}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{finish.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {finish.priceAdder > 0 ? `+$${finish.priceAdder}` : 'Included'}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>{finish.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-bold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button className="btn-secondary w-10 h-10 flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button className="btn-secondary w-10 h-10 flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <span style={{ color: 'var(--text-muted)' }}>Total</span>
                <span className="text-3xl font-black gradient-text">
                  ${(retailPrice * quantity).toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3">
                <button onClick={handleDesignAndBuy} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Sparkles size={18} /> Design & Order
                </button>
                <button onClick={handleAddToCart} className="btn-secondary flex items-center justify-center gap-2 px-4">
                  <ShoppingCart size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Clock size={14} />
                {product.turnaround} production · Free shipping on orders over $150
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
