# Referral System Production Report
**Date:** 2026-06-09  
**Backend:** https://shiftflow-backend-production.up.railway.app  
**Tester:** Automated QA Audit (End-to-End)

---

## Test Flow

Two test accounts were created (`audit-main-*` and `audit-referee-*`), and the full referral lifecycle was exercised.

---

## Results

| Step | Check | Status | HTTP Code | Details |
|------|-------|--------|-----------|---------|
| 1 | Referral code generation (`GET /api/v1/referrals/my`) | **PASS** | 200 | Code `AUDIT564E37` auto-generated; URL `https://shiftflowx.net/ref/AUDIT564E37` |
| 2 | Click tracking (`POST /api/v1/referrals/click`) | **PASS** | 200 | `{"ok":true}` — click recorded |
| 3 | Referee registration | **PASS** | 201 | Second user created successfully with JWT |
| 4 | Referral apply (`POST /api/v1/referrals/apply`) | **PASS** | 200 | `{"ok":true,"referrerName":"Audit Main"}` — referrer name returned |
| 5 | Stats update (re-check `GET /api/v1/referrals/my`) | **PASS** | 200 | `clicks: 1`, `signups: 1` both incremented correctly |

---

## Full Referral Stats After Test

```json
{
  "code": "AUDIT564E37",
  "url": "https://shiftflowx.net/ref/AUDIT564E37",
  "stats": {
    "clicks": 1,
    "signups": 1,
    "converted": 0,
    "rewardsEarned": 0
  }
}
```

- `converted` and `rewardsEarned` remain 0 — expected, as conversion requires a paid subscription event (not triggered in this test).

---

## Website Proxy Route

The Next.js website has a proxy route at `src/app/api/ref/click/route.ts` that:
- Applies per-IP rate limiting (1 click per code per IP per hour, in-memory)
- Forwards the click to the backend with `BACKEND_URL` + `INTERNAL_API_SECRET`
- Silently succeeds on backend errors (never exposes errors to client)

The local dev server was not running during this audit (expected for a production audit). The route file exists and is correctly implemented.

---

## Overall: **PASS**

All 5 steps of the referral lifecycle pass end-to-end. Click tracking, referral application, and stats updates all work correctly in production.
