import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import TakeHomeClient from './TakeHomeClient'

// Design decision of record: this tool does NOT compute statutory income tax,
// CPP, or EI — no verified jurisdiction tax tables exist in this codebase and
// fabricating them is forbidden. The user enters their own deductions (from a
// real paystub or their own estimates); the page turns THOSE numbers into a
// net estimate and says so plainly.

const TOOL = {
  slug: 'take-home-pay-calculator',
  title: 'Take-Home Pay Calculator',
  description:
    'Free take-home pay calculator: enter your gross pay and the deductions from your paystub — income tax, CPP, EI, benefits — to estimate net pay. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Take-Home Pay Calculator — Estimate Net From Your Deductions',
})

const FAQ: Faq[] = [
  {
    q: 'Why doesn’t this calculate income tax automatically?',
    a: 'Because it can’t do it honestly. Income tax depends on jurisdiction, credits, filing details, and year-to-date earnings — a calculator guessing a rate from unverified tables would give you a confident wrong number, which is worse than none. Instead, you enter the deductions from a real paystub (or your own estimates) and this tool does the arithmetic.',
  },
  {
    q: 'What deductions typically appear on a paystub?',
    a: 'Common lines are income tax, public pension contributions such as CPP, employment insurance (EI), and employer benefit deductions like health or dental premiums. Some paystubs also show union dues or retirement plan contributions. The exact lines and amounts depend on where you work and your employment agreement.',
  },
  {
    q: 'What is the difference between gross pay and net (take-home) pay?',
    a: 'Gross pay is everything you earned before anything is taken out. Net — or take-home — pay is what lands in your account after income tax, payroll contributions, and other deductions. Net is always gross minus total deductions, which is exactly the subtraction this calculator does.',
  },
  {
    q: 'Where do I find my deductions on a paystub?',
    a: 'Look for the deductions section, usually listed between gross pay and net pay. Each line shows a label and the amount withheld for that pay period. Enter each line here as a dollar amount — or use the percent option if a line is stated as a percentage of gross.',
  },
  {
    q: 'Should I enter a deduction as a percent or a dollar amount?',
    a: 'Use whichever your paystub gives you — dollar amounts straight off a paystub are the most accurate. Percent rows here are computed on gross pay, which is a simplification: some real deductions apply only up to an annual maximum or to a portion of earnings.',
  },
]

export default function TakeHomePayCalculatorPage() {
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
            Take-Home Pay Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Enter your gross pay and the deductions from your paystub to estimate your take-home
            pay. This tool turns your own deduction numbers into a net estimate — it doesn’t guess
            tax rates for you.
          </p>

          <TakeHomeClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Gross pay, deductions, and net pay
            </h2>
            <p className="text-white/60 leading-relaxed">
              Gross pay is what you earned before anything comes out. Deductions are the amounts
              withheld — income tax, payroll contributions, benefits. Estimated take-home (net)
              pay = gross − total deductions. Worked example: on{' '}
              <span className="text-white/85 font-medium">$4,000</span> gross, 20% income tax
              ($800) + $200 CPP + $80 EI make{' '}
              <span className="text-white/85 font-medium">$1,080</span> in deductions, leaving{' '}
              <span className="text-[#5EEAD4] font-medium">$2,920</span> estimated take-home pay.
            </p>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>
                Assuming one flat “tax percent” equals a bracket — effective rates depend on
                jurisdiction, credits, and year-to-date earnings.
              </li>
              <li>Forgetting employer benefit deductions like health or dental premiums.</li>
              <li>Comparing job offers on gross alone — different deductions can flip which offer pays more.</li>
            </ul>
          </section>

          <FaqSection faq={FAQ} />

          <RelatedTools
            slug={TOOL.slug}
            extraLinks={[{ href: '/download', label: 'Get the ShiftFlow app' }]}
          />

          <ToolDisclaimer>
            Results are estimates for informational purposes only, not tax, payroll, or legal
            advice. Actual deductions vary by jurisdiction and personal circumstances.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
