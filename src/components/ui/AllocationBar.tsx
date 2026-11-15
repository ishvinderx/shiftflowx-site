import { cn } from "@/lib/utils";
import { money, SAMPLE_ALLOCATION } from "./sample-data";

type Segment = { key: string; label: string; value: number; tone: "commit" | "soft" | "positive" };
const FILL = { commit: "bg-commit-line", soft: "bg-ink-2", positive: "bg-positive-line" } as const;

/**
 * Live allocation bar: how a month's income splits into bills due / rest of plan / available.
 * Segments are sized from their values; the legend prints each amount (tabular figures).
 * Defaults to the shared sample data; pass `segments` for real copy. Always shows "Sample data"
 * unless `sample={false}`.
 */
export function AllocationBar({
  segments = SAMPLE_ALLOCATION.segments,
  sample = true,
  className,
}: {
  segments?: Segment[];
  sample?: boolean;
  className?: string;
}) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const summary = segments.map((s) => `${s.label} ${money(s.value)}`).join(", ");
  return (
    <figure className={cn("num", className)}>
      <figcaption className="mb-4 flex items-baseline justify-between gap-4">
        <span className="t-label">This month, allocated</span>
        {sample && <span className="t-label">Sample data</span>}
      </figcaption>
      <p className="mb-5 text-[0.9375rem] text-ink-2">
        Of <span className="text-ink">{money(total)}</span> expected this month
      </p>
      <div role="img" aria-label={`Allocation of ${money(total)}: ${summary}`} className="grow-x flex h-3 w-full overflow-hidden bg-track">
        {segments.map((s) => (
          <div key={s.key} className={FILL[s.tone]} style={{ width: `${(s.value / total) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
        {segments.map((s) => (
          <div key={s.key}>
            <dt className="flex items-center gap-2 text-[0.9375rem] text-ink-2">
              <span aria-hidden="true" className={cn("inline-block h-2.5 w-2.5", FILL[s.tone])} />
              {s.label}
            </dt>
            <dd className="mt-1 text-xl font-semibold text-ink">{money(s.value)}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
