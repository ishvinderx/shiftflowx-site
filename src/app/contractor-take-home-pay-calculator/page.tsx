import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import ContractorTakeHomeClient from './ContractorTakeHomeClient'

// Same engine as /contractor-pay-calculator (imported, not duplicated) — this
// page's distinct intent is the what-do-I-actually-keep waterfall, not the
// invoice breakdown.

const TOOL = {
  slug: 'contractor-take-home-pay-calculator',
  title: 'Contractor Take-Home Pay Calculator',
  description:
    'Free Canadian contractor take-home pay calculator: from billable hours to the money that’s really yours — expenses out, tax reserve set aside, GST/HST kept separate. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Contractor Take-Home Pay Calculator — What You Actually Keep',
})

const FAQ: Faq[] = [
  {
    q: 'Why is my take-home so much lower than my hourly rate?',
    a: 'Because your rate is revenue, not pay. Out of every billable dollar come your business expenses and the income tax you must set aside yourself — and if you charge GST/HST, that part of the invoice was never yours at all. In the worked example above, a $26/hour contract leaves about $16.50/hour actually available ($1,650 over 100 hours). That is normal, not a mistake — it is why contractor rates run higher than employee wages for the same work.',
  },
  {
    q: 'How is a contractor’s take-home different from an employee’s take-home?',
    a: 'An employee’s take-home is what arrives after the employer has already withheld income tax and payroll contributions — the deductions happen before the money lands. As a contractor, nobody withholds anything: the full labour amount lands in your account, and the “deductions” are your job — you set aside your own income-tax reserve and remit any GST/HST yourself. Money in the account is not money you can spend.',
  },
  {
    q: 'Is the GST/HST on my invoices mine to keep?',
    a: 'No. GST/HST is collected on behalf of the CRA and remitted (minus any input tax credits) — it passes through you. That is why this calculator shows it as a separate line outside the waterfall instead of a step in it: it never enters what you keep, and your tax reserve is never computed on it.',
  },
  {
    q: 'How is this different from the contractor pay calculator?',
    a: 'Same math, same engine, different question. The contractor pay calculator is invoice-centric: it breaks down what a contract pays — labour, GST/HST, the invoice total. This page centers the number people actually care about: after expenses and your tax reserve, what is yours to spend. If you are quoting a contract, use that one; if you are wondering what you can safely take out of the account, use this one.',
  },
  {
    q: 'What if I don’t know what reserve percentage to use?',
    a: 'The calculator will not guess for you: leave the reserve blank and the waterfall stops at profit, because an unentered reserve is not a 0% reserve. The right percentage depends on your total annual income, your province, and your deductions — pick a working estimate (and ask an accountant to refine it), then reserve it on profit every period, including the good months.',
  },
]

export default function ContractorTakeHomePayCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="Contractor Take-Home Pay Calculator"
        lede={`From billable hours to the money that’s really yours — expenses out, tax reserve set aside, GST/HST kept separate. Free, instant, no signup.`}
        explainTitle="How your take-home is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              The waterfall runs top to bottom: gross labour, minus business expenses, is your
              estimated profit; minus your income-tax reserve, is what’s actually available.
              Worked example: 100 hours at $26/hour is{' '}
              <span className="text-ink font-medium">$2,600</span> gross labour; $400 of
              expenses leaves <span className="text-ink font-medium">$2,200</span> profit; a
              25% reserve sets aside <span className="text-ink font-medium">$550</span>,
              leaving <span className="text-positive font-medium">$1,650</span> available. These
              are the two numbers people confuse: in Ontario you’d{' '}
              <span className="text-ink font-medium">invoice $2,938</span> (labour plus $338
              HST), but your <span className="text-positive font-medium">available income is
              $1,650</span> — the HST is collected for the CRA and never enters the waterfall.
            </p>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>Spending the HST — it sits in your account, but it belongs to the CRA.</li>
              <li>
                Treating the invoice total as income — the tax on top of your labour was never
                yours.
              </li>
              <li>
                Skipping the reserve in good months — the tax bill on a good month is bigger, not
                optional.
              </li>
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
        <ContractorTakeHomeClient />
      </ToolLayout>
    </>
  )
}
