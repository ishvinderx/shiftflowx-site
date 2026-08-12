import { describe, expect, it } from 'vitest'
import { getSalesTaxRule } from '@/lib/rules/salesTax'
import { addTax, removeTax } from './gstCalc'

// Rates in these tests come from the verified rules module, never hardcoded
// into the engine. The literal expectations are the golden numbers.
const rate = (code: string) => {
  const rule = getSalesTaxRule(code)
  if (!rule) throw new Error(`no rule for ${code}`)
  return rule.ratePercent
}

describe('addTax', () => {
  it('golden case ON: $2,600 @ 13% → tax $338, total $2,938', () => {
    const r = addTax(2600, rate('ON'))!
    expect(r.preTax).toBe(2600)
    expect(r.tax).toBeCloseTo(338, 10)
    expect(r.total).toBeCloseTo(2938, 10)
  })

  it('golden case NS: $100 @ 14% → total $114', () => {
    const r = addTax(100, rate('NS'))!
    expect(r.tax).toBeCloseTo(14, 10)
    expect(r.total).toBeCloseTo(114, 10)
  })

  it('golden case AB: $100 @ 5% → total $105', () => {
    const r = addTax(100, rate('AB'))!
    expect(r.tax).toBeCloseTo(5, 10)
    expect(r.total).toBeCloseTo(105, 10)
  })

  it('zero amount is valid and yields $0 (not null)', () => {
    expect(addTax(0, rate('ON'))).toEqual({ preTax: 0, tax: 0, total: 0 })
  })
})

describe('removeTax', () => {
  it('golden case ON: $2,938 → pre-tax $2,600, tax $338', () => {
    const r = removeTax(2938, rate('ON'))!
    expect(r.total).toBe(2938)
    expect(r.preTax).toBeCloseTo(2600, 10)
    expect(r.tax).toBeCloseTo(338, 10)
  })

  it('is the exact inverse of addTax across amounts and rates', () => {
    for (const code of ['ON', 'NS', 'AB', 'PE']) {
      for (const amount of [1, 99.99, 2600, 12345.67]) {
        const added = addTax(amount, rate(code))!
        const removed = removeTax(added.total, rate(code))!
        expect(removed.preTax).toBeCloseTo(amount, 8)
        expect(removed.tax).toBeCloseTo(added.tax, 8)
      }
    }
  })
})

describe('invalid inputs return null — negative, NaN, Infinity', () => {
  it.each([
    [-1, 13],
    [NaN, 13],
    [Infinity, 13],
    [100, -5],
    [100, NaN],
    [100, Infinity],
  ])('amount %p, rate %p', (amount, ratePercent) => {
    expect(addTax(amount, ratePercent)).toBeNull()
    expect(removeTax(amount, ratePercent)).toBeNull()
  })
})
