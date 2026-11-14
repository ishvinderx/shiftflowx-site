import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import TaxReserveClient from './TaxReserveClient'

const TOOL = {
  slug: 'tax-reserve-calculator',
  title: 'Tax Reserve Calculator',
  description:
    'Free tax reserve calculator for the self-employed: enter your revenue, expenses, and your reserve percentage to see how much of your profit to set aside for income tax. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Tax Reserve Calculator for the Self-Employed',
})

const FAQ: Faq[] = [
  {
    q: 'What percentage should I set aside for taxes?',
    a: 'There is no universal number — it depends on your income level, your province, and your credits and deductions. This calculator applies YOUR percentage; it does not suggest one. A tax professional or your last year’s return is the right source for that number. As your income grows, revisit it — a percentage that worked at $30,000 of profit will be too low at $80,000.',
  },
  {
    q: 'Do I reserve a percentage of my revenue or my profit?',
    a: 'Profit. Income tax is owed on your profit — revenue minus deductible business expenses — not on everything that hits your bank account. Reserving a percentage of gross revenue over-saves when you have real expenses, and reserving on an invoice total that includes GST/HST over-saves even more, because that sales tax was never your money in the first place.',
  },
  {
    q: 'Is the reserve amount my actual CRA tax liability?',
    a: 'No. It is a savings guideline — a disciplined way to park money so filing season doesn’t hurt. Your actual liability depends on your total income for the year, tax brackets, credits, deductions, and CPP contributions, and is only known when your return is prepared.',
  },
  {
    q: 'Does the GST/HST I collect count as income?',
    a: 'No. GST/HST you collect belongs to the government — you are holding it in trust and remitting it separately. Keep it out of the revenue figure you enter here, and ideally out of the account you think of as yours.',
  },
  {
    q: 'Where should my tax reserve live?',
    a: 'Somewhere it won’t get spent by accident: a separate account from your day- money is the usual answer, and one that earns a little interest while it sits is a bonus. The mechanics matter less than the separation — a reserve mixed into your spending account tends to quietly stop being a reserve.',
  },
]

export default function TaxReserveCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="Tax Reserve Calculator"
        lede={`Figure out how much of each payment to park for income tax so filing season doesn’t hurt — free, instant, no signup.`}
        explainTitle="How the tax reserve is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              Reserve = (revenue − expenses) × your reserve percentage. Worked example: $2,600 of
              revenue minus $400 of expenses is{' '}
              <span className="text-ink font-medium">$2,200</span> of profit; at your 25%,
              set aside <span className="text-positive font-medium">$550</span> and keep{' '}
              <span className="text-ink font-medium">$1,650</span>.
            </p>
            <div className="mt-6 border-l-2 border-positive-line pl-5">
              <p className="text-ink leading-relaxed">
                <span className="text-positive font-semibold">Reserve on profit, not on your
                invoice total</span>{' '}
                — the GST/HST you collected is remitted separately and was never yours, and
                expenses reduce your taxable profit.
              </p>
            </div>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>
                Reserving a percentage of the gross invoice including HST — that sales tax is
                remitted to the government, not saved for income tax.
              </li>
              <li>
                Picking a percentage once and never revisiting it as income grows — higher profit
                usually means a higher effective rate.
              </li>
              <li>
                Forgetting that CPP contributions also exist on self-employed income — your
                filing-season bill is more than income tax alone.
              </li>
            </ul>
          </>
        }
        faq={FAQ}
        extraLinks={[{ href: '/download', label: 'Get the HoursFlow app' }]}
        disclaimer={
          <>
            The reserve amount is a savings guideline, not your actual CRA tax liability, and this
            tool is not tax advice. Your liability depends on total income, brackets, credits,
            deductions, and CPP contributions — talk to a tax professional for your number.
          </>
        }
      >
        <TaxReserveClient />
      </ToolLayout>
    </>
  )
}
