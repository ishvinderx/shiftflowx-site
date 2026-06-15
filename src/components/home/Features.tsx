"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck,
  HeartPulse,
  Bot,
  Receipt,
  FileText,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  CalendarCheck,
  HeartPulse,
  Bot,
  Receipt,
  FileText,
  ScanLine,
  TrendingUp,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Features() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050508] overflow-hidden" id="features">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(20,184,166,0.06)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(214,60,107,0.04)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="Features"
          title="Every tool a modern worker needs."
          subtitle="Built to protect your income, forecast your future, and keep you financially healthy."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20 rounded-2xl p-6 transition-colors duration-300 cursor-default overflow-hidden"
              >
                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feature.bgColor }}
                >
                  {Icon && <Icon className="w-5 h-5" style={{ color: feature.color }} />}
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

                {/* Bottom border that appears on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                />

                {/* Subtle top-corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl pointer-events-none"
                  style={{ background: feature.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
