"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, CalendarCheck, Wallet, Clock, Receipt,
  FileText, ScanLine, Check,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { PLAN_POLICY, PRICING } from "@/lib/constants";

const features = [
  {
    icon: Clock,
    title: "Shift and Earnings Tracking",
    tag: "Free",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    description:
      "Log your shifts and see what you have earned. The free plan covers one employer and your last 30 days of records; subscribers get full history and multiple employers.",
    bullets: [
      "Shift tracking for one employer on the free plan",
      "Earnings from the hours you log",
      "Last 30 days of records on the free plan",
      "Full history and multiple employers with Pro",
      "Shift import with Pro",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Payday",
    tag: "Free",
    color: "#D63C6B",
    bg: "rgba(214,60,107,0.1)",
    description:
      "Set your pay schedule and see when your next payday is due, so you can plan rent and bills around it. Estimates are not a guarantee of what your employer will pay.",
    bullets: [
      "Next payday from your pay schedule",
      "Earnings so far in the pay period",
      "Included on the free plan",
    ],
  },
  {
    icon: Wallet,
    title: "Budget and Bill Reminders",
    tag: "Free",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
    description:
      "Keep a simple budget and get reminders before your bills are due.",
    bullets: [
      "Budget",
      "Bill reminders",
      "Included on the free plan",
    ],
  },
  {
    icon: Receipt,
    title: "Tax Report",
    tag: "Pro",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    description:
      "Subscribers get a tax report with GST/HST summaries, so your numbers are ready at tax time. Figures are estimates, not tax advice.",
    bullets: [
      "Tax report",
      "GST/HST summaries",
      "Export as PDF or CSV",
    ],
  },
  {
    icon: FileText,
    title: "Reports, Pay Statements and Invoices",
    tag: "Pro",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    description:
      "Export your records when you need them. Freelancers and contractors can create invoices for their work.",
    bullets: [
      "Report export in PDF and CSV",
      "Pay statements",
      "Self-employed invoicing",
    ],
  },
  {
    icon: ScanLine,
    title: "Receipt and Payslip Scanning",
    tag: "Pro",
    color: "#D63C6B",
    bg: "rgba(214,60,107,0.1)",
    description:
      "Scan a receipt or payslip with your camera. The text is read on your device using on-device text recognition.",
    bullets: [
      "Receipt scanning",
      "Payslip scanning",
      "On-device text recognition",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Paycheck Tracker",
    tag: "Pro",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    description:
      "Check a paycheque against the hours you logged, so you can see if an amount looks short.",
    bullets: [
      "Compare a paycheque with logged hours",
      "Available to subscribers",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D63C6B]/10 border border-[#D63C6B]/20 mb-6">
              <span className="text-[#D63C6B] text-xs font-semibold uppercase tracking-wider">All Features</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
              Built for the{" "}
              <span className="gradient-text">modern workforce.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Track your hours, earnings, payday, budget, bills and tax estimates in one iOS app.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature sections */}
      <section className="py-12 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="space-y-24">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: feature.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="text-white/55 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${feature.color}20` }}
                        >
                          <Check className="w-3 h-3" style={{ color: feature.color }} />
                        </div>
                        <span className="text-white/70 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual card */}
                <div className={`${!isEven ? "lg:order-1" : ""}`}>
                  <div
                    className="rounded-3xl border border-white/10 p-8 min-h-48 flex flex-col justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${feature.bg}, rgba(255,255,255,0.02))`,
                      boxShadow: `0 0 80px ${feature.color}15`,
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${feature.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    <div>
                      <p
                        className="text-4xl font-bold mb-1"
                        style={{ color: feature.color }}
                      >
                        {feature.tag}
                      </p>
                      <p className="text-white/50 text-sm">{feature.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Free vs Pro — rendered from PLAN_POLICY (constants) so the wording can't drift */}
      <section className="py-28 bg-[#080810]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader
            label="Comparison"
            title="Free vs Pro."
            subtitle={`Every plan starts with a ${PRICING.trialDays}-day Pro trial.`}
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <p className="text-white/40 text-sm font-medium mb-3">Free</p>
              <p className="text-white/80 text-base leading-relaxed">{PLAN_POLICY.free}</p>
            </div>
            <div className="bg-white/[0.03] border border-[#D63C6B]/40 rounded-3xl p-7">
              <p className="text-[#D63C6B] text-sm font-bold mb-3">Pro</p>
              <p className="text-white/80 text-base leading-relaxed">{PLAN_POLICY.subscribers}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-white/55 text-sm leading-relaxed">{PLAN_POLICY.lapse}</p>

          <div className="mt-10 text-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D63C6B] hover:bg-[#c0355f] rounded-xl text-white font-bold text-sm shadow-lg shadow-[#D63C6B]/30 transition-all duration-200"
            >
              Start Your {PRICING.trialDays}-Day Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
