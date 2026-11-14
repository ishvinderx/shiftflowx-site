import { describe, expect, it } from 'vitest'
import { calculateReserve } from './reserveCalc'

describe('calculateReserve', () => {
  it('golden case: $2,600 revenue − $400 expenses at 25% → $550 reserved, $1,650 kept', () => {
    expect(calculateReserve({ revenue: 2600, expenses: 400, reservePercent: 25 })).toEqual({
      profit: 2200,
      reserve: 550,
      remaining: 1650,
    })
  })

  it('expenses > revenue → negative profit, reserve 0 (never negative), remaining = profit', () => {
    expect(calculateReserve({ revenue: 1000, expenses: 1500, reservePercent: 25 })).toEqual({
      profit: -500,
      reserve: 0,
      remaining: -500,
    })
  })

  it('zero profit → reserve 0, remaining 0', () => {
    expect(calculateReserve({ revenue: 800, expenses: 800, reservePercent: 30 })).toEqual({
      profit: 0,
      reserve: 0,
      remaining: 0,
    })
  })

  it('reservePercent null → profit only, reserve and remaining null (absence ≠ 0%)', () => {
    expect(calculateReserve({ revenue: 2600, expenses: 400, reservePercent: null })).toEqual({
      profit: 2200,
      reserve: null,
      remaining: null,
    })
  })

  it('percent bounds: 0 and 100 are valid, outside 0–100 is invalid', () => {
    expect(calculateReserve({ revenue: 1000, expenses: 0, reservePercent: 0 })).toEqual({
      profit: 1000,
      reserve: 0,
      remaining: 1000,
    })
    expect(calculateReserve({ revenue: 1000, expenses: 0, reservePercent: 100 })).toEqual({
      profit: 1000,
      reserve: 1000,
      remaining: 0,
    })
    expect(calculateReserve({ revenue: 1000, expenses: 0, reservePercent: -1 })).toBeNull()
    expect(calculateReserve({ revenue: 1000, expenses: 0, reservePercent: 101 })).toBeNull()
  })

  it('invalid inputs return null — negative, NaN, Infinity', () => {
    expect(calculateReserve({ revenue: -1, expenses: 0, reservePercent: 25 })).toBeNull()
    expect(calculateReserve({ revenue: 1000, expenses: -50, reservePercent: 25 })).toBeNull()
    expect(calculateReserve({ revenue: NaN, expenses: 0, reservePercent: 25 })).toBeNull()
    expect(calculateReserve({ revenue: Infinity, expenses: 0, reservePercent: 25 })).toBeNull()
    expect(calculateReserve({ revenue: 1000, expenses: 0, reservePercent: NaN })).toBeNull()
  })
})
