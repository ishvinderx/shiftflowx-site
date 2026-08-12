// Pure GST/HST engine, no React.
//
// Contract: both functions return null for invalid input (negative, NaN, or
// Infinity). Callers must show a validation message and no result — never
// coerce invalid input to 0 and display a fabricated number. Rates come ONLY
// from '@/lib/rules/salesTax' — never hardcoded here or in the UI. Money is
// computed in floats and rounded ONLY at display time.

export interface TaxBreakdown {
  preTax: number
  tax: number
  total: number
}

function invalid(...values: number[]): boolean {
  return values.some((v) => !Number.isFinite(v) || v < 0)
}

// amount is pre-tax; returns the tax on top and the total including tax.
export function addTax(amount: number, ratePercent: number): TaxBreakdown | null {
  if (invalid(amount, ratePercent)) return null
  const tax = amount * (ratePercent / 100)
  return { preTax: amount, tax, total: amount + tax }
}

// total includes tax; backs out the pre-tax amount: total ÷ (1 + rate/100).
export function removeTax(total: number, ratePercent: number): TaxBreakdown | null {
  if (invalid(total, ratePercent)) return null
  const preTax = total / (1 + ratePercent / 100)
  return { preTax, tax: total - preTax, total }
}
