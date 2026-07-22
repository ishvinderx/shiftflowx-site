# ShiftFlow — Legal-Accuracy Audit (code vs. legal pages)

**Date:** 2026-07-21. Source of truth = backend `prisma/schema.prisma` + `src`. This audit
drives the **RELEASE BLOCKED — LEGAL INCONSISTENCY** verdict. Nothing below is rewritten yet:
several fixes require product decisions (marked ⚠️DECISION).

## P0 — release-blocking inaccuracies

1. **False AI-redaction claim.** `/data-policy` (lines ~139-140, 191): "PII and payroll figures
   are redacted before being sent to the AI provider." **Code contradicts this** —
   `backend/src/services/ai.service.ts` `buildUserPrompt` sends raw weekly/monthly earnings,
   hourly rate, tax rate, paycheck vs expected amounts, burnout/mood scores, and **employer
   names** verbatim to DeepSeek. No redaction step exists.
   → ⚠️DECISION: (a) implement payload minimization/redaction in `ai.service.ts`, or (b) correct
   the policy to state raw financial context is sent to DeepSeek to generate insights. (Mission
   Phase 3 wants payload minimization regardless.)

2. **Trial length contradicts itself 3 ways.** Site = **30 days** (`terms`, `subscription-terms`,
   `pricing`); backend gate = **14 days** (`requirePremium.ts TRIAL_LENGTH_MS`); iOS =
   **7 days** (`SubscriptionService.swift trialDays=7`). A user promised 30 days can lose premium
   API at day 14. → ⚠️DECISION: pick the canonical trial length; align site + backend + iOS.

3. **"Delete everything" overstated.** `/privacy:182` + `/data-policy:262-264` claim all data is
   permanently removed. The purge job (`hardDeleteAccounts.ts`) leaves ~15 tables intact:
   TaxProfile, PaySchedule, AIMemoryProfile, StressAnalytic, EnergyProfile, HabitProfile,
   ForecastModel, FinancialTimelineEvent, PersonalSubscription, **UserDataBlob (net worth/credit/
   budget)**, Subscription, UserDevice, RefreshToken, engagement/behavior metrics.
   → FIX: extend the purge job to cover these, or correct the claim. (Recommend extend the job.)

4. **"Anonymized analytics" is false.** `/privacy` + `/data-policy` say analytics are anonymized;
   PostHog is called with `distinctId: userId` + `identify(userId, traits)` and `AnalyticsEvent`
   stores `userId + deviceInfo`. Analytics are **user-identified**. → FIX: correct the language.

## P1 — accuracy / trust

5. **"Plus" vs "Pro".** Site sells "ShiftFlow Plus"; backend + StoreKit SKUs + AI messages say
   "Pro" (`com.shiftflow.pro.*`). → ⚠️DECISION: pick the customer-facing name; make consistent.
6. **"Hard paywall after trial" overstates gating.** Real model is **freemium/limited** — only
   invoices, tax, analytics, paycheck-anomaly, ai-memory are premium-gated; shift logging, jobs,
   earnings, dashboard, and 5/day AI insights remain free. Site lists "unlimited shift logging"
   as a Plus feature — it isn't gated. → FIX: describe the actual limited-mode model.
7. **AES-256-at-rest overstated.** Only 6 string fields are app-encrypted (`prismaEncryption.ts`);
   all financial Decimals are plaintext at the app layer. → FIX: soften to "encrypted in transit
   (TLS); sensitive fields encrypted at rest" — don't claim blanket AES-256 for all data.
8. **OCR claims unsupported + self-contradicting.** `/privacy:92` describes a server OCR processor
   + 30-day image retention; `/data-policy:246` says images are never stored server-side. No
   server OCR provider is wired. → FIX: reconcile to what the app actually does (on-device).
9. **"Claude/Anthropic" AI references** in `/data-policy` — backend is **DeepSeek-only**; no
   Anthropic path exists. → FIX: remove unless a verified iOS BYO-Claude path exists.
10. **`/privacy` omits RevenueCat**, location collection (geofenced clock-in), and several
    sensitive categories (net worth, credit history, DOB/address, mood/stress). `/data-policy` is
    the stronger, newer doc (May 2026) and should supersede the Jan-2025 `/privacy` + `/terms`.
11. **Over-assertive compliance.** `/privacy` meta + title assert "comply with GDPR and CCPA."
    Mechanisms exist (export/deletion/consent) but "comply" is a legal conclusion — soften to
    "we support GDPR/CCPA data-subject rights." **No PIPEDA claim exists** despite Canadian users
    (CPP/EI tax) — a gap to note, not a false claim. **No false certification claims found** (good).
12. **Unsubstantiated ops claims** — "regular penetration testing", "background checks"
    (`/privacy:138-139`). → FIX: remove unless true.

## Financial/tax disclaimer — MET (placement gap only)
Terms have strong disclaimers (`terms:75,135`); homepage FAQ says "estimates … not a guarantee."
Weak spot: use-case pages (`gig-workers:76` "tells you **exactly** how much to set aside") lack a
co-located "estimates only — not tax advice" line. → FIX: add per-page tax disclaimer.

## Actual third-party processors (for an accurate policy)
DeepSeek (AI), Resend (email), RevenueCat (subscriptions), PostHog (user-identified analytics),
Sentry (errors; PII-scrubbed), Cloudflare R2 (file storage), Apple (IAP), Railway (hosting).

## App Store privacy consistency matrix (requires operator to reconcile ASC)
| Data type | Collected? | Purpose | Linked to user? | Tracking? | 3rd party | In privacy policy? | ASC disclosure? |
|-----------|:---------:|---------|:---------------:|:---------:|-----------|:------------------:|:---------------:|
| Email | yes | account, email | yes | no | Resend | yes | **verify in ASC** |
| Name/phone | yes | account | yes | no | — | yes | verify |
| Financial (earnings/pay/tax) | yes | core feature + AI | yes | no | DeepSeek | partial | **verify** |
| Location (geofence) | yes | clock-in | yes | no | — | **omitted in /privacy** | **verify** |
| Health (mood/stress/burnout) | yes | wellness + AI | yes | no | DeepSeek | **omitted in /privacy** | **verify** |
| Analytics/usage | yes | product analytics | **yes (not anon)** | no | PostHog | mislabeled anon | **verify** |
| Purchases | yes | subscriptions | yes | no | RevenueCat/Apple | RevenueCat omitted | verify |
| Diagnostics | yes | crash/error | hashed | no | Sentry | yes | verify |
> Operator must open App Store Connect → App Privacy and reconcile each row. Do not change ASC
> disclosures silently — document required changes first.
