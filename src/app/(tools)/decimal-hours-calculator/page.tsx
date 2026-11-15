import type { Metadata } from "next";
import ToolLayout from "@/components/calculator/ToolLayout";
import { canonicalAlt, faqSchema, jsonLd, webAppSchema, type Faq } from "@/lib/seo";
import DecimalClient from "./DecimalClient";
import { SITE_URL } from "@/lib/constants";

// P1 SEO page: "hours to decimal" — know+do intent. Distinct functionality: two-way
// converter + the full server-rendered minutes table (built for snippet extraction).

export const metadata: Metadata = {
  title: "Decimal Hours Calculator — Convert Hours & Minutes for Payroll",
  description:
 "Free decimal hours calculator: convert hours and minutes to decimal time for payroll and timesheets (8h 45m = 8.75), or decimal back to hours — with the full minutes conversion chart.",
  alternates: canonicalAlt("/decimal-hours-calculator"),
  openGraph: {
    title: "Decimal Hours Calculator — Hours ↔ Decimal for Payroll",
    description: "Convert hours and minutes to decimal time instantly, with the full minutes chart.",
    url: `${SITE_URL}/decimal-hours-calculator`,
  },
};

// The table IS the content — every minute value, server-rendered.
const rows = Array.from({ length: 60 }, (_, m) => ({ m, dec: (m / 60).toFixed(2) }));

const FAQ: Faq[] = [
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

// Schema name/description intentionally differ from the meta title/description
// (page predates seo.ts), so the helpers get their own cfg — output-identical.
const SCHEMA_TOOL = {
  slug: "decimal-hours-calculator",
  title: "Decimal Hours Calculator",
  description: "Free two-way converter between hours:minutes and decimal hours for payroll, with the full minutes conversion chart.",
};

export default function DecimalHoursCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(SCHEMA_TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug="decimal-hours-calculator"
        title="Decimal Hours Calculator"
        lede="Convert hours and minutes to decimal time for payroll, or decimal back to h:mm. 8h 45m is 8.75."
        explainTitle="Minutes to decimal hours chart"
        explain={
          <>
            <p>Divide minutes by 60. Values are rounded to two decimals, the convention payroll systems use.</p>
            <dl className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
              {rows.map(({ m, dec }) => (
                <div key={m} className="flex justify-between border-b border-rule py-1.5 text-[0.9375rem]">
                  <dt className="text-ink-2">{m} min</dt>
                  <dd className="num font-medium text-ink">{dec}</dd>
                </div>
              ))}
            </dl>
          </>
        }
        faq={FAQ}
        extraLinks={[
          { href: "/blog/how-to-convert-hours-to-decimal", label: "How to convert hours to decimal" },
          { href: "/download", label: "Get the HoursFlow app" },
        ]}
        disclaimer={<>Results are estimates for informational purposes only. Check how your employer rounds time before relying on a conversion.</>}
      >
        <DecimalClient />
      </ToolLayout>
    </>
  );
}
