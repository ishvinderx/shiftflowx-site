import type { Metadata } from "next";
import Link from "next/link";
import ToolBreadcrumb from "@/components/calculator/ToolBreadcrumb";
import { breadcrumbSchema, faqSchema, jsonLd, webAppSchema, type Faq } from "@/lib/seo";
import TimeCardClient from "./TimeCardClient";

// P0 SEO landing page #2 (Phase 18.2): weekly time-card / timesheet intent — a
// per-day grid with WEEKLY overtime, genuinely distinct from the single-shift
// /work-hours-calculator (daily threshold). Cross-linked cluster, no thin variants.

export const metadata: Metadata = {
  title: "Time Card Calculator — Free Weekly Timesheet",
  description:
    "Free time card calculator: enter each day's start, end, and lunch break to total your weekly timesheet with decimal hours, weekly overtime, and estimated pay.",
  alternates: { canonical: "https://shiftflowx.net/time-card-calculator" },
  openGraph: {
    title: "Time Card Calculator — Free Weekly Timesheet",
    description: "Add up your weekly time card with breaks, weekly overtime, and pay — free, no signup.",
    url: "https://shiftflowx.net/time-card-calculator",
  },
};

const FAQ: Faq[] = [
  {
    q: "How do I calculate a time card?",
    a: "For each day, subtract the start time from the end time, subtract unpaid breaks, then add the days together for the weekly total. Convert to decimal hours (minutes ÷ 60) before multiplying by an hourly rate. This calculator does all of that per day and totals the week.",
  },
  {
    q: "How do I add up hours on a timesheet with a lunch break?",
    a: "Subtract the unpaid lunch from each day before summing. Example: 9:00 AM–5:30 PM with a 30-minute unpaid lunch is 8 hours; five such days total 40 hours for the week.",
  },
  {
    q: "How does weekly overtime work on a time card?",
    a: "Weekly overtime is time worked past a weekly threshold — commonly 40 hours in the US and most Canadian provinces — paid at a multiplier, usually 1.5×. Some jurisdictions ALSO apply daily overtime; this page applies the weekly rule, and the single-shift calculator handles daily thresholds.",
  },
  {
    q: "What are decimal hours on a timesheet?",
    a: "Payroll multiplies decimal hours by the hourly rate. Convert minutes by dividing by 60: 15 minutes = 0.25, 30 = 0.5, 45 = 0.75. So 38 hours 45 minutes is 38.75 decimal hours.",
  },
  {
    q: "Is this time card calculator free?",
    a: "Yes — free, no signup, no limits. If you want your timesheet built automatically from tracked shifts with overtime detection and payday forecasting, that's what the ShiftFlow iOS app does.",
  },
];

// Schema name/description intentionally differ from the meta title/description
// (page predates seo.ts), so the helpers get their own cfg — output-identical.
const SCHEMA_TOOL = {
  slug: "time-card-calculator",
  title: "Time Card Calculator",
  description:
    "Free weekly time card calculator: per-day start/end times and lunch breaks, weekly totals, decimal hours, weekly overtime, and estimated gross pay.",
};

const TRAIL = [
  { name: "ShiftFlow", path: "/" },
  { name: "Time Card Calculator", path: "/time-card-calculator" },
];

export default function TimeCardCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(SCHEMA_TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(TRAIL)) }} />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <ToolBreadcrumb trail={[TRAIL[0], { name: "Time Card Calculator" }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Time Card Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Fill in each day&apos;s start, end, and lunch break to total your weekly timesheet —
            decimal hours, weekly overtime, and estimated pay. Free, no signup.
          </p>

          <TimeCardClient />

          {/* ── FAQ (matches FAQPage schema 1:1) ────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Time card questions, answered</h2>
            <div className="space-y-5">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="text-white font-semibold mb-1.5">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-6">
              Overtime thresholds and break rules vary by country, province/state, and employment
              agreement — the 40-hour weekly default here is common but not universal.
            </p>
          </section>

          {/* ── Related ─────────────────────────────────────────────────────── */}
          <section className="mt-14 max-w-3xl">
            <h2 className="text-lg font-semibold text-white mb-4">Keep going</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/work-hours-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Single-shift hours calculator →
              </Link>
              <Link href="/overtime-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Overtime calculator →
              </Link>
              <Link href="/decimal-hours-calculator" className="text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Decimal hours converter →
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
