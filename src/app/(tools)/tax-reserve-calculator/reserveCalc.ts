// Pure tax-reserve engine, no React.
//
// Contract: calculateReserve returns null for invalid input (revenue or
// expenses negative, NaN, or Infinity; reservePercent outside 0–100). Callers
// must show a validation message and no result — never coerce invalid input
// to 0 and display a fabricated number.
//
// The reserve is computed on PROFIT (revenue − expenses), never on gross
// revenue. reservePercent null means "not entered yet" — reserve and
// remaining are null, NOT 0 (absence ≠ 0%). Profit ≤ 0 → reserve is 0,
// never negative. Money is computed in floats and rounded ONLY at display time.

export interface ReserveInput {
  revenue: number
  expenses: number
  reservePercent: number | null
}

export interface ReserveResult {
  profit: number
  reserve: number | null
  remaining: number | null
}

export function calculateReserve(input: ReserveInput): ReserveResult | null {
  const { revenue, expenses, reservePercent } = input
  if ([revenue, expenses].some((v) => !Number.isFinite(v) || v < 0)) return null
  if (reservePercent !== null && (!Number.isFinite(reservePercent) || reservePercent < 0 || reservePercent > 100)) {
    return null
  }

  const profit = revenue - expenses
  if (reservePercent === null) return { profit, reserve: null, remaining: null }
  if (profit <= 0) return { profit, reserve: 0, remaining: profit }

  const reserve = profit * (reservePercent / 100)
  return { profit, reserve, remaining: profit - reserve }
}
