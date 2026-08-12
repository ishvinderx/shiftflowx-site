'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import { calculateGrossPay, type PayFrequency } from './grossPayCalc'

const ANALYTICS = { calculator: 'gross-pay-calculator', category: 'Pay & Earnings' }

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const FREQUENCIES: { value: PayFrequency; label: string }[] = [
  { value: 'hourly', label: 'Per hour' },
  { value: 'daily', label: 'Per day' },
  { value: 'weekly', label: 'Per week' },
  { value: 'biweekly', label: 'Every two weeks' },
  { value: 'monthly', label: 'Per month' },
  { value: 'annual', label: 'Per year' },
]

// Invalid input NEVER becomes a displayed $0 — it shows a message and no
// result. All three numeric fields must be > 0: a $0 amount converts to a
// meaningless table of zeros, and hours/days per week divide the weekly figure.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n <= 0) return { value: null, error: `${label} must be greater than zero.` }
  return { value: n, error: null }
}

export default function GrossPayClient() {
  const [amount, setAmount] = useState('25')
  const [frequency, setFrequency] = useState<PayFrequency>('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [daysPerWeek, setDaysPerWeek] = useState('5')

  const fields = useMemo(
    () => ({
      amount: parseField(amount, 'a pay amount'),
      hoursPerWeek: parseField(hoursPerWeek, 'hours per week'),
      daysPerWeek: parseField(daysPerWeek, 'days per week'),
    }),
    [amount, hoursPerWeek, daysPerWeek],
  )

  const result = useMemo(() => {
    const { amount: a, hoursPerWeek: h, daysPerWeek: d } = fields
    if (a.error || h.error || d.error) return null
    return calculateGrossPay({
      amount: a.value!,
      frequency,
      hoursPerWeek: h.value!,
      daysPerWeek: d.value!,
    })
  }, [fields, frequency])

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
      {parsed.error && <p className="text-[#F87171] text-xs mt-1.5">{parsed.error}</p>}
    </div>
  )

  const rows: { label: string; value: number }[] = result
    ? [
        { label: 'Per hour', value: result.hourly },
        { label: 'Per day', value: result.daily },
        { label: 'Per week', value: result.weekly },
        { label: 'Every two weeks', value: result.biweekly },
        { label: 'Per month', value: result.monthly },
        { label: 'Per year', value: result.annual },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('gp-amount', 'Gross pay amount ($)', amount, setAmount, fields.amount, { step: '0.01' })}
          <div>
            <label htmlFor="gp-frequency" className={labelCls}>
              That amount is
            </label>
            <select
              id="gp-frequency"
              value={frequency}
              onChange={(e) => {
                markStarted()
                setFrequency(e.target.value as PayFrequency)
              }}
              className={inputCls}
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
          {/* Hours/days per week are always needed: the result grid always
              derives hourly and daily figures from the weekly amount. */}
          {field('gp-hours-week', 'Hours per week', hoursPerWeek, setHoursPerWeek, fields.hoursPerWeek)}
          {field('gp-days-week', 'Days per week', daysPerWeek, setDaysPerWeek, fields.daysPerWeek)}
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
            Gross pay by period
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-2xl">
            {rows.map((r) => (
              <div key={r.label} className="flex justify-between border-b border-white/[0.06] py-2">
                <dt className="text-white/50">{r.label}</dt>
                <dd
                  className={
                    r.label === FREQUENCIES.find((f) => f.value === frequency)?.label
                      ? 'text-[#5EEAD4] font-medium'
                      : 'text-white font-medium'
                  }
                >
                  {money(r.value)}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', ANALYTICS)
              }
            }}
          >
            <ShiftFlowCta
              ct="gross-pay-calculator"
              headline="Want to know what every paycheck should be?"
              sub="ShiftFlow tracks your shifts and shows your expected gross pay for each pay period automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your pay.</p>
      )}
    </div>
  )
}
