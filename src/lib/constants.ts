// ─── Site address (SINGLE SOURCE OF TRUTH) ───────────────────────────────────
// Canonical origin has no "www". Every URL, email address and domain shown in
// page text, metadata, JSON-LD, sitemap and robots comes from here.
export const SITE_HOST = "hoursflow.app";
export const SITE_URL = `https://${SITE_HOST}`;
export const SUPPORT_EMAIL = `support@${SITE_HOST}`;
export const INFO_EMAIL = `info@${SITE_HOST}`;
export const PRIVACY_EMAIL = `privacy@${SITE_HOST}`;
// ─── Brand (SINGLE SOURCE OF TRUTH) ──────────────────────────────────────────
// Product name, paid-tier name, operator and tagline. Metadata, JSON-LD, the OG image
// and shared components read these; src/lib/brand.test.ts blocks the old name returning.
export const BRAND = {
  name: "HoursFlow",
  proName: "HoursFlow Pro",
  legalEntity: "Flowmatix Creative Inc.",
  tagline: "Make every hour count.",
} as const;

// The new HoursFlow app has no App Store listing yet. APP_STORE_URL is the ONE constant every
// download button reads. Set NEXT_PUBLIC_APP_STORE_URL once the listing exists; until then it
// falls back to this PLACEHOLDER, which src/lib/release.test.ts refuses in a release build
// (RELEASE=1 with NODE_ENV=production and no env override). public/llms.txt is static: update
// its "App Store:" line to the same URL at release (brand.test.ts keeps them equal).
export const APP_STORE_URL_PLACEHOLDER = "https://apps.apple.com/app/hoursflow/id0000000000"; // PLACEHOLDER: replace before release

export function resolveAppStoreUrl(env: Record<string, string | undefined> = process.env): string {
  return env.NEXT_PUBLIC_APP_STORE_URL?.trim() || APP_STORE_URL_PLACEHOLDER;
}

// NOTE: read via a literal `process.env.NEXT_PUBLIC_APP_STORE_URL` so Next inlines it in client bundles.
export const APP_STORE_URL = resolveAppStoreUrl({ NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL });

// ─── Backend API (SINGLE SOURCE OF TRUTH) ────────────────────────────────────
// Every browser/server call to the backend goes through these, and next.config.ts
// derives the CSP connect-src from API_BASE_URL — so a host the page calls can
// never again be one the CSP blocks. Override with NEXT_PUBLIC_API_URL (origin,
// with or without a trailing "/api/v1"; both forms are normalised).
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || `https://api.${SITE_HOST}`)
  .replace(/\/+$/, "")
  .replace(/\/api\/v1$/, "");
export const API_V1_URL = `${API_BASE_URL}/api/v1`;

// ─── App Store campaign attribution ──────────────────────────────────────────
// Apple only records campaign (`ct`) attribution when the link ALSO carries the
// provider token (`pt`) from App Store Connect → App Analytics → Acquisition →
// campaign link generator. Until APP_STORE_PT is filled in, ct= rides along
// harmlessly but ASC records NOTHING — attribution is honestly UNAVAILABLE.
// OPERATOR: paste the numeric pt value here; every calculator CTA lights up at once.
export const APP_STORE_PT = ""; // e.g. "126538119" — from ASC campaign link generator

export function appStoreCampaignUrl(ct: string): string {
  const params = new URLSearchParams();
  if (APP_STORE_PT) params.set("pt", APP_STORE_PT);
  params.set("ct", ct);
  return `${APP_STORE_URL}?${params.toString()}`;
}

// ─── Canonical pricing (SINGLE SOURCE OF TRUTH) ───────────────────────────────
// Every surface (pricing page, homepage, FAQ, structured data, legal price lines,
// /pricing.md) must read from here — never hardcode a price, the trial length or a
// savings figure independently. To change a price, change ONLY the two numbers
// below; every label and the savings maths are derived from them.
// (public/llms.txt is a static file and cannot import this — src/lib/pricing.test.ts
// fails if it drifts.) Reconcile against App Store Connect before publishing.
export const TRIAL_DAYS = 7;

const MONTHLY_PRICE = 6.49;
const ANNUAL_PRICE = 64.99;

const usd = (n: number) => `$${n.toFixed(2)}`;
const TWELVE_MONTHS = MONTHLY_PRICE * 12; // 77.88

export const PRICING = {
  trialDays: TRIAL_DAYS,
  currency: "USD",
  monthly: {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: MONTHLY_PRICE,
    priceLabel: usd(MONTHLY_PRICE),
    cadence: "/month",
    perLabel: `${usd(MONTHLY_PRICE)}/month`,
    shortLabel: `${usd(MONTHLY_PRICE)}/mo`,
    then: `Then ${usd(MONTHLY_PRICE)}/month. Cancel anytime.`,
    afterTrial: `${TRIAL_DAYS} days free, then ${usd(MONTHLY_PRICE)}/month.`,
  },
  annual: {
    id: "pro-annual",
    name: "Pro Annual",
    price: ANNUAL_PRICE,
    priceLabel: usd(ANNUAL_PRICE),
    cadence: "/year",
    perLabel: `${usd(ANNUAL_PRICE)}/year`,
    shortLabel: `${usd(ANNUAL_PRICE)}/yr`,
    // 64.99 / 12 = 5.4158 → $5.42
    monthlyEquivalent: Math.round((ANNUAL_PRICE / 12) * 100) / 100,
    monthlyEquivalentLabel: usd(ANNUAL_PRICE / 12),
    // (77.88 − 64.99) / 77.88 = 16.55% → 17
    savingsPct: Math.round(((TWELVE_MONTHS - ANNUAL_PRICE) / TWELVE_MONTHS) * 100),
    // 77.88 − 64.99 = 12.89
    savingsAmount: Math.round((TWELVE_MONTHS - ANNUAL_PRICE) * 100) / 100,
    then: `Then ${usd(ANNUAL_PRICE)}/year. Cancel anytime.`,
    afterTrial: `${TRIAL_DAYS} days free, then ${usd(ANNUAL_PRICE)}/year.`,
  },
} as const;

// ─── Free vs Pro (SINGLE SOURCE OF TRUTH) ────────────────────────────────────
// The record-history policy, word for word. Render these strings; do not paraphrase.
export const PLAN_POLICY = {
  free: "Free: one employer, the last 30 days of history, logging shifts, earnings, payday, budget and bills, the paycheque check answer, and import from a CSV file.",
  subscribers: "Pro: full history, more than one employer, exports and pay statements, invoices with sales tax, the tax report, receipt and payslip scanning, shift import from a photo, and the detail behind a paycheque check.",
  lapse:
    "If a subscription lapses nothing is deleted — older records become available again when you resubscribe.",
} as const;
export const PLAN_POLICY_TEXT = `${PLAN_POLICY.free} ${PLAN_POLICY.subscribers} ${PLAN_POLICY.lapse}`;

// Subscriber-only benefits — the tiers decided 2026-11-11 (see PLAN_POLICY). Monthly and
// Annual grant identical access; the difference is BILLING, not features.
export const PRO_FEATURES = [
  "Full history beyond 30 days",
  "More than one employer",
  "Exports and pay statements",
  "Invoices with sales tax",
  "Tax report",
  "Receipt and payslip scanning",
  "Shift import from a photo",
  "Paycheque check detail",
] as const;

// Features that are in BOTH tiers. Rendered with PRO_FEATURES in the Free vs Pro table.
export const FREE_FEATURES = [
  "Logging shifts for one employer",
  "Earnings and payday",
  "Budget and bills",
  "Paycheque check: the answer",
  "Import from a CSV file",
] as const;

// Billing FAQ — ONE source for the pricing page UI and its FAQPage structured data,
// so the schema can never describe questions the page doesn't show (a Google
// structured-data violation) and the two can never drift.
export const BILLING_FAQ = [
  { q: "When does the free trial start?", a: `Your ${TRIAL_DAYS}-day Pro trial begins when you start it in the app. You get full access to every Pro feature during the trial.` },
  { q: "What happens after the trial ends?", a: `After ${TRIAL_DAYS} days, your selected Pro plan (Monthly or Annual) begins unless you cancel. You can cancel any time before the trial ends and you won't be charged.` },
  { q: "How do I subscribe to Pro?", a: `Subscriptions are managed through the Apple App Store. In the ${BRAND.name} app, go to Settings → Upgrade to Pro and choose Monthly or Annual.` },
  { q: "Can I switch between monthly and annual?", a: "Yes. Change your billing period any time in your Apple ID subscription settings. Changes take effect at your next billing date." },
  { q: "How do I cancel?", a: "Cancel any time in iPhone Settings → Apple ID → Subscriptions. You keep Pro access until the end of your current billing period. Apple does not offer partial refunds for unused time." },
  { q: "How do I restore my purchase on a new device?", a: `Open ${BRAND.name} → Settings → Restore Purchases. Your subscription is tied to your Apple ID and transfers automatically.` },
  { q: "Do you offer refunds?", a: "Refunds are handled by Apple. Visit reportaproblem.apple.com to request one — Apple reviews each case individually." },
] as const;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export const FOOTER_LINKS = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/download", label: "Download" },
  ],
  Tools: [
    { href: "/tools", label: "Calculators" },
    { href: "/blog", label: "Blog" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/support", label: "Support" },
    { href: "/referral", label: "Referral" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/subscription-terms", label: "Subscription terms" },
    { href: "/security", label: "Security" },
    { href: "/cookie-policy", label: "Cookie policy" },
    { href: "/delete", label: "Delete account" },
  ],
};

export const FAQ_ITEMS = [
  {
    question: `How does the ${TRIAL_DAYS}-day free trial work?`,
    answer:
      `Your free trial gives you full access to every ${BRAND.proName} feature for ${TRIAL_DAYS} days. After the trial, your selected Monthly or Annual plan begins unless you cancel. We'll remind you before the trial ends.`,
  },
  {
    question: "Does my subscription renew automatically?",
    answer:
      `Yes. Both Monthly (${PRICING.monthly.shortLabel}) and Annual (${PRICING.annual.shortLabel}) plans auto-renew through the Apple App Store. You'll receive a renewal notice from Apple before each charge. You can cancel anytime — see 'Can I cancel anytime?' below.`,
  },
  {
    question: "Can I cancel anytime?",
    answer:
      `Absolutely. Cancel anytime through the Apple App Store: Settings → Apple ID → Subscriptions → ${BRAND.name} → Cancel Subscription. You keep Pro access until the end of your current billing period. No penalties, no questions asked.`,
  },
  {
    question: "How do I manage my subscription?",
    answer:
      `Your subscription is fully managed through Apple. On your iPhone: Settings → [Your Name] → Subscriptions → ${BRAND.name}. From there you can upgrade, downgrade (Annual ↔ Monthly), or cancel. You can also tap 'Manage Subscription' inside the ${BRAND.name} app.`,
  },
  {
    question: "How does payday forecasting work?",
    answer:
      `${BRAND.name} uses your pay schedule and the shifts you log to show when your next payday is due and an estimate of what you have earned for the period. Estimates are not a guarantee of what your employer will pay.`,
  },
  {
    question: "Is my payroll data secure?",
    answer:
      "Data is encrypted in transit (TLS 1.3), and sensitive fields are encrypted at rest. We never sell your data. Your payroll information stays private. You can export your data and delete your account from the app.",
  },
  {
    question: "How does the paycheque check work?",
    answer:
      "Enter the gross pay on your payslip and the app shows whether it matches your logged hours, before tax. The answer is free. Pro adds the detail behind it: the shifts and overtime behind the figure, and your past checks.",
  },
  {
    question: "Moving from another app: can I bring my shifts and expenses?",
    answer:
      `Yes, and importing is free. Export your shifts and expenses as a CSV file from the app you use now, create a ${BRAND.name} account, then choose Import from a file and pick the CSV.`,
  },
  {
    question: "How do I delete my account and data?",
    answer:
      `Delete your account directly in the app: Settings → Account → Delete Account. All your data is permanently removed within 30 days. Visit ${SITE_HOST}/delete for step-by-step instructions.`,
  },
];
