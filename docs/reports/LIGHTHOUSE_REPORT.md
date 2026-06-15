# Lighthouse Report — ShiftFlow Website

## Target Scores

| Category | Target | Strategy |
|---|---|---|
| Performance | 95+ | Next/Image, code splitting, font subsetting, no layout shift |
| Accessibility | 100 | Semantic HTML, ARIA labels, colour contrast ≥4.5:1, focus rings |
| Best Practices | 100 | HTTPS, no deprecated APIs, no console errors in prod |
| SEO | 100 | Metadata, structured data, canonical, robots, sitemap |

---

## Performance Strategy

### Images (`next/image`)

All images go through `next/image` which automatically:
- Serves WebP/AVIF based on browser support
- Generates `srcset` for responsive sizes
- Lazy-loads off-screen images (`loading="lazy"` by default)
- Prevents layout shift via explicit `width`/`height` or `fill` + `sizes`

Critical above-the-fold images use `priority` flag:

```tsx
<Image
  src="/screenshots/home-dark.webp"
  alt="ShiftFlow home screen"
  width={390}
  height={780}
  priority
  quality={90}
/>
```

### Code Splitting

Next.js App Router automatically code-splits at the route level. Additional patterns:

- Heavy components (charts, modals) use `dynamic()` with `ssr: false`
- Framer Motion is imported only on client components (`"use client"`)
- PostHog analytics deferred until after first user interaction

```ts
const HeavyChart = dynamic(() => import("../components/HeavyChart"), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### Lazy Loading

- `<FAQSection>` and `<TestimonialsSection>` are lazily hydrated
- Intersection Observer used for `AnimatedCounter` and reveal animations
- Third-party embeds (if any) use `loading="lazy"` iframes

### Font Optimization

Inter is loaded via `next/font/google` which:
- Self-hosts the font files (no round-trip to Google servers)
- Subsets to Latin by default
- Sets `font-display: swap` automatically
- Zero layout shift because font metrics are pre-calculated

```ts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
```

---

## Accessibility Checklist

- All interactive elements are keyboard-navigable (Tab order is logical)
- Buttons have accessible labels (not just icons)
- Colour contrast: white text on `#050508` = 19.5:1 (far exceeds AA)
- Colour contrast: `#D63C6B` on `#050508` = 4.7:1 (passes AA)
- Images have descriptive `alt` text; purely decorative images use `alt=""`
- Accordion FAQ uses `<details>`/`<summary>` for native keyboard support
- No `tabIndex` > 0 — natural DOM order is used
- `<html lang="en">` set in root layout

---

## Best Practices

- HTTPS enforced (Railway + custom domain with auto-SSL)
- `Content-Security-Policy` header set via `next.config.js` headers
- No use of `document.write` or deprecated Web APIs
- Console is clean in production (errors only surfaced in development)
- Dependencies kept up-to-date via Dependabot

---

## SEO Score Factors

All 100-point SEO items satisfied:
- `<title>` and `<meta name="description">` on every page
- `rel="canonical"` prevents duplicate indexing
- `robots.txt` allows crawlers, disables admin
- `sitemap.xml` submitted to Google Search Console
- Pages are crawlable (no JS-only render, server components used for critical content)
- Structured data (FAQPage, MobileApplication) validates in Rich Results Test

---

## Monitoring

Lighthouse CI runs on every PR via GitHub Actions:

```yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://staging.shiftflowx.net/
      https://staging.shiftflowx.net/pricing
    budgetPath: ./lighthouse-budget.json
    uploadArtifacts: true
```

Budget thresholds: Performance ≥90, Accessibility 100, Best Practices 100, SEO 100.
