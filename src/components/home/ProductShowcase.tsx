"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  ShieldCheck,
  CalendarClock,
  HeartPulse,
  FileSearch,
  TrendingUp,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  screenshot: string;
  screenshotAlt: string;
  badge?: { label: string; color: string };
  imageLeft: boolean;
}

const items: ShowcaseItem[] = [
  {
    id: "payroll-protection",
    icon: ShieldCheck,
    iconColor: "#F97316",
    iconBg: "rgba(249,115,22,0.12)",
    label: "Payroll Protection",
    title: "Catch payroll errors before they cost you.",
    description:
      "ShiftFlow cross-references every shift against your rate, expected hours, and overtime rules. Four automated checks run every pay cycle.",
    bullets: [
      "Overtime hours verified automatically",
      "Missing hours flagged instantly",
      "Underpayment detection built in",
      "Incorrect rate alerts on every shift",
    ],
    screenshot: "/screenshots/paycheck.png",
    screenshotAlt: "ShiftFlow Paycheck Protection screen showing payroll checks",
    badge: { label: "Active", color: "#22C55E" },
    imageLeft: false,
  },
  {
    id: "insights",
    icon: TrendingUp,
    iconColor: "#0EA5E9",
    iconBg: "rgba(14,165,233,0.12)",
    label: "Financial Intelligence",
    title: "Your complete financial intelligence center.",
    description:
      "The Insights tab surfaces your ShiftFlow Score, Earnings Insights, Career & Work Insights, and AI-generated recommendations — all from your real shift data.",
    bullets: [
      "ShiftFlow Score (0–100) across 4 pillars",
      "Best earning day and employer tracked",
      "Monthly rate growth and employer ranking",
      "AI recommendations tuned to your patterns",
    ],
    screenshot: "/screenshots/insights.png",
    screenshotAlt: "ShiftFlow Insights screen showing Financial Intelligence Center",
    imageLeft: true,
  },
  {
    id: "payday",
    icon: CalendarClock,
    iconColor: "#D63C6B",
    iconBg: "rgba(214,60,107,0.12)",
    label: "Payday Forecasting",
    title: "Know exactly when your paycheck arrives.",
    description:
      "The Paycheck tab shows your expected earnings, days until payday, and a confidence score — so you can plan ahead instead of guessing.",
    bullets: [
      "Expected paycheck amount calculated",
      "Countdown in days to next payday",
      "96% confidence indicator on forecasts",
      "Paycheck progress ring updated in real-time",
    ],
    screenshot: "/screenshots/paycheck.png",
    screenshotAlt: "ShiftFlow Paycheck tab showing upcoming paycheck forecast",
    imageLeft: false,
  },
  {
    id: "burnout",
    icon: HeartPulse,
    iconColor: "#EF4444",
    iconBg: "rgba(239,68,68,0.12)",
    label: "Burnout Prevention",
    title: "Track stress before it impacts your income.",
    description:
      "ShiftFlow monitors consecutive days worked, overnight shifts, and work-life balance to give you a real-time wellbeing picture on your home screen.",
    bullets: [
      "Energy level ring shown on dashboard",
      "Consecutive workday streak monitored",
      "Burnout risk score updated per shift",
      "Recovery guidance built into AI insights",
    ],
    screenshot: "/screenshots/home.png",
    screenshotAlt: "ShiftFlow Home screen showing burnout and energy widgets",
    imageLeft: true,
  },
  {
    id: "career",
    icon: FileSearch,
    iconColor: "#8B5CF6",
    iconBg: "rgba(139,92,246,0.12)",
    label: "Career & Work Insights",
    title: "Find your most profitable employer and shift.",
    description:
      "Career & Work Insights analyzes your earnings history across every employer and shift type — so you always know where to focus your time.",
    bullets: [
      "Monthly rate growth charted over time",
      "Employer ranking by effective hourly rate",
      "Best earning day of the week identified",
      "Pro feature — unlocked with ShiftFlow Pro",
    ],
    screenshot: "/screenshots/insights.png",
    screenshotAlt: "ShiftFlow Career & Work Insights screen",
    imageLeft: false,
  },
];

function IPhoneMockup({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: { label: string; color: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex justify-center"
      style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))" }}
    >
      <div
        className="relative"
        style={{
          width: 240,
          height: 520,
          borderRadius: 48,
          background: "#111",
          border: "2.5px solid rgba(255,255,255,0.14)",
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.9)",
        }}
      >
        {/* Dynamic island / notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          style={{
            width: 110,
            height: 30,
            borderRadius: "0 0 20px 20px",
            background: "#111",
          }}
        />
        {/* Screenshot */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: 46 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="240px"
            priority
          />
        </div>
        {/* Shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 46,
            background:
              "linear-gradient(130deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
          }}
        />
        {/* Badge */}
        {badge && (
          <div
            className="absolute top-6 right-3.5 z-30 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ background: badge.color }}
          >
            {badge.label}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  return (
    <section
      className="relative py-24 md:py-32 bg-[#050508] overflow-hidden"
      id="product-showcase"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.05)_0%,transparent_65%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="See It In Action"
          title="Real screenshots from the actual app."
          subtitle="Every image below is captured directly from ShiftFlow running on an iPhone simulator. No illustrations. No mockups. No marketing magic."
        />

        <div className="space-y-28 md:space-y-36">
          {items.map((item) => {
            const Icon = item.icon;
            const textSide = (
              <motion.div
                key={`text-${item.id}`}
                initial={{ opacity: 0, x: item.imageLeft ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center"
              >
                {/* Label */}
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: item.iconBg }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: item.iconColor }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/55 text-base leading-relaxed mb-6 max-w-lg">
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: item.iconBg }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 12 12"
                          style={{ color: item.iconColor }}
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-white/65 text-sm leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );

            const imageSide = (
              <IPhoneMockup
                key={`img-${item.id}`}
                src={item.screenshot}
                alt={item.screenshotAlt}
                badge={item.badge}
              />
            );

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center"
              >
                {item.imageLeft ? (
                  <>
                    {imageSide}
                    {textSide}
                  </>
                ) : (
                  <>
                    {textSide}
                    {imageSide}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
