import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, PRIVACY_EMAIL, SUPPORT_EMAIL } from "@/lib/constants";
import { DATA_RETENTION_GRACE_DAYS } from "@/content/dataPractices";

export const metadata: Metadata = {
  title: "Delete your account",
  description: `How to delete your ${BRAND.name} account and data: in the app or by email, the ${DATA_RETENTION_GRACE_DAYS}-day grace period, what is erased and what we keep.`,
  alternates: canonicalAlt("/delete"),
};

const toc = [
  { id: "in-app", label: "Delete in the app" },
  { id: "by-email", label: "Delete by email" },
  { id: "what-happens", label: "What happens" },
  { id: "kept", label: "What we keep" },
  { id: "subscription", label: "Your subscription" },
  { id: "export", label: "Export first" },
];

export default function DeletePage() {
  return (
    <LegalLayout
      title="Delete your account"
      whatChanged="Corrected to match how deletion works: the account closes at once and the data is erased after a 30-day grace period. Removed claims that you can cancel by logging in and that a confirmation email is sent."
      toc={toc}
    >
      <section id="in-app">
        <h2>Delete in the app</h2>
        <ol>
          <li>Open {BRAND.name} and go to <strong>Profile</strong>.</li>
          <li>Tap <strong>Delete account</strong>.</li>
          <li>Read the warning, type <strong>DELETE</strong>, and confirm.</li>
        </ol>
        <p>Deleting your account is free. If it fails, the app tells you; try again or email us.</p>
      </section>

      <section id="by-email">
        <h2>Delete by email</h2>
        <p>If you cannot use the app, email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> or <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the email address on your account and ask us to delete it. We may ask you to confirm who you are first.</p>
      </section>

      <section id="what-happens">
        <h2>What happens</h2>
        <ol>
          <li><strong>At once:</strong> your account is closed and you are signed out on every device. You cannot sign in to it.</li>
          <li><strong>For {DATA_RETENTION_GRACE_DAYS} days:</strong> we hold your data in case you deleted by mistake. To restore the account in this period, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. You cannot restore it by signing in.</li>
          <li><strong>After {DATA_RETENTION_GRACE_DAYS} days:</strong> a scheduled job permanently deletes your shifts, employers, expenses, receipts and other files, invoices, budget and bills, tax settings, goals, notes, feedback and similar records. It also erases your name, email, credentials, phone, address, date of birth and other profile details. We ask RevenueCat to delete your customer record. This cannot be undone.</li>
          <li><strong>Backups</strong> expire after 30 days, so a deleted account can remain in a backup for up to that time.</li>
          <li><strong>Analytics:</strong> your PostHog profile is deleted by hand; we aim to do this within 30 days after the purge.</li>
        </ol>
      </section>

      <section id="kept">
        <h2>What we keep</h2>
        <p>We keep a small number of records that no longer contain your name or email: an empty account row (internal ID, dates, plan status and consent dates), our purchase-event and referral-reward records for accounting, and security-log rows with the IP hash, device details and details cleared. They have no automatic deletion date today. See the <Link href="/privacy#retention">privacy policy</Link>.</p>
      </section>

      <section id="subscription">
        <h2>Your subscription</h2>
        <p>Deleting your account does <strong>not</strong> cancel an Apple subscription. Cancel it first in Settings, then your name, then Subscriptions. See <Link href="/subscription-terms#cancel">subscription terms</Link>.</p>
      </section>

      <section id="export">
        <h2>Export first</h2>
        <p>You can export your data in the app (Profile) before you delete. Export is free.</p>
      </section>
    </LegalLayout>
  );
}
