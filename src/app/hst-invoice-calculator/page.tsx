import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import HstInvoiceClient from './HstInvoiceClient'

// Pattern mirrors the exemplar (hourly-pay-calculator): seo helpers + shared
// components + a pure engine (invoiceCalc.ts) + a client UI
// (HstInvoiceClient.tsx). Tool above the fold; the CTA lives inside the
// result, never before the tool. One idea the page must make unmistakable:
// LABOUR + GST/HST = TOTAL INVOICE, and the GST/HST is not earnings.

const TOOL = {
  slug: 'hst-invoice-calculator',
  title: 'HST Invoice Calculator',
  description:
    'Free HST invoice calculator for hourly contractors in Canada: enter your hours, rate, and province to get labour, GST/HST, and total invoice — and see exactly which part is yours. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'HST Invoice Calculator — Hourly Contractor Invoices (Canada)',
})

const FAQ: Faq[] = [
  {
    q: 'Do I charge HST on my invoices?',
    a: 'Only if you are registered for GST/HST. Registration is mandatory once your revenue crosses the CRA small-supplier threshold, and optional below it. If you are not registered, you must not charge GST/HST — check your registration status with the CRA before adding tax to an invoice.',
  },
  {
    q: 'Is the HST on my invoice my money?',
    a: 'No. The GST/HST line is money you collect on behalf of the CRA and remit when you file your GST/HST return. In the worked example above, you invoice $2,938 but you earned $2,600 — the $338 was never yours. Treating it as income is how contractors end up short at filing time.',
  },
  {
    q: 'Which rate do I charge?',
    a: 'Generally the rate of the province where the supply is made under the CRA place-of-supply rules — often the province where your client receives the service. Pick the province in the calculator above to see its GST/HST rate, and confirm your situation against the CRA place-of-supply guidance.',
  },
  {
    q: 'What if my client is in another province?',
    a: 'Place-of-supply rules apply: the rate is usually determined by where the supply is made, not where you are. For services that can mean the client’s province. The rules have exceptions, so check the CRA place-of-supply guidance for your specific case.',
  },
  {
    q: 'Why doesn’t this calculator include PST or QST?',
    a: 'British Columbia, Manitoba, Saskatchewan, and Quebec charge a separate provincial sales tax on top of the federal GST, administered separately with its own registration and rules. This calculator covers GST/HST only, and flags those provinces so you know a separate tax may apply.',
  },
]

export default function HstInvoiceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="HST Invoice Calculator"
        lede={`Build an hourly invoice total with GST/HST added correctly — and see exactly which part is yours.`}
        explainTitle="How an HST invoice is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              Labour + GST/HST = total invoice. Worked example: 100 hours at $26/hour is{' '}
              <span className="text-ink font-medium">$2,600</span> labour; 13% HST adds{' '}
              <span className="text-ink font-medium">$338</span>; the total invoice is{' '}
              <span className="text-positive font-medium">$2,938</span>. You invoice $2,938, you
              earned $2,600, and you remit $338 to the CRA — the tax line was never your income.
            </p>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>
                Quoting a rate “including HST” and eating the tax — the HST belongs on top of your
                rate, not inside it.
              </li>
              <li>
                Treating the collected HST as spendable income — it is the CRA’s money sitting in
                your account until you remit it.
              </li>
              <li>Charging HST when you are not registered for GST/HST.</li>
            </ul>
          </>
        }
        faq={FAQ}
        extraLinks={[{ href: '/download', label: 'Get the HoursFlow app' }]}
        disclaimer={
          <>
            Results are estimates for informational purposes only, not tax advice. Place-of-supply
            and exemption rules can change which rate applies to your invoices — confirm your
            situation with the CRA or a tax professional.
          </>
        }
      >
        <HstInvoiceClient />
      </ToolLayout>
    </>
  )
}
