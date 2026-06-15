"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Star, CheckCircle2, XCircle, MinusCircle, Shield, ZapOff, Lock, Smartphone, Globe } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Count-Up Hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, inView: boolean) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, target, duration, motionVal]);

  return rounded;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  rawValue: string;
  numericPart: number;
  suffix: string;
  label: string;
  accent: string;
  index: number;
  inView: boolean;
}

function StatCard({ rawValue, numericPart, suffix, label, accent, index, inView }: StatCardProps) {
  const displayNum = useCountUp(numericPart, 1.8, inView);

  // For values like "47K+" we parse the numeric portion and reconstruct
  const isDollar = rawValue.startsWith("$");
  const prefix = isDollar ? "$" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="glass-card rounded-2xl p-6 text-center relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${accent}10, transparent 70%)`,
        }}
      />
      <div
        className="text-4xl font-bold mb-1"
        style={{ color: accent }}
      >
        {prefix}
        <motion.span>{displayNum}</motion.span>
        {suffix}
      </div>
      <div className="text-white/50 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { rawValue: "47K+", numericPart: 47, suffix: "K+", label: "Shifts Tracked", accent: "#D63C6B" },
  { rawValue: "$2.3M", numericPart: 2.3, suffix: "M", label: "Payroll Protected", accent: "#22C55E" },
  { rawValue: "12K+", numericPart: 12, suffix: "K+", label: "Active Users", accent: "#14B8A6" },
  { rawValue: "94", numericPart: 94, suffix: "", label: "Countries", accent: "#F59E0B" },
];

// ─── Rating Display ──────────────────────────────────────────────────────────

function RatingDisplay({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.6 + star * 0.07, duration: 0.4, ease: EASE }}
          >
            <Star
              className="w-6 h-6"
              fill={star <= 4 ? "#F59E0B" : "none"}
              stroke={star <= 4 ? "#F59E0B" : "#F59E0B80"}
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
      </div>
      <div className="text-white/60 text-sm font-medium">
        <span className="text-white font-bold text-lg">4.8</span> out of 5 &middot; 1,200+ reviews
      </div>
    </motion.div>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Registered Nurse",
    initials: "SM",
    accent: "#D63C6B",
    quote:
      "Found $312 in missed overtime in my first week. ShiftFlow paid for itself immediately.",
    stars: 5,
  },
  {
    name: "Jake T.",
    role: "Retail Team Lead",
    initials: "JT",
    accent: "#14B8A6",
    quote:
      "I always suspected my payslips were off. ShiftFlow confirmed it and helped me dispute two errors.",
    stars: 5,
  },
  {
    name: "Priya K.",
    role: "Rideshare Driver",
    initials: "PK",
    accent: "#F59E0B",
    quote:
      "The tax estimator alone is worth it. I stopped dreading tax season.",
    stars: 5,
  },
];

function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.12, ease: EASE }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10"
        style={{ background: testimonial.accent }}
      />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-white/80 text-base leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: `${testimonial.accent}30`, border: `1px solid ${testimonial.accent}40` }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-white/40 text-xs">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

type CellValue = "yes" | "no" | "partial";

const TABLE_ROWS: { feature: string; shiftflow: CellValue; spreadsheet: CellValue; notes: CellValue; manual: CellValue }[] = [
  { feature: "Automatic overtime detection", shiftflow: "yes", spreadsheet: "partial", notes: "no", manual: "no" },
  { feature: "Payday forecasting", shiftflow: "yes", spreadsheet: "no", notes: "no", manual: "no" },
  { feature: "AI insights", shiftflow: "yes", spreadsheet: "no", notes: "no", manual: "no" },
  { feature: "Tax estimation", shiftflow: "yes", spreadsheet: "partial", notes: "no", manual: "no" },
  { feature: "Payroll error alerts", shiftflow: "yes", spreadsheet: "no", notes: "no", manual: "no" },
  { feature: "Mobile-first", shiftflow: "yes", spreadsheet: "partial", notes: "yes", manual: "partial" },
  { feature: "Burnout tracking", shiftflow: "yes", spreadsheet: "no", notes: "no", manual: "no" },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") return <CheckCircle2 className="w-5 h-5 text-[#22C55E] mx-auto" />;
  if (value === "no") return <XCircle className="w-5 h-5 text-white/20 mx-auto" />;
  return <MinusCircle className="w-5 h-5 text-[#F59E0B]/70 mx-auto" />;
}

function ComparisonTable({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="overflow-x-auto"
    >
      <table className="w-full min-w-[640px]">
        <thead>
          <tr>
            <th className="text-left py-4 px-4 text-white/40 text-sm font-medium w-1/3">
              Feature
            </th>
            {[
              { name: "ShiftFlow", highlight: true },
              { name: "Spreadsheet", highlight: false },
              { name: "Notes App", highlight: false },
              { name: "Manual", highlight: false },
            ].map((col) => (
              <th
                key={col.name}
                className="text-center py-4 px-4 text-sm font-semibold"
                style={{ color: col.highlight ? "#D63C6B" : "rgba(255,255,255,0.4)" }}
              >
                {col.name}
                {col.highlight && (
                  <div className="h-0.5 rounded-full mt-1 mx-auto w-12" style={{ background: "#D63C6B" }} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((row, i) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: EASE }}
              className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3.5 px-4 text-white/70 text-sm">{row.feature}</td>
              <td className="py-3.5 px-4">
                <CellIcon value={row.shiftflow} />
              </td>
              <td className="py-3.5 px-4">
                <CellIcon value={row.spreadsheet} />
              </td>
              <td className="py-3.5 px-4">
                <CellIcon value={row.notes} />
              </td>
              <td className="py-3.5 px-4">
                <CellIcon value={row.manual} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { label: "Privacy First", icon: Shield },
  { label: "Zero Ads", icon: ZapOff },
  { label: "GDPR + CCPA", icon: Globe },
  { label: "iOS 17+", icon: Smartphone },
  { label: "256-bit Encryption", icon: Lock },
];

function TrustBadges({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
      {TRUST_BADGES.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 text-sm font-medium"
          >
            <Icon className="w-3.5 h-3.5 text-white/30" />
            {badge.label}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function SocialProof() {
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-60px" });
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#080810]">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04] bg-[#22C55E]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04] bg-[#D63C6B]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section label */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            Real Results
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Trusted by shift workers{" "}
            <span className="gradient-text">worldwide</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From hospitals to rideshare, ShiftFlow protects the people who keep the world running.
          </p>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={i}
              inView={statsInView}
            />
          ))}
        </div>

        {/* Rating */}
        <RatingDisplay inView={statsInView} />

        {/* Divider */}
        <div className="my-20 h-px bg-white/[0.04]" />

        {/* Testimonials */}
        <div ref={testimonialsRef}>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What shift workers say
            </h3>
            <p className="text-white/40 text-base">Real people, real paychecks, real savings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.name}
                testimonial={t}
                index={i}
                inView={testimonialsInView}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 h-px bg-white/[0.04]" />

        {/* Comparison table */}
        <div ref={tableRef}>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How ShiftFlow compares
            </h3>
            <p className="text-white/40 text-base">
              No other tool was built specifically for shift workers.
            </p>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <ComparisonTable inView={tableInView} />
          </div>
        </div>

        {/* Trust badges */}
        <div ref={trustRef}>
          <TrustBadges inView={trustInView} />
        </div>
      </div>
    </section>
  );
}
