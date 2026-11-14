import { Heading, Label } from "./Type";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Asymmetric two-column row (5fr text / 7fr visual) with a hairline above.
 * Alternate `reverse` on consecutive rows. On phones the text comes first, then the visual.
 * Put FeatureRows inside a <Container>; `visual` is a PhoneFrame, LedgerTable, chart, etc.
 */
export function FeatureRow({
  label,
  title,
  reverse = false,
  visual,
  children,
  className,
  id,
}: {
  label?: string;
  title: string;
  reverse?: boolean;
  visual: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <Reveal id={id} className={cn("grid items-center gap-8 border-t border-rule py-12 sm:py-16 md:gap-16", reverse ? "md:grid-cols-[7fr_5fr]" : "md:grid-cols-[5fr_7fr]", className)}>
      <div className={cn("grid gap-4", reverse && "md:order-2")}>
        {label && <Label>{label}</Label>}
        <Heading level="h3">{title}</Heading>
        <div className="t-body text-ink-2 grid gap-3">{children}</div>
      </div>
      <div className={cn("min-w-0", reverse && "md:order-1")}>{visual}</div>
    </Reveal>
  );
}
