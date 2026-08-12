// Pure owner-operator pay engine, no React.
//
// Contract: calculateOwnerOperatorPay returns null for invalid input (any
// numeric field negative, NaN, or Infinity; reservePercent outside 0–100;
// missing fields for the active revenue basis). Callers must show a
// validation message and no result — never coerce invalid input to 0 and
// display a fabricated number.
//
// Accounting rules (non-negotiable):
// - GST/HST is collected ON TOP of revenue and remitted to CRA — it is NOT
//   income and never enters profit. Rates come ONLY from
//   '@/lib/rules/salesTax' — never hardcoded here or in the UI.
// - registration 'unknown' FAILS CLOSED: return null, the UI must say
//   "GST/HST not calculated — registration status required".
// - The tax reserve is computed on PROFIT (revenue − expenses), never on
//   revenue and never on sales tax. Profit ≤ 0 → reserve is 0.
// - Zero-as-data: an expense of 0 is data ("I spent nothing"); null means
//   "not entered" and is ignored — it is NOT zero-filled into a claim of
//   no costs. expensesEntered is false only when NO expense was entered,
//   and then profit is a BEFORE-EXPENSES number the caller must label.
// - Per-km metrics exist only when kilometres > 0 AND at least one expense
//   was entered; otherwise they are null — never a fabricated 0/km.
//
// Money is computed in floats and rounded ONLY at display time.

export type RevenueBasis = 'hourly' | 'flat'
export type GstRegistration = 'registered' | 'not-registered' | 'unknown'

export interface OwnerOperatorInput {
  basis: RevenueBasis
  /** Hourly basis only — null when basis is 'flat'. */
  hours: number | null
  hourlyRate: number | null
  /** Flat basis only — null when basis is 'hourly'. */
  flatRevenue: number | null
  registration: GstRegistration
  /** Required when registered; sourced ONLY from '@/lib/rules/salesTax'. */
  gstRatePercent: number | null
  /** Expenses: null = not entered (ignored); 0 = entered as zero. */
  fuel: number | null
  maintenance: number | null
  insurance: number | null
  other: number | null
  /** Optional kilometres driven this period. null = not entered. */
  kilometres: number | null
  /** Percent of profit to set aside for income tax, 0–100. */
  reservePercent: number
}

export interface OwnerOperatorBreakdown {
  revenue: number
  /** Remitted to CRA — not income. null when not registered. */
  gstHst: number | null
  /** Sum of entered expenses only. */
  totalExpenses: number
  /** false → nothing entered: profit is BEFORE expenses, label it so. */
  expensesEntered: boolean
  profit: number
  /** reservePercent of profit, floored at 0 when profit ≤ 0. */
  reserve: number
  /** profit − reserve. */
  available: number
  /** null unless kilometres > 0 and at least one expense entered. */
  costPerKm: number | null
  revenuePerKm: number | null
}

function bad(v: number | null): boolean {
  return v !== null && (!Number.isFinite(v) || v < 0)
}

export function calculateOwnerOperatorPay(
  input: OwnerOperatorInput,
): OwnerOperatorBreakdown | null {
  const { basis, hours, hourlyRate, flatRevenue, registration, gstRatePercent } = input
  const { fuel, maintenance, insurance, other, kilometres, reservePercent } = input

  if ([hours, hourlyRate, flatRevenue, gstRatePercent, fuel, maintenance, insurance, other, kilometres].some(bad)) {
    return null
  }
  if (!Number.isFinite(reservePercent) || reservePercent < 0 || reservePercent > 100) return null

  // Fail closed: unknown registration → no result at all.
  if (registration === 'unknown') return null

  let revenue: number
  if (basis === 'hourly') {
    if (hours === null || hourlyRate === null) return null
    revenue = hours * hourlyRate
  } else {
    if (flatRevenue === null) return null
    revenue = flatRevenue
  }

  let gstHst: number | null = null
  if (registration === 'registered') {
    if (gstRatePercent === null) return null // fail closed: no verified rate, no tax line
    gstHst = revenue * (gstRatePercent / 100)
  }

  const entered = [fuel, maintenance, insurance, other].filter((v): v is number => v !== null)
  const expensesEntered = entered.length > 0
  const totalExpenses = entered.reduce((sum, v) => sum + v, 0)

  const profit = revenue - totalExpenses
  const reserve = profit <= 0 ? 0 : profit * (reservePercent / 100)
  const available = profit - reserve

  const perKm = kilometres !== null && kilometres > 0 && expensesEntered
  return {
    revenue,
    gstHst,
    totalExpenses,
    expensesEntered,
    profit,
    reserve,
    available,
    costPerKm: perKm ? totalExpenses / kilometres : null,
    revenuePerKm: perKm ? revenue / kilometres : null,
  }
}
