import { describe, expect, it } from 'vitest'
import { calculate, fmtHM, minutesBetween, type CalcInput } from './calc'

// Regression pins for the live /work-hours-calculator — behavior must not change.

const base: CalcInput = {
  start: '09:00',
  end: '17:00',
  breaks: [],
  hourlyRate: null,
  overtimeThresholdHours: 8,
  overtimeMultiplier: 1.5,
}

describe('minutesBetween', () => {
  it('same-day span', () => {
    expect(minutesBetween('09:00', '17:30')).toBe(510)
  })

  it('overnight shift wraps +1440', () => {
    expect(minutesBetween('22:00', '06:00')).toBe(480)
  })

  it('end === start counts as a full 24h wrap', () => {
    expect(minutesBetween('09:00', '09:00')).toBe(1440)
  })
})

describe('calculate', () => {
  it('normal day, no breaks, no rate', () => {
    const r = calculate(base)
    expect(r.totalShiftMinutes).toBe(480)
    expect(r.workedMinutes).toBe(480)
    expect(r.regularMinutes).toBe(480)
    expect(r.overtimeMinutes).toBe(0)
    expect(r.decimalHours).toBe(8)
    expect(r.grossPay).toBeNull()
  })

  it('overnight shift 22:00–06:00', () => {
    const r = calculate({ ...base, start: '22:00', end: '06:00' })
    expect(r.totalShiftMinutes).toBe(480)
    expect(r.workedMinutes).toBe(480)
  })

  it('unpaid breaks are subtracted, paid breaks are not', () => {
    const r = calculate({
      ...base,
      breaks: [
        { minutes: 30, paid: false },
        { minutes: 15, paid: true },
      ],
    })
    expect(r.unpaidBreakMinutes).toBe(30)
    expect(r.paidBreakMinutes).toBe(15)
    expect(r.workedMinutes).toBe(450) // paid break stays in worked time
    expect(r.decimalHours).toBe(7.5)
  })

  it('overtime splits at the daily threshold and pays the multiplier', () => {
    const r = calculate({ ...base, start: '08:00', end: '18:00', hourlyRate: 10 })
    expect(r.workedMinutes).toBe(600)
    expect(r.regularMinutes).toBe(480)
    expect(r.overtimeMinutes).toBe(120)
    expect(r.grossPay).toBe(110) // 8h×$10 + 2h×$10×1.5
  })

  it('hourlyRate null → grossPay null (never a fabricated $0)', () => {
    expect(calculate({ ...base, hourlyRate: null }).grossPay).toBeNull()
  })

  it('decimalHours rounds to 2dp', () => {
    const r = calculate({ ...base, end: '17:20' }) // 500 min = 8.333…
    expect(r.decimalHours).toBe(8.33)
  })
})

describe('fmtHM', () => {
  it('pads minutes', () => {
    expect(fmtHM(485)).toBe('8h 05m')
    expect(fmtHM(60)).toBe('1h 00m')
  })
})
