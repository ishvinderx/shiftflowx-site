import { Label } from "./Type";
import { cn } from "@/lib/utils";

/** Hairline-boxed note. Optional small `label`. Use for policy sentences and caveats. */
export function Callout({ label, className, children }: { label?: string; className?: string; children: React.ReactNode }) {
  return (
    <aside className={cn("border border-rule p-5 sm:p-6", className)}>
      {label && <Label className="mb-2">{label}</Label>}
      <div className="t-body text-ink">{children}</div>
    </aside>
  );
}
