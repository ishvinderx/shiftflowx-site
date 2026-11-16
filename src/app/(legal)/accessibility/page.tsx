import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import CompanyDetails from "@/components/legal/CompanyDetails";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Our accessibility commitment for the ${BRAND.name} website and app, what we know falls short, and how to tell us about a barrier.`,
  alternates: canonicalAlt("/accessibility"),
};

const toc = [
  { id: "commitment", label: "Our commitment" },
  { id: "status", label: "Where we are" },
  { id: "known", label: "What we have not done" },
  { id: "feedback", label: "Tell us about a barrier" },
  { id: "company", label: "Company details" },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout
      title="Accessibility"
      whatChanged="New page."
      toc={toc}
    >
      <section id="commitment">
        <h2>Our commitment</h2>
        <p>We want everyone who is paid by the hour to be able to use {BRAND.name}. We aim for the website to meet the Web Content Accessibility Guidelines (WCAG) 2.1 level AA, and we build the app with Apple&rsquo;s accessibility tools.</p>
      </section>

      <section id="status">
        <h2>Where we are</h2>
        <ul>
          <li>The website has a skip-to-content link, headings in order, visible keyboard focus,. It respects the reduced-motion setting.</li>
          <li>The app labels many of its controls for VoiceOver and uses system controls where it can. We have not tested every screen.</li>
        </ul>
      </section>

      <section id="known">
        <h2>What we have not done</h2>
        <p>We have not had an independent accessibility audit of the website or the app, so we do not claim full conformance with WCAG or any other standard. Some charts, sample images and screens may be harder to use with assistive technology than they should be.</p>
      </section>

      <section id="feedback">
        <h2>Tell us about a barrier</h2>
        <p>If something does not work for you, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the page or screen, what you tried, and the assistive technology you use. We will reply and tell you what we can do. You can also ask us for information in another format.</p>
      </section>

      <section id="company" className="company">
        <h2>Company details</h2>
        <CompanyDetails heading={false} />
      </section>
    </LegalLayout>
  );
}
