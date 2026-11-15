import { cn } from "@/lib/utils";

// Same sample person and numbers as the app presentation's Home screen (brochure/app-r4).
const PERIOD = [204.75, 346.5, 346.5, 598.5, 756, 756, 756, 882, 1118.25, 1118.25, 1275.75, 1512];
const DAYS = 14, TOP = 1700, W = 250, H = 84;

const X = (i: number) => (i / (DAYS - 1)) * W;
const Y = (v: number) => H - 6 - (v / TOP) * (H - 12);

/**
 * The one emerald gradient card: this pay period's figure, with a soft card under it for payday
 * and next shift. Sample data, labelled as such. Home page hero only.
 */
export function HeroPayCard({ className }: { className?: string }) {
  const line = PERIOD.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const lx = X(PERIOD.length - 1), ly = Y(PERIOD[PERIOD.length - 1]);
  return (
    <figure className={cn("num grid gap-4", className)}>
      <div className="hero-card p-6 sm:p-7">
        <div className="relative z-10">
          <p className="flex items-baseline justify-between gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.11em]">
            <span>This pay period &middot; before tax</span>
            <span className="hero-sub shrink-0 whitespace-nowrap normal-case tracking-normal font-medium">Sample data</span>
          </p>
          <p className="mt-4 font-bold leading-none tracking-[-0.045em] text-[clamp(3rem,2rem+4vw,4.5rem)]">
            $1,512<span className="text-[0.42em] font-semibold tracking-[-0.02em] opacity-75">.00</span>
          </p>
          <p className="hero-sub mt-3 text-[1rem]">48.0 h &middot; 2 &ndash; 15 Nov</p>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Earnings across the pay period, rising to $1,512" className="mt-4 block h-auto w-full overflow-visible">
            <path d={`${line} L${lx.toFixed(1)} ${H} L0 ${H}Z`} fill="var(--hero-line)" fillOpacity="0.2" />
            <path d={line} fill="none" stroke="var(--hero-line)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <circle cx={lx} cy={ly} r="3.5" fill="var(--hero-line)" />
          </svg>
        </div>
      </div>
      <dl className="card px-5">
        <div className="flex items-start justify-between gap-4 border-b border-rule py-3.5">
          <div>
            <dt className="font-semibold text-ink">Payday</dt>
            <dd className="text-[0.9375rem] text-ink-2">About $1,368.36 after deductions</dd>
          </div>
          <dd className="shrink-0 whitespace-nowrap font-semibold text-ink">Fri 20 Nov</dd>
        </div>
        <div className="flex items-start justify-between gap-4 py-3.5">
          <div>
            <dt className="font-semibold text-ink">Next shift</dt>
            <dd className="text-[0.9375rem] text-ink-2">Harbour Clinic</dd>
          </div>
          <dd className="shrink-0 whitespace-nowrap font-semibold text-ink">Mon 1:00 PM</dd>
        </div>
      </dl>
    </figure>
  );
}
