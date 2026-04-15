'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="section">
      <div className="container text-center py-24">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-black mb-4">Something went wrong</h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button className="btn-primary" onClick={() => reset()}>
          Try Again
        </button>
      </div>
    </div>
  )
}
