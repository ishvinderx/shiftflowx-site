# ShiftFlow Website Rebuild Report

## Overview

The ShiftFlow marketing site was rebuilt from scratch as a Next.js App Router project with a dark-first design system, full TypeScript, and Framer Motion animations. The goal was a high-conversion landing page that mirrors the aesthetic of the iOS app.

---

## Components Built

| Component | Location | Purpose |
|---|---|---|
| `HeroSection` | `src/components/HeroSection.tsx` | Full-viewport above-the-fold with animated headline, app screenshots, and CTA |
| `FeaturesSection` | `src/components/FeaturesSection.tsx` | Feature grid with icon cards and staggered reveal |
| `PricingSection` | `src/components/PricingSection.tsx` | Monthly/Annual toggle, Pro card, Free tier |
| `TestimonialsSection` | `src/components/TestimonialsSection.tsx` | Scrolling carousel of user reviews |
| `HowItWorksSection` | `src/components/HowItWorksSection.tsx` | 3-step visual flow with numbered circles |
| `FAQSection` | `src/components/FAQSection.tsx` | Accordion with JSON-LD FAQ schema |
| `CTABanner` | `src/components/CTABanner.tsx` | Sticky bottom-of-page conversion banner |
| `Navbar` | `src/components/Navbar.tsx` | Sticky frosted-glass nav with scroll-aware opacity |
| `Footer` | `src/components/Footer.tsx` | Links, legal, App Store badge |
| `AppScreenshot` | `src/components/AppScreenshot.tsx` | Reusable iPhone frame wrapper with shadow |
| `AnimatedCounter` | `src/components/AnimatedCounter.tsx` | Count-up on viewport entry |

---

## Design Improvements

- **Dark background**: `#050508` base with `#080810` card surfaces — matches iOS app exactly
- **Accent colour**: `#D63C6B` (crimson) used for CTAs, highlights, and active states
- **Typography**: Inter (variable) for UI text; monospaced for code/data elements
- **Glass cards**: `bg-white/[0.04] border border-white/[0.06] backdrop-blur` pattern used uniformly
- **Micro-shadows**: Coloured glow shadows (e.g. `shadow-[0_8px_32px_rgba(214,60,107,0.2)]`) on hero elements
- **Responsive grid**: CSS Grid with `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` breakpoints

---

## Animation Strategy

All animations use **Framer Motion** with a consistent approach:

```ts
// Standard reveal variant
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Stagger container
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};
```

- **`whileInView`** triggers animations only when elements enter the viewport
- **`once: true`** ensures animations don't re-fire on scroll back
- **Reduced motion**: `useReducedMotion()` hook wraps all motion values to respect OS accessibility settings
- **Page transitions**: `AnimatePresence` on route changes with a 200ms fade

---

## Screenshot Usage

App screenshots are served from `/public/screenshots/` as WebP with `next/image`:

- `home-dark.webp` — Home view showing earnings summary
- `shifts-dark.webp` — Shift list view
- `insights-dark.webp` — Analytics/Insights tab
- `payslip-dark.webp` — Payslip OCR result

Each screenshot is wrapped in `AppScreenshot` which renders a CSS iPhone frame at 3:5 aspect ratio with a `#D63C6B` glow shadow.

---

## Framer Motion Patterns

**Scroll-linked parallax (hero):**
```ts
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
```

**Staggered card grid:**
```tsx
<motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {features.map(f => <motion.div key={f.id} variants={fadeUp}>...</motion.div>)}
</motion.div>
```

**Hover lift:**
```tsx
<motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}>
```
