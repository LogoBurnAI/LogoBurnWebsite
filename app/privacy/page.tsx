export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black mb-3">Privacy Policy</h1>
        <p className="mb-10" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>

        {[
          { title: 'Information We Collect', body: 'We collect your name, email, phone number, shipping address, and payment information when you place an order. We also collect design files and prompts you submit through our Design Studio.' },
          { title: 'How We Use Your Information', body: 'We use your information to fulfill orders, send order confirmations and tracking updates, and provide customer support. We do not sell your personal information to third parties.' },
          { title: 'Payment Security', body: 'All payments are processed securely by Stripe. We never store your full credit card number on our servers. Stripe is PCI DSS Level 1 compliant.' },
          { title: 'Design Files', body: 'Design files and AI-generated artwork you create are stored temporarily for order fulfillment and for 30 days after delivery for reprint purposes, then deleted.' },
          { title: 'Cookies', body: 'We use cookies to maintain your shopping cart and improve your experience. We do not use advertising trackers or sell data to ad networks.' },
          { title: 'Contact', body: 'For privacy questions, email us at privacy@printforge.com.' },
        ].map(s => (
          <div key={s.title} className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>{s.title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
