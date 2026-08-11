# SEO + ASO Keyword Strategy (Phase 18.1)

Date: 2026-08-10 · Status: v1 — **priors, not measurements**.

**Honesty rule for this document:** no keyword tool (GSC, Keyword Planner, Ahrefs,
AppTweak) is connected yet — all are operator-credentialed. Volume/difficulty columns
are therefore **UNKNOWN by design**, and priorities below are intent-and-relevance
priors to be replaced with real data. Do not present these as measured. First real
data source: Google Search Console (free) + Google Ads intent probe (18.10).

Consolidation note: this file covers 18.1 keyword intelligence, the SEO keyword map,
the ASO keyword map, and the content plan — one source instead of four drifting docs.

## Positioning constraint

ShiftFlow is **iOS-only**. Google Play ASO (18.11–18.12) has no listing to optimize —
every Play item is CONDITIONAL on an Android build and excluded from this strategy.
App name changes are explicitly NOT proposed (30-char cap, brand-vs-keyword balance
needs real ranking data first; v1.4.2 is in App Review — metadata edits ride the NEXT
version except Promotional Text, which is editable without review).

## Web keyword map (P0–P3)

| Pri | Keyword cluster | Intent | Target URL | Status |
|----|----|----|----|----|
| P0 | work hours calculator (+ "with breaks", "with lunch") | do (tool) | /work-hours-calculator | **LIVE 2026-08-10** |
| P0 | time card calculator (+ "with lunch") | do | /time-card-calculator | **LIVE 2026-08-11** — per-day week grid, weekly OT (distinct from the daily single-shift tool) |
| P0 | hours calculator / work time calculator | do | /work-hours-calculator (canonical) | covered — do not build thin variants |
| P1 | overtime calculator / overtime pay calculator | do | /overtime-calculator | planned — weekly threshold + jurisdiction presets is the differentiator |
| P1 | hours to decimal / decimal hours calculator | do + know | /decimal-hours-calculator | planned — conversion table + tool |
| P1 | shift calculator / shift pay calculator | do | /work-hours-calculator initially; split only if GSC shows distinct demand | watch |
| P1 | timesheet calculator / weekly hours calculator | do | /time-card-calculator (canonical) | covered by the live page |
| P2 | how to calculate work hours / hours worked with lunch / overtime hours / time between two times / unpaid breaks / a timesheet | know | blog posts embedding the calculator | planned (see content plan) |
| P2 | how many hours is 8:30 to 5 / 7 to 3:30 (pattern) | know (snippet) | FAQ entries on the calculator page | partially live (2 patterns in FAQ) |
| P3 | biweekly/monthly hours calculator, clock in clock out calculator, employee/freelancer/contractor hours calculator | do, thin variants | ONLY if GSC impressions justify; high doorway-page risk | hold |

Rules applied: one URL per intent; variants canonicalize to the strongest page;
no page ships without genuinely distinct functionality (18.2's no-thin-duplicates rule).

## Apple App Store keyword map (operator executes in ASC)

Current name "ShiftFlow" (brand) — keep. The keyword surface to optimize, next version:

- **Subtitle (30 chars)** — candidate: `Work Hours & Pay Tracker` (24) or
  `Track Shifts, Hours & Pay` (25). Decide against current subtitle (operator: what is it?).
- **Keyword field (100 bytes)** — candidate set (no duplicates of name/subtitle words,
  comma-separated, no spaces): `hours,calculator,timesheet,time,card,overtime,payday,wage,clock,shift,paycheck,invoice`
- **Promotional Text (editable WITHOUT review)** — rotate toward "track work hours,
  see overtime and estimated pay" phrasing now.
- **Custom Product Pages (18.14)** — after the web calculator proves which intents
  convert: CPP-1 "Work Hours Calculator", CPP-2 "Shift Tracker", CPP-3 "Time Card /
  Timesheet". CPPs need unique screenshots (operator/design asset work).
- Screenshot copy sequence (18.15): result-first ("Calculate your work hours" →
  "See your pay" → "Know your overtime") — all claims must match shipped features.

## Content plan (P2 cluster — each must beat generic SEO content)

Order of production (each embeds the live calculator where useful):
1. How to calculate hours worked with a lunch break (worked examples table)
2. How to convert hours to decimal (with the 15/30/45-minute table)
3. How to calculate overtime hours (honest jurisdiction-variance framing)
4. How to fill out a timesheet (leads to time-card calculator when built)
Existing `/blog/how-to-track-work-hours` gets an internal link to the calculator during
its refresh pass — the blog renderer doesn't parse markdown links today, so the link
ships with that renderer change, not before. (Calculator → blog direction is live.)

## Measurement plan

- GSC (operator connects domain) → weekly: impressions/clicks/position for the P0/P1 set.
- Google Ads probe (18.10, operator budget): exact/phrase on 5 P0 terms, small spend,
  goal = query→calculator-completion→CTA-click rates, not installs volume.
- App Store campaign token `?ct=work-hours-calculator` is already on the calculator CTA —
  attributable in ASC App Analytics once the operator confirms the provider token (pt).
- Web analytics: none installed today. GA4 (or PostHog, already used elsewhere in the
  stack) is an operator decision — event vocabulary reserved: `calculator_started`,
  `calculator_completed`, `calculator_copy/share/print`, `app_cta_clicked`.

## Review cadence

Monthly until GSC has data; then biweekly. Every metadata/page experiment gets a row:
baseline → change → date → window → result → decision (18.20).
