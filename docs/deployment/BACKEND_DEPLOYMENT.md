# Backend Deployment Report

_Generated: 2026-06-09_

## Status: DEPLOYED

---

## Deploy Command

```bash
cd /Users/ishvinderx/ShiftFlow/backend
RAILWAY_API_TOKEN=<token> railway up
```

## Output Summary

```
Indexing...
Uploading...
  Build Logs: https://railway.com/project/42b442ed-b83a-4a7d-9337-cec37ca72659/service/35e9569a-f83e-496d-846f-d6c43e2f5ae8?id=85f1ae09-8dce-4d0b-b9ff-0fa3cf60628c
```

- Deployment ID: `85f1ae09-8dce-4d0b-b9ff-0fa3cf60628c`
- Build method: Dockerfile (multi-stage)
- Railway project: ShiftFlow
- Environment: production
- Region: sfo (San Francisco)

---

## Railway Service Details

| Field | Value |
|---|---|
| Service Name | `shiftflow-backend` |
| Service ID | `35e9569a-f83e-496d-846f-d6c43e2f5ae8` |
| Project ID | `42b442ed-b83a-4a7d-9337-cec37ca72659` |
| Public URL | `https://shiftflow-backend-production.up.railway.app` |
| Status | Online |

---

## Health Check Results

### GET /health

```
Request:  GET https://shiftflow-backend-production.up.railway.app/health
Response: 200 OK
Body:     {"status":"ok","timestamp":"2026-06-09T21:15:00.112Z"}
```

### POST /api/v1/referrals/click

```
Request:  POST https://shiftflow-backend-production.up.railway.app/api/v1/referrals/click
Body:     {"code":"TESTCODE01"}
Response: 200 OK
Body:     {"ok":true}
```

> Note: Initial test returned 500 because `referral_clicks` table was missing (created via manual SQL migration, not tracked by Prisma). Applied `manual_referral_enhancements.sql` manually and endpoint now returns 200.

---

## Configuration Notes

- `railway.toml` has `preDeployCommand` commented out. Migrations are applied separately via `railway run npx prisma migrate deploy`.
- Health check path: `/health`, timeout: 120s
- Restart policy: ON_FAILURE, max 3 retries
