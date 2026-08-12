import { describe, expect, it } from 'vitest'
import { getSalesTaxRule } from '@/lib/rules/salesTax'
// The take-home page deliberately reuses the contractor-pay engine — these
// tests pin the waterfall semantics this page presents (no wrapper module:
// the UI needs no derivations beyond what the engine already returns).
import { calculateContractorPay } from '../contractor-pay-calculator/contractorCalc'

describe('contractor take-home waterfall (shared engine)', () => {
  it('golden case: 100h × $26, ON 13% HST, $400 expenses, 25% reserve → $1,650 available', () => {
    const on = getSalesTaxRule('ON')!
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: on.ratePercent,
      expenses: 400,
      reservePercent: 25,
    })!
    expect(r.labour).toBe(2600)
    expect(r.expenses).toBe(400)
    expect(r.profit).toBe(2200)
    expect(r.reserve).toBe(550)
    expect(r.available).toBe(1650)
    // HST is a side line, never a waterfall step: shown separately…
    expect(r.salesTax).toBe(338)
    expect(r.grossInvoice).toBe(2938)
    // …and the waterfall is labour − expenses − reserve, tax NOT subtracted.
    expect(r.available).toBe(r.labour - r.expenses - r.reserve!)
  })

  it('profit ≤ 0: nothing to reserve, available = profit', () => {
    const r = calculateContractorPay({
      hours: 10,
      rate: 20,
      salesTaxPercent: null,
      expenses: 400,
      reservePercent: 25,
    })!
    expect(r.profit).toBe(-200)
    expect(r.reserve).toBe(0)
    expect(r.available).toBe(-200)
  })

  it('reserve absent: waterfall stops at profit (absence ≠ 0%)', () => {
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: null,
      expenses: 400,
      reservePercent: null,
    })!
    expect(r.profit).toBe(2200)
    expect(r.reserve).toBeNull()
    expect(r.available).toBeNull()
  })

  it('unknown registration fails closed: no tax line, and invalid input returns null', () => {
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: null, // unsure/unregistered → UI passes null
      expenses: 0,
      reservePercent: null,
    })!
    expect(r.salesTax).toBeNull()
    expect(r.grossInvoice).toBeNull()

    expect(
      calculateContractorPay({ hours: -1, rate: 26, salesTaxPercent: null, expenses: 0, reservePercent: null }),
    ).toBeNull()
    expect(
      calculateContractorPay({ hours: 100, rate: NaN, salesTaxPercent: null, expenses: 0, reservePercent: null }),
    ).toBeNull()
  })
})
