import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — ShiftFlow Data Protection & GDPR Compliance",
  description: "Read ShiftFlow's privacy policy. We use AES-256 encryption, TLS 1.3, never sell your data, and comply with GDPR and CCPA. Your payroll data is always protected.",
  alternates: { canonical: 'https://shiftflowx.net/privacy' },
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "data-collected", label: "Data We Collect" },
  { id: "how-we-use", label: "How We Use Your Data" },
  { id: "ai-ocr", label: "AI & OCR Processing" },
  { id: "sharing", label: "Data Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Security" },
  { id: "gdpr-ccpa", label: "GDPR & CCPA Rights" },
  { id: "deletion", label: "Account Deletion" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="January 1, 2025" toc={toc}>
      <section id="overview">
        <h2>Overview</h2>
        <p>
          ShiftFlow (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the ShiftFlow mobile application and related services (collectively, the &ldquo;Service&rdquo;).
        </p>
        <p>
          By using ShiftFlow, you agree to the collection and use of information in accordance with this Policy. If you do not agree with the terms of this Policy, please do not use the Service.
        </p>
      </section>

      <section id="data-collected">
        <h2>Data We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li><strong>Account information:</strong> Email address, name, and authentication credentials</li>
          <li><strong>Work information:</strong> Employer name, pay rate, shift times, break durations, and work schedule</li>
          <li><strong>Financial data:</strong> Earnings, tips, mileage, tax information, and invoice data you create</li>
          <li><strong>Payslip images:</strong> Photographs of payslips you choose to scan using our OCR feature</li>
          <li><strong>Journal entries:</strong> Work notes, energy levels, mood logs, and shift reflections</li>
          <li><strong>Support communications:</strong> Messages you send to our support team</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li><strong>Device information:</strong> Device model, operating system version, unique device identifier, and app version</li>
          <li><strong>Usage data:</strong> Features used, screens viewed, and interaction patterns (anonymized)</li>
          <li><strong>Crash reports:</strong> Technical error logs to help us improve stability</li>
          <li><strong>Analytics:</strong> Aggregated, anonymized usage statistics</li>
        </ul>

        <h3>Information We Do Not Collect</h3>
        <p>We do not collect your bank account numbers, credit card numbers, Social Security numbers, or government identification numbers. We do not access your contacts, camera roll, or location without your explicit permission.</p>
      </section>

      <section id="how-we-use">
        <h2>How We Use Your Data</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and maintain the ShiftFlow Service</li>
          <li>Process and verify your shift data and payroll calculations</li>
          <li>Generate payday forecasts, earnings reports, and financial insights</li>
          <li>Power the AI assistant to answer your financial and payroll questions</li>
          <li>Calculate burnout scores and wellness indicators</li>
          <li>Send you alerts about pay discrepancies, upcoming paydays, and important account events</li>
          <li>Improve the accuracy of our AI models (using anonymized, aggregated data only)</li>
          <li>Respond to your customer support requests</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We will never use your personal financial data for advertising, marketing profiling, or sale to third parties. Your payroll data belongs to you.
        </p>
      </section>

      <section id="ai-ocr">
        <h2>AI & OCR Processing</h2>
        <p>
          ShiftFlow uses AI models to power features including payroll verification, the AI financial assistant, and payslip scanning (OCR). Here is how we handle data in these contexts:
        </p>
        <h3>AI Financial Assistant</h3>
        <p>
          When you interact with the AI assistant, your queries and relevant account context are processed by our AI provider. Queries are not used to train AI models without your explicit consent. Conversation history is stored securely and associated with your account.
        </p>
        <h3>Payslip OCR Scanner</h3>
        <p>
          When you photograph a payslip, the image is transmitted securely to our OCR processing service. The extracted data is immediately associated with your account record. Original images may be retained for up to 30 days to allow for re-processing in case of errors, after which they are automatically deleted unless you have explicitly saved them.
        </p>
        <h3>Payroll Anomaly Detection</h3>
        <p>
          Your shift logs are processed by our anomaly detection engine to identify potential pay discrepancies. This processing occurs on our secure servers and the underlying model is trained on anonymized, aggregate data — never on individually identifiable payroll records.
        </p>
      </section>

      <section id="sharing">
        <h2>Data Sharing</h2>
        <p>We do not sell your personal data. We share your information only in the following limited circumstances:</p>
        <ul>
          <li><strong>Service providers:</strong> We use trusted third-party vendors (cloud hosting, analytics, AI processing) who are contractually bound to handle your data securely and only as instructed by us.</li>
          <li><strong>Apple App Store:</strong> Subscription and purchase data is processed by Apple Inc. and governed by Apple&apos;s privacy policy.</li>
          <li><strong>Legal requirements:</strong> We may disclose information if required by law, court order, or government authority.</li>
          <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or asset sale, your data may be transferred. We will notify you before this occurs.</li>
          <li><strong>With your consent:</strong> Any other sharing will only occur with your explicit consent.</li>
        </ul>
      </section>

      <section id="retention">
        <h2>Data Retention</h2>
        <p>
          We retain your personal data for as long as your account is active or as needed to provide you the Service. Specific retention periods:
        </p>
        <ul>
          <li><strong>Shift logs and earnings:</strong> Retained for the lifetime of your account. Exported or deleted upon account deletion.</li>
          <li><strong>AI chat history:</strong> Retained for 12 months, then automatically purged.</li>
          <li><strong>Payslip images:</strong> Retained for 30 days after scan, then deleted (unless manually saved).</li>
          <li><strong>Support communications:</strong> Retained for 3 years for legal and quality purposes.</li>
          <li><strong>Anonymized analytics:</strong> May be retained indefinitely as they cannot identify you.</li>
        </ul>
        <p>
          When you delete your account, we initiate deletion of your personal data within 30 days, except where we are required to retain certain records by law.
        </p>
      </section>

      <section id="security">
        <h2>Security</h2>
        <p>
          We implement industry-standard security measures to protect your information:
        </p>
        <ul>
          <li>All data transmitted between your device and our servers is encrypted using TLS 1.3</li>
          <li>Data stored on our servers is encrypted at rest using AES-256</li>
          <li>Access to production data is restricted to authorized personnel only</li>
          <li>We conduct regular security audits and penetration testing</li>
          <li>Employees with data access undergo security training and background checks</li>
        </ul>
        <p>
          No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. If you suspect a security issue, please contact us immediately at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>.
        </p>
      </section>

      <section id="gdpr-ccpa">
        <h2>GDPR & CCPA Rights</h2>
        <h3>For EU/EEA Residents (GDPR)</h3>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Rectification:</strong> Request correction of inaccurate personal data</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
          <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
          <li><strong>Restriction:</strong> Request limitation of processing under certain circumstances</li>
          <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
        </ul>

        <h3>For California Residents (CCPA)</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Know what personal information we collect, use, disclose, and sell</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of the sale of your personal information (we do not sell data)</li>
          <li>Non-discrimination for exercising your privacy rights</li>
        </ul>

        <p>To exercise any of these rights, contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>. We will respond within 30 days.</p>
      </section>

      <section id="deletion">
        <h2>Account Deletion</h2>
        <p>
          You can delete your ShiftFlow account and all associated data at any time. To do so:
        </p>
        <ul>
          <li>In the app: Settings → Account → Delete Account</li>
          <li>Online: Visit <a href="/delete">shiftflowx.net/delete</a> for step-by-step instructions</li>
          <li>By email: Contact <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
        </ul>
        <p>
          Deletion is permanent and irreversible. All your shift logs, earnings data, AI chat history, and personal information will be permanently removed from our systems within 30 days.
        </p>
      </section>

      <section id="children">
        <h2>Children&apos;s Privacy</h2>
        <p>
          ShiftFlow is not directed to individuals under the age of 16. We do not knowingly collect personal data from children under 16. If you believe a child under 16 has provided us with personal information, please contact us and we will delete that information promptly.
        </p>
      </section>

      <section id="changes">
        <h2>Policy Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by:
        </p>
        <ul>
          <li>Posting the new policy on this page with an updated effective date</li>
          <li>Sending an in-app notification for significant changes</li>
          <li>Emailing registered users for changes that materially affect their rights</li>
        </ul>
        <p>
          Your continued use of ShiftFlow after changes become effective constitutes acceptance of the revised policy.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
          <li><strong>Website:</strong> <a href="/support">shiftflowx.net/support</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
}
