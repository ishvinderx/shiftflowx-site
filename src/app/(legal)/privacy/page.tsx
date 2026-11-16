import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalTable from "@/components/legal/LegalTable";
import CompanyDetails from "@/components/legal/CompanyDetails";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, COMPANY_LOCATION, PRIVACY_EMAIL, PRIVACY_OFFICER, SITE_HOST, SUPPORT_EMAIL } from "@/lib/constants";
import { BACKUP_RETENTION_DAYS, DATA_CATEGORIES, DATA_RETENTION_GRACE_DAYS, PROVIDERS, SCANNING_FACT } from "@/content/dataPractices";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${BRAND.name} collects, uses, shares and protects personal information, how long we keep it, and how to use your rights under Canadian, Quebec, EU, UK and California law.`,
  alternates: canonicalAlt("/privacy"),
};

const toc = [
  { id: "who", label: "Who is responsible" },
  { id: "summary", label: "In short" },
  { id: "collect", label: "What we collect" },
  { id: "device", label: "Device features" },
  { id: "scanning", label: "Receipts and payslips" },
  { id: "use", label: "How we use it" },
  { id: "providers", label: "Who processes it" },
  { id: "transfers", label: "Transfers abroad" },
  { id: "retention", label: "How long we keep it" },
  { id: "security", label: "Security and breaches" },
  { id: "email", label: "Emails" },
  { id: "children", label: "Children" },
  { id: "rights", label: "Your rights" },
  { id: "canada", label: "Canada: PIPEDA" },
  { id: "quebec", label: "Quebec: Law 25" },
  { id: "eu-uk", label: "EU and UK: GDPR" },
  { id: "california", label: "California: CCPA and CPRA" },
  { id: "complaints", label: "Complaints" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      whatChanged="Rewritten from scratch. New: a table of what we collect and why, a list of every service provider, how long we keep each kind of data, and a section for each privacy law that may apply to you."
      toc={toc}
    >
      <section id="who">
        <h2>Who is responsible</h2>
        <p>{BRAND.legalEntity}, based in {COMPANY_LOCATION}, is the organisation responsible for your personal information when you use the {BRAND.name} app and the website ({SITE_HOST}). Under the EU and UK GDPR we are the <strong>controller</strong>. Under California law we are the <strong>business</strong>. In this policy <strong>we</strong> means {BRAND.legalEntity} and <strong>you</strong> means the person using the app or website.</p>
        <p>The person responsible for protecting personal information, and for Quebec&rsquo;s Law 25, is the <strong>{PRIVACY_OFFICER}</strong>: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We have not appointed a data protection officer under the GDPR, because the law does not require one for us. For a postal address for legal notices, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
        <CompanyDetails />
      </section>

      <section id="summary">
        <h2>In short</h2>
        <ul>
          <li>You need an account. We collect what you enter (shifts, pay rates, expenses, receipts, invoices) so the app can work.</li>
          <li>We do not sell your personal information, and we do not share it for advertising. We run no ads and no tracking across other companies&rsquo; apps and sites.</li>
          <li>We do not use your location, your contacts or your advertising identifier. {BRAND.name} sends only local notifications from your device and no remote push notifications.</li>
          <li>Some sensitive fields are encrypted in our database. You can export your data and delete your account in the app (Profile), free.</li>
          <li>The pay, deduction and tax figures in the app are estimates made from what you enter. We make no automated decision about you that has a legal effect.</li>
        </ul>
      </section>

      <section id="collect">
        <h2>What we collect</h2>
        <p>The table lists each kind of information we collect, where it comes from, why we use it, our legal basis (for GDPR purposes) and how long we keep it. We collect only what is needed for these purposes.</p>
        <LegalTable caption="Personal information we collect">
          <thead>
            <tr>
              <th scope="col">Category</th><th scope="col">Examples</th><th scope="col">Source</th><th scope="col">Purpose</th><th scope="col">Legal basis</th><th scope="col">Retention</th>
            </tr>
          </thead>
          <tbody>
            {DATA_CATEGORIES.map((c) => (
              <tr key={c.id} id={`data-${c.id}`}>
                <th scope="row">{c.category}</th><td>{c.examples}</td><td>{c.source}</td><td>{c.purpose}</td><td>{c.legalBasis}</td><td>{c.retention}</td>
              </tr>
            ))}
          </tbody>
        </LegalTable>
        <p>On the website, the free calculators run in your browser and the figures you type are not sent to us. See the <Link href="/cookie-policy">cookie policy</Link> for what the website stores.</p>
        <p>We do not collect your precise or approximate location, your contacts, your health data, or your advertising identifier. We do not run advertising or sell data. Under California law, the categories of personal information we collected in the last 12 months are identifiers (name, email, account ID, IP address hash), financial information you entered (pay rates, earnings, expenses, invoices), commercial information (subscription status), internet or app activity (analytics events), user content (receipt images and notes), and, if you add them to your profile, a phone number, mailing address and date of birth. We use or disclose them only for the purposes in the table, to the providers listed below.</p>
      </section>

      <section id="device">
        <h2>Device features</h2>
        <p>The app asks your permission before it uses any of these. You can say no and still use the app, though the related feature will not work.</p>
        <ul>
          <li><strong>Camera and photo library:</strong> to scan payslips and capture receipts. See the next section for where the images go.</li>
          <li><strong>Face ID:</strong> an optional lock for the app. Face ID is handled by Apple on your device. We never receive your face data.</li>
          <li><strong>Calendar (write only):</strong> an optional feature that adds your shifts to your Apple Calendar. We do not read your calendar.</li>
          <li><strong>Notifications:</strong> reminders are scheduled on your device. We do not send remote push notifications and keep no push token.</li>
          <li><strong>iCloud:</strong> some app settings and budget and invoice records are mirrored between your own devices through Apple&rsquo;s iCloud key-value storage. The sensitive records are encrypted by the app first.</li>
          <li><strong>Widgets:</strong> read shared data on your device. They send nothing to us.</li>
        </ul>
      </section>

      <section id="scanning">
        <h2>Receipts and payslips</h2>
        <p>{SCANNING_FACT}</p>
      </section>

      <section id="use">
        <h2>How we use it</h2>
        <p>We use personal information to run and secure your account, give you the features you use, work out your estimates, take and check subscriptions, answer you, send service emails, find and fix faults, understand how the product is used, prevent fraud and abuse, and meet our legal duties. We do not use it to make automated decisions that have a legal or similarly significant effect on you, we do not build advertising profiles, and we do not use it for a new purpose without telling you and, where the law requires, asking for your consent.</p>
      </section>

      <section id="providers">
        <h2>Who processes it</h2>
        <p>We use these service providers. They process information for us under their terms and may only use it to provide their service to us, and we expect each to protect it to the standard this policy sets. Where the provider&rsquo;s region cannot be read from our settings, the table says so.</p>
        <LegalTable caption="Service providers">
          <thead>
            <tr><th scope="col">Provider</th><th scope="col">Role</th><th scope="col">What it does for us</th><th scope="col">Data it handles</th><th scope="col">Where</th></tr>
          </thead>
          <tbody>
            {PROVIDERS.map((p) => (
              <tr key={p.id} id={`provider-${p.id}`}>
                <th scope="row">{p.name}</th><td>{p.role}</td><td>{p.purpose}</td><td>{p.data}</td><td>{p.region}</td>
              </tr>
            ))}
          </tbody>
        </LegalTable>
        <p>We may also disclose information if the law requires it (for example, a court order), to protect people or our rights, or in a sale or reorganisation of our business, in which case the new owner must honour this policy. We do not sell personal information, and we do not &ldquo;share&rdquo; it for cross-context behavioural advertising as California law defines those words. We have not done either in the last 12 months.</p>
      </section>

      <section id="transfers">
        <h2>Transfers abroad</h2>
        <p>We are in Canada, and our providers process data in the United States and other countries. Your information may therefore be stored and processed outside your province or country, and be accessible to courts and authorities there under their laws. For people in Quebec, we assess the risks of such a transfer and rely on contracts with the provider before we send personal information outside Quebec. For people in the EU and UK, Canada has an adequacy decision for commercial organisations under PIPEDA; for transfers to providers elsewhere we rely on the providers&rsquo; standard contractual clauses, the UK addendum, or the EU&ndash;US Data Privacy Framework where a provider is certified. We have not yet confirmed a signed data processing agreement with every provider, and we will tell you if that changes what this section says.</p>
      </section>

      <section id="retention">
        <h2>How long we keep it</h2>
        <ul>
          <li><strong>While your account is open</strong> we keep your information so the app works. On the Free plan, records older than 30 days are hidden, not deleted. If a subscription lapses nothing is deleted.</li>
          <li><strong>When you delete your account</strong>, we close it at once and sign you out of every device. We hold the data for a {DATA_RETENTION_GRACE_DAYS}-day grace period in which you can ask us to restore the account. Then a scheduled job permanently deletes your records, your uploaded files (receipts, avatar, invoice and paycheque PDFs) and your feedback, and erases your name, email, credentials, phone, address, date of birth and other profile fields from the account row. The job checks for accounts to delete every few minutes, so deletion normally happens just after the grace period ends. If a file cannot be deleted, the job stops and tries again.</li>
          <li><strong>What we keep afterwards</strong>: an empty account row with your internal ID, dates and plan status; consent dates; our purchase-event and referral-reward records, which we keep for accounting and have no automatic deletion date; and security-log rows with the IP hash, user agent, device ID and detail fields cleared, which also have no automatic deletion date. These records no longer contain your name or email. Admin notes about you are deleted, and your email and name are redacted from admin activity records.</li>
          <li><strong>Backups</strong>: we back up the database every night and set backups to expire after {BACKUP_RETENTION_DAYS} days. Deleted data can stay in backups until they expire, and a restored backup would not bring back an account that was deleted.</li>
          <li><strong>Other providers</strong>: when we purge an account we ask RevenueCat to delete your customer record. Your PostHog profile is not deleted automatically; we delete it by hand, and we aim to do so within 30 days of the purge. Sentry, Resend and our hosting providers keep their own logs for the periods in their plans, and we have not set shorter limits.</li>
          <li><strong>Legal duties</strong>: we may keep a record longer where the law requires it or to deal with a dispute.</li>
        </ul>
        <p>See <Link href="/delete">how to delete your account</Link>.</p>
      </section>

      <section id="security">
        <h2>Security and breaches</h2>
        <p>These measures are in place today (see <Link href="/security">security</Link> for more):</p>
        <ul>
          <li>Information travels between the app, the website and our servers over HTTPS.</li>
          <li>The database fields below are encrypted with AES-256-GCM before they are stored: your name, phone, mailing address, job title and date of birth; shift and journal notes; expense notes; invoice client names and email addresses; check-in and journal text; and the stored budget, net-worth and credit-score values. Email addresses and sign-in identifiers are not encrypted, because we use them to find your account.</li>
          <li>Passwords are stored only as bcrypt hashes. Refresh tokens are stored hashed.</li>
          <li>Uploaded files sit in private storage under your own folder and are served through short-lived signed links.</li>
          <li>You can lock the app with Face ID.</li>
          <li>Actions taken in our admin console are logged.</li>
        </ul>
        <p>No system is perfectly secure. If a breach of security safeguards involves your personal information and creates a real risk of significant harm, we will tell you and the authorities as the law requires: the Office of the Privacy Commissioner of Canada under PIPEDA, the Commission d&rsquo;acc&egrave;s &agrave; l&rsquo;information du Qu&eacute;bec under Law 25, and the supervisory authority within 72 hours where the GDPR applies. We will also tell the affected people without undue delay, and we keep a record of every breach.</p>
      </section>

      <section id="email">
        <h2>Emails</h2>
        <p>We send you account emails (verify your email, reset your password, security and billing notices). We may also send a small number of product emails, such as reminders, tips and a notice before a trial ends. Each product email has an unsubscribe link, and you can opt out at any time without affecting account emails. Product emails come from {BRAND.legalEntity}. See the <Link href="/terms#contact">contact details</Link>.</p>
      </section>

      <section id="children">
        <h2>Children</h2>
        <p>{BRAND.name} is not for children. You must be at least 16 to have an account, and we do not knowingly collect information from anyone under 16. If you think a child has given us information, email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> and we will delete it. We do not sell or share the personal information of anyone under 16.</p>
      </section>

      <section id="rights">
        <h2>Your rights</h2>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li><strong>access</strong> your information and get a copy, and to <strong>portability</strong> (a machine-readable copy);</li>
          <li><strong>correct</strong> information that is wrong or incomplete;</li>
          <li><strong>delete</strong> your information;</li>
          <li><strong>withdraw consent</strong> and <strong>object</strong> to, or <strong>restrict</strong>, some uses;</li>
          <li><strong>know</strong> what we collect, use and disclose, and be told if a decision about you was made only by automated means (we make none);</li>
          <li>ask us to stop disclosing your information or to de-index it, where Quebec law gives you that right;</li>
          <li>not be treated worse for using your rights (non-discrimination).</li>
        </ul>
        <p><strong>How to use them.</strong> You can export your data and delete your account yourself in the app (Profile). You can fix most details in the app. For anything else, email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> from the email address on your account. We may ask you to prove who you are, and we will reply within 30 days (or sooner if the law sets a shorter time). If we cannot do what you ask, we will tell you why. There is no charge, unless a request is clearly unfounded or repeated, and then we will explain any fee first. You can also ask an <strong>authorised agent</strong> to act for you. We will ask for your written permission and may verify your identity with you directly.</p>
      </section>

      <section id="canada">
        <h2>Canada: PIPEDA</h2>
        <p>Canada&rsquo;s Personal Information Protection and Electronic Documents Act sets ten principles. This is how we meet each.</p>
        <ol>
          <li><strong>Accountability.</strong> We are responsible for the personal information we hold, including with providers. The {PRIVACY_OFFICER} oversees this policy.</li>
          <li><strong>Identifying purposes.</strong> The collection table above says why we collect each kind of information, before or when we collect it.</li>
          <li><strong>Consent.</strong> We ask for your consent when you create an account and accept this policy, and again for camera, photo, calendar and notification access. You can withdraw consent at any time, subject to legal and contract limits, by deleting your account or writing to us. Doing so may mean we cannot give you the service.</li>
          <li><strong>Limiting collection.</strong> We collect only what we need. Phone, address, date of birth and job title are optional.</li>
          <li><strong>Limiting use, disclosure and retention.</strong> We use information only for the stated purposes, share it only with the providers above, and keep it only as long as the retention section says.</li>
          <li><strong>Accuracy.</strong> You enter most information yourself and can correct it in the app.</li>
          <li><strong>Safeguards.</strong> See security above.</li>
          <li><strong>Openness.</strong> This policy and our contact details are public.</li>
          <li><strong>Individual access.</strong> You can ask for access to your information and challenge its accuracy.</li>
          <li><strong>Challenging compliance.</strong> Write to the {PRIVACY_OFFICER}. If you are not satisfied you can complain to the Office of the Privacy Commissioner of Canada (priv.gc.ca).</li>
        </ol>
      </section>

      <section id="quebec">
        <h2>Quebec: Law 25</h2>
        <ul>
          <li><strong>Person responsible:</strong> the {PRIVACY_OFFICER}, <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</li>
          <li><strong>Transfers outside Quebec:</strong> our providers are outside Quebec, in the United States and elsewhere. See Transfers abroad above.</li>
          <li><strong>Automated decisions:</strong> we use none that are based exclusively on automated processing of your personal information to make a decision about you. The estimates in the app are tools for you, not decisions about you.</li>
          <li><strong>Profiling and tracking technology:</strong> we use product analytics and crash reports as described above. We do not profile you for advertising. Our app has no setting yet to switch analytics off; to object, write to us.</li>
          <li><strong>Your rights:</strong> access, correction, portability (a copy in a structured, commonly used format), withdrawing consent, and asking us to stop disseminating your information or to de-index it where the law applies.</li>
          <li><strong>Incidents:</strong> we notify the Commission d&rsquo;acc&egrave;s &agrave; l&rsquo;information and the people concerned when an incident presents a risk of serious injury, and we keep a register of incidents.</li>
        </ul>
      </section>

      <section id="eu-uk">
        <h2>EU and UK: GDPR</h2>
        <ul>
          <li><strong>Controller:</strong> {BRAND.legalEntity}, {COMPANY_LOCATION}. Contact: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We have no EU or UK representative appointed yet. We do not have a data protection officer.</li>
          <li><strong>Legal bases:</strong> shown for each purpose in the collection table: contract, legitimate interests, legal obligation and, for some emails, consent.</li>
          <li><strong>Legitimate interests</strong> are product analytics and crash reports, security, support records and referral counting. You may object at any time.</li>
          <li><strong>Recipients:</strong> the providers listed above.</li>
          <li><strong>International transfers:</strong> see Transfers abroad above.</li>
          <li><strong>Retention:</strong> per category in the table and in How long we keep it.</li>
          <li><strong>Your rights:</strong> access, rectification, erasure, restriction, portability, objection, withdrawing consent, and not being subject to a decision based solely on automated processing with legal or similar effects. We make no such decision.</li>
          <li><strong>Complaints:</strong> you can complain to your local supervisory authority. In the UK that is the Information Commissioner&rsquo;s Office (ico.org.uk). We would like the chance to help first.</li>
          <li>Providing the personal information needed to create an account is a requirement of the contract. Without it we cannot provide the app.</li>
        </ul>
      </section>

      <section id="california">
        <h2>California: CCPA and CPRA</h2>
        <ul>
          <li><strong>Collected in the last 12 months:</strong> the categories listed under What we collect, from you, from Apple or Google when you use their sign-in, and from our providers.</li>
          <li><strong>Purposes:</strong> those in the collection table.</li>
          <li><strong>Disclosed for a business purpose:</strong> to the providers above, as service providers, for the purposes they serve.</li>
          <li><strong>Sale or sharing:</strong> we do not sell personal information and do not share it for cross-context behavioural advertising, and we have not in the last 12 months.</li>
          <li><strong>Sensitive personal information:</strong> account sign-in details and financial information you enter are the nearest we hold. We use them only to provide the app and as the law allows, and not to infer characteristics about you.</li>
          <li><strong>Your rights:</strong> know, access and correct, delete, opt out of sale or sharing (not needed, since we do neither), limit use of sensitive information (we use it only for permitted purposes), and non-discrimination. See Your rights for how to ask, including through an authorised agent. If we deny a request, you may appeal by replying to our answer.</li>
          <li>We do not respond to a browser &ldquo;Do Not Track&rdquo; signal in the app, but our website&rsquo;s optional analytics honour it (see the <Link href="/cookie-policy">cookie policy</Link>).</li>
        </ul>
      </section>

      <section id="complaints">
        <h2>Complaints</h2>
        <p>Tell us first at <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. You may also contact the Office of the Privacy Commissioner of Canada, the Commission d&rsquo;acc&egrave;s &agrave; l&rsquo;information du Qu&eacute;bec, your EU or UK supervisory authority, or the California Attorney General.</p>
      </section>

      <section id="changes">
        <h2>Changes</h2>
        <p>We will post any change here with a new date and a line saying what changed. For a change that matters we will also tell you in the app or by email before it applies, and ask for your consent again where the law requires it.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>{PRIVACY_OFFICER}<br />{COMPANY_LOCATION}<br /><a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a></p>
        <p>For a postal address for legal notices, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. General support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </section>
    </LegalLayout>
  );
}
