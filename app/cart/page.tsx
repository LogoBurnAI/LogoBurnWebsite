'use client'
import { useCartStore } from '@/lib/cart-store'
import { Trash2, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="section">
        <div className="container text-center py-20">
          <ShoppingCart size={64} className="mx-auto mb-6" style={{ color: 'var(--text-muted)' }} />
          <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
            Design something amazing to get started.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="btn-secondary">Browse Products</Link>
            <Link href="/designer" className="btn-primary flex items-center gap-2">
              <Sparkles size={18} /> Open Design Studio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="text-4xl font-black mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="card p-5">
                <div className="flex gap-5">
                  {/* Mockup thumbnail */}
                  <div className="w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center text-3xl"
                    style={{ background: 'var(--surface2)' }}>
                    {item.designDataUrl
                      ? <img src={item.designDataUrl} alt="design" className="w-full h-full object-cover rounded-lg" />
                      : '🖼️'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-lg">{item.product.name}</h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {item.selectedSize.label} · {item.selectedFinish.label}
                        </p>
                        {item.designPrompt && (
                          <p className="text-xs mt-1 truncate" style={{ color: 'var(--accent)' }}>
                            ✨ AI: "{item.designPrompt}"
                          </p>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                        style={{ color: 'var(--text-muted)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button className="btn-secondary w-8 h-8 flex items-center justify-center text-sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>−</button>
                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                        <button className="btn-secondary w-8 h-8 flex items-center justify-center text-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <span className="font-black text-xl gradient-text">
                        ${(item.retailPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart}
              className="text-sm self-start px-4 py-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--surface2)' }}>
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-bold text-xl mb-6">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${(item.retailPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                  <span>{total() >= 150 ? 'Free' : 'Calculated at checkout'}</span>
                </div>
                <div className="flex justify-between font-black text-lg mt-4">
                  <span>Total</span>
                  <span className="gradient-text">${total().toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 text-lg">
                Checkout <ArrowRight size={20} />
              </Link>

              <Link href="/products" className="btn-secondary w-full flex items-center justify-center mt-3 text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
