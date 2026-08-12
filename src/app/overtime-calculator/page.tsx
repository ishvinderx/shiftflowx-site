import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import OvertimeClient from './OvertimeClient'

// Statutory overtime calculator — FAIL CLOSED. Verified jurisdiction rules
// come from '@/lib/rules/overtime'; anything not listed there gets no
// statutory calculation, only a clearly-labeled manual mode.

const TOOL = {
  slug: 'overtime-calculator',
  title: 'Overtime Calculator',
  description:
    'Free overtime calculator with rules verified from official government sources for Ontario, BC, Alberta, federally regulated Canada, and the US (FLSA). Split regular vs. overtime hours and see your gross pay. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Overtime Calculator — Verified Rules for ON, BC, AB, Federal & US',
})

const FAQ: Faq[] = [
  {
    q: 'Is overtime after 8 hours a day or 40 hours a week?',
    a: 'It depends entirely on your jurisdiction. Ontario has no daily overtime at all — only hours past 44 in a week count. The US federal FLSA rule is weekly-only too, past 40 hours. BC, Alberta, and federally regulated Canadian workplaces have both a daily threshold (8 hours) and a weekly one (40 or 44 hours). That is why this calculator asks for your jurisdiction first.',
  },
  {
    q: 'Why isn’t my province or state listed?',
    a: 'We only calculate overtime from rules we have verified against official government sources, and we list the source with every result. If your jurisdiction isn’t listed, we haven’t verified its rule, so we won’t guess — showing a wrong statutory number is worse than showing none. You can still use manual mode with your own threshold and multiplier.',
  },
  {
    q: 'Does this calculator include double time?',
    a: 'Only where the verified rule has it. Of the listed jurisdictions, only British Columbia has statutory double time: 2× pay for hours past 12 in a single day. Ontario, Alberta, federally regulated Canada, and the US FLSA have no statutory double-time requirement — any 2× pay there comes from your contract or collective agreement, not the law.',
  },
  {
    q: 'Are managers entitled to overtime?',
    a: 'Usually not. Every jurisdiction listed here exempts managers and supervisors from statutory overtime, and most also exempt certain professionals (for example engineers, lawyers, and doctors) and other categories. Exemption tests are specific — in the US they involve duties and salary-basis tests — so check the official source linked with your result if you might be exempt.',
  },
  {
    q: 'What happens when daily and weekly overtime both apply in the same week?',
    a: 'The jurisdictions handle it differently. Federally regulated Canada and Alberta compute daily and weekly overtime separately and pay the greater of the two. BC applies both independently, but only the first 8 hours of each day count toward the weekly total, which prevents the same hour from being paid as overtime twice. This calculator applies the correct interaction for the rule you select.',
  },
  {
    q: 'Is overtime pay calculated on my regular hourly rate?',
    a: 'The statutory minimum is your regular rate times the multiplier — commonly 1.5×, so $20/hour becomes $30/hour for overtime hours. Some jurisdictions define the regular rate to include things like non-discretionary bonuses, and employment contracts can promise more than the statutory minimum. This calculator uses the flat hourly rate you enter.',
  },
]

export default function OvertimeCalculatorPage() {
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
            Overtime Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Overtime rules verified from official government sources for Ontario, BC, Alberta,
            federally regulated Canada, and the US. Jurisdictions we haven’t verified aren’t
            calculated — no guessed numbers.
          </p>

          <OvertimeClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">How overtime is calculated</h2>
            <p className="text-white/60 leading-relaxed">
              Pick your jurisdiction and the calculator applies that jurisdiction’s verified
              statutory rule — its threshold(s), multiplier, and how daily and weekly overtime
              interact — instead of a one-size-fits-all formula. Worked example (Ontario): you work
              50 hours at $20/hour. Ontario’s threshold is 44 hours per week with no daily
              overtime, so 44 regular hours pay{' '}
              <span className="text-white/85 font-medium">$880</span> and 6 overtime hours at $20 ×
              1.5 add <span className="text-white/85 font-medium">$180</span> — gross pay{' '}
              <span className="text-[#5EEAD4] font-medium">$1,060</span>.
            </p>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>
                Applying the overtime multiplier to all hours instead of only the hours past the
                threshold.
              </li>
              <li>
                Assuming daily overtime exists everywhere — Ontario has none, so a 10-hour day in a
                40-hour week earns no overtime there.
              </li>
              <li>
                Assuming everyone qualifies — managers, supervisors, and many professions are
                exempt from statutory overtime in every listed jurisdiction.
              </li>
            </ul>
          </section>

          <FaqSection faq={FAQ} />

          <RelatedTools
            slug={TOOL.slug}
            extraLinks={[
              { href: '/blog/how-to-calculate-overtime-hours', label: 'How to calculate overtime hours' },
              { href: '/download', label: 'Get the ShiftFlow app' },
            ]}
          />

          <ToolDisclaimer>
            Results are estimates for informational purposes only, not legal or payroll advice.
            Statutory overtime rules have exemptions and industry variations, and your contract may
            provide more than the statutory minimum — check the official source linked with your
            result.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
