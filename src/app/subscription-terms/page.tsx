import LegalLayout from "@/components/legal/LegalLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "free-trial", label: "Free Trial" },
  { id: "plans", label: "Subscription Plans" },
  { id: "billing", label: "Billing & Renewal" },
  { id: "cancellation", label: "Cancellation" },
  { id: "refunds", label: "Refunds" },
  { id: "restore", label: "Restore Purchases" },
  { id: "changes", label: "Price Changes" },
  { id: "contact", label: "Contact" },
];

export default function SubscriptionTermsPage() {
  return (
    <LegalLayout
      title="Subscription Terms"
      effectiveDate="January 1, 2025"
      toc={toc}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          ShiftFlow offers a free trial and paid subscription plans (&ldquo;ShiftFlow Plus&rdquo;) that unlock the full suite of AI-powered financial tools. All subscriptions are processed and managed exclusively through the Apple App Store.
        </p>
        <p>
          By initiating a subscription or free trial, you agree to these Subscription Terms, which supplement our general Terms of Service.
        </p>
      </section>

      <section id="free-trial">
        <h2>Free Trial</h2>
        <ul>
          <li>New users are entitled to one (1) free 30-day trial of ShiftFlow Plus.</li>
          <li>No credit card or payment method is required to start the free trial.</li>
          <li>The free trial begins immediately upon account creation.</li>
          <li>During the trial, you have full access to all Plus features.</li>
          <li>We will notify you within the app before the trial expires.</li>
          <li>After the trial ends, access to Plus features requires an active paid subscription.</li>
          <li>You will not be automatically charged at the end of the free trial.</li>
          <li>If you subscribe to Plus through the App Store during or after the trial, App Store billing terms apply.</li>
        </ul>
      </section>

      <section id="plans">
        <h2>Subscription Plans</h2>
        <p>ShiftFlow Plus is available in two billing options:</p>
        <ul>
          <li>
            <strong>Plus Monthly:</strong> $9.99 USD per month. Full access to all Plus features. Billed monthly to your Apple ID account.
          </li>
          <li>
            <strong>Plus Annual:</strong> $99.00 USD per year (equivalent to approximately $8.25/month). Full access to all Plus features. Billed annually to your Apple ID account. Represents a savings of approximately 17% compared to the monthly plan.
          </li>
        </ul>
        <p>
          Prices may vary by region and are displayed in your local currency at the point of purchase. All prices are inclusive of applicable taxes where required by law.
        </p>
        <p>
          Both plans include: unlimited shift logging, AI Payroll Protection, Payday Forecasting, Burnout Analytics, Smart Recommendations, Tax Estimation, Invoice Generator, Payslip Scanner (OCR), Financial Health Score, AI Assistant, Career Intelligence, and Work Journal.
        </p>
      </section>

      <section id="billing">
        <h2>Billing &amp; Renewal</h2>
        <ul>
          <li>Subscriptions are charged to the Apple ID account associated with your App Store account.</li>
          <li>Billing occurs at the beginning of each subscription period (monthly or annually).</li>
          <li>Subscriptions automatically renew at the end of each period unless cancelled at least 24 hours before the renewal date.</li>
          <li>Renewal charges are at the same price as the original purchase, unless you have been notified of a price change.</li>
          <li>Apple processes all payments — ShiftFlow does not store or have access to your payment information.</li>
          <li>You can view your billing history in your Apple ID account settings.</li>
        </ul>
      </section>

      <section id="cancellation">
        <h2>Cancellation</h2>
        <p>You may cancel your ShiftFlow Plus subscription at any time. To cancel:</p>
        <ol>
          <li>Open Settings on your iPhone</li>
          <li>Tap your name at the top to access Apple ID</li>
          <li>Tap Subscriptions</li>
          <li>Find ShiftFlow in the list</li>
          <li>Tap Cancel Subscription</li>
        </ol>
        <p>
          You may also manage subscriptions via the App Store app: tap your profile icon → Subscriptions → ShiftFlow → Cancel.
        </p>
        <p>
          Cancellation takes effect at the end of the current billing period. You will retain access to Plus features until then. We do not offer pro-rated refunds for unused subscription time.
        </p>
      </section>

      <section id="refunds">
        <h2>Refunds</h2>
        <p>
          All refunds are handled exclusively by Apple Inc. ShiftFlow does not process refunds directly and cannot issue them on Apple&apos;s behalf.
        </p>
        <p>To request a refund:</p>
        <ul>
          <li>Visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a></li>
          <li>Sign in with your Apple ID</li>
          <li>Find the ShiftFlow charge you wish to dispute</li>
          <li>Select the issue and submit your request</li>
        </ul>
        <p>
          Apple reviews refund requests individually. Approval is at Apple&apos;s sole discretion and is subject to Apple&apos;s refund policies.
        </p>
        <p>
          For more information, visit our <a href="/refund">Refund Policy</a> page.
        </p>
      </section>

      <section id="restore">
        <h2>Restore Purchases</h2>
        <p>
          If you change devices, reinstall ShiftFlow, or sign in with a new device, your subscription will automatically be recognized if you are signed in with the same Apple ID.
        </p>
        <p>
          If your subscription is not automatically recognized, tap <strong>Restore Purchases</strong> in ShiftFlow&apos;s Settings screen. This will re-link your App Store purchase to your account.
        </p>
        <p>
          If issues persist, contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a> with your Apple ID email and we will assist you.
        </p>
      </section>

      <section id="changes">
        <h2>Price Changes</h2>
        <p>
          We reserve the right to change subscription prices. If we change pricing for your plan, we will:
        </p>
        <ul>
          <li>Notify you at least 30 days in advance via in-app notification and/or email</li>
          <li>Obtain your consent for the new price before the next renewal (as required by Apple&apos;s policies)</li>
        </ul>
        <p>
          If you do not consent to the new price, your subscription will not renew at the increased price and you may cancel without penalty.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          For subscription-related questions, contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>. For billing disputes, refunds, or payment issues, please contact Apple Support or visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
