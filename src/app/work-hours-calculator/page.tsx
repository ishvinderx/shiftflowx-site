import type { Metadata } from "next";
import Link from "next/link";
import CalculatorClient from "./CalculatorClient";

// P0 SEO landing page (Phase 18.2/18.3): a REAL free tool, not an article with a
// keyword in the title. The calculator delivers the answer above the fold; the
// content below answers the how-to questions searchers actually have; the app CTA
// appears after value is delivered (18.4).

export const metadata: Metadata = {
  title: "Work Hours Calculator — Free, With Breaks & Overtime",
  description:
    "Free work hours calculator: enter start time, end time, and breaks to get total hours worked, decimal hours, overtime, and estimated pay. No signup required.",
  alternates: { canonical: "https://shiftflowx.net/work-hours-calculator" },
  openGraph: {
    title: "Work Hours Calculator — Free, With Breaks & Overtime",
    description:
      "Calculate hours worked with breaks, overtime, and pay — free, instant, no signup.",
    url: "https://shiftflowx.net/work-hours-calculator",
  },
};

const FAQ = [
  {
    q: "How do I calculate my work hours?",
    a: "Subtract your start time from your end time, then subtract any unpaid breaks. For example: 7:30 AM to 4:00 PM is 8 hours 30 minutes; with a 30-minute unpaid lunch, you worked 8 hours. This calculator does that automatically, including overnight shifts.",
  },
  {
    q: "How do I convert work hours to decimal hours?",
    a: "Divide the minutes by 60 and add them to the whole hours. 8 hours 30 minutes = 8 + 30/60 = 8.5 decimal hours. Decimal hours are what payroll systems and invoices use to multiply by an hourly rate.",
  },
  {
    q: "Do breaks count as hours worked?",
    a: "It depends on whether the break is paid. Unpaid meal breaks are subtracted from your hours worked; paid rest breaks count as time worked. Rules vary by country and province/state — this calculator lets you mark each break as paid or unpaid.",
  },
  {
    q: "How is overtime calculated?",
    a: "Overtime is time worked past a threshold, paid at a multiplier — commonly 1.5× after 8 hours per day or 40 hours per week, but the threshold and multiplier depend on your jurisdiction and employment agreement. This calculator uses a daily threshold you can adjust.",
  },
  {
    q: "How many hours is 8:30 to 5:00 with a lunch break?",
    a: "8:30 AM to 5:00 PM is 8 hours 30 minutes. With a 30-minute unpaid lunch, that is 8 hours worked (8.0 decimal hours). With a 60-minute unpaid lunch, it is 7 hours 30 minutes (7.5 decimal hours).",
  },
  {
    q: "Is this work hours calculator free?",
    a: "Yes — completely free, no signup, no limits. If you want your hours tracked automatically every shift with overtime detection and payday forecasting, that's what the ShiftFlow iOS app does.",
  },
];

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Work Hours Calculator",
  url: "https://shiftflowx.net/work-hours-calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free calculator for hours worked: start and end times, paid/unpaid breaks, overtime split, decimal hours, and estimated gross pay.",
  publisher: { "@type": "Organization", name: "ShiftFlow", url: "https://shiftflowx.net" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ShiftFlow", item: "https://shiftflowx.net" },
    { "@type": "ListItem", position: 2, name: "Work Hours Calculator", item: "https://shiftflowx.net/work-hours-calculator" },
  ],
};

export default function WorkHoursCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <span className="text-white/60">Work Hours Calculator</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Work Hours Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Enter your start time, end time, and breaks to get total hours worked, decimal
            hours, overtime, and estimated pay — free, instant, no signup.
          </p>

          <CalculatorClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">How to calculate work hours</h2>
            <ol className="list-decimal list-inside space-y-3 text-white/60 leading-relaxed">
              <li><strong className="text-white/85">Find the shift span</strong> — subtract the start time from the end time. If a shift crosses midnight (10:00 PM → 6:00 AM), add 24 hours to the end.</li>
              <li><strong className="text-white/85">Subtract unpaid breaks</strong> — unpaid meal breaks come off your worked time; paid rest breaks stay in.</li>
              <li><strong className="text-white/85">Split regular vs. overtime</strong> — time past your overtime threshold (commonly 8 hours/day or 40 hours/week, jurisdiction-dependent) is paid at a multiplier, usually 1.5×.</li>
              <li><strong className="text-white/85">Convert to decimal hours for pay</strong> — minutes ÷ 60: 8h 45m = 8.75. Multiply decimal hours by your rate for gross pay.</li>
            </ol>
            <p className="text-white/40 text-sm mt-4">
              Overtime thresholds, multipliers, and break rules vary by country, province/state,
              and employment agreement — the defaults here (8h daily, 1.5×) are common but not
              universal. Check your local rules for payroll purposes.
            </p>
          </section>

          {/* ── FAQ (matches FAQPage schema 1:1) ────────────────────────────── */}
          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Work hours questions, answered</h2>
            <div className="space-y-5">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="text-white font-semibold mb-1.5">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Related ─────────────────────────────────────────────────────── */}
          <section className="mt-14 max-w-3xl">
            <h2 className="text-lg font-semibold text-white mb-4">Keep going</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/time-card-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Weekly time card calculator →
              </Link>
              <Link href="/blog/how-to-track-work-hours" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                How to track work hours →
              </Link>
              <Link href="/use-cases/hourly-workers" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                ShiftFlow for hourly workers →
              </Link>
              <Link href="/download" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Get the ShiftFlow app →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
