"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, CalendarCheck, HeartPulse, Bot, Receipt,
  FileText, ScanLine, TrendingUp, Briefcase, BookOpen, Check,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";

const features = [
  {
    icon: ShieldCheck,
    title: "Payroll Intelligence",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    description:
      "Our AI engine cross-references every shift against your contracted rate, applicable overtime rules, penalty rates, and tax obligations. We flag discrepancies the moment they appear — before payday.",
    bullets: [
      "Automatic overtime detection (daily & weekly)",
      "Penalty rate identification",
      "Historical trend comparison",
      "Instant discrepancy alerts",
      "One-tap dispute support",
    ],
  },
  {
    icon: Bot,
    title: "AI Financial Assistant",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    description:
      "Ask anything. Your personal AI advisor is trained on employment law, payroll regulations, and financial planning. Get clear, actionable answers in seconds — not hours of Googling.",
    bullets: [
      "Natural language pay queries",
      "Overtime eligibility checks",
      "Tax estimation & questions",
      "Shift scheduling advice",
      "Dispute letter drafting",
    ],
  },
  {
    icon: HeartPulse,
    title: "Burnout Analytics",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
    description:
      "ShiftFlow tracks consecutive work days, weekly hour totals, and stress indicators to calculate your real-time burnout score. Know when to rest before your body forces you to.",
    bullets: [
      "Real-time fatigue score (0–100)",
      "Consecutive day tracking",
      "Weekly hour load monitoring",
      "Rest day recommendations",
      "Historical energy trends",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Payday Forecasting",
    color: "#D63C6B",
    bg: "rgba(214,60,107,0.1)",
    description:
      "Know exactly when your next paycheck will land and how much it will be. ShiftFlow models your pay schedule with precision so you can plan rent, bills, and savings with confidence.",
    bullets: [
      "Accurate payday predictions",
      "Net pay estimates (after tax)",
      "Bill & payment scheduling",
      "Pay calendar export",
      "Multi-employer support",
    ],
  },
  {
    icon: Receipt,
    title: "Tax Estimation",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    description:
      "ShiftFlow auto-calculates your weekly tax set-aside based on your income, jurisdiction, and work type. No more end-of-year tax shock — stay ahead all year long.",
    bullets: [
      "Weekly tax set-aside calculation",
      "Jurisdiction-aware (US, CA, UK, AU)",
      "Freelancer & PAYE support",
      "Annual tax projection",
      "Deduction tracking",
    ],
  },
  {
    icon: FileText,
    title: "Invoice Generator",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
    description:
      "Create professional, branded invoices in seconds. Perfect for freelancers and contractors who need to bill clients quickly and track payment status.",
    bullets: [
      "Professional invoice templates",
      "Auto-fill from shift data",
      "PDF export & share",
      "Payment status tracking",
      "Multi-currency support",
    ],
  },
  {
    icon: ScanLine,
    title: "Payslip OCR Scanner",
    color: "#D63C6B",
    bg: "rgba(214,60,107,0.1)",
    description:
      "Photograph your payslip and let ShiftFlow's AI extract every number automatically. We then verify the figures against your logged shifts and alert you to any issues.",
    bullets: [
      "Instant payslip scanning",
      "Automatic number extraction",
      "Cross-verification with logs",
      "Error highlighting",
      "Historical payslip archive",
    ],
  },
  {
    icon: TrendingUp,
    title: "ShiftFlow Score",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
    description:
      "Your ShiftFlow Score is a holistic view of your financial wellness — combining income consistency, pay accuracy, savings habits, and burnout levels into one actionable number.",
    bullets: [
      "Composite wellness score",
      "Income stability rating",
      "Savings consistency tracking",
      "Week-over-week trends",
      "Personalized improvement tips",
    ],
  },
  {
    icon: Briefcase,
    title: "Career & Work Insights",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    description:
      "ShiftFlow tracks your career trajectory — income growth, skill progression, and industry benchmarks — so you can make informed decisions about raises, roles, and opportunities.",
    bullets: [
      "Income growth tracking",
      "Industry pay benchmarks",
      "Raise timing suggestions",
      "Career milestone alerts",
      "Skills & role tracking",
    ],
  },
  {
    icon: BookOpen,
    title: "Work Journal & Energy Tracker",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    description:
      "Log notes, energy levels, and mood after each shift. Over time, ShiftFlow surfaces patterns — which shifts drain you most, which coworkers lift you up, and when you do your best work.",
    bullets: [
      "Shift journaling",
      "Energy level logging (1–10)",
      "Mood & sentiment tracking",
      "Pattern recognition",
      "Wellbeing trend reports",
    ],
  },
];

const comparisonFeatures = [
  { feature: "Shift Logging", free: true, plus: true },
  { feature: "Basic Earnings View", free: true, plus: true },
  { feature: "Payday Countdown", free: true, plus: true },
  { feature: "AI Payroll Protection", free: "7 days", plus: true },
  { feature: "Payday Forecasting", free: "7 days", plus: true },
  { feature: "Burnout Analytics", free: "7 days", plus: true },
  { feature: "Smart AI Assistant", free: "7 days", plus: true },
  { feature: "Tax Estimation", free: false, plus: true },
  { feature: "Invoice Generator", free: false, plus: true },
  { feature: "Payslip OCR Scanner", free: false, plus: true },
  { feature: "ShiftFlow Score", free: false, plus: true },
  { feature: "Career & Work Insights", free: false, plus: true },
  { feature: "Work Journal", free: false, plus: true },
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
              Every feature designed to protect, inform, and empower workers. From payroll protection to burnout prevention.
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
                        {i === 0 ? "4-point" : i === 1 ? "24/7" : i === 2 ? "72h" : i === 3 ? "3 days" : i === 4 ? "$0 surprise" : i === 5 ? "10s" : i === 6 ? "OCR" : i === 7 ? "Score" : i === 8 ? "Growth" : "Logged"}
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

      {/* Feature comparison table */}
      <section className="py-28 bg-[#080810]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader
            label="Comparison"
            title="Feature comparison."
            subtitle="Everything included in the 7-day free trial."
          />

          <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/8">
              <div className="p-5 text-white/40 text-sm font-medium">Feature</div>
              <div className="p-5 text-center text-white/40 text-sm font-medium border-l border-white/8">
                Free Trial (7 days)
              </div>
              <div className="p-5 text-center border-l border-white/8">
                <span className="text-[#D63C6B] text-sm font-bold">Pro</span>
              </div>
            </div>

            {comparisonFeatures.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 border-b border-white/5 last:border-0 ${
                  i % 2 === 0 ? "" : "bg-white/[0.01]"
                }`}
              >
                <div className="p-4 text-white/70 text-sm">{row.feature}</div>
                <div className="p-4 text-center border-l border-white/5">
                  {row.free === true ? (
                    <Check className="w-4 h-4 text-[#22C55E] mx-auto" />
                  ) : row.free === false ? (
                    <span className="text-white/20 text-sm">—</span>
                  ) : (
                    <span className="text-[#F59E0B] text-xs font-medium">{row.free}</span>
                  )}
                </div>
                <div className="p-4 text-center border-l border-white/5">
                  {row.plus === true ? (
                    <Check className="w-4 h-4 text-[#22C55E] mx-auto" />
                  ) : (
                    <span className="text-white/20 text-sm">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D63C6B] hover:bg-[#c0355f] rounded-xl text-white font-bold text-sm shadow-lg shadow-[#D63C6B]/30 transition-all duration-200"
            >
              Start Your 7-Day Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
