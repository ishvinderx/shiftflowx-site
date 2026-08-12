'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import { calculateReserve } from './reserveCalc'

const ANALYTICS = { calculator: 'tax-reserve-calculator', category: 'Contractor & Self-Employed' }

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

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
      {opts?.help && !parsed.error && <p className="text-white/35 text-xs mt-1.5">{opts.help}</p>}
      {parsed.error && <p className="text-[#F87171] text-xs mt-1.5">{parsed.error}</p>}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
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
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
            Estimated profit (revenue − expenses)
          </p>
          <p className="text-5xl font-bold text-white tracking-tight">{money(result.profit)}</p>

          {result.profit <= 0 ? (
            <p className="mt-5 text-white/60 text-sm">No profit this period — nothing to reserve.</p>
          ) : result.reserve === null ? (
            <p className="mt-5 text-white/60 text-sm">
              Enter your reserve percentage to see how much to set aside.
            </p>
          ) : (
            <dl className="mt-5 space-y-2 text-sm max-w-xs">
              <div className="flex justify-between">
                <dt className="text-white/50">Recommended reserve</dt>
                <dd className="text-[#5EEAD4] font-medium">{money(result.reserve)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">Left after reserve</dt>
                <dd className="text-white font-medium">{money(result.remaining!)}</dd>
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
            <ShiftFlowCta
              ct="tax-reserve-calculator"
              headline="Setting money aside every payment?"
              sub="ShiftFlow tracks income, expenses and tax reserves per shift automatically."
              label="Get ShiftFlow"
            />
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your reserve.</p>
      )}
    </div>
  )
}
