import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Freelancers — Invoices & Tax Report",
  description: "HoursFlow helps freelancers track hours and earnings, create invoices, keep a budget and bills, and prepare a tax report. Pro includes a 7-day free trial.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/freelancers' },
};

const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
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

      <div className="min-h-screen bg-ground pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          <nav className="flex items-center gap-2 text-sm text-ink-2 mb-8">
            <Link href="/" className="hover:text-ink transition-colors">HoursFlow</Link>
            <span>/</span>
            <Link href="/use-cases/freelancers" className="text-ink-2">Freelancers</Link>
          </nav>

          <div className="mb-6 inline-block bg-periwinkle text-commit px-3 py-1 rounded-full text-sm font-semibold">
            For Freelancers & Contractors
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
            HoursFlow for Freelancers &amp; Independent Contractors
          </h1>
          <p className="text-xl text-ink-2 leading-relaxed mb-12 max-w-2xl">
            Keep track of what you earned, your bills, and what to expect at tax time. HoursFlow brings clarity to freelance income.
          </p>

          {/* Problems */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">The Freelancer Financial Problem</h2>
            <p className="text-ink-2 leading-relaxed mb-4">
              Freelancing offers freedom — but it comes with financial complexity that employees never face. Irregular income makes budgeting hard. Creating invoices takes time away from billable work. Tax season can be a scramble.
            </p>
            <p className="text-ink-2 leading-relaxed">
              HoursFlow brings your hours, earnings, bills, invoices and tax report together in one app.
            </p>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Features Freelancers Use Most</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Invoices and Pay Statements", desc: "Create invoices for your clients and export them. Available to subscribers." },
                { title: "Tax Report", desc: "Subscribers get a tax report with GST/HST summaries. Figures are estimates, not tax advice." },
                { title: "Budget and Bill Reminders", desc: "Irregular income makes budgeting hard. Keep a budget and get reminders before bills are due. Included on the free plan." },
                { title: "Multiple Employers", desc: "Pro supports more than one employer, so you can keep clients separate." },
                { title: "Receipt Scanning", desc: "Scan receipts with your camera. Text is read on your device. Available to subscribers." },
                { title: "Export", desc: "Export reports as PDF or CSV. Available to subscribers." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-rule bg-track/40">
                  <h3 className="text-ink font-semibold mb-2">{title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-6">Freelancer FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Can I create invoices in HoursFlow?", a: "Yes. Invoicing is a Pro feature, and invoices can be exported." },
                { q: "Does HoursFlow estimate my taxes?", a: "Subscribers get a tax report with GST/HST summaries. These are estimates and not tax advice." },
                { q: "Can I use HoursFlow for free?", a: "The free plan covers shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days of records." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-ink font-semibold mb-2">{q}</dt>
                  <dd className="text-ink-2 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="p-8 rounded-2xl border border-rule text-center">
            <h3 className="text-2xl font-bold text-ink mb-3">Keep track of your freelance income</h3>
            <p className="text-ink-2 mb-6">Free 7-day trial. Cancel anytime.</p>
            <Link href="/download" className="inline-block bg-ink text-ground px-8 py-3 rounded-full font-semibold hover:bg-ink-2 transition-colors">
              Download HoursFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
