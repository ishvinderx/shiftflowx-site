"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { PRICING, PRO_FEATURES, APP_STORE_URL } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";

function BillingFAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-[#D63C6B]" : "bg-white/10"}`}>
          {open ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-white/60" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              <p className="text-white/55 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const billingFAQ = [
  { q: "When does the free trial start?", a: `Your ${PRICING.trialDays}-day Pro trial begins when you start it in the app. You get full access to every Pro feature during the trial.` },
  { q: "What happens after the trial ends?", a: `After ${PRICING.trialDays} days, your selected Pro plan (Monthly or Annual) begins unless you cancel. You can cancel any time before the trial ends and you won't be charged.` },
  { q: "How do I subscribe to Pro?", a: "Subscriptions are managed through the Apple App Store. In the ShiftFlow app, go to Settings → Upgrade to Pro and choose Monthly or Annual." },
  { q: "Can I switch between monthly and annual?", a: "Yes. Change your billing period any time in your Apple ID subscription settings. Changes take effect at your next billing date." },
  { q: "How do I cancel?", a: "Cancel any time in iPhone Settings → Apple ID → Subscriptions. You keep Pro access until the end of your current billing period. Apple does not offer partial refunds for unused time." },
  { q: "How do I restore my purchase on a new device?", a: "Open ShiftFlow → Settings → Restore Purchases. Your subscription is tied to your Apple ID and transfers automatically." },
  { q: "Do you offer refunds?", a: "Refunds are handled by Apple. Visit reportaproblem.apple.com to request one — Apple reviews each case individually." },
];

export default function PricingClient() {
  const { monthly, annual, trialDays } = PRICING;

  return (
    <div>
      {/* ── Hero + plans ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(214,60,107,0.12),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Simple, transparent pricing.</h1>
            <p className="mt-4 text-lg text-white/55 leading-relaxed">
              Try ShiftFlow Pro free for {trialDays} days. Choose monthly flexibility or save with annual billing.
            </p>
          </div>

          {/* Two paid plans — same features, different billing. No toggle (both visible). */}
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {/* ANNUAL — recommended */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative rounded-3xl border-2 border-[#D63C6B]/60 bg-gradient-to-b from-[#D63C6B]/[0.08] to-transparent p-7 shadow-[0_0_50px_-15px_rgba(214,60,107,0.5)]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-[#D63C6B] text-white text-[11px] font-bold tracking-wide uppercase">Best Value</span>
              </div>
              <h2 className="text-lg font-semibold text-white">{annual.name}</h2>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold text-white tracking-tight">{annual.priceLabel}</span>
                <span className="text-white/50 text-lg">{annual.cadence}</span>
              </div>
              <p className="mt-1.5 text-sm text-white/50">
                ${annual.monthlyEquivalent}/month, billed annually
                <span className="ml-2 text-[#5EEAD4] font-medium">Save {annual.savingsPct}%</span>
              </p>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">Get full access to ShiftFlow Pro at our best annual price.</p>
              <a href={APP_STORE_URL} className="mt-6 block text-center w-full rounded-full bg-[#D63C6B] text-white font-semibold py-3.5 shadow-[0_0_25px_rgba(214,60,107,0.4)] hover:bg-[#c0355f] transition-colors">
                Start {trialDays}-Day Free Trial
              </a>
              <p className="mt-3 text-center text-xs text-white/45">{annual.afterTrial}</p>
            </motion.div>

            {/* MONTHLY — standard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="relative rounded-3xl border border-white/[0.1] bg-white/[0.02] p-7"
            >
              <h2 className="text-lg font-semibold text-white">{monthly.name}</h2>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold text-white tracking-tight">{monthly.priceLabel}</span>
                <span className="text-white/50 text-lg">{monthly.cadence}</span>
              </div>
              <p className="mt-1.5 text-sm text-white/40">Flexible monthly billing</p>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">Full ShiftFlow Pro access with flexible monthly billing.</p>
              <a href={APP_STORE_URL} className="mt-6 block text-center w-full rounded-full bg-white/[0.08] text-white font-semibold py-3.5 border border-white/10 hover:bg-white/[0.12] transition-colors">
                Start {trialDays}-Day Free Trial
              </a>
              <p className="mt-3 text-center text-xs text-white/45">{monthly.afterTrial}</p>
            </motion.div>
          </div>

          {/* Subscription disclosure */}
          <p className="mt-8 text-center text-xs text-white/40 max-w-2xl mx-auto leading-relaxed">
            Payment and subscription management are handled through the App Store. Your subscription renews
            automatically unless cancelled according to Apple&apos;s subscription terms. See our{" "}
            <Link href="/terms" className="text-white/60 underline hover:text-white">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-white/60 underline hover:text-white">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      {/* ── Shared Pro features (billing differs, features don't) ─────────────── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-center text-sm font-semibold tracking-widest uppercase text-[#D63C6B] mb-8">Every Pro plan includes</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
            {PRO_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#D63C6B]/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#D63C6B]" />
                </span>
                <span className="text-sm text-white/70">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How your free trial works ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-center text-2xl font-bold text-white tracking-tight mb-10">How your free trial works</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { step: "Day 1", body: `Start your ${trialDays}-day Pro trial.` },
              { step: "During your trial", body: "Explore the Pro features included with your selected subscription." },
              { step: `After ${trialDays} days`, body: "Your selected subscription begins unless cancelled." },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-[#D63C6B] text-xs font-semibold tracking-wide uppercase">{s.step}</p>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">Cancel anytime according to the applicable App Store subscription terms.</p>
        </div>
      </section>

      {/* ── Billing FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-5">
          <SectionHeader label="Billing FAQ" title="Billing questions." />
          <div className="mt-8 space-y-3">
            {billingFAQ.map((item, i) => (
              <BillingFAQItem key={i} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
