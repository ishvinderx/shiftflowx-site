import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { AppStoreButton, PageHeader, Section } from "@/components/ui";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import { APP_STORE_URL } from "@/lib/constants";
import { canonicalAlt } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Pay & Tax Guides for Workers",
  description: "Guides on paychecks, payday, gig worker taxes and freelancer invoicing.",
  alternates: canonicalAlt("/blog"),
};

const TRAIL = [
  { name: "HoursFlow", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const years = Array.from(new Set(sorted.map((p) => p.date.slice(0, 4))));
  return (
    <>
      <Breadcrumbs trail={TRAIL} />
      <PageHeader label="Blog" title="Guides for people paid by the hour" lede="Paycheques, payday, gig-work taxes and freelancer invoicing, explained plainly." />
      {years.map((year, yi) => (
        <Section key={year} rule={yi > 0} label={year} className="py-12 sm:py-16">
          <ul className="border-b border-rule">
            {sorted
              .filter((p) => p.date.startsWith(year))
              .map((p) => (
                <li key={p.slug} className="border-t border-rule">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid gap-2 py-6 md:grid-cols-[2fr_7fr_3fr] md:gap-10"
                  >
                    <time dateTime={p.date} className="num text-[0.9375rem] text-ink-2">
                      {formatPostDate(p.date, { month: "short", day: "numeric" })}
                    </time>
                    <span className="grid gap-1.5">
                      <span className="text-[1.125rem] font-semibold leading-snug text-ink group-hover:underline underline-offset-4">{p.title}</span>
                      <span className="text-ink-2">{p.description}</span>
                    </span>
                    <span className="text-[0.9375rem] text-ink-2 md:text-right">
                      {p.category} · {p.readTime}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </Section>
      ))}
      <Section title="Track your own hours" lede="Shifts, earnings, payday, budget and bills in one app. Pro includes a 7-day free trial.">
        <AppStoreButton href={APP_STORE_URL} />
      </Section>
    </>
  );
}
