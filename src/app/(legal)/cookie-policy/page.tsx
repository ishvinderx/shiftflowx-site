import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalTable from "@/components/legal/LegalTable";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, PRIVACY_EMAIL, SITE_HOST } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `What the ${BRAND.name} website stores in your browser: no cookies, one remembered referral code if you open a referral link, and optional anonymous calculator counts that respect Do Not Track.`,
  alternates: canonicalAlt("/cookie-policy"),
};

const toc = [
  { id: "summary", label: "In short" },
  { id: "stored", label: "What the website stores" },
  { id: "analytics", label: "Anonymous counts" },
  { id: "third-party", label: "Third parties" },
  { id: "app", label: "The app" },
  { id: "choices", label: "Your choices" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie policy"
      whatChanged="Rewritten to match exactly what the site does. The website no longer keeps any identifier in your browser for analytics, and it does not measure visitors who send Do Not Track or Global Privacy Control."
      toc={toc}
    >
      <section id="summary">
        <h2>In short</h2>
        <ul>
          <li>The website ({SITE_HOST}) sets <strong>no cookies</strong>.</li>
          <li>It uses no advertising or tracking scripts, no social-media pixels and no Google Analytics. It has no cookie banner, because it does not need one.</li>
          <li>The only thing it stores in your browser is a referral code, and only if you open a referral link.</li>
          <li>If we switch on anonymous calculator counts, nothing is stored on your device for them, and visitors who send Do Not Track or Global Privacy Control are not counted.</li>
        </ul>
      </section>

      <section id="stored">
        <h2>What the website stores</h2>
        <LegalTable caption="Items the website stores in your browser">
          <thead>
            <tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">When</th><th scope="col">Purpose</th><th scope="col">Lasts</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">sf_ref_code</th>
              <td>localStorage</td>
              <td>Only if you open a referral link ({SITE_HOST}/ref/&hellip;).</td>
              <td>Remembers the referral code from that link so it can be applied when you sign up. It is a feature you asked for by opening the link.</td>
              <td>Until you clear your browser data.</td>
            </tr>
          </tbody>
        </LegalTable>
        <p>Nothing else is stored. Support and delete forms send what you type to us when you submit them and keep no copy in your browser.</p>
      </section>

      <section id="analytics">
        <h2>Anonymous counts</h2>
        <p>
          When switched on, the website can send an anonymous event to PostHog when someone views or uses a calculator (for example, &ldquo;calculator viewed&rdquo;, the calculator name, its category and, for tax calculators, the province). It never sends the figures you type or any result. The event carries a random identifier that lives only in the page&rsquo;s memory and disappears when you leave or reload the page. It is not saved in a cookie, localStorage or sessionStorage and is not linked to an account. PostHog does receive your IP address as part of the request, as every website does.
        </p>
        <p>
          We do not measure visitors whose browser sends a Do Not Track or Global Privacy Control signal. Because nothing is stored on your device, we do not ask for consent to store anything. Visitors in the EU and UK are not tracked across visits, and if we later add anything that stores an identifier or follows you across visits, we will first add a consent choice.
        </p>
        <p>These counts are off unless we configure them. If they are off, nothing is sent.</p>
      </section>

      <section id="third-party">
        <h2>Third parties</h2>
        <p>The website is hosted by Vercel, which keeps ordinary request logs. We have not switched on Vercel Analytics. The only other service the website sends visitor data to is PostHog, as described above. Apple&rsquo;s policies apply on the App Store pages you open from our links. See the <Link href="/privacy#providers">privacy policy</Link> for every provider.</p>
      </section>

      <section id="app">
        <h2>The app</h2>
        <p>The {BRAND.name} app does not use browser cookies. What the app collects, including product analytics and crash reports, is in the <Link href="/privacy">privacy policy</Link>.</p>
      </section>

      <section id="choices">
        <h2>Your choices</h2>
        <p>You can turn on Do Not Track or Global Privacy Control in your browser, use content blocking, and clear site data at any time. Clearing site data only forgets the referral code.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Questions: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</p>
      </section>
    </LegalLayout>
  );
}
