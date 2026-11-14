import { describe, expect, it } from 'vitest'
import { calculateTakeHome } from './takeHomeCalc'

describe('calculateTakeHome', () => {
  it('golden case: $4,000 gross, 20% tax + $200 CPP + $80 EI → $1,080 deductions, $2,920 net', () => {
    expect(
      calculateTakeHome(4000, [
        { label: 'Income tax', kind: 'percent', value: 20 },
        { label: 'CPP', kind: 'amount', value: 200 },
        { label: 'EI', kind: 'amount', value: 80 },
      ]),
    ).toEqual({
      gross: 4000,
      rows: [
        { label: 'Income tax', amount: 800 },
        { label: 'CPP', amount: 200 },
        { label: 'EI', amount: 80 },
      ],
      totalDeductions: 1080,
      net: 2920,
    })
  })

  it('rows without a value (NaN) are filtered out, not treated as 0', () => {
    expect(
      calculateTakeHome(4000, [
        { label: 'Income tax', kind: 'percent', value: NaN },
        { label: 'CPP', kind: 'amount', value: 200 },
      ]),
    ).toEqual({ gross: 4000, rows: [{ label: 'CPP', amount: 200 }], totalDeductions: 200, net: 3800 })
  })

  it('no entered rows → empty rows, zero deductions (UI must NOT present net=gross as an answer)', () => {
    expect(calculateTakeHome(4000, [])).toEqual({
      gross: 4000,
      rows: [],
      totalDeductions: 0,
      net: 4000,
    })
  })

  it('100% deduction → net 0', () => {
    expect(
      calculateTakeHome(4000, [{ label: 'Income tax', kind: 'percent', value: 100 }])?.net,
    ).toBe(0)
  })

  it('deductions exceeding gross → honest negative net (UI flags it)', () => {
    const result = calculateTakeHome(1000, [{ label: 'Income tax', kind: 'amount', value: 1200 }])
    expect(result?.totalDeductions).toBe(1200)
    expect(result?.net).toBe(-200)
  })

  it('invalid gross returns null — negative, NaN, Infinity', () => {
    expect(calculateTakeHome(-1, [])).toBeNull()
    expect(calculateTakeHome(NaN, [])).toBeNull()
    expect(calculateTakeHome(Infinity, [])).toBeNull()
  })
})
