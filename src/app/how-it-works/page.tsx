import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — Shift Tracking in 4 Steps",
  description: "Learn how HoursFlow helps you log shifts, see your earnings and payday, keep a budget and bills, and check your paycheque in 4 simple steps.",
  alternates: { canonical: 'https://shiftflowx.net/how-it-works' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "How It Works", "item": "https://shiftflowx.net/how-it-works" }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Track Your Hours and Pay with HoursFlow",
  "description": "HoursFlow works in four steps: log your shift, see your earnings and payday, keep your budget and bills, and check your paycheque.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Log Your Shift",
      "text": "Enter your shift start time, end time and employer. The free plan covers one employer; Pro adds multiple employers and shift import."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "See Your Earnings and Payday",
      "text": "HoursFlow shows what you have earned from the hours you log and when your next payday is due, based on your pay schedule."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Keep Your Budget and Bills",
      "text": "Set up a budget and bill reminders so you know what is due before it is due."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Check and Export",
      "text": "Subscribers can check a paycheque against logged hours, scan receipts and payslips, view a tax report with GST/HST summaries, and export reports and invoices."
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
              <Link href="/" className="hover:text-white/60 transition-colors">HoursFlow</Link>
              <span>/</span>
              <span className="text-white/60">How It Works</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              How HoursFlow Works
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              HoursFlow works in four steps: log your shift, see your earnings and payday, keep your budget and bills, and check and export your records.
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
                    After each shift, open HoursFlow and enter your start time, end time and employer. HoursFlow then shows your earnings for that shift.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    The free plan tracks one employer and keeps your last 30 days of records. Subscribers get full history, multiple employers and shift import.
                  </p>
                  <ul className="space-y-2">
                    {["Start and end time, employer", "One employer on the free plan", "Multiple employers and shift import with Pro"].map(item => (
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
                  <h2 className="text-2xl font-bold text-white mb-4">See Your Earnings and Payday</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    HoursFlow adds up the hours you log into earnings and uses your pay schedule to show when your next payday is due.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    These are estimates based on what you enter. They are not a guarantee of what your employer will pay.
                  </p>
                  <ul className="space-y-2">
                    {["Earnings from logged hours", "Next payday from your pay schedule", "Included on the free plan"].map(item => (
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
                  <h2 className="text-2xl font-bold text-white mb-4">Keep Your Budget and Bills</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    Set up a budget and add your bills. HoursFlow reminds you before a bill is due, so you can plan around payday.
                  </p>
                  <ul className="space-y-2">
                    {["Budget", "Bill reminders", "Included on the free plan"].map(item => (
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
                  <h2 className="text-2xl font-bold text-white mb-4">Check and Export</h2>
                  <p className="text-white/60 leading-relaxed mb-4">
                    With a subscription, the paycheck tracker checks a paycheque against the hours you logged. You can also scan receipts and payslips (text is read on your device) and export reports and documents.
                  </p>
                  <p className="text-white/60 leading-relaxed mb-4">
                    The tax report includes GST/HST summaries. Freelancers and contractors can create invoices and pay statements.
                  </p>
                  <ul className="space-y-2">
                    {["Paycheck tracker", "Receipt and payslip scanning", "Tax report with GST/HST summaries", "Report export in PDF and CSV, pay statements and invoices"].map(item => (
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
                  q: "How long does it take to set up HoursFlow?",
                  a: "Download the app, create an account, add your employer and log your first shift."
                },
                {
                  q: "Does HoursFlow work for workers with multiple employers?",
                  a: "Multiple employers are a Pro feature. The free plan tracks one employer."
                },
                {
                  q: "What does the paycheck tracker do?",
                  a: "It checks a paycheque against the hours you logged, so you can see if the amount looks short. It is available to subscribers."
                },
                {
                  q: "How accurate is the payday estimate?",
                  a: "It is an estimate based on your pay schedule and the shifts you log. It is not a guarantee of what your employer will pay."
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
            <h3 className="text-2xl font-bold text-white mb-3">Ready to try HoursFlow?</h3>
            <p className="text-white/60 mb-6">Free to start. Pro includes a 7-day free trial.</p>
            <Link
              href="/download"
              className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors"
            >
              Download HoursFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
