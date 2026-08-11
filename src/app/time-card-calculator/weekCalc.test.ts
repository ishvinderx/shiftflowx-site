import { describe, expect, it } from 'vitest'
import { calculateWeek, dayWorkedMinutes, type DayRow } from './weekCalc'

// Regression pins for the live /time-card-calculator — behavior must not change.

const day = (start: string, end: string, breakMinutes = 0, enabled = true): DayRow => ({
  enabled,
  start,
  end,
  breakMinutes,
})

describe('dayWorkedMinutes', () => {
  it('subtracts the unpaid break', () => {
    expect(dayWorkedMinutes(day('09:00', '17:00', 30))).toBe(450)
  })

  it('disabled or empty rows are 0', () => {
    expect(dayWorkedMinutes(day('09:00', '17:00', 0, false))).toBe(0)
    expect(dayWorkedMinutes(day('', '17:00'))).toBe(0)
  })
})

describe('calculateWeek', () => {
  it('splits at the weekly overtime threshold and computes gross pay', () => {
    const rows = Array.from({ length: 5 }, () => day('09:00', '18:00')) // 5 × 9h = 45h
    const r = calculateWeek(rows, 40, 1.5, 20)
    expect(r.totalMinutes).toBe(45 * 60)
    expect(r.regularMinutes).toBe(40 * 60)
    expect(r.overtimeMinutes).toBe(5 * 60)
    expect(r.decimalHours).toBe(45)
    expect(r.grossPay).toBe(950) // 40×$20 + 5×$20×1.5
  })

  it('excludes disabled days', () => {
    const rows = [day('09:00', '17:00'), day('09:00', '17:00', 0, false)]
    const r = calculateWeek(rows, 40, 1.5, null)
    expect(r.perDayMinutes).toEqual([480, 0])
    expect(r.totalMinutes).toBe(480)
  })

  it('subtracts breaks per day', () => {
    const rows = [day('09:00', '17:00', 60)]
    expect(calculateWeek(rows, 40, 1.5, null).totalMinutes).toBe(420)
  })

  it('no rate → grossPay null', () => {
    expect(calculateWeek([day('09:00', '17:00')], 40, 1.5, null).grossPay).toBeNull()
  })
})
