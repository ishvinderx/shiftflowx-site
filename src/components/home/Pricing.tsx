"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { PRICING, PRO_FEATURES, APP_STORE_URL } from "@/lib/constants";

export default function Pricing() {
  const { monthly, annual, trialDays } = PRICING;

  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.1),transparent_60%)]" />
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeader
          label="Pricing"
          title="Simple, transparent pricing."
          subtitle={`Try ShiftFlow Pro free for ${trialDays} days. Choose monthly flexibility or save with annual billing.`}
        />

        {/* Two paid plans */}
        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Annual — recommended */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative rounded-3xl border-2 border-[#D63C6B]/60 bg-gradient-to-b from-[#D63C6B]/[0.08] to-transparent p-7 shadow-[0_0_50px_-15px_rgba(214,60,107,0.5)]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-[#D63C6B] text-white text-[11px] font-bold tracking-wide uppercase">Best Value</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{annual.name}</h3>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-5xl font-bold text-white tracking-tight">{annual.priceLabel}</span>
              <span className="text-white/50 text-lg">{annual.cadence}</span>
            </div>
            <p className="mt-1.5 text-sm text-white/50">
              ${annual.monthlyEquivalent}/month, billed annually
              <span className="ml-2 text-[#5EEAD4] font-medium">Save {annual.savingsPct}%</span>
            </p>
            <a href={APP_STORE_URL} className="mt-6 block text-center w-full rounded-full bg-[#D63C6B] text-white font-semibold py-3.5 shadow-[0_0_25px_rgba(214,60,107,0.4)] hover:bg-[#c0355f] transition-colors">
              Start {trialDays}-Day Free Trial
            </a>
            <p className="mt-3 text-center text-xs text-white/45">{annual.afterTrial}</p>
          </motion.div>

          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="relative rounded-3xl border border-white/[0.1] bg-white/[0.02] p-7"
          >
            <h3 className="text-lg font-semibold text-white">{monthly.name}</h3>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-5xl font-bold text-white tracking-tight">{monthly.priceLabel}</span>
              <span className="text-white/50 text-lg">{monthly.cadence}</span>
            </div>
            <p className="mt-1.5 text-sm text-white/40">Flexible monthly billing</p>
            <a href={APP_STORE_URL} className="mt-6 block text-center w-full rounded-full bg-white/[0.08] text-white font-semibold py-3.5 border border-white/10 hover:bg-white/[0.12] transition-colors">
              Start {trialDays}-Day Free Trial
            </a>
            <p className="mt-3 text-center text-xs text-white/45">{monthly.afterTrial}</p>
          </motion.div>
        </div>

        {/* Shared Pro features */}
        <div className="mt-12 max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-white/40 mb-6">Every Pro plan includes</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {PRO_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D63C6B] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/65">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-white/40 max-w-2xl mx-auto leading-relaxed">
          Subscriptions are managed through the App Store and renew automatically unless cancelled per Apple&apos;s terms.{" "}
          <Link href="/pricing" className="text-white/60 underline hover:text-white">See full pricing &amp; FAQ</Link>.
        </p>
      </div>
    </section>
  );
}
