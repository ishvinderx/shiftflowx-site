import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How ShiftFlow Works — AI Shift Tracking & Payroll Protection",
  description: "Learn exactly how ShiftFlow's AI tracks your shifts, verifies pay, detects payroll errors, and protects your financial wellness in 4 simple steps.",
  alternates: { canonical: 'https://shiftflowx.net/how-it-works' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "How It Works", "item": "https://shiftflowx.net/how-it-works" }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Protect Your Paycheck with ShiftFlow",
  "description": "ShiftFlow works in four steps: log your shift, let AI verify your pay, get alerted to issues, and improve your financial health over time.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Log Your Shift",
      "text": "Enter your shift start time, end time, breaks taken, tips, mileage, and employer. Takes under 10 seconds. ShiftFlow auto-calculates overtime using FLSA rules."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "AI Verifies Your Pay",
      "text": "ShiftFlow's AI cross-references your expected pay against your logged hours, overtime thresholds, and historical rate data to verify accuracy."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Catch Payroll Issues",
      "text": "Receive real-time alerts for any pay discrepancies. ShiftFlow forecasts your next payday and generates dispute reports if needed."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Grow Your Financial Health",
      "text": "Track your ShiftFlow Score, monitor burnout risk, estimate taxes, and generate invoices — all in one place."
    }
  ]
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
              <span>/</span>
              <span className="text-white/60">How It Works</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              How ShiftFlow Protects Your Paycheck
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              ShiftFlow works in four steps: log your shift, let AI verify your pay, get alerted to issues, and improve your financial health over time. Most users catch their first payroll error within two weeks.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16">

            {/* Step 1 */}
            <section>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D63C6B]/20 border border-[#D63C6B]/30 flex items-center justify-center text-[#D63C6B] font-bold text-lg">1</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Log Your Shift</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Every protected paycheck starts with a logged shift. After each shift, open ShiftFlow and enter your basic details: start time, end time, break duration, employer, and pay rate. The whole process takes under 10 seconds.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    You can also add tips earned, mileage driven (important for gig workers and contractors), and any notes about the shift. ShiftFlow immediately calculates your gross earnings for that shift and automatically applies FLSA overtime rules — flagging any hours over 40 per week at the 1.5x rate.
                  </p>
                  <ul className="space-y-2">
                    {["Start/end time, breaks, tips, mileage, employer", "Auto-calculates overtime using FLSA 40-hour threshold", "Takes under 10 seconds per shift", "Supports multiple employers simultaneously"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white/60">
                        <span className="text-[#D63C6B] font-bold">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Step 2 */}
            <section>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6] font-bold text-lg">2</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">AI Verifies Your Pay</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Once you receive your paycheck (or payslip), ShiftFlow&apos;s AI verification engine gets to work. It cross-references your total logged hours and pay against your expected pay rate, overtime eligibility, and historical patterns. This is where ShiftFlow earns its name.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    The verification engine checks for underpayment against your agreed rate, missing overtime compensation (the #1 payroll error in the US), missing break premiums where applicable, and rate discrepancies. You can also use the Payslip OCR Scanner to photograph your physical payslip — ShiftFlow&apos;s computer vision engine extracts every number and verifies it automatically.
                  </p>
                  <ul className="space-y-2">
                    {["Cross-references expected vs actual pay", "Checks FLSA overtime eligibility (40h weekly threshold)", "Compares against your logged hourly/salary rate", "OCR scanner for physical payslips"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white/60">
                        <span className="text-[#14B8A6] font-bold">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center text-[#6366F1] font-bold text-lg">3</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Catch Payroll Issues</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    When ShiftFlow detects a discrepancy — a short payment, missing overtime, or rate error — you receive an immediate alert. The alert shows exactly what was expected, what was received, and the dollar difference. ShiftFlow also generates a detailed dispute summary you can send directly to your employer or HR department.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    The Payday Forecasting engine runs continuously in the background, analyzing your shift patterns and pay schedule to predict exactly when your next paycheck will arrive and how much it will be. No more financial uncertainty between paydays.
                  </p>
                  <ul className="space-y-2">
                    {["Real-time alerts for pay discrepancies", "Dollar-specific breakdown of what you're owed", "Dispute report generation for employers/HR", "Payday forecasting with predicted amounts"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white/60">
                        <span className="text-[#6366F1] font-bold">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Step 4 */}
            <section>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] font-bold text-lg">4</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Grow Your Financial Health</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Beyond payroll protection, ShiftFlow is a comprehensive financial wellness platform. Your ShiftFlow Score — a proprietary financial health metric — tracks your earnings stability, tax readiness, burnout risk, and financial trajectory over time.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    The Burnout Analytics system monitors consecutive days worked, weekly hours, night shift frequency, skipped breaks, and self-reported energy levels to calculate your real-time burnout risk score. Freelancers and contractors can generate professional invoices directly from logged shifts — no manual data entry required.
                  </p>
                  <ul className="space-y-2">
                    {["ShiftFlow Score: holistic financial wellness metric", "Burnout risk monitoring with recovery recommendations", "Weekly tax set-aside estimation", "Invoice generation from logged project time"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white/60">
                        <span className="text-[#22C55E] font-bold">+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* FAQ */}
          <section className="mt-20 pt-16 border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <dl className="space-y-8">
              {[
                {
                  q: "How long does it take to set up ShiftFlow?",
                  a: "Most users are fully set up within 5 minutes. Download the app, create an account, enter your employer and pay rate, and log your first shift. ShiftFlow starts learning your patterns immediately."
                },
                {
                  q: "Does ShiftFlow work for workers with multiple employers?",
                  a: "Yes. ShiftFlow supports multiple employers simultaneously, each with their own pay rate, schedule, and overtime tracking. Ideal for gig workers and part-time employees with multiple jobs."
                },
                {
                  q: "What if my employer disputes the payroll error ShiftFlow found?",
                  a: "ShiftFlow generates a detailed dispute report with your logged shift times, expected pay calculation, and the discrepancy breakdown. This gives you a clear, documented record to present to your employer, HR, or if necessary, your state labor board."
                },
                {
                  q: "How accurate is the Payday Forecasting?",
                  a: "Forecasting accuracy improves with each logged shift. Most users see 85%+ accuracy within the first two weeks. After a full pay cycle, accuracy typically reaches 95%+ for both timing and amount."
                }
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-lg font-semibold text-white mb-2">{q}</dt>
                  <dd className="text-white/60 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to protect your paycheck?</h3>
            <p className="text-white/60 mb-6">Free 7-day trial. Cancel anytime.</p>
            <Link
              href="/download"
              className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors"
            >
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
