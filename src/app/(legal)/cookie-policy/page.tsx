import LegalLayout from "@/components/legal/LegalLayout";

import type { Metadata } from "next";
import { canonicalAlt } from "@/lib/seo";
import { SITE_HOST, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How HoursFlow uses cookies and tracking technologies on our website and in the app.",
  alternates: canonicalAlt("/cookie-policy"),
};


const toc = [
  { id: "what-are-cookies", label: "Cookies and Similar Technologies" },
  { id: "how-we-use", label: "Cookies Set by This Website" },
  { id: "types", label: "What the Website Stores" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "opt-out", label: "How to Opt Out" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      effectiveDate="November 14, 2026"
      toc={toc}
    >
      <p>
        HoursFlow is operated by Flowmatix Creative Inc. This Cookie Policy explains what our website ({SITE_HOST}) stores in your browser and your choices regarding it.
      </p>

      <section id="what-are-cookies">
        <h2>Cookies and Similar Technologies</h2>
        <p>
          Cookies are small text files that a website places on your device. Similar technologies include local storage and session storage, which a website can use to keep small pieces of information in your browser. This policy covers all of these.
        </p>
      </section>

      <section id="how-we-use">
        <h2>Cookies Set by This Website</h2>
        <p>
          <strong>The HoursFlow website ({SITE_HOST}) does not set any cookies.</strong> It does not use cookies for sign-in, advertising, or load balancing, and we do not use Google Analytics, Facebook Pixel, or any advertising network.
        </p>
      </section>

      <section id="types">
        <h2>What the Website Stores in Your Browser</h2>
        <h3>Analytics (only when enabled)</h3>
        <p>
          When analytics is configured, the website sends anonymous usage events for our free calculators and pages (for example, that a calculator was viewed or completed) directly to PostHog. These events never include the figures you enter. No cookie is set and no analytics script is loaded. If analytics is not configured, nothing is sent.
        </p>
        <ul>
          <li>
            <strong>sf_anon_id</strong> (sessionStorage): a random identifier used to group the events from one browsing session. It is not linked to an account, is not derived from anything you enter, and is removed when you close the tab or browser.
          </li>
        </ul>

        <h3>Referral links</h3>
        <p>
          If you open a referral link ({SITE_HOST}/ref/&hellip;), the website stores one item in your browser&apos;s localStorage. It stays on your device until you clear your browser data.
        </p>
        <ul>
          <li>
            <strong>sf_ref_code</strong> (localStorage): the referral code from the link you opened, so it is remembered on this device.
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>Third-Party Services</h2>
        <p>
          The only third-party service the website sends data to is PostHog, and only for the anonymous events described above, when analytics is enabled. If you choose to open the App Store, Apple&apos;s own policies apply on its pages.
        </p>
      </section>

      <section id="mobile-app">
        <h2>Mobile App</h2>
        <p>
          The HoursFlow mobile application does not use browser cookies. Details of the data the app collects, including analytics and crash reports, are in our <a href="/privacy">Privacy Policy</a> and <a href="/data-policy">Data Collection Policy</a>.
        </p>
      </section>

      <section id="opt-out">
        <h2>How to Opt Out</h2>
        <h3>Browser Cookies</h3>
        <p>
          You can control and manage cookies through your browser settings. Most browsers allow you to:
        </p>
        <ul>
          <li>View what cookies are stored and delete them individually or all at once</li>
          <li>Block third-party cookies</li>
          <li>Block cookies from specific websites</li>
          <li>Enable a &ldquo;Do Not Track&rdquo; signal</li>
        </ul>
        <p>
          You can clear localStorage and sessionStorage items through your browser&apos;s site-data settings. Doing so does not affect your use of the website.
        </p>
        <p>Browser-specific instructions:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        </ul>

        <h3>Analytics Opt-Out</h3>
        <p>
          To stop analytics events, you can use your browser&apos;s tracking-protection or content-blocking features, or contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date. For significant changes, we will notify you through the app or by email.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          If you have questions about our use of cookies or this policy, please contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
