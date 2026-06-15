# Environment Variable Audit

_Generated: 2026-06-09_

## Frontend Environment Variables (`shiftflow-website`)

| Variable | Status | Notes |
|---|---|---|
| `BACKEND_URL` | SET | `https://shiftflow-backend-production.up.railway.app` — set in `.env.local` |
| `INTERNAL_API_SECRET` | SET | Shared with backend `COOKIE_SECRET` — set in `.env.local` |
| `NEXT_PUBLIC_APP_URL` | SET | `https://shiftflowx.net` — set in `.env.local` |
| `NEXT_PUBLIC_POSTHOG_KEY` | NOT USED | Scanned all frontend source files — no PostHog client usage found in the frontend codebase. PostHog is backend-only. |

### Vercel Environment Variables to Set

The following must be added in the Vercel project dashboard under **Settings → Environment Variables** (for Production/Preview/Development):

| Variable | Value |
|---|---|
| `BACKEND_URL` | `https://shiftflow-backend-production.up.railway.app` |
| `INTERNAL_API_SECRET` | _(copy from Railway `COOKIE_SECRET` value)_ |
| `NEXT_PUBLIC_APP_URL` | `https://shiftflowx.net` |

> **Note:** `.env.local` is gitignored by Next.js convention and is for local development only. Vercel reads these vars from its dashboard, not from the repo.

---

## Backend Environment Variables (`ShiftFlow/backend`)

| Variable | Status | Notes |
|---|---|---|
| `DATABASE_URL` | SET | Internal Railway URL (`postgres.railway.internal`) — correct for production |
| `REDIS_URL` | SET | Internal Railway URL (`redis.railway.internal`) — correct for production |
| `JWT_SECRET` | SET | Secure 64-char hex value on Railway |
| `COOKIE_SECRET` | SET | Secure 64-char hex value on Railway |
| `REVENUECAT_WEBHOOK_SECRET` | SET | Present on Railway |
| `API_BASE_URL` | SET | `https://shiftflow-backend-production.up.railway.app` |
| `RESEND_API_KEY` | SET | `re_XSQbB51o_...` |
| `FROM_EMAIL` | SET | `noreply@shiftflowx.net` |
| `FRONTEND_URL` | SET | `https://shiftflowx.net` |
| `POSTHOG_API_KEY` | SET | Present on Railway |
| `GOOGLE_CLIENT_ID` | SET | Present on Railway |
| `APNS_KEY_ID` | SET | `ART6AKXN9R` |
| `APNS_TEAM_ID` | SET | `YQDNK65BZ2` |
| `APNS_BUNDLE_ID` | SET | `com.ShiftFlowx.app` |
| `APNS_KEY_PATH` | PLACEHOLDER (local .env only) | Local `.env` uses a local file path. Railway uses `APNS_KEY` (inline PEM) instead — correct approach. |
| `ALLOWED_ORIGINS` | SET | Railway value is `*` — consider restricting to `https://shiftflowx.net` for production hardening |
| `R2_PUBLIC_URL` | PLACEHOLDER (local .env only) | Local `.env` has empty value. Railway has `https://assets.shiftflowx.net` — correct. |

### Railway Environment Variables to Verify

All critical backend vars are already set on Railway. The local `.env` file uses development defaults (`localhost` DB/Redis) which are intentionally different from Railway production values.

---

## Security Notes

- **No secrets in frontend env**: All `NEXT_PUBLIC_*` vars are public. The `INTERNAL_API_SECRET` and `BACKEND_URL` are server-side only (no `NEXT_PUBLIC_` prefix) and are safe to store in Vercel environment variables.
- **APNS key**: Railway stores the APNs private key as an inline `APNS_KEY` environment variable (PEM content). This avoids the need for a file path on the production server. Local `.env` still references a local file path — do not commit the `.p8` file to git.
- **ALLOWED_ORIGINS = `*`**: Currently set to wildcard on Railway. Tighten to `https://shiftflowx.net` after confirming no other origins need access.
