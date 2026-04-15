'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Order } from '@/types'
import { exportOrderPackage } from '@/lib/order-export'
import { Download, CheckCircle, Clock, Package, Truck, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  pending:         { label: 'Pending',          color: '#888',      icon: Clock },
  paid:            { label: 'Paid – Ready to Submit', color: '#f5a623', icon: CheckCircle },
  sent_to_b2sign:  { label: 'Sent to B2Sign',   color: '#3b82f6',   icon: Package },
  in_production:   { label: 'In Production',    color: '#8b5cf6',   icon: RefreshCw },
  shipped:         { label: 'Shipped',           color: '#10b981',   icon: Truck },
  delivered:       { label: 'Delivered',         color: '#22c55e',   icon: CheckCircle },
}

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const successOrderId = searchParams.get('success')
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('printforge-orders') || '[]')
    setOrders(stored.reverse()) // newest first
  }, [])

  function updateStatus(orderId: string, newStatus: Order['status']) {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    )
    setOrders(updated)
    localStorage.setItem('printforge-orders', JSON.stringify([...updated].reverse()))
    toast.success('Status updated')
  }

  function updateB2SignNumber(orderId: string, b2signNum: string) {
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, b2signOrderNumber: b2signNum, status: 'sent_to_b2sign' as const } : o
    )
    setOrders(updated)
    localStorage.setItem('printforge-orders', JSON.stringify([...updated].reverse()))
    toast.success('B2Sign order number saved!')
  }

  async function handleRedownload(order: Order) {
    await exportOrderPackage(order, {})
    toast.success('Package downloaded!')
  }

  return (
    <div className="section">
      <div className="container">
        {successOrderId && (
          <div className="p-5 rounded-xl mb-8 flex items-start gap-4"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
            <CheckCircle size={24} style={{ color: '#22c55e', flexShrink: 0 }} />
            <div>
              <h3 className="font-bold text-lg" style={{ color: '#22c55e' }}>Order Placed Successfully!</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Order <strong>{successOrderId}</strong> is confirmed. Your B2Sign package ZIP downloaded automatically.
                Log in to your B2Sign white label account and submit it now.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black">Your Orders</h1>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p style={{ color: 'var(--text-muted)' }}>Your completed orders will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map(order => {
              const statusCfg = STATUS_CONFIG[order.status]
              const StatusIcon = statusCfg.icon
              const b2signCost = order.items.reduce((s, i) => s + i.b2signWholesalePrice * i.quantity, 0)
              const profit = order.total - b2signCost - (order.shipping || 0)

              return (
                <div key={order.id} className="card p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-black text-lg">{order.id}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {new Date(order.createdAt).toLocaleString()} · {order.customerName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ background: `${statusCfg.color}20`, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}>
                      <StatusIcon size={14} />
                      {statusCfg.label}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-5 flex flex-col gap-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm p-3 rounded-lg"
                        style={{ background: 'var(--surface2)' }}>
                        <div>
                          <span className="font-medium">{item.productName}</span>
                          <span style={{ color: 'var(--text-muted)' }}> · {item.size} · {item.finish} × {item.quantity}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${(item.retailPrice * item.quantity).toFixed(2)}</div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            SKU: {item.b2signSku}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financials */}
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="p-3 rounded-lg text-center" style={{ background: 'var(--surface2)' }}>
                      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Customer Paid</div>
                      <div className="font-black gradient-text">${order.total.toFixed(2)}</div>
                    </div>
                    <div className="p-3 rounded-lg text-center" style={{ background: 'var(--surface2)' }}>
                      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>B2Sign Cost</div>
                      <div className="font-black" style={{ color: '#f87171' }}>~${b2signCost.toFixed(2)}</div>
                    </div>
                    <div className="p-3 rounded-lg text-center" style={{ background: 'var(--surface2)' }}>
                      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Your Profit</div>
                      <div className="font-black" style={{ color: '#22c55e' }}>~${profit.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* B2Sign number input */}
                  {!order.b2signOrderNumber && (
                    <div className="mb-4 p-4 rounded-xl" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
                      <p className="text-sm font-medium mb-2" style={{ color: '#f5a623' }}>
                        📋 Enter B2Sign order number after submitting:
                      </p>
                      <div className="flex gap-2">
                        <input
                          placeholder="B2Sign order #"
                          className="flex-1"
                          id={`b2sign-${order.id}`}
                        />
                        <button className="btn-primary px-4"
                          onClick={() => {
                            const el = document.getElementById(`b2sign-${order.id}`) as HTMLInputElement
                            if (el?.value) updateB2SignNumber(order.id, el.value)
                          }}>
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  {order.b2signOrderNumber && (
                    <div className="mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                      B2Sign Order #: <strong style={{ color: 'var(--text)' }}>{order.b2signOrderNumber}</strong>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleRedownload(order)}
                      className="btn-secondary flex items-center gap-2 text-sm">
                      <Download size={14} /> Re-download Package
                    </button>
                    <select
                      className="text-sm"
                      style={{ width: 'auto', padding: '8px 12px' }}
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value as Order['status'])}>
                      <option value="paid">Paid</option>
                      <option value="sent_to_b2sign">Sent to B2Sign</option>
                      <option value="in_production">In Production</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
