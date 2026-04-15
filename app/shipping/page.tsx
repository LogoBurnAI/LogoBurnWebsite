export default function ShippingPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black mb-3">Shipping Policy</h1>
        <p className="mb-10" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().getFullYear()}</p>

        {[
          {
            title: 'Production Time',
            body: 'Most orders enter production the same business day if placed before 12pm PST. Standard turnaround is next business day. Event tents, wall graphics, and floor graphics require 2-3 business days.',
          },
          {
            title: 'Shipping Methods & Rates',
            body: 'We offer free standard shipping on all orders over $150. Orders under $150 ship for a flat rate of $12.99. Expedited shipping is available at checkout for an additional fee.',
          },
          {
            title: 'Delivery Times',
            body: 'Standard shipping takes 2-5 business days after production. Expedited shipping takes 1-2 business days. We ship via UPS and FedEx.',
          },
          {
            title: 'Shipping Area',
            body: 'We ship to all 50 US states. Hawaii and Alaska may require additional transit time. We do not currently ship internationally.',
          },
          {
            title: 'Tracking',
            body: 'You will receive a tracking number by email once your order ships. You can also view tracking status in your Orders dashboard.',
          },
          {
            title: 'Damaged Shipments',
            body: 'If your order arrives damaged in transit, please photograph the damage and email us within 5 business days. We will arrange a replacement at no cost to you.',
          },
        ].map(section => (
          <div key={section.title} className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>{section.title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
