import type { Metadata } from 'next'
import FaqSection from '@/components/calculator/FaqSection'
import RelatedTools from '@/components/calculator/RelatedTools'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { breadcrumbSchema, faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import TaxReserveClient from './TaxReserveClient'

const TOOL = {
  slug: 'tax-reserve-calculator',
  title: 'Tax Reserve Calculator',
  description:
    'Free tax reserve calculator for the self-employed: enter your revenue, expenses, and your reserve percentage to see how much of your profit to set aside for income tax. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Tax Reserve Calculator — Set Aside the Right Amount (Self-Employed)',
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
    a: 'Somewhere it won’t get spent by accident: a separate account from your day-to-day money is the usual answer, and one that earns a little interest while it sits is a bonus. The mechanics matter less than the separation — a reserve mixed into your spending account tends to quietly stop being a reserve.',
  },
]

export default function TaxReserveCalculatorPage() {
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
            Tax Reserve Calculator
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Figure out how much of each payment to park for income tax so filing season
            doesn&rsquo;t hurt — free, instant, no signup.
          </p>

          <TaxReserveClient />

          {/* ── How it works ─────────────────────────────────────────────────── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">How the tax reserve is calculated</h2>
            <p className="text-white/60 leading-relaxed">
              Reserve = (revenue − expenses) × your reserve percentage. Worked example: $2,600 of
              revenue minus $400 of expenses is{' '}
              <span className="text-white/85 font-medium">$2,200</span> of profit; at your 25%,
              set aside <span className="text-[#5EEAD4] font-medium">$550</span> and keep{' '}
              <span className="text-white/85 font-medium">$1,650</span>.
            </p>
            <div className="mt-6 bg-[#5EEAD4]/[0.05] border border-[#5EEAD4]/25 rounded-xl p-5">
              <p className="text-white/80 leading-relaxed text-sm">
                <span className="text-[#5EEAD4] font-semibold">Reserve on profit, not on your
                invoice total</span>{' '}
                — the GST/HST you collected is remitted separately and was never yours, and
                expenses reduce your taxable profit.
              </p>
            </div>
            <h3 className="text-white font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
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
          </section>

          <FaqSection faq={FAQ} />

          <RelatedTools
            slug={TOOL.slug}
            extraLinks={[{ href: '/download', label: 'Get the ShiftFlow app' }]}
          />

          <ToolDisclaimer>
            The reserve amount is a savings guideline, not your actual CRA tax liability, and this
            tool is not tax advice. Your liability depends on total income, brackets, credits,
            deductions, and CPP contributions — talk to a tax professional for your number.
          </ToolDisclaimer>
        </div>
      </div>
    </>
  )
}
