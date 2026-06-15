import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow for Contractors — Project Tracking & Invoice Generator",
  description: "ShiftFlow helps independent contractors track project time, generate professional invoices, estimate taxes, and manage multiple client earnings.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/contractors' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/contractors" },
    { "@type": "ListItem", "position": 3, "name": "Contractors", "item": "https://shiftflowx.net/use-cases/contractors" }
  ]
};

export default function ContractorsPage() {
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
            <Link href="/use-cases/contractors" className="text-white/60">Contractors</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#F59E0B]/15 text-[#F59E0B] px-3 py-1 rounded-full text-sm font-semibold">
            For Independent Contractors
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            ShiftFlow for Independent Contractors
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Track every billable hour, generate professional invoices, and stay on top of taxes — without the spreadsheet headache. ShiftFlow is the financial backbone of your contracting business.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Built for How Contractors Actually Work</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Independent contractors juggle multiple clients, different billing rates, project deadlines, and a tax burden that most employees never think about. The average contractor spends 3-5 hours per week on administrative tasks — time that could be billable work.
            </p>
            <p className="text-white/60 leading-relaxed">
              ShiftFlow reduces that administrative overhead to minutes. Log project time in real time, generate accurate invoices from your logs, and let the AI handle tax calculations — so you can focus on the work that pays you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features for Contractors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Project Time Tracking", desc: "Log project sessions with client name, project, task, and hours. Support for hourly, daily, and project-based billing. Track time across unlimited clients simultaneously." },
                { title: "Professional Invoice Generator", desc: "Create client-ready invoices from your logged project sessions in one tap. Includes your business details, itemized work sessions, expenses, payment terms, and due date. Export as PDF." },
                { title: "Multi-Client Earnings Dashboard", desc: "See all client earnings in one dashboard. Track which clients are your most profitable, identify slow payers, and understand your true effective hourly rate per engagement." },
                { title: "Tax Estimation & Set-Aside", desc: "Self-employment tax is 15.3% of net earnings plus income tax. ShiftFlow calculates your weekly tax set-aside amount automatically so you're never caught short at quarterly payment time." },
                { title: "Contract Rate Tracking", desc: "Store each client's agreed rate — hourly, daily, or project-based. ShiftFlow verifies that invoiced amounts match logged hours and agreed rates, preventing billing errors." },
                { title: "Financial Health Score", desc: "Track your contracting business health: earnings stability, outstanding invoices, tax readiness, and burnout risk — in a single dashboard score that improves as you work smarter." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Contractor FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Can I generate invoices in different currencies for international clients?", a: "Yes. ShiftFlow supports multi-currency invoicing. Set each client's preferred currency and ShiftFlow generates invoices with the correct currency symbol and formatting." },
                { q: "How does ShiftFlow handle retainer-based contractor relationships?", a: "For retainer contracts, log your hours against the retainer each week. ShiftFlow tracks hours consumed versus hours remaining in the retainer period, alerting you before you go over scope." },
                { q: "Does ShiftFlow help me track outstanding invoices?", a: "Yes. The Invoice Dashboard shows all invoices by status: draft, sent, viewed, paid, and overdue. You can track payment timelines and see which clients consistently pay late." },
                { q: "How do I estimate quarterly taxes as a contractor?", a: "ShiftFlow applies the 15.3% self-employment tax rate to your net earnings and estimates federal income tax based on your annual trajectory. It shows a weekly set-aside amount and quarterly payment schedule aligned with IRS due dates." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Run your contracting business smarter</h3>
            <p className="text-white/60 mb-6">Free 30-day trial. No credit card required.</p>
            <Link href="/download" className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors">
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
