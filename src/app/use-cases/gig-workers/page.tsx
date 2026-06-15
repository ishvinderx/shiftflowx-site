import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShiftFlow for Gig Workers — Track Income, Taxes & Burnout",
  description: "ShiftFlow helps gig workers (Uber, DoorDash, Instacart) track every dollar earned, estimate quarterly taxes, prevent burnout, and generate professional invoices.",
  alternates: { canonical: 'https://shiftflowx.net/use-cases/gig-workers' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://shiftflowx.net/use-cases/gig-workers" },
    { "@type": "ListItem", "position": 3, "name": "Gig Workers", "item": "https://shiftflowx.net/use-cases/gig-workers" }
  ]
};

export default function GigWorkersPage() {
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
            <Link href="/use-cases/gig-workers" className="text-white/60">Gig Workers</Link>
          </nav>

          <div className="mb-6 inline-block bg-[#D63C6B]/15 text-[#D63C6B] px-3 py-1 rounded-full text-sm font-semibold">
            For Gig Workers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            The Financial Intelligence App Built for Gig Workers
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl">
            Whether you drive for Uber, deliver for DoorDash, or complete tasks on TaskRabbit — ShiftFlow tracks every dollar, estimates your taxes, and keeps you from burning out.
          </p>

          {/* Who it&apos;s for */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Built for Every Type of Gig Worker</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              ShiftFlow is designed for the modern gig economy worker — someone who earns income across multiple platforms, faces unpredictable pay schedules, and has to handle their own taxes without employer support. This includes:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Rideshare drivers (Uber, Lyft, Via)",
                "Food and grocery delivery workers (DoorDash, Instacart, Uber Eats, Grubhub)",
                "Freelance task workers (TaskRabbit, Handy, Thumbtack)",
                "On-demand service providers (Rover, Wag, Care.com)",
                "Marketplace sellers and resellers",
                "Remote and on-site gig workers across all industries"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/60">
                  <span className="text-[#D63C6B]">—</span>{item}
                </li>
              ))}
            </ul>
          </section>

          {/* Problems solved */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Problems ShiftFlow Solves for Gig Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Unpredictable Income Tracking", desc: "Log every gig, trip, or delivery. ShiftFlow aggregates income across multiple platforms so you always know exactly what you earned this week, month, and year." },
                { title: "Quarterly Tax Estimation", desc: "As a self-employed worker, you owe quarterly estimated taxes. ShiftFlow automatically calculates 15.3% self-employment tax plus income tax and tells you exactly how much to set aside each week." },
                { title: "Mileage Deduction Tracking", desc: "Vehicle expenses are your biggest deduction. ShiftFlow tracks mileage per shift so you can maximize the IRS standard mileage deduction (67 cents per mile in 2024) at tax time." },
                { title: "Burnout from Overworking", desc: "Gig work has no natural stopping point. ShiftFlow's Burnout Analytics monitors your hours, consecutive days, and energy levels to give you a real-time risk score and recovery recommendations." },
                { title: "Invoice Generation", desc: "Working directly with clients outside platforms? Generate professional invoices from logged work sessions in seconds — no spreadsheet needed." },
                { title: "Income Forecasting", desc: "ShiftFlow learns your earning patterns and predicts upcoming payouts so you can plan expenses, bills, and savings without financial anxiety." },
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
            <h2 className="text-2xl font-bold text-white mb-6">Gig Worker FAQ</h2>
            <dl className="space-y-6">
              {[
                { q: "Can I track income from multiple gig apps in one place?", a: "Yes. ShiftFlow lets you log income from any platform or employer. Add Uber earnings, DoorDash deliveries, and TaskRabbit jobs all in one account. ShiftFlow aggregates everything into unified income reports." },
                { q: "How does ShiftFlow help with quarterly taxes?", a: "ShiftFlow automatically estimates your self-employment tax (15.3% SE tax + federal income tax based on your bracket) on each dollar earned. It calculates a weekly set-aside amount so you always have enough saved when quarterly payments are due in April, June, September, and January." },
                { q: "Does ShiftFlow track mileage automatically?", a: "Currently, mileage is logged manually per shift — you enter the miles driven and ShiftFlow calculates the deduction value. Automatic GPS tracking is on our roadmap for a future update." },
                { q: "I don't get a W-2. Can ShiftFlow still help with taxes?", a: "Absolutely — ShiftFlow is built for 1099 workers. It tracks all income, estimates quarterly payments, calculates deductible expenses, and helps you understand your effective tax rate as a self-employed worker." },
              ].map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-white font-semibold mb-2">{q}</dt>
                  <dd className="text-white/60 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Track every dollar you earn</h3>
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
