"use client";

import { motion } from "framer-motion";
import { Check, Smartphone, Tablet, Wifi } from "lucide-react";
import { PRICING_FEATURES } from "@/lib/constants";

export default function DownloadClient() {
  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
                Download<br />
                <span className="gradient-text">ShiftFlow.</span>
              </h1>

              <p className="text-xl text-white/50 leading-relaxed mb-8">
                Free for 30 days. No credit card. Full access to every feature — AI payroll protection, payday forecasting, burnout analytics, and more.
              </p>

              {/* App Store CTA */}
              <a
                href="https://apps.apple.com/app/shiftflow/id6768095892"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-6 py-4 bg-white text-[#0A0A0F] rounded-2xl font-bold hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-2xl mb-4 group"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0A0A0F]" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-[#0A0A0F]/60 text-xs">Download on the</div>
                  <div className="text-[#0A0A0F] text-lg font-bold">App Store</div>
                </div>
              </a>

              <p className="text-white/30 text-sm mt-4">
                iOS 16+ · iPhone & iPad · Free · 30-day trial
              </p>

              {/* QR code placeholder */}
              <div className="mt-8 inline-flex items-center gap-4 p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  {/* QR code pattern (CSS art) */}
                  <div className="grid grid-cols-7 gap-px p-1.5" style={{ width: 72, height: 72 }}>
                    {Array.from({ length: 49 }, (_, i) => {
                      const pattern = [1,1,1,0,1,1,1,1,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,1,1,0,1,1];
                      return (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{
                            width: 8,
                            height: 8,
                            background: pattern[i] ? "#0A0A0F" : "transparent",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm font-medium">Scan to download</p>
                  <p className="text-white/30 text-xs">Point your iPhone camera here</p>
                </div>
              </div>
            </motion.div>

            {/* Right: feature list */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-5 font-semibold">What&apos;s included</p>
                <div className="space-y-3">
                  {PRICING_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#22C55E]" />
                      </div>
                      <span className="text-white/75 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System requirements */}
      <section className="py-16 border-y border-white/5 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-white font-bold text-xl mb-8 text-center">System Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, label: "iPhone", req: "iOS 16.0 or later" },
              { icon: Tablet, label: "iPad", req: "iPadOS 16.0 or later" },
              { icon: Wifi, label: "Connectivity", req: "Wi-Fi or Cellular" },
            ].map(({ icon: Icon, label, req }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white/40" />
                </div>
                <p className="text-white font-medium text-sm mb-1">{label}</p>
                <p className="text-white/40 text-xs">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
