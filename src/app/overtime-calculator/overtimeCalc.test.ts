import { describe, expect, it } from 'vitest'
import { calculateOvertime } from './overtimeCalc'

// Rule parameters mirror src/lib/rules/overtime.ts — golden values are
// hand-verified against the official sources cited there.

const ON = { mode: 'weekly', weeklyThreshold: 44, multiplier: 1.5 } as const
const US = { mode: 'weekly', weeklyThreshold: 40, multiplier: 1.5 } as const
const FED = { mode: 'greater-of', dailyThreshold: 8, weeklyThreshold: 40, multiplier: 1.5 } as const
const AB = { mode: 'greater-of', dailyThreshold: 8, weeklyThreshold: 44, multiplier: 1.5 } as const
const BC = {
  mode: 'two-tier',
  dailyThreshold: 8,
  doubleTimeThreshold: 12,
  weeklyThreshold: 40,
  multiplier: 1.5,
  doubleTimeMultiplier: 2,
} as const

describe('calculateOvertime — golden cases', () => {
  it('CA-ON: 50 h/week → 44 regular + 6 OT @1.5; at $20: $880 + $180 = $1,060', () => {
    const r = calculateOvertime({ ...ON, weeklyHours: 50, rate: 20 })!
    expect(r.regularHours).toBe(44)
    expect(r.otBreakdown).toEqual([{ hours: 6, multiplier: 1.5 }])
    expect(r.regularPay).toBe(880)
    expect(r.otPay).toBe(180)
    expect(r.grossPay).toBe(1060)
  })

  it('US-FED: 45 h → 40 regular + 5 OT @1.5', () => {
    const r = calculateOvertime({ ...US, weeklyHours: 45, rate: null })!
    expect(r.regularHours).toBe(40)
    expect(r.otBreakdown).toEqual([{ hours: 5, multiplier: 1.5 }])
  })

  it('CA-FED: days [9,9,9,9,4] → daily OT 4, weekly OT 0 → 4 OT @1.5, 36 regular', () => {
    const r = calculateOvertime({ ...FED, days: [9, 9, 9, 9, 4], rate: null })!
    expect(r.regularHours).toBe(36)
    expect(r.otBreakdown).toEqual([{ hours: 4, multiplier: 1.5 }])
  })

  it('CA-AB: 5 × 10 h → daily OT 10 vs weekly OT 6 → greater = 10 OT, 40 regular', () => {
    const r = calculateOvertime({ ...AB, days: [10, 10, 10, 10, 10], rate: null })!
    expect(r.regularHours).toBe(40)
    expect(r.otBreakdown).toEqual([{ hours: 10, multiplier: 1.5 }])
  })

  it('CA-BC: 5 × 10 h → daily OT 10 @1.5; capped weekly total 40 → no weekly OT; 40 regular', () => {
    const r = calculateOvertime({ ...BC, days: [10, 10, 10, 10, 10], rate: null })!
    expect(r.regularHours).toBe(40)
    expect(r.otBreakdown).toEqual([{ hours: 10, multiplier: 1.5 }])
  })

  it('CA-BC: 6 × 8 h → no daily OT; capped weekly 48 → 8 OT @1.5; 40 regular', () => {
    const r = calculateOvertime({ ...BC, days: [8, 8, 8, 8, 8, 8], rate: null })!
    expect(r.regularHours).toBe(40)
    expect(r.otBreakdown).toEqual([{ hours: 8, multiplier: 1.5 }])
  })

  it('CA-BC: single 13 h day → 4 @1.5 (8→12) + 1 @2 (past 12), 8 regular', () => {
    const r = calculateOvertime({ ...BC, days: [13], rate: null })!
    expect(r.regularHours).toBe(8)
    expect(r.otBreakdown).toEqual([
      { hours: 4, multiplier: 1.5 },
      { hours: 1, multiplier: 2 },
    ])
    expect(r.otHours).toBe(5)
  })

  it('Manual mode: threshold 40, multiplier 2, 45 h → 5 OT @2×', () => {
    const r = calculateOvertime({
      mode: 'weekly',
      weeklyHours: 45,
      weeklyThreshold: 40,
      multiplier: 2,
      rate: null,
    })!
    expect(r.regularHours).toBe(40)
    expect(r.otBreakdown).toEqual([{ hours: 5, multiplier: 2 }])
  })
})

describe('calculateOvertime — validation and zero-as-data', () => {
  it('no rate → all pay fields null, never $0', () => {
    const r = calculateOvertime({ ...ON, weeklyHours: 50, rate: null })!
    expect(r.regularPay).toBeNull()
    expect(r.otPay).toBeNull()
    expect(r.grossPay).toBeNull()
  })

  it('zero hours is valid: 0 regular, no OT bands', () => {
    const weekly = calculateOvertime({ ...ON, weeklyHours: 0, rate: 20 })!
    expect(weekly).toMatchObject({ regularHours: 0, otHours: 0, otBreakdown: [], grossPay: 0 })
    const daily = calculateOvertime({ ...BC, days: [0, 0, 0, 0, 0, 0, 0], rate: null })!
    expect(daily).toMatchObject({ regularHours: 0, otHours: 0, otBreakdown: [] })
  })

  it('hours under threshold → no OT band at all', () => {
    const r = calculateOvertime({ ...US, weeklyHours: 38, rate: 20 })!
    expect(r.otBreakdown).toEqual([])
    expect(r.grossPay).toBe(760)
  })

  it('invalid hours → null: negative, NaN, Infinity, day > 24, week > 168', () => {
    expect(calculateOvertime({ ...ON, weeklyHours: -1, rate: null })).toBeNull()
    expect(calculateOvertime({ ...ON, weeklyHours: NaN, rate: null })).toBeNull()
    expect(calculateOvertime({ ...ON, weeklyHours: 169, rate: null })).toBeNull()
    expect(calculateOvertime({ ...FED, days: [25, 0, 0, 0, 0], rate: null })).toBeNull()
    expect(calculateOvertime({ ...BC, days: [Infinity], rate: null })).toBeNull()
    expect(calculateOvertime({ ...BC, days: [-2, 8], rate: null })).toBeNull()
  })

  it('invalid rate, multiplier, or thresholds → null', () => {
    expect(calculateOvertime({ ...ON, weeklyHours: 40, rate: -20 })).toBeNull()
    expect(calculateOvertime({ ...ON, weeklyHours: 40, rate: NaN })).toBeNull()
    expect(
      calculateOvertime({ mode: 'weekly', weeklyHours: 45, weeklyThreshold: 40, multiplier: 0, rate: null }),
    ).toBeNull()
    expect(
      calculateOvertime({ mode: 'weekly', weeklyHours: 45, weeklyThreshold: -1, multiplier: 1.5, rate: null }),
    ).toBeNull()
  })

  it('empty or over-long days array → null', () => {
    expect(calculateOvertime({ ...FED, days: [], rate: null })).toBeNull()
    expect(calculateOvertime({ ...FED, days: [8, 8, 8, 8, 8, 8, 8, 8], rate: null })).toBeNull()
  })

  it('pay follows the bands: BC 13 h day at $20 → 160 + (120 + 40) = $320', () => {
    const r = calculateOvertime({ ...BC, days: [13], rate: 20 })!
    expect(r.regularPay).toBe(160)
    expect(r.otPay).toBe(160)
    expect(r.grossPay).toBe(320)
  })
})
