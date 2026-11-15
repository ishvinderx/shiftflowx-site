import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolPageView from "@/components/analytics/ToolPageView";
import { PRICING, BRAND, SITE_URL, SUPPORT_EMAIL, APP_STORE_URL } from "@/lib/constants";

// Geist via next/font/google (self-hosted at build time). Mono is only used for tabular code-like text.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const TITLE = `${BRAND.name} — Shift Tracker & Payday App`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BRAND.name}`
  },
  description: `${BRAND.name} is an iOS app for tracking work hours, earnings, budget, bills and tax estimates. Free to start; Pro adds a ${PRICING.trialDays}-day free trial.`,
  keywords: [
    'shift tracker app', 'payday tracker app', 'gig worker finance app',
    'paycheque check', 'freelancer invoice tracker',
    'work hours tracker', 'self-employed tax tracker',
    'budget and bill reminders', 'income tracker',
    'overtime calculator app'
  ],
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.legalEntity,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND.name,
    title: TITLE,
    description: 'Track work hours, earnings, payday, budget, bills and tax estimates. Free to start.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${BRAND.name} — ${BRAND.tagline}` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Track work hours, earnings, payday, budget, bills and tax estimates.',
    images: ['/opengraph-image'],
  },
  alternates: { canonical: SITE_URL },
  category: 'Finance',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '1024x1024', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND.name,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": BRAND.name,
    "alternateName": [`${BRAND.name} App`, `${BRAND.name} — Shift & Payday Tracker`],
    "description": `${BRAND.name} is an iOS app that helps employees, freelancers, contractors, and gig workers track work hours, earnings, payday, budget, bills and tax estimates.`,
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Workforce Management",
    "operatingSystem": "iOS 16+",
    "url": SITE_URL,
    "downloadUrl": APP_STORE_URL,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": `${PRICING.trialDays}-day free trial. ${BRAND.proName} from ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel}.`
    },
    "featureList": [
      "Shift Tracking",
      "Earnings and Payday",
      "Budget and Bill Reminders",
      "Tax Estimates",
      "Invoices and Pay Statements",
      "Receipt and Payslip Scanning",
      "Paycheque check: the answer",
      "Paycheque check detail",
      "Import from a CSV file",
      "Shift import from a photo"
    ],
    "screenshot": `${SITE_URL}/opengraph-image`,
    "image": `${SITE_URL}/icon.png`
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon.png`,
    "description": `${BRAND.name} is operated by ${BRAND.legalEntity} and is an iOS app for employees, freelancers, and gig workers to track hours, earnings, bills and tax estimates.`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SUPPORT_EMAIL,
      "contactType": "customer support"
    },
    "sameAs": []
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND.name,
    "url": SITE_URL,
    "description": "iOS app for tracking work hours, earnings, budget, bills and tax estimates"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} h-full`}>
      <head>
        {/* Enables the scroll fade-up only when JS runs (content is visible without it). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <ToolPageView />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
