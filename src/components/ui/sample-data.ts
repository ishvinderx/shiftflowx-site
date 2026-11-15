// Sample data for the live ledger visuals: ONE story, the same as the app presentation
// (brochure/app-r4). Maya Patel, Harbour Clinic at $31.50/h, pay period 2 to 15 Nov 2026,
// 48.0 h, $1,512.00 before tax, about $1,368.36 after deductions, payday Fri 20 Nov.
// Every visual that uses this is labelled "Sample data". sample-data.test.ts checks the sums.

export const SAMPLE_RATE = 31.5;
export const SAMPLE_DEDUCTIONS = 143.64;

/** Month plan: planned $1,590.00 = bills $1,015.00 + groceries $400.00 + transport $175.00. */
export const SAMPLE_ALLOCATION = {
  income: 1590,
  segments: [
    { key: "bills", label: "Bills due", value: 1015, tone: "commit" as const },
    { key: "groceries", label: "Groceries", value: 400, tone: "soft" as const },
    { key: "transport", label: "Transport", value: 175, tone: "positive" as const },
  ],
};
/** Earned after deductions $1,368.36 against the plan leaves $221.64 still to earn. */
export const SAMPLE_STILL_TO_EARN = 221.64;

export const SAMPLE_SHIFTS = [
  { date: "Nov 2", employer: "Harbour Clinic", hours: 6.5, rate: SAMPLE_RATE, pay: 204.75 },
  { date: "Nov 3", employer: "Harbour Clinic", hours: 4.5, rate: SAMPLE_RATE, pay: 141.75 },
  { date: "Nov 5", employer: "Harbour Clinic", hours: 8, rate: SAMPLE_RATE, pay: 252 },
  { date: "Nov 6", employer: "Harbour Clinic", hours: 5, rate: SAMPLE_RATE, pay: 157.5 },
  { date: "Nov 9", employer: "Harbour Clinic", hours: 4, rate: SAMPLE_RATE, pay: 126 },
  { date: "Nov 10", employer: "Harbour Clinic", hours: 7.5, rate: SAMPLE_RATE, pay: 236.25 },
  { date: "Nov 12", employer: "Harbour Clinic", hours: 5, rate: SAMPLE_RATE, pay: 157.5 },
  { date: "Nov 13", employer: "Harbour Clinic", hours: 7.5, rate: SAMPLE_RATE, pay: 236.25 },
];

/** Cumulative gross earnings across the pay period, one point per shift date. */
export const SAMPLE_EARNINGS = SAMPLE_SHIFTS.reduce<{ label: string; value: number }[]>((acc, s) => {
  const prev = acc.length ? acc[acc.length - 1].value : 0;
  acc.push({ label: s.date, value: Math.round((prev + s.pay) * 100) / 100 });
  return acc;
}, []);

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
