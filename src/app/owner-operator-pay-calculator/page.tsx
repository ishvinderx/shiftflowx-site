import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import OwnerOperatorClient from './OwnerOperatorClient'

// Owner-operator / independent truck driver pay breakdown (Canada). Follows
// the exemplar pattern: seo helpers + shared components + a pure engine
// (ownerOpCalc.ts) + a client UI (OwnerOperatorClient.tsx). Tool above the
// fold; the CTA lives inside the result, never before the tool. Hours-of-
// service / logbook rules are deliberately out of scope.

const TOOL = {
  slug: 'owner-operator-pay-calculator',
  title: 'Owner-Operator Pay Calculator',
  description:
    'Free owner-operator pay calculator for Canadian truck drivers: revenue, GST/HST, fuel and fixed costs, income-tax reserve, and cost per km. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Owner-Operator Pay Calculator — Trucking Revenue, Costs & Reserve (Canada)',
})

const FAQ: Faq[] = [
  {
    q: 'Is my settlement all mine?',
    a: 'No. A settlement is revenue, not pay. If you are registered for GST/HST, part of it is tax you collected for the CRA — it was never yours. What remains has to cover fuel, maintenance, insurance, and your other operating costs before anything is income, and a slice of that profit should be reserved for income tax. Your real pay is what is left after all three.',
  },
  {
    q: 'What expenses should I count?',
    a: 'Everything it costs to keep the truck earning: fuel, maintenance and repairs (including tires), insurance, truck and trailer payments or lease, plates, permits and licensing, tolls, scale fees, parking, phone and ELD subscriptions, and accounting fees. If you only track fuel, your profit number is fiction — the fixed costs keep running whether the wheels turn or not.',
  },
  {
    q: 'Why does cost per km matter?',
    a: 'Because it turns any load offer into a yes/no answer. If your all-in cost is $0.80/km, a load paying $1.10/km makes money and a load paying $0.75/km loses money no matter how big the gross looks. Gross revenue rewards long deadhead and cheap freight; cost per km exposes them.',
  },
  {
    q: 'Do I charge GST/HST on my loads?',
    a: 'It depends on your registration status and the load. If you are registered, most domestic freight is taxable at your province’s rate, but some hauls — like interlined freight between carriers or international shipments — are treated differently. If you are not registered, you don’t charge it at all. The rules have real exceptions, so confirm your situation with the CRA or an accountant.',
  },
  {
    q: 'Does this calculator include CPP and income tax?',
    a: 'No. The reserve line is a percentage you choose to set aside — a savings habit, not a tax calculation. Your actual income tax and CPP contributions depend on your total income, business structure, and deductions for the year, which is a job for tax software or an accountant, not a load calculator.',
  },
]

export default function OwnerOperatorPayCalculatorPage() {
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
            Owner-Operator Pay Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            What a week of trucking really pays after fuel, fixed costs, and the taxman’s
            share — free, instant, no signup.
          </p>

          <OwnerOperatorClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">How owner-operator pay is calculated</h2>
            <p className="text-white/60 leading-relaxed">
              Revenue − expenses = profit; a slice of profit goes into the tax reserve; the rest
              is yours. GST/HST sits outside all of it — collected on top and remitted to the
              CRA, never income. Worked example: 100 hours at $26/hour is{' '}
              <span className="text-white/85 font-medium">$2,600</span> revenue; registered in
              Ontario, you also collect <span className="text-white/85 font-medium">$338</span>{' '}
              HST (13%) for the CRA. Fuel $600 + maintenance $200 ={' '}
              <span className="text-white/85 font-medium">$800</span> expenses, leaving{' '}
              <span className="text-white/85 font-medium">$1,800</span> profit. A 25% reserve
              sets aside <span className="text-white/85 font-medium">$450</span>, so available
              income is <span className="text-[#5EEAD4] font-medium">$1,350</span>. Over 1,000
              km that’s a cost of <span className="text-white/85 font-medium">$0.80/km</span>{' '}
              against revenue of <span className="text-white/85 font-medium">$2.60/km</span>.
            </p>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>Counting the HST as revenue — it’s the CRA’s money passing through your account.</li>
              <li>Judging a contract on gross revenue instead of cost per km — big gross can still lose money.</li>
              <li>Skipping the reserve because the settlement looked big — tax time doesn’t care how it looked.</li>
            </ul>
          </section>

          <FaqSection faq={FAQ} />

          <RelatedTools
            slug={TOOL.slug}
            extraLinks={[{ href: '/download', label: 'Get the ShiftFlow app' }]}
          />

          <ToolDisclaimer>
            Results are estimates for informational purposes only, not tax or accounting advice.
            The tax reserve is a percentage you choose, not a tax calculation — CPP and
            income-tax specifics are excluded. GST/HST treatment varies by registration status
            and load; confirm your situation with the CRA or an accountant.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
