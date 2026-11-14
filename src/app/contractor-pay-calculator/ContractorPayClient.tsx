'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { SALES_TAX_RULES, getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateContractorPay } from './contractorCalc'

const ANALYTICS = { calculator: 'contractor-pay-calculator', category: 'Contractor & Self-Employed' }

const inputCls =
  'w-full bg-track/40 border border-rule rounded-xl px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-ink/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-ink-2 uppercase tracking-wide mb-1.5'

const money = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

type Registration = 'registered' | 'unregistered' | 'unsure'

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  return { value: n, error: null }
}

// Optional field: empty is "not provided" (null value, no error) — absence ≠ 0.
function parseOptionalField(raw: string, label: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: null }
  return parseField(raw, label)
}

export default function ContractorPayClient() {
  const [hours, setHours] = useState('100')
  const [rate, setRate] = useState('26')
  const [registration, setRegistration] = useState<Registration>('unsure')
  const [province, setProvince] = useState('')
  const [expenses, setExpenses] = useState('0')
  const [reservePercent, setReservePercent] = useState('')

  const fields = useMemo(
    () => ({
      hours: parseField(hours, 'billable hours'),
      rate: parseField(rate, 'an hourly rate'),
      expenses: parseField(expenses, 'business expenses'),
      reservePercent: parseOptionalField(reservePercent, 'a reserve percent'),
    }),
    [hours, rate, expenses, reservePercent],
  )

  const rule = registration === 'registered' && province ? getSalesTaxRule(province) : null

  const result = useMemo(() => {
    const { hours: h, rate: r, expenses: e, reservePercent: rp } = fields
    if (h.error || r.error || e.error || rp.error) return null
    return calculateContractorPay({
      hours: h.value!,
      rate: r.value!,
      salesTaxPercent: rule ? rule.ratePercent : null,
      expenses: e.value!,
      reservePercent: rp.value,
    })
  }, [fields, rule])

  const analytics = useMemo(
    () => (rule ? { ...ANALYTICS, jurisdiction: rule.code } : ANALYTICS),
    [rule],
  )

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
  }, [result, analytics])

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
      {parsed.error && <p className="text-alert text-xs mt-1.5">{parsed.error}</p>}
    </div>
  )

  const row = (label: string, value: string, accent = false) => (
    <div className="flex justify-between">
      <dt className="text-ink-2">{label}</dt>
      <dd className={`font-medium ${accent ? 'text-positive' : 'text-ink'}`}>{value}</dd>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-track/40 border border-rule rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('cp-hours', 'Billable hours', hours, setHours, fields.hours)}
          {field('cp-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
        </div>

        <fieldset>
          <legend className={labelCls}>GST/HST registration status</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
            {(
              [
                ['registered', 'Registered'],
                ['unregistered', 'Not registered'],
                ['unsure', 'Not sure'],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="cp-registration"
                  value={value}
                  checked={registration === value}
                  onChange={() => {
                    markStarted()
                    setRegistration(value)
                  }}
                  className="accent-ink"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {registration === 'registered' && (
          <div>
            <label htmlFor="cp-province" className={labelCls}>
              Province / territory
            </label>
            <select
              id="cp-province"
              value={province}
              onChange={(e) => {
                markStarted()
                setProvince(e.target.value)
              }}
              className={inputCls}
            >
              <option value="">Select province or territory</option>
              {SALES_TAX_RULES.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.jurisdiction} — {r.ratePercent}% {r.taxType}
                </option>
              ))}
            </select>
            {rule?.hasSeparatePst && (
              <p className="text-ink-2 text-xs mt-1.5">Does not include PST/QST.</p>
            )}
          </div>
        )}

        {registration === 'unregistered' && (
          <p className="text-ink-2 text-xs">
            Unregistered contractors don’t charge GST/HST — small suppliers below the CRA’s
            registration threshold generally aren’t required to register.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('cp-expenses', 'Business expenses ($, this period)', expenses, setExpenses, fields.expenses, { step: '0.01' })}
          {field('cp-reserve', 'Income-tax reserve (%, optional)', reservePercent, setReservePercent, fields.reservePercent, { step: '0.1' })}
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className="border border-ink/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-ink-2 uppercase tracking-wide mb-1.5">
            {result.available !== null ? 'Estimated available income' : 'Estimated profit'}
          </p>
          <p className="text-5xl font-bold text-ink tracking-tight">
            {money(result.available !== null ? result.available : result.profit)}
          </p>

          <dl className="mt-5 space-y-2 text-sm max-w-sm">
            {row('Labour revenue', money(result.labour))}
            {result.salesTax !== null && rule &&
              row(`${rule.taxType} collected (${rule.ratePercent}%)`, money(result.salesTax))}
            {result.grossInvoice !== null && row('Gross invoice', money(result.grossInvoice))}
            {row('Business expenses', money(result.expenses))}
            {row('Estimated profit', money(result.profit))}
            {result.reserve !== null &&
              (result.profit <= 0 ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-2">Income-tax reserve</dt>
                  <dd className="text-ink-2 text-right">
                    No profit this period — nothing to reserve
                  </dd>
                </div>
              ) : (
                row(`Income-tax reserve (${fields.reservePercent.value}%)`, money(result.reserve))
              ))}
            {result.available !== null &&
              row('Estimated available income', money(result.available), true)}
          </dl>

          {registration === 'unsure' && (
            <p className="text-ink-2 text-xs mt-4">
              GST/HST not calculated — registration status required.
            </p>
          )}
          {registration === 'registered' && !rule && (
            <p className="text-ink-2 text-xs mt-4">
              GST/HST not calculated — select your province or territory.
            </p>
          )}
          {registration === 'registered' && rule && (
            <p className="text-ink-2 text-xs mt-4">
              The {money(result.salesTax!)} {rule.taxType} is collected on behalf of the CRA and
              remitted — it is not income, and the tax reserve is never computed on it.
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
              ct="contractor-pay-calculator"
              headline="Doing this math for every invoice?"
              sub="HoursFlow tracks contractor earnings, GST/HST and tax reserves automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see your breakdown.</p>
      )}

      {rule && <SourceInfo rule={rule} />}
    </div>
  )
}
