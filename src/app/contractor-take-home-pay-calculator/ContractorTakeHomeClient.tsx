'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import AppCta from '@/components/calculator/AppCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { SALES_TAX_RULES, getSalesTaxRule } from '@/lib/rules/salesTax'
import { calculateContractorPay } from '../contractor-pay-calculator/contractorCalc'
import { inputCls, labelCls, calcGridCls, resultsCls } from '@/components/calculator/kit'

const ANALYTICS = {
  calculator: 'contractor-take-home-pay-calculator',
  category: 'Contractor & Self-Employed',
}


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

export default function ContractorTakeHomeClient() {
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

  // Shared engine — same math as the contractor pay calculator, presented as a
  // what-do-I-keep waterfall. Never reimplement the arithmetic here.
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
      {parsed.error && <p className="text-alert text-[0.875rem] mt-1.5">{parsed.error}</p>}
    </div>
  )

  // One waterfall step: label on the left, amount on the right. Deductions are
  // prefixed with a minus so the top- flow reads like arithmetic.
  const step = (label: string, value: string, opts?: { minus?: boolean; strong?: boolean }) => (
    <div
      className={`flex justify-between items-baseline py-2 ${opts?.strong ? 'border-t border-rule' : ''}`}
    >
      <dt className={opts?.strong ? 'text-ink font-medium' : 'text-ink-2'}>{label}</dt>
      <dd className={`font-medium ${opts?.strong ? 'text-ink' : 'text-ink'}`}>
        {opts?.minus ? '− ' : ''}
        {value}
      </dd>
    </div>
  )

  return (
    <div className={calcGridCls}>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {field('cth-hours', 'Billable hours', hours, setHours, fields.hours)}
          {field('cth-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
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
                  name="cth-registration"
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
            <label htmlFor="cth-province" className={labelCls}>
              Province / territory
            </label>
            <select
              id="cth-province"
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
          {field('cth-expenses', 'Business expenses ($, this period)', expenses, setExpenses, fields.expenses, { step: '0.01' })}
          {field('cth-reserve', 'Income-tax reserve (%, optional)', reservePercent, setReservePercent, fields.reservePercent, { step: '0.1' })}
        </div>
      </div>

      {/* ── Result: the take-home waterfall ────────────────────────────────── */}
      {result !== null ? (
        <div className={resultsCls}>
          <p className="t-label mb-1.5">
            What you actually keep
          </p>

          <dl className="ledger-dl mt-6">
            {step('Gross labour', money(result.labour))}
            {step('Business expenses', money(result.expenses), { minus: true })}
            {step('Estimated profit', money(result.profit), { strong: true })}
            {result.reserve !== null &&
              (result.profit <= 0 ? (
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-ink-2">Income-tax reserve</dt>
                  <dd className="text-ink-2 text-right">
                    No profit this period — nothing to reserve
                  </dd>
                </div>
              ) : (
                step(
                  `Your income-tax reserve (${fields.reservePercent.value}%)`,
                  money(result.reserve),
                  { minus: true },
                )
              ))}
          </dl>

          {result.available !== null ? (
            <div className="mt-4 border-t border-ink pt-4">
              <p className="t-label mb-1.5">
                Estimated available income
              </p>
              <p className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-positive">
                {money(result.available)}
              </p>
            </div>
          ) : (
            // Reserve % absent: the waterfall stops at profit. Absence ≠ 0% —
            // never show profit dressed up as available income.
            <p className="text-ink-2 text-sm mt-4">
              Add your income-tax reserve % above to see what’s actually yours to spend — leaving
              it blank doesn’t mean 0%.
            </p>
          )}

          {/* GST/HST is a side line, never a waterfall step — it isn’t income. */}
          {result.salesTax !== null && rule && (
            <div className="mt-5 max-w-sm border-t border-rule pt-4 text-[0.9375rem]">
              <div className="flex justify-between">
                <span className="text-ink-2">
                  {rule.taxType} collected ({rule.ratePercent}%)
                </span>
                <span className="text-ink font-medium">{money(result.salesTax)}</span>
              </div>
              <p className="text-ink-2 text-xs mt-1.5">
                Pass-through — remitted to the CRA, never yours. Deliberately excluded from the
                waterfall above: you invoice {money(result.grossInvoice!)}, but the{' '}
                {money(result.salesTax)} was never income.
              </p>
            </div>
          )}

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

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', analytics)
              }
            }}
          >
            <AppCta
              ct="contractor-take-home-pay-calculator"
              headline="Want to know what you keep from every shift?"
              sub="HoursFlow tracks contractor earnings and tax reserves per shift, automatically."
            />
          </div>
        </div>
      ) : (
        <p className="text-ink-2 text-sm">Fix the highlighted fields to see what you keep.</p>
      )}

      {rule && <SourceInfo rule={rule} />}
    </div>
  )
}
