"use client";

import { motion } from "framer-motion";
import { Clock, CalendarCheck, Wallet, FileText } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  {
    number: "01",
    icon: Clock,
    title: "Log Your Shift",
    description:
      "Enter your start and end time and your employer. No more manual spreadsheets.",
    color: "#D63C6B",
    bgColor: "rgba(214,60,107,0.1)",
    ringColor: "rgba(214,60,107,0.3)",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "See Earnings and Payday",
    description:
      "Your logged hours turn into earnings, and your pay schedule shows when payday is due.",
    color: "#6366F1",
    bgColor: "rgba(99,102,241,0.1)",
    ringColor: "rgba(99,102,241,0.3)",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Keep Budget and Bills",
    description:
      "Set a budget and get reminders before your bills are due.",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.1)",
    ringColor: "rgba(245,158,11,0.3)",
  },
  {
    number: "04",
    icon: FileText,
    title: "Check and Export",
    description:
      "Subscribers can check a paycheque against logged hours, view a tax report and export records.",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.1)",
    ringColor: "rgba(34,197,94,0.3)",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-[#080810] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(214,60,107,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(34,197,94,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="How It Works"
          title="From shift to payday."
          subtitle="Four steps to keep track of what you earn."
        />

        <div className="relative">
          {/* Animated connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[28px] left-[calc(12.5%+36px)] right-[calc(12.5%+36px)] h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg, #D63C6B, #6366F1, #F59E0B, #22C55E)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number circle with glowing ring */}
                  <div className="relative mb-6">
                    {/* Outer glow ring */}
                    <div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{ background: step.ringColor }}
                    />
                    {/* Circle */}
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center border border-white/10"
                      style={{ background: step.bgColor }}
                    >
                      <span className="text-white font-bold text-base">{i + 1}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: step.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
