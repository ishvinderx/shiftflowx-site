# Database Deployment Report

_Generated: 2026-06-09_

## Status: MIGRATED

---

## Prisma Migrate Deploy

### Command

```bash
cd /Users/ishvinderx/ShiftFlow/backend
DATABASE_URL="postgresql://postgres:<password>@viaduct.proxy.rlwy.net:52944/railway" \
  npx prisma migrate deploy
```

> Note: `railway run npx prisma migrate deploy` failed because `railway run` executes commands locally, where the internal Railway hostname `postgres.railway.internal` is not reachable. Used `DATABASE_PUBLIC_URL` (Railway's TCP proxy) instead.

### Output

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "railway", schema "public" at "viaduct.proxy.rlwy.net:52944"

20 migrations found in prisma/migrations

No pending migrations to apply.
```

All 20 Prisma migrations were already applied. No new migrations needed.

---

## Manual Migration Applied

A manual SQL migration (`prisma/migrations/manual_referral_enhancements.sql`) was not tracked by Prisma and had not been applied to production. Applied manually:

**Changes applied:**
- Added enum values to `ReferralStatus`: `DOWNLOADED`, `REWARD_ISSUED`, `FRAUD_FLAGGED`, `CANCELLED`
- Created table: `referral_clicks`
- Created table: `referral_rewards`
- Created indexes on both tables

This was required — without it, `POST /api/v1/referrals/click` returned 500.

---

## Tables Verified (38 total)

| Table | Status |
|---|---|
| `_prisma_migrations` | EXISTS |
| `ai_insight_cache` | EXISTS |
| `ai_memory_profiles` | EXISTS |
| `ai_usage_logs` | EXISTS |
| `analytics_events` | EXISTS |
| `app_feedback` | EXISTS |
| `audit_logs` | EXISTS |
| `daily_checkins` | EXISTS |
| `daily_expenses` | EXISTS |
| `device_tokens` | EXISTS |
| `energy_profiles` | EXISTS |
| `financial_protection_metrics` | EXISTS |
| `financial_timeline_events` | EXISTS |
| `forecast_models` | EXISTS |
| `goal_entries` | EXISTS |
| `habit_profiles` | EXISTS |
| `invoices` | EXISTS |
| `jobs` | EXISTS |
| `notification_preferences` | EXISTS |
| `pay_schedules` | EXISTS |
| `paycheck_anomalies` | EXISTS |
| `paychecks` | EXISTS |
| `payday_prediction_history` | EXISTS |
| `personal_subscriptions` | EXISTS |
| `referral_clicks` | EXISTS (manual migration) |
| `referral_rewards` | EXISTS (manual migration) |
| `referrals` | EXISTS |
| `shift_streaks` | EXISTS |
| `stress_analytics` | EXISTS |
| `subscriptions` | EXISTS |
| `tax_profiles` | EXISTS |
| `time_entries` | EXISTS |
| `uploaded_files` | EXISTS |
| `user_behavior_profiles` | EXISTS |
| `user_devices` | EXISTS |
| `user_engagement_metrics` | EXISTS |
| `users` | EXISTS |
| `waitlist_entries` | EXISTS |
| `work_journal_entries` | EXISTS |

---

## Migration History (Prisma tracked — 20 migrations)

1. `20260509165307_init`
2. `20260520000000_add_password_reset_fields`
3. `20260523000000_add_emotional_intelligence_tables`
4. `20260523120000_add_missing_schema_tables`
5. `20260524000000_add_username`
6. `20260524120000_add_performance_indexes`
7. `20260524200000_add_device_tokens`
8. `20260524210000_perf_optimisations`
9. `20260524300000_fintech_architecture_v2`
10. `20260527000000_remove_lifetime_plan`
11. `20260530194025_add_onboarding_profile_fields`
12. `20260531160433_add_ai_tables`
13. `20260531200000_add_referrals`
14. `20260531220000_goal_soft_delete`
15. `20260531230000_subscription_status_free_grace`
16. `20260531240000_founding_member`
17. `20260607000000_add_consent_timestamps`
18. `20260607010000_add_scheduled_delete_at`
19. `20260608000000_add_email_verification`
20. `20260608000001_subscription_receipt_unique`
