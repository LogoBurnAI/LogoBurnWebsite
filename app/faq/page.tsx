const FAQS = [
  {
    q: 'How long does production take?',
    a: 'Most products ship next business day. Event tents and wall graphics take 2-3 business days. Rush options are available — contact us if you have a tight deadline.',
  },
  {
    q: 'What file formats do you accept for uploads?',
    a: 'We accept PNG, JPG, and PDF files. For best results, upload at 300 DPI or higher in RGB color mode. We recommend a minimum resolution of 150 DPI for large-format prints.',
  },
  {
    q: 'Can I get a proof before printing?',
    a: 'Yes! Our Design Studio shows you a live mockup preview before you order. For uploaded artwork, we\'ll email you a digital proof within 1 business hour of your order.',
  },
  {
    q: 'What if my order arrives damaged or incorrect?',
    a: 'We guarantee 100% satisfaction. If your order arrives damaged or we made an error, we will reprint and reship at no charge. Just email us a photo within 5 business days of delivery.',
  },
  {
    q: 'Do you ship outside the US?',
    a: 'Currently we ship within the continental United States only. Hawaii and Alaska may have extended shipping times.',
  },
  {
    q: 'What is your return policy?',
    a: 'Because all products are custom printed, we cannot accept returns due to customer design errors. However, if we made a production mistake, we will make it right immediately.',
  },
  {
    q: 'Can I order multiple quantities?',
    a: 'Absolutely. Use the quantity selector on any product page. Bulk orders of 10+ units may qualify for additional discounts — contact us for a quote.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also check the status in your Orders dashboard at any time.',
  },
  {
    q: 'What is the AI Design Studio?',
    a: 'Our AI Design Studio uses OpenAI\'s DALL-E 3 to generate custom artwork from your text description. Just type what you want (e.g. "bold red grand opening banner with fireworks") and we\'ll generate a print-ready design in seconds. You can then add text overlays and preview it on the actual product.',
  },
  {
    q: 'Are colors guaranteed to match my screen?',
    a: 'We print in full CMYK color. Colors may appear slightly different on screen vs. print due to monitor calibration differences. For exact color matching, please specify Pantone colors in your order notes.',
  },
]

export default function FAQPage() {
  return (
    <div className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-black mb-3">Frequently Asked Questions</h1>
        <p className="mb-12" style={{ color: 'var(--text-muted)' }}>
          Everything you need to know about PrintForge.
        </p>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="card p-6">
              <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="card p-8 text-center mt-10"
          style={{ background: 'rgba(233,69,96,0.08)', border: '1px solid rgba(233,69,96,0.2)' }}>
          <h3 className="font-bold text-xl mb-3">Still have questions?</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Email us at <a href="mailto:hello@printforge.com" style={{ color: 'var(--accent)' }}>hello@printforge.com</a> and we'll get back to you within 1 business hour.
          </p>
        </div>
      </div>
    </div>
  )
}
