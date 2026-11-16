// What HoursFlow collects and who processes it. ONE source for the privacy policy and the data
// policy so the two can never disagree. Every row was checked against the code (see
// docs/04-compliance-check.md in the parent folder). Do not add a row that the code does not support.

export const DATA_RETENTION_GRACE_DAYS = 30;
export const BACKUP_RETENTION_DAYS = 30;

export interface DataCategory {
  id: string;
  category: string;
  examples: string;
  source: string;
  purpose: string;
  legalBasis: string;
  retention: string;
}

export const DATA_CATEGORIES: DataCategory[] = [
  {
    id: "account",
    category: "Account and sign-in",
    examples:
      "Name, email address, username, password (kept only as a one-way hash), Apple or Google account identifier, and the optional profile fields phone number, mailing address, date of birth and job title.",
    source: "You, or Apple or Google when you use their sign-in.",
    purpose: "Create and secure your account, sign you in, send service emails, give you support.",
    legalBasis: "Contract (running your account).",
    retention: `While your account is open. After you delete it, personal fields are erased once the ${DATA_RETENTION_GRACE_DAYS}-day grace period ends.`,
  },
  {
    id: "work-records",
    category: "Work and pay records",
    examples:
      "Employers and pay rates, shifts and notes, pay schedule, paycheques you enter, budget and bills, goals, tax settings, work journal.",
    source: "You.",
    purpose: "Show your hours, pay, payday, budget and estimates. This is the core of the app.",
    legalBasis: "Contract.",
    retention: `While your account is open. Deleted when the ${DATA_RETENTION_GRACE_DAYS}-day grace period after account deletion ends. On Free, records older than 30 days are hidden, not deleted.`,
  },
  {
    id: "expenses",
    category: "Expenses, receipts and invoices",
    examples:
      "Expense entries, receipt photos or PDFs, text read from a receipt on your device, invoices with client names and email addresses, sales tax amounts.",
    source: "You.",
    purpose: "Record expenses, read amounts from receipts, produce invoices and the tax report.",
    legalBasis: "Contract.",
    retention: `While your account is open. Files and records are deleted when the ${DATA_RETENTION_GRACE_DAYS}-day grace period after account deletion ends.`,
  },
  {
    id: "subscription",
    category: "Subscription status",
    examples: "Which plan you have, trial and renewal dates, and the RevenueCat customer identifier. We never receive your card number or Apple payment details.",
    source: "Apple, through RevenueCat.",
    purpose: "Unlock Pro, show your plan, restore purchases, keep financial records.",
    legalBasis: "Contract; legal obligation (accounting records).",
    retention:
      "Your RevenueCat customer record is deleted when your account is purged (we ask RevenueCat to do this; it can fail, and we do not retry it automatically). Our own purchase-event records are kept for accounting and have no automatic deletion date today.",
  },
  {
    id: "support",
    category: "Support messages and feedback",
    examples: "What you write to us by email, the website support form or in-app feedback, and your account email.",
    source: "You.",
    purpose: "Answer you, fix problems, keep a record of what we told you.",
    legalBasis: "Contract; legitimate interests (handling support properly).",
    retention:
      "In-app feedback is deleted when your account is purged. Support emails stay in our mailbox until we delete them by hand; we have no automatic deletion date today.",
  },
  {
    id: "analytics",
    category: "Product analytics",
    examples:
      "Your account identifier, plan, number of shifts logged, events such as onboarding steps, paywall views and trial start, and the app and phone model. No pay rates, earnings or other money amounts.",
    source: "The app and our servers.",
    purpose: "Understand which features work and where people get stuck.",
    legalBasis: "Legitimate interests (improving the product).",
    retention:
      "Kept in PostHog until we delete it. Deleting your account does not delete it automatically; we delete your PostHog profile by hand, and we aim to do so within 30 days of your account being purged.",
  },
  {
    id: "diagnostics",
    category: "Crash and performance data",
    examples: "Crash reports, error details, response times, app version, your account identifier. We turn off Sentry's default personal-data collection.",
    source: "The app and our servers.",
    purpose: "Find and fix bugs and keep the service running.",
    legalBasis: "Legitimate interests (security and reliability).",
    retention: "Kept by Sentry for the period set in our Sentry plan. We have not set a shorter limit.",
  },
  {
    id: "technical",
    category: "Security and technical records",
    examples:
      "A salted hash of your IP address, browser or app identifier (user agent) and device identifier in security logs; our hosting providers' ordinary request logs.",
    source: "Your device, automatically.",
    purpose: "Detect abuse, protect accounts, investigate incidents.",
    legalBasis: "Legitimate interests (security).",
    retention: `Security log rows have the IP hash, user agent, device identifier and detail fields cleared when your account is purged; the bare row (account ID, action, date) stays and has no automatic deletion date today. Provider request logs follow each provider's own schedule.`,
  },
  {
    id: "email",
    category: "Email delivery",
    examples: "Your email address, the message, and whether it was delivered.",
    source: "Our servers.",
    purpose: "Send verification, password reset and account emails, and the optional product emails described below.",
    legalBasis: "Contract (account emails); consent or implied consent as CASL allows, and legitimate interests (product emails, with an unsubscribe link).",
    retention: "Resend keeps delivery logs under its own schedule.",
  },
  {
    id: "referral",
    category: "Referral links",
    examples: "Your referral code. For a visit to a referral link: the visitor's IP address, browser identifier and country.",
    source: "You (code); the visitor (clicks).",
    purpose: "Count referral visits and give referral rewards.",
    legalBasis: "Legitimate interests.",
    retention: "Click records have no automatic deletion date today.",
  },
];

export interface Provider {
  id: string;
  name: string;
  role: string;
  purpose: string;
  data: string;
  region: string;
}

const US_AND_OTHERS = "United States and other countries where the provider operates.";

export const PROVIDERS: Provider[] = [
  {
    id: "railway",
    name: "Railway",
    role: "Hosting and database",
    purpose: "Runs our servers and stores the database.",
    data: "Everything in your account except files (some fields encrypted, see Security).",
    region: US_AND_OTHERS,
  },
  {
    id: "cloudflare-r2",
    name: "Cloudflare (R2 storage)",
    role: "File storage",
    purpose: "Stores receipt images, avatars and invoice or paycheque PDFs, each under your own private folder.",
    data: "Files you add or we generate for you.",
    region: US_AND_OTHERS,
  },
  {
    id: "aws-s3",
    name: "Amazon Web Services (S3)",
    role: "Database backups",
    purpose: `Stores nightly database backups, set to expire after ${BACKUP_RETENTION_DAYS} days.`,
    data: "A full copy of the database, including everything above.",
    region: "United States (us-east-1 is the documented default; the owner confirms the bucket region).",
  },
  {
    id: "resend",
    name: "Resend",
    role: "Email",
    purpose: "Sends verification, password reset, account and product emails.",
    data: "Your email address, name, and the content of each email.",
    region: US_AND_OTHERS,
  },
  {
    id: "revenuecat",
    name: "RevenueCat",
    role: "Subscription status",
    purpose: "Checks and reports your Apple subscription so we can unlock Pro.",
    data: "Your account identifier and purchase and entitlement records.",
    region: US_AND_OTHERS,
  },
  {
    id: "posthog",
    name: "PostHog",
    role: "Product analytics",
    purpose: "Counts product events. On the website: calculator views, with no figures you enter.",
    data: "Account identifier, plan, event names, device type; for the website, page path and IP address seen by PostHog.",
    region: "United States (us.i.posthog.com).",
  },
  {
    id: "sentry",
    name: "Sentry",
    role: "Crash and error reports",
    purpose: "Tells us when the app or server fails.",
    data: "Error and performance details, app version, account identifier.",
    region: US_AND_OTHERS,
  },
  {
    id: "apple",
    name: "Apple",
    role: "Sign in with Apple, purchases, iCloud, Calendar, notifications",
    purpose:
      "Signs you in, takes payment for Pro, mirrors some app settings and encrypted budget and invoice records between your own devices through iCloud, and delivers local notifications.",
    data: "Your Apple identifier and email (or private relay address); purchase records; items you sync through iCloud.",
    region: US_AND_OTHERS,
  },
  {
    id: "google",
    name: "Google",
    role: "Sign in with Google",
    purpose: "Signs you in if you choose Google.",
    data: "Your Google identifier, name and email address.",
    region: US_AND_OTHERS,
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Website hosting",
    purpose: "Serves hoursflow.app. We have not turned on Vercel Analytics.",
    data: "Ordinary web request logs (IP address, pages requested, browser).",
    region: US_AND_OTHERS,
  },
];

/** Receipts and payslips: the one place a reader may worry about AI. */
export const SCANNING_FACT =
  "Text on receipts and payslips is read on your device with Apple's Vision framework. For receipts, the photo or PDF you chose and the text read from it are sent to our servers to fill in the amount and tax for you to review. We do not send them to an AI service. An optional AI fallback exists in our code but is switched off, and no AI provider is connected.";
