# ShiftFlow Website — Route Audit

**Date:** 2026-07-21 · **Domain:** https://shiftflowx.net · **Stack:** Next.js 16 App Router.
Static code audit + build. Live-deployed status verification pending (see final report).

## Route inventory

| Route | Purpose | Unique metadata | noindex | Status/Issue → Action |
|-------|---------|:---------------:|:-------:|------------------------|
| `/` | Home (redesigned 3D/glass) | root default (ok for home) | no | Hero CTA → App Store direct (bypasses `/download`) — decision pending |
| `/about` | About | yes | no | OK |
| `/blog`, `/blog/[slug]` | Blog | yes (per-post canonical) | no | Sitemap slugs hardcoded → generate from `blog.ts` (P2) |
| `/compare` | Comparison | yes | no | OK |
| `/cookie-policy` | Legal | **FIXED** (added canonical+title) | no | was self-canonical→home ✅ fixed |
| `/data-policy` | Data handling | yes | no | Not linked in nav/footer (orphan) — P2 |
| `/delete` | Account deletion | **FIXED** | no | was self-canonical→home ✅ fixed |
| `/download` | Download funnel | yes | no | OK |
| `/eula` | Legal | **FIXED** | no | ✅ fixed |
| `/features` | Features | yes | no | Content-accuracy review pending |
| `/how-it-works` | Explainer | yes | no | OK |
| `/pricing` | Pricing | title/desc; **canonical missing** | no | Add canonical — P2 |
| `/privacy` | Privacy Policy | yes | no | **LEGAL INACCURACIES — see legal audit (P0)** |
| `/ref/[code]` | Referral invite | yes | **yes** (noindex,nofollow) | OK |
| `/referral` | Referral marketing | title/desc; **canonical missing**; **absent from sitemap** | no | Add canonical + sitemap — P2 |
| `/refund` | Legal | **FIXED** | no | ✅ fixed |
| `/reset-password` | Reset (token) | **FIXED — noindex added** | **yes** | ✅ was indexable, now noindex |
| `/security` | Public security info | yes | no | Legitimate public page (not admin) |
| `/subscription-terms` | Legal | **FIXED** | no | **model inaccuracies — see legal audit (P0)** |
| `/support` | Support | yes | no | OK |
| `/terms` | Terms | yes | no | **LEGAL INACCURACIES — see legal audit (P0)** |
| `/use-cases/{gig-workers,freelancers,hourly-workers,nurses,contractors}` | SEO landing | yes (own canonical) | no | Add per-page tax "estimates only" line — P2 |
| `/verify` | Email verify (token) | title; noindex | **yes** | OK |

## SEO findings
- **[FIXED] Broken social cards site-wide** — root OG/Twitter referenced non-existent `/og-image.png`. Repointed to the working `/opengraph-image` dynamic route. (When new logo lands, refresh `opengraph-image.tsx`.)
- **[FIXED] Canonical/title self-canonicalization** to homepage on 5 legal pages + reset-password.
- Root metadata is strong: metadataBase, title template, OG+Twitter, robots, 3 JSON-LD blocks, `llms.txt`, robots.ts allows AI crawlers.
- **[P2]** `/pricing` and `/referral` still lack explicit canonical; `/referral` missing from sitemap.
- Admin correctly excluded from sitemap; no admin route under `src/app`.

## Accessibility findings
- Alt text coverage good across all images. Some generic ("ShiftFlow app screenshot").
- **[P2]** Low-contrast text: `Footer.tsx` copyright/legal links at `text-white/25` (worst), plus `text-white/25–/35` in several sections — likely fails WCAG AA. Raise to `/50–/60`.
- **[P2]** Mobile hamburger has `aria-label` but no `aria-expanded`.
- Heading order clean (one h1 per route).

## UX / responsive findings
- **[P2]** `SocialProof.tsx` has `min-w-[640px]` (overflow risk on <640px) — but component is **orphaned** (not used by current homepage).
- **Orphaned components** (dead code, not user-facing): `Hero.tsx`, `FeatureShowcase.tsx`, `ProductTour.tsx`, `ProductShowcase.tsx`, `SocialProof.tsx` — safe to delete.
- **[Decision]** Homepage hero CTA links directly to App Store; rest of site funnels through `/download`. Pick one canonical primary-CTA path.
- **[P2]** Nav logo uses 622KB `/icon.png` at 32×32 — swap for `/icon-192.png` (26KB) or new optimized mark.

## Asset references (for logo migration)
Every branding reference to update when the new logo arrives:
`layout.tsx` (icons block :53-62, JSON-LD :102/:109), `Navbar.tsx:16`, `Footer.tsx:49-58` (inline SVG), `verify/page.tsx:40`, `reset-password/page.tsx:100`, `blog/[slug]/page.tsx:124`, plus `opengraph-image.tsx`, and email `icon-192.png` (backend `email.ts:38`).
