"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  Clock,
  ShieldCheck,
  TrendingUp,
  Brain,
  CheckCircle2,
  BarChart3,
  Trophy,
} from "lucide-react";

interface Feature {
  id: string;
  badge: string;
  icon: React.ElementType;
  accent: string;
  headline: string;
  description: string;
  bullets: [string, string, string];
  visual: "screenshot" | "tax-widgets" | "progress-ring" | "achievement-badges";
  screenshot?: string;
}

const features: Feature[] = [
  {
    id: "track-shifts",
    badge: "Shift Tracking",
    icon: Clock,
    accent: "#D63C6B",
    headline: "Track Every Shift",
    description:
      "Log clock-in, clock-out, breaks, tips, and mileage in seconds.\nBuilt for nurses, retail workers, drivers, and every shift worker.",
    bullets: [
      "One-tap clock-in with smart break detection",
      "Automatic overtime threshold alerts",
      "Full shift history with earnings breakdown",
    ],
    visual: "screenshot",
    screenshot: "/screenshots/shifts.png",
  },
  {
    id: "payroll-protection",
    badge: "Payroll Protection",
    icon: ShieldCheck,
    accent: "#22C55E",
    headline: "Payroll Protection",
    description:
      "AI cross-checks every paycheck against your logged shifts.\nCatch underpayments before they compound.",
    bullets: [
      "Detect missing overtime and short rates instantly",
      "Side-by-side shift vs. payslip comparison",
      "Dispute-ready export with documented evidence",
    ],
    visual: "screenshot",
    screenshot: "/screenshots/paycheck.png",
  },
  {
    id: "tax-planning",
    badge: "Tax Intelligence",
    icon: TrendingUp,
    accent: "#F59E0B",
    headline: "Tax Planning",
    description:
      "Stop dreading tax season. ShiftFlow estimates your liability every week\nso you're never blindsided by a bill.",
    bullets: [
      "Weekly tax set-aside calculation by jurisdiction",
      "Mileage and expense deduction tracking",
      "Quarterly estimated tax reminders",
    ],
    visual: "tax-widgets",
  },
  {
    id: "ai-career",
    badge: "AI Intelligence",
    icon: Brain,
    accent: "#F59E0B",
    headline: "AI Career Intelligence",
    description:
      "Your personal financial advisor for shift workers — always on,\nalways learning, always on your side.",
    bullets: [
      "Personalized earnings trend analysis",
      "Shift scheduling recommendations to maximise income",
      "Career growth score with actionable next steps",
    ],
    visual: "screenshot",
    screenshot: "/screenshots/insights.png",
  },
  {
    id: "daily-checkin",
    badge: "Wellness",
    icon: CheckCircle2,
    accent: "#14B8A6",
    headline: "Daily Check-In",
    description:
      "A 10-second daily pulse check that tracks your fatigue, mood, and stress.\nSpot burnout before it derails you.",
    bullets: [
      "ShiftFlow Burnout Score updated after every shift",
      "Consecutive-day and night-shift overload alerts",
      "Personalised recovery suggestions",
    ],
    visual: "progress-ring",
  },
  {
    id: "financial-dashboard",
    badge: "Dashboard",
    icon: BarChart3,
    accent: "#D63C6B",
    headline: "Financial Dashboard",
    description:
      "Every dollar, every shift, every payday — in one premium view.\nKnow exactly where you stand at a glance.",
    bullets: [
      "Rolling 30/90-day earnings overview",
      "Payday countdown with forecast amount",
      "Net vs. gross earnings comparison chart",
    ],
    visual: "screenshot",
    screenshot: "/screenshots/home-dashboard.png",
  },
  {
    id: "achievements",
    badge: "Achievements",
    icon: Trophy,
    accent: "#22C55E",
    headline: "Achievements",
    description:
      "Stay motivated with milestone badges and streak rewards.\nFinancial wellness is a journey — celebrate every step.",
    bullets: [
      "Unlock badges for logging streaks and error catches",
      "Leaderboard rank among workers in your field",
      "Share achievements to boost team morale",
    ],
    visual: "achievement-badges",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Tax Widget visual ──────────────────────────────────────────────────────

function TaxWidgets({ accent }: { accent: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      {/* Main card */}
      <div className="relative w-full max-w-[280px] space-y-3">
        {/* Tax set-aside widget */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs font-medium uppercase tracking-wide">
              Tax Set-Aside
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${accent}22`, color: accent }}>
              This Week
            </span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$124.50</div>
          <div className="text-white/40 text-xs">Based on 38.5 hrs · Est. 22% effective rate</div>
          <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
              className="h-full rounded-full"
              style={{ background: accent }}
            />
          </div>
        </motion.div>

        {/* Deductions card */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="glass-card rounded-2xl p-4"
        >
          <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-2">
            Deductions Found
          </p>
          <div className="space-y-1.5">
            {[
              { label: "Mileage (412 mi)", value: "$247" },
              { label: "Uniform expenses", value: "$89" },
              { label: "Union dues", value: "$52" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-white/60">{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quarterly reminder pill */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-center gap-2 glass-card rounded-xl px-3 py-2"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
          <span className="text-white/70 text-xs">Q2 estimated tax due in 14 days</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Progress Ring visual ───────────────────────────────────────────────────

function ProgressRing({ accent }: { accent: string }) {
  const circumference = 2 * Math.PI * 54;
  const score = 78;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-15"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />
      <div className="relative flex flex-col items-center gap-6 w-full max-w-[280px]">
        {/* Ring */}
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            {/* Track */}
            <circle
              cx="70" cy="70" r="54"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            {/* Progress */}
            <motion.circle
              cx="70" cy="70" r="54"
              fill="none"
              stroke={accent}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
              style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
            />
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-4xl font-bold text-white"
            >
              {score}
            </motion.span>
            <span className="text-white/40 text-xs mt-0.5">Wellness Score</span>
          </div>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {[
            { label: "Streak", value: "12 days" },
            { label: "Risk", value: "Low" },
            { label: "Avg Hours", value: "9.2 / day" },
            { label: "Night Shifts", value: "2 this week" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-3 text-center">
              <div className="text-white font-semibold text-sm">{s.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Achievement Badges visual ──────────────────────────────────────────────

const BADGE_DATA = [
  { label: "First Catch", sub: "Payroll error found", color: "#D63C6B", delay: 0 },
  { label: "7-Day Streak", sub: "7 days logged", color: "#22C55E", delay: 0.15 },
  { label: "Tax Saver", sub: "$500 set aside", color: "#F59E0B", delay: 0.3 },
  { label: "Night Owl", sub: "10 night shifts", color: "#14B8A6", delay: 0.45 },
  { label: "Overtime Pro", sub: "OT claimed 5×", color: "#6366F1", delay: 0.6 },
  { label: "Top Earner", sub: "Record week!", color: "#D63C6B", delay: 0.75 },
];

function AchievementBadges() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 rounded-3xl blur-3xl opacity-10 bg-gradient-to-br from-green-500 to-teal-500" />
      <div className="relative grid grid-cols-2 gap-3 w-full max-w-[280px]">
        {BADGE_DATA.map((badge, i) => (
          <motion.div
            key={badge.label}
            animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            }}
            className="glass-card rounded-2xl p-3 flex flex-col items-center text-center gap-1"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: `${badge.color}22`, border: `1px solid ${badge.color}44` }}
            >
              <Trophy className="w-5 h-5" style={{ color: badge.color }} />
            </div>
            <span className="text-white font-semibold text-xs leading-tight">{badge.label}</span>
            <span className="text-white/40 text-[10px] leading-tight">{badge.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Screenshot frame ───────────────────────────────────────────────────────

function PhoneFrame({ src, accent }: { src: string; accent: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle at 50% 60%, ${accent}, transparent 70%)` }}
      />
      {/* Phone shell */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
        style={{
          width: 220,
          background: "#0a0a12",
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${accent}22`,
        }}
      >
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-20 h-5 rounded-full bg-black" />
        </div>
        {/* Screenshot */}
        <div className="relative w-full" style={{ aspectRatio: "9/19" }}>
          <Image
            src={src}
            alt="ShiftFlow app screenshot"
            fill
            className="object-cover object-top"
            sizes="220px"
          />
        </div>
        {/* Home indicator */}
        <div className="flex justify-center py-2">
          <div className="w-24 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

// ─── Single Feature Row ─────────────────────────────────────────────────────

interface FeatureRowProps {
  feature: Feature;
  index: number;
}

function FeatureRow({ feature, index }: FeatureRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const Icon = feature.icon;

  const textVariants = {
    hidden: { opacity: 0, x: isEven ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const visualVariants = {
    hidden: { opacity: 0, x: isEven ? 40 : -40, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE, delay: 0.1 },
    },
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: EASE, delay: 0.3 + i * 0.1 },
    }),
  };

  return (
    <div ref={ref} className="relative">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center gap-12 lg:gap-20`}
      >
        {/* Text side */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 min-w-0"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider border"
            style={{
              background: `${feature.accent}15`,
              borderColor: `${feature.accent}35`,
              color: feature.accent,
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {feature.badge}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {feature.headline}
          </h2>

          {/* Description */}
          <div className="text-white/50 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {feature.description}
          </div>

          {/* Bullets */}
          <ul className="space-y-3">
            {feature.bullets.map((bullet, i) => (
              <motion.li
                key={bullet}
                custom={i}
                variants={bulletVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex items-start gap-3"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${feature.accent}20` }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: feature.accent }}
                  />
                </div>
                <span className="text-white/70 text-base leading-relaxed">{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Visual side */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 min-w-0 w-full"
        >
          <div className="relative h-[480px] lg:h-[540px] flex items-center justify-center">
            {feature.visual === "screenshot" && feature.screenshot && (
              <PhoneFrame src={feature.screenshot} accent={feature.accent} />
            )}
            {feature.visual === "tax-widgets" && (
              <TaxWidgets accent={feature.accent} />
            )}
            {feature.visual === "progress-ring" && (
              <ProgressRing accent={feature.accent} />
            )}
            {feature.visual === "achievement-badges" && (
              <AchievementBadges />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Section divider ────────────────────────────────────────────────────────

function SectionDivider({ accent }: { accent: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-white/[0.04]" />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function FeatureShowcase() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#050508]">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.04] bg-[#D63C6B]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04] bg-[#14B8A6]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/50 text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D63C6B]" />
            Everything You Need
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Built for how you{" "}
            <span className="gradient-text">actually work</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Seven powerful features that protect your earnings, track your wellbeing, and fuel your career growth.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={feature.id}>
              <FeatureRow feature={feature} index={index} />
              {index < features.length - 1 && (
                <div className="mt-8">
                  <SectionDivider accent={features[index + 1].accent} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
