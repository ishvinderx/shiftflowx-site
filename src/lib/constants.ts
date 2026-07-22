export const SITE_URL = "https://shiftflowx.net";
export const SUPPORT_EMAIL = "support@shiftflowx.net";
export const APP_STORE_URL = "https://apps.apple.com/app/shiftflow/id6768095892";

// ─── Canonical pricing (SINGLE SOURCE OF TRUTH) ───────────────────────────────
// Every surface (pricing page, homepage, FAQ, structured data, CTAs) must read
// from here — never hardcode $9.99 / $99 / 7 days / 17% independently.
// Reconcile against App Store Connect subscription products before publishing.
export const TRIAL_DAYS = 7;

export const PRICING = {
  trialDays: TRIAL_DAYS,
  monthly: {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: 9.99,
    priceLabel: "$9.99",
    cadence: "/month",
    perLabel: "$9.99/month",
    then: "Then $9.99/month. Cancel anytime.",
    afterTrial: `${TRIAL_DAYS} days free, then $9.99/month.`,
  },
  annual: {
    id: "pro-annual",
    name: "Pro Annual",
    price: 99,
    priceLabel: "$99",
    cadence: "/year",
    perLabel: "$99/year",
    monthlyEquivalent: 8.25, // 99 / 12
    savingsPct: 17,          // (119.88 - 99) / 119.88 ≈ 17.4%
    savingsAmount: 20.88,    // 9.99*12 - 99
    then: "Then $99/year. Cancel anytime.",
    afterTrial: `${TRIAL_DAYS} days free, then $99/year.`,
  },
} as const;

// Shared Pro benefits — reconciled against the shipping app (2026-07). Monthly and
// Annual grant identical access; the difference is BILLING, not features.
export const PRO_FEATURES = [
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
] as const;

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
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
    title: "Financial Health Score",
    description:
      "Your personal ShiftFlow Score — a holistic view of your financial wellness.",
    icon: "TrendingUp",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.1)",
  },
];

export const PRICING_FEATURES = [
  "Unlimited shift logging",
  "AI Payroll Protection",
  "Payday Forecasting",
  "Burnout Analytics",
  "Smart Recommendations",
  "Tax Estimation",
  "Invoice Generator",
  "Payslip Scanner (OCR)",
  "Financial Health Score",
  "AI Assistant",
  "Career Intelligence",
  "Work Journal",
];

export const FAQ_ITEMS = [
  {
    question: "How does the 30-day free trial work?",
    answer:
      "Your free trial gives you full access to every ShiftFlow Plus feature for 30 days — no credit card required. After 30 days, you can choose a Monthly or Annual plan to continue, or stay on the limited free tier. We'll remind you before the trial ends.",
  },
  {
    question: "Does my subscription renew automatically?",
    answer:
      "Yes. Both Monthly ($9.99/mo) and Annual ($99/yr) plans auto-renew through the Apple App Store. You'll receive a renewal notice from Apple before each charge. You can cancel anytime — see 'Can I cancel anytime?' below.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Cancel anytime through the Apple App Store: Settings → Apple ID → Subscriptions → ShiftFlow → Cancel Subscription. You keep Plus access until the end of your current billing period. No penalties, no questions asked.",
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
      "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell your data. Your payroll information stays private and is only used to power your personal insights. We're fully GDPR and CCPA compliant.",
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
