import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow for Freelancers — Invoice Tracker & Tax Estimator App",
  description: "ShiftFlow helps freelancers track project hours, generate professional invoices, estimate taxes, and manage financial health. Free 7-day trial.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/freelancers' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/freelancers" },
    { "@type": "ListItem", "position": 3, "name": "Freelancers", "item": "https://shiftflowx.net/use-cases/freelancers" }
  ]
};

export default function FreelancersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <Link href="/use-cases/freelancers" className="text-white/60">Freelancers</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#6366F1]/15 text-[#6366F1] px-3 py-1 rounded-full text-sm font-semibold">
            For Freelancers & Contractors
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            ShiftFlow for Freelancers &amp; Independent Contractors
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Stop guessing what you earned, what you owe in taxes, and when clients will pay. ShiftFlow brings financial clarity to the freelance life.
          </p>

          {/* Problems */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">The Freelancer Financial Problem</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Freelancing offers freedom — but it comes with financial complexity that employees never face. Irregular income makes budgeting hard. Creating invoices takes time away from billable work. Tax season becomes a stressful scramble. And no employer is watching out for your financial wellness.
            </p>
            <p className="text-white/60 leading-relaxed">
              ShiftFlow is the financial co-pilot that fills that gap. Log your project sessions, generate invoices instantly, estimate taxes weekly, and track your financial health — all in one app designed for how you actually work.
            </p>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Features Freelancers Use Most</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Invoice Generator", desc: "Log project sessions and convert them to professional invoices in one tap. Customize with your name, client details, payment terms, and due date. Send as PDF directly from the app." },
                { title: "Tax Estimation", desc: "ShiftFlow calculates your self-employment tax (15.3%) and estimated income tax on every dollar earned. Get a weekly 'set aside this amount' figure so you're never caught short at tax time." },
                { title: "Earnings Forecasting", desc: "Based on your project pipeline and historical earnings patterns, ShiftFlow forecasts your monthly income so you can plan expenses, save for slow periods, and manage cash flow confidently." },
                { title: "Financial Health Score", desc: "Your ShiftFlow Score tracks earnings stability, tax readiness, burnout risk, and financial trajectory — giving you a holistic view of your freelance financial health." },
                { title: "Multi-Client Tracking", desc: "Track project time and earnings across unlimited clients. See your effective hourly rate per client, identify your most and least profitable work, and make smarter business decisions." },
                { title: "Burnout Prevention", desc: "Freelancers are especially vulnerable to burnout — there's always more work to take. ShiftFlow monitors your hours, consecutive work days, and energy levels to keep you sustainable long-term." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Freelancer FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Can I create invoices directly from my logged work sessions?", a: "Yes. Log your project time in ShiftFlow, then tap 'Generate Invoice' to create a professional invoice with all your session details pre-filled. Customize payment terms, add expenses, and export as a PDF." },
                { q: "How does ShiftFlow calculate my quarterly tax estimate?", a: "ShiftFlow applies the 15.3% self-employment tax rate to your net earnings, then estimates federal income tax based on your annual earnings trajectory and filing status. The result is a weekly amount to set aside so you're ready when quarterly payments are due." },
                { q: "I have irregular income — can ShiftFlow still help with financial planning?", a: "Irregular income is exactly where ShiftFlow shines. By tracking your actual earnings week by week and learning your patterns, ShiftFlow builds increasingly accurate forecasts of what your next month and quarter will look like — helping you budget even when income isn't predictable." },
                { q: "Does ShiftFlow work for freelancers outside the US?", a: "Yes. ShiftFlow supports multi-currency invoicing and tracks earnings in any currency. Tax estimation features are currently calibrated for US self-employment tax rules, with international tax support on the roadmap." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#6366F1]/5 border border-[#6366F1]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">The financial co-pilot every freelancer needs</h3>
            <p className="text-white/60 mb-6">Free 7-day trial. No credit card required.</p>
            <Link href="/download" className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors">
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
