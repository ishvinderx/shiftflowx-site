import { describe, expect, it } from 'vitest'
import { calculateHourlyPay } from './payCalc'

describe('calculateHourlyPay', () => {
  it('golden case: 40h × $25 + 5 OT h × 1.5 = $1,187.50', () => {
    expect(
      calculateHourlyPay({ hours: 40, hourlyRate: 25, overtimeHours: 5, overtimeMultiplier: 1.5 }),
    ).toEqual({ regularPay: 1000, overtimePay: 187.5, grossPay: 1187.5 })
  })

  it('zero overtime', () => {
    expect(
      calculateHourlyPay({ hours: 37.5, hourlyRate: 20, overtimeHours: 0, overtimeMultiplier: 1.5 }),
    ).toEqual({ regularPay: 750, overtimePay: 0, grossPay: 750 })
  })

  it('zero hours is valid and pays $0 (not null)', () => {
    expect(
      calculateHourlyPay({ hours: 0, hourlyRate: 25, overtimeHours: 0, overtimeMultiplier: 1.5 }),
    ).toEqual({ regularPay: 0, overtimePay: 0, grossPay: 0 })
  })

  it('invalid inputs return null — negative, NaN, Infinity', () => {
    const valid = { hours: 40, hourlyRate: 25, overtimeHours: 0, overtimeMultiplier: 1.5 }
    expect(calculateHourlyPay({ ...valid, hours: -1 })).toBeNull()
    expect(calculateHourlyPay({ ...valid, hourlyRate: NaN })).toBeNull()
    expect(calculateHourlyPay({ ...valid, overtimeHours: Infinity })).toBeNull()
    expect(calculateHourlyPay({ ...valid, overtimeMultiplier: -0.5 })).toBeNull()
  })
})
