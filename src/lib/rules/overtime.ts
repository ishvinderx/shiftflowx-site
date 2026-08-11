// Jurisdiction overtime rules — FAIL-CLOSED.
// No verified rule → no calculated result. Never add an entry without an
// official government sourceUrl. Populated only from verified official sources
// (data arrives from a separate research task).

export interface OvertimeRule {
  code: string // e.g. 'CA-BC'
  jurisdiction: string // e.g. 'British Columbia, Canada'
  dailyThresholdHours: number | null // null = no daily overtime rule
  weeklyThresholdHours: number | null // null = no weekly overtime rule
  multiplier: number // e.g. 1.5
  doubleTimeDailyThresholdHours: number | null
  doubleTimeMultiplier: number | null
  interaction: string | null // how daily and weekly rules combine, if both exist
  exceptionsNote: string // occupations/industries the rule does not cover
  ruleVersion: string
  effectiveDate: string // ISO date
  source: string
  sourceUrl: string // official government URL — required
  lastReviewed: string // ISO date
}

// Verified 2026-08-11 from official government pages (docs/JURISDICTION_RULES_RESEARCH.md).
// The source pages state no legal commencement dates, so effectiveDate carries the
// page's own "updated" date (ON, BC) or the fetch date (federal, AB, US) — do NOT
// present these as rule-commencement dates. Any jurisdiction not listed here is
// unverified: the UI must say so and calculate nothing statutory.
export const OVERTIME_RULES: OvertimeRule[] = [
  {
    code: 'CA-ON', jurisdiction: 'Ontario, Canada',
    dailyThresholdHours: null, weeklyThresholdHours: 44, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: null,
    exceptionsNote: 'Does not apply to managers and supervisors, some commission employees, and certain industries/jobs with ESA special rules or exemptions.',
    ruleVersion: '2026.1', effectiveDate: '2026-02-05',
    source: 'Ontario Employment Standards Act (ESA guide)',
    sourceUrl: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/overtime-pay',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'CA-FED', jurisdiction: 'Canada (federally regulated)',
    dailyThresholdHours: 8, weeklyThresholdHours: 40, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: 'Daily and weekly overtime are computed separately; the employer must use the greater of the two amounts.',
    exceptionsNote: 'Hours-of-work rules do not apply to managers, superintendents, employees exercising management functions, or members of the architectural, dental, engineering, legal, or medical professions; regulations modify thresholds for some industries.',
    ruleVersion: '2026.1', effectiveDate: '2026-08-11',
    source: 'Canada Labour Code, Part III (Federal Labour Standards)',
    sourceUrl: 'https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards/work-hours.html',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'CA-AB', jurisdiction: 'Alberta, Canada',
    dailyThresholdHours: 8, weeklyThresholdHours: 44, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: 'Overtime is all hours over 8/day or 44/week, whichever is greater (the "8/44 rule").',
    exceptionsNote: 'Does not apply to managers/supervisors, many professionals (architects, engineers, lawyers, etc.), farm and ranch workers, certain salespersons, and other exempt categories; some industries have modified thresholds.',
    ruleVersion: '2026.1', effectiveDate: '2026-08-11',
    source: 'Alberta Employment Standards',
    sourceUrl: 'https://www.alberta.ca/overtime-hours-overtime-pay',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'CA-BC', jurisdiction: 'British Columbia, Canada',
    dailyThresholdHours: 8, weeklyThresholdHours: 40, multiplier: 1.5,
    doubleTimeDailyThresholdHours: 12, doubleTimeMultiplier: 2,
    interaction: 'Daily: 1.5x over 8 h up to 12 h, 2x over 12 h. Weekly: 1.5x over 40 h; only the first 8 hours worked in a day count toward the weekly total. Daily and weekly rules apply independently.',
    exceptionsNote: 'Special rules or exemptions for managers, commission salespeople, and certain industries such as agriculture and high technology.',
    ruleVersion: '2026.1', effectiveDate: '2024-01-31',
    source: 'British Columbia Employment Standards Act',
    sourceUrl: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/hours/overtime-pay',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'US-FED', jurisdiction: 'United States (federal)',
    dailyThresholdHours: null, weeklyThresholdHours: 40, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: null,
    exceptionsNote: 'Exempt categories include bona fide executive, administrative, professional, and outside sales employees, and certain computer employees (duties + salary-basis tests apply).',
    ruleVersion: '2026.1', effectiveDate: '2026-08-11',
    source: 'US Fair Labor Standards Act (FLSA), US Department of Labor',
    sourceUrl: 'https://www.dol.gov/agencies/whd/overtime',
    lastReviewed: '2026-08-11',
  },
]

export function getOvertimeRule(code: string): OvertimeRule | null {
  return OVERTIME_RULES.find((r) => r.code === code) ?? null
}
