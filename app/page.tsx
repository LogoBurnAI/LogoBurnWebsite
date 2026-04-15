import Link from 'next/link'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { Zap, Clock, Shield, Truck, ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #0a0a12 0%, #1a0a1e 50%, #0a0a12 100%)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(233,69,96,0.15)', border: '1px solid rgba(233,69,96,0.3)', color: 'var(--accent)' }}>
            <Sparkles size={14} />
            AI-Powered Design Studio
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Print That
            <span className="gradient-text block">Makes an Impact</span>
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-muted)' }}>
            Design stunning banners, signs, and displays with our AI-powered studio.
            Next-day production, shipped directly to your door.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-primary flex items-center gap-2 text-lg">
              Browse Products <ArrowRight size={20} />
            </Link>
            <Link href="/designer" className="btn-secondary flex items-center gap-2 text-lg">
              <Sparkles size={20} /> Open Design Studio
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { n: '40,000+', label: 'Happy Customers' },
              { n: 'Next Day', label: 'Turnaround' },
              { n: '500k sqft', label: 'Production Space' },
              { n: '100%', label: 'Color Guaranteed' },
            ].map(stat => (
              <div key={stat.label} className="card p-6 hover:border-accent">
                <div className="text-3xl font-black gradient-text">{stat.n}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 className="text-3xl font-black text-center mb-12">Why PrintForge?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'AI Design Studio', desc: 'Generate designs from text prompts or upload your own artwork' },
              { icon: Clock, title: 'Next-Day Production', desc: 'Most orders ship the next business day at no extra charge' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'We reprint or refund if you\'re not 100% satisfied' },
              { icon: Truck, title: 'Direct Shipping', desc: 'Ships straight to your door, anywhere in the US' },
            ].map(f => (
              <div key={f.title} className="card p-6 text-center">
                <f.icon size={32} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black">Shop by Category</h2>
            <Link href="/products" className="btn-secondary">View All</Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/products?category=${cat}`}
                className="card p-8 text-center font-bold text-lg group cursor-pointer">
                <div style={{ color: 'var(--text-muted)' }} className="group-hover:text-white transition-colors">
                  {cat}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="card p-12 text-center" style={{
            background: 'linear-gradient(135deg, rgba(233,69,96,0.15), rgba(245,166,35,0.1))',
            border: '1px solid rgba(233,69,96,0.3)'
          }}>
            <Sparkles size={48} className="mx-auto mb-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-4xl font-black mb-4">Start Designing Now</h2>
            <p className="text-xl mb-8" style={{ color: 'var(--text-muted)' }}>
              Type a prompt, generate a design, and order in minutes.
            </p>
            <Link href="/designer" className="btn-primary text-lg">
              Open AI Design Studio →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
