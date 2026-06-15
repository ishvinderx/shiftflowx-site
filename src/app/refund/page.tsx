import LegalLayout from "@/components/legal/LegalLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "apple-refunds", label: "Apple App Store Refunds" },
  { id: "eligibility", label: "Refund Eligibility" },
  { id: "how-to-request", label: "How to Request" },
  { id: "processing", label: "Processing Time" },
  { id: "exceptions", label: "Exceptions" },
  { id: "contact", label: "Contact" },
];

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      effectiveDate="January 1, 2025"
      toc={toc}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          ShiftFlow subscriptions are sold exclusively through the Apple App Store. As a result, all purchase transactions, billing, and refund processing are handled entirely by Apple Inc., not by ShiftFlow directly.
        </p>
        <p>
          This Refund Policy explains how refunds work for ShiftFlow purchases, who to contact for refund requests, and what you can expect.
        </p>
      </section>

      <section id="apple-refunds">
        <h2>Apple App Store Refunds</h2>
        <p>
          Because ShiftFlow is distributed through the Apple App Store, all financial transactions — including subscription charges and refunds — are governed by Apple&apos;s Media Services Terms and Conditions and Apple&apos;s refund policies.
        </p>
        <p>
          <strong>ShiftFlow cannot process, approve, or deny refunds directly.</strong> Only Apple has the ability to issue refunds for App Store purchases.
        </p>
        <p>
          Apple reviews each refund request individually. Approval or denial of refund requests is at Apple&apos;s sole discretion.
        </p>
      </section>

      <section id="eligibility">
        <h2>Refund Eligibility</h2>
        <p>
          While Apple makes the final determination on all refunds, refund requests are generally considered in the following circumstances:
        </p>
        <ul>
          <li>The purchase was made by mistake (accidental subscription)</li>
          <li>The App does not work as described and support was unable to resolve the issue</li>
          <li>You were charged after attempting to cancel before the renewal date</li>
          <li>A family member made the purchase without authorization</li>
          <li>Duplicate charges occurred for the same subscription period</li>
        </ul>
        <p>
          Refund requests are generally <strong>not</strong> approved for:
        </p>
        <ul>
          <li>Unused subscription time after cancellation (subscriptions continue until the end of the paid period)</li>
          <li>Requests made long after the charge (typically more than 90 days)</li>
          <li>Dissatisfaction with the free trial experience before converting to a paid plan</li>
        </ul>
        <p>
          Note that ShiftFlow offers a completely free 30-day trial with no credit card required, which gives you ample opportunity to evaluate the product before committing to a paid plan.
        </p>
      </section>

      <section id="how-to-request">
        <h2>How to Request a Refund</h2>
        <p>To submit a refund request to Apple:</p>
        <ol>
          <li>
            Visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer"><strong>reportaproblem.apple.com</strong></a>
          </li>
          <li>Sign in with the Apple ID used to purchase the ShiftFlow subscription</li>
          <li>Find the ShiftFlow charge in your purchase history</li>
          <li>Tap or click &ldquo;Report a Problem&rdquo; next to the charge</li>
          <li>Select the appropriate reason for your refund request</li>
          <li>Provide any additional details that support your request</li>
          <li>Submit your request</li>
        </ol>
        <p>
          Alternatively, you can contact Apple Support directly at <a href="https://support.apple.com" target="_blank" rel="noopener noreferrer">support.apple.com</a> or through the Apple Support app on your iPhone.
        </p>
      </section>

      <section id="processing">
        <h2>Processing Time</h2>
        <p>
          Apple typically processes refund requests within 3–10 business days. If your request is approved, the refund will be credited to the original payment method on file with your Apple ID account.
        </p>
        <p>
          After approval, allow an additional 5–7 business days for the refund to appear on your statement, depending on your bank or card issuer.
        </p>
      </section>

      <section id="exceptions">
        <h2>Exceptions &amp; Special Circumstances</h2>
        <p>
          If you believe you have been charged incorrectly due to a technical error on ShiftFlow&apos;s part, please contact us first at <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a>. We will investigate and, if an error is confirmed, work with Apple to facilitate a refund on your behalf.
        </p>
        <p>
          For subscription-related technical issues — such as features not working or access not being granted after payment — please contact our support team before requesting a refund. We are committed to resolving technical issues promptly.
        </p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          For questions about this Refund Policy or for help with a billing issue:
        </p>
        <ul>
          <li><strong>ShiftFlow Support:</strong> <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a></li>
          <li><strong>Apple Refund Portal:</strong> <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a></li>
          <li><strong>Apple Support:</strong> <a href="https://support.apple.com" target="_blank" rel="noopener noreferrer">support.apple.com</a></li>
        </ul>
      </section>
    </LegalLayout>
  );
}
