import { cn } from "@/lib/utils";

type HeadingLevel = "display" | "h2" | "h3";
const LEVEL: Record<HeadingLevel, { tag: "h1" | "h2" | "h3"; cls: string }> = {
  display: { tag: "h1", cls: "t-display" },
  h2: { tag: "h2", cls: "t-h2" },
  h3: { tag: "h3", cls: "t-h3" },
};

/**
 * Sentence-case heading. level: "display" (56-72px, h1), "h2", "h3". Override the element
 * with `as` when the outline needs it (e.g. a display-size h2).
 */
export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...rest
}: { level?: HeadingLevel; as?: "h1" | "h2" | "h3" | "h4" | "p"; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  const { tag, cls } = LEVEL[level];
  const Tag = as ?? tag;
  return (
    <Tag className={cn(cls, "text-ink", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Intro paragraph under a heading: larger, secondary colour, 60ch measure. */
export function Lede({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("t-lede", className)}>{children}</p>;
}

/** Small uppercase label (11-12px, +0.08em, secondary). Use sparingly. */
export function Label({ className, children, as: Tag = "p" }: { className?: string; children: React.ReactNode; as?: "p" | "span" | "div" }) {
  return <Tag className={cn("t-label", className)}>{children}</Tag>;
}

/** Body paragraph with the 65-character measure. */
export function Prose({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("t-body text-ink", className)}>{children}</p>;
}
