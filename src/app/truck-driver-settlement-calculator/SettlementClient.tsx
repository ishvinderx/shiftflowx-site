'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { SALES_TAX_RULES, getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateSettlement, type GstHstStatus } from './settlementCalc'

const ANALYTICS = { calculator: 'truck-driver-settlement-calculator', category: 'Owner-Operator & Trucking' }

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

const money = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  return { value: n, error: null }
}

// Optional field: blank means "not entered" (null value, no error) — never $0.
function parseOptionalField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: null }
  return parseField(raw, label)
}

const REGISTRATION_OPTIONS: { value: GstHstStatus; label: string }[] = [
  { value: 'registered', label: 'Registered' },
  { value: 'not-registered', label: 'Not registered' },
  { value: 'unknown', label: 'Not sure' },
]

// Statement row: LABEL …… value
function StatementRow({
  label,
  value,
  valueCls = 'text-white font-medium',
}: {
  label: string
  value: string
  valueCls?: string
}) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-xs font-semibold text-white/50 uppercase tracking-wide whitespace-nowrap">
        {label}
      </dt>
      <div className="flex-1 border-b border-dotted border-white/20 translate-y-[-3px]" aria-hidden />
      <dd className={valueCls}>{value}</dd>
    </div>
  )
}

export default function SettlementClient() {
  const [hours, setHours] = useState('100')
  const [rate, setRate] = useState('26')
  const [status, setStatus] = useState<GstHstStatus>('registered')
  const [province, setProvince] = useState('')
  const [deductions, setDeductions] = useState('')

  const fields = useMemo(
    () => ({
      hours: parseField(hours, 'hours worked'),
      rate: parseField(rate, 'an hourly rate'),
      deductions: parseOptionalField(deductions, 'carrier deductions'),
    }),
    [hours, rate, deductions],
  )

  const rule = status === 'registered' && province !== '' ? getSalesTaxRule(province) : null
  const needsProvince = status === 'registered' && rule === null

  const result = useMemo(() => {
    const { hours: h, rate: r, deductions: d } = fields
    if (h.error || r.error || d.error) return null
    if (status === 'registered' && rule === null) return null
    return calculateSettlement({
      hours: h.value!,
      rate: r.value!,
      gstHstStatus: status,
      taxPercent: rule ? rule.ratePercent : null,
      carrierDeductions: d.value,
    })
  }, [fields, status, rule])

  const analyticsProps = rule ? { ...ANALYTICS, jurisdiction: rule.code } : ANALYTICS

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid result has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', analyticsProps)
  }
  useEffect(() => {
    if (result === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', analyticsProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const field = (
    id: string,
    label: string,
    value: string,
    set: (v: string) => void,
    parsed: { error: string | null },
    opts?: { step?: string; placeholder?: string },
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
        placeholder={opts?.placeholder}
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

  const taxLabel = rule ? `${rule.taxType} (${rule.ratePercent}%)` : 'GST/HST'
  const deductionsEntered = fields.deductions.value !== null && fields.deductions.error === null

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('ts-hours', 'Hours worked', hours, setHours, fields.hours)}
          {field('ts-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
        </div>

        <fieldset>
          <legend className={labelCls}>GST/HST registration</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {REGISTRATION_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="ts-registration"
                  value={opt.value}
                  checked={status === opt.value}
                  onChange={() => {
                    markStarted()
                    setStatus(opt.value)
                  }}
                  className="accent-[#D63C6B]"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {status === 'registered' && (
          <div>
            <label htmlFor="ts-province" className={labelCls}>
              Province or territory
            </label>
            <select
              id="ts-province"
              value={province}
              onChange={(e) => {
                markStarted()
                setProvince(e.target.value)
              }}
              className={inputCls}
            >
              <option value="">Select province…</option>
              {SALES_TAX_RULES.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.jurisdiction} — {r.taxType} {r.ratePercent}%
                </option>
              ))}
            </select>
            {rule?.hasSeparatePst && (
              <p className="text-white/45 text-xs mt-1.5">
                {rule.jurisdiction} charges a separate PST/QST on top of GST — it is not included here.
              </p>
            )}
          </div>
        )}

        {status === 'not-registered' && (
          <p className="text-white/45 text-xs">
            Not GST/HST registered — your expected payment is your work earnings only, with no tax added.
          </p>
        )}

        {field('ts-deductions', 'Carrier deductions ($, optional)', deductions, setDeductions, fields.deductions, {
          step: '0.01',
          placeholder: 'e.g. fuel advances, admin fees',
        })}
      </div>

      {/* ── Result: the expected-settlement statement ──────────────────────── */}
      {result !== null ? (
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-4">
            What your settlement should say
          </p>

          <dl className="space-y-3 max-w-md">
            <StatementRow label="Work earnings" value={money(result.earnings)} />

            {result.tax !== null && (
              <div>
                <StatementRow label={taxLabel} value={money(result.tax)} valueCls="text-[#5EEAD4] font-medium" />
                <p className="text-white/45 text-xs mt-1 text-right">collected for the CRA — not earnings</p>
              </div>
            )}

            {result.expectedPayment !== null ? (
              <div className="flex items-baseline gap-3 pt-1">
                <dt className="text-xs font-semibold text-white/70 uppercase tracking-wide whitespace-nowrap">
                  Expected payment
                </dt>
                <div className="flex-1 border-b border-dotted border-white/20 translate-y-[-6px]" aria-hidden />
                <dd className="text-5xl font-bold text-white tracking-tight">{money(result.expectedPayment)}</dd>
              </div>
            ) : (
              <div className="pt-1">
                <StatementRow label="Expected payment" value="Incomplete" valueCls="text-white/50 font-medium italic" />
                <p className="text-[#FBBF24] text-xs mt-1.5">
                  GST/HST not calculated — registration status required.
                </p>
              </div>
            )}

            {deductionsEntered && result.netAfterDeductions !== null && (
              <>
                <StatementRow
                  label="Minus carrier deductions"
                  value={`−${money(fields.deductions.value!)}`}
                  valueCls="text-white/70 font-medium"
                />
                <StatementRow
                  label="Expected net settlement"
                  value={money(result.netAfterDeductions)}
                  valueCls="text-2xl font-bold text-white tracking-tight"
                />
              </>
            )}
          </dl>

          <p className="text-white/50 text-sm mt-5">
            Settlement short? Compare this against the statement your carrier sent.
          </p>

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', analyticsProps)
              }
            }}
          >
            <ShiftFlowCta
              ct="truck-driver-settlement-calculator"
              headline="Verify every settlement, not just this one."
              sub="ShiftFlow logs every hour you drive, so you can check each statement your carrier sends against your own records."
            />
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-sm">
          {needsProvince && !fields.hours.error && !fields.rate.error && !fields.deductions.error
            ? 'Select your province to calculate GST/HST and see your expected settlement.'
            : 'Fix the highlighted fields to see your expected settlement.'}
        </p>
      )}

      {rule && <SourceInfo rule={rule} />}
    </div>
  )
}
