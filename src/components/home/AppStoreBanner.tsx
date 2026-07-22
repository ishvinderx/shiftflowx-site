"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AppStoreBanner() {
  return (
    <section className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(214,60,107,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(20,184,166,0.06)_0%,transparent_60%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D63C6B]/[0.08] border border-[#D63C6B]/25 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D63C6B] animate-pulse" />
            <span className="text-[#D63C6B] text-xs font-semibold tracking-widest uppercase">
              Free 7-Day Trial
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Download ShiftFlow.{" "}
            <span className="gradient-text">Protect your income</span>{" "}
            starting today.
          </h2>

          {/* Subtext */}
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            7-day free trial · iOS 16+ · iPhone &amp; iPad · Cancel anytime.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* App Store badge */}
            <Link
              href="/download"
              className="inline-flex items-center gap-3.5 px-6 py-4 bg-white text-[#050508] hover:bg-white/90 rounded-2xl font-bold text-sm shadow-2xl hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#050508]" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] font-normal opacity-70 leading-none mb-0.5">Download on the</div>
                <div className="text-sm font-bold leading-none">App Store</div>
              </div>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#D63C6B] text-white font-bold text-sm shadow-[0_0_20px_rgba(214,60,107,0.35)] hover:bg-[#c0355f] hover:shadow-[0_0_35px_rgba(214,60,107,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Trial →
            </Link>
          </div>

          {/* Platform & privacy notes */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/30 text-sm">
            <span>Available on iPhone &amp; iPad</span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Your data encrypted. Never sold.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
