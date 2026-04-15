'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS, CATEGORIES, getRetailPrice } from '@/lib/products'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div className="section">
      <div className="container">
        <h1 className="text-4xl font-black mb-2">All Products</h1>
        <p className="mb-10" style={{ color: 'var(--text-muted)' }}>
          Professional large-format printing. Next-day turnaround on most items.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 18px' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => {
            const minPrice = Math.min(...product.sizes.map(s => getRetailPrice(s.b2signPrice)))
            return (
              <Link key={product.id} href={`/products/${product.id}`} className="card p-0 overflow-hidden group block">
                {/* Mockup placeholder */}
                <div className="h-48 flex items-center justify-center text-5xl font-black"
                  style={{ background: 'var(--surface2)', color: 'var(--border)' }}>
                  {product.category === 'Banners' ? '🎯' :
                   product.category === 'Displays' ? '🖼️' :
                   product.category === 'Table Covers' ? '🎪' :
                   product.category === 'Canopies' ? '⛺' :
                   product.category === 'Flags' ? '🏁' :
                   product.category === 'Wall Art' ? '🖼️' : '✨'}
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--accent)' }}>
                    {product.category}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>From </span>
                      <span className="font-black text-lg gradient-text">${minPrice}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                      Customize <ArrowRight size={14} />
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                    {product.turnaround} production
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
