import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import ContractorPayClient from './ContractorPayClient'

const TOOL = {
  slug: 'contractor-pay-calculator',
  title: 'Contractor Pay Calculator',
  description:
    'Free Canadian contractor pay calculator: see what a contract really pays — labour revenue, GST/HST collected, business expenses, income-tax reserve, and what you actually keep. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Contractor Pay Calculator — GST/HST & Tax Reserve',
})

const FAQ: Faq[] = [
  {
    q: 'Is the GST/HST I collect part of my income?',
    a: 'No. GST/HST is charged on top of your labour and collected on behalf of the CRA — you remit it (minus any input tax credits). On a $2,600 invoice with 13% HST, the $338 tax passes through you; only the $2,600 labour is your revenue. Spending it as if it were earnings is one of the fastest ways contractors get into trouble at remittance time.',
  },
  {
    q: 'What percent of my income should I reserve for income tax?',
    a: 'It depends on your total income for the year, your province, and your other deductions — there is no single right number, which is why this calculator uses the percentage you choose rather than suggesting one. Whatever you pick, the reserve should be computed on profit (labour minus expenses), never on the tax-inclusive invoice total.',
  },
  {
    q: 'Do unregistered contractors charge GST/HST?',
    a: 'No. If you are not registered for GST/HST, you do not charge it on your invoices at all. The CRA has a small-supplier concept under which lower-revenue businesses generally are not required to register; whether registering anyway makes sense for you (for example, to claim input tax credits) is a question for an accountant.',
  },
  {
    q: 'Why is the tax reserve based on profit and not my invoice total?',
    a: 'Because income tax is owed on what you earn, not on what you invoice. The invoice total includes GST/HST that was never yours, and your billable revenue includes expenses that reduce your taxable profit. Reserving a percentage of the invoice total over-reserves on money you must remit anyway; reserving on profit matches how the tax is actually assessed.',
  },
  {
    q: 'What counts as a business expense?',
    a: 'Generally, reasonable costs you incur to earn business income — things like tools and equipment, software, insurance, professional fees, and the business-use portion of shared costs. The rules on what is deductible and in what proportion are the CRA’s, not this calculator’s: enter your best estimate for the period and confirm specifics with an accountant.',
  },
  {
    q: 'Does this calculator include PST or QST?',
    a: 'No. It uses verified GST/HST rates only. In provinces with a separate provincial sales tax (British Columbia, Saskatchewan, Manitoba, Quebec) the calculator shows a disclosure that PST/QST is not included — those taxes have their own registration and remittance rules.',
  },
]

export default function ContractorPayCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="Contractor Pay Calculator"
        lede={`See what a contract really pays — labour, GST/HST, expenses, and what to set aside. Free, instant, no signup.`}
        explainTitle="How contractor pay is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              Labour revenue = billable hours × hourly rate. If you are GST/HST-registered, the tax
              is charged on top of labour — not carved out of it. Worked example: 100 hours at
              $26/hour is <span className="text-ink font-medium">$2,600</span> labour; in
              Ontario, 13% HST adds <span className="text-ink font-medium">$338</span>, so you
              invoice <span className="text-ink font-medium">$2,938</span>. That $338 is
              collected for the CRA, not earned. With $400 of business expenses, profit is{' '}
              <span className="text-ink font-medium">$2,200</span>, and a 25% income-tax
              reserve — computed on that $2,200 profit, never on the invoice total — sets aside{' '}
              <span className="text-ink font-medium">$550</span>, leaving{' '}
              <span className="text-positive font-medium">$1,650</span> available.
            </p>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>Treating the HST you collect as income — it passes through you to the CRA.</li>
              <li>
                Reserving income tax on the invoice total instead of profit — the invoice includes
                sales tax that was never yours.
              </li>
              <li>Forgetting that business expenses reduce your taxable profit before any reserve.</li>
            </ul>
          </>
        }
        faq={FAQ}
        extraLinks={[{ href: '/download', label: 'Get the HoursFlow app' }]}
        disclaimer={
          <>
            Results are estimates for informational purposes only, not tax, accounting, or legal
            advice, and do not represent your actual CRA liability. GST/HST obligations, deductible
            expenses, and income-tax rates depend on your circumstances — confirm with an
            accountant.
          </>
        }
      >
        <ContractorPayClient />
      </ToolLayout>
    </>
  )
}
