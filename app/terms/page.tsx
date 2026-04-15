export default function TermsPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black mb-3">Terms of Service</h1>
        <p className="mb-10" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>

        {[
          { title: 'Acceptance of Terms', body: 'By using PrintForge, you agree to these Terms of Service. If you do not agree, please do not use our service.' },
          { title: 'Custom Products', body: 'All products are custom made to your specifications. By placing an order, you confirm that you have the right to use all artwork, logos, and text included in your design, and that your design does not infringe any third-party intellectual property rights.' },
          { title: 'Order Accuracy', body: 'You are responsible for reviewing and approving your design before placing an order. We print exactly what you submit. We are not responsible for errors in customer-supplied artwork or designs approved by the customer.' },
          { title: 'Payment', body: 'Full payment is required at the time of order. All prices are in USD. We accept all major credit cards via Stripe.' },
          { title: 'Refunds & Reprints', body: 'We do not offer refunds on custom products ordered correctly. If we make a production error, we will reprint at no charge. Reprints are processed within 2 business days.' },
          { title: 'Limitation of Liability', body: 'PrintForge liability is limited to the value of the order placed. We are not liable for consequential, incidental, or indirect damages.' },
          { title: 'Changes', body: 'We may update these terms at any time. Continued use of our service constitutes acceptance of the updated terms.' },
          { title: 'Contact', body: 'Questions about these terms? Email legal@printforge.com.' },
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
