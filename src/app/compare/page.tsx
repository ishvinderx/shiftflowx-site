import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare Shift Tracker Apps — Which Is Best?",
  description: "See how HoursFlow compares to Clockify, Toggl, Deputy, and other shift trackers. HoursFlow adds payday tracking, budget and bill reminders, a paycheck tracker and tax reports to shift tracking.",
  alternates: { canonical: 'https://shiftflowx.net/compare' },
};

const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://shiftflowx.net/compare" }
  ]
};

const features = [
  { name: "Shift Tracking", app: true, generic: true },
  { name: "Paycheck Tracker (Pro)", app: true, generic: false },
  { name: "Payday Tracking", app: true, generic: false },
  { name: "Budget and Bill Reminders", app: true, generic: false },
  { name: "Tax Report with GST/HST Summaries (Pro)", app: true, generic: false },
  { name: "Invoices (Pro)", app: true, generic: "partial" },
  { name: "Receipt and Payslip Scanning (Pro)", app: true, generic: false },
  { name: "Free Trial", app: "7 days", generic: "Varies" },
];

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-ground pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 text-sm text-ink-2 mb-8">
              <Link href="/" className="hover:text-ink transition-colors">HoursFlow</Link>
              <span>/</span>
              <span className="text-ink-2">Compare</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-6 leading-tight">
              Why Workers Choose HoursFlow
            </h1>
            <p className="text-xl text-ink-2 leading-relaxed max-w-2xl">
              HoursFlow combines shift tracking, payday, budget and bill reminders, tax estimates and a paycheck tracker in one place. It is built to help you check your pay, not just track your time.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-ink mb-6">Feature Comparison</h2>
            <div className="rounded-2xl border border-rule overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-track/40 border-b border-rule">
                    <th className="text-left px-6 py-4 text-ink-2 font-semibold text-sm">Feature</th>
                    <th className="text-center px-6 py-4 text-ink font-bold text-sm">HoursFlow</th>
                    <th className="text-center px-6 py-4 text-ink-2 font-semibold text-sm">Generic Trackers</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.name} className={`border-b border-rule ${i % 2 === 0 ? '' : 'bg-track/40'}`}>
                      <td className="px-6 py-4 text-ink-2 text-sm">{f.name}</td>
                      <td className="px-6 py-4 text-center">
                        {f.app === true ? (
                          <span className="text-positive font-bold">✓</span>
                        ) : (
                          <span className="text-positive text-sm font-medium">{f.app}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {f.generic === false ? (
                          <span className="text-ink-2 font-bold">✗</span>
                        ) : f.generic === "partial" ? (
                          <span className="text-ink text-sm font-medium">Partial</span>
                        ) : f.generic === true ? (
                          <span className="text-ink-2 font-bold">✓</span>
                        ) : (
                          <span className="text-ink-2 text-sm">{f.generic}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who it&apos;s for */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-ink mb-6">Who HoursFlow Is Built For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { group: "Hourly Employees", desc: "Retail, hospitality, manufacturing, and service workers who want to check their paycheque against the hours they logged.", href: "/use-cases/hourly-workers" },
                { group: "Freelancers", desc: "Independent contractors and freelancers who need invoices, tax estimates, and earnings tracking.", href: "/use-cases/freelancers" },
                { group: "Gig Workers", desc: "Rideshare drivers, delivery workers, and task-based gig workers who need income tracking across multiple platforms.", href: "/use-cases/gig-workers" },
                { group: "Nurses & Healthcare", desc: "Shift workers with complex schedules including night differentials, on-call pay, and overtime regulations.", href: "/use-cases/nurses" },
              ].map(({ group, desc, href }) => (
                <Link key={group} href={href} className="p-6 rounded-xl border border-rule hover:border-ink/30 transition-colors group">
                  <h3 className="text-ink font-semibold mb-2 group-hover:text-ink transition-colors">{group}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* The HoursFlow Difference */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-ink mb-6">The HoursFlow Difference</h2>
            <p className="text-ink-2 leading-relaxed mb-4">
              Most time tracking apps were built for businesses — to help employers see how their staff spends time. HoursFlow was built for workers — to track hours, earnings, payday and bills.
            </p>
            <p className="text-ink-2 leading-relaxed mb-4">
              The US Department of Labor estimates that wage theft — underpaid wages, missing overtime, illegal deductions — costs workers over $15 billion annually. HoursFlow gives you a clear record of the hours you worked, so you can check what you were paid against it.
            </p>
            <p className="text-ink-2 leading-relaxed">
              HoursFlow brings shift tracking, payday, budget and bill reminders, tax estimates, and invoices together in a single mobile-first app built for workers.
            </p>
          </section>

          {/* CTA */}
          <div className="p-8 rounded-2xl border border-ink/20 text-center">
            <h3 className="text-2xl font-bold text-ink mb-3">Start tracking your hours today</h3>
            <p className="text-ink-2 mb-6">Free to start; Pro includes a 7-day free trial. Available on iPhone &amp; iPad.</p>
            <Link
              href="/download"
              className="inline-block bg-ink text-ground px-8 py-3 rounded-full font-semibold hover:bg-ink-2 transition-colors"
            >
              Download HoursFlow
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
