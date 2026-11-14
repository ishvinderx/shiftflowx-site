import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Hourly Workers — Hours, Pay & Paycheck Check",
  description: "HoursFlow helps hourly workers track shifts and earnings, see their payday, keep bills in view, and check a paycheque against their logged hours.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/hourly-workers' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/hourly-workers" },
    { "@type": "ListItem", "position": 3, "name": "Hourly Workers", "item": "https://shiftflowx.net/use-cases/hourly-workers" }
  ]
};

export default function HourlyWorkersPage() {
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
            <Link href="/use-cases/hourly-workers" className="text-white/60">Hourly Workers</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#14B8A6]/15 text-[#14B8A6] px-3 py-1 rounded-full text-sm font-semibold">
            For Hourly & Shift Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Track Your Hours and Check Your Paycheque
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Log every shift you work and see what you have earned. With a subscription, the paycheck tracker checks your paycheque against the hours you logged.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">The Hourly Worker Pay Problem</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Most hourly workers have no simple way to check a paycheque against the time they actually worked. A clear record of your own hours is the first step.
            </p>
            <p className="text-white/60 leading-relaxed">
              HoursFlow keeps a record of your shifts and earnings. With a subscription, the paycheck tracker checks a paycheque against your logged hours so you can see if an amount looks short.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features for Hourly Workers</h2>
            <div className="space-y-4">
              {[
                { title: "Shift and Earnings Tracking", desc: "Log each shift with start and end time. HoursFlow shows what you have earned. The free plan tracks one employer and keeps your last 30 days of records. Pro adds full history, multiple employers, exports, tax reports, scanning and import." },
                { title: "Paycheck Tracker", desc: "Checks a paycheque against the hours you logged. Available to subscribers." },
                { title: "Payday", desc: "Set your pay schedule and see when your next payday is due. Estimates are not a guarantee of what your employer will pay." },
                { title: "Payslip Scanning", desc: "Scan your payslip with your camera. Text is read on your device. Available to subscribers." },
                { title: "Budget and Bill Reminders", desc: "Plan around payday with a budget and reminders before bills are due. Included on the free plan." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">FAQ for Hourly Workers</h2>
            <dl className="space-y-6">
              {[
                { q: "What does the paycheck tracker do?", a: "It checks a paycheque against the hours you logged in HoursFlow, so you can see if the amount looks short. It is a Pro feature." },
                { q: "Can I use HoursFlow if I work in retail, hospitality, or manufacturing?", a: "Yes. HoursFlow works for any hourly worker regardless of industry." },
                { q: "Is HoursFlow free?", a: "The free plan covers shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days of records. Pro adds more." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 border border-[#14B8A6]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Never get underpaid again</h3>
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
