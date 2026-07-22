import type { Metadata } from "next";
import Link from "next/link";
import { Share2, Download, Gift, Clock, ShieldCheck, Brain, Apple } from "lucide-react";

export const metadata: Metadata = {
  title: "ShiftFlow Referral Program",
  description:
    "Share ShiftFlow with friends and earn 1 free month of Pro for every friend who subscribes. No limit on rewards.",
  openGraph: {
    title: "ShiftFlow Referral Program — Earn Free Pro",
    description:
      "Share ShiftFlow and earn 1 free month of Pro for every friend who subscribes.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const APP_STORE_URL = "https://apps.apple.com/app/shiftflow/id6768095892";

const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: Share2,
    title: "Share your unique link",
    description:
      "Open ShiftFlow, go to Profile → Referrals, and copy your personal invite link. Share it anywhere — iMessage, Instagram, TikTok, wherever your friends are.",
    accent: "#D63C6B",
  },
  {
    number: "02",
    icon: Download,
    title: "Friend downloads and subscribes",
    description:
      "Your friend downloads ShiftFlow using your link and starts a free trial. When they upgrade to a paid plan, the reward is unlocked for both of you.",
    accent: "#14B8A6",
  },
  {
    number: "03",
    icon: Gift,
    title: "You both get 1 month free",
    description:
      "You receive 1 free month of ShiftFlow Pro automatically. Your friend gets an extended trial bonus. No codes to enter — it just works.",
    accent: "#22C55E",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I get my referral link?",
    answer:
      "Your unique referral link is in the ShiftFlow app under Profile → Referrals. Tap 'Copy Link' to share it anywhere. Every link is tied to your account so rewards are tracked automatically.",
  },
  {
    question: "When do I receive my free month?",
    answer:
      "Your free month of Pro is credited within 24 hours of your referred friend upgrading to a paid ShiftFlow plan (Monthly or Annual). You will receive a push notification when the reward is applied.",
  },
  {
    question: "Is there a limit on how many friends I can refer?",
    answer:
      "No limit at all. Refer 10 friends, earn 10 free months. Refer 50 friends, earn 50 free months. The more you share, the more you save — indefinitely.",
  },
  {
    question: "What counts as a qualifying subscription?",
    answer:
      "Any ShiftFlow Pro plan — Monthly ($9.99/mo) or Annual ($99/yr) — qualifies. Free trial users do not trigger the reward; the friend must upgrade to a paid plan. Both new and returning subscribers count.",
  },
];

export default function ReferralPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.06] bg-[#D63C6B]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05] bg-[#22C55E]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
        {/* ─── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(214,60,107,0.12)",
              border: "1px solid rgba(214,60,107,0.28)",
              color: "#D63C6B",
            }}
          >
            <Gift className="w-4 h-4" />
            Referral Program
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            Share ShiftFlow.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D63C6B, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Earn Free Pro.
            </span>
          </h1>

          <p className="text-white/55 text-xl leading-relaxed max-w-xl mx-auto mb-8">
            Every friend who subscribes earns you a free month of ShiftFlow Pro — with no cap on rewards.
          </p>

          {/* Reward detail card */}
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl mx-auto"
            style={{
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.18)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.15)" }}
            >
              <Gift className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg leading-tight">
                Earn 1 free month Pro
              </div>
              <div className="text-white/50 text-sm">
                For every friend who subscribes &middot; No limit
              </div>
            </div>
          </div>
        </div>

        {/* ─── How It Works ──────────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-white/[0.06]" />

            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Number circle */}
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                      style={{
                        background: `${step.accent}15`,
                        border: `1px solid ${step.accent}35`,
                        color: step.accent,
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${step.accent}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.accent }} />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Features reminder ────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            What your friends get with ShiftFlow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: "Track Shifts & Pay", desc: "Instant shift logging with earnings breakdown.", accent: "#D63C6B" },
              { icon: ShieldCheck, title: "Catch Payroll Errors", desc: "AI detects underpayments and missing overtime.", accent: "#22C55E" },
              { icon: Brain, title: "AI Career Insights", desc: "Personalised coaching to grow income and reduce burnout.", accent: "#F59E0B" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.accent}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3 className="text-white font-semibold text-base mb-2.5">
                  {item.question}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Download CTA ─────────────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(214,60,107,0.1) 0%, rgba(20,184,166,0.08) 100%)",
            border: "1px solid rgba(214,60,107,0.2)",
          }}
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle at 50% 0%, rgba(214,60,107,0.12), transparent 60%)" }} />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Ready to start earning?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-md mx-auto">
              Download ShiftFlow, then share your link from Profile → Referrals.
            </p>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: "#000",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <Apple className="w-5 h-5" />
              Download on the App Store
            </Link>

            <p className="text-white/30 text-sm mt-5">
              Free to download &middot; 7-day trial &middot; No credit card
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
