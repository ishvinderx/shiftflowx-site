import LegalLayout from "@/components/legal/LegalLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description: "The End User License Agreement (EULA) governing your use of the ShiftFlow iOS app.",
  alternates: { canonical: "https://shiftflowx.net/eula" },
};


const toc = [
  { id: "acknowledgement", label: "Acknowledgement" },
  { id: "scope", label: "Scope of License" },
  { id: "consent-data", label: "Consent to Use of Data" },
  { id: "third-party-terms", label: "Third-Party Terms" },
  { id: "third-party-beneficiary", label: "Third-Party Beneficiary" },
  { id: "warranties", label: "Warranty Disclaimer" },
  { id: "liability", label: "Liability Limitation" },
  { id: "external-services", label: "External Services" },
  { id: "termination", label: "Termination" },
  { id: "contact", label: "Contact" },
];

export default function EulaPage() {
  return (
    <LegalLayout
      title="End User License Agreement (EULA)"
      effectiveDate="January 1, 2025"
      toc={toc}
    >
      <p>
        This End User License Agreement (&ldquo;EULA&rdquo;) is a legal agreement between you and ShiftFlow (&ldquo;Licensor&rdquo;) for the use of the ShiftFlow mobile application (&ldquo;Application&rdquo;). This EULA incorporates by reference the Apple Media Services Terms and Conditions (&ldquo;App Store Terms&rdquo;).
      </p>

      <section id="acknowledgement">
        <h2>Acknowledgement</h2>
        <p>
          By downloading or using the Application, you acknowledge that:
        </p>
        <ul>
          <li>This EULA is concluded between you and ShiftFlow only, and not with Apple Inc. (&ldquo;Apple&rdquo;)</li>
          <li>ShiftFlow, not Apple, is solely responsible for the Application and its content</li>
          <li>Apple has no obligation to furnish any maintenance or support services with respect to the Application</li>
          <li>You have read, understood, and agree to be bound by this EULA</li>
        </ul>
      </section>

      <section id="scope">
        <h2>Scope of License</h2>
        <p>
          ShiftFlow grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Application on any Apple-branded device that you own or control and as permitted by the App Store Terms.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Copy or redistribute the Application</li>
          <li>Modify, translate, adapt, or create derivative works of the Application</li>
          <li>Reverse engineer, disassemble, or decompile the Application</li>
          <li>Remove or circumvent any proprietary notices or labels</li>
          <li>Use the Application for any unlawful purpose or in violation of this EULA</li>
          <li>Transfer, sublicense, rent, or lend the Application to any third party</li>
        </ul>
      </section>

      <section id="consent-data">
        <h2>Consent to Use of Data</h2>
        <p>
          You agree that ShiftFlow may collect and use technical data and related information — including but not limited to technical information about your device, system, application software, and peripherals — that is gathered periodically to facilitate the provision of software updates, product support, and other services related to the Application.
        </p>
        <p>
          ShiftFlow may use this information, as long as it is in a form that does not personally identify you, to improve its products or provide services or technologies to you. For details on data collection practices, please review our <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>

      <section id="third-party-terms">
        <h2>Third-Party Terms of Service</h2>
        <p>
          You must comply with applicable third-party terms of service when using the Application. This includes but is not limited to:
        </p>
        <ul>
          <li>Apple&apos;s Terms and Conditions when using the Application on Apple devices</li>
          <li>Terms of any third-party AI or analytics services integrated within the Application</li>
        </ul>
      </section>

      <section id="third-party-beneficiary">
        <h2>Third-Party Beneficiary</h2>
        <p>
          You acknowledge and agree that Apple, and Apple&apos;s subsidiaries, are third-party beneficiaries of this EULA, and that, upon your acceptance of the terms and conditions of this EULA, Apple will have the right (and will be deemed to have accepted the right) to enforce this EULA against you as a third-party beneficiary thereof.
        </p>
      </section>

      <section id="warranties">
        <h2>Warranty Disclaimer</h2>
        <p>
          In the event of any failure of the Application to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the Application to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the Application, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty will be ShiftFlow&apos;s sole responsibility.
        </p>
        <p>
          THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. SHIFTFLOW EXPRESSLY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO THE APPLICATION, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES AND/OR CONDITIONS OF MERCHANTABILITY, OF SATISFACTORY QUALITY, OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY, OF QUIET ENJOYMENT, AND OF NON-INFRINGEMENT OF THIRD-PARTY RIGHTS.
        </p>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>
          To the extent not prohibited by law, in no event shall ShiftFlow be liable for personal injury, or any incidental, special, indirect, or consequential damages whatsoever, including, without limitation, damages for loss of profits, loss of data, business interruption, or any other commercial damages or losses, arising out of or related to your use of or inability to use the Application, however caused, regardless of the theory of liability (contract, tort, or otherwise) and even if ShiftFlow has been advised of the possibility of such damages.
        </p>
        <p>
          ShiftFlow shall not be liable for any claims that the Application or your possession and use thereof infringes a third party&apos;s intellectual property rights. Apple is not responsible for the investigation, defense, settlement, or discharge of any such intellectual property infringement claim.
        </p>
      </section>

      <section id="external-services">
        <h2>External Services</h2>
        <p>
          The Application may enable access to ShiftFlow&apos;s and/or third-party services and websites (collectively and individually, &ldquo;External Services&rdquo;). Use of External Services requires Internet access, and use of certain External Services may require you to accept additional terms.
        </p>
        <p>
          You understand that by using any External Services, you may encounter content that may be deemed offensive, indecent, or objectionable. Nonetheless, you agree to use External Services at your sole risk. ShiftFlow is not responsible for any content or services on External Services.
        </p>
      </section>

      <section id="termination">
        <h2>Termination</h2>
        <p>
          This EULA is effective until terminated by you or ShiftFlow. Your rights under this EULA will terminate automatically without notice from ShiftFlow if you fail to comply with any of its terms. Upon termination, you shall cease all use of the Application and destroy all copies, full or partial, of the Application.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Information</h2>
        <p>
          If you have any questions, complaints, or claims with respect to the Application, please direct them to:
        </p>
        <p>
          <strong>ShiftFlow Support</strong><br />
          Email: <a href="mailto:support@shiftflowx.net">support@shiftflowx.net</a><br />
          Website: <a href="/support">shiftflowx.net/support</a>
        </p>
      </section>
    </LegalLayout>
  );
}
