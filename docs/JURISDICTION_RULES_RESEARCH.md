# Jurisdiction Rules Research — GST/HST Rates & Overtime

Researched: 2026-08-11. All VERIFIED items were confirmed by fetching the cited official government page on that date. Nothing in the data arrays comes from memory or third-party sites.

## 1. Verification summary

| Item | Status | Source fetched |
|---|---|---|
| GST/HST rates, all 13 provinces/territories | VERIFIED | CRA "GST/HST calculator (and rates)" page, canada.ca (rate tables incl. "on or after April 1, 2025" column) |
| Nova Scotia HST 14% effective 2025-04-01 | VERIFIED | CRA "Charge and collect the GST/HST — Which rate to charge" page: "On April 1, 2025, the Government of Nova Scotia decreased the provincial portion of the HST to 9%, resulting in an HST rate of 14% in Nova Scotia." |
| Separate PST/QST flags (BC, SK, MB, QC) | VERIFIED | Same CRA calculator page ("GST/HST and PST rates" table: BC 7%, MB 7%, SK 6%, QC 9.975%) — rates listed for disclosure only, out of scope for calculation |
| Ontario ESA overtime (44 h/week, 1.5×) | VERIFIED | ontario.ca ESA guide, overtime pay chapter (page updated 2026-02-05) |
| Canada federal overtime (8/day, 40/week, 1.5×, greater-of) | VERIFIED | canada.ca "Hours of work — Federally regulated workplaces" |
| Alberta overtime (8/44 rule, greater-of, 1.5×) | VERIFIED | alberta.ca "Overtime hours and overtime pay" |
| BC overtime (1.5× >8 h, 2× >12 h, 1.5× >40 h/week) | VERIFIED | gov.bc.ca "Overtime pay" (last updated 2024-01-31) |
| US federal FLSA overtime (40 h/week, 1.5×) | VERIFIED | dol.gov/agencies/whd/overtime + Fact Sheet 17A (exemption categories) |

UNVERIFIED / excluded items: none required by the task remained unverified. Caveats and dead-URL notes in section 4.

## 2. Ready-to-paste data arrays

### Sales tax (GST/HST)

Scope note for UI: rates below are GST/HST only. BC, Saskatchewan, Manitoba, and Quebec charge a separate PST/RST/QST that is **not** included — disclose "does not include PST/QST" where `hasSeparatePst: true`.

`effectiveDate` = earliest date the fetched CRA table confirms the current rate applies. The CRA table's history starts at 2013-04-01, so provinces whose rate is unchanged across the whole table carry that date (the rate is older in reality, but 2013-04-01 is the earliest the source confirms).

```ts
const salesTaxRules = [
  { code: 'AB', jurisdiction: 'Alberta',                   taxType: 'GST', ratePercent: 5,  hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'BC', jurisdiction: 'British Columbia',          taxType: 'GST', ratePercent: 5,  hasSeparatePst: true,  ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'MB', jurisdiction: 'Manitoba',                  taxType: 'GST', ratePercent: 5,  hasSeparatePst: true,  ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'NB', jurisdiction: 'New Brunswick',             taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-10-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'NL', jurisdiction: 'Newfoundland and Labrador', taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-07-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'NT', jurisdiction: 'Northwest Territories',     taxType: 'GST', ratePercent: 5,  hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'NS', jurisdiction: 'Nova Scotia',               taxType: 'HST', ratePercent: 14, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2025-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html', lastReviewed: '2026-08-11' },
  { code: 'NU', jurisdiction: 'Nunavut',                   taxType: 'GST', ratePercent: 5,  hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'ON', jurisdiction: 'Ontario',                   taxType: 'HST', ratePercent: 13, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'PE', jurisdiction: 'Prince Edward Island',      taxType: 'HST', ratePercent: 15, hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2016-10-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'QC', jurisdiction: 'Quebec',                    taxType: 'GST', ratePercent: 5,  hasSeparatePst: true,  ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'SK', jurisdiction: 'Saskatchewan',              taxType: 'GST', ratePercent: 5,  hasSeparatePst: true,  ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
  { code: 'YT', jurisdiction: 'Yukon',                     taxType: 'GST', ratePercent: 5,  hasSeparatePst: false, ruleVersion: '2026.1', effectiveDate: '2013-04-01', source: 'Canada Revenue Agency', sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html', lastReviewed: '2026-08-11' },
];
```

Separate provincial taxes noted by the CRA source (for the disclosure line only, NOT to be calculated): BC PST 7%, Manitoba 7% (RST), Saskatchewan PST 6%, Quebec QST 9.975%.

### Overtime

`effectiveDate` here = the "current as of" context the source page itself provides (these pages state no rule-commencement dates); see per-row note.

```ts
const overtimeRules = [
  {
    code: 'CA-ON', jurisdiction: 'Ontario, Canada',
    dailyThresholdHours: null, weeklyThresholdHours: 44, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: null, // ESA guide states a weekly threshold only
    exceptionsNote: 'Does not apply to managers and supervisors, some commission employees, and certain industries/jobs with ESA special rules or exemptions.',
    ruleVersion: '2026.1', effectiveDate: '2026-02-05', // source page "Updated: February 05, 2026"
    source: 'Ontario Employment Standards Act (ESA guide)',
    sourceUrl: 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/overtime-pay',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'CA-FED', jurisdiction: 'Canada (federally regulated), Canada',
    dailyThresholdHours: 8, weeklyThresholdHours: 40, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: 'Daily and weekly overtime are computed separately; the employer must use the greater of the two amounts.',
    exceptionsNote: 'Hours-of-work rules do not apply to managers, superintendents, employees exercising management functions, or members of the architectural, dental, engineering, legal, or medical professions; regulations modify thresholds for some industries.',
    ruleVersion: '2026.1', effectiveDate: '2026-08-11', // page states no rule date; current as of fetch date
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
    ruleVersion: '2026.1', effectiveDate: '2026-08-11', // page states no rule date; current as of fetch date
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
    ruleVersion: '2026.1', effectiveDate: '2024-01-31', // source page "Last updated on January 31, 2024"
    source: 'British Columbia Employment Standards Act',
    sourceUrl: 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/hours/overtime-pay',
    lastReviewed: '2026-08-11',
  },
  {
    code: 'US-FED', jurisdiction: 'United States (federal)',
    dailyThresholdHours: null, weeklyThresholdHours: 40, multiplier: 1.5,
    doubleTimeDailyThresholdHours: null, doubleTimeMultiplier: null,
    interaction: null, // FLSA applies on a workweek basis only; no federal daily overtime
    exceptionsNote: 'Exempt categories include bona fide executive, administrative, professional, and outside sales employees, and certain computer employees (duties + salary-basis tests apply).',
    ruleVersion: '2026.1', effectiveDate: '2026-08-11', // page states no rule date; current as of fetch date
    source: 'US Fair Labor Standards Act (FLSA), US Department of Labor',
    sourceUrl: 'https://www.dol.gov/agencies/whd/overtime',
    lastReviewed: '2026-08-11',
  },
];
```

## 3. Key verified quotes

- **CRA rates table** (calculator page): current-column "On or after April 1, 2025" — AB 5%, BC 5%, MB 5%, NB 15%, NL 15%, NT 5%, NS 14%, NU 5%, ON 13%, QC 5%, PE 15%, SK 5%, YT 5%. PST column: BC 7%, MB 7%, SK 6%, QC 9.975%; HST provinces "N/A"; GST-only territories/AB "0%".
- **Nova Scotia** (CRA which-rate page): "On April 1, 2025, the Government of Nova Scotia decreased the provincial portion of the HST to 9%, resulting in an HST rate of 14% in Nova Scotia."
- **Ontario**: "overtime begins after they have worked 44 hours in a work week … Overtime pay is 1½ times the employee's regular rate of pay."
- **Federal**: standard hours "8 hours in a day … 40 hours in a week"; overtime "at least 1.5 times the regular hourly wage"; "Your total daily overtime may differ from your total weekly overtime hours. In that case, your employer must use the greater of the 2 amounts."
- **Alberta**: "Overtime is all hours worked over 8 hours a day or 44 hours a week, whichever is greater (8/44 rule)"; "at least 1.5 times the employee's regular wage rate."
- **BC**: "time-and-a-half for any time worked over 8 hours in a day, up to 12 hours"; "double time for any time worked over 12 hours during a day"; "time-and-a-half for any time worked over 40 hours worked in a week"; "Only the first 8 hours worked in a day count towards weekly overtime."
- **FLSA**: "overtime pay for hours worked over 40 in a workweek at a rate not less than time and one-half their regular rates of pay"; workweek = fixed recurring 168 hours; averaging over weeks not permitted.

## 4. Caveats, dead URLs, and items excluded

- **PST/QST rates are out of scope** and were deliberately excluded from `salesTaxRules` values — they appear only as the `hasSeparatePst` flag and the disclosure note. They are quoted from the CRA table but were not verified against each province's own tax authority.
- **New Brunswick effective date**: the CRA table's columns show NB at 13% for "July 1, 2016 to September 30, 2016" and 15% from the "October 1, 2016" column onward, so `2016-10-01` is recorded exactly as the source presents it. Other references commonly date NB's 15% HST to July 1, 2016; that earlier date was NOT verified from an official page and is not used.
- **Pre-2013 rate history**: the CRA table starts at April 1, 2013, so `2013-04-01` is the earliest officially confirmed date for unchanged rates — not the true introduction date.
- **Fetch-access notes**: `canada.ca` and `dol.gov` return HTTP 403 to the standard fetcher; pages were retrieved via direct CLI HTTP fetch (Defuddle/Node) and read in full. The old federal URL `.../federal-labour-standards/hours-work.html` is now 404 — the live page is `.../federal-labour-standards/work-hours.html` (used above).
- **Overtime effective dates**: none of the five overtime source pages states a commencement date for the current thresholds; `effectiveDate` therefore carries the page's own "updated" date (ON, BC) or the fetch date (federal, AB, US), each flagged with an inline comment. Do not present these as legal commencement dates.
- **Ontario daily threshold**: the ESA guide states no daily overtime threshold; `dailyThresholdHours` is null by design, not omission.
