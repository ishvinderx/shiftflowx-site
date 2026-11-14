import Link from "next/link";
import { FOOTER_LINKS, BRAND, SUPPORT_EMAIL } from "@/lib/constants";
import { Container, Label } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <Label className="mb-3">
                {group === "Legal" ? (
                  <Link href="/legal" className="link-hover -my-3 inline-block py-3 underline underline-offset-4 decoration-1 hover:text-ink">
                    {group}
                  </Link>
                ) : (
                  group
                )}
              </Label>
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-hover inline-flex min-h-[44px] items-center text-[0.9375rem] text-ink hover:underline underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 grid gap-2 border-t border-rule pt-6 text-[0.9375rem] text-ink-2 sm:flex sm:justify-between">
          <p>
            {BRAND.name} is operated by {BRAND.legalEntity}
          </p>
          <p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="link-hover text-ink underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
