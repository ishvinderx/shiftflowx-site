# ShiftFlow Security Deployment Report

**Date:** 2026-06-09
**Scope:** Backend (`/ShiftFlow/backend`) + Website (`/shiftflow-website`)
**Auditor:** Senior Security Engineer (automated audit)

---

## 1. Security Headers (Website — next.config.ts)

| Header | Status | Notes |
|---|---|---|
| X-Frame-Options | **FIXED — now PRESENT** | Was missing; added `DENY` |
| X-Content-Type-Options | **FIXED — now PRESENT** | Was missing; added `nosniff` |
| Referrer-Policy | **FIXED — now PRESENT** | Was missing; added `strict-origin-when-cross-origin` |
| Permissions-Policy | **FIXED — now PRESENT** | Was missing; added camera/mic/geolocation block |
| Content-Security-Policy | **FIXED — now PRESENT** | Was missing; added permissive-but-functional CSP |
| HSTS (Strict-Transport-Security) | PRESENT (backend) | Set by `fastify-helmet` on API: `max-age=31536000; includeSubDomains; preload` |

**Action taken:** `next.config.ts` was an empty stub. All five headers have been added via the `headers()` async function, applying to all routes (`/(.*)`).

> CSP note: `unsafe-inline` and `unsafe-eval` are included on `script-src` as required by Next.js hydration and dynamic imports. These should be tightened to nonce-based CSP once the app migrates fully to App Router.

---

## 2. Backend Security Middleware

| Control | Status | Notes |
|---|---|---|
| Helmet | PRESENT | `@fastify/helmet` registered with HSTS preload |
| CORS | PRESENT | `@fastify/cors` with explicit origin allowlist |
| Rate Limiting | PRESENT | `@fastify/rate-limit` global=true, 200 req/min default; sensitive endpoints tightened (register: 5/min, login: 10/min, forgot-password: 3/15min, Apple/Google auth: 10/min) |
| JWT Authentication | PRESENT | `@fastify/jwt`, 1h access token expiry, refresh token rotation on every use |
| Refresh Token Rotation | PRESENT | UUID v4 tokens rotated on every `/auth/refresh` call, old token immediately invalidated |
| Cookie Security | PRESENT | `httpOnly: true`, `secure: true` in production, `sameSite: lax`, scoped to `/api/v1/auth` path |
| Field-Level Encryption (PII) | PRESENT | AES-256-GCM via `FIELD_ENCRYPTION_KEY`; server refuses to start in production without valid 64-char hex key |
| IP Hashing (Audit Logs) | PRESENT | SHA-256 HMAC with `IP_HASH_SALT`; server refuses to start in production with default salt |
| Bcrypt Password Hashing | PRESENT | `bcryptjs` with cost factor 12 |
| Timing-Safe Admin Token Check | PRESENT | `timingSafeEqual` used in `admin.ts` |

---

## 3. CORS Configuration

```
Allowed origins (production): process.env.ALLOWED_ORIGINS (comma-separated, required in prod)
Development fallback:          http://localhost:3000, http://localhost:8080
credentials:                   true
```

The server **throws and refuses to start** in production if `ALLOWED_ORIGINS` is not set — no localhost backdoor in production. The `.env.example` documents the expected value as `https://shiftflowx.net`.

Status: **SECURE**

---

## 4. Rate Limiting

Global rate limiting is enabled via `fastify-rate-limit` with `global: true` and backed by Redis.

| Endpoint | Limit |
|---|---|
| Default (all routes) | 200 req / 1 min |
| POST /auth/register | 5 req / 1 min |
| POST /auth/login | 10 req / 1 min |
| POST /auth/forgot-password | 3 req / 15 min |
| POST /auth/apple, /auth/google | 10 req / 1 min |
| POST /auth/refresh | 30 req / 1 min |
| POST /auth/logout | 10 req / 1 min |
| POST /auth/check-email | 10 req / 1 min |
| POST /referrals/click | 30 req / 1 min |
| POST /waitlist | 3 req / 1 hour |
| POST /feedback | 5 req / 1 hour |

Status: **SECURE**

---

## 5. JWT Validation

- Tokens signed with `JWT_SECRET` (required, throws on startup if missing)
- Expiry: 1 hour (configured in `app.register(fastifyJwt, { sign: { expiresIn: '1h' } })`)
- Verified via `request.jwtVerify()` in `authMiddleware`
- Refresh tokens: UUID v4 (122-bit entropy), stored plaintext in DB, rotated on every use

Status: **SECURE**

---

## 6. Input Sanitization / Validation

All route handlers use [Zod](https://zod.dev/) for schema validation before any DB interaction. All database queries use Prisma's parameterized ORM — no raw SQL string interpolation was found in the codebase. The single `$queryRaw` call found (`SELECT 1`) is a health-check ping.

Status: **SECURE**

---

## 7. Secret Management

| Variable | Validation |
|---|---|
| `JWT_SECRET` | Required — throws on startup if missing |
| `COOKIE_SECRET` | Required — throws on startup if missing |
| `FIELD_ENCRYPTION_KEY` | Required in production — process.exit(1) if missing/invalid |
| `IP_HASH_SALT` | Required in production — throws if missing or uses dev default |
| `ADMIN_TOKEN` | Required in production — disables all admin routes if missing |
| `ALLOWED_ORIGINS` | Required in production — throws if missing |
| `REVENUECAT_WEBHOOK_SECRET` | Validated per-request — returns 401 if env var unset |

No hardcoded secrets were found in any source file. All secrets are sourced exclusively from `process.env`. The `.env` file is protected by `.gitignore` (`.env*` pattern). The `.env.example` contains only placeholder values.

Status: **SECURE**

---

## 8. HTTPS Enforcement

- Backend: Fastify-Helmet sets HSTS with `max-age=31536000; includeSubDomains; preload`. TLS termination expected at the Railway reverse proxy.
- Website: Next.js deployed behind Cloudflare/Vercel — HTTPS enforced at the CDN layer.
- No plaintext `http://` calls to production hosts found in source code (only SVG namespace URIs in markup, and localhost/dev references).
- Refresh cookie: `secure: true` in production (won't transmit over HTTP).

Status: **SECURE**

---

## 9. Known Vulnerabilities Found

### FIXED — CRITICAL: Missing Security Headers on Website (next.config.ts)
- **Severity:** High
- **Description:** The Next.js config was an empty stub with no security headers. The website was served without X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or Content-Security-Policy.
- **Impact:** Clickjacking, MIME-type sniffing attacks, referrer leakage, and XSS escalation risk.
- **Fix applied:** Headers added to `next.config.ts` in this audit.

### FIXED — MEDIUM: Timing Oracle on Referral `/convert` Secret Comparison
- **File:** `backend/src/routes/referrals.ts`, line 201
- **Severity:** Medium
- **Description:** The internal `POST /referrals/convert` endpoint compared `INTERNAL_API_SECRET` to the incoming `Authorization` header with a plain `!==` string comparison. This is a timing oracle — an attacker making many requests can brute-force the secret one byte at a time by measuring response latency.
- **Impact:** An attacker who can make network requests to the API could eventually recover the `INTERNAL_API_SECRET` and forge reward conversions, granting arbitrary users free subscription months.
- **Fix applied:** Replaced with `timingSafeEqual` (matching the pattern already used in `admin.ts` and `webhooks.ts`). `timingSafeEqual` is now imported from `node:crypto`.

### INFORMATIONAL — Rate Limiting Not Explicit on Internal `/convert` Endpoint
- **Severity:** Low
- **Description:** `POST /referrals/convert` inherits the global default of 200 req/min rather than a tighter limit. For an internal-only endpoint, this limit is higher than necessary.
- **Recommendation:** Add `config: { rateLimit: { max: 20, timeWindow: '1 minute' } }` to this route and consider IP allowlisting at the infrastructure layer (only the payment processor IP should be able to reach this endpoint).

### INFORMATIONAL — Admin Role Check via DB Query (No RBAC Middleware)
- **File:** `backend/src/routes/referrals.ts` (admin endpoint) and `backend/src/routes/admin.ts`
- **Severity:** Informational
- **Description:** Admin role checks are performed inline with `prisma.user.findUnique` inside handler functions rather than via a shared middleware/decorator. This is consistent across the codebase but creates risk of forgetting the check if new admin routes are added.
- **Recommendation:** Extract admin RBAC into a dedicated `requireAdmin` decorator (similar to how `requirePremium` is a registered decorator) to make it impossible to forget.

### INFORMATIONAL — CSP Uses `unsafe-inline` / `unsafe-eval` on script-src
- **Severity:** Informational
- **Description:** The CSP added to `next.config.ts` permits `unsafe-inline` and `unsafe-eval` on `script-src`, which weakens XSS protections. This is required for current Next.js pages-router hydration.
- **Recommendation:** Migrate to App Router nonce-based CSP (`nonces` in `next.config.ts` + `<Script nonce>`) to eliminate `unsafe-inline`. Remove `unsafe-eval` unless dynamic `eval()` is explicitly needed.

### INFORMATIONAL — In-Memory Rate Limiter in Website API Route
- **File:** `shiftflow-website/src/app/api/ref/click/route.ts`
- **Severity:** Low
- **Description:** The website's referral click proxy uses an in-memory `Map` for rate limiting. In a multi-instance deployment (Vercel serverless), each function instance has its own map — rate limiting is not coordinated across instances, and the map is reset on cold starts.
- **Recommendation:** Accept this trade-off for click tracking (low-stakes), or move the rate limiting to the backend only (the backend already rate-limits this endpoint).

---

## 10. Overall Verdict

```
VERDICT: NEEDS_ATTENTION
```

The backend is well-secured with all critical controls in place. Two issues were found and **fixed in this audit**:

1. The Next.js website had **no security headers at all** (critical omission, now fixed).
2. The referral `/convert` endpoint used a **plain string comparison** instead of `timingSafeEqual` for the shared secret (timing oracle, now fixed).

The remaining findings are informational/low severity and do not represent exploitable vulnerabilities in the current deployment configuration. Address the CSP `unsafe-inline` tightening and the internal endpoint rate-limit/allowlist as follow-up hardening work.
