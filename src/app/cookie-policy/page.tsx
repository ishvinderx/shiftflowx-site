import LegalLayout from "@/components/legal/LegalLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How ShiftFlow uses cookies and tracking technologies on our website and in the app.",
  alternates: { canonical: "https://shiftflowx.net/cookie-policy" },
};


const toc = [
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "how-we-use", label: "How We Use Cookies" },
  { id: "types", label: "Types of Cookies" },
  { id: "third-party", label: "Third-Party Cookies" },
  { id: "mobile-app", label: "Mobile App Tracking" },
  { id: "opt-out", label: "How to Opt Out" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      effectiveDate="January 1, 2025"
      toc={toc}
    >
      <p>
        This Cookie Policy explains how ShiftFlow uses cookies and similar tracking technologies on our website (shiftflowx.net) and mobile application. It also explains your choices regarding these technologies.
      </p>

      <section id="what-are-cookies">
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently, improve user experience, and provide website owners with analytics information.
        </p>
        <p>
          Similar technologies include web beacons (also called tracking pixels), local storage, and session storage. This policy covers all of these technologies collectively referred to as &ldquo;cookies.&rdquo;
        </p>
      </section>

      <section id="how-we-use">
        <h2>How We Use Cookies</h2>
        <p>We use cookies and similar technologies for the following purposes:</p>
        <ul>
          <li><strong>Authentication:</strong> To keep you logged in and securely identify your session</li>
          <li><strong>Preferences:</strong> To remember your settings and preferences</li>
          <li><strong>Analytics:</strong> To understand how visitors use our website and where we can improve</li>
          <li><strong>Performance:</strong> To monitor and optimize the performance of our website</li>
          <li><strong>Security:</strong> To help detect and prevent fraud and unauthorized access</li>
        </ul>
        <p>
          We do not use cookies for targeted advertising or to build advertising profiles. We do not share cookie data with advertising networks.
        </p>
      </section>

      <section id="types">
        <h2>Types of Cookies We Use</h2>
        <h3>Strictly Necessary Cookies</h3>
        <p>
          These cookies are essential for the website to function and cannot be disabled. They enable core features such as page navigation, authentication, and security. Without these cookies, the website cannot function properly.
        </p>
        <ul>
          <li><strong>Session cookie:</strong> Maintains your login session</li>
          <li><strong>Security token:</strong> Protects against CSRF attacks</li>
          <li><strong>Load balancer cookie:</strong> Ensures consistent server routing</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website. All analytics data is anonymized and aggregated — it cannot be used to identify you personally.
        </p>
        <ul>
          <li><strong>Page view tracking:</strong> Records which pages are visited most</li>
          <li><strong>Traffic source:</strong> How visitors arrive at our website (e.g., search engine, direct)</li>
          <li><strong>Session duration:</strong> How long visitors spend on the site</li>
        </ul>

        <h3>Preference Cookies</h3>
        <p>
          These cookies remember your choices and settings to provide a more personalized experience.
        </p>
        <ul>
          <li><strong>Pricing toggle state:</strong> Remembers if you prefer monthly or annual pricing display</li>
          <li><strong>Theme preference:</strong> If applicable, remembers display preferences</li>
        </ul>
      </section>

      <section id="third-party">
        <h2>Third-Party Cookies</h2>
        <p>
          We use a limited number of trusted third-party services that may set their own cookies:
        </p>
        <ul>
        </ul>
        <p>
          We do not use Google Analytics, Facebook Pixel, or any advertising-related tracking cookies.
        </p>
      </section>

      <section id="mobile-app">
        <h2>Mobile App Tracking</h2>
        <p>
          The ShiftFlow mobile application does not use browser cookies. Instead, it may use equivalent technologies such as:
        </p>
        <ul>
          <li><strong>Device identifiers:</strong> Used for crash reporting and analytics (anonymized)</li>
          <li><strong>Local storage:</strong> Used to cache app data locally for offline access</li>
          <li><strong>App analytics SDK:</strong> Anonymized usage analytics to improve the app experience</li>
        </ul>
        <p>
          You can limit ad tracking and analytics on your iPhone by going to Settings → Privacy & Security → Tracking and toggling off &ldquo;Allow Apps to Request to Track.&rdquo;
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
          Please note that disabling certain cookies may affect the functionality of our website. Strictly necessary cookies cannot be disabled without breaking core features.
        </p>
        <p>Browser-specific instructions:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        </ul>

        <h3>Analytics Opt-Out</h3>
        <p>
          To opt out of anonymized analytics, please contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a> and we will add your browser to our exclusion list.
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
          If you have questions about our use of cookies or this policy, please contact us at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
