// Pure work-hours math — kept free of React so the logic is testable and reusable
// by future calculator pages (overtime, time-card, decimal-hours).
// minutesBetween/fmtHM now live in @/lib/time; re-exported here so existing
// imports (weekCalc.ts and others) keep working unchanged.

import { minutesBetween } from '@/lib/time'

export { minutesBetween, fmtHM } from '@/lib/time'

export interface BreakEntry {
  minutes: number
  paid: boolean
}

export interface CalcInput {
  start: string // "HH:MM" 24h
  end: string   // "HH:MM" 24h — end <= start means the shift crosses midnight
  breaks: BreakEntry[]
  hourlyRate: number | null
  overtimeThresholdHours: number // daily threshold; OT applies past this many WORKED hours
  overtimeMultiplier: number
}

export interface CalcResult {
  totalShiftMinutes: number     // clock-in → clock-out span
  unpaidBreakMinutes: number
  paidBreakMinutes: number
  workedMinutes: number         // span − unpaid breaks (paid breaks count as worked)
  regularMinutes: number
  overtimeMinutes: number
  decimalHours: number          // workedMinutes / 60, 2dp
  grossPay: number | null       // null when no rate given — never fabricate a $0
}

export function calculate(input: CalcInput): CalcResult {
  const totalShiftMinutes = minutesBetween(input.start, input.end)
  const unpaidBreakMinutes = input.breaks.filter((b) => !b.paid).reduce((s, b) => s + Math.max(0, b.minutes), 0)
  const paidBreakMinutes = input.breaks.filter((b) => b.paid).reduce((s, b) => s + Math.max(0, b.minutes), 0)
  const workedMinutes = Math.max(0, totalShiftMinutes - unpaidBreakMinutes)

  const thresholdMinutes = Math.max(0, input.overtimeThresholdHours) * 60
  const overtimeMinutes = Math.max(0, workedMinutes - thresholdMinutes)
  const regularMinutes = workedMinutes - overtimeMinutes

  const decimalHours = Math.round((workedMinutes / 60) * 100) / 100

  let grossPay: number | null = null
  if (input.hourlyRate != null && input.hourlyRate > 0) {
    const regular = (regularMinutes / 60) * input.hourlyRate
    const overtime = (overtimeMinutes / 60) * input.hourlyRate * input.overtimeMultiplier
    grossPay = Math.round((regular + overtime) * 100) / 100
  }

  return { totalShiftMinutes, unpaidBreakMinutes, paidBreakMinutes, workedMinutes, regularMinutes, overtimeMinutes, decimalHours, grossPay }
}
