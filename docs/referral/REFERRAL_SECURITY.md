# Referral System Security

## Overview

The referral system is a high-value target for abuse — fraudulent conversions result in free Pro months being issued without corresponding revenue. Multiple layers of defence are applied.

---

## Layer 1: Server-Side Validation

Every conversion request is validated before a reward is issued:

```ts
async function validateConversion(referralId: string, refereeId: string): Promise<void> {
  const referral = await db.referral.findUniqueOrThrow({ where: { id: referralId } });

  // Status guard
  if (referral.status !== "SIGNED_UP") throw new Error("ALREADY_PROCESSED");

  // Self-referral prevention
  if (referral.referralCode.userId === refereeId) throw new Error("SELF_REFERRAL");

  // Fraud score gate
  if (referral.fraudScore >= 0.7) throw new Error("FRAUD_SUSPECTED");

  // Require active paid subscription (not trial)
  const sub = await getSubscription(refereeId);
  if (sub.status !== "ACTIVE") throw new Error("NO_ACTIVE_SUBSCRIPTION");
}
```

---

## Layer 2: JWT Authentication

- All referral endpoints that modify state require a valid JWT
- Tokens are short-lived (15 min access tokens, 7-day refresh tokens stored in Keychain)
- The `apply` endpoint additionally verifies the referral code belongs to a different user

---

## Layer 3: Self-Referral Prevention

Checks applied at multiple points:
1. Registration: `if (referralCode.userId === registering.userId) reject`
2. Conversion: `if (referral.referralCode.userId === refereeId) reject`
3. Same email domain check (catches `user+alias@company.com` tricks)
4. Same IP address within 24 hours triggers a raised fraud score (+0.4)

---

## Layer 4: Rate Limiting

Applied via Redis + `rate-limiter-flexible`:

| Endpoint | Limit | Window |
|---|---|---|
| `POST /referrals/click` | 10 clicks | per IP per hour |
| `POST /referrals/apply` | 5 attempts | per user per day |
| `POST /referrals/convert` | 3 rewards | per referrer per month (admin override) |

---

## Layer 5: Internal API Secret

The `/api/v1/referrals/convert` endpoint is internal-only (called by the subscription webhook handler, never by clients):

```ts
app.post("/api/v1/referrals/convert", (req, res, next) => {
  const secret = req.headers["x-internal-secret"];
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
});
```

`INTERNAL_API_SECRET` is a 64-byte random hex string stored only in Railway environment variables, never in source code or client bundles.

---

## Layer 6: Fraud Detection

A fraud score (0–1) is computed for each referral at click and signup time:

| Signal | Score Increment |
|---|---|
| Referrer and referee share IP | +0.40 |
| Click-to-signup < 60 seconds | +0.25 |
| Referee email is disposable domain | +0.30 |
| Same device fingerprint | +0.35 |
| Multiple referrals to same IP block | +0.20 |

Score ≥ 0.7 → automatic `FRAUD_FLAGGED` status, reward blocked, admin alerted.

---

## Layer 7: Apple Receipt Verification

When a subscription sync arrives:
1. Receipt is sent to `https://buy.itunes.apple.com/verifyReceipt` (production)
2. If status 21007, retried against sandbox endpoint
3. `latest_receipt_info` is checked for the expected product ID
4. `expires_date_ms` is compared to `Date.now()` to confirm active subscription
5. `original_transaction_id` is stored to prevent duplicate reward issuance

If receipt verification fails, conversion is blocked and logged.

---

## Monitoring & Alerts

- Fraud flag rate > 10% in any hour → PagerDuty alert
- More than 5 rewards issued to a single referrer in 30 days → manual review queue
- All admin actions (flag, approve) are audit-logged with actor, timestamp, and IP
