import { cn } from "@/lib/utils";

/**
 * A big tabular number with a label above and optional note below.
 * <Figure label="Still to earn" value="$134" cents=".00" note="to cover this month's plan" />
 */
export function Figure({
  label,
  value,
  cents,
  note,
  tone = "ink",
  className,
}: {
  label: string;
  value: string;
  cents?: string;
  note?: string;
  tone?: "ink" | "positive" | "commit";
  className?: string;
}) {
  const toneCls = tone === "positive" ? "text-positive" : tone === "commit" ? "text-commit" : "text-ink";
  return (
    <div className={cn("num", className)}>
      <p className="t-label">{label}</p>
      <p className={cn("mt-2 font-semibold leading-none tracking-[-0.03em] text-[clamp(2.5rem,1.8rem+3vw,3.75rem)]", toneCls)}>
        {value}
        {cents && <span className="text-ink-2 text-[0.5em] tracking-normal">{cents}</span>}
      </p>
      {note && <p className="mt-3 text-[0.9375rem] text-ink-2 max-w-[40ch]">{note}</p>}
    </div>
  );
}
