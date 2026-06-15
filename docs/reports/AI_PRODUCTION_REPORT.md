# ShiftFlow — AI/LLM Production Report

_Audited: 2026-06-09_

---

## AI Service

**Provider:** DeepSeek  
**API endpoint:** `https://api.deepseek.com/v1/chat/completions`  
**Source file:** `backend/src/services/ai.service.ts`

---

## API Key Configuration

| Setting | Status |
|---------|--------|
| `DEEPSEEK_API_KEY` | **NOT FOUND in .env** — key is missing |

The service code at line 141–142 throws hard: `throw new Error('DEEPSEEK_API_KEY env var is not set')`. There is no graceful degradation — all AI endpoints will return a 500 `AI_ERROR` until this key is set.

> Check the Resend section of `.env` shows the key was searched via `grep -i "deepseek"` and returned no output. Confirm the key is not set under a different variable name, or add it before deploying AI features.

---

## Models Used

| Model | Use Case | Notes |
|-------|----------|-------|
| `deepseek-chat` | Default — fast/affordable | Earnings, wellness, chat, import, free-tier career |
| `deepseek-reasoner` | Full reasoning — premium | Payroll audit, tax analysis, Pro-tier career forecast |

Model selection is automatic via `selectModel(feature, tier)` — no manual routing needed per request.

---

## AI Features Implemented

| Feature Key | Description | Tier Access |
|-------------|-------------|-------------|
| `earnings` | Weekly income analysis + actionable tip | Free + Pro |
| `career` | Career growth insight, employer comparison | Free (basic) / Pro (deepseek-reasoner) |
| `tax` | Quarterly tax planning estimate | Free + Pro |
| `wellness` | Burnout risk assessment + recovery tips | Free + Pro |
| `payroll` | Paycheck audit — finds underpayments/overtime gaps | Pro only |
| `chat` | Freeform Q&A assistant for shift workers | Pro only |
| `import` | Parse raw document text → structured shift schedule JSON | Pro only |

Free tier is limited to: `earnings`, `career`, `tax`, `wellness`.

---

## Rate Limiting

| Tier | Daily Limit | Monthly Limit |
|------|-------------|---------------|
| Free | 5 requests/day | 50 requests/month |
| Pro | 100 requests/day | 1,000 requests/month |

Rate limits enforced via Redis (`ai:daily:{userId}:{YYYY-MM-DD}` keys with 25h TTL).  
Monthly count tracked in the `AIUsageLog` Prisma table.

---

## Caching Strategy

- All AI responses cached in Redis by `sha256(feature + payload)` hash per user
- Default TTL: **24 hours**
- Payroll feature TTL: **1 hour** (financial data changes frequently)
- Cache key format: `ai:insight:{userId}:{feature}:{inputHash}`

---

## Usage Logging

Every AI call writes to the `AIUsageLog` table (Prisma):
- `userId`, `feature`, `model`, `promptTokens`, `completionTokens`, `costCents`

---

## Fallback Behavior If AI Fails

**There is no graceful fallback.** The current error flow:

1. If `DEEPSEEK_API_KEY` is absent → throws immediately (`Error: DEEPSEEK_API_KEY env var is not set`)
2. If DeepSeek API returns a non-200 → throws `Error: DeepSeek API error {status}: {body}`
3. If rate limit exceeded → throws `{ code: 'RATE_LIMIT', limit: N }`
4. The route catches these and returns `{ error: { code: 'AI_ERROR', message: 'Failed to generate insight. Please try again.' } }` with HTTP 500

The app does not fall back to a static/cached response when DeepSeek is unavailable. AI features will simply be unavailable during outages. This is acceptable for an MVP but consider adding a static fallback message for production resilience.

---

## Cost Estimates (DeepSeek pricing, per request)

| Model | Input Rate | Output Rate | Typical cost/call |
|-------|-----------|-------------|-------------------|
| `deepseek-chat` | $0.14/1M tokens | $0.28/1M tokens | ~$0.0001 |
| `deepseek-reasoner` | $0.55/1M tokens | $2.19/1M tokens | ~$0.001–0.005 |

At 1,000 Pro users × 100 calls/day:
- Chat-class features: ~$14/day
- Payroll/tax (reasoner): ~$50–500/day depending on payload size

Cost tracking is built in via `estimateCostCents()` and logged to `AIUsageLog`. No alerting or budget cap is currently implemented — recommend adding a daily cost threshold check.

---

## Security Notes

- API key is read from `process.env['DEEPSEEK_API_KEY']` — never hardcoded
- User data sent to DeepSeek is limited to aggregated metrics (hours, earnings amounts, burnout score) — no PII such as full name, email, or employer names in the prompt
- Chat feature sends raw user message — review for prompt injection risk at scale

---

## VERDICT: NOT_CONFIGURED

The AI service code is complete and production-quality, but `DEEPSEEK_API_KEY` is missing from `.env`. All AI endpoints will fail until the key is added. Once the key is set, the service is ready to ship — rate limiting, caching, usage logging, and model routing are all implemented.

**Action required:** Add `DEEPSEEK_API_KEY="sk-..."` to production environment variables.
