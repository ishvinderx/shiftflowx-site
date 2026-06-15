# ShiftFlow Website — Performance Audit Report

**Audited:** 2026-06-09  
**Build Tool:** Next.js 16.2.6 (Turbopack)  
**Framework:** Next.js App Router, React 19

---

## A. Build Output Summary

### Route Manifest

| Route | Type | Notes |
|-------|------|-------|
| `/` | Static (○) | Home page — heaviest client component tree |
| `/about` | Static (○) | |
| `/features` | Static (○) | |
| `/pricing` | Static (○) | |
| `/how-it-works` | Static (○) | |
| `/compare` | Static (○) | |
| `/download` | Static (○) | |
| `/support` | Static (○) | |
| `/blog` | Static (○) | |
| `/blog/[slug]` | SSG (●) | 7 paths pre-rendered |
| `/use-cases/*` | Static (○) | 5 pages |
| `/referral` | Static (○) | |
| `/ref/[code]` | Dynamic (ƒ) | Server-rendered on demand |
| `/api/ref/click` | Dynamic (ƒ) | API route |
| `/opengraph-image` | Dynamic (ƒ) | OG image generation |
| Legal pages (×7) | Static (○) | terms, privacy, eula, etc. |
| Admin pages (×2) | Static (○) | No auth guard in build |

> Note: The `⚠ Using edge runtime on a page currently disables static generation for that page` warning appeared during build — likely for the OG image route.

### Production JS Bundle Sizes

| Chunk File | Size (uncompressed) | Identified Content |
|------------|--------------------|--------------------|
| `0whvh662-zl_q.js` | **222 KB** | React runtime / Next.js framework |
| `0beb5ex4nim4n.js` | **146 KB** | Next.js client internals |
| `0zqq1mpb_yij9.js` | **119 KB** | Framer Motion core (`motion-dom`) |
| `03~yq9q893hmn.js` | **110 KB** | Core-JS polyfills |
| `09vcdz-f5583n.js` | **97 KB** | App components (motion.div, home sections) |
| `0d3shmwh5_nmn.js` | **53 KB** | Additional component chunks |
| `0dgq26a5_oy.a.js` | **50 KB** | Additional component chunks |
| `0dmsv2a.wzniw.js` | **38 KB** | Additional component chunks |
| `0i0jjj_la_hzf.js` | **27 KB** | Smaller components/pages |
| Remaining (×12) | **~130 KB** | Page-specific splits |
| **CSS** | **72 KB** | Tailwind CSS (compiled) |
| **Total JS** | **~969 KB** | Uncompressed |
| **Estimated gzipped** | **~290–320 KB** | ~67% compression typical for JS |

> Turbopack does not emit the "First Load JS" per-route summary that webpack-based builds show. The figures above reflect the total shared chunk pool. A typical page load will request a subset based on what's used.

**Estimated First Load JS per route (gzipped):**
- `/` (home) — **~270–290 KB** (loads nearly all chunks due to full component tree)
- Content/legal pages — **~160–180 KB** (framework + minimal component JS)
- `/pricing`, `/features`, `/download` — **~210–230 KB** (includes framer-motion via page client components)

> ⚠ The home page is borderline on the 250 KB warning threshold and likely exceeds it because every section on the page is a client component using framer-motion.

---

## B. Dependency Analysis

| Package | Version | Size Impact | Notes |
|---------|---------|-------------|-------|
| `next` | 16.2.6 | Large (framework) | Current |
| `react` + `react-dom` | 19.2.4 | ~130 KB gzip | Current |
| **`framer-motion`** | ^12.40.0 | **~60–80 KB gzip** | Heavy — see Task D |
| `lucide-react` | ^1.16.0 | ~10–20 KB gzip | Tree-shakeable; used well |
| `@radix-ui/*` | Various | ~15–25 KB gzip | 4 packages, tree-shakeable |
| `tailwind-merge` | ^3.6.0 | ~8 KB gzip | Runtime utility |
| `clsx` | ^2.1.1 | <1 KB | Fine |
| `class-variance-authority` | ^0.7.1 | <2 KB | Fine |
| `next-themes` | ^0.4.6 | ~3 KB | Fine |
| **Total runtime deps** | 21 | — | Lean overall; framer-motion dominates |

**Observations:**
- No analytics/tracking SDK detected in dependencies (PostHog appears via `connect-src` CSP header as a remote endpoint, not a bundled SDK — good)
- No heavy date/utility libraries (moment, lodash, date-fns, etc.) — good
- lucide-react v1.16.0 is very new; named imports are used throughout (tree-shaking works)
- `tailwind-merge` is a runtime dependency — this is necessary but adds ~150 KB uncompressed to the CSS chunk processing

---

## C. Performance Optimization Status

### Images

| Check | Status | Detail |
|-------|--------|--------|
| Uses `next/image` | PASS | All image components use `Image` from `next/image` |
| No raw `<img>` tags | PASS | Zero raw `<img>` tags found in source |
| `fill` + `sizes` props | PASS | All fill-mode images have explicit `sizes` hints |
| `priority` on above-fold | PARTIAL | Priority set in Navbar logo, ProductShowcase (index 0), ProductTour (first item), MarketingScreenshotCard — but **Hero component has no images at all** (it's pure CSS/SVG mockup), so LCP likely comes from a below-fold screenshot |
| **Screenshot image sizes** | **FAIL** | All 6 screenshots are uncompressed PNGs, **1–2.2 MB each**. next/image will serve WebP/AVIF on modern browsers but original PNGs sit on disk unoptimized |
| Modern source formats | FAIL | All public images are `.png`. No `.webp` or `.avif` source files |

**Screenshot sizes (source PNGs):**

| File | Size |
|------|------|
| `home.png` | 2.18 MB |
| `home-dashboard.png` | 2.17 MB |
| `insights.png` | 1.45 MB |
| `paycheck.png` | 1.35 MB |
| `profile.png` | 1.00 MB |
| `shifts.png` | 1.00 MB |
| **Total** | **~9.1 MB** |

> next/image handles optimization at request time (serve WebP, resize), but the source files are very large. First cold-CDN requests will serve full-size originals until the image cache warms up. Consider pre-converting to WebP/AVIF to reduce disk footprint and build times.

### Fonts

| Check | Status | Detail |
|-------|--------|--------|
| Uses `next/font/google` | PASS | `Inter` loaded via `next/font/google` in `layout.tsx` |
| `display: swap` | PASS | Explicitly set |
| Subset specified | PASS | `subsets: ['latin']` |
| Self-hosted (zero external requests) | PASS | `next/font/google` downloads and self-hosts at build time |
| No `@font-face` / Google Fonts `<link>` tags | PASS | No render-blocking external font requests |

Font loading is well-optimized.

### Lazy Loading & Code Splitting

| Check | Status | Detail |
|-------|--------|--------|
| `next/dynamic` usage | **FAIL** | Zero dynamic imports found anywhere in the codebase |
| `React.lazy` usage | **FAIL** | Not used |
| `Suspense` boundaries | **FAIL** | Not used |
| Home page component loading | **FAIL** | All 14 home sections loaded eagerly and statically imported |

The home page imports 14 components at the top level with zero lazy loading. Components like `DashboardPreview`, `ProductTour`, `AppGallery`, `TestimonialsGated`, and `SocialProof` — all of which are well below the fold — are included in the initial JS bundle.

### Server vs Client Components

| Metric | Count |
|--------|-------|
| Total `.tsx` files | 59 |
| Client components (`"use client"`) | 27 (46%) |
| Server components | 32 (54%) |

27 out of 59 components are client components — a high ratio for a marketing site. Notable findings:
- Every home section component is a client component, including ones that only need animations (could be handled with CSS)
- `SectionHeader`, `GlassCard`, `AnimatedSection` are shared utilities that are client components, pulled into every page that uses them

---

## D. Framer Motion Analysis

### Usage Coverage
- **24 files** import from `framer-motion` (out of 59 total `.tsx` files = **41%** of the codebase)
- All 24 files correctly have `"use client"` — **no server component pollution**

### Critical Issue: Framer Motion in Global Navbar

```
src/components/layout/Navbar.tsx  →  imports { motion, AnimatePresence }
src/app/layout.tsx                →  imports Navbar (mounted on EVERY route)
```

The `Navbar` component is rendered globally in `RootLayout` and imports `framer-motion`. This means **framer-motion is bundled into the first load JS of every single page on the site**, including lightweight content pages (privacy policy, terms, legal, robots.txt). The mobile menu animation in the Navbar does not justify the ~60–80 KB (gzipped) library cost on every route.

### Other High-Impact Usages
- `SocialProof.tsx` — uses `useMotionValue`, `useTransform`, `animate` (advanced APIs, larger import surface)
- `DashboardPreview.tsx`, `ProductTour.tsx`, `ProductShowcase.tsx` — `AnimatePresence` + `motion` on below-fold content loaded eagerly
- `AnimatedSection.tsx` (shared utility) — adds framer-motion to any page using it

---

## E. Core Web Vitals Estimate

### LCP (Largest Contentful Paint) — Estimated: 2.0–3.5s

- The Hero component uses **no images** — it's a custom CSS phone mockup. LCP will likely be triggered by the first large text block or a below-fold screenshot loaded without `priority`
- Screenshots are large PNGs (1–2.2 MB); even with next/image optimization, on first CDN cache miss they require generation time
- No hero image with `priority` flag = potential LCP candidate not preloaded
- **Estimate: Moderate risk, 2.0–2.5s on fast connection, 3.0–4.0s on 3G**

### CLS (Cumulative Layout Shift) — Estimated: 0.05–0.12

- `next/image` with `fill` layout and sized containers: **good** — prevents CLS from images
- `Inter` with `display: swap`: small FOUT risk (Flash of Unstyled Text), could contribute ~0.01–0.02 CLS
- `AnimatePresence` components entering the DOM: framer-motion typically animates opacity/transform, not layout properties — **low CLS risk**
- **Estimate: Good (likely < 0.1)**

### INP (Interaction to Next Paint) / FID — Estimated: 50–150ms

- ~970 KB uncompressed JS (~300 KB gzipped) parsed on page load
- All 14 home sections are eagerly hydrated, even when below fold
- No heavy event handlers or complex state that would block the main thread long-term
- framer-motion animations use `requestAnimationFrame` and compositor layers — **low INP contribution once loaded**
- Main risk: **long hydration time** from parsing/executing the full framer-motion + 14 client component tree before the page becomes interactive
- **Estimate: 50–120ms on modern hardware, potentially 150–200ms on mid-range mobile**

### Overall Vitals Summary

| Metric | Estimated | Target | Status |
|--------|-----------|--------|--------|
| LCP | 2.0–3.5s | < 2.5s | MARGINAL |
| CLS | 0.05–0.1 | < 0.1 | GOOD |
| INP | 80–150ms | < 200ms | GOOD–MARGINAL |
| First Load JS | ~280–300 KB (gz) | < 250 KB | MARGINAL |
| TTFB | <100ms | < 800ms | GOOD (static pages) |

---

## F. Top 5 Performance Recommendations

### #1 — CRITICAL: Remove Framer Motion from Navbar

**Impact: High | Effort: Low**

The Navbar is mounted in `RootLayout` and ships framer-motion (~60–80 KB gzipped) to every route. Replace the mobile menu animation with CSS transitions — a simple `max-height` or `opacity` transition achieves the same visual effect with zero JS cost.

```tsx
// Replace in Navbar.tsx:
// import { motion, AnimatePresence } from "framer-motion";
// Instead use CSS classes with transition-all/opacity/translate
```

Alternatively, lazy-load the Navbar's animated mobile menu panel:
```tsx
const MobileMenu = dynamic(() => import('./NavbarMobileMenu'), { ssr: false });
```

**Estimated saving: ~60–80 KB gzipped removed from every page's first load JS**

---

### #2 — HIGH: Lazy-load Below-the-Fold Home Page Sections

**Impact: High | Effort: Medium**

The home page loads 14 sections eagerly. At minimum, sections below the initial viewport should use `next/dynamic`:

```tsx
// In src/app/page.tsx:
import dynamic from 'next/dynamic';

// Keep eager (above fold):
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";

// Lazy-load (below fold):
const DashboardPreview = dynamic(() => import('@/components/home/DashboardPreview'));
const ProductTour = dynamic(() => import('@/components/home/ProductTour'));
const AppGallery = dynamic(() => import('@/components/home/AppGallery'));
const TestimonialsGated = dynamic(() => import('@/components/home/TestimonialsGated'));
const SocialProof = dynamic(() => import('@/components/home/SocialProof'));
```

This defers hydration of ~40–50% of the home page's client JS until after initial paint.

**Estimated saving: 80–120 KB removed from initial hydration bundle**

---

### #3 — HIGH: Convert Screenshot PNGs to WebP

**Impact: High | Effort: Low**

The 6 app screenshots total ~9.1 MB as uncompressed PNGs. While next/image serves WebP at request time, the source files are massive. Convert them to WebP to reduce disk size and improve CDN cache warm-up speed:

```bash
# Install cwebp or use sharp:
for f in public/screenshots/*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp"
done
```

Typical PNG→WebP compression for app screenshots: **50–70% size reduction** (from ~9.1 MB → ~2.5–3.5 MB total).

Also add `priority` to the first visible screenshot (whichever loads earliest in the viewport):
```tsx
<Image src="/screenshots/home.png" ... priority />
```

---

### #4 — MEDIUM: Replace Simple Framer Motion Animations with CSS

**Impact: Medium | Effort: Medium**

`AnimatedSection.tsx`, `SectionHeader.tsx`, and `GlassCard.tsx` are shared utility components that import framer-motion for basic fade-in / slide-up effects. These are used across many pages and force framer-motion into routes that otherwise wouldn't need it.

Replace these with CSS `@keyframes` + Intersection Observer (or the native CSS `animation-play-state` trick):

```css
/* globals.css */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-on-scroll { animation: fadeInUp 0.5s ease forwards; }
```

This removes framer-motion from shared utilities, allowing it to be code-split only into pages that genuinely need complex animations.

---

### #5 — MEDIUM: Add Bundle Analyzer & Set Size Budget

**Impact: Low–Medium | Effort: Low**

No bundle analyzer is configured. Add `@next/bundle-analyzer` to make bundle composition visible and catch regressions:

```bash
npm install -D @next/bundle-analyzer
```

```ts
// next.config.ts
import withBundleAnalyzer from '@next/bundle-analyzer';
const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default withAnalyzer(nextConfig);
```

Also add a size limit check via `bundlewatch` or Next.js's built-in `experimental.bundlePagesRouterDependencies` to fail CI if first-load JS exceeds 250 KB.

---

## Overall Score Estimate

| Category | Score | Notes |
|----------|-------|-------|
| Build Configuration | 75/100 | Good security headers; no analyzer; Turbopack is correct choice |
| Bundle Size | 65/100 | ~300 KB gzipped first load (marginal); framer-motion on all routes |
| Image Optimization | 70/100 | next/image used correctly; source PNGs unoptimized; no WebP sources |
| Font Optimization | 95/100 | `next/font/google` with swap + subset — near perfect |
| Code Splitting | 45/100 | Zero dynamic imports; all home sections eager-loaded |
| Server/Client Balance | 60/100 | 46% client components; animations dominate client boundary decisions |
| Framer Motion Usage | 55/100 | Correctly client-gated; but Navbar poisons every route |
| Core Web Vitals (est.) | 72/100 | LCP and FID marginal on mobile; CLS good |

### **Composite Score: ~68/100 (70–79 band)**

The site is functional and has solid fundamentals (static generation, next/font, next/image, no server component pollution). However it falls short of 80+ due to three structural issues: the Navbar forcing framer-motion onto every route, zero lazy-loading of below-fold sections, and large uncompressed screenshot source files. Addressing recommendations #1 and #2 alone would likely push the score into the **80–85** range.

---

*Report generated by automated performance audit of `/Users/ishvinderx/shiftflow-website`*
