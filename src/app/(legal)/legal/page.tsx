import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { PageHeader, Section } from "@/components/ui";
import { LEGAL_PAGES } from "@/content/legal";
import { SITE_URL, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Legal — Policies, Terms and Your Data",
  description: "Every HoursFlow legal document in one place: privacy, terms, subscription terms, refunds, license, data, security, cookies and account deletion.",
  alternates: { canonical: `${SITE_URL}/legal` },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "HoursFlow", path: "/" }, { name: "Legal", path: "/legal" }]} />
      <PageHeader
        size="h2"
        label="Legal"
        title="Policies and terms"
        lede={`What you agree to, how your data is handled, and how to leave. Questions? Write to ${SUPPORT_EMAIL}.`}
      />
      <Section rule={false}>
        <ul className="border-b border-rule">
          {LEGAL_PAGES.map((p) => (
            <li key={p.href} className="border-t border-rule">
              <Link href={p.href} className="group grid gap-1 py-6 md:grid-cols-[4fr_8fr] md:gap-16">
                <span className="text-[1.0625rem] font-semibold text-ink group-hover:underline underline-offset-4">{p.title}</span>
                <span className="t-body text-ink-2">{p.covers}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
