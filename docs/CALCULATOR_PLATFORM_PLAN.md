# ShiftFlow Free Tools Platform — Audit & Implementation Plan

Date: 2026-08-11. Governs the calculator-platform build (Wave 1 = 15 tools).
Companion docs: SEO_ASO_KEYWORD_STRATEGY.md (keyword table + anti-thin-page
rules), JURISDICTION_RULES_RESEARCH.md (verified tax/overtime rules, official
sources only).

## 1. Architecture audit (Phase 1 — done)

- Next.js 16 App Router, React 19, TS strict, Tailwind v4. Tokens live in the
  `@theme` block of `src/app/globals.css`; root `tailwind.config.ts` is DEAD
  (no `@config` directive) — never edit it.
- 3 live calculators (`/work-hours-calculator`, `/time-card-calculator`,
  `/decimal-hours-calculator`), house pattern = server `page.tsx` (metadata +
  3 JSON-LD schemas + prose + FAQ) + one client island + pure calc module.
  Decimal deviated (inline logic) — normalized during platform build.
- No tests, no analytics (CSP already whitelists PostHog; platform choice is
  an operator decision — event vocabulary reserved). `sitemap.ts` was
  hand-maintained. JSON-LD escape helper + BreadcrumbList duplicated across
  pages. `appStoreCampaignUrl(ct)` is the only sanctioned App Store link
  builder; `APP_STORE_PT` empty ⇒ attribution UNAVAILABLE until operator
  supplies the provider token.

## 2. Platform design (deliberately minimal)

- `src/lib/tools/registry.ts` — `ToolConfig` metadata registry (slug, title,
  shortDescription, category, status live|planned, related[]). Drives the
  /tools hub, related-tools pills, and sitemap. Slug = route = ct token =
  analytics id. Pages own their UI; the "framework" is shared components +
  helpers, not a config-driven page renderer (each tool's inputs genuinely
  differ; a mega-renderer would be speculative).
- `src/lib/seo.ts` — jsonLd escape, toolMetadata, webAppSchema, faqSchema,
  breadcrumbSchema. New pages must use these; legacy pages migrate later.
- `src/components/calculator/` — ToolBreadcrumb, FaqSection, RelatedTools,
  ShiftFlowCta, ToolDisclaimer, SourceInfo. One shell, no duplication.
- `src/lib/analytics.ts` — typed no-op queue for calculator_viewed/started/
  completed/cta_clicked. NEVER carries financial inputs/results. Drained by
  whichever platform the operator picks (GA4 vs PostHog — pending decision).
- `src/lib/rules/` — versioned jurisdiction rules (salesTax, overtime), each
  entry requires jurisdiction/ruleVersion/effectiveDate/source/sourceUrl/
  lastReviewed. FAIL CLOSED: no verified rule → no calculated statutory
  result. Rules are populated ONLY from official government sources
  (JURISDICTION_RULES_RESEARCH.md records the verification).
- Engines: pure per-route `*.ts` modules (house pattern) + shared primitives
  in `src/lib/time.ts`. UI never does financial arithmetic. Vitest golden
  tests per engine; regression tests pinned the 3 legacy engines BEFORE any
  refactor. CI runs tests before build.

## 3. Decisions of record

- **/hours-worked-calculator is a 308 redirect** to /work-hours-calculator.
  Spec §12 asks for it as a tool; spec §35 (no duplicate intent) + the
  strategy doc's canonicalization rule override — the input/output spec is
  identical to the existing tool. One canonical URL.
- **Take-home pay calculator uses user-entered deductions** (amounts or %),
  clearly labeled estimates. No statutory income-tax/CPP/EI tables are
  computed — those are unverified-rule territory and would violate the
  fail-closed rule. Distinguishes gross / deductions / estimated net.
- **contractor-pay vs contractor-take-home-pay share one engine** with
  different presentations (invoice-centric vs what-do-I-keep waterfall).
  Doorway-page risk flagged for operator review post-launch; if GSC shows
  cannibalization, canonicalize the weaker page.
- **Sales tax is never income; tax reserve is computed on profit** (labour −
  expenses), never on gross-including-HST. Golden case everywhere:
  100 h × $26 = $2,600 labour; 13% HST = $338; invoice $2,938.
- **Unknown ≠ 0**: unknown HST registration → "HST not calculated —
  registration status required", never $0.
- Analytics event names follow the master spec (calculator_*), superseding
  the older reserved names in SEO_ASO_KEYWORD_STRATEGY.md.

## 4. Execution waves

- Wave 0: rule research (official sources) ∥ platform core + exemplar
  (/hourly-pay-calculator) + regression tests + derived sitemap + /tools hub.
- Wave 1: overtime, gross-pay, take-home-pay (parallel; disjoint route dirs).
- Wave 2: contractor-pay, gst-hst, hst-invoice, tax-reserve (need verified
  rates).
- Wave 3: contractor-take-home-pay, owner-operator-pay,
  truck-driver-settlement + migration of the 3 legacy pages onto shared
  components (behavior pinned by regression tests).
- Wave 4: full QA (tests, build, per-page SEO checks, ct tokens, a11y pass)
  → final QA report. Commits grouped: calculator-platform,
  existing-calculator-migration, work-pay-tools, contractor-tax-tools,
  seo-platform, qa-fixes.

Registry `status` flips and cross-wave wiring are done by the orchestrator
between waves so parallel agents never touch shared files.

## 5. Hard rules carried from the master spec

No thin/doorway pages; no invented keyword volume or rankings; no "tax
accurate" claims without verified rules; no unverified financial
calculation published; UI never replaces unknown with zero; CTA only after
the useful result; every App Store link via appStoreCampaignUrl with a
unique ct; no financial data in analytics events; WEBSITE ONLY (no iOS,
no admin, no backend changes).
