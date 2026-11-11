import Hero3D from "@/components/home/Hero3D";
import WorkerModes from "@/components/home/WorkerModes";
import GlassShowcase from "@/components/home/GlassShowcase";
import PayTaxIntelligence from "@/components/home/PayTaxIntelligence";
import HowItWorks from "@/components/home/HowItWorks";
import AppGallery from "@/components/home/AppGallery";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import AppStoreBanner from "@/components/home/AppStoreBanner";
import { PRICING } from "@/lib/constants";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "ShiftFlow",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does ShiftFlow estimate paydays?",
      "acceptedAnswer": { "@type": "Answer", "text": "ShiftFlow uses your pay schedule and logged shifts to estimate when your next paycheck is due and roughly how much it will be, using the canonical earnings and tax engines. These are estimates that improve as you log more shifts — not a guarantee." }
    },
    {
      "@type": "Question",
      "name": "How does the paycheck tracker work?",
      "acceptedAnswer": { "@type": "Answer", "text": "The paycheck tracker, a Pro feature, checks a paycheque against the hours you logged in ShiftFlow so you can see whether the amount looks short." }
    },
    {
      "@type": "Question",
      "name": "Can freelancers and gig workers use ShiftFlow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. ShiftFlow is built for all worker types: employees, freelancers, contractors, gig workers, and self-employed professionals. Freelancers can generate invoices, track project earnings, and estimate taxes directly in the app." }
    },
    {
      "@type": "Question",
      "name": "Does ShiftFlow help with budgeting and bills?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. ShiftFlow includes a budget and bill reminders, both available on the free plan." }
    },
    {
      "@type": "Question",
      "name": "How much does ShiftFlow cost?",
      "acceptedAnswer": { "@type": "Answer", "text": `ShiftFlow is free to use for shift tracking with one employer, with the last 30 days of records. ShiftFlow Pro adds full history, multiple employers, exports, tax reports and more, with a ${PRICING.trialDays}-day free trial. Pro is ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel} (save ~${PRICING.annual.savingsPct}% annually). Subscriptions are managed through the Apple App Store. Cancel anytime.` }
    },
    {
      "@type": "Question",
      "name": "Is my payroll data secure with ShiftFlow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Data is encrypted in transit with TLS 1.3, and sensitive fields are encrypted at rest. ShiftFlow never sells your data. You can export your data and delete your account from the app. Authentication tokens are stored in the iOS Keychain." }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {/* Redesigned 2026 — focused glass/3D composition, less noise */}
      <Hero3D />
      {/* v1.4 refresh — components self-number as Section 2 and Section 4 */}
      <WorkerModes />
      <GlassShowcase />
      <PayTaxIntelligence />
      <HowItWorks />
      <AppGallery />
      <Pricing />
      <FAQ />
      <AppStoreBanner />
    </>
  );
}
