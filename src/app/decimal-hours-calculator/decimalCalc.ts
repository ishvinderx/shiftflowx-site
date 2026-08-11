// Pure hours↔decimal conversion, extracted verbatim from DecimalClient's inline
// useMemo so it is testable. Mirrors the original exactly: parseInt/parseFloat
// fall back to 0 on garbage, minutes clamp to 0–59, decimal→minutes uses
// Math.round, and dec is always toFixed(2).

export interface DecimalResult {
  dec: string
  h: number
  m: number
}

export function hmToDecimal(hours: string, minutes: string): DecimalResult {
  const h = Math.max(0, parseInt(hours) || 0)
  const m = Math.min(59, Math.max(0, parseInt(minutes) || 0))
  return { dec: (h + m / 60).toFixed(2), h, m }
}

export function decimalToHm(decimal: string): DecimalResult {
  const d = Math.max(0, parseFloat(decimal) || 0)
  const h = Math.floor(d)
  const m = Math.round((d - h) * 60)
  return { dec: d.toFixed(2), h, m }
}
