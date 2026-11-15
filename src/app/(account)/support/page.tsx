import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { FaqList, PageHeader, Section, TextLink } from "@/components/ui";
import { FAQ_ITEMS, SUPPORT_EMAIL } from "@/lib/constants";
import SupportClient from "./SupportClient";
import { canonicalAlt } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Support — Help Center, FAQ & Contact",
  description:
    `Get help with HoursFlow. Browse the FAQ, learn how to manage your subscription, or contact support at ${SUPPORT_EMAIL}. We reply within 24 hours.`,
  alternates: canonicalAlt("/support"),
};

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "HoursFlow", path: "/" }, { name: "Support", path: "/support" }]} />
      <PageHeader label="Support" title="How can we help?" lede="Send a message and we will get back to you within 24 hours." />

      <Section rule={false} className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <h2 className="t-h3 mb-6">Send a message</h2>
            <SupportClient />
          </div>
          <aside className="grid content-start gap-8">
            <div>
              <h2 className="t-label mb-2">Email</h2>
              <TextLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</TextLink>
            </div>
            <div>
              <h2 className="t-label mb-2">Response time</h2>
              <p className="text-ink">Within 24 hours</p>
            </div>
            <div>
              <h2 className="t-label mb-2">Delete your account</h2>
              <p className="text-ink-2">Step-by-step instructions are on the <TextLink href="/delete">delete account page</TextLink>.</p>
            </div>
            <div>
              <h2 className="t-label mb-2">Subscription help</h2>
              <p className="text-ink-2">
                Apple manages all subscriptions. To cancel or change your plan, open Settings, then Apple ID, then Subscriptions on your iPhone. See the <TextLink href="/subscription-terms">subscription terms</TextLink>.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section label="FAQ" title="Quick answers">
        <FaqList items={FAQ_ITEMS.slice(0, 5).map((f) => ({ q: f.question, a: f.answer }))} />
      </Section>
    </>
  );
}
