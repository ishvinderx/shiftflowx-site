import { Callout } from '@/components/ui'

// Provenance note for jurisdiction-rule calculators (GST/HST, overtime): which rule version
// produced the numbers and where it came from. Spans both columns of the calculator grid.
export default function SourceInfo({
  rule,
}: {
  rule: {
    jurisdiction: string
    ruleVersion: string
    effectiveDate: string
    source: string
    sourceUrl: string
    lastReviewed: string
  }
}) {
  return (
    <Callout label="Calculation rules" className="lg:col-span-2 text-[0.9375rem]">
      <span className="block">
        {rule.jurisdiction} · rule v{rule.ruleVersion} · effective {rule.effectiveDate}
      </span>
      <span className="mt-1 block text-ink-2">
        Source:{' '}
        <a href={rule.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2">
          {rule.source}
        </a>{' '}
        · last reviewed {rule.lastReviewed}
      </span>
    </Callout>
  )
}
