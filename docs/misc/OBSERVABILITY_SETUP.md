# Observability & Monitoring Setup — ShiftFlow
**Audit Date:** 2026-06-09  
**Scope:** Backend (Node.js/Fastify) + Website (Next.js)

---

## 1. PostHog — Analytics

### Backend (`/Users/ishvinderx/ShiftFlow/backend/`)

| Item | Status | Details |
|------|--------|---------|
| Library installed | CONFIGURED | `posthog-node` imported in `src/lib/analytics.ts` |
| API key (prod) | CONFIGURED | `POSTHOG_API_KEY` set in `.env` with real key (`phc_npMp...`) |
| API key (example) | NOTE | `.env.example` has empty placeholder — correct for examples |
| Host | CONFIGURED | `POSTHOG_HOST=https://us.i.posthog.com` |
| Graceful no-op | PASS | If `POSTHOG_API_KEY` absent, all calls are silently skipped |
| Batching | CONFIGURED | `flushAt: 20`, `flushInterval: 10000ms` |
| Graceful shutdown | PASS | `shutdownAnalytics()` called on process shutdown |

**Events being tracked (backend):**

| Event | Route | Description |
|-------|-------|-------------|
| `user_signed_up` | `auth.ts` | Email, Apple, Google sign-up |
| `user_signed_in` | `auth.ts` | Email, Apple, Google sign-in |
| `job_created` | `jobs.ts` | New job/employer added |
| `shift_logged` | `entries.ts` | Full shift logged |
| `shift_clocked_in` | `entries.ts` | Clock-in event |
| `shift_clocked_out` | `entries.ts` | Clock-out event |
| `invoice_created` | `invoices.ts` | New invoice |
| `invoice_pdf_generated` | `invoices.ts` | PDF generated |
| `daily_checkin_completed` | `checkins.ts` | Daily wellness check-in |

**identify() calls:** `auth.ts` — called on sign-up (all providers) with email, name, username, timezone, provider.

### Website (`/Users/ishvinderx/shiftflow-website/`)

| Item | Status | Details |
|------|--------|---------|
| PostHog SDK | NOT INTEGRATED | No PostHog calls found in `src/` |
| `layout.tsx` | No analytics | No tracking scripts injected |
| Data policy page | DOCUMENTED | References PostHog in disclosures but no actual integration |

**Gap:** Website has zero frontend analytics. No page view tracking, no conversion funnels, no referral attribution from web.

---

## 2. Sentry — Error & Crash Reporting

### Backend (`/Users/ishvinderx/ShiftFlow/backend/`)

| Item | Status | Details |
|------|--------|---------|
| Library installed | CONFIGURED | `@sentry/node` + `@sentry/profiling-node` in `src/lib/sentry.ts` |
| Initialization | CONFIGURED | `initSentry()` called before other imports in `index.ts` |
| Fastify integration | CONFIGURED | `attachSentryToFastify()` hooks into `onError` |
| DSN (prod) | NOT SET | `SENTRY_DSN` is **absent** from `.env` — Sentry is DISABLED in production |
| DSN (example) | NOT SET | Not present in `.env.example` either |
| PII protection | PASS | `sendDefaultPii: false`; strips email, password, token from extras |
| Performance tracing | CONFIGURED | `tracesSampleRate: 0.1` (10%) |
| Profiling | CONFIGURED | `profilesSampleRate: 0.1` |
| Environment tagging | PASS | Uses `NODE_ENV` |
| Release tracking | PASS | Uses `RAILWAY_GIT_COMMIT_SHA` |
| Error scrubbing | PASS | `beforeSend` strips PII fields |
| Noise filtering | PASS | Ignores `ECONNRESET`, `ETIMEDOUT`, Prisma P2025 |
| User identification | PASS | `setSentryUser()` uses hashed ID (no PII) |

**Critical Gap:** `SENTRY_DSN` is not set in the production `.env`. The `initSentry()` call logs `"[Sentry] SENTRY_DSN not set — monitoring disabled."` — meaning all crashes and errors are currently unmonitored in production.

### Website (`/Users/ishvinderx/shiftflow-website/`)

| Item | Status | Details |
|------|--------|---------|
| Sentry SDK | NOT INTEGRATED | No Sentry found in website source |
| `next.config` | NOT CHECKED | No `sentry.config.js` or `withSentryConfig` present |

---

## 3. Health Endpoint

### Backend Public Health Endpoint

| Item | Status | Details |
|------|--------|---------|
| Endpoint exists | PASS | `GET /health` in `src/index.ts` |
| Response | PASS | Returns `{ status: 'ok', timestamp: ISO_string }` |
| Authentication | NONE (public) | Correct — uptime monitors need unauthenticated access |

### Admin Health Endpoint (detailed)

| Item | Status | Details |
|------|--------|---------|
| Endpoint exists | PASS | `GET /health` in `src/routes/admin.ts` (admin-authenticated) |
| Database ping | PASS | `SELECT 1` with latency measurement |
| Redis ping | PASS | `redis.ping()` with memory info and latency |
| Process metrics | PASS | Uptime, RSS memory, heap memory, Node.js version |
| Authentication | REQUIRED | Protected by admin hooks |

---

## 4. What's Monitored vs. What's Missing

### Currently Monitored

- Backend event analytics (PostHog) — user lifecycle, shift events, invoices, check-ins
- Backend health checks — DB, Redis, process metrics
- Code-level graceful shutdown for analytics

### Missing / Gaps

| Gap | Severity | Recommendation |
|-----|----------|----------------|
| Sentry DSN not set in production | **HIGH** | Add `SENTRY_DSN` to Railway/production env vars immediately. All backend crashes and errors are invisible. |
| Website has no PostHog | MEDIUM | Add `posthog-js` to the Next.js layout to track page views, referral sources, download button clicks |
| Website has no error monitoring | MEDIUM | Add `@sentry/nextjs` with `withSentryConfig` wrapper for frontend error capture |
| No external uptime monitoring | MEDIUM | Set up UptimeRobot, Better Uptime, or similar to ping `/health` every 60s and alert on downtime |
| No alerting on PostHog anomalies | LOW | Configure PostHog alerts for unusual drops in `shift_logged` or `user_signed_up` events |
| No backend log aggregation | LOW | Consider structured logging to Railway logs or a log aggregator (Axiom, Logtail) |

---

## 5. Recommendations (Priority Order)

### Immediate (Before App Store Launch)

1. **Set `SENTRY_DSN` in production environment variables** (Railway dashboard).  
   Create a Sentry project at sentry.io, copy the DSN, add to Railway env vars.  
   This unblocks crash monitoring with zero code changes required.

2. **Verify PostHog is receiving events** — check the PostHog dashboard to confirm `user_signed_up`, `shift_logged`, etc. are flowing. The API key is set in `.env` so this should already be working.

### Short-Term (Post-Launch)

3. **Add PostHog to the website** — install `posthog-js`, wrap layout in a `<PHProvider>`, and track page views + download button clicks for marketing attribution.

4. **Set up external uptime monitoring** — configure a free UptimeRobot monitor on `https://shiftflowx.net` and your backend `/health` endpoint with email/SMS alerts.

5. **Add `@sentry/nextjs` to the website** — run `npx @sentry/wizard@latest -i nextjs` to auto-configure. Captures frontend JS errors and Web Vitals.

### Nice-to-Have

6. Add a `POSTHOG_FEATURE_FLAGS_ENABLED` check to gate staged rollouts.
7. Set up a PostHog dashboard with DAU, shift_logged per day, and sign-up funnel.
8. Configure Sentry performance alerts for p95 API latency thresholds.
