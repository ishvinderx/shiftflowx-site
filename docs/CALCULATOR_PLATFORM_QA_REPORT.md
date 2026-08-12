# Free Tools Platform — Final QA Report

Date: 2026-08-12. Scope: the calculator-platform build (commits `57eead1..` this
train). Evidence vocabulary: VERIFIED = checked against rendered production-build
output or a passing automated test; IMPLEMENTED = code exists and builds.
Companions: CALCULATOR_PLATFORM_PLAN.md (architecture + decisions of record),
JURISDICTION_RULES_RESEARCH.md (official-source rule verification).

## Calculators (14 live)

| Tool | URL | Tests | SEO | Analytics | ct= |
|---|---|---|---|---|---|
| Work Hours (existing) | /work-hours-calculator | regression-pinned | VERIFIED | added | ✓ |
| Time Card (existing) | /time-card-calculator | regression-pinned | VERIFIED | added | ✓ |
| Decimal Hours (existing) | /decimal-hours-calculator | regression-pinned (logic extracted to pure module) | VERIFIED | added | ✓ |
| Hourly Pay (exemplar) | /hourly-pay-calculator | golden | VERIFIED | ✓ | ✓ |
| Overtime | /overtime-calculator | 15 golden incl. BC two-tier + greater-of | VERIFIED | ✓ (+jurisdiction) | ✓ |
| Gross Pay | /gross-pay-calculator | golden | VERIFIED | ✓ | ✓ |
| Take-Home Pay | /take-home-pay-calculator | golden | VERIFIED | ✓ | ✓ (client-rendered, see note) |
| Contractor Pay | /contractor-pay-calculator | golden, reserve-base pinned | VERIFIED | ✓ (+jurisdiction) | ✓ |
| Contractor Take-Home | /contractor-take-home-pay-calculator | golden, shared engine | VERIFIED | ✓ (+jurisdiction) | ✓ |
| Tax Reserve | /tax-reserve-calculator | golden | VERIFIED | ✓ | ✓ |
| GST/HST | /gst-hst-calculator | 12 incl. add/remove inverse property | VERIFIED | ✓ (+jurisdiction) | ✓ |
| HST Invoice | /hst-invoice-calculator | golden | VERIFIED | ✓ (+jurisdiction) | ✓ |
| Owner-Operator Pay | /owner-operator-pay-calculator | 11 golden | VERIFIED | ✓ (+jurisdiction) | ✓ |
| Truck Settlement | /truck-driver-settlement-calculator | golden, 3 registration modes | VERIFIED | ✓ (+jurisdiction) | ✓ (client-rendered, see note) |

Hub: /tools (all 14, six categories, ItemList schema). Redirect:
/hours-worked-calculator → 308 /work-hours-calculator (anti-duplicate decision).

## Platform

- Shared: registry (single source for routes/hub/related/sitemap/ct), seo.ts
  helpers, 6 calculator components, analytics stub, time primitives.
- Engines: pure per-route modules; UI performs no financial arithmetic.
- Sitemap: derived from registry (live only) + blog posts; 48 unique URLs
  VERIFIED, no duplicates, no redirect target listed.
- Legacy migration: JSON-LD + breadcrumbs moved to shared helpers ONLY where
  output-identical; metadata/FAQ/CTA literals deliberately kept (parity rule).

## Accuracy

- Golden case pinned across the contractor suite: 100 h × $26 = $2,600 labour;
  13% HST = $338; invoice $2,938; reserve computed on $2,200 profit (tests
  assert it is NOT computed on $2,938 or $2,538).
- Jurisdiction rules: 13 GST/HST entries + 5 overtime entries, every one from a
  fetched official government page (CRA, ontario.ca, canada.ca, alberta.ca,
  gov.bc.ca, dol.gov), incl. NS 14% HST effective 2025-04-01. Fail-closed:
  unlisted jurisdiction → "not verified" message, no statutory calculation.
- Zero-as-data VERIFIED by tests: no rate → null pay (never $0); unknown
  GST/HST registration → "registration status required" (never $0 tax); empty
  deductions → prompt (never net = gross); no profit → "nothing to reserve".
- Suite: 105 tests + qa-fix build, all green. Rounding at display only
  (settlement engine rounds tax to cents in-engine, documented).

## SEO (VERIFIED against rendered output, post-build)

All 15 pages: HTTP 200; unique title/description/H1; exact canonical;
WebApplication + FAQPage + BreadcrumbList once each, all JSON.parse-clean;
every FAQ-schema question present verbatim in visible text; ≥2 internal tool
links per page; robots allow; sitemap membership. Five over-length titles
trimmed in the qa-fixes commit; six remain 71–76 chars (marginal, left).

## Performance / Accessibility

Static prerender for all tool pages (60/60 pages in ~375 ms generation); one
client island per page, no new dependencies added by the platform. Inputs all
label-associated; lang set; logical source order. NOT measured: real-device
LCP/CLS/INP and screen-reader walkthrough — unmeasured, not claimed.

## Conversion & measurement

- Every App Store link goes through appStoreCampaignUrl with a unique ct=slug.
- **ATTRIBUTION REMAINS UNAVAILABLE until the operator sets APP_STORE_PT** —
  Apple ignores ct without pt. Same standing item as before this build.
- Analytics events (viewed/started/completed/cta_clicked, never financial
  values) queue client-side; they transmit NOTHING until the operator's
  web-analytics platform decision (GA4 vs PostHog) wires a drain.

## Known limitations / honest gaps

1. Take-home + truck-settlement CTAs render only after a result (their inputs
   start empty), so crawlers don't see those two tagged links; users who
   complete do. Deliberate CTA-after-result placement; revisit if GSC shows it
   matters.
2. Take-home pay computes from user-entered deductions only — no statutory
   income-tax/CPP/EI tables exist in the codebase (fail-closed decision of
   record, stated on the page).
3. contractor-pay vs contractor-take-home share one engine with different
   presentations — doorway-risk watch item once Search Console data exists.
4. Overtime effectiveDates are page-updated/fetch dates, not legal
   commencement dates (sources state none) — documented in the rules file.
5. No ranking, traffic, or keyword-volume claims are made anywhere: no data
   exists yet. Measurement starts when pt + web analytics are configured.
