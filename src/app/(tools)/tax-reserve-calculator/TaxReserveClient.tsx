'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import { calculateReserve } from './reserveCalc'
import { inputCls, labelCls, calcGridCls, resultsCls } from '@/components/calculator/kit'

const ANALYTICS = { calculator: 'tax-reserve-calculator', category: 'Contractor & Self-Employed' }


const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  return { value: n, error: null }
}

// Reserve percent: empty is NOT an error — it means "not entered yet" and the
// result shows profit only with a prompt. Absence ≠ 0%.
function parsePercent(raw: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: null }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: 'Reserve percentage must be a number.' }
  if (n < 0 || n > 100) return { value: null, error: 'Reserve percentage must be between 0 and 100.' }
  return { value: n, error: null }
}

export default function TaxReserveClient() {
  const [revenue, setRevenue] = useState('2600')
  const [expenses, setExpenses] = useState('400')
  const [percent, setPercent] = useState('')

  const fields = useMemo(
    () => ({
      revenue: parseField(revenue, 'your business revenue'),
      expenses: parseField(expenses, 'your business expenses'),
      percent: parsePercent(percent),
    }),
    [revenue, expenses, percent],
  )

  const result = useMemo(() => {
    const { revenue: r, expenses: e, percent: p } = fields
    if (r.error || e.error || p.error) return null
    return calculateReserve({ revenue: r.value!, expenses: e.value!, reservePercent: p.value })
  }, [fields])

  // Once-per-mount analytics: started on first input interaction, completed
  // when a full result (percent entered) has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }
  useEffect(() => {
    if (result === null || result.reserve === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const field = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void,
    parsed: { error: string | null },
    opts?: { step?: string; max?: number; help?: string; placeholder?: string },
  ) => (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        max={opts?.max}
        step={opts?.step ?? 'any'}
        value={value}
        placeholder={opts?.placeholder}
        onChange={(e) => {
          markStarted()
          set(e.target.value)
        }}
        className={inputCls}
        aria-invalid={parsed.error !== null}
      />
      {opts?.help && !parsed.error && <p className="text-ink-2 text-[0.875rem] mt-1.5">{opts.help}</p>}
      {parsed.error && <p className="text-alert text-[0.875rem] mt-1.5">{parsed.error}</p>}
    </div>
  )

  return (
    <div className={calcGridCls}>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {field('tr-revenue', 'Business revenue ($)', revenue, setRevenue, fields.revenue, {
            step: '0.01',
            help: 'Your labour/sales revenue, not including GST/HST you collected.',
          })}
          {field('tr-expenses', 'Business expenses ($)', expenses, setExpenses, fields.expenses, {
            step: '0.01',
          })}
          {field('tr-percent', 'Reserve percent (%)', percent, setPercent, fields.percent, {
            step: '0.1',
            max: 100,
            placeholder: 'e.g. 25',
            help: 'Your own number — from a tax professional or last year’s return.',
          })}
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className={resultsCls}>
          <p className="t-label mb-1.5">
            Estimated profit (revenue − expenses)
          </p>
          <p className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink">{money(result.profit)}</p>

          {result.profit <= 0 ? (
            <p className="mt-5 text-ink-2 text-sm">No profit this period — nothing to reserve.</p>
          ) : result.reserve === null ? (
            <p className="mt-5 text-ink-2 text-sm">
              Enter your reserve percentage to see how much to set aside.
            </p>
          ) : (
            <dl className="ledger-dl mt-6">
              <div className="flex justify-between">
                <dt className="text-ink-2">Recommended reserve</dt>
                <dd className="text-positive font-medium">{money(result.reserve)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Left after reserve</dt>
                <dd className="text-ink font-medium">{money(result.remaining!)}</dd>
              </div>
            </dl>
          )}

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', ANALYTICS)
              }
            }}
          >
            <AppCta
              ct="tax-reserve-calculator"
              headline="Setting money aside every payment?"
              sub="HoursFlow tracks income, expenses and tax reserves per shift automatically."
              label="Get HoursFlow"
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see your reserve.</p>
      )}
    </div>
  )
}
