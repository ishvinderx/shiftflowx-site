// Pure invoice engine, no React.
//
// Contract: calculateInvoice returns null for invalid input (hours or rate not
// > 0, taxPercent negative, any field NaN/Infinity). Callers must show a
// validation message and no result — never coerce invalid input to 0 and
// display a fabricated $0 invoice. taxPercent comes ONLY from
// '@/lib/rules/salesTax' — never hardcode a rate here or at a call site.
// Money is computed in floats and rounded ONLY at display time.

export interface InvoiceInput {
  hours: number
  rate: number
  taxPercent: number
}

export interface InvoiceResult {
  labour: number
  tax: number
  total: number
}

export function calculateInvoice(input: InvoiceInput): InvoiceResult | null {
  const { hours, rate, taxPercent } = input
  if ([hours, rate, taxPercent].some((v) => !Number.isFinite(v))) return null
  if (hours <= 0 || rate <= 0 || taxPercent < 0) return null

  const labour = hours * rate
  // Multiply before dividing so exact decimal cases (13% of $1,125) stay exact.
  const tax = (labour * taxPercent) / 100
  return { labour, tax, total: labour + tax }
}
