import type { Metadata } from 'next'
import ToolLayout from '@/components/calculator/ToolLayout'
import { faqSchema, jsonLd, toolMetadata, webAppSchema, type Faq } from '@/lib/seo'
import GstHstClient from './GstHstClient'

// GST/HST calculator page — follows the exemplar pattern (hourly-pay-calculator):
// seo helpers + shared components + a pure engine (gstCalc.ts) + a client UI
// (GstHstClient.tsx). Rates come ONLY from '@/lib/rules/salesTax'.

const TOOL = {
  slug: 'gst-hst-calculator',
  title: 'GST/HST Calculator',
  description:
    'Free Canadian GST/HST calculator: add tax to a pre-tax amount or back it out of a total, using verified CRA rates for every province and territory. No signup required.',
}

export const metadata: Metadata = toolMetadata({
  ...TOOL,
  title: 'GST/HST Calculator — Canada, All Provinces (Add or Remove Tax)',
})

const FAQ: Faq[] = [
  {
    q: 'What is the difference between GST and HST?',
    a: 'GST is the 5% federal Goods and Services Tax charged across Canada. HST is the Harmonized Sales Tax — the federal GST combined with a provincial portion into one tax, collected in the provinces that harmonized. You charge one or the other depending on the province of supply, never both.',
  },
  {
    q: 'Which provinces have HST?',
    a: 'Ontario, New Brunswick, Newfoundland and Labrador, Nova Scotia, and Prince Edward Island charge HST. Everywhere else — Alberta, British Columbia, Manitoba, Quebec, Saskatchewan, and the three territories — charges the 5% federal GST.',
  },
  {
    q: 'What is the HST rate in Ontario?',
    a: 'Ontario HST is 13%, per the Canada Revenue Agency. On a $2,600 invoice that is $338 of HST, for a total of $2,938.',
  },
  {
    q: 'Did Nova Scotia’s HST rate change?',
    a: 'Yes. Nova Scotia’s HST dropped from 15% to 14% effective April 1, 2025. Invoices for supplies made on or after that date use 14%.',
  },
  {
    q: 'Does this calculator include PST or QST?',
    a: 'No. British Columbia, Saskatchewan, Manitoba, and Quebec charge a separate provincial sales tax (PST/RST/QST) on top of the 5% GST. This calculator handles only the GST/HST portion and flags those provinces when selected.',
  },
  {
    q: 'How do I remove GST/HST from a total?',
    a: 'Divide the tax-included total by 1 plus the rate as a decimal. A $2,938 total in Ontario is $2,938 ÷ 1.13 = $2,600 before tax. Multiplying the total by the rate instead overstates the tax portion.',
  },
]

export default function GstHstCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webAppSchema(TOOL)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(FAQ)) }} />

      <ToolLayout
        slug={TOOL.slug}
        title="GST/HST Calculator"
        lede={`Add GST/HST to an amount or back it out of a tax-included total, using verified CRA rates for every province and territory — free, instant, no signup.`}
        explainTitle="How GST/HST is calculated"
        explain={
          <>
            <p className="text-ink-2 leading-relaxed">
              Adding tax: tax = pre-tax amount × rate; total = pre-tax amount + tax. Worked
              example: $2,600 in Ontario at 13% HST is{' '}
              <span className="text-ink font-medium">$338</span> of tax, for a total of{' '}
              <span className="text-positive font-medium">$2,938</span>. Removing tax runs the
              same math in reverse: pre-tax = total ÷ (1 + rate), so $2,938 ÷ 1.13 ={' '}
              <span className="text-ink font-medium">$2,600</span> before tax and{' '}
              <span className="text-ink font-medium">$338</span> of HST.
            </p>
            <h3 className="text-ink font-semibold mt-6 mb-2">Common mistakes</h3>
            <ul className="list-disc text-ink-2 leading-relaxed">
              <li>
                Using 15% for Nova Scotia — its HST dropped to 14% on April 1, 2025.
              </li>
              <li>
                Forgetting that BC, Saskatchewan, Manitoba, and Quebec charge a separate PST/QST
                on top of the 5% GST — this tool covers only the GST/HST portion.
              </li>
              <li>
                Computing &ldquo;remove tax&rdquo; by multiplying the total by the rate instead of
                dividing by 1 + rate — that overstates the tax portion.
              </li>
            </ul>
          </>
        }
        faq={FAQ}
        extraLinks={[{ href: '/download', label: 'Get the HoursFlow app' }]}
        disclaimer={
          <>
            Results are estimates for informational purposes only, not tax or legal advice.
            Confirm the rate for your specific supply with the CRA — some goods and services are
            zero-rated or exempt.
          </>
        }
      >
        <GstHstClient />
      </ToolLayout>
    </>
  )
}
