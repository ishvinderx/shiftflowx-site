import { describe, expect, it } from 'vitest'
import { calculateGrossPay } from './grossPayCalc'

describe('calculateGrossPay', () => {
  it('golden case: $25/h × 40 h/wk → $1,000/wk, $2,000 biweekly, $52,000/yr', () => {
    const r = calculateGrossPay({ amount: 25, frequency: 'hourly', hoursPerWeek: 40, daysPerWeek: 5 })
    expect(r).not.toBeNull()
    expect(r!.hourly).toBe(25)
    expect(r!.daily).toBe(200)
    expect(r!.weekly).toBe(1000)
    expect(r!.biweekly).toBe(2000)
    expect(r!.monthly).toBeCloseTo(4333.3333, 3)
    expect(r!.annual).toBe(52000)
  })

  it('golden case: $60,000 annual @ 40 h/wk → weekly ≈ $1,153.846, hourly ≈ $28.846', () => {
    const r = calculateGrossPay({ amount: 60000, frequency: 'annual', hoursPerWeek: 40, daysPerWeek: 5 })
    expect(r).not.toBeNull()
    expect(r!.weekly).toBeCloseTo(1153.846, 3)
    expect(r!.hourly).toBeCloseTo(28.846, 3)
    expect(r!.biweekly).toBeCloseTo(2307.692, 3)
    expect(r!.monthly).toBe(5000)
    expect(r!.annual).toBe(60000)
  })

  it('golden case: $200/day × 5 d/wk → $1,000/wk', () => {
    const r = calculateGrossPay({ amount: 200, frequency: 'daily', hoursPerWeek: 40, daysPerWeek: 5 })
    expect(r).not.toBeNull()
    expect(r!.weekly).toBe(1000)
    expect(r!.annual).toBe(52000)
  })

  it('biweekly and monthly inputs pivot through weekly correctly', () => {
    const bw = calculateGrossPay({ amount: 2000, frequency: 'biweekly', hoursPerWeek: 40, daysPerWeek: 5 })
    expect(bw!.weekly).toBe(1000)
    expect(bw!.annual).toBe(52000)
    const mo = calculateGrossPay({ amount: 4333.333333333333, frequency: 'monthly', hoursPerWeek: 40, daysPerWeek: 5 })
    expect(mo!.annual).toBeCloseTo(52000, 6)
    expect(mo!.weekly).toBeCloseTo(1000, 6)
  })

  it('invalid inputs return null — negative, NaN, Infinity', () => {
    const valid = { amount: 25, frequency: 'hourly' as const, hoursPerWeek: 40, daysPerWeek: 5 }
    expect(calculateGrossPay({ ...valid, amount: -1 })).toBeNull()
    expect(calculateGrossPay({ ...valid, amount: NaN })).toBeNull()
    expect(calculateGrossPay({ ...valid, hoursPerWeek: Infinity })).toBeNull()
    expect(calculateGrossPay({ ...valid, daysPerWeek: -5 })).toBeNull()
  })

  it('zero amount returns null — a $0 wage conversion is meaningless (documented contract)', () => {
    expect(calculateGrossPay({ amount: 0, frequency: 'hourly', hoursPerWeek: 40, daysPerWeek: 5 })).toBeNull()
  })

  it('zero hours/days per week return null — they divide the weekly figure', () => {
    expect(calculateGrossPay({ amount: 60000, frequency: 'annual', hoursPerWeek: 0, daysPerWeek: 5 })).toBeNull()
    expect(calculateGrossPay({ amount: 60000, frequency: 'annual', hoursPerWeek: 40, daysPerWeek: 0 })).toBeNull()
  })
})
