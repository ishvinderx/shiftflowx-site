'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import { calculateTakeHome, type DeductionKind } from './takeHomeCalc'

const ANALYTICS = { calculator: 'take-home-pay-calculator', category: 'Pay & Earnings' }

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const FREQUENCIES = [
  { value: 'weekly', label: 'Weekly', per: 'per week' },
  { value: 'biweekly', label: 'Biweekly', per: 'per two weeks' },
  { value: 'monthly', label: 'Monthly', per: 'per month' },
  { value: 'annual', label: 'Annual', per: 'per year' },
] as const

type Frequency = (typeof FREQUENCIES)[number]['value']

interface RowDraft {
  id: number
  label: string
  kind: DeductionKind
  value: string
}

// Zero-as-data rule: an empty value means "not entered yet" — the row is
// ignored, with no error. Only entered values are validated.
function rowError(row: RowDraft): string | null {
  if (row.value.trim() === '') return null
  const n = Number(row.value)
  if (!Number.isFinite(n)) return 'Must be a number.'
  if (n < 0) return 'Can’t be negative.'
  if (row.kind === 'percent' && n > 100) return 'Percent must be between 0 and 100.'
  return null
}

// Invalid gross NEVER becomes a displayed $0 — it shows a message and no result.
function parseGross(raw: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: 'Enter your gross pay.' }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: 'Gross pay must be a number.' }
  if (n < 0) return { value: null, error: 'Gross pay can’t be negative.' }
  return { value: n, error: null }
}

export default function TakeHomeClient() {
  const [gross, setGross] = useState('4000')
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const [rows, setRows] = useState<RowDraft[]>([
    { id: 1, label: 'Income tax', kind: 'percent', value: '' },
    { id: 2, label: 'CPP', kind: 'amount', value: '' },
    { id: 3, label: 'EI', kind: 'amount', value: '' },
  ])
  const nextId = useRef(4)

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid net estimate has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }

  const grossParsed = useMemo(() => parseGross(gross), [gross])
  const rowErrors = useMemo(() => rows.map(rowError), [rows])
  const enteredRows = useMemo(
    () => rows.filter((r, i) => r.value.trim() !== '' && rowErrors[i] === null),
    [rows, rowErrors],
  )
  const hasErrors = grossParsed.error !== null || rowErrors.some((e) => e !== null)

  const result = useMemo(() => {
    if (hasErrors || enteredRows.length === 0) return null
    return calculateTakeHome(
      grossParsed.value!,
      enteredRows.map((r) => ({
        label: r.label.trim() === '' ? 'Deduction' : r.label,
        kind: r.kind,
        value: Number(r.value),
      })),
    )
  }, [hasErrors, enteredRows, grossParsed])

  useEffect(() => {
    if (result === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const updateRow = (id: number, patch: Partial<RowDraft>) => {
    markStarted()
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }
  const addRow = () => {
    markStarted()
    setRows((prev) => [...prev, { id: nextId.current++, label: '', kind: 'percent', value: '' }])
  }
  const removeRow = (id: number) => {
    markStarted()
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const per = FREQUENCIES.find((f) => f.value === frequency)!.per
  const exceedsGross = result !== null && result.totalDeductions > result.gross

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="th-gross" className={labelCls}>
              Gross pay ($)
            </label>
            <input
              id="th-gross"
              type="number"
              min={0}
              step="0.01"
              value={gross}
              onChange={(e) => {
                markStarted()
                setGross(e.target.value)
              }}
              className={inputCls}
              aria-invalid={grossParsed.error !== null}
            />
            {grossParsed.error && (
              <p className="text-[#F87171] text-xs mt-1.5">{grossParsed.error}</p>
            )}
          </div>
          <div>
            <label htmlFor="th-frequency" className={labelCls}>
              Pay frequency
            </label>
            <select
              id="th-frequency"
              value={frequency}
              onChange={(e) => {
                markStarted()
                setFrequency(e.target.value as Frequency)
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
        </div>

        <div className="mt-6">
          <p className={labelCls}>Deductions (from your paystub)</p>
          <p className="text-white/40 text-xs mb-3">
            Enter dollar-amount deductions for the same period as your gross pay. Rows without a
            value are ignored.
          </p>
          <div className="space-y-3">
            {rows.map((row, i) => (
              <div key={row.id}>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_9.5rem_7.5rem_auto] gap-2">
                  <input
                    type="text"
                    value={row.label}
                    onChange={(e) => updateRow(row.id, { label: e.target.value })}
                    placeholder="e.g. Income tax"
                    aria-label="Deduction name"
                    className={inputCls}
                  />
                  <select
                    value={row.kind}
                    onChange={(e) => updateRow(row.id, { kind: e.target.value as DeductionKind })}
                    aria-label="Deduction type"
                    className={inputCls}
                  >
                    <option value="percent">% of gross</option>
                    <option value="amount">$ amount</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={row.value}
                    onChange={(e) => updateRow(row.id, { value: e.target.value })}
                    placeholder={row.kind === 'percent' ? '%' : '$'}
                    aria-label={`${row.label || 'Deduction'} value`}
                    aria-invalid={rowErrors[i] !== null}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    aria-label={`Remove ${row.label || 'deduction'} row`}
                    className="text-white/40 hover:text-white text-sm px-3 py-2.5 border border-white/10 rounded-xl transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {rowErrors[i] && <p className="text-[#F87171] text-xs mt-1.5">{rowErrors[i]}</p>}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRow}
            className="mt-3 text-sm text-white/60 hover:text-white border border-white/10 rounded-full px-4 py-2 transition-colors"
          >
            + Add deduction
          </button>
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {hasErrors ? (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your estimate.</p>
      ) : result === null ? (
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
            Gross pay
          </p>
          <p className="text-3xl font-bold text-white tracking-tight">
            {money(grossParsed.value!)} <span className="text-white/40 text-base font-normal">{per}</span>
          </p>
          <p className="text-white/50 text-sm mt-3">
            Enter your deductions to estimate take-home pay.
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <dl className="space-y-2 text-sm max-w-xs">
            <div className="flex justify-between">
              <dt className="text-white/50">Gross pay</dt>
              <dd className="text-white font-medium">{money(result.gross)}</dd>
            </div>
            {result.rows.map((r, i) => (
              <div key={i} className="flex justify-between pl-4">
                <dt className="text-white/40">{r.label}</dt>
                <dd className="text-white/60">−{money(r.amount)}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-white/10 pt-2">
              <dt className="text-white/50">Total deductions</dt>
              <dd className="text-[#5EEAD4] font-medium">−{money(result.totalDeductions)}</dd>
            </div>
          </dl>

          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mt-5 mb-1.5">
            Estimated take-home pay
          </p>
          <p
            className={`text-5xl font-bold tracking-tight ${result.net < 0 ? 'text-[#F87171]' : 'text-white'}`}
          >
            {money(result.net)} <span className="text-white/40 text-lg font-normal">{per}</span>
          </p>

          {exceedsGross && (
            <p className="text-[#F87171] text-sm mt-3">
              Deductions exceed gross pay — check your entries.
            </p>
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
              ct="take-home-pay-calculator"
              headline="Guessing what a shift is worth?"
              sub="ShiftFlow tracks your expected pay per shift, so you know your gross before payday."
            />
          </div>
        </div>
      )}
    </div>
  )
}
