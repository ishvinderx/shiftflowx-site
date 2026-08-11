import type { Faq } from '@/lib/seo'

// Visible FAQ — must match the FAQPage schema 1:1 (pages pass the same array
// to faqSchema()).
export default function FaqSection({ faq }: { faq: Faq[] }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
      <div className="space-y-5">
        {faq.map((f) => (
          <div key={f.q}>
            <h3 className="text-white font-semibold mb-1.5">{f.q}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
