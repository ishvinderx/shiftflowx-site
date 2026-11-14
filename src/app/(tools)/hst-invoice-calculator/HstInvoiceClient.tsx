'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { SALES_TAX_RULES, getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateInvoice } from './invoiceCalc'
import { inputCls, labelCls, calcGridCls, resultsCls } from '@/components/calculator/kit'

const ANALYTICS = { calculator: 'hst-invoice-calculator', category: 'GST/HST & Invoices' }


const money = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

// Invalid input NEVER becomes a displayed $0 invoice — it shows a message and
// no result. Both fields must be greater than zero: a $0 invoice is not real.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n <= 0) return { value: null, error: `${label} must be greater than 0.` }
  return { value: n, error: null }
}

export default function HstInvoiceClient() {
  const [hours, setHours] = useState('100')
  const [rate, setRate] = useState('26')
  const [province, setProvince] = useState('ON')

  const rule = getSalesTaxRule(province) ?? getSalesTaxRule('ON')!
  const analytics = { ...ANALYTICS, jurisdiction: rule.code }

  const fields = useMemo(
    () => ({
      hours: parseField(hours, 'Hours'),
      rate: parseField(rate, 'Hourly rate'),
    }),
    [hours, rate],
  )

  // Plain computation — the React Compiler memoizes; a manual useMemo here
  // tripped react-hooks/preserve-manual-memoization.
  const result =
    fields.hours.error || fields.rate.error
      ? null
      : // Rate comes ONLY from the verified rule — never hardcoded.
        calculateInvoice({ hours: fields.hours.value!, rate: fields.rate.value!, taxPercent: rule.ratePercent })

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

  const taxLabel = `${rule.taxType} (${rule.ratePercent}%)`

  return (
    <div className={calcGridCls}>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {field('hst-hours', 'Hours worked', hours, setHours, fields.hours)}
          {field('hst-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
          <div>
            <label htmlFor="hst-province" className={labelCls}>
              Province
            </label>
            <select
              id="hst-province"
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
        </div>
      </div>

      {/* ── Result: LABOUR + GST/HST = TOTAL INVOICE ───────────────────────── */}
      {result !== null ? (
        <div className={resultsCls}>
          <p className="t-label mb-4">
            Your invoice
          </p>

          {/* Three-line invoice: the tax line is visually set apart because it
              is money you collect for the CRA, not money you earned. */}
          <dl className="ledger-dl mt-6">
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-sm text-ink-2 uppercase tracking-wide">
                Labour{' '}
                <span className="normal-case text-ink-2">
                  ({Number(hours)} h × {money(Number(rate))})
                </span>
              </dt>
              <dd className="text-xl font-semibold text-ink tabular-nums">
                {money(result.labour)}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 py-2 border-t border-rule">
              <dt className="text-sm text-positive/80 uppercase tracking-wide">+ {taxLabel}</dt>
              <dd className="text-xl font-semibold text-positive tabular-nums">
                {money(result.tax)}
              </dd>
            </div>
            <p className="text-[0.875rem] text-positive/60 -mt-1 mb-2">
              collected for the CRA — not your income
            </p>

            <div className="flex items-baseline justify-between gap-4 py-3 border-t-2 border-rule">
              <dt className="text-sm font-semibold text-ink uppercase tracking-wide">
                = Total invoice
              </dt>
              <dd className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                {money(result.total)}
              </dd>
            </div>
          </dl>

          <p className="mt-3 text-sm text-ink-2 max-w-md">
            You invoice <span className="text-ink font-medium">{money(result.total)}</span>,
            you earned <span className="text-ink font-medium">{money(result.labour)}</span>,
            and you remit{' '}
            <span className="text-positive font-medium">{money(result.tax)}</span> to the CRA.
          </p>

          {rule.hasSeparatePst && (
            <p className="mt-3 text-[0.875rem] text-ink-2 max-w-md">
              Does not include PST/QST — {rule.jurisdiction} charges a separate provincial sales
              tax on top of the {rule.ratePercent}% {rule.taxType}.
            </p>
          )}

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', analytics)
              }
            }}
          >
            <AppCta
              ct="hst-invoice-calculator"
              headline="Rebuilding this invoice every month?"
              sub="HoursFlow tracks your invoiced work, HST, and expected settlements automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see your invoice.</p>
      )}

      <SourceInfo rule={rule} />
    </div>
  )
}
