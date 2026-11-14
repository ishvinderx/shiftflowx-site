// Provenance box for jurisdiction-rule calculators (GST/HST, overtime):
// shows exactly which rule version produced the numbers and where it came from.
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
    <div className="mt-6 bg-track/40 border border-rule rounded-xl p-4 text-xs text-ink-2 leading-relaxed">
      <p className="text-ink-2 font-semibold uppercase tracking-wide text-[10px] mb-2">
        Calculation rules
      </p>
      <p>
        {rule.jurisdiction} · rule v{rule.ruleVersion} · effective {rule.effectiveDate}
      </p>
      <p className="mt-1">
        Source:{' '}
        <a
          href={rule.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-2 hover:text-ink underline underline-offset-2 transition-colors"
        >
          {rule.source}
        </a>{' '}
        · last reviewed {rule.lastReviewed}
      </p>
    </div>
  )
}
