import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import CompanyDetails from "@/components/legal/CompanyDetails";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, COMPANY_LOCATION, PRICING, PRIVACY_EMAIL, SITE_HOST, SUPPORT_EMAIL, TRIAL_DAYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `The terms for using the ${BRAND.name} app and website: who we are, your account, the estimates the app gives you, subscriptions, liability, governing law and how to reach us.`,
  alternates: canonicalAlt("/terms"),
};

const toc = [
  { id: "who-we-are", label: "Who we are" },
  { id: "definitions", label: "Words we use" },
  { id: "eligibility", label: "Eligibility and accounts" },
  { id: "licence", label: "Licence to use the app" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "your-content", label: "Your content and data" },
  { id: "estimates", label: "Estimates, not advice" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "third-party", label: "Third-party services" },
  { id: "availability", label: "Availability and changes" },
  { id: "termination", label: "Ending your use" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limit of liability" },
  { id: "consumer-rights", label: "Your consumer rights" },
  { id: "indemnity", label: "Misuse and indemnity" },
  { id: "governing-law", label: "Governing law and courts" },
  { id: "apple", label: "Apple" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of use"
      whatChanged="Rewritten in plain language. New: an age minimum of 16, a clear estimates section, the Free plan covering two employers, and the Apple terms that apply to the app."
      toc={toc}
    >
      <section id="who-we-are">
        <h2>Who we are</h2>
        <p>
          {BRAND.name} is an iPhone and iPad app and a website ({SITE_HOST}). {BRAND.legalEntity} operates both. In these terms, <strong>we</strong>, <strong>us</strong> and <strong>our</strong> mean {BRAND.legalEntity}, a Canadian company. <strong>You</strong> means the person using the app or website.
        </p>
        <p>
          By creating an account, using the app, or using the website, you agree to these terms. If you do not agree, do not use them. Read them together with our <Link href="/privacy">privacy policy</Link> and <Link href="/subscription-terms">subscription terms</Link>.
        </p>
        <CompanyDetails />
      </section>

      <section id="definitions">
        <h2>Words we use</h2>
        <ul>
          <li><strong>App</strong>: the {BRAND.name} app for iPhone and iPad (iOS 17 or later).</li>
          <li><strong>Website</strong>: {SITE_HOST} and its pages and free calculators.</li>
          <li><strong>Service</strong>: the app, the website and the servers behind them.</li>
          <li><strong>Your content</strong>: what you enter or upload, such as shifts, rates, expenses, receipt photos, invoices and notes.</li>
          <li><strong>Pro</strong>: the paid plan, {BRAND.proName}.</li>
        </ul>
      </section>

      <section id="eligibility">
        <h2>Eligibility and accounts</h2>
        <p>You must be at least 16 years old to use the service. The service is not for children, and we do not knowingly create accounts for anyone under 16. If we learn that an account belongs to someone under 16, we will close it and delete its data.</p>
        <p>You also need the legal capacity to agree to these terms, and you must not be barred from using the service by law.</p>
        <p>An account is required to use the app. You can sign up with an email address and password, with Sign in with Apple, or with Google. You agree to:</p>
        <ul>
          <li>give accurate information and keep it up to date;</li>
          <li>keep your sign-in details secret and tell us at once if someone else uses them;</li>
          <li>be responsible for what happens under your account.</li>
        </ul>
        <p>You can keep more than one account only if you need to. You cannot sell or transfer your account.</p>
      </section>

      <section id="licence">
        <h2>Licence to use the app</h2>
        <p>
          We give you a personal, limited, non-exclusive, non-transferable, revocable licence to install and use the app on Apple devices that you own or control, for your own use, under these terms and the usage rules of the Apple App Store. Apple&rsquo;s standard licensed-application end user licence agreement applies to this licence. See <Link href="/eula">the EULA page</Link> and the <a href="#apple">Apple section</a> below. If these terms and Apple&rsquo;s standard EULA conflict about your licence to the app, Apple&rsquo;s standard EULA wins on that point.
        </p>
        <p>We keep all rights in the service that we do not give you here. You may not copy, sell, rent, reverse engineer or build a competing product from the app or website, except where the law lets you do so despite this rule.</p>
      </section>

      <section id="acceptable-use">
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>break the law, or use the service to cheat anyone, including an employer or a tax authority;</li>
          <li>enter other people&rsquo;s personal information unless you have the right to (for example, client details on an invoice you are entitled to send);</li>
          <li>try to get into accounts, servers or data that are not yours, or test our security without our written permission (see <Link href="/security">security</Link> for how to report a problem);</li>
          <li>overload, scrape or disrupt the service, or use bots to sign up or sign in;</li>
          <li>upload malware or anything that infringes someone else&rsquo;s rights;</li>
          <li>get Pro features without paying for them, or use promo or referral codes in a way they were not meant to be used.</li>
        </ul>
      </section>

      <section id="your-content">
        <h2>Your content and data</h2>
        <p>Your content belongs to you. You give us only the permission we need to run the service for you: to store it, back it up, process it and show it to you. We do not use it to advertise to you, and we do not sell it.</p>
        <p>You are responsible for your content, including that it is accurate and that you may lawfully enter it. You can export your data and delete your account for free, in the app (Profile) or by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Our <Link href="/privacy">privacy policy</Link> explains what we collect and how we handle it.</p>
      </section>

      <section id="estimates">
        <h2>Estimates, not advice</h2>
        <p>
          {BRAND.name} works out pay, deductions, estimated after-tax figures, payday dates, tax-report totals and paycheque-check results <strong>from what you enter</strong>. All of these are estimates.
        </p>
        <ul>
          <li>They are not tax, legal, accounting, financial or employment advice. We are not a tax preparer, accountant, lawyer or payroll provider.</li>
          <li>Your records are self-reported. They are not employer documents, payslips or official records, and an employer, tax authority or court may not accept them.</li>
          <li>Tax rates, rules, overtime rules and deadlines change and differ by place and by person. We may not have the rule that applies to you, and it may be out of date.</li>
          <li>The paycheque check compares your entries with a payslip you type in. A difference is a prompt to ask questions. It does not prove that you were underpaid.</li>
        </ul>
        <p>Check figures against your payslips and official sources, and speak to a qualified professional before you rely on an estimate for a tax return, a dispute or a financial decision. We are not responsible for decisions you make using an estimate, except as the law requires.</p>
      </section>

      <section id="subscriptions">
        <h2>Subscriptions</h2>
        <p>
          The Free plan covers two active employers and the last 30 days of history. {BRAND.proName} costs US${PRICING.monthly.price.toFixed(2)} a month or US${PRICING.annual.price.toFixed(2)} a year, with a {TRIAL_DAYS}-day free trial for new subscribers. Pro is bought only through Apple in-app purchase, renews automatically, and is managed and cancelled in your Apple ID settings. Apple handles refunds. Full details, including how to cancel and what happens if you stop paying, are in the <Link href="/subscription-terms">subscription terms</Link> and the <Link href="/refund">refund page</Link>. If a subscription lapses, we do not delete your records.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-party services</h2>
        <p>The service relies on others, including Apple (sign-in, purchases, iCloud), Google (sign-in), and the providers listed in our <Link href="/privacy#providers">privacy policy</Link>. Their terms apply to your use of their services, and you must follow them. We are not responsible for their services. The website may link to other sites that we do not control.</p>
      </section>

      <section id="availability">
        <h2>Availability and changes</h2>
        <p>We work to keep the service running, but we do not promise that it will always be available or free of errors. We may change, add or remove features, change which features are Free or Pro, and stop the service. We will give you reasonable notice of a change that matters, and we will not take away the Pro features of a period you have already paid for. If we end the service, we will give you time to export your data.</p>
      </section>

      <section id="termination">
        <h2>Ending your use</h2>
        <p>You can stop at any time by deleting your account in the app (Profile) or by emailing us. Deleting your account does not cancel an Apple subscription; cancel that in your Apple ID settings first.</p>
        <p>We may suspend or close your account if you break these terms, put the service or other people at risk, or if the law requires it. Where we reasonably can, we will tell you why and give you a chance to fix the problem first.</p>
        <p>When an account is deleted, it is closed at once and its data is deleted after a 30-day grace period, apart from the records described in the <Link href="/privacy#retention">privacy policy</Link>. During that period you can ask us to restore the account by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Sections that by their nature should continue (such as liability, governing law and the estimates section) continue after the account ends.</p>
      </section>

      <section id="disclaimers">
        <h2>Disclaimers</h2>
        <p>The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent the law allows, we give no warranty that the service will be uninterrupted, error-free or secure, or that an estimate or any other output is accurate, complete or fit for a particular purpose. Nothing in this section limits a warranty or condition that the law says cannot be excluded.</p>
      </section>

      <section id="liability">
        <h2>Limit of liability</h2>
        <p>To the extent the law allows, we are not liable for indirect or consequential loss, or for loss of profit, income, data or goodwill, arising from your use of the service. To the extent the law allows, our total liability to you for any claim about the service is limited to the greater of (a) what you paid us through Apple for Pro in the 12 months before the claim and (b) CAD $100.</p>
        <p>None of this limits liability that the law does not allow us to limit, including liability for death or personal injury, for fraud or fraudulent misrepresentation, for gross negligence or intentional fault, or for anything else that cannot be limited under the law of the place where you live.</p>
      </section>

      <section id="consumer-rights">
        <h2>Your consumer rights</h2>
        <p>These terms give you rights in addition to, and do not take away, any consumer-protection rights that cannot be waived where you live. In particular, if you are a consumer:</p>
        <ul>
          <li><strong>Ontario:</strong> nothing here limits your rights under the Consumer Protection Act, 2002.</li>
          <li><strong>Quebec:</strong> nothing here limits your rights under the Consumer Protection Act (Quebec), including the rules on contracts concluded at a distance and on fixed-term and renewable services. A clause that the Act makes unenforceable against you does not apply to you.</li>
          <li><strong>Australia:</strong> our services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for other reasonably foreseeable loss or damage. Where the law lets us, our liability for a failure to meet a guarantee is limited to supplying the service again or paying the cost of having it supplied again.</li>
          <li><strong>United Kingdom and European Union:</strong> you keep the statutory rights you have under the law of the place where you live, including the right to bring a claim in your local courts.</li>
        </ul>
        <p>Apple, not us, takes payment and handles refunds for subscriptions. Your statutory rights against Apple are not affected by these terms.</p>
      </section>

      <section id="indemnity">
        <h2>Misuse and indemnity</h2>
        <p>If you misuse the service, for example by breaking the acceptable-use rules or by entering content you had no right to enter, and a third party makes a claim against us because of that, you agree to cover our reasonable losses from that claim. This applies only to your misuse. It does not apply to claims caused by us, and it does not apply where the law protects you as a consumer.</p>
      </section>

      <section id="governing-law">
        <h2>Governing law and courts</h2>
        <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there. The courts of Ontario have jurisdiction over disputes about them. This is subject to any consumer-protection rights that cannot be waived where you live. In particular, if you are a consumer living in Quebec, you may bring a claim in the courts of your place of residence, and if you live in another country, you keep any right you have to use your local courts.</p>
        <p>Before you start a court case, please write to us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> so we can try to fix it.</p>
      </section>

      <section id="apple">
        <h2>Apple</h2>
        <p>The app is distributed through the Apple App Store. Apple&rsquo;s standard Licensed Application End User Licence Agreement applies to the app (see <Link href="/eula">EULA</Link>). These terms are our terms for the service and do not replace it. Under the App Store rules:</p>
        <ul>
          <li>These terms are between you and {BRAND.legalEntity}, not Apple. We, not Apple, are responsible for the app and its content.</li>
          <li>Your licence is a non-transferable licence to use the app on Apple devices you own or control, as the Apple Media Services terms allow, including through Family Sharing where it is available.</li>
          <li>We, not Apple, are responsible for maintenance and support. Apple has no duty to give any. To reach us, see <a href="#contact">Contact</a>.</li>
          <li>If the app does not meet a warranty that applies to it, you may tell Apple and Apple will refund the purchase price of the app. Apple has no other warranty duty about the app. We are responsible for any other claim, loss or cost caused by a failure to meet a warranty.</li>
          <li>We, not Apple, handle claims about the app, including product liability, a failure to meet a legal requirement, and consumer-protection claims. We, not Apple, handle third-party claims that the app infringes intellectual property rights.</li>
          <li>You confirm that you are not in a country under a U.S. Government embargo or designated as a &ldquo;terrorist supporting&rdquo; country, and that you are not on a U.S. Government list of prohibited or restricted parties.</li>
          <li>You must follow the terms of any third-party agreements that apply when you use the app, such as your mobile data plan.</li>
          <li>Apple and its subsidiaries are third-party beneficiaries of Apple&rsquo;s standard EULA. When you accept it, Apple can enforce it against you.</li>
        </ul>
      </section>

      <section id="changes">
        <h2>Changes to these terms</h2>
        <p>We may update these terms, for example when the law or the service changes. We will post the new version here with a new date and a line saying what changed. For a change that matters, we will also tell you in the app or by email at least 30 days before it applies, unless a legal or security reason means it must apply sooner. If you do not agree, you can stop using the service and delete your account. Using the service after the change takes effect means you accept it.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Questions or complaints about these terms: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. For privacy: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We are based in {COMPANY_LOCATION}. For a postal address for legal notices, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </section>
    </LegalLayout>
  );
}
