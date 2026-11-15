import type { Metadata } from "next";
import { AppStoreButton, Button, Callout, FaqList, Heading, Label, PageHeader, Section } from "@/components/ui";
import { APP_STORE_URL, BRAND, PLAN_POLICY, SITE_URL } from "@/lib/constants";
import { canonicalAlt } from "@/lib/seo";

// Real feature areas. Tier follows PLAN_POLICY / PRO_FEATURES in constants.
const AREAS: { title: string; tier: "Free" | "Pro"; body: string; note?: string }[] = [
  { title: "Shift tracking", tier: "Free", body: "Log shifts with start and end times and a pay rate. Keep your last 30 days on the free plan.", note: "Pro adds more than one employer and full history." },
  { title: "Earnings, paycheque and payday", tier: "Free", body: "See what you have earned this pay period, an estimate of the paycheque after deductions, and a countdown to payday." },
  { title: "Monthly budget, bills and reminders", tier: "Free", body: "Plan the month's bills and budgets, see how much is still to earn to cover them, and get a reminder before a bill is due." },
  { title: "Expenses and receipt scanning", tier: "Pro", body: "Scan a receipt or payslip with your camera. Text is read on your device." },
  { title: "Tax estimate and GST/HST summaries", tier: "Pro", body: "See an estimate of what to set aside for tax, with GST/HST summaries in the tax report." },
  { title: "Reports, exports, statements and invoices", tier: "Pro", body: "Roll up pay and hours by week, month or year. Export PDF and CSV, create pay statements, and invoice clients if you are self-employed." },
  { title: "Paycheque check: the answer", tier: "Free", body: "Enter the gross pay on your payslip and see whether it matches your logged hours, before tax." },
  { title: "Paycheque check detail", tier: "Pro", body: "See the shifts and overtime behind the figure, and look back at past checks." },
  { title: "Import from a CSV file", tier: "Free", body: "Bring past shifts and expenses in from a CSV file. Importing is free." },
  { title: "Shift import from a photo", tier: "Pro", body: "Take a photo of a schedule or timesheet and import the shifts from it." },
];

// Folded in from the old /how-it-works page (now a permanent redirect to /features).
const STEPS = [
  { title: "Log your shift", body: "After each shift, enter the start time, end time and employer. The app shows your earnings for the shift. The free plan tracks one employer; Pro adds more than one employer and shift import." },
  { title: "See your earnings and payday", body: "The hours you log add up to earnings, and your pay schedule shows when the next payday is due. These are estimates, not a guarantee of what an employer will pay." },
  { title: "Keep your budget and bills", body: "Set up a budget and add your bills. The app reminds you before a bill is due, so you can plan around payday." },
  { title: "Check and export", body: "Check a payslip against your logged hours for free; Pro adds the detail behind the check. Scan receipts and payslips, view the tax report with GST/HST summaries, and export reports, pay statements and invoices." },
];

const FEATURE_FAQ = [
  { q: "How long does it take to set up?", a: "Download the app, create an account, add your employer and log your first shift." },
  { q: "Does it work with more than one employer?", a: "More than one employer is a Pro feature. The free plan tracks one employer." },
  { q: "What does the paycheque check do?", a: "Enter the gross pay on your payslip and it shows whether the amount matches your logged hours, before tax. The answer is free. Pro adds the detail behind it: the shifts and overtime behind the figure, and your past checks." },
  { q: "Moving from another app: can I bring my shifts and expenses?", a: "Yes, and importing is free. Export your shifts and expenses as a CSV file from the app you use now, create a HoursFlow account, then choose Import from a file and pick the CSV." },
  { q: "How accurate is the payday estimate?", a: "It is an estimate based on your pay schedule and the shifts you log. It is not a guarantee of what your employer will pay." },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": `${SITE_URL}/features` }
  ]
};

export const metadata: Metadata = {
  title: "Features — Shift Tracking, Payday, Budget and Tax Report",
  description:
    "Explore HoursFlow: shift and earnings tracking, payday, budget and bill reminders, tax report, exports and invoices, receipt and payslip scanning, and the paycheque check. Built for employees, gig workers, and freelancers.",
  alternates: canonicalAlt("/features"),
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
                <span className={a.tier === "Pro" ? "border-b-2 border-positive-line pb-0.5 font-semibold text-ink" : "font-semibold text-ink"}>{a.tier}</span>
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

      <Section label="Getting started" title="How it works, in four steps">
        <ol className="border-b border-rule">
          {STEPS.map((st, i) => (
            <li key={st.title} className="grid gap-3 border-t border-rule py-8 md:grid-cols-[1fr_4fr_7fr] md:gap-10">
              <Label as="span">Step {i + 1}</Label>
              <Heading level="h3">{st.title}</Heading>
              <p className="t-body text-ink-2">{st.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Questions" title="Common questions">
        <FaqList items={FEATURE_FAQ} />
      </Section>
    </>
  );
}
