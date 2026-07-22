"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Clock, ShieldCheck, Brain, Apple, Star } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const APP_STORE_URL = "https://apps.apple.com/app/shiftflow/id6768095892";
const OFFER_DURATION_MS = 72 * 60 * 60 * 1000; // 72 hours

interface Props {
  code: string;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

function computeRemaining(startMs: number): TimeRemaining {
  const elapsed = Date.now() - startMs;
  const remainingMs = Math.max(0, OFFER_DURATION_MS - elapsed);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

const FEATURE_CARDS = [
  {
    icon: Clock,
    title: "Track Shifts & Pay",
    description: "Log every shift in seconds and know exactly what you earned.",
    accent: "#D63C6B",
  },
  {
    icon: ShieldCheck,
    title: "Catch Payroll Errors",
    description: "AI detects overtime violations and underpayments automatically.",
    accent: "#22C55E",
  },
  {
    icon: Brain,
    title: "AI Career Insights",
    description: "Personalised recommendations to grow your income and wellbeing.",
    accent: "#F59E0B",
  },
];

export default function ReferralLandingClient({ code }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);

  const fireClickEvent = useCallback(async (referralCode: string) => {
    try {
      await fetch("/api/ref/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: referralCode }),
      });
    } catch {
      // silently ignore — never throw to user
    }
  }, []);

  useEffect(() => {
    // Persist referral code
    try {
      localStorage.setItem("sf_ref_code", code);
    } catch {
      // storage unavailable — ignore
    }

    // Fire click event
    fireClickEvent(code);

    // Initialise countdown start time
    let startMs: number;
    try {
      const stored = localStorage.getItem("sf_ref_start");
      if (stored) {
        startMs = parseInt(stored, 10);
      } else {
        startMs = Date.now();
        localStorage.setItem("sf_ref_start", String(startMs));
      }
    } catch {
      startMs = Date.now();
    }

    // Tick every second (also runs immediately via leading call)
    const update = () => setTimeLeft(computeRemaining(startMs));
    const interval = setInterval(update, 1000);
    update();

    return () => clearInterval(interval);
  }, [code, fireClickEvent]);

  const countdownDisplay =
    timeLeft !== null
      ? `${padTwo(timeLeft.hours)}:${padTwo(timeLeft.minutes)}:${padTwo(timeLeft.seconds)}`
      : "72:00:00";

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-[0.07] bg-[#D63C6B]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.05] bg-[#14B8A6]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        {/* App icon placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-20 h-20 rounded-[22px] mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #D63C6B, #6366F1)",
            boxShadow: "0 20px 60px rgba(214,60,107,0.35)",
          }}
        >
          <Clock className="w-10 h-10 text-white" />
        </motion.div>

        {/* Reward badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{
            background: "rgba(214,60,107,0.15)",
            border: "1px solid rgba(214,60,107,0.35)",
            color: "#D63C6B",
          }}
        >
          <span>🎁</span>
          <span>1 Month Free Pro When You Subscribe</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5"
        >
          You&apos;ve Been{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D63C6B, #14B8A6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Invited
          </span>{" "}
          to ShiftFlow
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
          className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
        >
          Your friend wants you to take control of your shifts, earnings, and career &mdash; free for 7 days.
        </motion.p>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mb-10 flex flex-col items-center gap-2"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
            Offer expires in
          </p>
          <div
            className="font-mono text-4xl sm:text-5xl font-bold tabular-nums"
            style={{ color: "#D63C6B", textShadow: "0 0 20px rgba(214,60,107,0.4)" }}
          >
            {countdownDisplay}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: EASE }}
                className="rounded-2xl p-5 text-left"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${card.accent}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.accent }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{card.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* App Store CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
          className="flex flex-col items-center gap-3 w-full"
        >
          <Link
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full max-w-xs rounded-2xl px-7 py-4 font-semibold text-white text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: "#000",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <Apple className="w-5 h-5 flex-shrink-0" />
            <span>Download on the App Store</span>
          </Link>

          {/* Stars under button */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            ))}
            <span className="text-white/40 text-xs ml-1">4.8 · 1,200+ reviews</span>
          </div>

          {/* Trust line */}
          <p className="text-white/30 text-sm mt-1">
            Free to download &middot; No credit card &middot; Cancel anytime
          </p>
        </motion.div>

        {/* Referral code attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-10 text-white/20 text-xs font-mono"
        >
          Referral code: {code}
        </motion.p>
      </div>
    </main>
  );
}
