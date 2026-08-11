// Pure hourly-pay engine, no React.
//
// Contract: calculateHourlyPay returns null for invalid input (any field
// negative, NaN, or Infinity). Callers must show a validation message and no
// result — never coerce invalid input to 0 and display a fabricated number.
// Money is computed in floats and rounded ONLY at display time.

export interface HourlyPayInput {
  hours: number
  hourlyRate: number
  overtimeHours: number
  overtimeMultiplier: number
}

export interface HourlyPayResult {
  regularPay: number
  overtimePay: number
  grossPay: number
}

export function calculateHourlyPay(input: HourlyPayInput): HourlyPayResult | null {
  const { hours, hourlyRate, overtimeHours, overtimeMultiplier } = input
  const values = [hours, hourlyRate, overtimeHours, overtimeMultiplier]
  if (values.some((v) => !Number.isFinite(v) || v < 0)) return null

  const regularPay = hours * hourlyRate
  const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier
  return { regularPay, overtimePay, grossPay: regularPay + overtimePay }
}
