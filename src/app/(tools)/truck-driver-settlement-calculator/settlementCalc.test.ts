import { describe, expect, it } from 'vitest'
import { calculateSettlement } from './settlementCalc'

const base = { hours: 100, rate: 26, carrierDeductions: null }

describe('calculateSettlement', () => {
  it('golden case: registered, 100 h × $26 at 13% → $2,600 + $338 = $2,938', () => {
    expect(calculateSettlement({ ...base, gstHstStatus: 'registered', taxPercent: 13 })).toEqual({
      earnings: 2600,
      tax: 338,
      expectedPayment: 2938,
      netAfterDeductions: null,
    })
  })

  it('not registered: no tax line, expected payment = earnings', () => {
    expect(calculateSettlement({ ...base, gstHstStatus: 'not-registered', taxPercent: null })).toEqual({
      earnings: 2600,
      tax: null,
      expectedPayment: 2600,
      netAfterDeductions: null,
    })
  })

  it('not sure: earnings only, expected payment incomplete (null)', () => {
    expect(calculateSettlement({ ...base, gstHstStatus: 'unknown', taxPercent: null })).toEqual({
      earnings: 2600,
      tax: null,
      expectedPayment: null,
      netAfterDeductions: null,
    })
  })

  it('deductions: $150 off a complete expected payment → net $2,788', () => {
    expect(
      calculateSettlement({
        ...base,
        gstHstStatus: 'registered',
        taxPercent: 13,
        carrierDeductions: 150,
      }),
    ).toEqual({ earnings: 2600, tax: 338, expectedPayment: 2938, netAfterDeductions: 2788 })
  })

  it('deductions with unknown registration → net stays null, never a fake number', () => {
    expect(
      calculateSettlement({ ...base, gstHstStatus: 'unknown', taxPercent: null, carrierDeductions: 150 }),
    ).toEqual({ earnings: 2600, tax: null, expectedPayment: null, netAfterDeductions: null })
  })

  it('zero hours is valid and earns $0 (not null)', () => {
    expect(calculateSettlement({ ...base, hours: 0, gstHstStatus: 'registered', taxPercent: 13 })).toEqual({
      earnings: 0,
      tax: 0,
      expectedPayment: 0,
      netAfterDeductions: null,
    })
  })

  it('invalid inputs return null — negative, NaN, Infinity, registered without a rate', () => {
    const valid = { ...base, gstHstStatus: 'registered' as const, taxPercent: 13 }
    expect(calculateSettlement({ ...valid, hours: -1 })).toBeNull()
    expect(calculateSettlement({ ...valid, rate: NaN })).toBeNull()
    expect(calculateSettlement({ ...valid, hours: Infinity })).toBeNull()
    expect(calculateSettlement({ ...valid, carrierDeductions: -50 })).toBeNull()
    expect(calculateSettlement({ ...valid, taxPercent: null })).toBeNull()
    expect(calculateSettlement({ ...valid, taxPercent: NaN })).toBeNull()
  })
})
