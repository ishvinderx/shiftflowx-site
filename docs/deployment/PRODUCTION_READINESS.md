# Production Readiness Checklist

## Environment Variables

All secrets are set in Railway's Environment settings, never committed to source control.

### Backend (Railway)

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | Redis connection string | `redis://default:pass@host:6379` |
| `JWT_SECRET` | 64-byte hex for access tokens | `$(openssl rand -hex 64)` |
| `JWT_REFRESH_SECRET` | 64-byte hex for refresh tokens | `$(openssl rand -hex 64)` |
| `INTERNAL_API_SECRET` | Internal service-to-service auth | `$(openssl rand -hex 32)` |
| `APPLE_SHARED_SECRET` | Apple IAP shared secret | From App Store Connect |
| `POSTHOG_API_KEY` | Server-side PostHog key | `phc_...` |
| `RESEND_API_KEY` | Email sending (Resend) | `re_...` |

### Website (Next.js / Vercel or Railway)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Public backend URL (e.g. `https://api.shiftflowx.net`) |
| `BACKEND_URL` | Internal backend URL for server-side API routes |
| `INTERNAL_API_SECRET` | Shared with backend for internal calls |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client-side PostHog key |

---

## Prisma Migration Commands

```bash
# Generate client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name add_referral_tables

# Apply migrations in production
npx prisma migrate deploy

# Verify migration status
npx prisma migrate status

# Seed initial data (if seed.ts exists)
npx prisma db seed
```

**Before deploying a migration to production:**
1. Run `prisma migrate deploy` on a staging database first
2. Confirm migration is non-destructive (no column drops without a deprecation period)
3. Deploy backend code before running migration if adding new columns (backwards-compatible)

---

## Railway Deployment Steps

### Backend

```bash
# Connect Railway project
railway link <project-id>

# Deploy manually
railway up

# Or push to main branch (CI/CD auto-deploys)
git push origin main
```

Railway `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npx prisma migrate deploy && node dist/index.js"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

### Website

```bash
# Set environment variables
railway variables set NEXT_PUBLIC_API_URL=https://api.shiftflowx.net

# Deploy
railway up --service website
```

---

## iOS App Store Notes

- **Referral code entry**: Must not appear as a "promo code" flow — Apple may reject if it looks like bypassing IAP. Frame as "invited by a friend" onboarding step.
- **Free month reward**: Implemented as subscription extension on the backend (not via Apple promo codes), so no App Store review required for the reward mechanism.
- **Review guideline 3.2.2**: Referral rewards that result in free Pro access are permitted as long as the primary purchase path goes through Apple IAP.
- **Privacy policy**: Update to include disclosure of referral code collection and processing.
- **App Store Connect**: Ensure `NSUserTrackingUsageDescription` does NOT reference referral tracking (it's first-party data, not cross-app tracking).

---

## Monitoring Setup

### Railway Metrics
- CPU and memory dashboards visible in Railway console
- Alert: CPU > 80% for 5 min → email notification

### Uptime
- UptimeRobot monitors `https://api.shiftflowx.net/health` every 60 seconds
- SMS + email alert on 2× consecutive failures

### Error Tracking
- Sentry configured in both backend and website
- Alert threshold: >10 new errors per hour → Slack notification in `#alerts`

### PostHog
- Real-time dashboard for referral funnel KPIs
- Weekly digest email every Monday 08:00 UTC

---

## 100K User Scaling Plan

| Concern | Solution |
|---|---|
| Database reads | Read replicas on Railway Postgres; add connection pooling via PgBouncer |
| Referral code lookups | Index on `ReferralCode.code` (already unique index) |
| Click tracking volume | Write to Redis queue → batch-insert to Postgres every 30s |
| Reward issuance | BullMQ job queue — rewards issued asynchronously, not in request path |
| Rate limiting | Redis-backed with sliding window; shared across all instances |
| Horizontal scaling | Stateless backend — Railway auto-scales with `numReplicas: 3` at peak |
| CDN | Cloudflare in front of website and API for static asset caching and DDoS protection |
| Background jobs | Separate Railway service for BullMQ workers; scales independently of API |

### Database Indexes for Scale

```sql
CREATE INDEX idx_referral_code_code ON "ReferralCode"(code);
CREATE INDEX idx_referral_status ON "Referral"(status);
CREATE INDEX idx_referral_referee_id ON "Referral"("refereeId");
CREATE INDEX idx_referral_created_at ON "Referral"("createdAt" DESC);
```

---

## Pre-Launch Checklist

- [ ] All env vars set in Railway production environment
- [ ] `prisma migrate deploy` run and verified on production DB
- [ ] Referral code generation seeded for all existing users (`scripts/seed-referral-codes.ts`)
- [ ] Apple IAP shared secret configured and receipt verification tested
- [ ] Rate limiting tested under load (k6 script: `scripts/load-test-referrals.js`)
- [ ] Fraud scoring thresholds calibrated against test data
- [ ] Admin dashboard access tested with production JWT
- [ ] PostHog events verified in Live Events view
- [ ] Sentry DSN configured for production environment
- [ ] Referral landing page (`/r/:code`) loads in < 1.5s on mobile (Lighthouse verified)
- [ ] Privacy policy updated to include referral data processing
