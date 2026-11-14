import Link from "next/link";
import { BRAND, SUPPORT_EMAIL } from "@/lib/constants";
import { Container, Heading, Label } from "@/components/ui";

interface TocItem {
  id: string;
  label: string;
}

/**
 * Legal pages: 65-character reading measure, hairlines, "Last updated" line, contents list.
 * Body text is styled by `.legal-content` in globals.css (h2/h3/p/ul/ol/a/table).
 * `effectiveDate` is shown as the last-updated date.
 */
export default function LegalLayout({
  title,
  effectiveDate,
  children,
  toc,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
  toc: TocItem[];
}) {
  return (
    <>
      <header className="border-b border-rule">
        <Container className="pb-10 pt-14 sm:pt-20">
          <Label className="mb-4">
            <Link href="/" className="hover:underline underline-offset-4">
              {BRAND.name}
            </Link>{" "}
            /{" "}
            <Link href="/legal" className="hover:underline underline-offset-4">
              Legal
            </Link>
          </Label>
          <Heading level="h2" as="h1">
            {title}
          </Heading>
          <p className="mt-4 text-[0.9375rem] text-ink-2">Last updated {effectiveDate}</p>
        </Container>
      </header>

      <Container className="grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <nav aria-label="Contents">
            <Label className="mb-3">Contents</Label>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="link-hover inline-flex min-h-[36px] items-center text-[0.9375rem] text-ink-2 hover:text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-8 border-t border-rule pt-6 text-[0.9375rem] text-ink-2">
            Questions?{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-ink underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </aside>
        <div className="legal-content min-w-0">{children}</div>
      </Container>
    </>
  );
}
