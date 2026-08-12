import { describe, expect, it } from 'vitest'
import { getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateInvoice } from './invoiceCalc'

describe('calculateInvoice', () => {
  it('golden case: 100 h × $26 @ Ontario 13% HST = $2,600 + $338 = $2,938', () => {
    const on = getSalesTaxRule('ON')!
    expect(calculateInvoice({ hours: 100, rate: 26, taxPercent: on.ratePercent })).toEqual({
      labour: 2600,
      tax: 338,
      total: 2938,
    })
  })

  it('Nova Scotia 14% HST: $1,000 labour → $140 tax → $1,140 total', () => {
    const ns = getSalesTaxRule('NS')!
    expect(calculateInvoice({ hours: 40, rate: 25, taxPercent: ns.ratePercent })).toEqual({
      labour: 1000,
      tax: 140,
      total: 1140,
    })
  })

  it('fractional hours: 37.5 h × $30 @ 13% = $1,125 + $146.25 = $1,271.25', () => {
    expect(calculateInvoice({ hours: 37.5, rate: 30, taxPercent: 13 })).toEqual({
      labour: 1125,
      tax: 146.25,
      total: 1271.25,
    })
  })

  it('zero hours fails validation (amount must be > 0) — never a $0 invoice', () => {
    expect(calculateInvoice({ hours: 0, rate: 26, taxPercent: 13 })).toBeNull()
    expect(calculateInvoice({ hours: 10, rate: 0, taxPercent: 13 })).toBeNull()
  })

  it('invalid inputs return null — negative, NaN, Infinity', () => {
    const valid = { hours: 100, rate: 26, taxPercent: 13 }
    expect(calculateInvoice({ ...valid, hours: -1 })).toBeNull()
    expect(calculateInvoice({ ...valid, rate: NaN })).toBeNull()
    expect(calculateInvoice({ ...valid, taxPercent: Infinity })).toBeNull()
    expect(calculateInvoice({ ...valid, taxPercent: -13 })).toBeNull()
  })
})
