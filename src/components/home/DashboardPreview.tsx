"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

const tabs = ["Dashboard", "AI Assistant", "Pay Tracker", "Invoice"];

function DashboardTab() {
  return (
    <div className="space-y-4">
      {/* Top row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Weekly Earnings</p>
          <div className="flex items-baseline gap-1 mb-1">
            <p className="text-white text-2xl font-bold tracking-tight">$1,847</p>
            <span className="text-[#D63C6B] font-bold text-lg">.50</span>
            <span className="ml-2 text-[#22C55E] text-xs font-semibold">▲ 12%</span>
          </div>
          <div className="flex items-end gap-1 mt-3 h-12">
            {[35, 60, 45, 80, 65, 95, 58].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: i === 5
                    ? "linear-gradient(180deg, #D63C6B, #c0355f)"
                    : "rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
        </div>
        <div className="bg-[#D63C6B]/10 border border-[#D63C6B]/20 rounded-2xl p-4 flex flex-col justify-between">
          <p className="text-[#D63C6B] text-xs font-semibold">Payday in</p>
          <div>
            <p className="text-white text-3xl font-bold">3</p>
            <p className="text-white/40 text-xs">days</p>
          </div>
          <p className="text-white font-bold">$892</p>
        </div>
      </div>

      {/* Metric row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="63 88" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">72</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Burnout</p>
            <p className="text-[#22C55E] text-xs font-medium">Healthy ↑</p>
          </div>
        </div>
        <div className="col-span-2 bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-2">Recent Shifts</p>
          <div className="space-y-2">
            {[
              { date: "Today", time: "8h 30m", pay: "$191.25" },
              { date: "Yesterday", time: "9h 00m", pay: "$202.50" },
            ].map((shift, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-xs font-medium">{shift.date}</p>
                  <p className="text-white/40 text-[10px]">{shift.time}</p>
                </div>
                <p className="text-[#22C55E] text-xs font-semibold">{shift.pay}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-[#6366F1]/[0.08] border border-[#6366F1]/20 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-black">AI</span>
        </div>
        <div>
          <p className="text-[#6366F1] text-xs font-semibold mb-0.5">ShiftFlow Insight</p>
          <p className="text-white/70 text-sm">
            You&apos;re owed <span className="text-[#D63C6B] font-semibold">$47.25</span> in overtime this week. Tap to view details and raise a dispute.
          </p>
        </div>
      </div>
    </div>
  );
}

function AIAssistantTab() {
  return (
    <div className="space-y-4">
      {/* Messages */}
      <div className="space-y-3">
        {/* AI message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">AI</span>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm p-3 text-sm text-white/80 max-w-sm">
            Hi! I&apos;m your ShiftFlow AI assistant. How can I help protect your income today?
          </div>
        </div>
        {/* User message */}
        <div className="flex gap-3 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[#D63C6B] flex-shrink-0" />
          <div className="bg-[#D63C6B]/12 border border-[#D63C6B]/20 rounded-2xl rounded-tr-sm p-3 text-sm text-white max-w-sm">
            Was I paid correctly this week?
          </div>
        </div>
        {/* AI response */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">AI</span>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm p-3 text-sm text-white/80 max-w-sm">
            I found a potential issue. Based on your <span className="text-white font-semibold">42.5h worked</span> at $18/hr, you should have received{" "}
            <span className="text-[#22C55E] font-semibold">$133 in overtime pay</span>. Your payslip shows $0 overtime.{" "}
            <span className="text-[#D63C6B] font-semibold">That&apos;s a $133 discrepancy.</span> Would you like me to generate a dispute report?
          </div>
        </div>
      </div>
      {/* Typing indicator */}
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 rounded-full bg-[#6366F1] flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-[9px] font-black">AI</span>
        </div>
        <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/40"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
      {/* Section 5 honest framing: AI explains the deterministic engine numbers — it does
          not independently compute taxes or invent figures. */}
      <p className="mt-4 text-[11px] leading-snug text-white/40">
        ShiftFlow AI explains the numbers your engines already calculated — it doesn&apos;t
        compute your taxes or invent figures.
      </p>
    </div>
  );
}

function PayTrackerTab() {
  return (
    <div className="space-y-4">
      {/* Alert banner */}
      <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[#F59E0B] text-sm">⚠️</span>
        </div>
        <div>
          <p className="text-[#F59E0B] text-sm font-semibold">Discrepancy Detected</p>
          <p className="text-white/60 text-xs">Expected $892.50 · Received $845.00 · <span className="text-[#D63C6B] font-semibold">$47.50 missing</span></p>
        </div>
      </div>

      {/* Pay comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 text-center">
          <p className="text-white/40 text-xs mb-2">Expected</p>
          <p className="text-[#22C55E] text-xl font-bold">$892.50</p>
        </div>
        <div className="bg-[#D63C6B]/[0.06] border border-[#D63C6B]/20 rounded-2xl p-4 text-center">
          <p className="text-white/40 text-xs mb-2">Received</p>
          <p className="text-[#D63C6B] text-xl font-bold">$845.00</p>
        </div>
      </div>

      {/* History */}
      <div>
        <p className="text-white/40 text-xs mb-3">Pay History</p>
        {[
          { period: "Jun 9–15", gross: "$1,847.50", net: "$1,432.11", status: "Pending" },
          { period: "Jun 2–8", gross: "$2,104.25", net: "$1,631.29", status: "Received" },
          { period: "May 26–Jun 1", gross: "$1,688.00", net: "$1,308.24", status: "Received" },
        ].map((pay, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
            <div>
              <p className="text-white text-sm font-medium">{pay.period}</p>
              <p className="text-white/40 text-xs">Net: {pay.net}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold text-sm">{pay.gross}</p>
              <span className={`text-xs font-medium ${pay.status === "Pending" ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>
                {pay.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoiceTab() {
  return (
    <div>
      <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6">
        {/* Invoice header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white font-bold text-lg tracking-tight">Invoice #SF-042</p>
            <p className="text-white/40 text-xs mt-0.5">Issued: June 15, 2025 · Due: June 30, 2025</p>
          </div>
          <span className="px-3 py-1.5 bg-[#22C55E]/12 border border-[#22C55E]/25 rounded-xl text-[#22C55E] text-xs font-semibold">
            Sent ✓
          </span>
        </div>

        {/* Bill to */}
        <div className="bg-white/[0.03] rounded-xl p-3 mb-5">
          <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Bill To</p>
          <p className="text-white text-sm font-medium">Acme Corp Ltd.</p>
          <p className="text-white/40 text-xs">accounts@acmecorp.com</p>
        </div>

        {/* Line items */}
        <div className="space-y-2 mb-5">
          {[
            { desc: "Consulting — 12hrs @ $100/hr", amount: "$1,200.00" },
            { desc: "After-hours support", amount: "$375.00" },
            { desc: "Mileage (47mi)", amount: "$33.11" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-1.5 border-b border-white/[0.05] last:border-0">
              <span className="text-white/60">{item.desc}</span>
              <span className="text-white font-medium">{item.amount}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <span className="text-white font-semibold">Total Due</span>
          <span className="text-[#22C55E] font-bold text-xl">$1,608.11</span>
        </div>
      </div>
    </div>
  );
}

const tabContent: Record<string, React.ReactNode> = {
  "Dashboard": <DashboardTab />,
  "AI Assistant": <AIAssistantTab />,
  "Pay Tracker": <PayTrackerTab />,
  "Invoice": <InvoiceTab />,
};

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <section className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(99,102,241,0.06)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="Product"
          title="See it in action."
          subtitle="A powerful dashboard built for clarity. Every number, explained."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab switcher */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#D63C6B] text-white shadow-[0_0_20px_rgba(214,60,107,0.35)]"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard card */}
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
            {/* Top glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-[#D63C6B] opacity-[0.05] blur-[60px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
