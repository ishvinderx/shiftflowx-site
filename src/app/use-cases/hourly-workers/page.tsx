import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow for Hourly Workers — Paycheck Tracker & Overtime Protection",
  description: "ShiftFlow helps hourly workers track shifts, verify paychecks, catch overtime errors, and forecast paydays. Never get underpaid again.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/hourly-workers' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
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
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <Link href="/use-cases/hourly-workers" className="text-white/60">Hourly Workers</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#14B8A6]/15 text-[#14B8A6] px-3 py-1 rounded-full text-sm font-semibold">
            For Hourly & Shift Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            AI-Powered Paycheck Protection for Hourly Workers
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Every shift you work, every hour you put in — ShiftFlow makes sure you get paid for all of it. No more overtime errors, no more missing break premiums, no more payday surprises.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">The Hourly Worker Payroll Problem</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              The US Department of Labor estimates that wage theft — underpaid wages, unpaid overtime, and illegal deductions — costs hourly workers more than $15 billion per year. Most workers never catch these errors because they have no way to cross-check their employer&apos;s payroll calculations against their actual time worked.
            </p>
            <p className="text-white/60 leading-relaxed">
              ShiftFlow changes that. By logging your shifts and letting AI verify every paycheck, you get real-time confirmation that your pay is correct — and immediate alerts when it isn&apos;t.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features for Hourly Workers</h2>
            <div className="space-y-4">
              {[
                { title: "AI Payroll Protection", desc: "Log each shift with start time, end time, and break duration. ShiftFlow calculates your expected gross pay and alerts you if your actual paycheck is short — including missing overtime and break premiums." },
                { title: "Overtime Calculator (FLSA)", desc: "Under the Fair Labor Standards Act, most hourly workers are entitled to 1.5x their regular rate for hours over 40 in a workweek. ShiftFlow automatically tracks your weekly hours and calculates overtime pay owed." },
                { title: "Payday Forecasting", desc: "ShiftFlow learns your pay schedule and predicts exactly when your next paycheck will arrive and how much it will be. Know your payday before it lands — plan bills, savings, and expenses with confidence." },
                { title: "Payslip Scanner", desc: "Photograph your physical payslip using ShiftFlow's OCR scanner. The AI extracts every number — regular pay, overtime, deductions, net pay — and cross-references it against your logged shifts automatically." },
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
                { q: "What counts as overtime for hourly workers?", a: "Under the FLSA, most hourly workers are entitled to overtime pay at 1.5x their regular rate for any hours worked over 40 in a single workweek. Some states (like California) have additional daily overtime rules. ShiftFlow tracks federal FLSA rules and flags weekly overtime automatically." },
                { q: "My employer says I wasn't owed overtime — but ShiftFlow says I was. What do I do?", a: "ShiftFlow generates a detailed dispute summary showing your logged shift times, total weekly hours, overtime calculation, and the discrepancy amount. You can share this with your employer's HR or payroll department. If unresolved, you can file a wage claim with your state labor board." },
                { q: "Can ShiftFlow help if I work in retail, hospitality, or manufacturing?", a: "Yes. ShiftFlow works for any hourly worker regardless of industry. The core payroll protection, overtime tracking, and payday forecasting features apply equally to retail associates, restaurant workers, warehouse employees, and factory workers." },
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
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
