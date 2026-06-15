# SEO Report — ShiftFlow Website

## Target Keywords

| Priority | Keyword | Monthly Volume | Intent |
|---|---|---|---|
| 1 | shift worker finance app | 1,200 | Informational / Commercial |
| 2 | track shifts and earnings iPhone | 800 | Transactional |
| 3 | paycheck tracker app | 2,400 | Transactional |
| 4 | overtime pay calculator app | 3,100 | Transactional |
| 5 | nurse shift tracker iOS | 900 | Transactional |
| 6 | healthcare worker pay app | 600 | Informational |
| 7 | ShiftFlow app | 450 | Navigational |
| 8 | best time tracking app shift workers | 1,800 | Commercial |

---

## Metadata Strategy

All pages use Next.js `generateMetadata()`:

```ts
export const metadata: Metadata = {
  title: "ShiftFlow — Shift Worker Finance & Pay Tracker",
  description: "Track shifts, calculate overtime, understand your paycheck. The #1 finance app for shift workers, nurses, and hourly employees.",
  keywords: ["shift tracker", "paycheck calculator", "overtime app", "nurse schedule app"],
  openGraph: {
    title: "ShiftFlow — Earn More, Stress Less",
    description: "Automatically calculates your earnings, overtime, and taxes every shift.",
    url: "https://shiftflowx.net",
    siteName: "ShiftFlow",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shiftflowapp",
    images: ["/og-image.png"],
  },
};
```

---

## JSON-LD Schemas

### FAQPage (on `/`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is ShiftFlow free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShiftFlow has a free tier with core shift tracking. Pro features include payslip OCR, AI insights, and tax calculations. A 14-day free trial is available."
      }
    },
    {
      "@type": "Question",
      "name": "Which platforms does ShiftFlow support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ShiftFlow is available on iOS (iPhone and iPad) via the App Store. An Android version is in development."
      }
    }
  ]
}
```

### MobileApplication

```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "ShiftFlow",
  "operatingSystem": "iOS",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1420"
  }
}
```

---

## Sitemap

Auto-generated via `next-sitemap` at build time. Config (`next-sitemap.config.js`):

```js
module.exports = {
  siteUrl: "https://shiftflowx.net",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/delete", "/api/*"],
};
```

Key pages and their priorities:
- `/` — 1.0 (weekly)
- `/pricing` — 0.9
- `/features` — 0.8
- `/blog/*` — 0.7
- `/privacy`, `/terms`, `/eula` — 0.3

---

## robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /delete

Sitemap: https://shiftflowx.net/sitemap.xml
```

---

## OpenGraph Image

`/public/og-image.png` is 1200×630px, dark background (`#050508`), ShiftFlow wordmark left, iPhone screenshot right, tagline below. Regenerated via `opengraph-image.tsx` dynamic route for blog posts.

---

## Core Web Vitals & Crawlability

- All public pages use `export const dynamic = "force-static"` where possible
- Internal links use `<Link>` (not `<a>`) for SPA navigation
- All images have `alt` text; decorative images use `alt=""`
- No render-blocking third-party scripts on critical path
- `rel="canonical"` set on every page to prevent duplicate content from query params
