import type { Metadata } from "next";
import Link from "next/link";
import { APP_STORE_URL } from "@/lib/constants";
import { Share2, Download, Gift, Clock, Wallet, Receipt, Apple } from "lucide-react";

export const metadata: Metadata = {
  title: "Referral Program — Earn 30 Days of Pro",
  description:
 "Share HoursFlow with friends and earn 30 days of Pro when a friend you referred completes their first paid billing period. Limits may apply.",
  // Without this the root layout's canonical is inherited, pointing this page at the homepage.
  alternates: { canonical: 'https://shiftflowx.net/referral' },
  openGraph: {
    title: "HoursFlow Referral Program — Earn 30 Days of Pro",
    description:
 "Share HoursFlow and earn 30 days of Pro when a friend you referred completes their first paid billing period.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};


const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    icon: Share2,
    title: "Share your unique link",
    description:
 "Open HoursFlow, go to Profile → Referrals, and copy your personal invite link. Share it anywhere — iMessage, Instagram, TikTok, wherever your friends are.",
    accent: "var(--color-ink)",
  },
  {
    number: "02",
    icon: Download,
    title: "Friend signs up and subscribes",
    description:
 "Your friend downloads HoursFlow using your link, creates their account, and subscribes to HoursFlow Pro. The reward is earned once they complete their first paid billing period — a free trial on its own does not count.",
    accent: "var(--color-positive)",
  },
  {
    number: "03",
    icon: Gift,
    title: "You get 30 days of Pro",
    description:
 "You receive 30 days of HoursFlow Pro, added to your account automatically. The reward goes to you as the referrer; there is no reward for the friend. Limits may apply.",
    accent: "var(--color-positive)",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I get my referral link?",
    answer:
 "Your unique referral link is in the HoursFlow app under Profile → Referrals. Tap 'Copy Link' to share it anywhere. Every link is tied to your account so rewards are tracked automatically.",
  },
  {
    question: "When do I receive my 30 days of Pro?",
    answer:
 "Your 30 days of Pro are added after your referred friend completes their first paid billing period. Signing up or starting a free trial is not enough on its own.",
  },
  {
    question: "Is there a limit on how many friends I can refer?",
    answer:
 "You can share your link with as many friends as you like, but limits may apply to the number of rewards one account can earn.",
  },
  {
    question: "What does my friend need to do to qualify?",
    answer:
 "Your friend needs to create a HoursFlow account using your link, subscribe to HoursFlow Pro, and complete their first paid billing period. Your friend does not receive a referral reward.",
  },
];

export default function ReferralPage() {
  return (
    <main className="min-h-screen bg-ground text-ink">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-3xl opacity-[0.06] bg-ink" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05] bg-mint" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
        {/* ─── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "var(--color-rule)",
              border: "1px solid var(--color-rule)",
              color: "var(--color-ink)",
            }}
          >
            <Gift className="w-4 h-4" />
            Referral Program
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            Share HoursFlow.
            <br />
            <span
              style={{
                background: "var(--color-track)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Earn 30 Days of Pro.
            </span>
          </h1>

          <p className="text-ink-2 text-xl leading-relaxed max-w-xl mx-auto mb-8">
            Earn 30 days of HoursFlow Pro when a friend you referred completes their first paid billing period. Limits may apply.
          </p>

          {/* Reward detail card */}
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl mx-auto"
            style={{
              background: "var(--color-rule)",
              border: "1px solid var(--color-rule)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--color-rule)" }}
            >
              <Gift className="w-6 h-6 text-positive" />
            </div>
            <div className="text-left">
              <div className="text-ink font-bold text-lg leading-tight">
                Earn 30 days of Pro
              </div>
              <div className="text-ink-2 text-sm">
                When a referred friend completes their first paid billing period &middot; Limits may apply
              </div>
            </div>
          </div>
        </div>

        {/* ─── How It Works ──────────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-track/40" />

            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl p-6 text-center"
                  style={{
                    background: "var(--color-rule)",
                    border: "1px solid var(--color-rule)",
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

                  <h3 className="text-ink font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Features reminder ────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-10">
            What your friends get with HoursFlow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: "Track Shifts & Pay", desc: "Instant shift logging with earnings breakdown.", accent: "var(--color-ink)" },
              { icon: Wallet, title: "Payday & Budget", desc: "Know when you get paid, with budget and bill reminders.", accent: "var(--color-positive)" },
              { icon: Receipt, title: "Tax, Invoices & Scanning", desc: "Tax reports, invoices, and receipt and payslip scanning with Pro.", accent: "var(--color-ink)" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--color-rule)",
                    border: "1px solid var(--color-rule)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.accent}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-ink font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-ink-2 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--color-rule)",
                  border: "1px solid var(--color-rule)",
                }}
              >
                <h3 className="text-ink font-semibold text-base mb-2.5">
                  {item.question}
                </h3>
                <p className="text-ink-2 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Download CTA ─────────────────────────────────────────────────── */}
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background:
 "var(--color-track)",
            border: "1px solid var(--color-rule)",
          }}
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: "var(--color-track)" }} />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">
              Ready to start earning?
            </h2>
            <p className="text-ink-2 text-lg mb-8 max-w-md mx-auto">
              Download HoursFlow, then share your link from Profile → Referrals.
            </p>

            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-ink text-base transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{
                background: "var(--color-ground)",
                border: "1px solid var(--color-rule)",
              }}
            >
              <Apple className="w-5 h-5" />
              Download on the App Store
            </Link>

            <p className="text-ink-2 text-sm mt-5">
              Free to download &middot; 7-day Pro trial &middot; Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
