import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Contractors — Hours & Invoicing",
  description: "ShiftFlow helps independent contractors track their hours and earnings, create invoices, and prepare a tax report with GST/HST summaries.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/contractors' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/contractors" },
    { "@type": "ListItem", "position": 3, "name": "Contractors", "item": "https://shiftflowx.net/use-cases/contractors" }
  ]
};

export default function ContractorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <Link href="/use-cases/contractors" className="text-white/60">Contractors</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#F59E0B]/15 text-[#F59E0B] px-3 py-1 rounded-full text-sm font-semibold">
            For Independent Contractors
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            ShiftFlow for Independent Contractors
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Track your hours and earnings, create invoices, and keep tax time in view — without the spreadsheet headache.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Built for How Contractors Actually Work</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Independent contractors often juggle multiple clients, different billing rates, and a tax burden that most employees never think about.
            </p>
            <p className="text-white/60 leading-relaxed">
              ShiftFlow helps by keeping your hours, earnings and invoices together, and giving subscribers a tax report with GST/HST summaries.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features for Contractors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Hours and Earnings", desc: "Log your hours and see what you have earned. The free plan tracks one employer and keeps your last 30 days of records. Pro adds full history, multiple employers, exports, tax reports, scanning and import." },
                { title: "Invoices", desc: "Create invoices for your clients and export them. Available to subscribers." },
                { title: "Multiple Employers", desc: "Pro supports more than one employer, so you can keep clients or contracts separate." },
                { title: "Tax Report", desc: "Subscribers get a tax report with GST/HST summaries. Figures are estimates, not tax advice." },
                { title: "Receipt Scanning", desc: "Scan receipts for your records. Text is read on your device. Available to subscribers." },
                { title: "Reports", desc: "Export reports as PDF or CSV. Available to subscribers." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Contractor FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Where do I create invoices?", a: "In the ShiftFlow app. Invoicing is a Pro feature." },
                { q: "Does ShiftFlow help me with GST/HST?", a: "Subscribers get a tax report with GST/HST summaries. These are estimates and not tax advice." },
                { q: "Can I scan my receipts?", a: "Yes, with a subscription. Text is read on your device." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Run your contracting business smarter</h3>
            <p className="text-white/60 mb-6">Free 7-day trial. Cancel anytime.</p>
            <Link href="/download" className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors">
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
