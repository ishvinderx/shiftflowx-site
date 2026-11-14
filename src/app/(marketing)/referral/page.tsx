import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { AppStoreButton, FaqList, Heading, Label, PageHeader, Section } from "@/components/ui";
import { APP_STORE_URL, PRICING } from "@/lib/constants";
import { canonicalAlt } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Referral Program — Earn 30 Days of Pro",
  description:
    "Share HoursFlow with friends and earn 30 days of Pro when a friend you referred completes their first paid billing period. Limits may apply.",
  // Without this the root layout's canonical is inherited, pointing this page at the homepage.
  alternates: canonicalAlt("/referral"),
  openGraph: {
    title: "HoursFlow Referral Program — Earn 30 Days of Pro",
    description:
      "Share HoursFlow and earn 30 days of Pro when a friend you referred completes their first paid billing period.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const STEPS = [
  {
    title: "Share your link",
    description:
      "Open HoursFlow, go to Profile → Referrals, and copy your personal invite link. Share it in a message, a post, or anywhere your friends are.",
  },
  {
    title: "A friend signs up and subscribes",
    description:
      "Your friend downloads HoursFlow using your link, creates their account, and subscribes to HoursFlow Pro. The reward is earned once they complete their first paid billing period. A free trial on its own does not count.",
  },
  {
    title: "You get 30 days of Pro",
    description:
      "You receive 30 days of HoursFlow Pro, added to your account automatically. The reward goes to you as the referrer; there is no reward for the friend. Limits may apply.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I get my referral link?",
    answer:
      "Your unique referral link is in the HoursFlow app under Profile → Referrals. Tap 'Copy Link' to share it anywhere. Every link is tied to your account so rewards are tracked automatically.",
  },
  {
    question: "When do I receive my 30 days of Pro?",
    answer:
      "Your 30 days of Pro are added after your referred friend completes their first paid billing period. Signing up or starting a free trial is not enough on its own.",
  },
  {
    question: "Is there a limit on how many friends I can refer?",
    answer:
      "You can share your link with as many friends as you like, but limits may apply to the number of rewards one account can earn.",
  },
  {
    question: "What does my friend need to do to qualify?",
    answer:
      "Your friend needs to create a HoursFlow account using your link, subscribe to HoursFlow Pro, and complete their first paid billing period. Your friend does not receive a referral reward.",
  },
];

export default function ReferralPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "HoursFlow", path: "/" }, { name: "Referral", path: "/referral" }]} />
      <PageHeader
        label="Referral program"
        title="Share HoursFlow. Earn 30 days of Pro."
        lede="Earn 30 days of HoursFlow Pro when a friend you referred completes their first paid billing period. Limits may apply."
      >
        <AppStoreButton href={APP_STORE_URL} />
      </PageHeader>

      <Section rule={false} label="How it works" title="Three steps">
        <ol className="border-b border-rule">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-3 border-t border-rule py-8 md:grid-cols-[1fr_4fr_7fr] md:gap-10">
              <Label as="span">0{i + 1}</Label>
              <Heading level="h3">{s.title}</Heading>
              <p className="t-body text-ink-2">{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="FAQ" title="Questions about referrals">
        <FaqList items={FAQ_ITEMS.map((f) => ({ q: f.question, a: f.answer }))} />
        <p className="t-body mt-8 text-ink-2">
          Free to download. Pro includes a {PRICING.trialDays}-day trial. Cancel anytime.
        </p>
      </Section>
    </>
  );
}
