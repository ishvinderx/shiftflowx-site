import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolPageView from "@/components/analytics/ToolPageView";
import { PRICING } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shiftflowx.net'),
  title: {
    default: 'ShiftFlow — Shift Tracker & Payday App',
    template: '%s | ShiftFlow'
  },
  description: 'ShiftFlow is an iOS app for tracking work hours, earnings, budget, bills and tax estimates. Free to start; Pro adds a 7-day free trial.',
  keywords: [
    'shift tracker app', 'payday tracker app', 'gig worker finance app',
    'employee paycheck tracker', 'freelancer invoice tracker',
    'work hours tracker', 'self-employed tax tracker',
    'budget and bill reminders', 'income tracker',
    'overtime calculator app'
  ],
  authors: [{ name: 'ShiftFlow', url: 'https://shiftflowx.net' }],
  creator: 'ShiftFlow',
  publisher: 'ShiftFlow',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shiftflowx.net',
    siteName: 'ShiftFlow',
    title: 'ShiftFlow — Shift Tracker & Payday App',
    description: 'Track work hours, earnings, payday, budget, bills and tax estimates. Free to start.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ShiftFlow — Know exactly what you’ve earned' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShiftFlow — Shift Tracker & Payday App',
    description: 'Track work hours, earnings, payday, budget, bills and tax estimates.',
    images: ['/opengraph-image'],
    creator: '@shiftflowapp'
  },
  alternates: { canonical: 'https://shiftflowx.net' },
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
    title: "ShiftFlow",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ShiftFlow",
    "alternateName": ["ShiftFlow App", "ShiftFlow — Shift & Payday Tracker"],
    "description": "ShiftFlow is an iOS app that helps employees, freelancers, contractors, and gig workers track work hours, earnings, payday, budget, bills and tax estimates.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Workforce Management",
    "operatingSystem": "iOS 16+",
    "url": "https://shiftflowx.net",
    "downloadUrl": "https://apps.apple.com/app/shiftflow/id6768095892",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": `${PRICING.trialDays}-day free trial. ShiftFlow Pro from ${PRICING.monthly.perLabel} or ${PRICING.annual.perLabel}.`
    },
    "featureList": [
      "Shift Tracking",
      "Earnings and Payday",
      "Budget and Bill Reminders",
      "Tax Estimates",
      "Invoices and Pay Statements",
      "Receipt and Payslip Scanning",
      "Paycheck Tracker"
    ],
    "screenshot": "https://shiftflowx.net/opengraph-image",
    "image": "https://shiftflowx.net/icon.png"
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShiftFlow",
    "url": "https://shiftflowx.net",
    "logo": "https://shiftflowx.net/icon.png",
    "description": "ShiftFlow builds an iOS app for employees, freelancers, and gig workers to track hours, earnings, bills and tax estimates.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@shiftflowx.net",
      "contactType": "customer support"
    },
    "sameAs": []
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ShiftFlow",
    "url": "https://shiftflowx.net",
    "description": "iOS app for tracking work hours, earnings, budget, bills and tax estimates"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ToolPageView />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
