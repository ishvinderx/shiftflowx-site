// Pure contractor-pay engine, no React.
//
// EXPORTED FOR REUSE: the sibling take-home tool imports calculateContractorPay
// from this file — keep the signature and result shape stable.
//
// Contract: returns null for invalid input (any required field negative, NaN,
// or Infinity; any optional field non-null and invalid). Callers must show a
// validation message and no result — never coerce invalid input to 0.
//
// Accounting rules (non-negotiable):
// - Sales tax (GST/HST) is NOT income: it is collected on top of labour and
//   remitted. salesTaxPercent null = no tax line (unregistered/unknown is the
//   UI's responsibility).
// - The income-tax reserve is computed on PROFIT (labour − expenses), never on
//   the sales tax or the tax-inclusive invoice total.
// - reservePercent null = no reserve/available lines (absence ≠ 0%).
// - Reserve floors at 0: negative profit reserves nothing, available = profit.
// Money is computed in floats and rounded ONLY at display time.

export interface ContractorPayInput {
  hours: number
  rate: number
  salesTaxPercent: number | null
  expenses: number
  reservePercent: number | null
}

export interface ContractorPayResult {
  labour: number
  salesTax: number | null
  grossInvoice: number | null
  expenses: number
  profit: number
  reserve: number | null
  available: number | null
}

export function calculateContractorPay(input: ContractorPayInput): ContractorPayResult | null {
  const { hours, rate, salesTaxPercent, expenses, reservePercent } = input
  if ([hours, rate, expenses].some((v) => !Number.isFinite(v) || v < 0)) return null
  if ([salesTaxPercent, reservePercent].some((v) => v !== null && (!Number.isFinite(v) || v < 0)))
    return null

  const labour = hours * rate
  const salesTax = salesTaxPercent === null ? null : (labour * salesTaxPercent) / 100
  const grossInvoice = salesTax === null ? null : labour + salesTax
  const profit = labour - expenses
  // Reserve base is profit — deliberately NOT grossInvoice and NOT labour.
  const reserve = reservePercent === null ? null : (Math.max(profit, 0) * reservePercent) / 100
  const available = reserve === null ? null : profit - reserve

  return { labour, salesTax, grossInvoice, expenses, profit, reserve, available }
}
