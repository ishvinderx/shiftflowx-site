import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — ShiftFlow Legal Agreement",
  description: "Read ShiftFlow's Terms of Service. Understand your rights, subscription terms, acceptable use policy, and how our AI-powered workforce financial app is governed.",
  alternates: { canonical: 'https://shiftflowx.net/terms' },
};

const toc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "account", label: "Account Registration" },
  { id: "service", label: "The Service" },
  { id: "subscriptions", label: "Subscriptions & Billing" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" effectiveDate="January 1, 2025" toc={toc}>
      <section id="acceptance">
        <h2>Acceptance of Terms</h2>
        <p>
          By downloading, installing, or using the ShiftFlow application (&ldquo;App&rdquo;) or visiting shiftflowx.net (the &ldquo;Website&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not access or use the Service.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you and ShiftFlow (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Please read them carefully.
        </p>
      </section>

      <section id="eligibility">
        <h2>Eligibility</h2>
        <p>You must meet the following criteria to use ShiftFlow:</p>
        <ul>
          <li>Be at least 16 years of age</li>
          <li>Have the legal capacity to enter into a binding agreement</li>
          <li>Not be prohibited from using the Service under applicable laws</li>
          <li>Own or have permission to use the Apple device on which you install the App</li>
        </ul>
        <p>By using ShiftFlow, you represent and warrant that you meet all eligibility requirements.</p>
      </section>

      <section id="account">
        <h2>Account Registration</h2>
        <p>
          To use most features of ShiftFlow, you must create an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and promptly update your account information</li>
          <li>Keep your password secure and not share it with others</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>Accept responsibility for all activities that occur under your account</li>
        </ul>
        <p>
          We reserve the right to terminate accounts that are found to be fraudulent, inaccurate, or in violation of these Terms.
        </p>
      </section>

      <section id="service">
        <h2>The Service</h2>
        <p>
          ShiftFlow provides AI-powered tools to help workers track shifts, monitor earnings, forecast paydays, detect payroll discrepancies, and manage financial wellness. The Service is provided for informational and personal financial management purposes only.
        </p>
        <p>
          <strong>Important limitations:</strong> ShiftFlow is not a licensed financial advisor, accountant, or legal professional. Information provided through the Service — including AI-generated insights, tax estimates, and payroll analysis — is for informational purposes only and does not constitute professional financial, tax, or legal advice.
        </p>
        <p>
          You should consult qualified professionals before making significant financial decisions. We are not responsible for decisions you make based on information provided by the Service.
        </p>
      </section>

      <section id="subscriptions">
        <h2>Subscriptions &amp; Billing</h2>
        <p>
          ShiftFlow offers a free 30-day trial and paid subscription plans (&ldquo;Plus&rdquo;). All subscriptions are managed through the Apple App Store.
        </p>
        <ul>
          <li><strong>Free Trial:</strong> A 30-day free trial is available to new users. No credit card is required. After the trial, a paid subscription is required to continue accessing Plus features.</li>
          <li><strong>Billing:</strong> Subscription fees are charged to your Apple ID account. Billing occurs in advance on a monthly or annual basis.</li>
          <li><strong>Auto-renewal:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.</li>
          <li><strong>Cancellation:</strong> You may cancel at any time via Settings → Apple ID → Subscriptions on your device.</li>
          <li><strong>Refunds:</strong> Refunds are governed by Apple&apos;s refund policies. We do not process refunds directly.</li>
          <li><strong>Price changes:</strong> We may change subscription prices upon 30 days&apos; notice. Continued use after a price change constitutes acceptance.</li>
        </ul>
      </section>

      <section id="acceptable-use">
        <h2>Acceptable Use</h2>
        <p>You agree not to use ShiftFlow to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Submit false or misleading information about your employment or earnings</li>
          <li>Attempt to gain unauthorized access to other users&apos; accounts or our systems</li>
          <li>Reverse engineer, decompile, or disassemble the App</li>
          <li>Use the Service to harass, abuse, or harm others</li>
          <li>Transmit any malicious code, viruses, or harmful data</li>
          <li>Scrape, crawl, or use automated means to access the Service</li>
          <li>Resell or sublicense the Service without authorization</li>
          <li>Use AI features to generate fraudulent dispute claims</li>
        </ul>
        <p>
          Violation of these rules may result in immediate account termination without notice.
        </p>
      </section>

      <section id="intellectual-property">
        <h2>Intellectual Property</h2>
        <p>
          The ShiftFlow App, Website, and all associated content — including software, design, text, graphics, and AI models — are owned by or licensed to ShiftFlow and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes in accordance with these Terms.
        </p>
        <p>
          You retain ownership of the data you input into ShiftFlow (your shift logs, earnings data, etc.). By using the Service, you grant us a limited license to process this data solely to provide you with the Service.
        </p>
      </section>

      <section id="disclaimer">
        <h2>Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, SHIFTFLOW DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant that the Service will be error-free, uninterrupted, or free from viruses. We do not warrant the accuracy of any financial calculations, tax estimates, or payroll analysis provided by the Service.
        </p>
      </section>

      <section id="limitation">
        <h2>Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SHIFTFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR LOST EARNINGS, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
        </p>
        <p>
          IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNT PAID BY YOU TO SHIFTFLOW IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
        </p>
      </section>

      <section id="indemnification">
        <h2>Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless ShiftFlow and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of the Service or violation of these Terms.
        </p>
      </section>

      <section id="termination">
        <h2>Termination</h2>
        <p>
          We may suspend or terminate your account at any time for any reason, including violation of these Terms, without prior notice. Upon termination, your right to use the Service ceases immediately.
        </p>
        <p>
          You may terminate your account at any time by deleting it through the App or contacting support. Termination does not entitle you to a refund of any prepaid subscription fees.
        </p>
      </section>

      <section id="governing-law">
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms shall be resolved through binding arbitration, except where prohibited by law.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of material changes through the App or by email. Your continued use of the Service after changes become effective constitutes your acceptance of the revised Terms.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          For questions about these Terms, please contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
