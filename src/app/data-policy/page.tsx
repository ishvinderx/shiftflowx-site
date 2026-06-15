import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Data Collection Policy — ShiftFlow",
  description:
    "Understand exactly what data ShiftFlow collects, why we collect it, how long we keep it, and your rights to access, export, and delete it.",
  alternates: { canonical: "https://shiftflowx.net/data-policy" },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "what-we-collect", label: "What We Collect" },
  { id: "what-is-optional", label: "What Is Optional" },
  { id: "ai-memory", label: "AI Memory Behaviour" },
  { id: "training-usage", label: "AI Training Usage" },
  { id: "third-parties", label: "Third-Party Providers" },
  { id: "retention", label: "Retention Periods" },
  { id: "deletion", label: "Deletion Behaviour" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact", label: "Contact" },
];

export default function DataPolicyPage() {
  return (
    <LegalLayout title="Data Collection Policy" effectiveDate="May 1, 2026" toc={toc}>
      <section id="overview">
        <h2>Overview</h2>
        <p>
          This policy explains exactly what data ShiftFlow collects from you, why we collect it,
          how long we keep it, and what happens when you delete it. We believe transparency is
          non-negotiable when an app touches your payroll and financial records.
        </p>
        <p>
          ShiftFlow is designed on a <strong>data minimisation</strong> principle: we collect only
          what is necessary to deliver the features you use, and nothing more.
        </p>
      </section>

      <section id="what-we-collect">
        <h2>What We Collect</h2>
        <h3>Account Information</h3>
        <ul>
          <li>Email address (required for account creation and recovery)</li>
          <li>Display name</li>
          <li>Password hash (bcrypt — we never store your plaintext password)</li>
          <li>Apple ID or Google ID if you use Sign In with Apple / Google</li>
          <li>Timezone and currency preference</li>
          <li>Country code (two-letter ISO code, used for tax and payroll rules)</li>
        </ul>

        <h3>Shift & Payroll Data</h3>
        <ul>
          <li>Shift start and end times</li>
          <li>Break durations</li>
          <li>Employer / job name, hourly rate, overtime configuration</li>
          <li>Tips, mileage, and expense entries</li>
          <li>Tags and shift notes</li>
          <li>Calculated gross pay, net pay, and overtime hours (server-computed — we never
            trust client-side calculations for financial figures)</li>
          <li>Pay schedule (frequency, anchor date, next payday)</li>
        </ul>

        <h3>Financial Calculations</h3>
        <ul>
          <li>Tax rate (user-configured)</li>
          <li>Tax profile (filing status, deductions — optional)</li>
          <li>Invoice data (client name, line items, amounts, due dates)</li>
          <li>Paycheck anomaly detection results</li>
        </ul>

        <h3>Device & Session Data</h3>
        <ul>
          <li>Device token for push notifications (APNs) — deleted when you log out</li>
          <li>Device name and OS version (for the Security Centre session list)</li>
          <li>IP address hash (hashed, not stored in plaintext — used for suspicious login detection)</li>
          <li>JWT access tokens (short-lived, 1 hour) and refresh tokens (30 days, httpOnly cookie)</li>
        </ul>

        <h3>Analytics & Crash Data</h3>
        <ul>
          <li>Anonymised feature usage events via PostHog (e.g. &ldquo;shift_logged&rdquo;, &ldquo;paywall_viewed&rdquo;)</li>
          <li>Crash reports and performance traces via Sentry (device model, OS version, stack trace — no PII)</li>
          <li>Session counts and retention metrics (aggregate only)</li>
        </ul>

        <h3>Subscription Data</h3>
        <ul>
          <li>Subscription status, plan, and expiry date (synced from RevenueCat)</li>
          <li>RevenueCat customer ID</li>
          <li>Trial start and end dates</li>
          <li>We never store credit card numbers, CVVs, or bank account details — all billing
            is handled exclusively by Apple in-app purchase</li>
        </ul>

        <h3>AI & Wellbeing Data</h3>
        <ul>
          <li>Energy scores and mood entries (logged per shift — optional)</li>
          <li>Stress scores (1–10, optional)</li>
          <li>AI Memory Profile: preferred shift patterns, financial goals, burnout triggers,
            income priorities — stored server-side and used only to personalise your AI recommendations</li>
          <li>Work journal entries (text, optional)</li>
        </ul>
      </section>

      <section id="what-is-optional">
        <h2>What Is Optional</h2>
        <p>The following data is never required to use ShiftFlow&apos;s core features:</p>
        <ul>
          <li>Energy scores, mood, and stress entries per shift</li>
          <li>Work journal entries</li>
          <li>AI Memory (can be disabled in Profile → AI Settings → AI Memory)</li>
          <li>Location data for automatic clock-in (requires explicit permission, can be revoked at any time in iOS Settings)</li>
          <li>Push notifications (can be declined or disabled in iOS Settings)</li>
          <li>Analytics participation (anonymised — cannot be opted out of individually, but
            contains no PII)</li>
          <li>Tax profile details beyond your basic tax rate</li>
          <li>Invoice client details</li>
        </ul>
      </section>

      <section id="ai-memory">
        <h2>AI Memory Behaviour</h2>
        <p>
          ShiftFlow&apos;s AI assistant maintains an optional memory profile that stores preferences
          and patterns to personalise responses. This memory:
        </p>
        <ul>
          <li>Is stored in our database under your user ID, encrypted at rest with AES-256</li>
          <li>Is used only to improve AI recommendations within your account — it is never used
            to train models or shared with any third party</li>
          <li>Can be cleared at any time: Profile → AI Settings → Delete AI History</li>
          <li>Can be disabled entirely: Profile → AI Settings → Disable AI Memory</li>
          <li>Is deleted permanently on account deletion (no grace period)</li>
        </ul>
        <p>
          Work journal entries that you choose to share with the AI within a chat session are
          processed by your configured AI provider (DeepSeek or Claude) and are subject to that
          provider&apos;s privacy policy. We redact payroll amounts and personal identifiers before
          sending any text to AI providers.
        </p>
      </section>

      <section id="training-usage">
        <h2>AI Training Usage</h2>
        <p>
          <strong>ShiftFlow does not use your personal data to train AI models.</strong>
        </p>
        <p>
          Your shift data, payroll records, journal entries, and AI conversations are never used
          as training data for any machine learning model — by ShiftFlow or any third party we
          work with. We use AI APIs (DeepSeek, Anthropic Claude) in API mode, which means your
          data is processed for inference only and is not retained by the AI provider for training.
        </p>
      </section>

      <section id="third-parties">
        <h2>Third-Party Providers</h2>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Data Shared</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RevenueCat</td>
              <td>Subscription management</td>
              <td>User ID, subscription events — no payment card data</td>
            </tr>
            <tr>
              <td>Apple App Store</td>
              <td>In-app purchase billing</td>
              <td>Handled entirely by Apple — we receive only a receipt and subscription status</td>
            </tr>
            <tr>
              <td>PostHog</td>
              <td>Product analytics</td>
              <td>Anonymised event names and properties — no PII, no payroll data</td>
            </tr>
            <tr>
              <td>Sentry</td>
              <td>Crash monitoring</td>
              <td>Stack traces, device model, OS version — no user data, no payroll data</td>
            </tr>
            <tr>
              <td>DeepSeek / Anthropic</td>
              <td>AI responses (opt-in)</td>
              <td>Sanitised prompt text — PII and payroll figures are redacted before sending</td>
            </tr>
            <tr>
              <td>Railway / Cloudflare</td>
              <td>Cloud hosting and CDN</td>
              <td>Encrypted data at rest — providers cannot read your financial records</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="retention">
        <h2>Retention Periods</h2>
        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Active account data (shifts, invoices, payroll)</td>
              <td>Kept until account deletion</td>
            </tr>
            <tr>
              <td>Soft-deleted shifts and invoices</td>
              <td>30-day grace period, then hard-deleted</td>
            </tr>
            <tr>
              <td>Account data after deletion request</td>
              <td>30-day grace period for recovery, then hard-deleted</td>
            </tr>
            <tr>
              <td>AI Memory Profile</td>
              <td>Deleted immediately on account deletion or manual clear</td>
            </tr>
            <tr>
              <td>Audit logs (admin-only)</td>
              <td>90 days</td>
            </tr>
            <tr>
              <td>Push notification tokens</td>
              <td>Deleted on logout or account deletion</td>
            </tr>
            <tr>
              <td>Analytics events (PostHog)</td>
              <td>Anonymised — no user-linked retention period</td>
            </tr>
            <tr>
              <td>Crash reports (Sentry)</td>
              <td>90 days per Sentry&apos;s default policy</td>
            </tr>
            <tr>
              <td>OCR-processed paystub files</td>
              <td>Not stored server-side — processed and discarded immediately</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="deletion">
        <h2>Deletion Behaviour</h2>
        <p>
          When you delete your account (Profile → Settings → Delete Account), ShiftFlow
          initiates a full deletion sequence:
        </p>
        <ul>
          <li>Your account is immediately soft-deleted — you cannot log in, and your data is
            no longer accessible</li>
          <li>You have a 30-day window to contact support and recover your account</li>
          <li>After 30 days, a scheduled job hard-deletes all records associated with your account:
            shifts, invoices, payroll records, journals, AI memory, goals, device tokens,
            notification preferences, and analytics identifiers</li>
          <li>AI Memory is deleted immediately — no grace period</li>
          <li>Your anonymised analytics events (PostHog) remain but cannot be linked back to you</li>
          <li>RevenueCat retains your subscription history for their own legal compliance requirements</li>
        </ul>
        <p>
          To request account deletion directly:{" "}
          <a href="https://shiftflowx.net/delete">shiftflowx.net/delete</a> or email{" "}
          <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>.
        </p>
      </section>

      <section id="your-rights">
        <h2>Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of all data we hold about you</li>
          <li><strong>Rectification</strong> — correct inaccurate data</li>
          <li><strong>Erasure</strong> — request deletion of your account and all associated data</li>
          <li><strong>Portability</strong> — export your shifts and earnings as CSV or JSON</li>
          <li><strong>Restriction</strong> — request that we stop processing your data while a complaint is investigated</li>
          <li><strong>Objection</strong> — object to any processing based on legitimate interests</li>
          <li><strong>Withdraw consent</strong> — disable AI Memory, revoke notification permissions, or delete your AI chat history at any time</li>
        </ul>
        <p>
          <strong>GDPR users (EEA/UK):</strong> You may lodge a complaint with your local supervisory authority.
        </p>
        <p>
          <strong>CCPA users (California):</strong> We do not sell personal information. You have the right to know, delete, and opt-out of sale (not applicable — we do not sell).
        </p>
        <p>
          To exercise any of these rights, contact{" "}
          <a href="mailto:privacy@shiftflowx.net">privacy@shiftflowx.net</a>.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          For questions about this policy, data requests, or privacy concerns:
        </p>
        <ul>
          <li>Email: <a href="mailto:privacy@shiftflowx.net">privacy@shiftflowx.net</a></li>
          <li>Support: <a href="https://shiftflowx.net/support">shiftflowx.net/support</a></li>
        </ul>
        <p>
          We aim to respond to all data requests within 30 days.
        </p>
      </section>
    </LegalLayout>
  );
}
