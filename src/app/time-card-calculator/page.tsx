import type { Metadata } from "next";
import ToolLayout from "@/components/calculator/ToolLayout";
import { faqSchema, jsonLd, webAppSchema, type Faq } from "@/lib/seo";
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
    a: "Yes — free, no signup, no limits. If you want your timesheet built automatically from tracked shifts with overtime detection and payday forecasting, that's what the HoursFlow iOS app does.",
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


export default function TimeCardCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(SCHEMA_TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug="time-card-calculator"
        title="Time Card Calculator"
        lede={"Fill in each day's start, end and lunch break to total your weekly timesheet: decimal hours, weekly overtime and estimated pay."}
        explainTitle="How a time card adds up"
        explain={
          <>
            <p>
              For each day, subtract the start time from the end time and take off the unpaid break. Add the days for the weekly total, convert to decimal hours (minutes divided by 60) and multiply by the rate. Hours past the weekly threshold are paid at the overtime multiplier.
            </p>
            <p>
              Overtime thresholds and break rules vary by country, province or state and employment agreement. The 40-hour weekly default here is common but not universal.
            </p>
          </>
        }
        faq={FAQ}
        extraLinks={[
          { href: "/blog/how-to-track-work-hours", label: "How to track work hours" },
          { href: "/use-cases/hourly-workers", label: "HoursFlow for hourly workers" },
          { href: "/download", label: "Get the HoursFlow app" },
        ]}
        disclaimer={
          <>Results are estimates for informational purposes only, not legal or payroll advice. Overtime thresholds and break rules vary by jurisdiction and contract.</>
        }
      >
        <TimeCardClient />
      </ToolLayout>
    </>
  );
}
