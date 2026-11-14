// Use-case pages: one data entry per audience, rendered by components/marketing/UseCasePage.tsx
// at /use-cases/[slug]. Only real features are described (see PRO_FEATURES / PLAN_POLICY in
// src/lib/constants.ts). Sample rows are labelled "Sample data" where they appear.

import type { LedgerColumn } from "@/components/ui";

export type UseCaseVisual =
  | { kind: "phone"; src: string; alt: string }
  | { kind: "allocation" }
  | { kind: "earnings" }
  | { kind: "ledger"; caption: string; columns: LedgerColumn[]; rows: Record<string, string>[]; footer?: Record<string, string> };

export type UseCaseRow = {
  label: string;
  title: string;
  body: string[];
  visual: UseCaseVisual;
};

export type UseCase = {
  slug: string;
  /** Short name for hubs and breadcrumbs. */
  name: string;
  /** Page <title> (the layout template appends the brand). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  /** One line for the /use-cases hub. */
  hubLine: string;
  rows: [UseCaseRow, UseCaseRow, UseCaseRow];
  faq: { q: string; a: string }[];
  /** Calculators worth linking from this audience's page. */
  tools: { href: string; label: string }[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "hourly-workers",
    name: "Hourly workers",
    metaTitle: "Shift Tracker for Hourly Workers",
    metaDescription:
      "Log your shifts, see what you have earned this pay period, and check your paycheque against the hours you worked. HoursFlow for hourly employees.",
    h1: "For people whose hours change every week",
    lede: "When your schedule moves around, the paycheque is the only record most people have. HoursFlow keeps your own count of shifts, earnings and payday.",
    hubLine: "Hours that change every week, and a paycheque you want to check.",
    rows: [
      {
        label: "Shifts",
        title: "Log the shift when you finish it",
        body: [
          "Enter the start and end time and your rate. The app adds up the hours and what the shift earned, so the week's total is never a guess.",
          "The free plan keeps your last 30 days for one employer.",
        ],
        visual: { kind: "phone", src: "/screenshots/shifts.png", alt: "The Shifts screen in HoursFlow listing logged shifts with their hours and pay." },
      },
      {
        label: "Payday",
        title: "See the paycheque coming",
        body: [
          "Set your pay schedule and you get a payday countdown, what you have earned so far this period, and an estimate of the paycheque after deductions.",
          "It is an estimate from your logged hours. It is not a promise of what your employer will pay.",
        ],
        visual: { kind: "earnings" },
      },
      {
        label: "Check",
        title: "Compare the paycheque with your hours",
        body: [
          "With Pro, the paycheck tracker checks a paycheque against the hours you logged, so a short week or a missing shift stands out.",
          "Having your own record of the hours makes the conversation with payroll shorter.",
        ],
        visual: {
          kind: "ledger",
          caption: "Hours logged against hours paid",
          columns: [
            { key: "week", label: "Week" },
            { key: "logged", label: "Logged", align: "right" },
            { key: "paid", label: "Paid", align: "right" },
          ],
          rows: [
            { week: "Oct 27 to Nov 2", logged: "34.0 h", paid: "34.0 h" },
            { week: "Nov 3 to Nov 9", logged: "38.5 h", paid: "36.5 h" },
          ],
          footer: { week: "Difference to ask about", logged: "", paid: "2.0 h" },
        },
      },
    ],
    faq: [
      { q: "What if my hours are different every week?", a: "That is the normal case. Each shift is logged on its own, and earnings and payday are worked out from whatever you logged in the pay period." },
      { q: "Does it work if I have two jobs?", a: "The free plan tracks one employer. More than one employer is part of Pro." },
      { q: "How do I work out overtime?", a: "The free overtime calculator splits regular and overtime hours using the rules for your province or state, and shows the source of the rule." },
    ],
    tools: [
      { href: "/time-card-calculator", label: "Time card calculator" },
      { href: "/overtime-calculator", label: "Overtime calculator" },
      { href: "/hourly-pay-calculator", label: "Hourly pay calculator" },
    ],
  },
  {
    slug: "gig-workers",
    name: "Gig workers",
    metaTitle: "Income and Tax Set-Aside Tracker for Gig Workers",
    metaDescription:
      "Track gig income and the hours behind it, scan receipts for expenses, and see an estimate of what to set aside for tax. HoursFlow for gig workers.",
    h1: "For income that arrives with no tax taken off",
    lede: "Delivery, rideshare and task work pay you in full, and the tax is still due later. HoursFlow shows what came in, what it cost you and what to set aside.",
    hubLine: "Income paid in full, costs you carry, and tax still to set aside.",
    rows: [
      {
        label: "Income",
        title: "Keep a record of every working session",
        body: [
          "Log the hours you work and what you earned for them. A weekly total beats trying to piece it together from several payment apps at tax time.",
          "Reports roll up pay and hours by week, month or year, and export as PDF or CSV with Pro.",
        ],
        visual: { kind: "phone", src: "/screenshots/reports.png", alt: "The Reports screen showing a month summary of gross pay, hours and shifts." },
      },
      {
        label: "Costs",
        title: "Scan the receipt, keep the expense",
        body: [
          "Fuel, parking, a phone mount. With Pro you scan a receipt with your camera and the text is read on your device.",
          "Expenses sit beside your income, so you can see what a week really left you with.",
        ],
        visual: {
          kind: "ledger",
          caption: "A week, income less expenses",
          columns: [
            { key: "item", label: "Item" },
            { key: "amount", label: "Amount", align: "right" },
          ],
          rows: [
            { item: "Income logged", amount: "$742.00" },
            { item: "Fuel", amount: "-$96.40" },
            { item: "Parking and tolls", amount: "-$21.00" },
          ],
          footer: { item: "Left after expenses", amount: "$624.60" },
        },
      },
      {
        label: "Tax",
        title: "See what to set aside",
        body: [
          "With Pro, the tax report gives an estimate of what to put aside, with GST/HST summaries if you charge it.",
          "It is an estimate to plan with. Your accountant or the tax authority has the final say.",
        ],
        visual: { kind: "allocation" },
      },
    ],
    faq: [
      { q: "Does HoursFlow connect to my delivery or rideshare accounts?", a: "No. You log your own hours and earnings in the app." },
      { q: "Is the tax figure exact?", a: "No. It is an estimate to help you set money aside. Check it against your own situation before you file." },
      { q: "Which parts are free?", a: "Shift tracking for one employer, earnings, payday, budget and bill reminders, with your last 30 days. Receipts, tax reports and exports are Pro." },
    ],
    tools: [
      { href: "/tax-reserve-calculator", label: "Tax reserve calculator" },
      { href: "/contractor-take-home-pay-calculator", label: "Contractor take-home calculator" },
      { href: "/gst-hst-calculator", label: "GST/HST calculator" },
    ],
  },
  {
    slug: "freelancers",
    name: "Freelancers",
    metaTitle: "Invoices and GST/HST Summaries for Freelancers",
    metaDescription:
      "Create invoices, keep track of the hours behind them, and get GST/HST summaries in your tax report. HoursFlow for self-employed freelancers.",
    h1: "For people who invoice instead of getting a payslip",
    lede: "Your income is a pile of invoices, some paid and some not, with sales tax mixed in. HoursFlow keeps the hours, the invoice and the tax summary together.",
    hubLine: "Invoices, sales tax on them, and a budget for uneven months.",
    rows: [
      {
        label: "Invoice",
        title: "Turn logged hours into an invoice",
        body: [
          "With Pro you create invoices as a self-employed worker and pay statements from your records. The hours you logged are already there.",
          "Export a report as PDF or CSV when a client or your accountant asks for the detail.",
        ],
        visual: { kind: "phone", src: "/screenshots/reports.png", alt: "The Reports screen with gross pay, hours and shifts, from which statements and invoices are created." },
      },
      {
        label: "Sales tax",
        title: "Know how much of an invoice is GST/HST",
        body: [
          "If you charge GST/HST, the amount on an invoice is not yours to keep. The tax report includes GST/HST summaries so you can see what you collected.",
          "The free HST invoice calculator shows the same maths for a single invoice.",
        ],
        visual: {
          kind: "ledger",
          caption: "One invoice, Ontario HST at 13 percent",
          columns: [
            { key: "line", label: "Line" },
            { key: "amount", label: "Amount", align: "right" },
          ],
          rows: [
            { line: "Design work, 20 h at $85", amount: "$1,700.00" },
            { line: "HST (13%)", amount: "$221.00" },
          ],
          footer: { line: "Invoice total", amount: "$1,921.00" },
        },
      },
      {
        label: "Budget",
        title: "Plan a month when income lands unevenly",
        body: [
          "Put your bills on a monthly plan. The app shows how much is still to earn to cover them, and reminds you before each one is due.",
          "It is useful in the month between two big invoices.",
        ],
        visual: { kind: "allocation" },
      },
    ],
    faq: [
      { q: "Can I invoice from the app?", a: "Yes. Invoices for the self-employed, and pay statements, are part of Pro." },
      { q: "Does it file my GST/HST return?", a: "No. It gives you GST/HST summaries in the tax report to help you prepare. You file with the tax authority yourself." },
      { q: "Can I track more than one client?", a: "Pro supports more than one employer, which you can use for separate clients." },
    ],
    tools: [
      { href: "/hst-invoice-calculator", label: "HST invoice calculator" },
      { href: "/gst-hst-calculator", label: "GST/HST calculator" },
      { href: "/tax-reserve-calculator", label: "Tax reserve calculator" },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors",
    metaTitle: "Hours and Pay Tracker for Contractors",
    metaDescription:
      "Track billable hours by the week, export reports for your invoice, and check each payment against the hours you logged. HoursFlow for contractors.",
    h1: "For work billed by the hour on someone else's timesheet",
    lede: "On a contract, the client's timesheet decides what you are paid. Keep your own count of billable hours so the two can be compared.",
    hubLine: "Billable hours, weekly timesheets and payments to check.",
    rows: [
      {
        label: "Hours",
        title: "Keep a weekly count of billable hours",
        body: [
          "Log each day's start and end. The weekly total is ready when the timesheet is due, with no re-adding from memory.",
          "The free time card calculator does the same sum for a one-off week.",
        ],
        visual: { kind: "phone", src: "/screenshots/shifts.png", alt: "The Shifts screen in HoursFlow with logged shifts and their hours." },
      },
      {
        label: "Proof",
        title: "Export the hours behind an invoice",
        body: [
          "With Pro, export a report as PDF or CSV and attach it to the invoice. Pay statements are available too.",
          "A clear record answers a query about hours before it becomes a dispute.",
        ],
        visual: {
          kind: "ledger",
          caption: "Weekly billable hours, one contract",
          columns: [
            { key: "week", label: "Week" },
            { key: "hours", label: "Hours", align: "right" },
            { key: "billed", label: "At $70", align: "right" },
          ],
          rows: [
            { week: "Nov 3 to Nov 9", hours: "37.5", billed: "$2,625.00" },
            { week: "Nov 10 to Nov 16", hours: "40.0", billed: "$2,800.00" },
          ],
          footer: { week: "Two weeks", hours: "77.5", billed: "$5,425.00" },
        },
      },
      {
        label: "Payment",
        title: "Check each payment when it lands",
        body: [
          "The paycheck tracker, part of Pro, checks a payment against the hours you logged.",
          "The tax report gives an estimate of what to set aside from it.",
        ],
        visual: { kind: "earnings" },
      },
    ],
    faq: [
      { q: "Is this a time-tracking tool for my client?", a: "No. It is your own record, kept on your side, for checking pay and preparing invoices." },
      { q: "Can I use it across two contracts?", a: "Yes with Pro, which supports more than one employer." },
      { q: "What do I need for the weekly total?", a: "Only your start and end times. The free plan keeps 30 days; Pro keeps the full history." },
    ],
    tools: [
      { href: "/contractor-pay-calculator", label: "Contractor pay calculator" },
      { href: "/contractor-take-home-pay-calculator", label: "Contractor take-home calculator" },
      { href: "/time-card-calculator", label: "Time card calculator" },
    ],
  },
  {
    slug: "nurses",
    name: "Nurses",
    metaTitle: "Shift Tracker for Nurses and Healthcare Workers",
    metaDescription:
      "Track night and rotating shifts across more than one facility, import shifts, and check each paycheque against your hours. HoursFlow for nurses.",
    h1: "For rotating shifts at more than one facility",
    lede: "Nights, weekends and agency shifts do not fit a single timesheet. HoursFlow keeps each shift and employer in one record.",
    hubLine: "Night and rotating shifts across more than one employer.",
    rows: [
      {
        label: "Employers",
        title: "Keep two facilities in one record",
        body: [
          "Pro supports more than one employer, so a hospital contract and an agency shift sit in the same list with the right rate on each.",
          "The free plan covers one employer.",
        ],
        visual: {
          kind: "ledger",
          caption: "Shifts across two employers",
          columns: [
            { key: "date", label: "Date" },
            { key: "employer", label: "Employer" },
            { key: "hours", label: "Hours", align: "right" },
            { key: "pay", label: "Pay", align: "right" },
          ],
          rows: [
            { date: "Nov 9", employer: "Harbour Clinic", hours: "6", pay: "$189.00" },
            { date: "Nov 10", employer: "Northside Grocery", hours: "8", pay: "$208.00" },
            { date: "Nov 11", employer: "Harbour Clinic", hours: "6", pay: "$189.00" },
          ],
          footer: { date: "Total", employer: "", hours: "20", pay: "$586.00" },
        },
      },
      {
        label: "Import",
        title: "Bring in the schedule instead of retyping it",
        body: [
          "Shift import, a Pro feature, saves entering a month of rotating shifts one at a time.",
          "Scanning a payslip with the camera is part of Pro as well, and the text is read on your device.",
        ],
        visual: { kind: "phone", src: "/screenshots/shifts.png", alt: "The Shifts screen in HoursFlow with logged shifts and their hours." },
      },
      {
        label: "Pay",
        title: "Check overtime and nights against the paycheque",
        body: [
          "Compare the paycheque with the hours you logged, including long shifts and extra ones, with the paycheck tracker in Pro.",
          "The free work hours calculator handles a shift that crosses midnight, such as 10:00 PM to 6:00 AM.",
        ],
        visual: { kind: "earnings" },
      },
    ],
    faq: [
      { q: "Does it handle night shifts?", a: "You log the start and end of each shift. The work hours calculator on this site handles shifts that cross midnight." },
      { q: "Can I track agency and hospital shifts together?", a: "Yes with Pro, which supports more than one employer." },
      { q: "Does it know my pay differentials?", a: "No. You enter the pay rate for your shifts, and the app works from that." },
    ],
    tools: [
      { href: "/work-hours-calculator", label: "Work hours calculator" },
      { href: "/overtime-calculator", label: "Overtime calculator" },
      { href: "/time-card-calculator", label: "Time card calculator" },
    ],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
