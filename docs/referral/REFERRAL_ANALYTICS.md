# Referral Analytics — PostHog Events Schema

## Event Catalogue

### `referral_link_viewed`
Fired when a referral landing page is loaded (`/r/:code`).

```json
{
  "event": "referral_link_viewed",
  "properties": {
    "referral_code": "ALICE42",
    "referrer_id": "user_abc123",
    "source": "website",
    "utm_source": "imessage",
    "utm_medium": "referral",
    "user_agent": "...",
    "ip_country": "GB"
  }
}
```

---

### `referral_link_clicked`
Fired when the "Download" CTA on the referral landing page is tapped.

```json
{
  "event": "referral_link_clicked",
  "properties": {
    "referral_code": "ALICE42",
    "cta_location": "hero_button",
    "device_type": "mobile"
  }
}
```

---

### `referral_signup`
Fired on the backend when a new user registers with a referral code.

```json
{
  "event": "referral_signup",
  "distinct_id": "user_xyz789",
  "properties": {
    "referral_code": "ALICE42",
    "referrer_id": "user_abc123",
    "signup_method": "email",
    "time_from_click_seconds": 3820
  }
}
```

---

### `referral_applied`
Fired when the referral code is successfully linked to the new account.

```json
{
  "event": "referral_applied",
  "distinct_id": "user_xyz789",
  "properties": {
    "referral_code": "ALICE42",
    "applied_at": "2026-04-12T10:33:00Z"
  }
}
```

---

### `referral_converted`
Fired when the referee subscribes (trial or paid).

```json
{
  "event": "referral_converted",
  "distinct_id": "user_xyz789",
  "properties": {
    "referral_code": "ALICE42",
    "referrer_id": "user_abc123",
    "plan": "monthly",
    "days_from_signup": 8
  }
}
```

---

### `reward_issued`
Fired when the referrer's free month is credited.

```json
{
  "event": "reward_issued",
  "distinct_id": "user_abc123",
  "properties": {
    "reward_type": "1_month_pro",
    "triggered_by_referee_id": "user_xyz789",
    "new_pro_expires_at": "2026-05-20T00:00:00Z",
    "total_rewards_earned": 3
  }
}
```

---

### `reward_redeemed`
Fired when the referrer uses a Pro feature that was unlocked by the reward (i.e. they are within the reward period and actively using Pro).

```json
{
  "event": "reward_redeemed",
  "distinct_id": "user_abc123",
  "properties": {
    "feature_used": "payslip_ocr",
    "days_remaining_in_reward": 22
  }
}
```

---

## PostHog Dashboard KPIs

| KPI | Formula | Target |
|---|---|---|
| Referral Conversion Rate | `referral_converted / referral_signup` | ≥35% |
| Share-to-Signup Rate | `referral_signup / referral_link_clicked` | ≥20% |
| Referral CAC | Revenue per subscriber / referral conversion rate | < £8 |
| Avg Referrals per Referrer | `COUNT(referral_signup) / DISTINCT(referrer_id)` | ≥1.5 |
| Reward Issue Lag | `avg(reward_issued.ts - referral_converted.ts)` | < 5 min |
| Fraud Flag Rate | `FRAUD_FLAGGED / total referrals` | < 5% |
| Top Referral Channel | Breakdown by `utm_source` | — |
| K-Factor | `avg referrals per user × conversion rate` | ≥0.4 |

---

## Cohort Analysis

In PostHog, a "Referral Cohort" is created from users who entered via a referral code. Compare:
- D30 retention vs organic
- Trial → Paid conversion rate vs organic
- LTV at 90 days vs organic

Hypothesis: referral users retain 20%+ better due to social accountability.

---

## Funnel in PostHog

```
referral_link_viewed
  → referral_link_clicked
    → referral_signup
      → referral_applied
        → referral_converted
          → reward_issued
```

Set conversion window to 30 days. Monitor drop-off at each step.
