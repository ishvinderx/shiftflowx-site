import Hero3D from "@/components/home/Hero3D";
import GlassShowcase from "@/components/home/GlassShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import AppGallery from "@/components/home/AppGallery";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import AppStoreBanner from "@/components/home/AppStoreBanner";

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
      "name": "How does AI payroll anomaly detection work?",
      "acceptedAnswer": { "@type": "Answer", "text": "ShiftFlow cross-references every logged shift against your expected pay rate, applicable overtime rules (FLSA 40h/week threshold), and historical patterns. When a discrepancy is found — missing overtime, short rate, or break violations — you're alerted immediately." }
    },
    {
      "@type": "Question",
      "name": "Can freelancers and gig workers use ShiftFlow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. ShiftFlow is built for all worker types: employees, freelancers, contractors, gig workers, and self-employed professionals. Freelancers can generate invoices, track project earnings, estimate taxes, and manage financial health directly in the app." }
    },
    {
      "@type": "Question",
      "name": "Does ShiftFlow track burnout?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. ShiftFlow includes a Burnout Analytics feature that monitors consecutive days worked, weekly hours, night shift frequency, skipped breaks, and fatigue indicators to give you a real-time burnout risk score and personalized recovery recommendations." }
    },
    {
      "@type": "Question",
      "name": "How much does ShiftFlow cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "ShiftFlow offers a free 7-day trial with full access to all features. After the trial, ShiftFlow Pro is $9.99/month or $59.99/year (save ~50% annually). Subscriptions are managed through the Apple App Store. Cancel anytime." }
    },
    {
      "@type": "Question",
      "name": "Is my payroll data secure with ShiftFlow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Data is encrypted in transit with TLS 1.3, and sensitive fields are encrypted at rest. ShiftFlow never sells your data and supports GDPR and CCPA data-subject rights. Authentication tokens are stored in the iOS Keychain." }
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
      <GlassShowcase />
      <HowItWorks />
      <AppGallery />
      <Pricing />
      <FAQ />
      <AppStoreBanner />
    </>
  );
}
