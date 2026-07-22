"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { PRICING_FEATURES } from "@/lib/constants";

export default function Pricing() {
  const [annual, setAnnual] = useState(true); // Annual ON by default

  const plans = [
    {
      name: "Pro Annual",
      price: annual ? "$99" : "$8.25",
      priceNote: annual ? "/year" : "/mo · billed $99/yr",
      description: "Best for long-term financial protection.",
      badge: "MOST POPULAR",
      badgeBg: "#D63C6B",
      savingsBadge: "SAVE 17%",
      bestValue: true,
      cta: "Start Free Trial",
      ctaNote: "7 days free, then $99/yr",
      href: "/download",
      featured: true,
      features: PRICING_FEATURES,
    },
    {
      name: "Pro Monthly",
      price: "$9.99",
      priceNote: "/month",
      description: "Flexible monthly access. Cancel anytime.",
      badge: null,
      savingsBadge: null,
      bestValue: false,
      cta: "Start Monthly Plan",
      ctaNote: "7-day free trial included",
      href: "/download",
      featured: false,
      features: PRICING_FEATURES,
    },
    {
      name: "Free Trial",
      price: "$0",
      priceNote: "/ 30 days",
      description: "Full access. No credit card required.",
      badge: null,
      savingsBadge: null,
      bestValue: false,
      cta: "Download Free",
      ctaNote: "No credit card surprises",
      href: "/download",
      featured: false,
      features: PRICING_FEATURES,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.07)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="Pricing"
          title="Simple, transparent pricing."
          subtitle="Start free for 7 days. No credit card required."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-white/40"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              annual ? "bg-[#D63C6B]" : "bg-white/20"
            }`}
            aria-label="Toggle annual pricing"
          >
            <motion.div
              layout
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
              animate={{ x: annual ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? "text-white" : "text-white/40"}`}>
            Annual
          </span>
          {annual && (
            <span className="px-2.5 py-0.5 bg-[#22C55E]/15 border border-[#22C55E]/25 rounded-full text-[#22C55E] text-xs font-semibold">
              Save 17%
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                plan.featured
                  ? "border-2 border-[#D63C6B] bg-[#D63C6B]/5 shadow-2xl shadow-[#D63C6B]/15"
                  : "border border-white/10 bg-white/[0.03]"
              }`}
            >
              {/* Top badge row */}
              {(plan.badge || plan.savingsBadge) && (
                <div className="flex items-center gap-2 px-6 pt-5 pb-0">
                  {plan.badge && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-black tracking-wide"
                      style={{ background: plan.badgeBg }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  {plan.savingsBadge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D63C6B]/15 border border-[#D63C6B]/25 text-[#D63C6B] text-[10px] font-black tracking-wide">
                      {plan.savingsBadge}
                    </span>
                  )}
                  {plan.bestValue && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/25 text-[#14B8A6] text-[10px] font-black tracking-wide">
                      BEST VALUE
                    </span>
                  )}
                </div>
              )}

              <div className={`p-6 flex flex-col flex-1 ${plan.badge ? "pt-3" : "pt-6"}`}>
                {/* Header */}
                <p className="text-white/50 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-white text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-white/40 text-sm ml-0.5">{plan.priceNote}</span>
                </div>
                <p className="text-white/40 text-sm mb-6">{plan.description}</p>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-2 ${
                    plan.featured
                      ? "bg-[#D63C6B] text-white hover:bg-[#c0355f] shadow-lg shadow-[#D63C6B]/30"
                      : "bg-white/8 text-white border border-white/10 hover:bg-white/15"
                  }`}
                >
                  {plan.cta}
                </Link>

                {plan.ctaNote && (
                  <p className="text-white/30 text-[11px] text-center mb-5">{plan.ctaNote}</p>
                )}

                {/* Divider */}
                <div className="border-t border-white/8 mb-5" />

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#22C55E]" />
                      </div>
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/8">
            <Shield className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span className="text-white/40 text-sm">
              Subscriptions managed securely through Apple App Store. Cancel anytime in Settings.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
