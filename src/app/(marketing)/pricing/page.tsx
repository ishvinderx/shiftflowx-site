import type { Metadata } from "next";
import { AppStoreButton, Callout, FaqList, Figure, PageHeader, Section } from "@/components/ui";
import FreeVsPro from "@/components/marketing/FreeVsPro";
import { PRICING, BILLING_FAQ, BRAND, SITE_URL, APP_STORE_URL } from "@/lib/constants";
import { canonicalAlt } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Pricing — Free ${PRICING.trialDays}-Day Trial, Then ${PRICING.monthly.shortLabel}`,
  description:
    `Simple, transparent pricing. Try HoursFlow Pro free for ${PRICING.trialDays} days, then ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel}. Cancel anytime.`,
  // Without this the root layout's canonical (SITE_URL) is inherited,
  // telling Google this page duplicates the homepage — which drops it from the index.
  alternates: canonicalAlt("/pricing"),
};

// Server-rendered structured data (AI-SEO pass, 2026-08): the pricing page carried no
// schema at all, so AI engines answering "[product] pricing" queries had nothing to
// extract here. Both blocks are built from the SAME constants the visible UI renders —
// the schema can never quote a price or a question the page doesn't show.
const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HoursFlow",
  operatingSystem: "iOS",
  applicationCategory: "FinanceApplication",
  url: `${SITE_URL}/pricing`,
  installUrl: APP_STORE_URL,
  offers: [
    {
      "@type": "Offer",
      name: PRICING.monthly.name,
      price: PRICING.monthly.price,
      priceCurrency: PRICING.currency,
      description: PRICING.monthly.afterTrial,
    },
    {
      "@type": "Offer",
      name: PRICING.annual.name,
      price: PRICING.annual.price,
      priceCurrency: PRICING.currency,
      description: PRICING.annual.afterTrial,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BILLING_FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// JSON-LD is serialized from compile-time constants (no user input), but escape `<`
// anyway so a `</script>` sequence in any future string can never break out of the tag.
const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />
      <PageHeader
        label="Pricing"
        title="Free to start. Pro when you need more."
        lede={`${BRAND.proName} starts with a ${PRICING.trialDays}-day free trial. Monthly and Annual give identical access; only the billing differs.`}
      >
        <AppStoreButton href={APP_STORE_URL} />
      </PageHeader>

      <Section rule={false} label="Plans" title="Two ways to pay for Pro">
        <div className="grid border-t border-rule md:grid-cols-2">
          <div className="grid content-start gap-5 border-b border-rule py-8 md:border-b-0 md:border-r md:pr-10">
            <Figure label={PRICING.monthly.name} value={PRICING.monthly.priceLabel} cents={PRICING.monthly.cadence} />
            <p className="t-body text-ink-2">{PRICING.monthly.afterTrial}</p>
            <p className="text-[0.9375rem] text-ink-2">Billed monthly. Cancel anytime.</p>
          </div>
          <div className="grid content-start gap-5 py-8 md:pl-10">
            <Figure label={PRICING.annual.name} value={PRICING.annual.priceLabel} cents={PRICING.annual.cadence} />
            <p className="t-body text-ink-2">{PRICING.annual.afterTrial}</p>
            <p className="text-[0.9375rem] text-ink">
              {PRICING.annual.monthlyEquivalentLabel} a month, which saves ${PRICING.annual.savingsAmount.toFixed(2)} ({PRICING.annual.savingsPct}%) a year compared with paying monthly.
            </p>
          </div>
        </div>
        <Callout label="About the trial and renewal" className="mt-10">
          The {PRICING.trialDays}-day free trial is an App Store introductory offer for new subscribers. It starts when you start it in the app and includes every Pro feature. Unless you cancel at least 24 hours before the trial ends, your chosen plan begins and renews automatically each period at the price shown. Manage or cancel in your Apple ID subscription settings. Prices are in {PRICING.currency}; local App Store pricing applies.
        </Callout>
      </Section>

      <Section label="Free and Pro" title="What each plan includes">
        <FreeVsPro showFullPolicy />
      </Section>

      <Section label="Billing" title="Billing questions">
        <FaqList items={BILLING_FAQ} />
      </Section>
    </>
  );
}
