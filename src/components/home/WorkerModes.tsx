"use client";

import { motion } from "framer-motion";
import { Briefcase, Receipt, Layers, Check } from "lucide-react";

/**
 * Section 2 — "Works the way you work."
 * The core v1.4 differentiator: ShiftFlow adapts to how the user earns income.
 * Three honest worker profiles, each listing only capabilities that exist in the app.
 * No unsupported tax-accuracy claims; sales tax is never framed as income.
 */

type Mode = {
  id: string;
  label: string;
  tag: string;
  icon: typeof Briefcase;
  points: string[];
};

const MODES: Mode[] = [
  {
    id: "employee",
    label: "Employee",
    tag: "Paychecks & payroll",
    icon: Briefcase,
    points: [
      "Track your hours automatically",
      "See estimated gross earnings",
      "Understand estimated payroll deductions",
      "Estimate your next paycheck",
      "Know your payday before it lands",
    ],
  },
  {
    id: "self-employed",
    label: "Self-Employed",
    tag: "Invoices & clients",
    icon: Receipt,
    points: [
      "Track billable hours",
      "Turn shifts into client invoices",
      "Keep work income separate from GST/HST",
      "Track what clients still owe you",
      "Plan for estimated taxes to set aside",
    ],
  },
  {
    id: "both",
    label: "Both",
    tag: "Mixed income",
    icon: Layers,
    points: [
      "Payroll and business income tracked separately",
      "Invoices stay separate from paychecks",
      "Sales tax never touches payroll income",
      "One financial picture — without mixing streams",
    ],
  },
];

export default function WorkerModes() {
  return (
    <section className="relative py-24 px-5 sm:px-8" id="works-the-way-you-work">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#D63C6B] text-sm font-semibold uppercase tracking-widest">
            Works the way you work
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            One app that adapts to how you get paid
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            Tell ShiftFlow how you earn and it configures itself around you — the right
            numbers, the right words, nothing that doesn&apos;t apply.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MODES.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-colors hover:border-[#D63C6B]/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D63C6B]/12 text-[#D63C6B]">
                    <Icon size={20} strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{mode.label}</h3>
                    <p className="text-xs text-white/45 uppercase tracking-wider">{mode.tag}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {mode.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-white/75 text-[15px] leading-snug">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          Tax figures are estimates using supported jurisdiction rules — never a filing or a
          replacement for an accountant.
        </p>
      </div>
    </section>
  );
}
