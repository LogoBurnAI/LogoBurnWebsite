'use client'
import Link from 'next/link'
import { ShoppingCart, Zap, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { useState } from 'react'

export function Navbar() {
  const itemCount = useCartStore(s => s.itemCount())
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      className="sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <Zap size={22} style={{ color: 'var(--accent)' }} />
          <span className="gradient-text">PrintForge</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products" className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>Products</Link>
          <Link href="/designer" className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>Design Studio</Link>
          <Link href="/orders" className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>My Orders</Link>
        </div>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                style={{ background: 'var(--accent)' }}>
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium"
          style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/products" onClick={() => setOpen(false)} className="pt-4">Products</Link>
          <Link href="/designer" onClick={() => setOpen(false)}>Design Studio</Link>
          <Link href="/orders" onClick={() => setOpen(false)}>My Orders</Link>
        </div>
      )}
    </nav>
  )
}
