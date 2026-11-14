// Sample data for the live ledger visuals. Every visual that uses this is labelled
// "Sample data". Numbers are internally consistent (sample-data.test.ts checks the sums).

export const SAMPLE_ALLOCATION = {
  income: 2400,
  segments: [
    { key: "bills", label: "Bills due", value: 1015, tone: "commit" as const },
    { key: "plan", label: "Rest of plan", value: 575, tone: "soft" as const },
    { key: "available", label: "Available", value: 810, tone: "positive" as const },
  ],
};

export const SAMPLE_SHIFTS = [
  { date: "Nov 7", employer: "Northside Grocery", hours: 5, rate: 26, pay: 130 },
  { date: "Nov 9", employer: "Harbour Clinic", hours: 6, rate: 31.5, pay: 189 },
  { date: "Nov 10", employer: "Northside Grocery", hours: 8, rate: 26, pay: 208 },
  { date: "Nov 11", employer: "Harbour Clinic", hours: 6, rate: 31.5, pay: 189 },
  { date: "Nov 12", employer: "Northside Grocery", hours: 6, rate: 26, pay: 156 },
];

/** Cumulative gross earnings across the pay period, one point per shift date. */
export const SAMPLE_EARNINGS = SAMPLE_SHIFTS.reduce<{ label: string; value: number }[]>((acc, s) => {
  const prev = acc.length ? acc[acc.length - 1].value : 0;
  acc.push({ label: s.date, value: prev + s.pay });
  return acc;
}, []);

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 });
