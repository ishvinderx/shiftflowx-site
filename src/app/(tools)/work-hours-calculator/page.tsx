import type { Metadata } from "next";
import ToolLayout from "@/components/calculator/ToolLayout";
import { canonicalAlt, faqSchema, jsonLd, webAppSchema, type Faq } from "@/lib/seo";
import CalculatorClient from "./CalculatorClient";

// P0 SEO landing page (Phase 18.2/18.3): a REAL free tool, not an article with a
// keyword in the title. The calculator delivers the answer above the fold; the
// content below answers the how-to questions searchers actually have; the app CTA
// appears after value is delivered (18.4).

export const metadata: Metadata = {
  title: "Work Hours Calculator — Free, With Breaks & Overtime",
  description:
 "Free work hours calculator: enter start time, end time, and breaks to get total hours worked, decimal hours, overtime, and estimated pay. No signup required.",
  alternates: canonicalAlt("/work-hours-calculator"),
  openGraph: {
    title: "Work Hours Calculator — Free, With Breaks & Overtime",
    description:
 "Calculate hours worked with breaks, overtime, and pay — free, instant, no signup.",
    url: "https://shiftflowx.net/work-hours-calculator",
  },
};

const FAQ: Faq[] = [
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
    a: "Yes — completely free, no signup, no limits. If you want your hours tracked automatically every shift with overtime detection and payday forecasting, that's what the HoursFlow iOS app does.",
  },
];

// Schema name/description intentionally differ from the meta title/description
// (page predates seo.ts), so the helpers get their own cfg — output-identical.
const SCHEMA_TOOL = {
  slug: "work-hours-calculator",
  title: "Work Hours Calculator",
  description:
 "Free calculator for hours worked: start and end times, paid/unpaid breaks, overtime split, decimal hours, and estimated gross pay.",
};


export default function WorkHoursCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(SCHEMA_TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug="work-hours-calculator"
        title="Work Hours Calculator"
        lede={"Enter your start time, end time and breaks to get total hours worked, decimal hours, overtime and estimated pay."}
        explainTitle="How to calculate work hours"
        explain={
          <>
            <ol className="list-decimal pl-5">
              <li className="mb-3"><strong>Find the shift span.</strong> Subtract the start time from the end time. If a shift crosses midnight (10:00 PM to 6:00 AM), add 24 hours to the end.</li>
              <li className="mb-3"><strong>Subtract unpaid breaks.</strong> Unpaid meal breaks come off your worked time; paid rest breaks stay in.</li>
              <li className="mb-3"><strong>Split regular and overtime.</strong> Time past your overtime threshold (commonly 8 hours a day or 40 a week, depending on where you work) is paid at a multiplier, usually 1.5.</li>
              <li className="mb-3"><strong>Convert to decimal hours for pay.</strong> Minutes divided by 60: 8h 45m is 8.75. Multiply decimal hours by your rate for gross pay.</li>
            </ol>
            <p>
              Overtime thresholds, multipliers and break rules vary by country, province or state, and employment agreement. The defaults here (8 hours a day, 1.5 times) are common but not universal.
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
          <>Results are estimates for informational purposes only, not legal or payroll advice. Overtime and break rules vary by jurisdiction and contract.</>
        }
      >
        <CalculatorClient />
      </ToolLayout>
    </>
  );
}
