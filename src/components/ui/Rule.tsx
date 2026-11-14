import { cn } from "@/lib/utils";

/** Hairline divider (1px, --rule). The only separator the design uses. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn("m-0 h-px w-full border-0 bg-rule", className)} />;
}
