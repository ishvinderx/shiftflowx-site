import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, SUPPORT_EMAIL } from "@/lib/constants";

const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export const metadata: Metadata = {
  title: "End user licence agreement",
  description: `${BRAND.name} uses Apple's standard Licensed Application End User Licence Agreement. This page explains how it fits with our terms of use.`,
  alternates: canonicalAlt("/eula"),
};

const toc = [
  { id: "standard-eula", label: "Apple's standard EULA applies" },
  { id: "our-terms", label: "How it fits with our terms" },
  { id: "contact", label: "Contact" },
];

export default function EulaPage() {
  return (
    <LegalLayout
      title="End user licence agreement"
      whatChanged="Replaced our custom licence text with a statement that Apple's standard EULA applies, so the app has one licence and not two."
      toc={toc}
    >
      <section id="standard-eula">
        <h2>Apple&rsquo;s standard EULA applies</h2>
        <p>
          Your licence to use the {BRAND.name} app is governed by Apple&rsquo;s standard <strong>Licensed Application End User Licence Agreement</strong>. You can read it here: <a href={APPLE_EULA}>{APPLE_EULA}</a>. We have not written a custom EULA.
        </p>
        <p>That agreement sets out the scope of your licence, and the roles of Apple and of us as the developer (including who handles maintenance, support, warranty claims and third-party claims). Apple is a third-party beneficiary of it.</p>
      </section>

      <section id="our-terms">
        <h2>How it fits with our terms</h2>
        <p>Our <Link href="/terms">terms of use</Link> cover the {BRAND.name} service: accounts, acceptable use, your data, the estimates the app gives you, liability and governing law. They do not replace Apple&rsquo;s EULA. If the two conflict about your licence to the app, Apple&rsquo;s standard EULA applies on that point. Subscriptions are covered in the <Link href="/subscription-terms">subscription terms</Link>, and refunds are handled by Apple (see <Link href="/refund">refunds</Link>).</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Questions about the app or this page: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </section>
    </LegalLayout>
  );
}
