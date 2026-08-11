// Shared time primitives used by every calculator. Pure, no React.

/** Minutes from "HH:MM" start to "HH:MM" end; end <= start wraps overnight (+24h). */
export function minutesBetween(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let mins = (eh * 60 + em) - (sh * 60 + sm)
  if (mins <= 0) mins += 24 * 60 // overnight shift
  return mins
}

/** 485 → "8h 05m" */
export function fmtHM(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m.toString().padStart(2, '0')}m`
}
