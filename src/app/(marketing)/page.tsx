import Link from "next/link";
import {
  AllocationBar, AppStoreButton, Button, Container, FaqList, FeatureRow, Figure, Heading, Label,
  HeroPayCard, LedgerTable, LineChart, PhoneFrame, Reveal, Section, SAMPLE_SHIFTS, money,
} from "@/components/ui";
import FreeVsPro from "@/components/marketing/FreeVsPro";
import { APP_STORE_URL, BRAND, PRICING } from "@/lib/constants";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": BRAND.name,
  "operatingSystem": "iOS",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
  // NOTE: aggregateRating intentionally omitted — we do not publish fabricated ratings.
  // Add a real AggregateRating only when backed by verified App Store review data.
};

// One source for the visible FAQ and the FAQPage structured data, so they cannot drift.
const HOME_FAQ = [
  { q: `How does ${BRAND.name} estimate paydays?`, a: `${BRAND.name} uses your pay schedule and logged shifts to estimate when your next paycheque is due and roughly how much it will be. These are estimates that improve as you log more shifts, not a guarantee.` },
  { q: "How does the paycheque tracker work?", a: `The paycheque tracker, a Pro feature, checks a paycheque against the hours you logged in ${BRAND.name} so you can see whether the amount looks short.` },
  { q: "Can freelancers and gig workers use it?", a: `Yes. ${BRAND.name} is built for employees, freelancers, contractors, gig workers and the self-employed. Freelancers can create invoices, track project earnings and estimate tax in the app.` },
  { q: "Does it help with budgeting and bills?", a: `Yes. ${BRAND.name} includes a monthly budget and bill reminders, both on the free plan.` },
  { q: `How much does ${BRAND.name} cost?`, a: `${BRAND.name} is free for shift tracking with one employer and your last 30 days of records. ${BRAND.proName} adds full history, multiple employers, exports, tax reports and more, with a ${PRICING.trialDays}-day free trial. Pro is ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel} (save about ${PRICING.annual.savingsPct}% annually). Subscriptions are managed through the Apple App Store. Cancel anytime.` },
  { q: "Is my payroll data secure?", a: `Data is encrypted in transit with TLS 1.3, and sensitive fields are encrypted at rest. ${BRAND.name} never sells your data. You can export your data and delete your account from the app. Authentication tokens are stored in the iOS Keychain.` },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": HOME_FAQ.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
};

const STEPS = [
  { n: "Work", t: "Log shifts for one or more employers." },
  { n: "Earn", t: "See what you have earned and when you get paid." },
  { n: "Spend", t: "Track bills, reminders and expenses." },
  { n: "Reserve", t: "Set aside tax with an estimate and GST/HST summaries." },
  { n: "Prove", t: "Back it up with statements, exports and a paycheque check." },
];

const TOOL_LINKS = [
  { href: "/hourly-pay-calculator", label: "Hourly pay calculator" },
  { href: "/overtime-calculator", label: "Overtime calculator" },
  { href: "/time-card-calculator", label: "Time card calculator" },
  { href: "/take-home-pay-calculator", label: "Take-home pay calculator" },
  { href: "/gst-hst-calculator", label: "GST/HST calculator" },
  { href: "/tax-reserve-calculator", label: "Tax reserve calculator" },
];

const totalHours = SAMPLE_SHIFTS.reduce((a, s) => a + s.hours, 0);
const totalPay = SAMPLE_SHIFTS.reduce((a, s) => a + s.pay, 0);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      {/* Hero */}
      <Container className="grid gap-12 pb-16 pt-12 sm:pt-20 md:grid-cols-[7fr_5fr] md:gap-16 md:pb-24">
        <Reveal className="grid content-start gap-8">
          <div className="grid gap-6">
            <Heading level="display" as="h1">{BRAND.tagline}</Heading>
            <p className="t-lede">
              {`${BRAND.name} is an iPhone app for people paid by the hour. It tracks your shifts, shows what you have earned and when you get paid, and keeps the month's bills in view.`}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AppStoreButton href={APP_STORE_URL} />
              <Button href="/features" variant="secondary">See features</Button>
            </div>
            <p className="text-[0.9375rem] text-ink-2">Free to start. {BRAND.proName} has a {PRICING.trialDays}-day free trial.</p>
          </div>
          <AllocationBar className="max-w-[560px] border-t border-rule pt-6" />
        </Reveal>
        <Reveal index={1} className="md:pt-4">
          <HeroPayCard />
        </Reveal>
      </Container>

      {/* Five steps */}
      <Section label="How it works" title="From the shift to the paycheque and back">
        <ol className="grid border-t border-rule md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.n} className="border-b border-rule py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
              <Label as="span">0{i + 1}</Label>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">{s.n}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">{s.t}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Feature rows */}
      <section aria-label="What the app does">
        <Container>
          <FeatureRow
            label="Work"
            title="Track shifts across employers"
            visual={
              <figure className="card p-5 sm:p-6">
                <figcaption className="mb-3 flex items-baseline justify-between gap-4">
                  <span className="t-label">Shifts, this pay period</span>
                  <span className="t-label">Sample data</span>
                </figcaption>
                <LedgerTable
                  caption="Sample shifts with hours, rate and pay"
                  columns={[
                    { key: "date", label: "Date" },
                    { key: "employer", label: "Employer" },
                    { key: "hours", label: "Hours", align: "right" },
                    { key: "rate", label: "Rate", align: "right" },
                    { key: "pay", label: "Pay", align: "right" },
                  ]}
                  rows={SAMPLE_SHIFTS.map((s) => ({ date: s.date, employer: s.employer, hours: `${s.hours}.0`, rate: money(s.rate), pay: money(s.pay) }))}
                  footer={{ date: "Total", employer: "", hours: `${totalHours}.0`, rate: "", pay: money(totalPay) }}
                />
              </figure>
            }
          >
            <p>Log a shift in a few taps, for one employer or several. Each shift keeps its own rate, so the pay on every row is worked out for you.</p>
            <p>Free covers one employer and your last 30 days. Pro adds more employers and your full history.</p>
          </FeatureRow>

          <FeatureRow
            reverse
            label="Earn"
            title="Know your next paycheque"
            visual={
              <div className="card grid gap-8 p-5 sm:p-6">
                <Figure label="Expected paycheque" value="$863" cents=".83" tone="positive" note="$1,008.00 gross less $144.17 estimated deductions" />
                <LineChart />
              </div>
            }
          >
            <p>Set your pay schedule and the app shows a payday countdown, what you have earned so far this period, and an estimate of the paycheque after deductions.</p>
            <p>It is an estimate from your logged hours, not a promise of what an employer will pay.</p>
          </FeatureRow>

          <FeatureRow
            label="Spend"
            title="Plan the month's bills"
            visual={
              <PhoneFrame
                src="/screenshots/budget.png"
                alt="The Budget screen: 145 dollars and 46 cents still to earn this month, with about 5 more hours of work covering the plan, 1,444 dollars and 54 cents earned after deductions against 1,590 dollars planned, and the bills due."
              />
            }
          >
            <p>Put your bills and budgets on a monthly plan. The app shows how much is still to earn to cover it, and reminds you before a bill is due.</p>
            <p>Budget and bill reminders are free.</p>
          </FeatureRow>

          <FeatureRow
            reverse
            label="Prove"
            title="Prove it with statements and exports"
            visual={
              <PhoneFrame
                src="/screenshots/reports.png"
                alt="The Reports screen for the month: 1,770 dollars before tax over 63 hours and 10 shifts, estimated deductions, 1,444 dollars and 54 cents after deductions, and links to earnings, pay statement and paycheque tracker."
              />
            }
          >
            <p>Reports roll up gross pay, hours and shifts by week, month, three months or year. Export them as PDF or CSV, create pay statements, and invoice clients if you are self-employed.</p>
            <p>The paycheque tracker checks a paycheque against the hours you logged. Exports and the paycheque tracker are in Pro.</p>
          </FeatureRow>
        </Container>
      </section>

      {/* Free vs Pro */}
      <Section
        label="Free and Pro"
        title="Start free. Add Pro when you need more."
        lede={`${BRAND.proName} is ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel}, with a ${PRICING.trialDays}-day free trial.`}
      >
        <FreeVsPro />
        <div className="mt-8">
          <Button href="/pricing" variant="secondary">See pricing</Button>
        </div>
      </Section>

      {/* Calculators */}
      <Section label="Free tools" title="Calculators that work without the app" lede="Hours, overtime, take-home pay and GST/HST. No sign-up.">
        <ul className="grid border-b border-rule sm:grid-cols-2 sm:gap-x-16">
          {TOOL_LINKS.map((t) => (
            <li key={t.href} className="border-t border-rule">
              <Link href={t.href} className="link-hover flex min-h-[56px] items-center justify-between text-[1.0625rem] text-ink hover:underline underline-offset-4">
                {t.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/tools" variant="text">All calculators</Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section label="Questions" title="Short answers">
        <FaqList items={HOME_FAQ} />
      </Section>

      {/* Closing */}
      <Section title="Start with your next shift.">
        <div className="flex flex-wrap items-center gap-4">
          <AppStoreButton href={APP_STORE_URL} />
          <p className="text-[0.9375rem] text-ink-2">Free on iPhone and iPad, iOS 16 or later.</p>
        </div>
      </Section>
    </>
  );
}
