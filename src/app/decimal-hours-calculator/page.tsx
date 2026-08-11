import type { Metadata } from "next";
import Link from "next/link";
import DecimalClient from "./DecimalClient";

// P1 SEO page: "hours to decimal" — know+do intent. Distinct functionality: two-way
// converter + the full server-rendered minutes table (built for snippet extraction).

export const metadata: Metadata = {
  title: "Decimal Hours Calculator — Convert Hours & Minutes for Payroll",
  description:
    "Free decimal hours calculator: convert hours and minutes to decimal time for payroll and timesheets (8h 45m = 8.75), or decimal back to hours — with the full minutes conversion chart.",
  alternates: { canonical: "https://shiftflowx.net/decimal-hours-calculator" },
  openGraph: {
    title: "Decimal Hours Calculator — Hours ↔ Decimal for Payroll",
    description: "Convert hours and minutes to decimal time instantly, with the full minutes chart.",
    url: "https://shiftflowx.net/decimal-hours-calculator",
  },
};

// The table IS the content — every minute value, server-rendered.
const rows = Array.from({ length: 60 }, (_, m) => ({ m, dec: (m / 60).toFixed(2) }));

const FAQ = [
  {
    q: "How do I convert hours and minutes to decimal hours?",
    a: "Divide the minutes by 60 and add the result to the whole hours. Example: 8 hours 45 minutes = 8 + 45/60 = 8.75 decimal hours. Payroll systems multiply decimal hours by the hourly rate.",
  },
  {
    q: "What is 8 hours 30 minutes in decimal?",
    a: "8.5 decimal hours. Common values: 15 minutes = 0.25, 30 minutes = 0.5, 45 minutes = 0.75.",
  },
  {
    q: "How do I convert decimal hours back to hours and minutes?",
    a: "The whole number is the hours; multiply the decimal part by 60 for the minutes. Example: 7.75 = 7 hours and 0.75 × 60 = 45 minutes.",
  },
  {
    q: "Why does payroll use decimal hours instead of hours and minutes?",
    a: "Pay is rate × time, and multiplication needs one unit. 8h 45m × $20 is awkward; 8.75 × $20 = $175.00 is one step. Timesheets record h:mm for people and convert to decimal for the math.",
  },
];

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Decimal Hours Calculator",
  url: "https://shiftflowx.net/decimal-hours-calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free two-way converter between hours:minutes and decimal hours for payroll, with the full minutes conversion chart.",
  publisher: { "@type": "Organization", name: "ShiftFlow", url: "https://shiftflowx.net" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ShiftFlow", item: "https://shiftflowx.net" },
    { "@type": "ListItem", position: 2, name: "Decimal Hours Calculator", item: "https://shiftflowx.net/decimal-hours-calculator" },
  ],
};

export default function DecimalHoursCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <span className="text-white/60">Decimal Hours Calculator</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Decimal Hours Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Convert hours and minutes to decimal time for payroll — or decimal back to
            h:mm. 8h 45m = <strong className="text-white/85">8.75</strong>. Free, instant.
          </p>

          <DecimalClient />

          {/* ── Conversion chart (server-rendered — the reference content) ──── */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-white mb-2">Minutes → decimal hours chart</h2>
            <p className="text-white/50 text-sm mb-6">
              Divide minutes by 60. Values rounded to two decimals — the convention payroll
              systems use.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-1 max-w-3xl">
              {rows.map(({ m, dec }) => (
                <div key={m} className="flex justify-between text-sm border-b border-white/[0.05] py-1.5">
                  <span className="text-white/55">{m} min</span>
                  <span className="text-white/85 font-medium tabular-nums">{dec}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ (matches FAQPage schema 1:1) ────────────────────────────── */}
          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Decimal time questions, answered</h2>
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
              <Link href="/work-hours-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Work hours calculator →
              </Link>
              <Link href="/time-card-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Weekly time card calculator →
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
