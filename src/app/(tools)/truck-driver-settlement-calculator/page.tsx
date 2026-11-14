import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import SettlementClient from './SettlementClient'

// Settlement checker for hourly contractor drivers: predict what the carrier's
// settlement SHOULD pay (earnings + GST/HST − deductions) so the statement
// they receive can be verified. Pattern mirrors hourly-pay-calculator: seo
// helpers + shared components + a pure engine (settlementCalc.ts) + a client
// UI (SettlementClient.tsx). Tool above the fold; CTA inside the result.

const TOOL = {
  slug: 'truck-driver-settlement-calculator',
  title: 'Truck Driver Settlement Calculator',
  description:
    'Free truck driver settlement calculator: enter your hours and hourly rate to see what your carrier settlement should pay — work earnings, GST/HST, and deductions. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'Truck Driver Settlement Calculator — Check Your Expected Pay',
})

const FAQ: Faq[] = [
  {
    q: 'Why is there HST on my settlement?',
    a: 'If you drive as a GST/HST-registered contractor, you are supplying a service to the carrier, so the carrier pays GST/HST on top of your earnings. That tax lands on your settlement, but it is money you collect for the CRA and remit later — it is not part of your pay.',
  },
  {
    q: 'My settlement doesn’t match this number — what now?',
    a: 'Compare it line by line: your hours against the hours the carrier paid, the rate applied, the GST/HST amount, and every deduction. Most discrepancies come from missed hours or a deduction you were not told about. Raise the specific line with your carrier — a line-item question is much harder to brush off than “this looks low.”',
  },
  {
    q: 'Am I an employee or a contractor?',
    a: 'It depends on the real working relationship — who controls your schedule, whose truck you drive, whether you can work for others, and who carries the financial risk — not just what the contract calls you. It matters here because employees do not charge GST/HST on their wages at all; only contractors do. If you are unsure, the CRA and your provincial labour authority publish guidance on the distinction.',
  },
  {
    q: 'Should I track my own hours?',
    a: 'Yes — that is the whole point of checking settlements. If the carrier’s statement is the only record of your hours, you have no way to dispute it. Your own log of every shift is what turns “this looks low” into “you paid me for 92 hours, I drove 100.”',
  },
  {
    q: 'Is the GST/HST portion mine to keep?',
    a: 'No. It arrives in your account with the settlement, but you collected it on behalf of the CRA and must remit it when you file your GST/HST return (minus any input tax credits). Treating it as earnings is the fastest way to a tax bill you cannot cover — set it aside.',
  },
  {
    q: 'What counts as carrier deductions?',
    a: 'Amounts the carrier withholds from the settlement before paying you: fuel advances, admin or dispatch fees, insurance chargebacks, damage claims. Every deduction should be itemized and match your contract — an unexplained deduction is exactly the kind of line you should query.',
  },
]

export default function TruckDriverSettlementCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="Truck Driver Settlement Calculator"
        lede={`Know what your settlement should say before it arrives — work earnings, GST/HST, and deductions, so you can check the statement your carrier sends.`}
        explainTitle="How a settlement is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              Expected payment = (hours worked × hourly rate) + GST/HST on those earnings, minus
              any deductions the carrier withholds. Worked example: 100 hours at $26/hour is{' '}
              <span className="text-ink font-medium">$2,600</span> work earnings; 13% HST in
              Ontario adds <span className="text-ink font-medium">$338</span>; the expected
              payment is <span className="text-positive font-medium">$2,938</span>. The $338 is
              the CRA’s money passing through your account, not yours — your earnings are still
              $2,600.
            </p>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>Treating the HST portion as pay — it belongs to the CRA and must be remitted.</li>
              <li>Not reconciling settlements against your own hours — the carrier’s statement shouldn’t be the only record.</li>
              <li>Letting unexplained deductions slide — every withheld dollar should be itemized and match your contract.</li>
            </ul>
          </>
        }
        faq={FAQ}
        extraLinks={[{ href: '/download', label: 'Get the HoursFlow app' }]}
        disclaimer={
          <>
            Results are estimates for informational purposes only, not accounting, tax, or legal
            advice. Actual settlements depend on your contract terms, and GST/HST obligations
            depend on your registration status.
          </>
        }
      >
        <SettlementClient />
      </ToolLayout>
    </>
  )
}
