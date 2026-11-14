'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { getSalesTaxRule, SALES_TAX_RULES } from '@/lib/rules/salesTax'
import { addTax, removeTax } from './gstCalc'
import { inputCls, labelCls, calcGridCls, resultsCls } from '@/components/calculator/kit'

const CALCULATOR = 'gst-hst-calculator'
const CATEGORY = 'GST/HST & Invoices'


const money = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

type Direction = 'add' | 'remove'

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseAmount(raw: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: 'Enter an amount.' }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: 'Amount must be a number.' }
  if (n < 0) return { value: null, error: 'Amount can’t be negative.' }
  return { value: n, error: null }
}

export default function GstHstClient() {
  // Ontario default: most-searched jurisdiction, not a fabricated rate — the
  // rate still comes from the rules module.
  const [province, setProvince] = useState('ON')
  const [amount, setAmount] = useState('2600')
  const [direction, setDirection] = useState<Direction>('add')

  const rule = getSalesTaxRule(province)
  const parsed = useMemo(() => parseAmount(amount), [amount])

  const result = useMemo(() => {
    if (rule === null || parsed.value === null) return null
    return direction === 'add'
      ? addTax(parsed.value, rule.ratePercent)
      : removeTax(parsed.value, rule.ratePercent)
  }, [rule, parsed, direction])

  const analytics = { calculator: CALCULATOR, category: CATEGORY, jurisdiction: province }

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid result has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', analytics)
  }
  useEffect(() => {
    if (result === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', analytics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const directionBtn = (value: Direction, label: string) => (
    <button
      type="button"
      onClick={() => {
        markStarted()
        setDirection(value)
      }}
      aria-pressed={direction === value}
      className={`min-h-[44px] flex-1 border px-3 text-[0.9375rem] font-medium transition-colors ${
        direction === value
          ? 'border-ink bg-ink text-ground'
          : 'border-rule bg-transparent text-ink-2 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className={calcGridCls}>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="gst-province" className={labelCls}>
              Province or territory
            </label>
            <select
              id="gst-province"
              value={province}
              onChange={(e) => {
                markStarted()
                setProvince(e.target.value)
              }}
              className={inputCls}
            >
              {SALES_TAX_RULES.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.jurisdiction} — {r.ratePercent}% {r.taxType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="gst-amount" className={labelCls}>
              {direction === 'add' ? 'Amount before tax ($)' : 'Amount including tax ($)'}
            </label>
            <input
              id="gst-amount"
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => {
                markStarted()
                setAmount(e.target.value)
              }}
              className={inputCls}
              aria-invalid={parsed.error !== null}
            />
            {parsed.error && <p className="text-alert text-[0.875rem] mt-1.5">{parsed.error}</p>}
          </div>

          <div className="sm:col-span-2">
            <span className={labelCls}>Direction</span>
            <div className="flex gap-2 max-w-xs" role="group" aria-label="Direction">
              {directionBtn('add', 'Add tax')}
              {directionBtn('remove', 'Remove tax')}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null && rule !== null ? (
        <div className={resultsCls}>
          <p className="t-label mb-1.5">
            {direction === 'add' ? 'Total including tax' : 'Pre-tax amount'}
          </p>
          <p className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
            {money(direction === 'add' ? result.total : result.preTax)}
          </p>

          <dl className="ledger-dl mt-6">
            <div className="flex justify-between">
              <dt className="text-ink-2">Pre-tax amount</dt>
              <dd className="text-ink font-medium">{money(result.preTax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">
                {rule.taxType} ({rule.ratePercent}%)
              </dt>
              <dd className="text-positive font-medium">{money(result.tax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">Total including tax</dt>
              <dd className="text-ink font-medium">{money(result.total)}</dd>
            </div>
          </dl>

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', analytics)
              }
            }}
          >
            <AppCta
              ct="gst-hst-calculator"
              headline="Invoicing with GST/HST every month?"
              sub="HoursFlow tracks GST/HST on contractor earnings automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see your result.</p>
      )}

      {rule !== null && (
        <>
          {rule.hasSeparatePst && (
            <p className="text-[0.875rem] text-ink-2 leading-relaxed max-w-md">
              This is GST only — {rule.jurisdiction} also charges a separate PST/QST that is
              not included here.
            </p>
          )}
          <SourceInfo rule={rule} />
        </>
      )}
    </div>
  )
}
