"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow blob behind phone */}
      <div className="absolute w-96 h-96 rounded-full bg-[#D63C6B]/20 blur-[100px] pointer-events-none" />

      {/* Phone frame */}
      <div className="relative w-[314px] h-[642px] rounded-[48px] border-2 border-white/20 bg-[#111827] shadow-[0_40px_100px_rgba(0,0,0,0.75)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#111827] rounded-b-2xl z-10" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-7 pt-3 pb-1">
          <span className="text-white/70 text-[11px] font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px] items-end">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-[3px] rounded-sm bg-white/60" style={{ height: `${h}px` }} />
              ))}
            </div>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill="white" fillOpacity="0.6"/>
              <path d="M7.5 5.5C8.8 5.5 9.9 6 10.8 6.8L12.2 5.4C10.9 4.3 9.3 3.5 7.5 3.5C5.7 3.5 4.1 4.3 2.8 5.4L4.2 6.8C5.1 6 6.2 5.5 7.5 5.5Z" fill="white" fillOpacity="0.8"/>
              <circle cx="7.5" cy="9.5" r="1.5" fill="white"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 rounded-[3px] border border-white/40 p-[1px]">
                <div className="w-3/4 h-full bg-white/70 rounded-[2px]" />
              </div>
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="px-4 pt-1 pb-4 flex flex-col gap-3">
          {/* Header */}
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest font-medium">Weekly Earnings · Jun 9–15</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-white text-[28px] font-bold tracking-tight leading-none">$1,847</span>
              <span className="text-[#D63C6B] text-lg font-bold leading-none">.50</span>
              <span className="ml-1 px-1.5 py-0.5 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-md text-[#22C55E] text-[9px] font-bold">+12%</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-3">
            <div className="flex items-end gap-1 h-12">
              {[35, 60, 45, 75, 65, 90, 55].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t-sm origin-bottom"
                  style={{
                    height: `${h}%`,
                    background: i === 5
                      ? "linear-gradient(180deg, #D63C6B 0%, #c0355f 100%)"
                      : i === 6
                      ? "rgba(214,60,107,0.25)"
                      : "rgba(255,255,255,0.07)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="flex-1 text-center text-white/25 text-[8px] font-medium">{d}</span>
              ))}
            </div>
          </div>

          {/* Payday forecast */}
          <div className="flex items-center gap-2.5 bg-[#D63C6B]/10 border border-[#D63C6B]/20 rounded-xl px-3 py-2.5">
            <div className="w-2 h-2 rounded-full bg-[#D63C6B] animate-pulse flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[#D63C6B] text-[11px] font-semibold">Payday Forecast</p>
              <p className="text-white/50 text-[9px]">In 3 days · $892 expected</p>
            </div>
            <span className="text-white font-bold text-sm">→</span>
          </div>

          {/* Burnout + hours */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-2.5 flex items-center gap-2">
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke="#22C55E" strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 88" }}
                    animate={{ strokeDasharray: "63 88" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">72</span>
              </div>
              <div>
                <p className="text-white text-[10px] font-semibold">Burnout</p>
                <p className="text-[#22C55E] text-[9px] font-medium">Healthy ↑</p>
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-2.5">
              <p className="text-white/40 text-[9px]">This week</p>
              <p className="text-white text-[15px] font-bold mt-0.5">38.5<span className="text-[10px] font-normal text-white/40">h</span></p>
              <p className="text-[#14B8A6] text-[9px] font-medium">On track</p>
            </div>
          </div>

          {/* AI insight */}
          <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A0A0F] text-[7px] font-black">AI</span>
              </div>
              <span className="text-[#F59E0B] text-[10px] font-semibold">ShiftFlow Insight</span>
            </div>
            <p className="text-white/70 text-[10px] leading-tight">
              You&apos;re owed <span className="text-[#D63C6B] font-bold">$47.25</span> overtime. Tap to dispute →
            </p>
          </div>
        </div>
      </div>

      {/* Floating notification cards */}
      {/* Top-right: overtime */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-4 top-16 bg-[#1a2a1a]/90 backdrop-blur-xl border border-[#22C55E]/30 rounded-2xl px-4 py-3 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#22C55E] text-xs font-black">$</span>
          </div>
          <div>
            <p className="text-[#22C55E] text-xs font-bold">+$47.25 found</p>
            <p className="text-white/50 text-[10px]">Overtime detected</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left: payday */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-4 bottom-24 bg-[#1a0a10]/90 backdrop-blur-xl border border-[#D63C6B]/30 rounded-2xl px-4 py-3 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#D63C6B]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[#D63C6B] text-[10px] font-black">📅</span>
          </div>
          <div>
            <p className="text-white text-xs font-bold">Payday in 3 days</p>
            <p className="text-white/50 text-[10px]">$892 incoming</p>
          </div>
        </div>
      </motion.div>

      {/* Left-middle: burnout */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#0a1a18]/90 backdrop-blur-xl border border-[#14B8A6]/30 rounded-2xl px-3 py-2.5 shadow-2xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
          <p className="text-[#14B8A6] text-[11px] font-semibold whitespace-nowrap">Burnout improving ↑</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#050508]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_40%,rgba(214,60,107,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(20,184,166,0.07)_0%,transparent_60%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D63C6B]/[0.08] border border-[#D63C6B]/25 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D63C6B] animate-pulse" />
              <span className="text-[#D63C6B] text-xs font-semibold tracking-widest uppercase">
                AI-Powered Workforce Protection
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[52px] sm:text-[62px] lg:text-[68px] font-bold text-white tracking-tight leading-[1.05] mb-6"
            >
              Protect{" "}
              <span className="gradient-text">Every</span>
              {" "}Paycheck.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-white/55 leading-relaxed mb-4 max-w-lg"
            >
              ShiftFlow uses AI to track income, forecast paydays, catch payroll errors,
              manage burnout, and keep your finances balanced — so you&apos;re always paid fairly.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-white/35 mb-10"
            >
              Protect every paycheck for less than one payroll mistake.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="/download"
                className="inline-flex items-center gap-2 h-14 px-8 bg-[#D63C6B] hover:bg-[#c0355f] rounded-2xl text-white font-bold text-base shadow-[0_0_20px_rgba(214,60,107,0.35)] hover:shadow-[0_0_35px_rgba(214,60,107,0.55)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Free Trial →
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2.5 px-6 h-14 rounded-2xl border border-white/[0.12] text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.04] font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                How it works
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <span className="hidden sm:block text-white/20">·</span>
              <span className="text-white/45 text-sm">Free 30-day trial included</span>
              <span className="hidden sm:block text-white/20">·</span>
              <span className="text-white/45 text-sm">Free 30-day trial</span>
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {[
                { label: "+$312 underpayment found", color: "#22C55E", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
                { label: "Payday in 3 days", color: "#D63C6B", bg: "rgba(214,60,107,0.08)", border: "rgba(214,60,107,0.2)" },
                { label: "Burnout: Healthy ↑", color: "#14B8A6", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                  style={{ color: stat.color, background: stat.bg, border: `1px solid ${stat.border}` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: stat.color }} />
                  {stat.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
