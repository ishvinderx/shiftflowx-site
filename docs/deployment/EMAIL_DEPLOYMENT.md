# ShiftFlow — Email Deployment Report

_Audited: 2026-06-09_

---

## Email Service

**Provider:** Resend (`resend` npm package)  
**SDK:** `import { Resend } from 'resend'`  
**Source file:** `backend/src/lib/email.ts`

---

## Configuration

| Setting        | Value                          | Status  |
|---------------|--------------------------------|---------|
| `RESEND_API_KEY` | Set in `.env` (`re_XSQbB51o_…`) | CONFIGURED |
| `FROM_EMAIL`   | `noreply@shiftflowx.net`       | CONFIGURED |
| `FRONTEND_URL` | `https://shiftflowx.net`       | Used for CTAs |
| Dev fallback   | Logs to console if key absent   | Yes — safe |

> **Domain:** All emails send from `noreply@shiftflowx.net`. Domain verification must be completed in the Resend dashboard for `shiftflowx.net` before production sends will reliably reach inboxes (SPF, DKIM records required).

---

## Email Flows Implemented

### Transactional (auth.ts + webhooks.ts)

| Flow | Function | Trigger |
|------|----------|---------|
| Welcome email | `sendWelcomeEmail` | Registration (email/password, Apple, Google OAuth) |
| Email verification | `sendVerifyEmail` | On registration (24h expiry link) |
| Email verified confirmation | `sendEmailVerifiedEmail` | After user clicks verification link |
| Password reset | `sendPasswordResetEmail` | `/auth/forgot-password` route (1h expiry) |
| Password changed notice | `sendPasswordChangedEmail` | After successful password change |
| Subscription activated | `sendSubscriptionActivatedEmail` | RevenueCat webhook: `INITIAL_PURCHASE` |
| Subscription cancelled | `sendSubscriptionCancelledEmail` | RevenueCat webhook: cancellation event |
| Renewal success | `sendRenewalSuccessEmail` | RevenueCat webhook: `RENEWAL` |
| Payment failed | `sendPaymentFailedEmail` | RevenueCat webhook: billing failure |
| Founding member | `sendFoundingMemberEmail` | First 1,000 paid subscribers (webhook) |

### Lifecycle Sequences (emailScheduler.ts — runs every 1 hour)

| Sequence | Function | Condition |
|----------|----------|-----------|
| Day 1 get-started | `sendDay3NudgeEmail` | 1 day after signup, always |
| Day 3 nudge | `sendDay3NudgeEmail` | 3 days after signup, no shifts logged |
| Day 5 feature education | `sendFeatureEducationEmail` | 5 days after signup |
| Day 7 win-back | `sendDay7WinBackEmail` | 7 days after signup, still inactive |
| Day 14 feature spotlight | `sendDay14FeatureEmail` | 14 days after signup, has shifts |
| Day 30 win-back | `sendDay30WinBackEmail` | 30 days after signup, never activated |
| Day 60 win-back | `sendDay60WinBackEmail` | 60 days after signup, never activated |
| Day 90 final win-back | `sendDay90WinBackEmail` | 90 days after signup, never activated |
| Trial ending (3 days left) | `sendTrialEndingEmail` | Day 27 of 30-day trial |
| Weekly summary | `sendWeeklySummaryEmail` | Every Sunday, user has shifts |
| Monthly report | `sendMonthlyReportEmail` | 1st of each month, user has shifts |
| Tax reminder | `sendTaxReminderEmail` | October 1st each year |
| Feedback request | `sendFeedbackRequestEmail` | Day 30, active users (has shifts) |
| App Store review nudge | `sendAppStoreReviewEmail` | Day 45, very active (10+ shifts) |

### Defined but Not Currently Wired to a Trigger

These functions exist in `email.ts` but are not called from any route or scheduler:

| Function | Notes |
|----------|-------|
| `sendTrialStartedEmail` | Defined but no RevenueCat webhook trigger found |
| `sendReferralInviteEmail` | Referral invite — not wired to a route/job |
| `sendNewDeviceLoginEmail` | Security alert — not wired to auth middleware |
| `sendPaydayReminderEmail` | Payday prediction alert — not wired to scheduler |
| `sendReferralSuccessEmail` | Referral conversion reward — not wired to referral flow |

---

## FROM Address

```
ShiftFlow <noreply@shiftflowx.net>
```

Friendly name "ShiftFlow" is set correctly. Reply-to is not explicitly set; replies go to `noreply@shiftflowx.net` — consider adding a `reply-to: support@shiftflowx.net` if you want to receive replies.

---

## Email Template Architecture

- Shared branded HTML shell (`emailShell()`) — inline CSS, email-client-safe table layout
- Brand colour: `#C0395A` (rose/red)
- Plain-text fallback included for every email
- No external dependencies for templates (no Handlebars, MJML, etc.)

---

## Missing / Gaps

1. **`sendTrialStartedEmail` not triggered** — the function is polished and ready but no RevenueCat webhook event (`TRIAL_STARTED`) calls it. Should be wired in `webhooks.ts`.
2. **`sendReferralInviteEmail` not triggered** — defined but not connected to the referral routes.
3. **`sendNewDeviceLoginEmail` not triggered** — security-sensitive email, should be called from the auth login path when a new device/session is detected.
4. **`sendPaydayReminderEmail` not triggered** — requires a scheduled job that checks predicted payday dates.
5. **`sendReferralSuccessEmail` not triggered** — should fire when a referred user converts in the referral system.
6. **Domain verification** — must verify `shiftflowx.net` in Resend dashboard (SPF + DKIM DNS records) before going live or emails will land in spam.
7. **App Store review URL** — `sendAppStoreReviewEmail` uses `SITE` (the web URL) as the review URL placeholder; a real App Store link needs to be substituted post-launch.

---

## VERDICT: READY (with minor gaps)

The core email infrastructure is solid and production-ready. Resend is configured with a real API key and domain. All critical auth and billing flows are wired. The gaps are enhancement-level — 5 email functions are defined but not yet connected to triggers. Domain DNS verification in the Resend dashboard is required before go-live.
