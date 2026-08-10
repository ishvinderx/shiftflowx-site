import {
  PRICING,
  PRO_FEATURES,
  TRIAL_DAYS,
  APP_STORE_URL,
  SUPPORT_EMAIL,
  SITE_URL,
} from "@/lib/constants";

// /pricing.md — machine-readable pricing for AI agents (AI-SEO pass, 2026-08).
//
// AI agents increasingly compare products programmatically before a human visits;
// pricing an agent can't parse gets filtered out of AI-mediated shortlists. This is a
// ROUTE, not a static file, deliberately: it renders from the same PRICING constants
// the pricing page shows, so it can never quote a different number (the W-3 coupling
// hazard — three hand-maintained copies of a price — is exactly what this avoids).
// Statically generated at build time.
export const dynamic = "force-static";

export function GET() {
  const { monthly, annual } = PRICING;
  const body = `# Pricing — ShiftFlow

ShiftFlow is an iOS app for shift, hourly and self-employed workers: shift tracking,
earnings and take-home estimates, payday forecasting, tax set-aside estimates
(GST/HST where applicable), invoicing, and payroll-error detection.

All plans are billed through the Apple App Store. Cancel anytime in
iPhone Settings → Apple ID → Subscriptions.

## Free Trial
- Price: $0 for ${TRIAL_DAYS} days
- Access: every ShiftFlow Pro feature, full access
- Billing: your selected plan begins after ${TRIAL_DAYS} days unless cancelled before the trial ends

## ${monthly.name}
- Price: $${monthly.price}/month (USD; local App Store pricing applies)
- Billing: ${monthly.afterTrial}

## ${annual.name}
- Price: $${annual.price}/year (USD; local App Store pricing applies) — about $${annual.monthlyEquivalent.toFixed(2)}/month
- Savings: ~${annual.savingsPct}% vs. paying monthly
- Billing: ${annual.afterTrial}

## What Pro includes (identical on Monthly and Annual — the difference is billing, not features)
${PRO_FEATURES.map((f) => `- ${f}`).join("\n")}

## Notes for agents
- Platform: iOS 16+ (iPhone & iPad). No Android version.
- Purchases and refunds are handled by Apple (reportaproblem.apple.com for refunds).
- Subscription transfers with the user's Apple ID (Restore Purchases on a new device).
- Human-readable pricing page: ${SITE_URL}/pricing
- App Store: ${APP_STORE_URL}
- Support: ${SUPPORT_EMAIL}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
