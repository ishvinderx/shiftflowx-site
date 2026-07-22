import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Security & Privacy — ShiftFlow",
  description: "ShiftFlow protects your payroll data with TLS 1.3 in transit, encryption at rest, and a strict no-data-selling policy. Learn how we keep your financial information safe.",
  alternates: { canonical: 'https://shiftflowx.net/security' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://shiftflowx.net/security" }
  ]
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "security-measures", label: "Security Measures" },
  { id: "ai-ocr-safety", label: "AI & OCR Safety" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact", label: "Contact" },
];

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <LegalLayout title="Security & Privacy" effectiveDate="May 1, 2026" toc={toc}>
        <section id="overview">
          <h2>Your data is protected. Always.</h2>
          <p>
            At ShiftFlow, security is not an afterthought — it is foundational to everything we build. Your payroll data, shift logs, earnings history, and personal financial information are among the most sensitive data you can share with any application. We treat that responsibility seriously.
          </p>
          <p>
            ShiftFlow was designed from the ground up with a security-first architecture. Every feature, every data flow, and every third-party integration is evaluated through a security lens before it is shipped to you. Our commitment: your data is encrypted, private, and never sold.
          </p>
        </section>

        <section id="security-measures">
          <h2>Security Measures</h2>
          <p>ShiftFlow employs multiple layers of protection to safeguard your data:</p>

          <h3>TLS 1.3 Encryption in Transit</h3>
          <p>
            All communication between your device and ShiftFlow servers uses TLS 1.3 — the most current and secure version of the Transport Layer Security protocol. This ensures that your shift data, payroll figures, and personal information cannot be intercepted in transit.
          </p>

          <h3>Encryption at Rest</h3>
          <p>
            Data stored on ShiftFlow servers is encrypted at rest by our managed database provider, and select sensitive fields (such as your name and client contact details) carry additional application-level AES-256 encryption. All traffic is encrypted in transit with TLS 1.3.
          </p>

          <h3>iOS Keychain Token Storage</h3>
          <p>
            Authentication credentials and session tokens are stored exclusively in the iOS Keychain — Apple&apos;s secure, hardware-backed credential storage system. ShiftFlow never stores plaintext tokens, passwords, or sensitive credentials in app storage or local databases.
          </p>

          <h3>GDPR &amp; CCPA Compliance</h3>
          <p>
            ShiftFlow is fully compliant with the General Data Protection Regulation (GDPR) for users in the European Union and the California Consumer Privacy Act (CCPA) for California residents. You have the right to access, correct, delete, and export your data at any time.
          </p>

          <h3>30-Day Soft-Delete + Data Purge</h3>
          <p>
            When you delete your account, ShiftFlow initiates a 30-day soft-delete period during which your data is queued for permanent removal. After 30 days, all personal data — shift logs, earnings, chat history, and profile information — is permanently purged from our systems. This process is irreversible.
          </p>

          <h3>No Data Selling — Ever</h3>
          <p>
            ShiftFlow does not sell your personal data to third parties. Period. We do not participate in data broker marketplaces, advertising networks, or any scheme that monetizes your personal information. Our revenue comes from subscriptions, not from your data.
          </p>

          <h3>SOC2-Aligned Practices</h3>
          <p>
            Our internal security practices are aligned with the SOC2 framework, covering security, availability, processing integrity, confidentiality, and privacy. Access to production data is restricted to authorized personnel only, with multi-factor authentication required for all administrative access.
          </p>
        </section>

        <section id="ai-ocr-safety">
          <h2>AI &amp; OCR Safety</h2>
          <p>
            ShiftFlow uses AI models to power payroll analysis, the AI financial assistant, and payslip scanning. Here is exactly how we handle your data in these contexts:
          </p>

          <h3>Payslip OCR Processing</h3>
          <p>
            When you photograph a payslip using ShiftFlow&apos;s scanner, text recognition runs on your device. The payslip image is not uploaded to our servers for OCR; only the data you review and confirm is saved to your account.
          </p>

          <h3>AI Financial Assistant</h3>
          <p>
            When you interact with the AI assistant, your queries and relevant account context are processed by our AI provider under strict data processing agreements. Your queries are not used to train AI models without your explicit consent. Conversation history is stored securely and encrypted within your ShiftFlow account.
          </p>

          <h3>Payroll Anomaly Detection</h3>
          <p>
            Payroll anomaly detection processes your shift logs on secure servers to identify discrepancies. The underlying detection model is trained exclusively on anonymized, aggregated data — it is never trained on individually identifiable payroll records. Your specific payroll data is never shared with or used to improve models that serve other users.
          </p>
        </section>

        <section id="your-rights">
          <h2>Your Rights</h2>
          <p>You have full control over your data. At any time, you may:</p>
          <ul>
            <li><strong>Access:</strong> Request a complete export of all personal data ShiftFlow holds about you</li>
            <li><strong>Correction:</strong> Update or correct any inaccurate personal information in your account</li>
            <li><strong>Deletion:</strong> Delete your account and all associated data — permanently and irreversibly</li>
            <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format (JSON or CSV)</li>
            <li><strong>Opt-out:</strong> Opt out of analytics data collection at any time in Settings → Privacy</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <a href="mailto:info@shiftflowx.net">info@shiftflowx.net</a> or visit the <a href="/delete">Account Deletion page</a>. We respond to all data requests within 30 days.
          </p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>For security or privacy questions, contact our team:</p>
          <ul>
            <li><strong>Privacy inquiries:</strong> <a href="mailto:info@shiftflowx.net">info@shiftflowx.net</a></li>
            <li><strong>Security vulnerabilities:</strong> <a href="mailto:info@shiftflowx.net">info@shiftflowx.net</a></li>
            <li><strong>General support:</strong> <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
          </ul>
          <p>
            If you believe you have discovered a security vulnerability in ShiftFlow, please contact us immediately. We take all security reports seriously and will respond within 24 hours.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
