"use client";

import { motion } from "framer-motion";
import { Clock, UserRound, FileText, Percent, Send, CheckCircle2 } from "lucide-react";

/**
 * Section 7 — Invoices (self-employed workflow).
 * Log Shift → Select Client → Generate Invoice → Add applicable GST/HST → Send → Track Payment.
 * Honest: sales tax is added SEPARATELY (never folded into work income); paying an invoice is
 * cash received, not new earned income.
 */

const STEPS = [
  { icon: Clock, label: "Log a shift", note: "Your billable hours, tracked automatically" },
  { icon: UserRound, label: "Select the client", note: "Bill one client at a time" },
  { icon: FileText, label: "Generate the invoice", note: "Hours × rate, calculated for you" },
  { icon: Percent, label: "Add applicable GST/HST", note: "Separate line — never mixed into income" },
  { icon: Send, label: "Send it", note: "Professional invoice, ready to go" },
  { icon: CheckCircle2, label: "Track payment", note: "Draft → Sent → Paid, at a glance" },
];

export default function InvoiceWorkflow() {
  return (
    <section className="relative py-24 px-5 sm:px-8" id="invoices">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[#D63C6B] text-sm font-semibold uppercase tracking-widest">
            Invoices
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Turn your shifts into invoices
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            For self-employed and freelance work: bill the hours you already tracked, add sales
            tax where it applies, and follow every invoice to paid.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <span className="absolute right-5 top-5 text-4xl font-bold text-white/[0.06] tabular-nums">
                  {i + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D63C6B]/12 text-[#D63C6B]">
                  <Icon size={18} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{step.label}</h3>
                <p className="mt-1 text-sm text-white/55 leading-snug">{step.note}</p>
              </motion.li>
            );
          })}
        </ol>

        {/* Worked example — matches the canonical Ontario fixture exactly */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Example — 10 hours at $26/hr, Ontario, GST/HST registered
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
            <span className="text-white/75">Work income <span className="font-semibold text-white">$260.00</span></span>
            <span className="text-white/40">+</span>
            <span className="text-white/75">HST (13%) <span className="font-semibold text-[#22C55E]">$33.80</span></span>
            <span className="text-white/40">=</span>
            <span className="text-white/75">Invoice total <span className="font-semibold text-white">$293.80</span></span>
          </div>
          <p className="mt-4 text-sm text-white/50 leading-snug">
            The $33.80 is sales tax you collect for the tax authority — it&apos;s held separately and
            never counted as your income. Marking an invoice paid records cash received, not new earnings.
          </p>
        </div>
      </div>
    </section>
  );
}
