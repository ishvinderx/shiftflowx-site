import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow for Nurses & Healthcare Workers — Shift Tracker App",
  description: "ShiftFlow helps nurses and healthcare workers track complex shift patterns, overtime, on-call pay, night differentials, and prevent burnout.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/nurses' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
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
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <Link href="/use-cases/nurses" className="text-white/60">Nurses & Healthcare</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#22C55E]/15 text-[#22C55E] px-3 py-1 rounded-full text-sm font-semibold">
            For Nurses & Healthcare Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            The Shift Tracker Built for Healthcare&apos;s Complex Pay Rules
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Night differentials, on-call pay, mandatory overtime, agency shifts — healthcare pay is complex. ShiftFlow tracks every component and makes sure your paycheck is right.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Healthcare Pay Is Uniquely Complex</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Nurses, CNAs, medical technicians, and healthcare support staff work some of the most complex pay structures of any profession. A single pay period might include regular day shifts, night differentials (typically 10-15% extra), weekend differentials, on-call hours, charge nurse premiums, and overtime at different thresholds.
            </p>
            <p className="text-white/60 leading-relaxed">
              When payroll gets any of these wrong — and errors happen more often than healthcare workers realize — the amounts can be significant. ShiftFlow gives healthcare workers a tool to track every shift component and verify every paycheck with the same precision their employers should be using.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">ShiftFlow for Healthcare Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Shift Pattern Tracking", desc: "Log 8-hour, 10-hour, and 12-hour shifts. Track day shifts, evening shifts, night shifts, and rotating schedules — all in one app." },
                { title: "Night Differential Tracking", desc: "Record night shift hours separately to ensure night differential pay is calculated correctly. ShiftFlow tracks your premium hours so you can verify your payslip." },
                { title: "On-Call Hour Logging", desc: "Log on-call hours with easy distinction between hours called in and hours simply on standby. Track on-call pay rates separately from regular shift rates." },
                { title: "Burnout Analytics", desc: "Healthcare worker burnout is a serious crisis. ShiftFlow monitors consecutive shift days, weekly hours, night frequency, and self-reported fatigue to give you a real-time burnout risk score." },
                { title: "Overtime Protection", desc: "Hospital shifts frequently extend beyond scheduled times. ShiftFlow tracks cumulative weekly hours and alerts you when overtime pay should apply." },
                { title: "Agency & PRN Shift Tracking", desc: "Working agency or PRN? Track multiple facilities with different rates. ShiftFlow calculates your blended earnings and ensures each employer pays the correct rate." },
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
                { q: "Does ShiftFlow work for travel nurses with multiple hospital contracts?", a: "Yes. ShiftFlow supports multiple employers with different pay rates, locations, and shift types. Track each hospital contract separately and see your total earnings across all placements." },
                { q: "Can I log on-call pay separately from my regular shift pay?", a: "Yes. When logging a shift, you can categorize it as regular, on-call standby, or called-in. ShiftFlow applies the correct pay rate for each category." },
                { q: "How does ShiftFlow help prevent burnout for healthcare workers?", a: "ShiftFlow's Burnout Analytics monitors your work patterns — consecutive days worked, total weekly hours, night shift frequency, skipped meals and breaks — and generates a real-time burnout risk score. When your score crosses critical thresholds, you receive personalized recovery recommendations." },
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
            <p className="text-white/60 mb-6">Free 7-day trial. No credit card required.</p>
            <Link href="/download" className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors">
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
