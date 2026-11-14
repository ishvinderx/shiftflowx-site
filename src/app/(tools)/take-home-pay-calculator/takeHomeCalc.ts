// Pure take-home engine, no React.
//
// Design decision of record: this tool does NOT compute statutory income tax,
// CPP, or EI — no verified jurisdiction tax tables exist in this codebase and
// fabricating them is forbidden. The user supplies their own deduction rows
// (from a real paystub or their own estimates); this engine only does the
// arithmetic.
//
// Contract: calculateTakeHome returns null for invalid gross (negative, NaN,
// Infinity). Deduction rows with a non-finite value are FILTERED — an empty
// row means "not entered yet", never 0. Percent rows compute on gross. The
// engine is honest: deductions exceeding gross return a negative net; the UI
// is responsible for flagging it. Money is computed in floats and rounded ONLY
// at display time.

export type DeductionKind = 'percent' | 'amount'

export interface DeductionInput {
  label: string
  kind: DeductionKind
  value: number
}

export interface TakeHomeResult {
  gross: number
  rows: { label: string; amount: number }[]
  totalDeductions: number
  net: number
}

export function calculateTakeHome(
  gross: number,
  deductions: DeductionInput[],
): TakeHomeResult | null {
  if (!Number.isFinite(gross) || gross < 0) return null

  const rows = deductions
    .filter((d) => Number.isFinite(d.value))
    .map((d) => ({
      label: d.label,
      amount: d.kind === 'percent' ? (gross * d.value) / 100 : d.value,
    }))
  const totalDeductions = rows.reduce((sum, r) => sum + r.amount, 0)
  return { gross, rows, totalDeductions, net: gross - totalDeductions }
}
