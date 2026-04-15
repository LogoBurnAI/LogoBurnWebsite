import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section">
      <div className="container text-center py-24">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-3xl font-black mb-4">Page Not Found</h1>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="btn-primary">← Back to Home</Link>
      </div>
    </div>
  )
}
