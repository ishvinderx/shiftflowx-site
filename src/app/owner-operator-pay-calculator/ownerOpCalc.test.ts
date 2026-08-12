import { describe, expect, it } from 'vitest'
import { calculateOwnerOperatorPay, type OwnerOperatorInput } from './ownerOpCalc'

// Golden case: 100 h × $26, Ontario 13% HST registered, fuel $600 +
// maintenance $200, 25% reserve.
const golden: OwnerOperatorInput = {
  basis: 'hourly',
  hours: 100,
  hourlyRate: 26,
  flatRevenue: null,
  registration: 'registered',
  gstRatePercent: 13,
  fuel: 600,
  maintenance: 200,
  insurance: null,
  other: null,
  kilometres: null,
  reservePercent: 25,
}

describe('calculateOwnerOperatorPay', () => {
  it('golden case: $2,600 revenue, $338 HST, $800 expenses, $1,800 profit, $450 reserve, $1,350 available', () => {
    const r = calculateOwnerOperatorPay(golden)!
    expect(r).not.toBeNull()
    expect(r.revenue).toBe(2600)
    expect(r.gstHst).toBeCloseTo(338, 9)
    expect(r.totalExpenses).toBe(800)
    expect(r.expensesEntered).toBe(true)
    expect(r.profit).toBe(1800)
    expect(r.reserve).toBe(450)
    expect(r.available).toBe(1350)
    // No kilometres entered → per-km lines do not exist (never 0/km).
    expect(r.costPerKm).toBeNull()
    expect(r.revenuePerKm).toBeNull()
  })

  it('golden case + 1,000 km: cost $0.80/km, revenue $2.60/km', () => {
    const r = calculateOwnerOperatorPay({ ...golden, kilometres: 1000 })!
    expect(r.costPerKm).toBe(0.8)
    expect(r.revenuePerKm).toBe(2.6)
  })

  it('flat-amount mode: period revenue used directly', () => {
    const r = calculateOwnerOperatorPay({
      ...golden,
      basis: 'flat',
      hours: null,
      hourlyRate: null,
      flatRevenue: 2600,
    })!
    expect(r.revenue).toBe(2600)
    expect(r.profit).toBe(1800)
    expect(r.available).toBe(1350)
  })

  it('no expenses entered → expensesEntered false, profit is before expenses', () => {
    const r = calculateOwnerOperatorPay({ ...golden, fuel: null, maintenance: null })!
    expect(r.expensesEntered).toBe(false)
    expect(r.totalExpenses).toBe(0)
    expect(r.profit).toBe(2600)
  })

  it('km entered but no expense entered → per-km metrics stay null', () => {
    const r = calculateOwnerOperatorPay({ ...golden, fuel: null, maintenance: null, kilometres: 1000 })!
    expect(r.costPerKm).toBeNull()
    expect(r.revenuePerKm).toBeNull()
  })

  it('zero is data: a $0 expense counts as entered, not as absence', () => {
    const r = calculateOwnerOperatorPay({ ...golden, fuel: 0, maintenance: null })!
    expect(r.expensesEntered).toBe(true)
    expect(r.totalExpenses).toBe(0)
    expect(r.profit).toBe(2600)
  })

  it('not registered → gstHst is null, rest of the breakdown unchanged', () => {
    const r = calculateOwnerOperatorPay({ ...golden, registration: 'not-registered', gstRatePercent: null })!
    expect(r.gstHst).toBeNull()
    expect(r.profit).toBe(1800)
  })

  it('fails closed: unknown registration → null', () => {
    expect(calculateOwnerOperatorPay({ ...golden, registration: 'unknown' })).toBeNull()
  })

  it('fails closed: registered without a verified rate → null', () => {
    expect(calculateOwnerOperatorPay({ ...golden, gstRatePercent: null })).toBeNull()
  })

  it('profit ≤ 0 → reserve is 0, never negative', () => {
    const r = calculateOwnerOperatorPay({ ...golden, fuel: 3000, maintenance: 200 })!
    expect(r.profit).toBe(-600)
    expect(r.reserve).toBe(0)
    expect(r.available).toBe(-600)
  })

  it('invalid inputs return null — negative, NaN, Infinity, reserve out of range', () => {
    expect(calculateOwnerOperatorPay({ ...golden, hours: -1 })).toBeNull()
    expect(calculateOwnerOperatorPay({ ...golden, hourlyRate: NaN })).toBeNull()
    expect(calculateOwnerOperatorPay({ ...golden, fuel: -50 })).toBeNull()
    expect(calculateOwnerOperatorPay({ ...golden, kilometres: Infinity })).toBeNull()
    expect(calculateOwnerOperatorPay({ ...golden, reservePercent: 101 })).toBeNull()
    expect(calculateOwnerOperatorPay({ ...golden, reservePercent: -1 })).toBeNull()
    expect(
      calculateOwnerOperatorPay({ ...golden, basis: 'flat', hours: null, hourlyRate: null, flatRevenue: null }),
    ).toBeNull()
  })
})
