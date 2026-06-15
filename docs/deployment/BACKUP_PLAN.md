# ShiftFlow — Backup & Disaster Recovery Plan

**Last updated:** 2026-06-09
**Status:** NEEDS_SETUP (see gaps section)

---

## 1. Database Backups (PostgreSQL on Railway)

### Automatic Backups (Railway)

Railway provides automatic daily PostgreSQL backups on **Pro and Team plans**. Backup retention is 7 days on Pro, 30 days on Team.

**Action required:** Verify in the Railway dashboard (railway.app → Project → PostgreSQL service → Backups tab) that:
- Automatic backups are enabled
- At least 7-day retention is active
- The plan is Pro or higher (Hobby/Starter plans do NOT include automatic backups)

If the project is on the Hobby/Starter plan, automatic backups are **not included** — see Manual Backup Procedure below and upgrade or implement a cron backup immediately.

### Manual Backup Procedure

`pg_dump` is not installed on the local machine. Install it via Homebrew or run the dump through Railway's CLI:

```bash
# Install pg_dump (macOS)
brew install libpq
export PATH="/opt/homebrew/opt/libpq/bin:$PATH"

# Get the DATABASE_PUBLIC_URL from Railway dashboard or:
export DATABASE_PUBLIC_URL=$(railway variables --service <backend-service-name> | grep DATABASE_PUBLIC_URL | awk '{print $2}')

# Create a timestamped dump
pg_dump "$DATABASE_PUBLIC_URL" \
  --format=custom \
  --no-acl \
  --no-owner \
  -f "shiftflow_backup_$(date +%Y%m%d_%H%M%S).dump"
```

Store the `.dump` file in a secure location (S3, encrypted local disk, etc.). The backend already has `@aws-sdk/client-s3` installed, which could be leveraged for automated backup uploads.

**Recommended backup frequency:** Daily at minimum; hourly for production with active users.

### Recovery Procedure

```bash
# Restore from a pg_dump custom-format file
pg_restore \
  --dbname "$DATABASE_PUBLIC_URL" \
  --no-acl \
  --no-owner \
  --clean \
  --if-exists \
  shiftflow_backup_YYYYMMDD_HHMMSS.dump

# Verify the restore
psql "$DATABASE_PUBLIC_URL" -c "SELECT COUNT(*) FROM users;"
psql "$DATABASE_PUBLIC_URL" -c "SELECT MAX(created_at) FROM users;"

# Re-run any pending Prisma migrations that post-date the backup
npx prisma migrate deploy
```

### Schema Source of Truth

Prisma migrations are the authoritative schema definition. There are currently **22 migrations** in `/backend/prisma/migrations/`, spanning from initial schema (2026-05-09) through the most recent (2026-06-08 — subscription_receipt_unique). The `schema.prisma` file (31 KB) contains the full current schema.

Even in a total data-loss scenario, the full schema can be reconstructed by running `prisma migrate deploy` against a blank database.

---

## 2. Application Backups

### Backend (Railway + GitHub)

- **Source of truth:** GitHub repository. Every deployment is a git commit.
- **Rollback via Railway CLI:**
  ```bash
  # List recent deployments
  railway deployment list

  # Redeploy a specific previous deployment
  railway redeploy

  # Or push a revert commit to trigger CI/CD
  git revert HEAD && git push origin main
  ```
- **Railway CLI supports:** `deploy`, `redeploy`, `restart`, `down` (removes latest deployment).
- Railway does **not** have a first-class `railway rollback <deployment-id>` command. Rollback is achieved by reverting the git commit and pushing, or by using the Railway dashboard to re-deploy a prior build.

### Website (Vercel)

- Vercel maintains full deployment history for every git push.
- **Instant rollback:** Railway dashboard or `vercel rollback` to any prior deployment in seconds.
- No manual backup needed — every Vercel deployment is immutable and retained.

### iOS App

- Xcode archives are stored locally in `~/Library/Developer/Xcode/Archives/`.
- App Store Connect retains all submitted builds indefinitely.
- **Rollback path:** Re-submit a prior archive, or expedite a hotfix release through App Store review (expedited review typically 24 hours).

---

## 3. Disaster Recovery

### Recovery Time Objective (RTO)

| Component | Estimated RTO | Notes |
|---|---|---|
| Backend (Railway) | ~2–5 minutes | Railway redeploy from existing Docker image |
| Database restore (Railway automatic backup) | ~5–15 minutes | Point-in-time restore via Railway dashboard |
| Database restore (manual pg_dump) | ~10–30 minutes | Depends on dump size and network speed |
| Website (Vercel rollback) | < 1 minute | Instant via Vercel dashboard |
| iOS app | 24–48 hours | App Store review turnaround |

### Recovery Point Objective (RPO)

| Scenario | RPO |
|---|---|
| Railway automatic backups (Pro plan) | Up to 24 hours |
| Manual pg_dump (if daily cron is set up) | Up to 24 hours |
| Manual pg_dump (if hourly cron is set up) | Up to 1 hour |
| No backup configured (current risk) | Full data loss possible |

### Step-by-Step Rollback Runbook

#### Scenario A — Broken backend deployment (code bug)
1. Identify the bad commit via `railway deployment list` or git log.
2. `git revert <bad-commit-sha> && git push origin main` to trigger auto-redeploy.
3. Alternatively, use Railway dashboard: Deployments → select prior build → Redeploy.
4. Confirm `/health` returns 200.

#### Scenario B — Bad database migration
1. **Do not run `prisma migrate reset`** in production — this drops all data.
2. Identify what the migration changed (see `/backend/prisma/migrations/<timestamp>_<name>/migration.sql`).
3. Write a compensating migration to revert the schema change.
4. If data was corrupted: restore from the most recent Railway automatic backup (dashboard → PostgreSQL → Backups → Restore).
5. After restore, re-run only the migrations that are newer than the backup's timestamp: `npx prisma migrate deploy`.

#### Scenario C — Full infrastructure failure (Railway outage)
1. Export the latest database backup from Railway (download the `.dump` file).
2. Provision a new PostgreSQL instance (Railway, Supabase, Neon, or Render).
3. Restore the dump: `pg_restore --dbname <new-url> shiftflow_backup.dump`
4. Update `DATABASE_URL` environment variable in the new backend deployment.
5. Push backend to the new provider (or wait for Railway recovery — Railway SLA is 99.5%).
6. Update DNS (api.shiftflowx.net CNAME) to point to the new backend URL.

---

## 4. Data Export (GDPR Right to Portability)

### Account Deletion

A `DELETE /account` endpoint exists in `/backend/src/routes/user.ts`. This handles user-initiated account deletion. The schema includes a `scheduled_delete_at` field (migration `20260607010000_add_scheduled_delete_at`), indicating a soft-delete / grace period pattern is in place.

### Data Export Endpoint

**Gap: No dedicated data export endpoint (`GET /account/export`) was found in the routes.** The current route list covers: auth, checkins, goals, entries, analytics, earnings, invoices, tax, user — but no data portability export.

For full GDPR Article 20 compliance, a `/account/export` endpoint should be added that returns a user's complete data as JSON or CSV. This is currently missing.

---

## 5. Current Gaps

| Gap | Severity | Recommendation |
|---|---|---|
| **No automated backup cron job** | HIGH | Set up a daily `pg_dump` script (cron or Railway cron service) that uploads to S3. The AWS S3 SDK is already a dependency. |
| **Railway plan / backup status unverified** | HIGH | Check Railway dashboard immediately. If on Hobby plan, backups are not automatic. |
| **`pg_dump` not installed locally** | MEDIUM | Run `brew install libpq` for ad-hoc backup capability. |
| **No staging environment** | MEDIUM | There is no staging database or deployment. All migration testing happens against the production DB, which increases migration risk. |
| **No data export endpoint (GDPR)** | MEDIUM | Add `GET /account/export` returning user data in portable format. |
| **No incident response runbook beyond this doc** | LOW | Create a brief on-call playbook (who gets paged, triage steps, escalation path). |
| **Xcode archives only stored locally** | LOW | Upload archives to a shared location (iCloud, S3) to survive local machine failure. |

---

## 6. Immediate Actions (Priority Order)

1. **Verify Railway backup status** in the dashboard right now. Enable if disabled.
2. **Install `pg_dump`** locally: `brew install libpq && echo 'export PATH="/opt/homebrew/opt/libpq/bin:$PATH"' >> ~/.zshrc`
3. **Run a manual backup today** to establish a baseline and test the restore procedure end-to-end.
4. **Create a Railway cron service** (or a simple shell script triggered by cron/launchd) that runs `pg_dump` daily and uploads to S3 using the existing `@aws-sdk/client-s3` dependency.
5. **Add a staging environment** — a Railway environment with its own database for testing migrations before they hit production.
6. **Add `GET /account/export`** route to the backend for GDPR data portability.

---

## Verdict: NEEDS_SETUP

The **schema** is well-protected (22 versioned Prisma migrations in git, fully reproducible), and the **application code** is backed up via GitHub + Railway deployment history. However, **live user data protection is unverified** — Railway automatic backups may or may not be active depending on the plan tier, and no automated backup script exists in the codebase. Until automatic backups are confirmed active and tested, the system is one database incident away from irrecoverable data loss.
