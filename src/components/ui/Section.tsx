import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Heading, Label, Lede } from "./Type";
import { cn } from "@/lib/utils";

/**
 * Page section: hairline on top (unless `rule={false}`), generous vertical space, optional
 * uppercase `label`, `title` (h2) and `lede`, then children. Header and body fade up in turn.
 * Use `bare` to drop the header and just get the spacing + rule.
 */
export function Section({
  id,
  label,
  title,
  lede,
  rule = true,
  className,
  children,
  headerClassName,
}: {
  id?: string;
  label?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  rule?: boolean;
  className?: string;
  headerClassName?: string;
  children?: React.ReactNode;
}) {
  const hasHeader = label || title || lede;
  return (
    <section id={id} aria-labelledby={title && id ? `${id}-title` : undefined} className={cn(rule && "border-t border-rule")}>
      <Container className={cn("py-16 sm:py-24", className)}>
        {hasHeader && (
          <Reveal index={0} className={cn("mb-10 sm:mb-14 grid gap-4", headerClassName)}>
            {label && <Label>{label}</Label>}
            {title && (
              <Heading level="h2" id={id ? `${id}-title` : undefined} className="max-w-[22ch]">
                {title}
              </Heading>
            )}
            {lede && <Lede>{lede}</Lede>}
          </Reveal>
        )}
        {children !== undefined && <Reveal index={1}>{children}</Reveal>}
      </Container>
    </section>
  );
}
