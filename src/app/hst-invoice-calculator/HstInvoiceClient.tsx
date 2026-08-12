'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { SALES_TAX_RULES, getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateInvoice } from './invoiceCalc'

const ANALYTICS = { calculator: 'hst-invoice-calculator', category: 'GST/HST & Invoices' }

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

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

  const result = useMemo(() => {
    const { hours: h, rate: r } = fields
    if (h.error || r.error) return null
    // Rate comes ONLY from the verified rule — never hardcoded.
    return calculateInvoice({ hours: h.value!, rate: r.value!, taxPercent: rule.ratePercent })
  }, [fields, rule])

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
      {parsed.error && <p className="text-[#F87171] text-xs mt-1.5">{parsed.error}</p>}
    </div>
  )

  const taxLabel = `${rule.taxType} (${rule.ratePercent}%)`

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
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
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
            Your invoice
          </p>

          {/* Three-line invoice: the tax line is visually set apart because it
              is money you collect for the CRA, not money you earned. */}
          <dl className="max-w-md">
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-sm text-white/60 uppercase tracking-wide">
                Labour{' '}
                <span className="normal-case text-white/40">
                  ({Number(hours)} h × {money(Number(rate))})
                </span>
              </dt>
              <dd className="text-xl font-semibold text-white tabular-nums">
                {money(result.labour)}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 py-2 border-t border-white/10">
              <dt className="text-sm text-[#5EEAD4]/80 uppercase tracking-wide">+ {taxLabel}</dt>
              <dd className="text-xl font-semibold text-[#5EEAD4] tabular-nums">
                {money(result.tax)}
              </dd>
            </div>
            <p className="text-xs text-[#5EEAD4]/60 -mt-1 mb-2">
              collected for the CRA — not your income
            </p>

            <div className="flex items-baseline justify-between gap-4 py-3 border-t-2 border-white/20">
              <dt className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                = Total invoice
              </dt>
              <dd className="text-5xl font-bold text-white tracking-tight tabular-nums">
                {money(result.total)}
              </dd>
            </div>
          </dl>

          <p className="mt-3 text-sm text-white/50 max-w-md">
            You invoice <span className="text-white/80 font-medium">{money(result.total)}</span>,
            you earned <span className="text-white/80 font-medium">{money(result.labour)}</span>,
            and you remit{' '}
            <span className="text-[#5EEAD4] font-medium">{money(result.tax)}</span> to the CRA.
          </p>

          {rule.hasSeparatePst && (
            <p className="mt-3 text-xs text-[#FBBF24]/80 max-w-md">
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
            <ShiftFlowCta
              ct="hst-invoice-calculator"
              headline="Rebuilding this invoice every month?"
              sub="ShiftFlow tracks your invoiced work, HST, and expected settlements automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your invoice.</p>
      )}

      <SourceInfo rule={rule} />
    </div>
  )
}
