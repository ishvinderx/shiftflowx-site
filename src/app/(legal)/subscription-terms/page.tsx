import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalTable from "@/components/legal/LegalTable";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, PLAN_POLICY, PRICING, SUPPORT_EMAIL, TRIAL_DAYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Subscription terms",
  description: `${BRAND.proName} subscription terms: plans, prices, the ${TRIAL_DAYS}-day free trial, automatic renewal, how to cancel in your Apple ID settings, price changes, refunds and what happens if a subscription lapses.`,
  alternates: canonicalAlt("/subscription-terms"),
};

const toc = [
  { id: "plans", label: "Plans and prices" },
  { id: "included", label: "What is included" },
  { id: "payment", label: "Payment and renewal" },
  { id: "trial", label: "Free trial" },
  { id: "cancel", label: "Cancel or manage" },
  { id: "price-changes", label: "Price changes" },
  { id: "family-sharing", label: "Family Sharing" },
  { id: "lapse", label: "If a subscription lapses" },
  { id: "restore", label: "Restore purchases" },
  { id: "refunds", label: "Refunds" },
  { id: "your-rights", label: "Your statutory rights" },
  { id: "links", label: "Other terms" },
];

export default function SubscriptionTermsPage() {
  return (
    <LegalLayout
      title="Subscription terms"
      whatChanged="Rewritten to set out every subscription detail Apple requires. The Free plan now covers two employers. Family Sharing is stated as not enabled."
      toc={toc}
    >
      <section id="plans">
        <h2>Plans and prices</h2>
        <p>{BRAND.name} has a Free plan and a paid plan, {BRAND.proName}. Pro is an auto-renewing subscription in one subscription group, so you can hold only one at a time. Prices are in US dollars. Apple may show the price in your local currency and may add tax where the law requires it.</p>
        <LegalTable caption="Subscription titles, lengths and prices">
          <thead>
            <tr><th scope="col">Subscription title</th><th scope="col">Length of each period</th><th scope="col">Price per period</th><th scope="col">Free trial</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">{BRAND.proName}, Monthly ({PRICING.monthly.name})</th><td>1 month</td><td>US${PRICING.monthly.price.toFixed(2)} per month</td><td>{TRIAL_DAYS} days, for new subscribers</td></tr>
            <tr><th scope="row">{BRAND.proName}, Annual ({PRICING.annual.name})</th><td>1 year</td><td>US${PRICING.annual.price.toFixed(2)} per year</td><td>{TRIAL_DAYS} days, for new subscribers</td></tr>
          </tbody>
        </LegalTable>
      </section>

      <section id="included">
        <h2>What is included</h2>
        <p>Free: {PLAN_POLICY.free.replace(/^Free: /, "")}</p>
        <p>Pro: {PLAN_POLICY.subscribers.replace(/^Pro: /, "")}</p>
        <p>Monthly and Annual give the same access. Only the billing period differs. The figures and totals in the app are estimates from what you enter (see the <Link href="/terms#estimates">terms of use</Link>).</p>
      </section>

      <section id="payment">
        <h2>Payment and renewal</h2>
        <ul>
          <li>Pro is bought only through Apple in-app purchase. We do not take payment ourselves and never see your card number.</li>
          <li>Payment is charged to your Apple ID account when you confirm the purchase. If you start with a free trial, the first charge happens when the trial ends.</li>
          <li>The subscription renews automatically for another period of the same length unless you cancel it at least 24 hours before the end of the current period.</li>
          <li>Your account is charged for renewal within 24 hours before the end of the current period, at the price for that period shown above, unless the price has changed under the next section.</li>
        </ul>
      </section>

      <section id="trial">
        <h2>Free trial</h2>
        <p>New subscribers get a {TRIAL_DAYS}-day free trial of Pro. During the trial you have all Pro features. To avoid being charged, cancel at least 24 hours before the trial ends. If you do not cancel, the trial turns into a paid subscription at the price of the plan you chose. Apple decides who qualifies as a new subscriber, and a trial can be used once per Apple ID for this subscription group. Any unused part of a free trial is forfeited when you buy a subscription to Pro before the trial ends.</p>
      </section>

      <section id="cancel">
        <h2>Cancel or manage</h2>
        <p>You manage and cancel Pro in your Apple ID settings, not in our app or on our website. On an iPhone or iPad: open Settings, tap your name, tap Subscriptions, choose {BRAND.name}, and tap Cancel Subscription (or choose another plan). You can also manage it in the App Store app under your account. If you cancel, you keep Pro until the end of the period you already paid for, then your account moves to the Free plan. Deleting your {BRAND.name} account does not cancel the subscription.</p>
      </section>

      <section id="price-changes">
        <h2>Price changes</h2>
        <p>We may change the price of Pro. A new price applies from your next renewal after the change takes effect and never to a period you have already paid for. Where the law or Apple&rsquo;s rules require it, Apple will tell you and ask for your agreement before a price increase applies. If you do not agree, your subscription does not renew at the new price. You can cancel at any time before it does.</p>
      </section>

      <section id="family-sharing">
        <h2>Family Sharing</h2>
        <p>Family Sharing is not enabled for {BRAND.proName}. Each person who wants Pro needs their own subscription.</p>
      </section>

      <section id="lapse">
        <h2>If a subscription lapses</h2>
        <p>{PLAN_POLICY.lapse} Your account moves to the Free plan: you keep your data, you can still log, and two employers stay active. Older records, extra employers, exports, invoices and the other Pro features become hidden or locked until you subscribe again. We delete nothing because a subscription ended. Data export and account deletion stay free.</p>
      </section>

      <section id="restore">
        <h2>Restore purchases</h2>
        <p>If you reinstall the app or get a new device, sign in with the same account and use Restore purchases in the app. Your subscription belongs to your Apple ID and is checked through Apple and RevenueCat.</p>
      </section>

      <section id="refunds">
        <h2>Refunds</h2>
        <p>Apple handles refunds. To ask for one, go to <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>. See our <Link href="/refund">refund page</Link>.</p>
      </section>

      <section id="your-rights">
        <h2>Your statutory rights</h2>
        <p>Nothing here limits consumer rights that cannot be waived where you live, such as rights about automatic renewal, cancellation and cooling-off periods under the laws of Ontario, Quebec, California, the European Union, the United Kingdom and Australia. Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> if you need help using them.</p>
      </section>

      <section id="links">
        <h2>Other terms</h2>
        <p>These terms sit alongside our <Link href="/terms">terms of use</Link>, our <Link href="/privacy">privacy policy</Link> and Apple&rsquo;s standard <Link href="/eula">EULA</Link>.</p>
      </section>
    </LegalLayout>
  );
}
