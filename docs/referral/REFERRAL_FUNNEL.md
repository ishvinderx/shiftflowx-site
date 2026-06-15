# Referral Funnel Analysis

## Funnel Stages

```
Impression
    │ 100%
    ▼
Click (referral link tapped)
    │ ~22%  (social share CTR benchmark)
    ▼
App Store Page Visit
    │ ~65%  (referral traffic converts better than organic)
    ▼
Install
    │ ~48%  (App Store page → install, referral cohort)
    ▼
Signup (account created with referral code applied)
    │ ~70%  (referral users have higher intent)
    ▼
Trial Started
    │ ~85%  (most signups start trial immediately)
    ▼
Subscribe (paid conversion)
    │ ~38%  (target: referral cohort outperforms organic ~25%)
    ▼
Reward Issued (both parties earn 1 month free)
    │ ~95%  (near-automatic once subscribe confirmed)
    ▼
Reward Redeemed (referrer uses extended Pro access)
    │ ~90%
```

---

## Conversion Rate Estimates

| Stage | Rate | Notes |
|---|---|---|
| Impression → Click | 22% | Higher for personal sends (iMessage > link-in-bio) |
| Click → Install | 31% | Referral cohort; organic is ~14% |
| Install → Signup | 70% | High intent from friend recommendation |
| Signup → Trial | 85% | Onboarding optimised for referral users |
| Trial → Subscribe | 38% | Referral cohort target; organic baseline ~25% |
| Subscribe → Reward Issued | 95% | Automated; 5% lost to fraud flags |

**Overall funnel (Impression → Reward):** ~2.1%

For every 1,000 shares, expect approximately 21 new paid subscribers and 21 reward months issued.

---

## Optimization Ideas

### Top-of-Funnel (Impression → Click)

- **Pre-populated iMessage**: Deep link that opens Messages with message body pre-filled reduces friction
- **In-app share nudge**: Show referral CTA after the user's 5th shift logged (when value is proven)
- **Payday share moment**: Trigger referral prompt after paycheck summary is viewed
- **Social proof in share text**: Include the user's earnings total ("I tracked £3,200 in earnings this month with ShiftFlow")

### Mid-Funnel (Install → Signup)

- **Referral-aware onboarding**: If referral code is detected, show personalised welcome ("Alice invited you!")
- **Code autofill**: Pre-populate referral code field so user doesn't have to type it
- **Peer incentive framing**: Emphasise "your friend Alice earns a free month when you subscribe"

### Bottom-of-Funnel (Trial → Subscribe)

- **Referral cohort paywall**: Show referral-specific paywall with "Your friend is waiting for their free month" copy
- **Email drip**: Day 7 trial email specifically for referral users reminding them of the mutual reward
- **Urgency**: "Alice's reward expires if you don't subscribe in 7 days" (only if technically implementable within 30 days of referral)

### Retention (Post-Reward)

- Referral users who earn rewards churn 35% less than average (hypothesis — validate with cohort analysis)
- Encourage referred users to become referrers — show referral CTA after first reward receipt notification

---

## Channel Performance (Hypothesis)

| Channel | Expected Click Rate | Expected Subscribe Rate |
|---|---|---|
| iMessage direct | 38% | 42% |
| WhatsApp group | 28% | 35% |
| Twitter/X link | 8% | 18% |
| TikTok bio link | 6% | 15% |
| Reddit post | 4% | 12% |
| Copy & paste code | 15% | 32% |

Direct personal channels significantly outperform broadcast channels — optimise the share flow for iMessage and WhatsApp.
