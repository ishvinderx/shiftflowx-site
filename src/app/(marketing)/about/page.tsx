import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { AppStoreButton, Heading, PageHeader, Section } from "@/components/ui";
import { APP_STORE_URL, BRAND } from "@/lib/constants";
import { canonicalAlt } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About HoursFlow",
  description:
    "HoursFlow is an iOS app that helps employees, freelancers and gig workers keep their own record of hours, earnings, bills and tax estimates, so they can check their pay with confidence.",
  alternates: canonicalAlt("/about"),
};

const VALUES = [
  { title: "Transparency", body: "We explain our calculations and label estimates as estimates. You always know how your data is used." },
  { title: "Privacy", body: "Payroll data is some of the most sensitive information you have. We encrypt it, never sell it, and let you delete your account from the app at any time." },
  { title: "Clarity", body: `${BRAND.name} gives you a clear record of your hours and earnings, so you can check your pay with confidence.` },
  { title: "Simplicity", body: "Tracking your pay should not be another chore. We keep the app quick to use." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "HoursFlow", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHeader
        label="About"
        title="Workers should be able to check their own pay"
        lede="Employers have payroll systems and compliance teams. Workers often have a pay stub and a hope that the numbers are right. HoursFlow gives you your own record."
      >
        <AppStoreButton href={APP_STORE_URL} />
      </PageHeader>

      <Section rule={false} label="Our story" title="Why we built it">
        <div className="t-body grid gap-5 text-ink">
          <p>
            It started with a question: how many workers are paid less than they are owed, because no one kept a count? Missed overtime, a wrong rate or an unpaid break are easy to miss if the only record is your employer&apos;s.
          </p>
          <p>
            {BRAND.name} is a tool any worker can use, whether a nurse, driver, barista or contractor, to keep hours, income, bills and tax estimates in one place.
          </p>
          <p>
            When you do not know when your next paycheque arrives or what it should be, planning is hard. The app keeps your hours, payday and bills together so you can see it.
          </p>
        </div>
      </Section>

      <Section label="Philosophy" title="What we hold to">
        <div className="t-body grid gap-5 text-ink">
          <p><strong className="font-semibold">Good tools should not be a privilege.</strong> Tracking your hours and pay should be available to every worker.</p>
          <p><strong className="font-semibold">Your data is yours.</strong> You can export it and delete your account from the app at any time.</p>
          <p><strong className="font-semibold">Estimates should say they are estimates.</strong> Payday and tax figures are based on what you enter. We would rather be clear about what the app cannot tell you.</p>
        </div>
      </Section>

      <Section label="Values" title="Four things we check ourselves against">
        <dl className="border-b border-rule">
          {VALUES.map((v) => (
            <div key={v.title} className="grid gap-2 border-t border-rule py-6 md:grid-cols-[4fr_8fr] md:gap-16">
              <dt><Heading level="h3">{v.title}</Heading></dt>
              <dd className="t-body text-ink-2">{v.body}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
