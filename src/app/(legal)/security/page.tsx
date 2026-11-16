import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, SECURITY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Security",
  description: `The security measures ${BRAND.name} has in place, what they do not cover, and how to report a vulnerability.`,
  alternates: canonicalAlt("/security"),
};

const toc = [
  { id: "measures", label: "What we do" },
  { id: "encrypted-fields", label: "Encrypted fields" },
  { id: "limits", label: "What we do not claim" },
  { id: "your-part", label: "Your part" },
  { id: "report", label: "Report a vulnerability" },
  { id: "breaches", label: "If something goes wrong" },
];

export default function SecurityPage() {
  return (
    <LegalLayout
      title="Security"
      whatChanged="Rewritten to list only measures that exist in our code and configuration, and to add how to report a vulnerability."
      toc={toc}
    >
      <section id="measures">
        <h2>What we do</h2>
        <ul>
          <li><strong>Encryption in transit.</strong> The app, the website and our API use HTTPS. The website tells browsers to use HTTPS only.</li>
          <li><strong>Passwords.</strong> Stored only as bcrypt hashes. Password-reset and email-verification links and sign-in refresh tokens are stored only as hashes, so reading our database does not give anyone a working link or token.</li>
          <li><strong>Sign in with Apple and Google.</strong> We check the identity token each provider issues. For Apple we also check a one-time nonce.</li>
          <li><strong>Sessions.</strong> Access tokens last one hour. Refresh tokens last up to 30 days and are rotated on use. Deleting your account signs out every device.</li>
          <li><strong>Private files.</strong> Receipts, avatars and PDFs are stored in a private bucket under your own folder and served through short-lived signed links.</li>
          <li><strong>Rate limiting and origin rules.</strong> The API limits repeated requests and accepts browser calls only from our own sites.</li>
          <li><strong>Security headers.</strong> The website sends a content security policy, frame protection, and other standard browser protections.</li>
          <li><strong>App lock.</strong> You can lock the app with Face ID. Face ID is handled by Apple on your device.</li>
          <li><strong>Error reports without personal data by default.</strong> Sentry&rsquo;s default personal-data collection is off, and we strip email, password and token fields from reports.</li>
          <li><strong>Logs.</strong> Security logs keep a salted hash of your IP address, not the address. Actions in our admin console are logged.</li>
          <li><strong>Backups.</strong> We take database backups and set them to expire after 30 days.</li>
        </ul>
      </section>

      <section id="encrypted-fields">
        <h2>Encrypted fields</h2>
        <p>These fields are encrypted in our database with AES-256-GCM, using a key kept outside the database: your name, phone, mailing address, job title and date of birth; shift and work-journal notes; expense notes; invoice client names and email addresses; check-in and journal text; and the stored budget, net-worth and credit-score values.</p>
        <p>Email addresses and sign-in identifiers are not encrypted, because we use them to find your account. Money amounts, hours and dates are not encrypted field by field. Our hosting providers protect the database and storage at their level.</p>
      </section>

      <section id="limits">
        <h2>What we do not claim</h2>
        <p>{BRAND.name} is not &ldquo;end-to-end encrypted&rdquo;: our servers can read your data in order to work. We have not had an independent security audit or certification. No system is perfectly secure.</p>
      </section>

      <section id="your-part">
        <h2>Your part</h2>
        <ul>
          <li>Use a strong password that you use nowhere else, or sign in with Apple or Google.</li>
          <li>Turn on the Face ID lock and keep your device passcode and iOS up to date.</li>
          <li>Tell us at once if you think someone else has your account.</li>
        </ul>
      </section>

      <section id="report">
        <h2>Report a vulnerability</h2>
        <p>If you find a security problem, email <a href={`mailto:${SECURITY_EMAIL}`}>{SECURITY_EMAIL}</a> with the subject &ldquo;Security&rdquo;. Please give us enough detail to reproduce it, and give us a reasonable time to fix it before you make it public. Please do not access other people&rsquo;s data, damage the service or run tests that could disrupt it. We do not run a bug-bounty programme and cannot promise a reward, but we will read every report and tell you what we decide.</p>
      </section>

      <section id="breaches">
        <h2>If something goes wrong</h2>
        <p>If a breach involves your personal information and creates a real risk of significant harm, we will tell you and the authorities as the law requires. See the <Link href="/privacy#security">privacy policy</Link>.</p>
      </section>
    </LegalLayout>
  );
}
