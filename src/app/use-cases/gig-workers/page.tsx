import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Gig Workers — Income & Tax Tracking",
  description: "HoursFlow helps gig workers track what they earn, keep a budget and bills, see a tax report with GST/HST summaries, and create invoices.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/gig-workers' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/gig-workers" },
    { "@type": "ListItem", "position": 3, "name": "Gig Workers", "item": "https://shiftflowx.net/use-cases/gig-workers" }
  ]
};

export default function GigWorkersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">HoursFlow</Link>
            <span>/</span>
            <Link href="/use-cases/gig-workers" className="text-white/60">Gig Workers</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#D63C6B]/15 text-[#D63C6B] px-3 py-1 rounded-full text-sm font-semibold">
            For Gig Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            The Income Tracking App Built for Gig Workers
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Whether you drive for Uber, deliver for DoorDash, or complete tasks on TaskRabbit — HoursFlow helps you track your earnings, keep your bills in view, and prepare for tax time.
          </p>

          {/* Who it&apos;s for */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Built for Every Type of Gig Worker</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              HoursFlow is designed for the modern gig economy worker — someone who earns income across multiple platforms, faces unpredictable pay schedules, and has to handle their own taxes without employer support. This includes:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Rideshare drivers (Uber, Lyft, Via)",
                "Food and grocery delivery workers (DoorDash, Instacart, Uber Eats, Grubhub)",
                "Freelance task workers (TaskRabbit, Handy, Thumbtack)",
                "On-demand service providers (Rover, Wag, Care.com)",
                "Marketplace sellers and resellers",
                "Remote and on-site gig workers across all industries"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/60">
                  <span className="text-[#D63C6B]">—</span>{item}
                </li>
              ))}
            </ul>
          </section>

          {/* Problems solved */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Problems HoursFlow Solves for Gig Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Income Tracking", desc: "Log your shifts and see what you earned. The free plan tracks one employer and keeps your last 30 days of records. Pro adds full history, multiple employers, exports, tax reports, scanning and import." },
                { title: "Tax Report", desc: "Subscribers get a tax report with GST/HST summaries, so your numbers are ready at tax time. Figures are estimates, not tax advice." },
                { title: "Budget and Bill Reminders", desc: "Irregular income makes planning hard. Keep a budget and get reminders before your bills are due. Included on the free plan." },
                { title: "Receipt Scanning", desc: "Scan receipts with your camera. Text is read on your device. Available to subscribers." },
                { title: "Invoices", desc: "Working directly with clients outside platforms? Create invoices for your work. Available to subscribers." },
                { title: "Payday", desc: "Set your pay schedule and see when your next payday is due. Estimates are not a guarantee." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Gig Worker FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Can I track income from multiple gig apps in one place?", a: "Pro includes multiple employers, so you can keep each source of income separate. The free plan tracks one employer." },
                { q: "How does HoursFlow help with taxes?", a: "Subscribers get a tax report with GST/HST summaries. HoursFlow provides estimates only and is not tax advice." },
                { q: "Can I scan my receipts?", a: "Yes, with a subscription. Receipt scanning reads text on your device." },
                { q: "Do I need a subscription?", a: "No. The free plan covers shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days of records." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Track every dollar you earn</h3>
            <p className="text-white/60 mb-6">Free 7-day trial. Cancel anytime.</p>
            <Link href="/download" className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors">
              Download HoursFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
