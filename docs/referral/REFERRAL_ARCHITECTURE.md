# Referral System Architecture

## Database Models (Prisma)

```prisma
model ReferralCode {
  id        String   @id @default(cuid())
  userId    String   @unique
  code      String   @unique
  url       String
  clicks    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  referrals Referral[]
}

model Referral {
  id             String         @id @default(cuid())
  referralCodeId String
  refereeId      String?        @unique   // null until signup
  refereeEmail   String?
  status         ReferralStatus @default(PENDING)
  rewardType     String?
  rewardIssuedAt DateTime?
  fraudScore     Float          @default(0)
  ipAddress      String?
  userAgent      String?
  createdAt      DateTime       @default(now())
  convertedAt    DateTime?
  referralCode   ReferralCode   @relation(fields: [referralCodeId], references: [id])
  referee        User?          @relation(fields: [refereeId], references: [id])
}

enum ReferralStatus {
  PENDING
  SIGNED_UP
  CONVERTED
  REWARD_ISSUED
  FRAUD_FLAGGED
  CANCELLED
}
```

---

## API Routes

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/referrals/my` | JWT | Get referrer's code, URL, and stats |
| POST | `/api/v1/referrals/track-share` | JWT | Log share channel (analytics) |
| POST | `/api/v1/referrals/click` | None | Record a link click (from website) |
| POST | `/api/v1/referrals/apply` | JWT | Apply a referral code at signup |
| POST | `/api/v1/referrals/convert` | Internal | Called by subscription webhook |
| GET | `/api/v1/admin/referrals` | JWT + Admin | List all referrals (paginated) |
| POST | `/api/v1/admin/referrals/:id/flag` | JWT + Admin | Flag as fraud |
| POST | `/api/v1/admin/referrals/:id/approve` | JWT + Admin | Manually approve conversion |

---

## Attribution Flow

```
Website landing page
  ↓  User visits shiftflowx.net/r/ALICE42
  ↓  Backend records click: POST /api/v1/referrals/click { code: "ALICE42", ip, ua }
  ↓  Website stores in localStorage: { referralCode: "ALICE42", clickedAt: ISO }

App Store Install
  ↓  User downloads ShiftFlow iOS app
  ↓  (Optional) SKAdNetwork / Apple Search Ads attribution

iOS App — Registration
  ↓  App reads localStorage via WKWebView cookie bridge OR user enters code manually
  ↓  RegisterView submits: POST /api/v1/auth/register { ..., referralCode: "ALICE42" }
  ↓  Backend creates Referral record: status=SIGNED_UP

iOS App — Subscription
  ↓  User starts trial or subscribes
  ↓  App Store sends receipt to backend: POST /api/v1/subscription/sync
  ↓  Backend verifies receipt with Apple
  ↓  If referee's subscription is confirmed: POST /api/v1/referrals/convert (internal)
  ↓  Referral status → CONVERTED
  ↓  Reward issued to referrer: free month credited
  ↓  Referral status → REWARD_ISSUED
```

---

## Reward Issuance Flow

```
referral.convert() called
  ↓  Look up Referral by refereeId
  ↓  Check: status == SIGNED_UP (not already converted, not fraud)
  ↓  Check: referee has active paid subscription (not trial abuse)
  ↓  Check: referrer != referee (no self-referral)
  ↓  Issue reward: extend referrer's subscription by 30 days
     → Update user.proExpiresAt += 30 days
     → Send push notification to referrer
     → Send email to referrer
  ↓  Update Referral: status=REWARD_ISSUED, rewardType="1 Month Free", rewardIssuedAt=now
  ↓  PostHog event: reward_issued { referrerId, refereeId, code }
```

---

## Website → iOS Attribution (localStorage Bridge)

When a user visits `shiftflowx.net/r/:code`:

1. Next.js route handler calls `POST /api/v1/referrals/click`
2. Client-side JS stores: `localStorage.setItem("sf_referral", JSON.stringify({ code, ts }))`
3. On iOS, after App Store install, the app's onboarding webview loads `shiftflowx.net/claim`
4. The page reads localStorage and calls back into Swift via `WKScriptMessageHandler`
5. Swift stores the code in Keychain and passes it to the registration API

Fallback: manual code entry field shown during onboarding if localStorage is unavailable.
