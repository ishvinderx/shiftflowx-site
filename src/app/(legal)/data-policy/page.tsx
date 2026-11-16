import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalTable from "@/components/legal/LegalTable";
import { canonicalAlt } from "@/lib/seo";
import { BRAND, PRIVACY_EMAIL } from "@/lib/constants";
import { DATA_CATEGORIES, DATA_RETENTION_GRACE_DAYS, PROVIDERS, SCANNING_FACT } from "@/content/dataPractices";

export const metadata: Metadata = {
  title: "Data policy",
  description: `A plain summary of the data ${BRAND.name} collects, why, who processes it and how long we keep it. The privacy policy is the full version.`,
  alternates: canonicalAlt("/data-policy"),
};

const toc = [
  { id: "summary", label: "Summary" },
  { id: "table", label: "What and why" },
  { id: "not-collected", label: "What we do not collect" },
  { id: "who", label: "Who processes it" },
  { id: "control", label: "Your control" },
];

export default function DataPolicyPage() {
  return (
    <LegalLayout
      title="Data policy"
      whatChanged="Now a short summary built from the same source as the privacy policy, so the two agree. Removed push notification tokens: the app does not use them."
      toc={toc}
    >
      <section id="summary">
        <h2>Summary</h2>
        <p>This page is a short summary. The <Link href="/privacy">privacy policy</Link> is the full, binding version, and it prevails if the two differ.</p>
        <ul>
          <li>You need an account (email and password, Sign in with Apple, or Google).</li>
          <li>We store what you enter, and we use it to run the app and work out your estimates.</li>
          <li>We do not sell your data and run no advertising.</li>
          <li>You can export your data and delete your account in the app (Profile), free. Deleted accounts are erased after a {DATA_RETENTION_GRACE_DAYS}-day grace period, apart from the records described in the privacy policy.</li>
        </ul>
        <p>{SCANNING_FACT}</p>
      </section>

      <section id="table">
        <h2>What and why</h2>
        <LegalTable caption="Data we collect, why, and how long we keep it">
          <thead>
            <tr><th scope="col">Category</th><th scope="col">Examples</th><th scope="col">Purpose</th><th scope="col">Retention</th></tr>
          </thead>
          <tbody>
            {DATA_CATEGORIES.map((c) => (
              <tr key={c.id}><th scope="row">{c.category}</th><td>{c.examples}</td><td>{c.purpose}</td><td>{c.retention}</td></tr>
            ))}
          </tbody>
        </LegalTable>
      </section>

      <section id="not-collected">
        <h2>What we do not collect</h2>
        <ul>
          <li>Your location, your contacts, or your advertising identifier.</li>
          <li>Remote push notification tokens. The app&rsquo;s reminders are local notifications scheduled on your device.</li>
          <li>Your card or Apple payment details.</li>
          <li>Face ID data. Face ID stays on your device.</li>
          <li>Your calendar. The optional calendar feature only adds shifts to it.</li>
        </ul>
      </section>

      <section id="who">
        <h2>Who processes it</h2>
        <LegalTable caption="Service providers">
          <thead>
            <tr><th scope="col">Provider</th><th scope="col">Role</th><th scope="col">Where</th></tr>
          </thead>
          <tbody>
            {PROVIDERS.map((p) => (
              <tr key={p.id}><th scope="row">{p.name}</th><td>{p.role}</td><td>{p.region}</td></tr>
            ))}
          </tbody>
        </LegalTable>
      </section>

      <section id="control">
        <h2>Your control</h2>
        <p>Export and delete in the app (Profile), or email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> to access, correct, export or delete your data, or to object to analytics. See <Link href="/privacy#rights">your rights</Link> and <Link href="/delete">how to delete your account</Link>.</p>
      </section>
    </LegalLayout>
  );
}
