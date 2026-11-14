import type { Metadata } from "next";
import { AppStoreButton, Button, Callout, Heading, Label, PageHeader, Section } from "@/components/ui";
import { APP_STORE_URL, BRAND, PLAN_POLICY } from "@/lib/constants";

// Seven real feature areas. Tier follows PLAN_POLICY / PRO_FEATURES in constants.
const AREAS: { title: string; tier: "Free" | "Pro"; body: string; note?: string }[] = [
  { title: "Shift tracking", tier: "Free", body: "Log shifts with start and end times and a pay rate. Keep your last 30 days on the free plan.", note: "Pro adds more than one employer and full history." },
  { title: "Earnings, paycheque and payday", tier: "Free", body: "See what you have earned this pay period, an estimate of the paycheque after deductions, and a countdown to payday." },
  { title: "Monthly budget, bills and reminders", tier: "Free", body: "Plan the month's bills and budgets, see how much is still to earn to cover them, and get a reminder before a bill is due." },
  { title: "Expenses and receipt scanning", tier: "Pro", body: "Scan a receipt or payslip with your camera. Text is read on your device. Shift import is included." },
  { title: "Tax estimate and GST/HST summaries", tier: "Pro", body: "See an estimate of what to set aside for tax, with GST/HST summaries in the tax report." },
  { title: "Reports, exports, statements and invoices", tier: "Pro", body: "Roll up pay and hours by week, month or year. Export PDF and CSV, create pay statements, and invoice clients if you are self-employed." },
  { title: "Paycheck tracker", tier: "Pro", body: "Check a paycheque against the hours you logged, so a short or missing payment stands out." },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://shiftflowx.net/features" }
  ]
};

export const metadata: Metadata = {
  title: "Features — Shift Tracking, Payday, Budget and Tax Report",
  description:
    "Explore HoursFlow: shift and earnings tracking, payday, budget and bill reminders, tax report, exports and invoices, receipt and payslip scanning, and the paycheck tracker. Built for employees, gig workers, and freelancers.",
  alternates: { canonical: 'https://shiftflowx.net/features' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        label="Features"
        title="Everything an hourly paycheque touches"
        lede={`${BRAND.name} covers the path from the shift you work to the paycheque you check. Each area below is marked Free or Pro.`}
      >
        <AppStoreButton href={APP_STORE_URL} />
        <Button href="/pricing" variant="secondary">See pricing</Button>
      </PageHeader>
      <Section rule={false}>
        <ol className="border-b border-rule">
          {AREAS.map((a, i) => (
            <li key={a.title} className="grid gap-3 border-t border-rule py-8 md:grid-cols-[1fr_5fr_2fr] md:gap-10">
              <Label as="span">0{i + 1}</Label>
              <div className="grid gap-2">
                <Heading level="h3">{a.title}</Heading>
                <p className="t-body text-ink-2">{a.body}</p>
                {a.note && <p className="t-body text-ink-2">{a.note}</p>}
              </div>
              <p className="md:text-right">
                <span className={a.tier === "Pro" ? "border-b-2 border-mint pb-0.5 font-semibold text-ink" : "font-semibold text-ink"}>{a.tier}</span>
              </p>
            </li>
          ))}
        </ol>
        <Callout label="Free and Pro" className="mt-12">
          <span className="block">{PLAN_POLICY.free}</span>
          <span className="mt-2 block">{PLAN_POLICY.subscribers}</span>
          <span className="mt-2 block">{PLAN_POLICY.lapse}</span>
        </Callout>
      </Section>

    </>
  );
}
