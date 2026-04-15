import Link from 'next/link'
import { Product } from '@/types'
import { getRetailPrice } from '@/lib/products'
import { ArrowRight, Clock } from 'lucide-react'

const CATEGORY_EMOJI: Record<string, string> = {
  'Banners': '🎯',
  'Displays': '🖼️',
  'Table Covers': '🎪',
  'Canopies': '⛺',
  'Flags': '🏁',
  'Wall Art': '🖌️',
  'Specialty': '✨',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const minPrice = Math.min(...product.sizes.map(s => getRetailPrice(s.b2signPrice)))

  return (
    <Link href={`/products/${product.id}`} className="card p-0 overflow-hidden group block transition-all duration-200">
      {/* Thumbnail */}
      <div className="h-44 flex items-center justify-center text-5xl"
        style={{ background: 'var(--surface2)' }}>
        {CATEGORY_EMOJI[product.category] || '📦'}
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
          {product.category}
        </div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{product.name}</h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>From </span>
            <span className="font-black text-xl gradient-text">${minPrice}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Customize <ArrowRight size={14} />
          </span>
        </div>

        <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Clock size={11} />
          {product.turnaround}
        </div>
      </div>
    </Link>
  )
}
