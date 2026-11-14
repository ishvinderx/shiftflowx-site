import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Nurses — Shift Tracker",
  description: "HoursFlow helps nurses and healthcare workers track their shifts and earnings, see payday, and keep bills in view. Multiple employers with Pro.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/nurses' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/nurses" },
    { "@type": "ListItem", "position": 3, "name": "Nurses & Healthcare Workers", "item": "https://shiftflowx.net/use-cases/nurses" }
  ]
};

export default function NursesPage() {
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
            <Link href="/use-cases/nurses" className="text-white/60">Nurses & Healthcare</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#22C55E]/15 text-[#22C55E] px-3 py-1 rounded-full text-sm font-semibold">
            For Nurses & Healthcare Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            A Shift Tracker for Healthcare Workers
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Healthcare schedules are demanding. HoursFlow helps you keep a clear record of your shifts and earnings, and see when payday is due.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Why Keep Your Own Record</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Nurses, CNAs, medical technicians, and healthcare support staff often work varied schedules, including day, night and weekend shifts, and sometimes more than one employer.
            </p>
            <p className="text-white/60 leading-relaxed">
              A clear record of your own shifts makes it easier to check your pay. With a subscription, the paycheck tracker checks a paycheque against your logged hours.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">HoursFlow for Healthcare Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Shift Tracking", desc: "Log your shifts and see your earnings. The free plan tracks one employer and keeps your last 30 days of records. Pro adds full history, multiple employers, exports, tax reports, scanning and import." },
                { title: "Multiple Employers", desc: "Agency or multiple facilities? Pro supports more than one employer." },
                { title: "Shift Import", desc: "Subscribers can import shifts instead of entering them one by one." },
                { title: "Paycheck Tracker", desc: "Checks a paycheque against the hours you logged. Available to subscribers." },
                { title: "Payday", desc: "Set your pay schedule and see when your next payday is due." },
                { title: "Reports", desc: "Subscribers can export reports as PDF or CSV." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Healthcare Worker FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Does HoursFlow work for travel nurses with multiple hospital contracts?", a: "Yes, with a subscription. Pro supports more than one employer. The free plan tracks one employer." },
                { q: "Can I import my shifts?", a: "Yes, with a subscription. Shift import is a Pro feature." },
                { q: "Is HoursFlow free?", a: "The free plan covers shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days of records." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 border border-[#22C55E]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Protect your complex paycheck</h3>
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
