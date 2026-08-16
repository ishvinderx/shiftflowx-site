import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import { PRICING, BILLING_FAQ, SITE_URL, APP_STORE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — Free 7-Day Trial, Then $9.99/mo",
  description:
    "Simple, transparent pricing. Try ShiftFlow Pro free for 7 days, then $9.99/month or $59.99/year. Cancel anytime.",
  // Without this the root layout's canonical ('https://shiftflowx.net') is inherited,
  // telling Google this page duplicates the homepage — which drops it from the index.
  alternates: { canonical: 'https://shiftflowx.net/pricing' },
};

// Server-rendered structured data (AI-SEO pass, 2026-08): the pricing page carried no
// schema at all, so AI engines answering "[product] pricing" queries had nothing to
// extract here. Both blocks are built from the SAME constants the visible UI renders —
// the schema can never quote a price or a question the page doesn't show.
const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ShiftFlow",
  operatingSystem: "iOS",
  applicationCategory: "FinanceApplication",
  url: `${SITE_URL}/pricing`,
  installUrl: APP_STORE_URL,
  offers: [
    {
      "@type": "Offer",
      name: PRICING.monthly.name,
      price: PRICING.monthly.price,
      priceCurrency: "USD",
      description: PRICING.monthly.afterTrial,
    },
    {
      "@type": "Offer",
      name: PRICING.annual.name,
      price: PRICING.annual.price,
      priceCurrency: "USD",
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
      <PricingClient />
    </>
  );
}
