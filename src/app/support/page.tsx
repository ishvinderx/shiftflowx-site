import type { Metadata } from "next";
import SupportClient from "./SupportClient";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Support", "item": "https://shiftflowx.net/support" }
  ]
};

export const metadata: Metadata = {
  title: "ShiftFlow Support — Help Center, FAQ & Contact",
  description:
    "Get help with ShiftFlow. Browse our FAQ, learn how to track shifts and manage your subscription, or contact our support team at support@shiftflowx.net. We respond within 24 hours.",
  alternates: { canonical: 'https://shiftflowx.net/support' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SupportClient />
    </>
  );
}
