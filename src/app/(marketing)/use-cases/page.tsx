import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { PageHeader, Section } from "@/components/ui";
import { USE_CASES } from "@/content/use-cases";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Use Cases — HoursFlow for Hourly, Gig, Freelance and Contract Work",
  description: "See how HoursFlow fits hourly workers, gig workers, freelancers, contractors and nurses, from irregular shifts to invoices and GST/HST.",
  alternates: { canonical: `${SITE_URL}/use-cases` },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "HoursFlow", path: "/" }, { name: "Use cases", path: "/use-cases" }]} />
      <PageHeader label="Use cases" title="Five ways people use it" lede="Each pay situation has its own problems. Pick the one that sounds like yours." />
      <Section rule={false}>
        <ul className="border-b border-rule">
          {USE_CASES.map((u) => (
            <li key={u.slug} className="border-t border-rule">
              <Link href={`/use-cases/${u.slug}`} className="group grid gap-2 py-7 md:grid-cols-[4fr_8fr] md:gap-16">
                <span className="t-h3 group-hover:underline underline-offset-4">{u.name}</span>
                <span className="t-body text-ink-2">{u.hubLine}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
