import type { Metadata } from "next";
import { AppStoreButton, PageHeader, Section } from "@/components/ui";
import { APP_STORE_URL, BRAND, PRICING } from "@/lib/constants";

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Download", "item": "https://shiftflowx.net/download" }
  ]
};

export const metadata: Metadata = {
  title: "Download for iPhone & iPad — Free 7-Day Trial",
  description:
    "Download HoursFlow free on the App Store. Track shifts, earnings, payday, budget and bills; Pro adds a 7-day free trial. iOS 16+, iPhone & iPad.",
  alternates: { canonical: 'https://shiftflowx.net/download' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHeader
        label="Download"
        title={`Get ${BRAND.name} on your iPhone`}
        lede={`Free to start. ${BRAND.proName} has a ${PRICING.trialDays}-day free trial, billed through the App Store.`}
      >
        <AppStoreButton href={APP_STORE_URL} />
      </PageHeader>
      <Section rule={false}>
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr-appstore.svg" alt={`QR code linking to ${BRAND.name} on the App Store`} width={112} height={112} className="border border-rule" />
            <div>
              <p className="font-semibold text-ink">Scan to download</p>
              <p className="text-[0.9375rem] text-ink-2">Point your iPhone camera at the code.</p>
            </div>
          </div>
          <dl className="border-b border-rule">
            {[
              ["iPhone", "iOS 16.0 or later"],
              ["iPad", "iPadOS 16.0 or later"],
              ["Connection", "Wi-Fi or cellular"],
              ["Price", `Free. ${BRAND.proName} from ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel}`],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[1fr_2fr] sm:gap-8">
                <dt className="t-label self-center">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
