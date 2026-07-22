import LegalLayout from "@/components/legal/LegalLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to permanently delete your ShiftFlow account and data, including the grace period and what gets removed.",
  alternates: { canonical: "https://shiftflowx.net/delete" },
};

import Link from "next/link";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "what-gets-deleted", label: "What Gets Deleted" },
  { id: "in-app", label: "Delete Via the App" },
  { id: "via-email", label: "Delete Via Email" },
  { id: "grace-period", label: "Grace Period" },
  { id: "subscription", label: "Subscription Impact" },
  { id: "contact", label: "Need Help?" },
];

export default function DeletePage() {
  return (
    <LegalLayout
      title="Delete Your Account"
      effectiveDate="January 1, 2025"
      toc={toc}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          You have the right to delete your ShiftFlow account and all associated data at any time. Account deletion is permanent and irreversible — once completed, all your data will be permanently removed from our systems.
        </p>
        <p>
          We want to make this process as straightforward as possible. You can delete your account directly through the ShiftFlow app, or by contacting our support team.
        </p>
      </section>

      <section id="what-gets-deleted">
        <h2>What Gets Deleted</h2>
        <p>When you delete your account, the following data is permanently removed:</p>
        <ul>
          <li>Your profile information (name, email address, authentication credentials)</li>
          <li>All shift logs and work history</li>
          <li>Earnings records and payroll data</li>
          <li>Payday forecast history</li>
          <li>Burnout scores and wellness history</li>
          <li>AI chat conversation history</li>
          <li>Invoices and invoice drafts</li>
          <li>Scanned payslips and OCR data</li>
          <li>Work journal entries and mood logs</li>
          <li>Financial Health Score history</li>
          <li>All preferences and settings</li>
        </ul>
        <p>
          <strong>What may be retained:</strong> We may retain certain records for up to 90 days as required by law, including support correspondence related to billing disputes and records required for legal compliance. Anonymous, aggregated data (which cannot identify you) may be retained for service improvement purposes.
        </p>
      </section>

      <section id="in-app">
        <h2>Delete Your Account Via the App</h2>
        <p>The easiest way to delete your account is directly through ShiftFlow:</p>
        <ol>
          <li>Open the ShiftFlow app on your iPhone or iPad</li>
          <li>Tap the <strong>Profile</strong> icon or navigate to the <strong>Settings</strong> tab</li>
          <li>Scroll down to find <strong>Account</strong></li>
          <li>Tap <strong>Delete Account</strong></li>
          <li>Read the confirmation message carefully</li>
          <li>Confirm your identity (you may be asked to enter your password or authenticate with Face ID/Touch ID)</li>
          <li>Tap <strong>Permanently Delete My Account</strong></li>
        </ol>
        <p>
          You will receive a confirmation email to your registered address once the deletion process has been initiated. All data will be permanently removed within <strong>30 days</strong>.
        </p>
      </section>

      <section id="via-email">
        <h2>Delete Your Account Via Email</h2>
        <p>
          If you are unable to access the app, you can request account deletion by emailing us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
          <li><strong>Subject:</strong> Account Deletion Request</li>
          <li><strong>Include:</strong> The email address associated with your ShiftFlow account</li>
        </ul>
        <p>
          We will verify your identity and confirm the deletion request within 2 business days. Once confirmed, deletion will be initiated and completed within 30 days.
        </p>
        <p>
          Alternatively, you can use our <Link href="/support">Support page</Link> and select &ldquo;Delete My Account&rdquo; as the subject.
        </p>
      </section>

      <section id="grace-period">
        <h2>Grace Period</h2>
        <p>
          After initiating account deletion, there is a <strong>7-day grace period</strong> during which you can cancel the deletion request by logging back into the app or contacting support. After 7 days, the deletion process is irreversible and cannot be stopped.
        </p>
        <p>
          All data is permanently purged from our servers within <strong>30 days</strong> of the deletion being initiated. During this window, you will not be able to log in or access your data.
        </p>
      </section>

      <section id="subscription">
        <h2>Subscription Impact</h2>
        <p>
          Deleting your ShiftFlow account does <strong>not</strong> automatically cancel your App Store subscription. To avoid future charges, you must cancel your subscription separately through Apple before deleting your account.
        </p>
        <p>To cancel your subscription before deleting your account:</p>
        <ol>
          <li>Open Settings on your iPhone</li>
          <li>Tap your name → Subscriptions</li>
          <li>Find ShiftFlow and tap it</li>
          <li>Tap Cancel Subscription</li>
        </ol>
        <p>
          After cancelling the subscription, proceed to delete your account using the steps above. If you need assistance with subscription cancellation, visit our <Link href="/subscription-terms">Subscription Terms</Link> page.
        </p>
      </section>

      <section id="contact">
        <h2>Need Help?</h2>
        <p>
          If you encounter any issues with account deletion, or if you have concerns about your data after deletion, please contact our support team:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
          <li><strong>Response time:</strong> Within 24 hours on business days</li>
          <li><strong>Support page:</strong> <Link href="/support">shiftflowx.net/support</Link></li>
        </ul>
        <p>
          We take data deletion seriously and are committed to completing all deletion requests promptly and thoroughly.
        </p>
      </section>
    </LegalLayout>
  );
}
