export const SITE_URL = "https://shiftflowx.net";
export const SUPPORT_EMAIL = "support@shiftflowx.net";
export const APP_STORE_URL = "https://apps.apple.com/app/shiftflow/id6768095892";

// ─── Backend API (SINGLE SOURCE OF TRUTH) ────────────────────────────────────
// Every browser/server call to the backend goes through these, and next.config.ts
// derives the CSP connect-src from API_BASE_URL — so a host the page calls can
// never again be one the CSP blocks. Override with NEXT_PUBLIC_API_URL (origin,
// with or without a trailing "/api/v1"; both forms are normalised).
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.shiftflowx.net")
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
  free: "Free: shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days of records.",
  subscribers: "Subscribers: full history, multiple employers, report and document export, tax reports, scanning and import, and the paycheck tracker.",
  lapse:
    "If a subscription lapses nothing is deleted — older records become available again when you resubscribe.",
} as const;
export const PLAN_POLICY_TEXT = `${PLAN_POLICY.free} ${PLAN_POLICY.subscribers} ${PLAN_POLICY.lapse}`;

// Subscriber-only benefits — the tiers decided 2026-11-11 (see PLAN_POLICY). Monthly and
// Annual grant identical access; the difference is BILLING, not features.
export const PRO_FEATURES = [
  "Full history beyond 30 days",
  "More than one employer",
  "Report export (PDF and CSV)",
  "Pay statements and self-employed invoicing",
  "Tax report with GST/HST summaries",
  "Receipt and payslip scanning",
  "Shift import",
  "Paycheck tracker",
] as const;

// Billing FAQ — ONE source for the pricing page UI and its FAQPage structured data,
// so the schema can never describe questions the page doesn't show (a Google
// structured-data violation) and the two can never drift.
export const BILLING_FAQ = [
  { q: "When does the free trial start?", a: `Your ${TRIAL_DAYS}-day Pro trial begins when you start it in the app. You get full access to every Pro feature during the trial.` },
  { q: "What happens after the trial ends?", a: `After ${TRIAL_DAYS} days, your selected Pro plan (Monthly or Annual) begins unless you cancel. You can cancel any time before the trial ends and you won't be charged.` },
  { q: "How do I subscribe to Pro?", a: "Subscriptions are managed through the Apple App Store. In the ShiftFlow app, go to Settings → Upgrade to Pro and choose Monthly or Annual." },
  { q: "Can I switch between monthly and annual?", a: "Yes. Change your billing period any time in your Apple ID subscription settings. Changes take effect at your next billing date." },
  { q: "How do I cancel?", a: "Cancel any time in iPhone Settings → Apple ID → Subscriptions. You keep Pro access until the end of your current billing period. Apple does not offer partial refunds for unused time." },
  { q: "How do I restore my purchase on a new device?", a: "Open ShiftFlow → Settings → Restore Purchases. Your subscription is tied to your Apple ID and transfers automatically." },
  { q: "Do you offer refunds?", a: "Refunds are handled by Apple. Visit reportaproblem.apple.com to request one — Apple reviews each case individually." },
] as const;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Free Tools" },
  { href: "/download", label: "Download" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export const FOOTER_LINKS = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/download", label: "Download" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/eula", label: "EULA" },
    { href: "/subscription-terms", label: "Subscription Terms" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/refund", label: "Refund Policy" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/support", label: "Support" },
    { href: "/delete", label: "Delete Account" },
  ],
};

export const FEATURES = [
  {
    id: "payroll-protection",
    title: "AI Payroll Protection",
    description:
      "Automatically detect underpayments, missing overtime, and payroll errors before they cost you.",
    icon: "ShieldCheck",
    color: "#14B8A6",
    bgColor: "rgba(20,184,166,0.1)",
  },
  {
    id: "payday-forecasting",
    title: "Payday Forecasting",
    description:
      "Know exactly when your next paycheck lands. No surprises, just certainty.",
    icon: "CalendarCheck",
    color: "#D63C6B",
    bgColor: "rgba(214,60,107,0.1)",
  },
  {
    id: "burnout-prevention",
    title: "Burnout Prevention",
    description:
      "Track fatigue score, consecutive days worked, and stress indicators in real time.",
    icon: "HeartPulse",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.1)",
  },
  {
    id: "ai-assistant",
    title: "Smart AI Assistant",
    description:
      "Ask anything. Your AI advisor explains your pay, suggests shifts, and answers tax questions.",
    icon: "Bot",
    color: "#6366F1",
    bgColor: "rgba(99,102,241,0.1)",
  },
  {
    id: "tax-estimation",
    title: "Tax Estimation",
    description:
      "Auto-calculate your tax set-aside every week. Never get surprised at tax time.",
    icon: "Receipt",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.1)",
  },
  {
    id: "invoice-generator",
    title: "Invoice Generator",
    description:
      "Create professional invoices in seconds for freelance and contract work.",
    icon: "FileText",
    color: "#14B8A6",
    bgColor: "rgba(20,184,166,0.1)",
  },
  {
    id: "payslip-scanner",
    title: "Payslip Scanner",
    description:
      "Photograph your payslip. Our OCR AI extracts and verifies every number.",
    icon: "ScanLine",
    color: "#D63C6B",
    bgColor: "rgba(214,60,107,0.1)",
  },
  {
    id: "financial-health",
    title: "ShiftFlow Score",
    description:
      "Your personal ShiftFlow Score — a holistic view of your financial wellness.",
    icon: "TrendingUp",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.1)",
  },
];

export const PRICING_FEATURES = [
  "Unlimited shift & hour tracking",
  "Earnings & estimated take-home pay",
  "Payday forecasting",
  "Tax estimates (with GST/HST where applicable)",
  "Self-employed invoicing",
  "AI-powered financial insights & ShiftFlow Score",
  "ShiftFlow AI Assistant",
  "Reports & earnings history",
  "Payslip scanning",
  "Career & work insights",
];

export const FAQ_ITEMS = [
  {
    question: `How does the ${TRIAL_DAYS}-day free trial work?`,
    answer:
      `Your free trial gives you full access to every ShiftFlow Pro feature for ${TRIAL_DAYS} days. After the trial, your selected Monthly or Annual plan begins unless you cancel. We'll remind you before the trial ends.`,
  },
  {
    question: "Does my subscription renew automatically?",
    answer:
      `Yes. Both Monthly (${PRICING.monthly.shortLabel}) and Annual (${PRICING.annual.shortLabel}) plans auto-renew through the Apple App Store. You'll receive a renewal notice from Apple before each charge. You can cancel anytime — see 'Can I cancel anytime?' below.`,
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Cancel anytime through the Apple App Store: Settings → Apple ID → Subscriptions → ShiftFlow → Cancel Subscription. You keep Pro access until the end of your current billing period. No penalties, no questions asked.",
  },
  {
    question: "How do I manage my subscription?",
    answer:
      "Your subscription is fully managed through Apple. On your iPhone: Settings → [Your Name] → Subscriptions → ShiftFlow. From there you can upgrade, downgrade (Annual ↔ Monthly), or cancel. You can also tap 'Manage Subscription' inside the ShiftFlow app.",
  },
  {
    question: "How does payday forecasting work?",
    answer:
      "ShiftFlow analyzes your shift history, pay schedule, and employer patterns to predict exactly when your next paycheck will arrive and how much it will be. Our AI model improves with every paycheck you log, becoming increasingly accurate over time.",
  },
  {
    question: "Is my payroll data secure?",
    answer:
      "Data is encrypted in transit (TLS 1.3), and sensitive fields are encrypted at rest. We never sell your data. Your payroll information stays private and powers only your personal insights. We support GDPR and CCPA data-subject rights.",
  },
  {
    question: "How does payroll anomaly detection work?",
    answer:
      "ShiftFlow cross-references your logged shifts against your expected pay rate, applicable overtime rules, and historical patterns. When a discrepancy is detected — like missing break premium, short overtime calculation, or a rate error — you're alerted immediately with details on what went wrong.",
  },
  {
    question: "How do I delete my account and data?",
    answer:
      "Delete your account directly in the app: Settings → Account → Delete Account. All your data is permanently removed within 30 days. Visit shiftflowx.net/delete for step-by-step instructions.",
  },
];
