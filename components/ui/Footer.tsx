import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      className="mt-20">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-black text-xl mb-3">
              <Zap size={20} style={{ color: 'var(--accent)' }} />
              <span className="gradient-text">PrintForge</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Professional large-format printing with AI-powered design tools.
              Next-day production. Ships anywhere in the US.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Products</h4>
            <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              {['Vinyl Banners', 'Retractable Banners', 'Table Covers', 'Event Tents', 'Step & Repeat', 'Feather Flags', 'Wall Graphics'].map(p => (
                <li key={p}><Link href="/products" className="hover:text-white transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Services</h4>
            <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><Link href="/designer" className="hover:text-white transition-colors">AI Design Studio</Link></li>
              <li><Link href="/designer" className="hover:text-white transition-colors">Upload Artwork</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Rush Printing</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Info</h4>
            <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }} className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"
          style={{ color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} PrintForge. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span style={{ color: 'var(--accent)' }}>Next.js · Stripe · OpenAI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
