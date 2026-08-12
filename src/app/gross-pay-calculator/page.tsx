import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import GrossPayClient from './GrossPayClient'

// Gross pay frequency converter. Pattern mirrors the hourly-pay-calculator
// exemplar: seo helpers + shared components + a pure engine (grossPayCalc.ts)
// + a client UI (GrossPayClient.tsx). GROSS only — net/taxes belong to the
// take-home calculator.

const TOOL = {
  slug: 'gross-pay-calculator',
  title: 'Gross Pay Calculator',
  description:
    'Free gross pay calculator: enter a pay amount and see your gross pay per hour, day, week, two weeks, month, and year. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Gross Pay Calculator — Hourly, Weekly, Monthly & Annual',
})

const FAQ: Faq[] = [
  {
    q: 'What is the difference between gross pay and net pay?',
    a: 'Gross pay is everything you earned before anything is taken out — the numbers this calculator shows. Net (take-home) pay is what lands in your account after income tax, payroll contributions, and other deductions, so it is always lower than gross. Never compare a gross figure against a take-home figure.',
  },
  {
    q: 'How many weeks per year do pay calculators use?',
    a: 'This calculator uses 52 weeks per year, the standard payroll convention. A calendar year is actually 52 weeks plus one or two days, and some employers use 52.14 weeks or exact working days instead, so your payroll figures may differ slightly.',
  },
  {
    q: 'What is the difference between biweekly and semi-monthly pay?',
    a: 'Biweekly means every two weeks — 26 paychecks per year, calculated here as weekly × 2. Semi-monthly means twice a month — 24 paychecks per year, each equal to annual ÷ 24. A biweekly paycheck is slightly smaller than a semi-monthly one for the same salary, because there are two more of them.',
  },
  {
    q: 'How do I convert a salary to an hourly rate?',
    a: 'Divide the annual salary by 52 to get weekly pay, then divide by your hours per week. $60,000 ÷ 52 = $1,153.85 per week, and ÷ 40 hours = $28.85 per hour. That is why this calculator asks for your hours per week: without it, a salary cannot be turned into an hourly rate.',
  },
  {
    q: 'Why is monthly pay not just 4 weeks of pay?',
    a: 'Because months are longer than 4 weeks — a year has 52 weeks but only 12 months, so the average month is about 4.33 weeks. Monthly pay is annual ÷ 12: at $1,000/week that is $52,000 ÷ 12 = $4,333.33, not $4,000. Using 4 weeks understates monthly pay by about 7%.',
  },
]

export default function GrossPayCalculatorPage() {
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
            Gross Pay Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Convert gross pay between pay periods — hourly, daily, weekly, biweekly, monthly,
            and annual. Free, instant, no signup.
          </p>

          <GrossPayClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">How these numbers are calculated</h2>
            <p className="text-white/60 leading-relaxed">
              Every conversion pivots through weekly pay using standard payroll conventions:
              52 weeks per year, biweekly = weekly × 2 (26 pay periods), annual = weekly × 52,
              and monthly = annual ÷ 12. Hourly pay × hours per week gives weekly pay, and
              daily pay × days per week gives weekly pay — going the other way, deriving an
              hourly or daily rate from a salary divides by those same numbers. Worked example:{' '}
              <span className="text-white/85 font-medium">$25/hour</span> at 40 hours/week is{' '}
              <span className="text-white/85 font-medium">$1,000/week</span>, which is{' '}
              <span className="text-white/85 font-medium">$52,000/year</span>; monthly is
              annual ÷ 12 = <span className="text-[#5EEAD4] font-medium">$4,333.33</span>.
            </p>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>Assuming monthly pay is 4 weeks of pay — it is annual ÷ 12, about 4.33 weeks.</li>
              <li>Comparing a gross offer against your current take-home pay — compare gross to gross.</li>
              <li>Forgetting that a salary conversion assumes your stated hours — overtime isn’t in it.</li>
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
            Results are gross-pay estimates for informational purposes only, not payroll, tax,
            or legal advice. Actual payroll periods and conventions vary by employer and
            jurisdiction.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
