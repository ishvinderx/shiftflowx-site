import { cn } from "@/lib/utils";
import { money, SAMPLE_EARNINGS } from "./sample-data";

/**
 * Thin line chart (SVG, no library). The line draws once when its Reveal ancestor enters view.
 * `points` are {label, value}; y starts at 0. Defaults to the sample pay-period earnings.
 * Labelled "Sample data" unless `sample={false}`. Pass a `title` that says what is plotted.
 */
export function LineChart({
  points = SAMPLE_EARNINGS,
  title = "Earnings across the pay period",
  sample = true,
  className,
}: {
  points?: { label: string; value: number }[];
  title?: string;
  sample?: boolean;
  className?: string;
}) {
  const W = 560, H = 220, PX = 8, PT = 16, PB = 28;
  const max = Math.max(...points.map((p) => p.value));
  const top = Math.ceil(max / 100) * 100;
  const x = (i: number) => PX + (i * (W - PX * 2)) / Math.max(points.length - 1, 1);
  const y = (v: number) => PT + (1 - v / top) * (H - PT - PB);
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const summary = points.map((p) => `${p.label} ${money(p.value)}`).join(", ");
  return (
    <figure className={cn("num", className)}>
      <figcaption className="mb-4 flex items-baseline justify-between gap-4">
        <span className="t-label">{title}</span>
        {sample && <span className="t-label">Sample data</span>}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: ${summary}`} className="block h-auto w-full">
        {[0, 0.5, 1].map((t) => (
          <line key={t} x1={PX} x2={W - PX} y1={y(top * t)} y2={y(top * t)} stroke="var(--rule)" strokeWidth="1" />
        ))}
        <path d={d} pathLength={1} className="draw-line" fill="none" stroke="var(--positive-line)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={x(i)} cy={y(p.value)} r={i === points.length - 1 ? 4 : 2.5} fill="var(--positive-line)" />
            <text x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} fontSize="12" fill="var(--ink-2)">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-[0.9375rem] text-ink-2">
        Gross so far <span className="font-semibold text-ink">{money(last.value)}</span>
      </p>
    </figure>
  );
}
