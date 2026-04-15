'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Sparkles, Upload, Download, ShoppingCart, Loader, RefreshCw, Type, Image as ImageIcon, Trash } from 'lucide-react'
import { PRODUCTS, getRetailPrice } from '@/lib/products'
import { useCartStore } from '@/lib/cart-store'
import { CartItem } from '@/types'
import toast from 'react-hot-toast'

type DesignMode = 'ai-prompt' | 'upload'

export default function DesignerPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Product selection
  const [selectedProductId, setSelectedProductId] = useState(searchParams.get('product') || PRODUCTS[0].id)
  const [selectedSizeId, setSelectedSizeId] = useState(searchParams.get('size') || '')
  const [selectedFinishId, setSelectedFinishId] = useState(searchParams.get('finish') || '')

  const product = PRODUCTS.find(p => p.id === selectedProductId)!
  const selectedSize = product.sizes.find(s => s.id === selectedSizeId) || product.sizes[0]
  const selectedFinish = product.finishes.find(f => f.id === selectedFinishId) || product.finishes[0]

  // Design state
  const [designMode, setDesignMode] = useState<DesignMode>('ai-prompt')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [overlayText, setOverlayText] = useState('')
  const [quantity, setQuantity] = useState(1)

  const activeImage = generatedImageUrl || uploadedImageUrl

  // Draw canvas mockup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    // Background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, 800, 400)

    if (activeImage) {
      const img = new window.Image()
      img.onload = () => {
        // Draw design image centered
        const aspectRatio = img.width / img.height
        let drawW = 760, drawH = 360
        if (aspectRatio > drawW / drawH) drawH = drawW / aspectRatio
        else drawW = drawH * aspectRatio
        const x = (800 - drawW) / 2
        const y = (400 - drawH) / 2
        ctx.drawImage(img, x, y, drawW, drawH)

        // Overlay text if any
        if (overlayText) {
          ctx.font = 'bold 48px Arial'
          ctx.fillStyle = 'white'
          ctx.textAlign = 'center'
          ctx.strokeStyle = 'black'
          ctx.lineWidth = 3
          ctx.strokeText(overlayText, 400, 360)
          ctx.fillText(overlayText, 400, 360)
        }

        // Product label watermark
        ctx.font = '14px Arial'
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.textAlign = 'left'
        ctx.fillText(`${product.name} – ${selectedSize.label}`, 16, 390)
      }
      img.src = activeImage
    } else {
      // Placeholder
      ctx.fillStyle = '#2a2a3e'
      ctx.fillRect(20, 20, 760, 360)
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = '#444'
      ctx.textAlign = 'center'
      ctx.fillText('Your design will appear here', 400, 185)
      ctx.font = '16px Arial'
      ctx.fillStyle = '#333'
      ctx.fillText('Generate with AI or upload your artwork →', 400, 220)
    }
  }, [activeImage, overlayText, product, selectedSize])

  async function handleGenerateDesign() {
    if (!prompt.trim()) {
      toast.error('Please enter a design prompt')
      return
    }
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          productType: product.name,
          size: selectedSize.label,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setGeneratedImageUrl(data.imageDataUrl)
      setUploadedImageUrl(null)
      toast.success('Design generated!')
    } catch (err: any) {
      toast.error(err.message || 'Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUploadedImageUrl(ev.target?.result as string)
      setGeneratedImageUrl(null)
      toast.success('Artwork uploaded!')
    }
    reader.readAsDataURL(file)
  }

  function getCanvasDataUrl() {
    return canvasRef.current?.toDataURL('image/png') || null
  }

  function handleDownloadMockup() {
    const dataUrl = getCanvasDataUrl()
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `printforge-mockup-${product.id}.png`
    a.click()
  }

  function handleAddToCart() {
    if (!activeImage) {
      toast.error('Please generate or upload a design first')
      return
    }
    const retailPrice = getRetailPrice(selectedSize.b2signPrice + selectedFinish.priceAdder)
    const item: CartItem = {
      id: Math.random().toString(36).slice(2),
      product,
      selectedSize,
      selectedFinish,
      quantity,
      designDataUrl: getCanvasDataUrl(),
      designPrompt: prompt || null,
      retailPrice,
      notes: '',
    }
    addItem(item)
    toast.success('Added to cart!')
    router.push('/cart')
  }

  const retailPrice = getRetailPrice(selectedSize.b2signPrice + selectedFinish.priceAdder)

  return (
    <div className="section">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">
            <span className="gradient-text">AI Design Studio</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Generate artwork with AI or upload your own, then order direct.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Product selector */}
            <div className="card p-5">
              <h3 className="font-bold mb-3">Product</h3>
              <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="mb-3">
                {PRODUCTS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <select value={selectedSize.id} onChange={e => setSelectedSizeId(e.target.value)} className="mb-3">
                {product.sizes.map(s => (
                  <option key={s.id} value={s.id}>{s.label} — ${getRetailPrice(s.b2signPrice)}</option>
                ))}
              </select>
              <select value={selectedFinish.id} onChange={e => setSelectedFinishId(e.target.value)}>
                {product.finishes.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Design mode toggle */}
            <div className="card p-5">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setDesignMode('ai-prompt')}
                  className={designMode === 'ai-prompt' ? 'btn-primary flex-1 flex items-center justify-center gap-2' : 'btn-secondary flex-1 flex items-center justify-center gap-2'}
                  style={{ padding: '10px' }}>
                  <Sparkles size={16} /> AI Generate
                </button>
                <button
                  onClick={() => setDesignMode('upload')}
                  className={designMode === 'upload' ? 'btn-primary flex-1 flex items-center justify-center gap-2' : 'btn-secondary flex-1 flex items-center justify-center gap-2'}
                  style={{ padding: '10px' }}>
                  <Upload size={16} /> Upload Art
                </button>
              </div>

              {designMode === 'ai-prompt' ? (
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
                    Describe your design
                  </label>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="e.g. Bold red and gold banner for a grand opening sale with fireworks and confetti"
                    rows={4}
                    className="mb-3"
                  />
                  <button
                    onClick={handleGenerateDesign}
                    disabled={isGenerating}
                    className="btn-primary w-full flex items-center justify-center gap-2">
                    {isGenerating ? (
                      <><Loader size={16} className="animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles size={16} /> Generate Design</>
                    )}
                  </button>
                  {generatedImageUrl && (
                    <button onClick={() => setGeneratedImageUrl(null)}
                      className="btn-secondary w-full mt-2 flex items-center justify-center gap-2 text-sm">
                      <RefreshCw size={14} /> Generate New Variation
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
                    Upload your artwork (PNG, JPG, PDF)
                  </label>
                  <input type="file" accept="image/*,.pdf" onChange={handleUpload}
                    className="mb-2 text-sm" style={{ padding: '8px' }} />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    For best results: 300 DPI minimum, RGB color mode
                  </p>
                </div>
              )}
            </div>

            {/* Text overlay */}
            <div className="card p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Type size={16} /> Add Text Overlay
              </h3>
              <input
                value={overlayText}
                onChange={e => setOverlayText(e.target.value)}
                placeholder="e.g. GRAND OPENING"
              />
            </div>

            {/* Order */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Order</h3>
                <span className="text-2xl font-black gradient-text">${(retailPrice * quantity).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <button className="btn-secondary w-10 h-10 flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span className="font-bold text-lg flex-1 text-center">{quantity}</span>
                <button className="btn-secondary w-10 h-10 flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary w-full flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={handleDownloadMockup} className="btn-secondary w-full mt-2 flex items-center justify-center gap-2 text-sm">
                <Download size={14} /> Download Mockup Preview
              </button>
            </div>
          </div>

          {/* Right: Canvas preview */}
          <div className="lg:col-span-2">
            <div className="card p-4 mb-4">
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Live Preview — {product.name} / {selectedSize.label}
              </div>
              <canvas
                ref={canvasRef}
                className="w-full rounded-lg"
                style={{ border: '1px solid var(--border)' }}
              />
            </div>

            {/* Prompt suggestions */}
            {designMode === 'ai-prompt' && (
              <div className="card p-5">
                <h4 className="font-bold mb-3 text-sm">💡 Prompt Ideas</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Bold sale banner with red and yellow, energetic',
                    'Elegant navy blue corporate event backdrop',
                    'Tropical themed summer festival with palm trees',
                    'Modern tech company minimalist white design',
                    'Rustic farm-to-table restaurant warm earthy tones',
                    'Neon cyberpunk grand opening night event',
                  ].map(suggestion => (
                    <button key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="text-xs px-3 py-2 rounded-lg transition-colors"
                      style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
