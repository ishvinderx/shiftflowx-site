import type { Metadata } from "next";
import FeaturesPage from "./FeaturesClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://shiftflowx.net/features" }
  ]
};

export const metadata: Metadata = {
  title: "Features — Shift Tracking, Payday, Budget and Tax Report",
  description:
    "Explore HoursFlow: shift and earnings tracking, payday, budget and bill reminders, tax report, exports and invoices, receipt and payslip scanning, and the paycheck tracker. Built for employees, gig workers, and freelancers.",
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
