import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shiftflowx.net'),
  title: {
    default: 'ShiftFlow — AI Shift Tracker & Payday Forecasting App',
    template: '%s | ShiftFlow'
  },
  description: 'ShiftFlow is an AI-powered workforce financial intelligence app. Track shifts, predict paydays, detect payroll errors, manage taxes, prevent burnout, and generate invoices. Free 7-day trial.',
  keywords: [
    'shift tracker app', 'AI payroll tracker', 'payday forecasting app', 'gig worker finance app',
    'burnout tracking app', 'employee paycheck tracker', 'freelancer invoice tracker',
    'work hours tracker', 'payroll anomaly detection', 'self-employed tax tracker',
    'workforce financial wellness', 'shift scheduling app', 'income tracker',
    'AI financial assistant workers', 'overtime calculator app'
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
    title: 'ShiftFlow — AI Shift Tracker & Payday Forecasting App',
    description: 'Track shifts, predict paydays, detect payroll errors, and prevent burnout with AI. Free 7-day trial.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ShiftFlow — Know exactly what you’ve earned' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShiftFlow — AI Shift Tracker & Payday Forecasting App',
    description: 'Track shifts, predict paydays, catch payroll errors, and prevent burnout with AI.',
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
    "alternateName": ["ShiftFlow App", "ShiftFlow — AI Shift & Payday Tracker"],
    "description": "ShiftFlow is an AI-powered workforce financial intelligence platform that helps employees, freelancers, contractors, and gig workers track shifts, predict paydays, detect payroll errors, manage taxes, prevent burnout, and achieve financial wellness.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Workforce Management",
    "operatingSystem": "iOS 16+",
    "url": "https://shiftflowx.net",
    "downloadUrl": "https://apps.apple.com/app/shiftflow/id6768095892",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "7-day free trial. ShiftFlow Pro from $9.99/month or $99/year."
    },
    "featureList": [
      "AI Payroll Protection",
      "Payday Forecasting",
      "Burnout Analytics",
      "Tax Estimation",
      "Invoice Generator",
      "Payslip OCR Scanner",
      "Financial Health Score",
      "Shift Tracking",
      "Overtime Detection",
      "AI Financial Assistant"
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
    "description": "ShiftFlow builds AI-powered workforce financial intelligence tools for employees, freelancers, and gig workers.",
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
    "description": "AI-powered workforce financial intelligence platform",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shiftflowx.net/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
