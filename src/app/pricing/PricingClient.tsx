"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, RefreshCw, Shield, HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { PRICING_FEATURES } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";

function BillingFAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="border border-white/8 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-[#D63C6B]" : "bg-white/8"}`}>
          {open ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-white/60" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
  { q: "When does the free trial start?", a: "Your 7-day trial begins the moment you create your account — no credit card required. You'll have full access to every Pro feature during this period." },
  { q: "What happens after the trial ends?", a: "After 7 days, you can choose a Pro plan to continue with all features, or stay on a limited free tier. We'll send you a reminder 3 days before your trial expires." },
  { q: "How do I subscribe to Pro?", a: "Subscriptions are managed through the Apple App Store. Within the ShiftFlow app, go to Settings → Upgrade to Pro and choose your preferred billing cycle." },
  { q: "Can I switch between monthly and annual?", a: "Yes. You can switch your billing period at any time through your Apple ID subscription settings. Changes take effect at the start of your next billing cycle." },
  { q: "How do I cancel?", a: "Cancel anytime in your iPhone Settings → Apple ID → Subscriptions. You'll retain Pro access until the end of your current billing period — no partial refunds for unused time." },
  { q: "How do I restore my purchase on a new device?", a: "Open ShiftFlow, go to Settings, and tap 'Restore Purchases'. Your subscription is tied to your Apple ID and transfers automatically." },
  { q: "Do you offer refunds?", a: "Refunds are handled by Apple, not ShiftFlow. Visit reportaproblem.apple.com to request a refund. Apple reviews each case individually." },
];

export default function PricingClient() {
  const [annual, setAnnual] = useState(true); // annual on by default

  const plans = [
    {
      name: "Pro Annual",
      price: annual ? "$99" : "$8.25",
      priceNote: annual ? "/year" : "/mo · billed $99/yr",
      description: "Best for long-term financial protection.",
      badge: "MOST POPULAR",
      badgeColor: "#D63C6B",
      savingsBadge: "SAVE 17%",
      bestValue: true,
      cta: "Start Free Trial",
      ctaNote: "7 days free, then $99/yr",
      href: "/download",
      featured: true,
    },
    {
      name: "Pro Monthly",
      price: "$9.99",
      priceNote: "/month",
      description: "Flexible monthly access. Cancel anytime.",
      badge: null,
      badgeColor: null,
      savingsBadge: null,
      bestValue: false,
      cta: "Start Monthly Plan",
      ctaNote: "7-day free trial included",
      href: "/download",
      featured: false,
    },
    {
      name: "Free Trial",
      price: "$0",
      priceNote: "/ 30 days",
      description: "Full access. No credit card required.",
      badge: null,
      badgeColor: null,
      savingsBadge: null,
      bestValue: false,
      cta: "Download Free",
      ctaNote: "No credit card surprises",
      href: "/download",
      featured: false,
    },
  ];

  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.08)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-4">
              Simple, transparent <span className="gradient-text">pricing.</span>
            </h1>
            <p className="text-xl text-white/50 mb-10">
              Start free for 7 days. No credit card required.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-14">
              <span className={`text-sm font-medium ${!annual ? "text-white" : "text-white/40"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-[#D63C6B]" : "bg-white/20"}`}
                aria-label="Toggle annual"
              >
                <motion.div
                  layout
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  animate={{ x: annual ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-white" : "text-white/40"}`}>Annual</span>
              {annual && (
                <span className="px-2 py-0.5 bg-[#22C55E]/15 border border-[#22C55E]/25 rounded-full text-[#22C55E] text-xs font-semibold">Save 17%</span>
              )}
            </div>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.featured
                    ? "border-2 border-[#D63C6B] bg-[#D63C6B]/5 shadow-2xl shadow-[#D63C6B]/10"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                {plan.badge && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-b-lg text-white text-xs font-bold"
                    style={{ background: plan.badgeColor }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 pt-8">
                  <p className="text-white/50 text-sm font-medium mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-white text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-white/40 text-sm">{plan.priceNote}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-5">{plan.description}</p>

                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-6 ${
                      plan.featured
                        ? "bg-[#D63C6B] text-white hover:bg-[#c0355f] shadow-lg shadow-[#D63C6B]/25"
                        : "bg-white/8 text-white border border-white/10 hover:bg-white/15"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="border-t border-white/8 mb-5" />

                  <div className="space-y-2.5">
                    {PRICING_FEATURES.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#22C55E]" />
                        </div>
                        <span className="text-white/65 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, label: "No credit card", desc: "Start the 7-day trial with just your Apple ID." },
              { icon: RefreshCw, label: "Cancel anytime", desc: "Cancel through your iPhone Settings — no forms, no friction." },
              { icon: Zap, label: "Instant access", desc: "Full access to all Pro features starts immediately." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-[#D63C6B]/10 border border-[#D63C6B]/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#D63C6B]" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manage via App Store note */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <HelpCircle className="w-6 h-6 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 text-sm leading-relaxed">
              All ShiftFlow subscriptions are managed exclusively through the Apple App Store.
              To subscribe, update, or cancel, go to{" "}
              <strong className="text-white/80">Settings → Apple ID → Subscriptions</strong>{" "}
              on your iPhone. You can also tap <strong className="text-white/80">Restore Purchases</strong>{" "}
              in the ShiftFlow app to recover a prior subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Billing FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader label="Billing FAQ" title="Billing questions." />
          <div className="space-y-3">
            {billingFAQ.map((item, i) => (
              <BillingFAQItem key={i} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
