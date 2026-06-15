import type { Metadata } from "next";
import FeaturesPage from "./FeaturesClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://shiftflowx.net/features" }
  ]
};

export const metadata: Metadata = {
  title: "ShiftFlow Features — AI Payroll Protection, Payday Forecasting & Burnout Analytics",
  description:
    "Explore every ShiftFlow feature: AI payroll protection, payday forecasting, burnout analytics, tax estimation, invoice generator, payslip OCR scanner, and financial health score. Built for employees, gig workers, and freelancers.",
  alternates: { canonical: 'https://shiftflowx.net/features' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <FeaturesPage />
    </>
  );
}
