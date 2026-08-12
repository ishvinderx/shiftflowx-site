'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { getSalesTaxRule, SALES_TAX_RULES } from '@/lib/rules/salesTax'
import { calculateOwnerOperatorPay, type GstRegistration, type RevenueBasis } from './ownerOpCalc'

const CALCULATOR = 'owner-operator-pay-calculator'
const CATEGORY = 'Owner-Operator & Trucking'

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

const money = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })

type Parsed = { value: number | null; error: string | null }

// Invalid input NEVER becomes a displayed $0 — it shows a message and no result.
function parseRequired(raw: string, label: string): Parsed {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  return { value: n, error: null }
}

// Blank = not entered — ignored, never zero-filled. 0 typed in is data.
function parseOptional(raw: string, label: string): Parsed {
  if (raw.trim() === '') return { value: null, error: null }
  return parseRequired(raw, label)
}

function parsePercent(raw: string, label: string): Parsed {
  const p = parseRequired(raw, label)
  if (p.value !== null && p.value > 100) return { value: null, error: `${label} can’t exceed 100.` }
  return p
}

export default function OwnerOperatorClient() {
  const [basis, setBasis] = useState<RevenueBasis>('hourly')
  const [hours, setHours] = useState('100')
  const [rate, setRate] = useState('26')
  const [flatRevenue, setFlatRevenue] = useState('2600')
  const [registration, setRegistration] = useState<GstRegistration>('registered')
  // Ontario default: most-searched jurisdiction, not a fabricated rate — the
  // rate still comes from the rules module.
  const [province, setProvince] = useState('ON')
  const [fuel, setFuel] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [insurance, setInsurance] = useState('')
  const [other, setOther] = useState('')
  const [km, setKm] = useState('')
  const [reserve, setReserve] = useState('25')

  const rule = registration === 'registered' ? getSalesTaxRule(province) : null

  const fields = useMemo(
    () => ({
      hours: parseRequired(hours, 'hours worked'),
      rate: parseRequired(rate, 'an hourly rate'),
      flatRevenue: parseRequired(flatRevenue, 'your revenue'),
      fuel: parseOptional(fuel, 'Fuel'),
      maintenance: parseOptional(maintenance, 'Maintenance'),
      insurance: parseOptional(insurance, 'Insurance'),
      other: parseOptional(other, 'Other expenses'),
      km: parseOptional(km, 'Kilometres'),
      reserve: parsePercent(reserve, 'a reserve percent'),
    }),
    [hours, rate, flatRevenue, fuel, maintenance, insurance, other, km, reserve],
  )

  const hasErrors = [
    ...(basis === 'hourly' ? [fields.hours.error, fields.rate.error] : [fields.flatRevenue.error]),
    fields.fuel.error,
    fields.maintenance.error,
    fields.insurance.error,
    fields.other.error,
    fields.km.error,
    fields.reserve.error,
  ].some((e) => e !== null)

  const result = useMemo(() => {
    if (hasErrors) return null
    return calculateOwnerOperatorPay({
      basis,
      hours: basis === 'hourly' ? fields.hours.value : null,
      hourlyRate: basis === 'hourly' ? fields.rate.value : null,
      flatRevenue: basis === 'flat' ? fields.flatRevenue.value : null,
      registration,
      gstRatePercent: rule?.ratePercent ?? null,
      fuel: fields.fuel.value,
      maintenance: fields.maintenance.value,
      insurance: fields.insurance.value,
      other: fields.other.value,
      kilometres: fields.km.value,
      reservePercent: fields.reserve.value ?? NaN,
    })
  }, [hasErrors, basis, fields, registration, rule])

  const analytics = {
    calculator: CALCULATOR,
    category: CATEGORY,
    ...(registration === 'registered' ? { jurisdiction: province } : {}),
  }

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
    parsed: Parsed,
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

  const choiceBtn = <T extends string>(current: T, set: (v: T) => void, value: T, label: string) => (
    <button
      type="button"
      onClick={() => {
        markStarted()
        set(value)
      }}
      aria-pressed={current === value}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        current === value ? 'bg-[#D63C6B] text-white' : 'bg-white/[0.04] text-white/60 hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  const enteredExpenses = [
    ['Fuel', fields.fuel.value],
    ['Maintenance & repairs', fields.maintenance.value],
    ['Insurance & fixed costs', fields.insurance.value],
    ['Other', fields.other.value],
  ].filter((e): e is [string, number] => e[1] !== null)

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <span className={labelCls}>Revenue basis</span>
            <div className="flex gap-2 max-w-xs" role="group" aria-label="Revenue basis">
              {choiceBtn(basis, setBasis, 'hourly', 'Hourly')}
              {choiceBtn(basis, setBasis, 'flat', 'Flat amount')}
            </div>
          </div>

          {basis === 'hourly' ? (
            <>
              {field('oo-hours', 'Hours worked', hours, setHours, fields.hours)}
              {field('oo-rate', 'Hourly rate ($)', rate, setRate, fields.rate, { step: '0.01' })}
            </>
          ) : (
            field('oo-revenue', 'Revenue this period ($)', flatRevenue, setFlatRevenue, fields.flatRevenue, {
              step: '0.01',
            })
          )}

          <div className="sm:col-span-2">
            <span className={labelCls}>GST/HST registration</span>
            <div className="flex gap-2 max-w-md" role="group" aria-label="GST/HST registration">
              {choiceBtn(registration, setRegistration, 'registered', 'Registered')}
              {choiceBtn(registration, setRegistration, 'not-registered', 'Not registered')}
              {choiceBtn(registration, setRegistration, 'unknown', 'Not sure')}
            </div>
          </div>

          {registration === 'registered' && (
            <div className="sm:col-span-2">
              <label htmlFor="oo-province" className={labelCls}>
                Province or territory
              </label>
              <select
                id="oo-province"
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
          )}

          {registration === 'not-registered' && (
            <p className="sm:col-span-2 text-xs text-white/45 leading-relaxed">
              Not registered — you don’t collect GST/HST on your loads, so there’s no tax line
              in the breakdown.
            </p>
          )}

          {field('oo-fuel', 'Fuel ($, optional)', fuel, setFuel, fields.fuel, { step: '0.01' })}
          {field('oo-maintenance', 'Maintenance & repairs ($, optional)', maintenance, setMaintenance, fields.maintenance, { step: '0.01' })}
          {field('oo-insurance', 'Insurance & fixed costs ($, optional)', insurance, setInsurance, fields.insurance, { step: '0.01' })}
          {field('oo-other', 'Other ($, optional)', other, setOther, fields.other, { step: '0.01' })}
          {field('oo-km', 'Kilometres driven (optional)', km, setKm, fields.km)}
          {field('oo-reserve', 'Tax reserve (%)', reserve, setReserve, fields.reserve, { step: '1' })}
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
            Estimated available income
          </p>
          <p className="text-5xl font-bold text-white tracking-tight">{money(result.available)}</p>
          {!result.expensesEntered && (
            <p className="text-[#FBBF24]/90 text-xs mt-2">
              Before expenses — enter your costs for a real number.
            </p>
          )}

          <dl className="mt-5 space-y-2 text-sm max-w-sm">
            <div className="flex justify-between">
              <dt className="text-white/50">Revenue</dt>
              <dd className="text-white font-medium">{money(result.revenue)}</dd>
            </div>

            {result.gstHst !== null && rule !== null && (
              <div>
                <div className="flex justify-between">
                  <dt className="text-white/50">
                    {rule.taxType} collected ({rule.ratePercent}%)
                  </dt>
                  <dd className="text-[#FBBF24] font-medium">{money(result.gstHst)}</dd>
                </div>
                <p className="text-white/35 text-xs text-right">remitted to CRA — not income</p>
              </div>
            )}

            <div className="flex justify-between">
              <dt className="text-white/50">Total expenses</dt>
              <dd className="text-white font-medium">{money(result.totalExpenses)}</dd>
            </div>
            {enteredExpenses.map(([label, value]) => (
              <div key={label} className="flex justify-between pl-4">
                <dt className="text-white/35">{label}</dt>
                <dd className="text-white/60">{money(value)}</dd>
              </div>
            ))}

            <div>
              <div className="flex justify-between">
                <dt className="text-white/50">Estimated profit</dt>
                <dd className="text-white font-medium">{money(result.profit)}</dd>
              </div>
              {!result.expensesEntered && (
                <p className="text-[#FBBF24]/90 text-xs text-right">
                  before expenses — enter your costs for a real number
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <dt className="text-white/50">Tax reserve ({fields.reserve.value}%)</dt>
              {result.profit <= 0 ? (
                <dd className="text-white/60">No profit — nothing to reserve</dd>
              ) : (
                <dd className="text-[#5EEAD4] font-medium">{money(result.reserve)}</dd>
              )}
            </div>

            <div className="flex justify-between">
              <dt className="text-white/50">Estimated available income</dt>
              <dd className="text-white font-medium">{money(result.available)}</dd>
            </div>
          </dl>

          {result.costPerKm !== null && result.revenuePerKm !== null && (
            <dl className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm max-w-sm">
              <div className="flex justify-between">
                <dt className="text-white/50">Cost per km</dt>
                <dd className="text-white font-medium">{money(result.costPerKm)}/km</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">Revenue per km</dt>
                <dd className="text-white font-medium">{money(result.revenuePerKm)}/km</dd>
              </div>
            </dl>
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
              ct="owner-operator-pay-calculator"
              headline="Doing this math after every settlement?"
              sub="ShiftFlow tracks loads, expenses and reserves automatically."
            />
          </div>
        </div>
      ) : registration === 'unknown' ? (
        <p className="text-[#FBBF24]/90 text-sm leading-relaxed max-w-md">
          GST/HST not calculated — registration status required. Choose “Registered” or “Not
          registered” to see your breakdown.
        </p>
      ) : (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your pay.</p>
      )}

      {rule !== null && (
        <>
          {rule.hasSeparatePst && (
            <p className="text-xs text-[#FBBF24]/90 leading-relaxed max-w-md">
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
