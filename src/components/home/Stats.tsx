"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    icon: "🛡️",
    headline: "4-point payroll protection",
    sub: "Overtime, rate, missing hours, underpayment — checked every cycle",
  },
  {
    icon: "📅",
    headline: "Payday forecasting",
    sub: "Know exactly when your next cheque arrives and how much it will be",
  },
  {
    icon: "📊",
    headline: "Financial Health Score",
    sub: "Earnings, burnout, tax readiness, and work consistency — in one number",
  },
  {
    icon: "🤖",
    headline: "AI insights, your data",
    sub: "Personalised recommendations generated from your actual shift history",
  },
];

export default function Stats() {
  return (
    <section className="relative py-16 bg-[#080810] border-y border-white/[0.08]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,60,107,0.04)_0%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.07]">
          {pillars.map((p, i) => (
            <motion.div
              key={p.headline}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#080810] px-6 py-7 flex flex-col gap-2"
            >
              <span className="text-2xl">{p.icon}</span>
              <p className="text-white font-semibold text-sm leading-snug">
                {p.headline}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
