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
  title: "About ShiftFlow — AI-Powered Workforce Financial Intelligence",
  description:
    "ShiftFlow was built on one belief: every worker deserves to be paid fairly. Learn how our AI-powered workforce financial intelligence platform is changing how employees, freelancers, and gig workers protect their income.",
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
