import { Container } from "./Container";
import { Heading, Label, Lede } from "./Type";
import { Reveal } from "./Reveal";

/**
 * Header for inner pages: optional label, h1 (display size by default), lede, and an
 * actions slot (buttons). Hairline below. Put it first in the page, above <Section>s.
 * `size="h2"` gives a smaller h1 for text-heavy pages.
 */
export function PageHeader({
  label,
  title,
  lede,
  size = "display",
  children,
}: {
  label?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  size?: "display" | "h2";
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-rule">
      <Container className="pb-14 pt-14 sm:pb-20 sm:pt-24">
        <Reveal className="grid gap-5">
          {label && <Label>{label}</Label>}
          <Heading level={size} as="h1" className="max-w-[18ch]">
            {title}
          </Heading>
          {lede && <Lede>{lede}</Lede>}
          {children && <div className="mt-3 flex flex-wrap items-center gap-4">{children}</div>}
        </Reveal>
      </Container>
    </header>
  );
}
