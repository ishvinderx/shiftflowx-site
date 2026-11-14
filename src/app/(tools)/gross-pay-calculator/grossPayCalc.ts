// Pure gross-pay frequency-conversion engine, no React.
//
// Conventions (stated on the page): 52 weeks/year, biweekly = weekly × 2
// (26 periods), monthly = annual ÷ 12, annual = weekly × 52.
// hourly→weekly = rate × hoursPerWeek; daily→weekly = daily × daysPerWeek.
//
// Contract: returns null for invalid input — any field NaN/Infinity, amount
// not > 0 (a $0 wage conversion is meaningless, so zero is rejected with a
// validation message rather than rendering a table of $0s), or
// hoursPerWeek/daysPerWeek not > 0 (they divide the weekly figure). Callers
// must show a validation message and no result — never a fabricated $0.
// Money is computed in floats and rounded ONLY at display time.

export type PayFrequency = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'

export interface GrossPayInput {
  amount: number
  frequency: PayFrequency
  hoursPerWeek: number
  daysPerWeek: number
}

export interface GrossPayResult {
  hourly: number
  daily: number
  weekly: number
  biweekly: number
  monthly: number
  annual: number
}

const WEEKS_PER_YEAR = 52

// Everything pivots through the weekly amount.
const toWeekly: Record<PayFrequency, (amount: number, hoursPerWeek: number, daysPerWeek: number) => number> = {
  hourly: (a, h) => a * h,
  daily: (a, _h, d) => a * d,
  weekly: (a) => a,
  biweekly: (a) => a / 2,
  monthly: (a) => (a * 12) / WEEKS_PER_YEAR,
  annual: (a) => a / WEEKS_PER_YEAR,
}

export function calculateGrossPay(input: GrossPayInput): GrossPayResult | null {
  const { amount, frequency, hoursPerWeek, daysPerWeek } = input
  const values = [amount, hoursPerWeek, daysPerWeek]
  if (values.some((v) => !Number.isFinite(v) || v <= 0)) return null

  const weekly = toWeekly[frequency](amount, hoursPerWeek, daysPerWeek)
  return {
    hourly: weekly / hoursPerWeek,
    daily: weekly / daysPerWeek,
    weekly,
    biweekly: weekly * 2,
    monthly: (weekly * WEEKS_PER_YEAR) / 12,
    annual: weekly * WEEKS_PER_YEAR,
  }
}
