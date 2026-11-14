// "Which one should I use?" lines for calculators that overlap. Shown on the /tools hub and
// on both tool pages of each pair.
export const TOOL_PAIRS: { a: string; b: string; text: string }[] = [
  {
    a: 'work-hours-calculator',
    b: 'time-card-calculator',
    text: 'Use Work Hours for a single shift with daily overtime; use Time Card to total a whole week and apply weekly overtime.',
  },
  {
    a: 'contractor-pay-calculator',
    b: 'contractor-take-home-pay-calculator',
    text: 'Use Contractor Pay for what a contract earns before tax; use Take-Home to see what is left after tax and business costs.',
  },
  {
    a: 'gst-hst-calculator',
    b: 'hst-invoice-calculator',
    text: 'Use GST/HST to add or remove tax on one amount; use HST Invoice to total an invoice with several lines.',
  },
  {
    a: 'owner-operator-pay-calculator',
    b: 'truck-driver-settlement-calculator',
    text: 'Use Owner-Operator for what a load earns after your costs; use Settlement to check the statement your carrier sends.',
  },
]

export function pairFor(slug: string): { other: string; text: string } | null {
  const p = TOOL_PAIRS.find((x) => x.a === slug || x.b === slug)
  return p ? { other: p.a === slug ? p.b : p.a, text: p.text } : null
}

// Plain headings for the /tools hub. Every calculator URL stays as it is.
export const TOOL_GROUPS: { heading: string; slugs: string[] }[] = [
  { heading: 'Hours and time cards', slugs: ['work-hours-calculator', 'time-card-calculator', 'decimal-hours-calculator', 'overtime-calculator'] },
  { heading: 'Pay and take-home', slugs: ['hourly-pay-calculator', 'gross-pay-calculator', 'take-home-pay-calculator'] },
  { heading: 'Sales tax and invoices', slugs: ['gst-hst-calculator', 'hst-invoice-calculator', 'tax-reserve-calculator'] },
  { heading: 'Contractors and drivers', slugs: ['contractor-pay-calculator', 'contractor-take-home-pay-calculator', 'owner-operator-pay-calculator', 'truck-driver-settlement-calculator'] },
]
