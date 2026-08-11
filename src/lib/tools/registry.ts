// Single source of truth for the free-tools platform: routes, hub cards,
// related-tool links, sitemap entries, and App Store ct tokens all derive
// from this list. status 'planned' = excluded from hub, sitemap, and
// related links until the page ships.

export type ToolCategory =
  | 'Work & Time'
  | 'Pay & Earnings'
  | 'Overtime'
  | 'Contractor & Self-Employed'
  | 'GST/HST & Invoices'
  | 'Owner-Operator & Trucking'

export interface ToolConfig {
  slug: string // route segment AND App Store ct token AND analytics id
  title: string // card/H1 name
  shortDescription: string // one sentence for hub cards + related-tool pills
  category: ToolCategory
  status: 'live' | 'planned'
  related: string[] // slugs, resolved by relatedTools()
}

export const TOOLS: ToolConfig[] = [
  {
    slug: 'work-hours-calculator',
    title: 'Work Hours Calculator',
    shortDescription: 'Total hours worked from start time, end time, and breaks — with overtime and estimated pay.',
    category: 'Work & Time',
    status: 'live',
    related: ['time-card-calculator', 'decimal-hours-calculator', 'overtime-calculator', 'hourly-pay-calculator'],
  },
  {
    slug: 'time-card-calculator',
    title: 'Time Card Calculator',
    shortDescription: 'Weekly time card: add each day’s shift and breaks to get total hours and weekly overtime.',
    category: 'Work & Time',
    status: 'live',
    related: ['work-hours-calculator', 'decimal-hours-calculator', 'overtime-calculator', 'hourly-pay-calculator'],
  },
  {
    slug: 'decimal-hours-calculator',
    title: 'Decimal Hours Calculator',
    shortDescription: 'Convert hours and minutes to decimal hours (and back) for timesheets and payroll.',
    category: 'Work & Time',
    status: 'live',
    related: ['work-hours-calculator', 'time-card-calculator', 'hourly-pay-calculator'],
  },
  {
    slug: 'hourly-pay-calculator',
    title: 'Hourly Pay Calculator',
    shortDescription: 'Gross pay from your hourly rate and hours worked, with an optional overtime breakdown.',
    category: 'Pay & Earnings',
    status: 'live',
    related: ['gross-pay-calculator', 'take-home-pay-calculator', 'overtime-calculator', 'work-hours-calculator'],
  },
  {
    slug: 'overtime-calculator',
    title: 'Overtime Calculator',
    shortDescription: 'Split regular vs. overtime hours and see what the overtime multiplier adds to your pay.',
    category: 'Overtime',
    status: 'planned',
    related: ['work-hours-calculator', 'time-card-calculator', 'hourly-pay-calculator'],
  },
  {
    slug: 'gross-pay-calculator',
    title: 'Gross Pay Calculator',
    shortDescription: 'Your total earnings before deductions, from rate and hours across a pay period.',
    category: 'Pay & Earnings',
    status: 'planned',
    related: ['hourly-pay-calculator', 'take-home-pay-calculator', 'work-hours-calculator'],
  },
  {
    slug: 'take-home-pay-calculator',
    title: 'Take-Home Pay Calculator',
    shortDescription: 'Estimate what actually lands in your account after taxes and deductions.',
    category: 'Pay & Earnings',
    status: 'planned',
    related: ['hourly-pay-calculator', 'gross-pay-calculator', 'tax-reserve-calculator'],
  },
  {
    slug: 'contractor-pay-calculator',
    title: 'Contractor Pay Calculator',
    shortDescription: 'Work out contract earnings from your rate, billable hours, and expenses.',
    category: 'Contractor & Self-Employed',
    status: 'planned',
    related: ['gst-hst-calculator', 'hst-invoice-calculator', 'tax-reserve-calculator', 'owner-operator-pay-calculator'],
  },
  {
    slug: 'contractor-take-home-pay-calculator',
    title: 'Contractor Take-Home Pay Calculator',
    shortDescription: 'What self-employed income leaves after setting aside tax and business costs.',
    category: 'Contractor & Self-Employed',
    status: 'planned',
    related: ['contractor-pay-calculator', 'tax-reserve-calculator', 'gst-hst-calculator', 'take-home-pay-calculator'],
  },
  {
    slug: 'tax-reserve-calculator',
    title: 'Tax Reserve Calculator',
    shortDescription: 'How much of each payment to set aside so tax season doesn’t catch you short.',
    category: 'Contractor & Self-Employed',
    status: 'planned',
    related: ['contractor-pay-calculator', 'contractor-take-home-pay-calculator', 'gst-hst-calculator'],
  },
  {
    slug: 'gst-hst-calculator',
    title: 'GST/HST Calculator',
    shortDescription: 'Add or back out GST/HST from an amount using your province’s rate.',
    category: 'GST/HST & Invoices',
    status: 'planned',
    related: ['hst-invoice-calculator', 'contractor-pay-calculator', 'tax-reserve-calculator'],
  },
  {
    slug: 'hst-invoice-calculator',
    title: 'HST Invoice Calculator',
    shortDescription: 'Build invoice line totals with HST applied correctly for your province.',
    category: 'GST/HST & Invoices',
    status: 'planned',
    related: ['gst-hst-calculator', 'contractor-pay-calculator', 'truck-driver-settlement-calculator'],
  },
  {
    slug: 'owner-operator-pay-calculator',
    title: 'Owner-Operator Pay Calculator',
    shortDescription: 'Trucking revenue minus fuel, maintenance, and fixed costs — what a load really pays.',
    category: 'Owner-Operator & Trucking',
    status: 'planned',
    related: ['truck-driver-settlement-calculator', 'gst-hst-calculator', 'contractor-pay-calculator', 'tax-reserve-calculator'],
  },
  {
    slug: 'truck-driver-settlement-calculator',
    title: 'Truck Driver Settlement Calculator',
    shortDescription: 'Check a settlement statement: miles, rate, deductions, and what you should be paid.',
    category: 'Owner-Operator & Trucking',
    status: 'planned',
    related: ['owner-operator-pay-calculator', 'hst-invoice-calculator', 'contractor-pay-calculator'],
  },
]

export function getTool(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

/** Resolve a tool's related slugs to configs, dropping anything not yet live. */
export function relatedTools(slug: string): ToolConfig[] {
  const tool = getTool(slug)
  if (!tool) return []
  return tool.related
    .map(getTool)
    .filter((t): t is ToolConfig => t !== undefined && t.status === 'live')
}
