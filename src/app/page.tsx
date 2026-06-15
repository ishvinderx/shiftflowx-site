import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import SocialProof from "@/components/home/SocialProof";
import DashboardPreview from "@/components/home/DashboardPreview";
import ProductShowcase from "@/components/home/ProductShowcase";
import ProductTour from "@/components/home/ProductTour";
import AppGallery from "@/components/home/AppGallery";
import TestimonialsGated from "@/components/home/TestimonialsGated";
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
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does ShiftFlow predict paydays?",
      "acceptedAnswer": { "@type": "Answer", "text": "ShiftFlow analyzes your shift history, pay schedule, and employer patterns using AI to predict exactly when your next paycheck will arrive and how much it will be. Accuracy improves with each logged shift." }
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
      "acceptedAnswer": { "@type": "Answer", "text": "ShiftFlow offers a free 30-day trial with full access to all features. After the trial, ShiftFlow Plus is $9.99/month or $99/year (save 17%). Subscriptions are managed through the Apple App Store. Cancel anytime." }
    },
    {
      "@type": "Question",
      "name": "Is my payroll data secure with ShiftFlow?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. ShiftFlow never sells user data. The platform is GDPR and CCPA compliant. Authentication tokens are stored in the iOS Keychain." }
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
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <FeatureShowcase />
      <SocialProof />
      <DashboardPreview />
      {/* Real product demonstrations — real screenshots, no fake social proof */}
      <ProductShowcase />
      <ProductTour />
      <AppGallery />
      {/* TestimonialsGated renders nothing until real verified reviews are passed in */}
      <TestimonialsGated />
      <Pricing />
      <FAQ />
      <AppStoreBanner />
    </>
  );
}
