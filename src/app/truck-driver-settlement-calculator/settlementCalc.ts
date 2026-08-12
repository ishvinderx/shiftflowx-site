// Pure settlement engine, no React.
//
// Contract: calculateSettlement returns null for invalid input (hours, rate,
// or entered deductions negative/NaN/Infinity; 'registered' without a valid
// taxPercent). Callers must show a validation message and no result — never
// coerce invalid input to 0 and display a fabricated number.
//
// gstHstStatus drives the tax fields — 'not registered' is a distinct valid
// state, NOT taxPercent 0 (0 would render a bogus "HST $0" line):
//   'registered'     → tax is a number, expectedPayment = earnings + tax
//   'not-registered' → tax null (no tax line), expectedPayment = earnings
//   'unknown'        → tax null AND expectedPayment null — the estimate is
//                      incomplete and the UI must label it as such
//
// carrierDeductions null = field left blank → netAfterDeductions null (line
// absent, never $0). Entered deductions against a complete expectedPayment
// → netAfterDeductions = expectedPayment − deductions.
//
// tax is rounded to cents in the engine so earnings + tax equals
// expectedPayment exactly; everything else rounds only at display time.

export type GstHstStatus = 'registered' | 'not-registered' | 'unknown'

export interface SettlementInput {
  hours: number
  rate: number
  gstHstStatus: GstHstStatus
  /** GST/HST rate in percent. Required when gstHstStatus is 'registered'; ignored otherwise. */
  taxPercent: number | null
  /** null = not entered (blank field) — never zero-coerced. */
  carrierDeductions: number | null
}

export interface SettlementResult {
  earnings: number
  tax: number | null
  expectedPayment: number | null
  netAfterDeductions: number | null
}

const invalid = (v: number) => !Number.isFinite(v) || v < 0
const round2 = (n: number) => Math.round(n * 100) / 100

export function calculateSettlement(input: SettlementInput): SettlementResult | null {
  const { hours, rate, gstHstStatus, taxPercent, carrierDeductions } = input
  if (invalid(hours) || invalid(rate)) return null
  if (carrierDeductions !== null && invalid(carrierDeductions)) return null
  if (gstHstStatus === 'registered' && (taxPercent === null || invalid(taxPercent))) return null

  const earnings = hours * rate
  const tax = gstHstStatus === 'registered' ? round2(earnings * (taxPercent! / 100)) : null
  const expectedPayment = gstHstStatus === 'unknown' ? null : earnings + (tax ?? 0)
  const netAfterDeductions =
    expectedPayment !== null && carrierDeductions !== null
      ? expectedPayment - carrierDeductions
      : null

  return { earnings, tax, expectedPayment, netAfterDeductions }
}
