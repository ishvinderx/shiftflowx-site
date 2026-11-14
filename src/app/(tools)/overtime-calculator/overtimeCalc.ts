// Pure statutory-overtime engine, no React. Rule parameters are passed in
// (from '@/lib/rules/overtime' or the user's manual numbers) so this stays a
// pure function of its input.
//
// Contract: calculateOvertime returns null for invalid input — any hours value
// negative/NaN/Infinity, a day over 24 h, weekly hours over 168, a negative
// threshold, or a multiplier ≤ 0. Callers show a validation message and no
// result; never coerce invalid input to 0 and display a fabricated number.
//
// Zero-as-data: rate === null means "no rate entered" → regularPay/otPay/
// grossPay are null (NEVER $0). Money is computed in floats and rounded only
// at display time.

export interface OvertimeBand {
  hours: number
  multiplier: number
}

export interface OvertimeResult {
  regularHours: number
  /** Sum of otBreakdown hours. */
  otHours: number
  /** Only bands with hours > 0, in ascending multiplier order. */
  otBreakdown: OvertimeBand[]
  regularPay: number | null
  otPay: number | null
  grossPay: number | null
}

export type OvertimeInput =
  | {
      /** Weekly-only rules (CA-ON, US-FED) and manual mode. */
      mode: 'weekly'
      weeklyHours: number
      weeklyThreshold: number
      multiplier: number
      rate: number | null
    }
  | {
      /**
       * CA-FED, CA-AB: daily OT (Σ hours past dailyThreshold each day) and
       * weekly OT (total past weeklyThreshold) are computed separately; the
       * employee is paid the GREATER of the two.
       */
      mode: 'greater-of'
      days: number[] // decimal hours per day; 0 = not worked
      dailyThreshold: number
      weeklyThreshold: number
      multiplier: number
      rate: number | null
    }
  | {
      /**
       * CA-BC: per day, hours past doubleTimeThreshold at doubleTimeMultiplier,
       * and hours past dailyThreshold up to doubleTimeThreshold at multiplier.
       * Weekly: only the first dailyThreshold hours of each day count toward
       * the weekly total; the excess over weeklyThreshold is at multiplier.
       * Daily and weekly apply independently — the first-8h cap prevents
       * double counting, so total OT = daily OT + weekly OT.
       */
      mode: 'two-tier'
      days: number[]
      dailyThreshold: number
      doubleTimeThreshold: number
      weeklyThreshold: number
      multiplier: number
      doubleTimeMultiplier: number
      rate: number | null
    }

const invalid = (v: number, max: number) => !Number.isFinite(v) || v < 0 || v > max

function finish(regularHours: number, bands: OvertimeBand[], rate: number | null): OvertimeResult {
  const otBreakdown = bands.filter((b) => b.hours > 0)
  const otHours = otBreakdown.reduce((s, b) => s + b.hours, 0)
  const regularPay = rate === null ? null : regularHours * rate
  const otPay = rate === null ? null : otBreakdown.reduce((s, b) => s + b.hours * b.multiplier * rate, 0)
  return {
    regularHours,
    otHours,
    otBreakdown,
    regularPay,
    otPay,
    grossPay: regularPay === null || otPay === null ? null : regularPay + otPay,
  }
}

export function calculateOvertime(input: OvertimeInput): OvertimeResult | null {
  if (input.rate !== null && invalid(input.rate, Infinity)) return null
  if (invalid(input.multiplier, Infinity) || input.multiplier <= 0) return null

  if (input.mode === 'weekly') {
    if (invalid(input.weeklyHours, 168) || invalid(input.weeklyThreshold, 168)) return null
    const ot = Math.max(0, input.weeklyHours - input.weeklyThreshold)
    return finish(input.weeklyHours - ot, [{ hours: ot, multiplier: input.multiplier }], input.rate)
  }

  // Daily modes share day validation.
  if (input.days.length === 0 || input.days.length > 7) return null
  if (input.days.some((d) => invalid(d, 24))) return null
  const total = input.days.reduce((s, d) => s + d, 0)

  if (input.mode === 'greater-of') {
    if (invalid(input.dailyThreshold, 24) || invalid(input.weeklyThreshold, 168)) return null
    const dailyOt = input.days.reduce((s, d) => s + Math.max(0, d - input.dailyThreshold), 0)
    const weeklyOt = Math.max(0, total - input.weeklyThreshold)
    const ot = Math.max(dailyOt, weeklyOt)
    return finish(total - ot, [{ hours: ot, multiplier: input.multiplier }], input.rate)
  }

  // mode === 'two-tier' (CA-BC)
  if (invalid(input.dailyThreshold, 24) || invalid(input.doubleTimeThreshold, 24)) return null
  if (invalid(input.weeklyThreshold, 168) || invalid(input.doubleTimeMultiplier, Infinity)) return null
  if (input.doubleTimeMultiplier <= 0) return null

  let ot15 = 0 // at multiplier (1.5×)
  let ot2 = 0 // at doubleTimeMultiplier (2×)
  let weeklyCounted = 0 // only the first dailyThreshold hours of each day
  for (const d of input.days) {
    ot2 += Math.max(0, d - input.doubleTimeThreshold)
    ot15 += Math.max(0, Math.min(d, input.doubleTimeThreshold) - input.dailyThreshold)
    weeklyCounted += Math.min(d, input.dailyThreshold)
  }
  ot15 += Math.max(0, weeklyCounted - input.weeklyThreshold)
  return finish(
    total - ot15 - ot2,
    [
      { hours: ot15, multiplier: input.multiplier },
      { hours: ot2, multiplier: input.doubleTimeMultiplier },
    ],
    input.rate,
  )
}
