// Jurisdiction sales-tax (GST/HST) rules — FAIL-CLOSED.
// No verified rule → no calculated result. Never add an entry without an
// official government sourceUrl. Populated only from verified official sources
// (data arrives from a separate research task).

export interface SalesTaxRule {
  code: string // e.g. 'CA-ON'
  jurisdiction: string // e.g. 'Ontario, Canada'
  taxType: 'GST' | 'HST'
  ratePercent: number
  hasSeparatePst: boolean
  ruleVersion: string
  effectiveDate: string // ISO date
  source: string // e.g. 'Canada Revenue Agency'
  sourceUrl: string // official government URL — required
  lastReviewed: string // ISO date
}

// Verified 2026-08-11 from the CRA rates table (docs/JURISDICTION_RULES_RESEARCH.md).
// effectiveDate = earliest date the CRA table confirms the current rate (its
// history starts 2013-04-01 — rates may be older in reality). Rates are GST/HST
// ONLY: where hasSeparatePst is true (BC/MB/SK/QC) the UI must disclose that
// separate PST/RST/QST is NOT included.
const CRA_CALC_URL =
  'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html'

export const SALES_TAX_RULES: SalesTaxRule[] = [
  { code: 'AB', jurisdiction: 'Alberta', taxType: 'GST', ratePercent: 5, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'BC', jurisdiction: 'British Columbia', taxType: 'GST', ratePercent: 5, hasSeparatePst: true, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'MB', jurisdiction: 'Manitoba', taxType: 'GST', ratePercent: 5, hasSeparatePst: true, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'NB', jurisdiction: 'New Brunswick', taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-10-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'NL', jurisdiction: 'Newfoundland and Labrador', taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-07-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'NT', jurisdiction: 'Northwest Territories', taxType: 'GST', ratePercent: 5, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'NS', jurisdiction: 'Nova Scotia', taxType: 'HST', ratePercent: 14, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2025-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html', lastReviewed: '2026-08-11' },
  { code: 'NU', jurisdiction: 'Nunavut', taxType: 'GST', ratePercent: 5, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'ON', jurisdiction: 'Ontario', taxType: 'HST', ratePercent: 13, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'PE', jurisdiction: 'Prince Edward Island', taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-10-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'QC', jurisdiction: 'Quebec', taxType: 'GST', ratePercent: 5, hasSeparatePst: true, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'SK', jurisdiction: 'Saskatchewan', taxType: 'GST', ratePercent: 5, hasSeparatePst: true, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
  { code: 'YT', jurisdiction: 'Yukon', taxType: 'GST', ratePercent: 5, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: CRA_CALC_URL, lastReviewed: '2026-08-11' },
]

export function getSalesTaxRule(code: string): SalesTaxRule | null {
  return SALES_TAX_RULES.find((r) => r.code === code) ?? null
}
