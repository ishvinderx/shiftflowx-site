import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import HourlyPayClient from './HourlyPayClient'

// EXEMPLAR calculator page — the reference implementation for every tool built
// on this platform. Pattern: seo helpers + shared components + a pure engine
// (payCalc.ts) + a client UI (HourlyPayClient.tsx). Tool above the fold; the
// CTA lives inside the result, never before the tool.

const TOOL = {
  slug: 'hourly-pay-calculator',
  title: 'Hourly Pay Calculator',
  description:
    'Free hourly pay calculator: enter your hours worked and hourly rate to get gross pay, with an optional overtime breakdown. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Hourly Pay Calculator — Free, With Overtime',
})

const FAQ: Faq[] = [
  {
    q: 'How do I calculate my pay from my hourly rate?',
    a: 'Multiply your hours worked by your hourly rate. 40 hours at $25/hour is $1,000. If some of those hours are overtime, multiply the overtime hours by your rate and the overtime multiplier (commonly 1.5×) and add that on top.',
  },
  {
    q: 'What is the difference between gross pay and net pay?',
    a: 'Gross pay is everything you earned before anything is taken out — the number this calculator shows. Net (take-home) pay is what lands in your account after income tax, payroll contributions, and other deductions, so it is always lower than gross.',
  },
  {
    q: 'How does overtime change my pay?',
    a: 'Overtime hours are paid at a multiplier of your regular rate — commonly 1.5×, so $25/hour becomes $37.50/hour. Five overtime hours at $25 × 1.5 add $187.50 to your gross pay. The threshold and multiplier depend on your jurisdiction and employment agreement.',
  },
  {
    q: 'Do unpaid breaks count toward my hours?',
    a: 'No. Unpaid meal breaks are subtracted from your hours worked before pay is calculated, while paid rest breaks count as time worked. If you are unsure of your total, the work hours calculator handles start time, end time, and breaks for you.',
  },
  {
    q: 'How do I convert minutes to decimal hours for pay?',
    a: 'Divide the minutes by 60. 8 hours 45 minutes is 8 + 45/60 = 8.75 decimal hours, and 8.75 × $25 = $218.75. Payroll systems use decimal hours because rates multiply cleanly against them.',
  },
]

export default function HourlyPayCalculatorPage() {
  const trail = [
    { name: 'ShiftFlow', path: '/' },
    { name: 'Free Tools', path: '/tools' },
    { name: TOOL.title, path: `/${TOOL.slug}` },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(trail)) }} />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <ToolBreadcrumb trail={[trail[0], trail[1], { name: TOOL.title }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Hourly Pay Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Enter your hours worked and hourly rate to get your gross pay — with overtime,
            free, instant, no signup.
          </p>

          <HourlyPayClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">How hourly pay is calculated</h2>
            <p className="text-white/60 leading-relaxed">
              Gross pay = (regular hours × hourly rate) + (overtime hours × hourly rate ×
              overtime multiplier). Worked example: 40 hours at $25/hour is{' '}
              <span className="text-white/85 font-medium">$1,000</span> regular pay; 5 overtime
              hours at $25 × 1.5 add <span className="text-white/85 font-medium">$187.50</span>;
              gross pay is <span className="text-[#5EEAD4] font-medium">$1,187.50</span>.
            </p>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>Counting unpaid meal breaks as worked hours — subtract them first.</li>
              <li>Applying the overtime multiplier to all hours instead of only the hours past the threshold.</li>
              <li>Treating gross pay as take-home pay — taxes and deductions come out of this number.</li>
            </ul>
          </section>

          <FaqSection faq={FAQ} />

          <RelatedTools
            slug={TOOL.slug}
            extraLinks={[
              { href: '/blog/how-to-calculate-work-hours', label: 'How to calculate work hours' },
              { href: '/download', label: 'Get the ShiftFlow app' },
            ]}
          />

          <ToolDisclaimer>
            Results are estimates for informational purposes only, not payroll, tax, or legal
            advice. Overtime rules and deductions vary by jurisdiction and employment agreement.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
