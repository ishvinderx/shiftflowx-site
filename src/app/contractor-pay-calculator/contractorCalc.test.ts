import { describe, expect, it } from 'vitest'
import { calculateContractorPay } from './contractorCalc'

describe('calculateContractorPay', () => {
  it('golden case: 100h × $26, ON 13% HST, $400 expenses, 25% reserve', () => {
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: 13,
      expenses: 400,
      reservePercent: 25,
    })
    expect(r).toEqual({
      labour: 2600,
      salesTax: 338,
      grossInvoice: 2938,
      expenses: 400,
      profit: 2200,
      reserve: 550,
      available: 1650,
    })
    // Pin the reserve base: profit ($2,200), NOT the tax-inclusive invoice
    // ($2,938) and NOT invoice-minus-expenses ($2,538).
    expect(r!.reserve).not.toBe(0.25 * 2938)
    expect(r!.reserve).not.toBe(0.25 * 2538)
    expect(r!.reserve).toBe(0.25 * 2200)
  })

  it('negative profit: reserve floors at 0, available equals profit', () => {
    const r = calculateContractorPay({
      hours: 10,
      rate: 20,
      salesTaxPercent: 13,
      expenses: 500,
      reservePercent: 25,
    })
    expect(r).toEqual({
      labour: 200,
      salesTax: 26,
      grossInvoice: 226,
      expenses: 500,
      profit: -300,
      reserve: 0,
      available: -300,
    })
  })

  it('no sales tax (unregistered/unknown): salesTax and grossInvoice are null', () => {
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: null,
      expenses: 400,
      reservePercent: 25,
    })
    expect(r).toEqual({
      labour: 2600,
      salesTax: null,
      grossInvoice: null,
      expenses: 400,
      profit: 2200,
      reserve: 550,
      available: 1650,
    })
  })

  it('no reserve percent: reserve and available are null, never 0', () => {
    const r = calculateContractorPay({
      hours: 100,
      rate: 26,
      salesTaxPercent: 13,
      expenses: 400,
      reservePercent: null,
    })
    expect(r).toEqual({
      labour: 2600,
      salesTax: 338,
      grossInvoice: 2938,
      expenses: 400,
      profit: 2200,
      reserve: null,
      available: null,
    })
  })

  it('zero hours is valid data, not an error', () => {
    const r = calculateContractorPay({
      hours: 0,
      rate: 26,
      salesTaxPercent: 13,
      expenses: 0,
      reservePercent: null,
    })
    expect(r).toEqual({
      labour: 0,
      salesTax: 0,
      grossInvoice: 0,
      expenses: 0,
      profit: 0,
      reserve: null,
      available: null,
    })
  })

  it('invalid inputs return null — negative, NaN, Infinity', () => {
    const valid = { hours: 100, rate: 26, salesTaxPercent: 13, expenses: 400, reservePercent: 25 }
    expect(calculateContractorPay({ ...valid, hours: -1 })).toBeNull()
    expect(calculateContractorPay({ ...valid, rate: NaN })).toBeNull()
    expect(calculateContractorPay({ ...valid, expenses: Infinity })).toBeNull()
    expect(calculateContractorPay({ ...valid, salesTaxPercent: -13 })).toBeNull()
    expect(calculateContractorPay({ ...valid, reservePercent: -25 })).toBeNull()
  })
})
