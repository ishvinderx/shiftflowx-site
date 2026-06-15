"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";

interface TourTab {
  id: string;
  label: string;
  description: string;
  screenshot: string;
  alt: string;
  features: { icon: string; text: string }[];
  accentColor: string;
}

const tabs: TourTab[] = [
  {
    id: "home",
    label: "Dashboard",
    description:
      "Your complete financial picture at a glance — earnings, payday countdown, burnout ring, energy score, streak, and AI insights.",
    screenshot: "/screenshots/home.png",
    alt: "ShiftFlow Home Dashboard",
    accentColor: "#D63C6B",
    features: [
      { icon: "💰", text: "Today's earnings with weekly total" },
      { icon: "📅", text: "Payday countdown and pay cycle progress" },
      { icon: "🔥", text: "Energy level ring and streak tracker" },
      { icon: "✨", text: "AI-powered smart insights" },
    ],
  },
  {
    id: "shifts",
    label: "Shifts",
    description:
      "Log, browse, and manage every shift. Grouped by week, searchable by employer, with swipe-to-delete and bulk editing.",
    screenshot: "/screenshots/shifts.png",
    alt: "ShiftFlow Shifts tab",
    accentColor: "#D63C6B",
    features: [
      { icon: "🕐", text: "Clock in / clock out with one tap" },
      { icon: "📋", text: "Full shift history grouped by week" },
      { icon: "💼", text: "Multiple employer support" },
      { icon: "✏️", text: "Edit, duplicate, or delete any shift" },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    description:
      "Your Financial Intelligence Center — Financial Health Score, Earnings Intelligence, Career Intelligence, and AI recommendations.",
    screenshot: "/screenshots/insights.png",
    alt: "ShiftFlow Insights tab",
    accentColor: "#0EA5E9",
    features: [
      { icon: "📊", text: "Financial Health Score with 4 pillars" },
      { icon: "📈", text: "Best earning day and employer" },
      { icon: "🧠", text: "Career Intelligence (Pro)" },
      { icon: "🤖", text: "Personalised AI recommendations" },
    ],
  },
  {
    id: "paycheck",
    label: "Paycheck",
    description:
      "Payroll protection, upcoming paycheck forecast, money flow breakdown, tax reserve tracking, and invoice pipeline.",
    screenshot: "/screenshots/paycheck.png",
    alt: "ShiftFlow Paycheck Protection tab",
    accentColor: "#22C55E",
    features: [
      { icon: "🛡️", text: "4-point payroll protection checks" },
      { icon: "💵", text: "Expected paycheck with confidence score" },
      { icon: "📉", text: "Money flow: gross → tax → net" },
      { icon: "📋", text: "Payroll dispute report generator (Pro)" },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    description:
      "Preferences, privacy & security settings, AI configuration, widgets, and subscription management — all in one place.",
    screenshot: "/screenshots/profile.png",
    alt: "ShiftFlow Profile screen",
    accentColor: "#8B5CF6",
    features: [
      { icon: "⚙️", text: "Currency, tax rate, notifications" },
      { icon: "🔒", text: "Privacy & security centre" },
      { icon: "🤖", text: "AI Settings with DeepSeek integration" },
      { icon: "💎", text: "Subscription status and upgrade" },
    ],
  },
];

export default function ProductTour() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <section
      className="relative py-24 md:py-32 bg-[#080810] overflow-hidden"
      id="product-tour"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(214,60,107,0.05)_0%,transparent_65%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="Product Tour"
          title="Every screen. Explained."
          subtitle="Switch tabs to explore the real ShiftFlow interface."
        />

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive
                    ? "rgba(214,60,107,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(214,60,107,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#D63C6B" : "rgba(255,255,255,0.5)",
                }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(214,60,107,0.08)",
                      border: "1px solid rgba(214,60,107,0.3)",
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            {/* Left: text */}
            <div>
              <p className="text-white/60 text-base leading-relaxed mb-7">
                {active.description}
              </p>
              <ul className="space-y-4">
                {active.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center flex-shrink-0">
                      {f.icon}
                    </span>
                    <span className="text-white/70 text-sm">{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/[0.07]">
                <p className="text-white/30 text-xs">
                  Screenshot taken from ShiftFlow running on iPhone 17 Pro simulator
                  · iOS 26.4
                </p>
              </div>
            </div>

            {/* Right: device */}
            <div className="flex justify-center">
              <div
                className="relative"
                style={{
                  filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.65))",
                }}
              >
                <div
                  style={{
                    width: 250,
                    height: 540,
                    borderRadius: 50,
                    background: "#111",
                    border: "2.5px solid rgba(255,255,255,0.13)",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.8)",
                  }}
                >
                  {/* Notch */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 115,
                      height: 32,
                      borderRadius: "0 0 20px 20px",
                      background: "#111",
                      zIndex: 20,
                    }}
                  />
                  {/* Screenshot */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 48,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={active.screenshot}
                      alt={active.alt}
                      fill
                      className="object-cover object-top"
                      sizes="250px"
                      priority
                    />
                  </div>
                  {/* Shine */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 48,
                      background:
                        "linear-gradient(130deg, rgba(255,255,255,0.065) 0%, transparent 45%)",
                      pointerEvents: "none",
                      zIndex: 10,
                    }}
                  />
                </div>

                {/* Colour halo behind device */}
                <div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-32 blur-3xl rounded-full pointer-events-none"
                  style={{
                    background: active.accentColor,
                    opacity: 0.12,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
