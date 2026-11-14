// Weekly time-card math — distinct from the single-shift calculator (calc.ts):
// per-day rows and a WEEKLY overtime threshold (default 40h), the standard weekly
// rule, vs. the shift calculator's daily threshold. Pure module, no React.

import { minutesBetween } from "../work-hours-calculator/calc";

export interface DayRow {
  enabled: boolean;
  start: string; // "HH:MM"
  end: string;
  breakMinutes: number; // unpaid
}

export interface WeekResult {
  perDayMinutes: number[]; // worked minutes per row (0 when disabled/empty)
  totalMinutes: number;
  regularMinutes: number;
  overtimeMinutes: number; // past the WEEKLY threshold
  decimalHours: number;
  grossPay: number | null; // null without a rate — never a fabricated $0
}

export function dayWorkedMinutes(row: DayRow): number {
  if (!row.enabled || !row.start || !row.end) return 0;
  return Math.max(0, minutesBetween(row.start, row.end) - Math.max(0, row.breakMinutes));
}

export function calculateWeek(
  rows: DayRow[],
  weeklyOvertimeThresholdHours: number,
  overtimeMultiplier: number,
  hourlyRate: number | null,
): WeekResult {
  const perDayMinutes = rows.map(dayWorkedMinutes);
  const totalMinutes = perDayMinutes.reduce((a, b) => a + b, 0);
  const thresholdMinutes = Math.max(0, weeklyOvertimeThresholdHours) * 60;
  const overtimeMinutes = Math.max(0, totalMinutes - thresholdMinutes);
  const regularMinutes = totalMinutes - overtimeMinutes;
  const decimalHours = Math.round((totalMinutes / 60) * 100) / 100;

  let grossPay: number | null = null;
  if (hourlyRate != null && hourlyRate > 0) {
    const pay = (regularMinutes / 60) * hourlyRate + (overtimeMinutes / 60) * hourlyRate * overtimeMultiplier;
    grossPay = Math.round(pay * 100) / 100;
  }

  return { perDayMinutes, totalMinutes, regularMinutes, overtimeMinutes, decimalHours, grossPay };
}
