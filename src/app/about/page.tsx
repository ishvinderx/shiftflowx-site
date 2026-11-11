import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://shiftflowx.net/about" }
  ]
};

export const metadata: Metadata = {
  title: "About ShiftFlow",
  description:
    "ShiftFlow was built on one belief: every worker deserves to be paid fairly. Learn about the iOS app that helps employees, freelancers, and gig workers track hours, earnings, bills and tax estimates.",
  alternates: { canonical: 'https://shiftflowx.net/about' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutClient />
    </>
  );
}
