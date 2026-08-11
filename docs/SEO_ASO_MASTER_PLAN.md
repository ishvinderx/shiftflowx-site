# SEO + ASO Master Plan — organic acquisition engine (Phase 18)

Date: 2026-08-10 · Owner docs: keyword/content detail lives in
[SEO_ASO_KEYWORD_STRATEGY.md](SEO_ASO_KEYWORD_STRATEGY.md); AI-engine work in
[AI_SEO_2026-08.md](AI_SEO_2026-08.md). (Deliverable consolidation: the directive's
five docs collapse into these — funnel, keyword maps, and content plan are sections,
not separate files, so they cannot drift apart.)

## The flywheel (18.21)

Google Search → /work-hours-calculator (free tool, instant answer) → contextual CTA →
App Store (`?ct=work-hours-calculator`) → install → onboarding → activation → trial →
subscription. The website is the acquisition engine; the calculator is the traffic
magnet; the app is retention/revenue.

## Shipped in this pass (2026-08-10)

- **/work-hours-calculator** — real interactive tool (Phase 18.3 spec: start/end,
  multiple paid/unpaid breaks, overnight shifts, OT threshold+multiplier, decimal
  hours, gross pay only when a rate is entered — never a fabricated $0; copy/share/
  print/reset; no signup, no paywall). Pure calc module self-checked (day, overnight,
  OT-pay cases).
- Technical SEO on the page: unique title/description, canonical, OG, breadcrumb nav +
  BreadcrumbList schema, WebApplication + FAQPage schema (FAQ matches visible copy
  1:1), semantic headings, static-rendered (server HTML, no JS wall), sitemap entry
  (priority 0.9), llms.txt Key Pages entry.
- Funnel instrumentation available without analytics: App Store CTA carries
  `?ct=work-hours-calculator` for ASC campaign attribution.
- Internal links: calculator → how-to-track-work-hours blog, hourly-workers use case,
  /download. (Blog → calculator direction waits on the blog renderer supporting links —
  see strategy doc.)

## Status map for the full Phase 18 directive

| Item | Status |
|---|---|
| 18.1 keyword intelligence | ✅ v1 doc (priors; honest UNKNOWN volumes until tools connect) |
| 18.2 SEO architecture | ✅ P0 page live; further pages gated on distinct-functionality rule (no thin variants) |
| 18.3 calculator | ✅ live |
| 18.4 SEO→app funnel | ✅ contextual CTA after result; no interruption |
| 18.5 content cluster | 📋 planned, 4-article order defined |
| 18.6 technical SEO | ✅ for the new page; site-wide items (robots/sitemap/OG) pre-existed |
| 18.7 structured data | ✅ WebApplication/FAQPage/BreadcrumbList — validate in Rich Results test post-deploy (operator) |
| 18.8 Search Console | 🔑 OPERATOR — connect domain, then weekly report |
| 18.9 analytics | 🔑 OPERATOR decision (GA4 vs PostHog); event names reserved |
| 18.10 Google Ads probe | 🔑 OPERATOR — budget + account; plan defined |
| 18.11–18.12 Google Play | ⛔ CONDITIONAL — no Android app exists |
| 18.13 App Store ASO | 🔑 OPERATOR in ASC — subtitle/keywords ride NEXT version (v1.4.2 in review); Promotional Text editable now; candidates in the strategy doc |
| 18.14 Custom Product Pages | 📋 after web data shows converting intents; needs screenshot assets |
| 18.15 screenshots | 📋 asset work, claims must match shipped features |
| 18.16 keyword DB models | ⏸ deferred — a DB for rankings before any ranking data exists is premature; revisit when GSC/ASC exports are flowing |
| 18.17 admin /seo dashboard | ⏸ deferred with 18.16 (Admin 2.0 honesty rule: no dashboard without a data source) |
| 18.18 content management | ⏸ statuses tracked in the strategy doc until volume justifies tooling |
| 18.19 tooling | ✅ free/native stack first (GSC, GA, Trends, Lighthouse, ASC); paid tools only when volume justifies |
| 18.20 experimentation | ✅ protocol defined (baseline→change→window→result→decision rows) |
| 18.23 safety | ✅ honored: no doorway pages, no stuffing, no fabricated claims, no competitor names |

## Hard rules carried forward

- Never claim a ranking that doesn't exist; the goal is maximizing probability, not
  guaranteeing outcomes.
- A new calculator page ships only with genuinely distinct functionality.
- Screenshot/metadata claims must match shipped app behavior.
- No app-name change without real ranking + competitor data.
- Every number in the future /seo dashboard must name its source (GSC/ASC/analytics) —
  DATA NOT AVAILABLE otherwise.

## Next actions

Engineering: time-card calculator (P0 #2, distinct per-day UX) → decimal-hours page →
first two cluster articles. Operator: GSC domain verification; analytics platform
decision; ASC Promotional Text update now + subtitle/keyword plan for the next
version; confirm `pt` token so `ct` attribution works; Rich Results validation after
deploy.
