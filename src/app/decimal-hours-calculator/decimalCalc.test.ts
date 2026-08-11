import { describe, expect, it } from 'vitest'
import { decimalToHm, hmToDecimal } from './decimalCalc'

// Pins the exact behavior of the previously-inline DecimalClient logic.

describe('hmToDecimal', () => {
  it('8h 45m → 8.75', () => {
    expect(hmToDecimal('8', '45')).toEqual({ dec: '8.75', h: 8, m: 45 })
  })

  it('clamps minutes to 0–59 and floors negatives to 0', () => {
    expect(hmToDecimal('8', '75').m).toBe(59)
    expect(hmToDecimal('-3', '-10')).toEqual({ dec: '0.00', h: 0, m: 0 })
  })

  it('garbage input falls back to 0', () => {
    expect(hmToDecimal('abc', '')).toEqual({ dec: '0.00', h: 0, m: 0 })
  })
})

describe('decimalToHm', () => {
  it('8.75 → 8h 45m', () => {
    expect(decimalToHm('8.75')).toEqual({ dec: '8.75', h: 8, m: 45 })
  })

  it('0.99 edge: Math.round(0.99×60) = 59', () => {
    expect(decimalToHm('0.99')).toEqual({ dec: '0.99', h: 0, m: 59 })
  })

  it('negatives clamp to 0, garbage falls back to 0', () => {
    expect(decimalToHm('-2')).toEqual({ dec: '0.00', h: 0, m: 0 })
    expect(decimalToHm('nope')).toEqual({ dec: '0.00', h: 0, m: 0 })
  })
})
