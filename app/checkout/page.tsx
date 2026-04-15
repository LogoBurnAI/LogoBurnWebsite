'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import { useRouter } from 'next/navigation'
import { ShippingAddress, Order, OrderItem } from '@/types'
import { getRetailPrice } from '@/lib/products'
import { Lock, CreditCard, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

type Step = 'shipping' | 'payment' | 'confirm'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [step, setStep] = useState<Step>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)

  const [shipping, setShipping] = useState<ShippingAddress>({
    name: '', line1: '', line2: '', city: '', state: '', zip: '', country: 'US'
  })
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Simplified card fields (Stripe Elements would replace these in production)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')

  const subtotal = total()
  const shippingCost = subtotal >= 150 ? 0 : 12.99
  const tax = subtotal * 0.08
  const orderTotal = subtotal + shippingCost + tax

  async function handlePlaceOrder() {
    setIsProcessing(true)
    try {
      // 1. Create payment intent
      const piRes = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: orderTotal,
          customerEmail: email,
          orderId: `PF-${Date.now()}`,
        }),
      })
      const { clientSecret } = await piRes.json()

      // 2. Build order object
      const orderId = `PF-${Date.now()}`
      const order: Order = {
        id: orderId,
        customerName: shipping.name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: shipping,
        items: items.map(item => ({
          productName: item.product.name,
          productId: item.product.id,
          size: item.selectedSize.label,
          finish: item.selectedFinish.label,
          quantity: item.quantity,
          b2signSku: item.selectedSize.b2signSku,
          b2signWholesalePrice: item.selectedSize.b2signPrice + item.selectedFinish.priceAdder,
          retailPrice: item.retailPrice,
          designFileUrl: item.designDataUrl || '',
          designPrompt: item.designPrompt || undefined,
        })),
        subtotal,
        tax,
        shipping: shippingCost,
        total: orderTotal,
        stripePaymentIntentId: clientSecret,
        status: 'paid',
        createdAt: new Date().toISOString(),
      }

      // 3. Save order to localStorage (replace with Supabase in production)
      const existingOrders = JSON.parse(localStorage.getItem('printforge-orders') || '[]')
      existingOrders.push(order)
      localStorage.setItem('printforge-orders', JSON.stringify(existingOrders))

      // 4. Auto-export order package (ZIP with print files + B2Sign order sheet)
      const { exportOrderPackage } = await import('@/lib/order-export')
      const designDataUrls: Record<string, string> = {}
      items.forEach(item => {
        if (item.designDataUrl) designDataUrls[item.product.id] = item.designDataUrl
      })
      await exportOrderPackage(order, designDataUrls)

      // 5. Clear cart and redirect
      clearCart()
      toast.success('Order placed! Your B2Sign package is downloading.')
      router.push(`/orders?success=${orderId}`)
    } catch (err: any) {
      toast.error(err.message || 'Checkout failed')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="section">
      <div className="container max-w-5xl">
        <h1 className="text-4xl font-black mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          {(['shipping', 'payment', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === s ? 'text-white' : 'text-gray-500'
              }`} style={{ background: step === s ? 'var(--accent)' : 'var(--surface2)' }}>
                {i + 1}
              </div>
              <span className="text-sm capitalize font-medium"
                style={{ color: step === s ? 'var(--text)' : 'var(--text-muted)' }}>{s}</span>
              {i < 2 && <div className="w-8 h-px" style={{ background: 'var(--border)' }} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">

            {step === 'shipping' && (
              <div className="card p-6">
                <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Truck size={20} style={{ color: 'var(--accent)' }} /> Shipping Information
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                      <input value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Email</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" type="tel" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Address Line 1</label>
                    <input value={shipping.line1} onChange={e => setShipping({...shipping, line1: e.target.value})} placeholder="123 Main St" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Address Line 2 (Optional)</label>
                    <input value={shipping.line2} onChange={e => setShipping({...shipping, line2: e.target.value})} placeholder="Apt, Suite, etc." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>City</label>
                      <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} placeholder="Los Angeles" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>State</label>
                      <input value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} placeholder="CA" maxLength={2} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>ZIP Code</label>
                    <input value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} placeholder="90210" />
                  </div>
                  <button className="btn-primary" onClick={() => setStep('payment')}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="card p-6">
                <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <CreditCard size={20} style={{ color: 'var(--accent)' }} /> Payment
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)', color: 'var(--accent)' }}>
                    🔒 In production, replace this with Stripe Elements for secure card handling.
                    Your Stripe keys in .env.local power the backend payment intent.
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Card Number</label>
                    <input value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Expiry</label>
                      <input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>CVC</label>
                      <input value={cardCvc} onChange={e => setCardCvc(e.target.value)} placeholder="123" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button className="btn-secondary" onClick={() => setStep('shipping')}>← Back</button>
                    <button className="btn-primary flex-1" onClick={() => setStep('confirm')}>
                      Review Order →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="card p-6">
                <h2 className="font-bold text-xl mb-6">Confirm Order</h2>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: 'var(--surface2)' }}>
                    <h4 className="font-bold mb-1 text-sm">Ship To</h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {shipping.name}<br />
                      {shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ''}<br />
                      {shipping.city}, {shipping.state} {shipping.zip}
                    </p>
                  </div>
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name} · {item.selectedSize.label} × {item.quantity}</span>
                      <span className="font-bold">${(item.retailPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)' }}>
                  <p className="text-sm" style={{ color: 'var(--accent)' }}>
                    📦 After payment, a ZIP package will auto-download with your print files and B2Sign order sheet — ready to submit to your white label account.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="btn-secondary" onClick={() => setStep('payment')}>← Back</button>
                  <button
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : (
                      <><Lock size={16} /> Place Order · ${orderTotal.toFixed(2)}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="card p-5 h-fit sticky top-24">
            <h3 className="font-bold mb-4">Summary</h3>
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span style={{ color: 'var(--text-muted)' }} className="truncate mr-2">
                  {item.product.name} ×{item.quantity}
                </span>
                <span>${(item.retailPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} className="mt-4 pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-lg mt-2">
                <span>Total</span>
                <span className="gradient-text">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
