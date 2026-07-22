"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Panel {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  span: string;
  accent: string;
}

const PANELS: Panel[] = [
  {
    src: "/screenshots/insights.png",
    alt: "ShiftFlow AI Insights with ShiftFlow Score",
    eyebrow: "AI Copilot",
    title: "Your 24/7 financial companion",
    body: "A ShiftFlow Score and plain-English insights on savings, taxes, and burnout — plus an AI you can ask anything about your pay.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: "#0EA5E9",
  },
  {
    src: "/screenshots/earnings.png",
    alt: "ShiftFlow earnings with estimated tax breakdown",
    eyebrow: "Earnings & Tax",
    title: "Know your real take-home",
    body: "Every deduction, estimated with current CRA rules.",
    span: "lg:col-span-1",
    accent: "#22C55E",
  },
  {
    src: "/screenshots/reports.png",
    alt: "ShiftFlow reports income trend",
    eyebrow: "Reports",
    title: "See your money over time",
    body: "Trends, comparisons, and history at a glance.",
    span: "lg:col-span-1",
    accent: "#EC4899",
  },
  {
    src: "/screenshots/invoice.png",
    alt: "ShiftFlow invoice generator",
    eyebrow: "Invoices",
    title: "Invoice clients in seconds",
    body: "Pull logged shifts straight into a professional invoice.",
    span: "lg:col-span-1",
    accent: "#F97316",
  },
  {
    src: "/screenshots/shifts.png",
    alt: "ShiftFlow shift calendar",
    eyebrow: "Shifts",
    title: "Every shift, logged",
    body: "One tap to clock in. A calendar that fills itself.",
    span: "lg:col-span-1",
    accent: "#D63C6B",
  },
];

function PanelCard({ panel, index }: { panel: Panel; index: number }) {
  const large = panel.span.includes("row-span-2");
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      className={`sheen-border group relative overflow-hidden rounded-3xl glass p-6 sm:p-7 ${panel.span}`}
    >
      {/* accent glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: panel.accent }}
      />
      <div className={large ? "flex flex-col h-full" : ""}>
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: panel.accent }}>
          {panel.eyebrow}
        </p>
        <h3 className={`mt-2 font-bold text-white tracking-tight ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {panel.title}
        </h3>
        <p className={`mt-2 text-white/55 leading-relaxed ${large ? "text-base max-w-md" : "text-sm"}`}>
          {panel.body}
        </p>

        {/* Tilted phone screenshot */}
        <div
          className={`relative mt-6 ${large ? "flex-1 min-h-[280px]" : "h-[220px]"}`}
          style={{ perspective: "1000px" }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[190px] transition-transform duration-500 group-hover:-translate-y-1"
            style={{ transform: "rotateX(6deg) rotateY(-12deg)" }}
          >
            <div className="phone-shell !p-[6px] !rounded-[2rem]">
              <div className="phone-screen !rounded-[1.6rem] aspect-[9/19.5]">
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  fill
                  sizes="190px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function GlassShowcase() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="blob blob-b w-[420px] h-[420px] bg-indigo/15 top-20 -left-24" />
        <div className="blob blob-a w-[380px] h-[380px] bg-brand/15 bottom-10 -right-16" />
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl mb-14"
        >
          <p className="text-brand text-sm font-semibold tracking-widest uppercase">One app. Your whole income.</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.08]">
            Everything you need to understand your pay
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
          {PANELS.map((p, i) => (
            <PanelCard key={p.src} panel={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
