import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow vs Other Apps — Best AI Shift Tracker Comparison",
  description: "See how ShiftFlow compares to Clockify, Toggl, Deputy, and other shift trackers. ShiftFlow is the only app with AI payroll protection and payday forecasting.",
  alternates: { canonical: 'https://shiftflowx.net/compare' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://shiftflowx.net/compare" }
  ]
};

const features = [
  { name: "Shift Tracking", shiftflow: true, generic: true },
  { name: "AI Payroll Protection", shiftflow: true, generic: false },
  { name: "Payday Forecasting", shiftflow: true, generic: false },
  { name: "Burnout Analytics", shiftflow: true, generic: false },
  { name: "Tax Estimation", shiftflow: true, generic: false },
  { name: "Invoice Generator", shiftflow: true, generic: "partial" },
  { name: "OCR Payslip Scanner", shiftflow: true, generic: false },
  { name: "Financial Health Score", shiftflow: true, generic: false },
  { name: "AI Financial Assistant", shiftflow: true, generic: false },
  { name: "Overtime Detection (FLSA)", shiftflow: true, generic: false },
  { name: "Free Trial", shiftflow: "30 days", generic: "Varies" },
];

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
              <span>/</span>
              <span className="text-white/60">Compare</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Why Workers Choose ShiftFlow
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              ShiftFlow is the only workforce app that combines AI payroll protection, payday forecasting, burnout analytics, and financial wellness in one place. Other apps track time. ShiftFlow protects your income.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Feature Comparison</h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left px-6 py-4 text-white/60 font-semibold text-sm">Feature</th>
                    <th className="text-center px-6 py-4 text-[#D63C6B] font-bold text-sm">ShiftFlow</th>
                    <th className="text-center px-6 py-4 text-white/40 font-semibold text-sm">Generic Trackers</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.name} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <td className="px-6 py-4 text-white/70 text-sm">{f.name}</td>
                      <td className="px-6 py-4 text-center">
                        {f.shiftflow === true ? (
                          <span className="text-[#22C55E] font-bold">✓</span>
                        ) : (
                          <span className="text-[#22C55E] text-sm font-medium">{f.shiftflow}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {f.generic === false ? (
                          <span className="text-white/25 font-bold">✗</span>
                        ) : f.generic === "partial" ? (
                          <span className="text-[#F59E0B] text-sm font-medium">Partial</span>
                        ) : f.generic === true ? (
                          <span className="text-white/50 font-bold">✓</span>
                        ) : (
                          <span className="text-white/40 text-sm">{f.generic}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who it&apos;s for */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Who ShiftFlow Is Built For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { group: "Hourly Employees", desc: "Retail, hospitality, manufacturing, and service workers who need paycheck verification and overtime protection.", href: "/use-cases/hourly-workers" },
                { group: "Freelancers", desc: "Independent contractors and freelancers who need invoice generation, tax tracking, and earnings forecasting.", href: "/use-cases/freelancers" },
                { group: "Gig Workers", desc: "Rideshare drivers, delivery workers, and task-based gig workers who need income tracking across multiple platforms.", href: "/use-cases/gig-workers" },
                { group: "Nurses & Healthcare", desc: "Shift workers with complex schedules including night differentials, on-call pay, and overtime regulations.", href: "/use-cases/nurses" },
              ].map(({ group, desc, href }) => (
                <Link key={group} href={href} className="p-6 rounded-xl border border-white/10 hover:border-[#D63C6B]/30 transition-colors group">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#D63C6B] transition-colors">{group}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* The ShiftFlow Difference */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">The ShiftFlow Difference</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Most time tracking apps were built for businesses — to help employers see how their staff spends time. ShiftFlow was built for workers — to protect their income, predict their cash flow, and improve their financial wellness.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              The US Department of Labor estimates that wage theft — underpaid wages, missing overtime, illegal deductions — costs workers over $15 billion annually. ShiftFlow exists to close that gap. By cross-referencing every logged shift against FLSA rules, your agreed pay rate, and historical patterns, ShiftFlow&apos;s AI catches errors before they compound.
            </p>
            <p className="text-white/60 leading-relaxed">
              No other app combines AI payroll verification, payday forecasting, burnout analytics, tax estimation, and invoice generation in a single mobile-first platform built exclusively for workers.
            </p>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Start protecting your income today</h3>
            <p className="text-white/60 mb-6">Free 30-day trial. No credit card required. Available on iPhone &amp; iPad.</p>
            <Link
              href="/download"
              className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors"
            >
              Download ShiftFlow
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
