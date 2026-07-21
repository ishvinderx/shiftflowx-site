"use client";

import { motion } from "framer-motion";

/**
 * Section 4 — "Pay & Tax Intelligence."
 * Explains the canonical dual-stream calculation architecture in consumer-friendly language.
 * HARD RULES (mission): never imply HST is income, never imply the SE reserve was withheld,
 * never imply ShiftFlow replaces an accountant or tax authority.
 */

function Flow({
  steps,
  accent,
}: {
  steps: { label: string; note?: string }[];
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ background: `${accent}1f`, color: accent }}
          >
            {i + 1}
          </span>
          <div className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
            <span className="text-[15px] font-medium text-white">{step.label}</span>
            {step.note && <span className="ml-2 text-xs text-white/45">{step.note}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function PayTaxIntelligence() {
  return (
    <section className="relative py-24 px-5 sm:px-8" id="pay-tax-intelligence">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[#D63C6B] text-sm font-semibold uppercase tracking-widest">
            Pay &amp; tax intelligence
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Two income streams, never blended
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            Payroll and self-employed work are calculated independently, then combined — so
            deductions only touch payroll, sales tax only touches business work, and your
            numbers reconcile everywhere.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Employee */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Employee
            </h3>
            <div className="mt-5">
              <Flow
                accent="#3B82F6"
                steps={[
                  { label: "Hours" },
                  { label: "Gross Pay" },
                  { label: "Estimated Deductions", note: "income tax, CPP/EI…" },
                  { label: "Estimated Net Pay" },
                ]}
              />
            </div>
          </div>

          {/* Self-employed */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Self-Employed
            </h3>
            <div className="mt-5">
              <Flow
                accent="#D63C6B"
                steps={[
                  { label: "Billable Work" },
                  { label: "Work Income" },
                  { label: "Applicable Sales Tax", note: "held, not income" },
                  { label: "Invoice Total" },
                  { label: "Estimated Tax Reserve", note: "to set aside" },
                ]}
              />
            </div>
          </div>

          {/* Mixed */}
          <div className="rounded-3xl border border-[#D63C6B]/25 bg-gradient-to-b from-[#D63C6B]/[0.06] to-transparent p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Mixed
            </h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                <span className="text-[15px] font-medium text-white">Payroll stream</span>
                <p className="mt-0.5 text-xs text-white/45">deductions applied here only</p>
              </div>
              <div className="text-center text-white/40 text-lg leading-none">+</div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                <span className="text-[15px] font-medium text-white">Business stream</span>
                <p className="mt-0.5 text-xs text-white/45">sales tax + reserve applied here only</p>
              </div>
              <div className="text-center text-white/40 text-lg leading-none">↓</div>
              <div className="rounded-xl border border-[#D63C6B]/30 bg-[#D63C6B]/[0.08] px-4 py-3">
                <span className="text-[15px] font-semibold text-white">Combined overview</span>
                <p className="mt-0.5 text-xs text-white/55">two traceable streams, one picture</p>
              </div>
            </div>
          </div>
        </div>

        {/* Honest guardrails */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3 text-sm">
          {[
            "Sales tax you collect is held for the tax authority — never counted as income.",
            "Self-employed tax reserve is money to set aside — nothing is withheld from your pay.",
            "Estimates use supported jurisdiction rules. ShiftFlow isn’t your accountant or the tax authority.",
          ].map((note) => (
            <p
              key={note}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-white/55 leading-snug"
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
