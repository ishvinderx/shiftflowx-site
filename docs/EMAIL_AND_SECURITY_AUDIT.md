# ShiftFlow — Email (Resend) + Security Audit

**Date:** 2026-07-21. No secret values appear in this document — variable names only.

## Email / Resend (backend `src/lib/email.ts`)
- **29 transactional templates**, all through one shared `emailShell()` wrapper → the email logo
  is a **single-point change** (`icon-192.png`, `email.ts:38`, alt="ShiftFlow", production https).
- Templates: verify email, welcome, email-verified, password reset, password changed, new-device
  login, trial started/ending, subscription activated/renewed/payment-failed/cancelled, founding
  member, monthly report, weekly summary, payroll alert, tax reminder, payday reminder, feature
  education, day-3/7/14/30/60/90 lifecycle, referral invite/success, feedback request, App Store
  review. (No dedicated account-deletion email.)
- **CTA URLs: PASS** — verify (`/verify?token=`) and reset (`/reset-password?token=`) both build
  from env with production default `https://shiftflowx.net` and hit real routes. No localhost/
  staging/dead route. (Live end-to-end token test still pending — see final report.)
- **Sender:** `ShiftFlow <noreply@shiftflowx.net>` (`FROM_EMAIL`). **[FIXED]** Reply-To was missing
  while templates invite "just reply" → now `REPLY_TO_EMAIL ?? info@shiftflowx.net`.
- **[P2]** `MARKETING_BASE_URL` (used for verify links) is undocumented in `.env.example` (defaults
  to prod). Feedback-request CTA lands on site root, not a feedback form.
- **Security PASS:** `RESEND_API_KEY` is server-side only; no client/browser email path anywhere.

## Security (public website)
- **Secrets: PASS.** No hardcoded keys/tokens/DB URLs. `BACKEND_URL`/`INTERNAL_API_SECRET` used
  only in the server route `api/ref/click`. No privileged key referenced client-side. `.env*`
  git-ignored. `NEXT_PUBLIC_*` vars are non-sensitive.
- **Admin separation: PASS.** Admin is a separate repo/app/deploy; **no admin link** anywhere in
  website nav/footer/sitemap. Admin has middleware JWT auth + role checks + `robots noindex` + HSTS.
- **[FIXED] HSTS** added to public site (`next.config.ts`) — was absent.
- **[FIXED] CSP** hardened with `base-uri`/`form-action`/`object-src`. Remaining **[P2]**:
  `script-src` still allows `'unsafe-inline'/'unsafe-eval'` (Next hydration) — tighten to nonces later.
- **[P2]** `verify`/`reset-password` fall back to the raw Railway origin
  (`shiftflow-backend-production.up.railway.app`) instead of `api.shiftflowx.net` — info disclosure.
- **Source maps: PASS** (no browser-served `.map`). **No debug/test routes exposed.**
- **[P2]** Admin has no static `robots.txt` (defense-in-depth; relies on meta noindex + auth-gate).

## Ranked
- **P0:** none in email/security.
- **P1 (fixed this pass):** HSTS, reset-password noindex, broken OG image, legal-page canonicals, email Reply-To.
- **P2:** CSP `unsafe-inline`; Railway URL fallback; pricing/referral canonical; low-contrast footer text; nav logo weight; admin robots.txt.
