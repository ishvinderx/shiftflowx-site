'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import { calculateHourlyPay } from './payCalc'
import { inputCls, labelCls, calcGridCls, resultsCls } from '@/components/calculator/kit'

const ANALYTICS = { calculator: 'hourly-pay-calculator', category: 'Pay & Earnings' }


const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  return { value: n, error: null }
}

export default function HourlyPayClient() {
  const [hours, setHours] = useState('40')
  const [rate, setRate] = useState('25')
  const [otHours, setOtHours] = useState('0')
  const [otMultiplier, setOtMultiplier] = useState('1.5')

  const fields = useMemo(
    () => ({
      hours: parseField(hours, 'hours worked'),
      rate: parseField(rate, 'an hourly rate'),
      otHours: parseField(otHours, 'overtime hours'),
      otMultiplier: parseField(otMultiplier, 'an overtime multiplier'),
    }),
    [hours, rate, otHours, otMultiplier],
  )

  const result = useMemo(() => {
    const { hours: h, rate: r, otHours: oh, otMultiplier: om } = fields
    if (h.error || r.error || oh.error || om.error) return null
    return calculateHourlyPay({
      hours: h.value!,
      hourlyRate: r.value!,
      overtimeHours: oh.value!,
      overtimeMultiplier: om.value!,
    })
  }, [fields])

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid result has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }
  useEffect(() => {
    if (result === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const field = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void,
    parsed: { error: string | null },
    opts?: { step?: string },
  ) => (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        step={opts?.step ?? 'any'}
        value={value}
        onChange={(e) => {
          markStarted()
          set(e.target.value)
        }}
        className={inputCls}
        aria-invalid={parsed.error !== null}
      />
      {parsed.error && <p className="text-alert text-[0.875rem] mt-1.5">{parsed.error}</p>}
    </div>
  )

  return (
    <div className={calcGridCls}>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('hp-hours', 'Hours worked', hours, setHours, fields.hours)}
          {field('hp-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
          {field('hp-ot-hours', 'Overtime hours (optional)', otHours, setOtHours, fields.otHours)}
          {field('hp-ot-mult', 'Overtime multiplier', otMultiplier, setOtMultiplier, fields.otMultiplier, { step: '0.1' })}
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className={resultsCls}>
          <p className="t-label mb-1.5">
            Estimated gross pay
          </p>
          <p className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink">{money(result.grossPay)}</p>

          <dl className="ledger-dl mt-6">
            <div className="flex justify-between">
              <dt className="text-ink-2">Regular pay</dt>
              <dd className="text-ink font-medium">{money(result.regularPay)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">Overtime pay</dt>
              <dd className="text-positive font-medium">{money(result.overtimePay)}</dd>
            </div>
          </dl>

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', ANALYTICS)
              }
            }}
          >
            <AppCta
              ct="hourly-pay-calculator"
              headline="Doing this math every payday?"
              sub="HoursFlow tracks your shifts and calculates regular, overtime, and gross pay automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see your pay.</p>
      )}
    </div>
  )
}
