import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refunds",
  description: `How refunds work for ${BRAND.proName}: Apple handles them, how to ask Apple for one, and how your statutory rights are protected.`,
  alternates: canonicalAlt("/refund"),
};

const toc = [
  { id: "apple-handles", label: "Apple handles refunds" },
  { id: "how-to-request", label: "How to ask for a refund" },
  { id: "trial", label: "Free trials" },
  { id: "rights", label: "Your statutory rights" },
  { id: "help", label: "Help from us" },
];

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refunds"
      whatChanged="Rewritten in plain language. No change to how refunds work: Apple still handles them."
      toc={toc}
    >
      <section id="apple-handles">
        <h2>Apple handles refunds</h2>
        <p>You buy {BRAND.proName} through Apple, and Apple takes the payment. So Apple, not us, decides on and pays refunds. We cannot refund a purchase made through the App Store, and we cannot see your payment details.</p>
      </section>

      <section id="how-to-request">
        <h2>How to ask for a refund</h2>
        <ol>
          <li>Go to <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> and sign in with the Apple ID you used to subscribe.</li>
          <li>Choose &ldquo;I&rsquo;d like to&rdquo;, then &ldquo;Request a refund&rdquo;.</li>
          <li>Pick {BRAND.name} and the charge, give a reason, and submit.</li>
        </ol>
        <p>Apple reviews each request and tells you the result. Cancelling a subscription stops future charges but does not by itself refund a charge already made. See <Link href="/subscription-terms#cancel">how to cancel</Link>.</p>
      </section>

      <section id="trial">
        <h2>Free trials</h2>
        <p>You are not charged during the free trial. If you cancel at least 24 hours before it ends, there is nothing to refund.</p>
      </section>

      <section id="rights">
        <h2>Your statutory rights</h2>
        <p>This page does not limit any consumer right that the law gives you and that cannot be waived, such as rights under the consumer-protection laws of Ontario, Quebec, the European Union, the United Kingdom or Australia. If you have such a right against us, you can use it by writing to us.</p>
      </section>

      <section id="help">
        <h2>Help from us</h2>
        <p>If Apple&rsquo;s process does not work for you, or you think something went wrong in the app, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We can help you with your request, but the decision on a refund is Apple&rsquo;s.</p>
      </section>
    </LegalLayout>
  );
}
