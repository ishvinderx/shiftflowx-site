import type { Metadata } from "next";
import DownloadClient from "./DownloadClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Download", "item": "https://shiftflowx.net/download" }
  ]
};

export const metadata: Metadata = {
  title: "Download ShiftFlow — Free 7-Day Trial on iPhone & iPad",
  description:
    "Download ShiftFlow free on the App Store. Get full access to AI payroll protection, payday forecasting, burnout analytics, and more. iOS 16+, iPhone & iPad. No credit card required.",
  alternates: { canonical: 'https://shiftflowx.net/download' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <DownloadClient />
    </>
  );
}
