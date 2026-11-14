import { cn } from "@/lib/utils";

/**
 * Page-width wrapper: max 1120px, 24px gutters (16px on phones).
 * Usage: <Container>...</Container>. Pass `as="header"` etc. for landmarks.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
  ...rest
}: { as?: React.ElementType; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1120px] px-4 sm:px-6", className)} {...rest}>
      {children}
    </Tag>
  );
}
