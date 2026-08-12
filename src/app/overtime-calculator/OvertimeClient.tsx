'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import ShiftFlowCta from '@/components/calculator/ShiftFlowCta'
import SourceInfo from '@/components/calculator/SourceInfo'
import { OVERTIME_RULES, getOvertimeRule } from '@/lib/rules/overtime'
import { calculateOvertime, type OvertimeInput, type OvertimeResult } from './overtimeCalc'

const CALCULATOR = 'overtime-calculator'
const CATEGORY = 'Overtime'
const OTHER = 'OTHER'
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'
const errCls = 'text-[#F87171] text-xs mt-1.5'

const money = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const hrs = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 })

// Invalid input NEVER becomes a displayed 0 — it shows a message and no result.
function parseRequired(raw: string, label: string, max: number): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: `Enter ${label}.` }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: `${label} must be a number.` }
  if (n < 0) return { value: null, error: `${label} can’t be negative.` }
  if (n > max) return { value: null, error: `${label} can’t exceed ${max}.` }
  return { value: n, error: null }
}

// Blank day = not worked = a legitimate 0 hours.
function parseDay(raw: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: 0, error: null }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { value: null, error: 'Must be a number.' }
  if (n < 0) return { value: null, error: 'Can’t be negative.' }
  if (n > 24) return { value: null, error: 'Max 24 h/day.' }
  return { value: n, error: null }
}

// Rate is optional: blank = no rate = no pay numbers (never $0).
function parseRate(raw: string): { value: number | null; error: string | null } {
  if (raw.trim() === '') return { value: null, error: null }
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return { value: null, error: 'Rate must be a non-negative number.' }
  return { value: n, error: null }
}

export default function OvertimeClient() {
  const [code, setCode] = useState('CA-ON')
  const [weeklyHours, setWeeklyHours] = useState('45')
  const [days, setDays] = useState(['8', '8', '8', '8', '8', '', ''])
  const [rate, setRate] = useState('')
  const [manualThreshold, setManualThreshold] = useState('40')
  const [manualMultiplier, setManualMultiplier] = useState('1.5')

  const rule = code === OTHER ? null : getOvertimeRule(code)
  const isDaily = rule !== null && rule.dailyThresholdHours !== null
  const isManual = code === OTHER

  const analyticsProps = useMemo(
    () => ({ calculator: CALCULATOR, category: CATEGORY, ...(rule ? { jurisdiction: rule.code } : {}) }),
    [rule],
  )

  const parsedRate = useMemo(() => parseRate(rate), [rate])
  const parsedWeekly = useMemo(() => parseRequired(weeklyHours, 'your weekly hours', 168), [weeklyHours])
  const parsedDays = useMemo(() => days.map(parseDay), [days])
  const parsedManualThreshold = useMemo(
    () => parseRequired(manualThreshold, 'a weekly overtime threshold', 168),
    [manualThreshold],
  )
  const parsedManualMultiplier = useMemo(() => {
    const p = parseRequired(manualMultiplier, 'an overtime multiplier', 100)
    if (p.value !== null && p.value <= 0) return { value: null, error: 'Multiplier must be greater than 0.' }
    return p
  }, [manualMultiplier])

  const result: OvertimeResult | null = useMemo(() => {
    if (parsedRate.error) return null
    const r = parsedRate.value

    let input: OvertimeInput
    if (isManual) {
      if (parsedWeekly.error || parsedManualThreshold.error || parsedManualMultiplier.error) return null
      input = {
        mode: 'weekly',
        weeklyHours: parsedWeekly.value!,
        weeklyThreshold: parsedManualThreshold.value!,
        multiplier: parsedManualMultiplier.value!,
        rate: r,
      }
    } else if (!rule) {
      return null
    } else if (!isDaily) {
      if (parsedWeekly.error) return null
      input = {
        mode: 'weekly',
        weeklyHours: parsedWeekly.value!,
        weeklyThreshold: rule.weeklyThresholdHours!,
        multiplier: rule.multiplier,
        rate: r,
      }
    } else {
      if (parsedDays.some((d) => d.error)) return null
      const dayValues = parsedDays.map((d) => d.value!)
      input =
        rule.doubleTimeDailyThresholdHours !== null
          ? {
              mode: 'two-tier',
              days: dayValues,
              dailyThreshold: rule.dailyThresholdHours!,
              doubleTimeThreshold: rule.doubleTimeDailyThresholdHours,
              weeklyThreshold: rule.weeklyThresholdHours!,
              multiplier: rule.multiplier,
              doubleTimeMultiplier: rule.doubleTimeMultiplier!,
              rate: r,
            }
          : {
              mode: 'greater-of',
              days: dayValues,
              dailyThreshold: rule.dailyThresholdHours!,
              weeklyThreshold: rule.weeklyThresholdHours!,
              multiplier: rule.multiplier,
              rate: r,
            }
    }
    return calculateOvertime(input)
  }, [isManual, isDaily, rule, parsedRate, parsedWeekly, parsedDays, parsedManualThreshold, parsedManualMultiplier])

  // Once-per-mount analytics: started on first interaction, completed when a
  // valid result has rendered.
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
  }, [result, analyticsProps])

  const weeklyHoursField = (
    <div className="max-w-xs">
      <label htmlFor="ot-weekly-hours" className={labelCls}>
        Hours worked this week
      </label>
      <input
        id="ot-weekly-hours"
        type="number"
        min={0}
        step="any"
        value={weeklyHours}
        onChange={(e) => {
          markStarted()
          setWeeklyHours(e.target.value)
        }}
        className={inputCls}
        aria-invalid={parsedWeekly.error !== null}
      />
      {parsedWeekly.error && <p className={errCls}>{parsedWeekly.error}</p>}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-6">
        <div className="max-w-xs">
          <label htmlFor="ot-jurisdiction" className={labelCls}>
            Jurisdiction
          </label>
          <select
            id="ot-jurisdiction"
            value={code}
            onChange={(e) => {
              markStarted()
              setCode(e.target.value)
            }}
            className={inputCls}
          >
            {OVERTIME_RULES.map((r) => (
              <option key={r.code} value={r.code}>
                {r.jurisdiction}
              </option>
            ))}
            <option value={OTHER}>Other / not listed</option>
          </select>
        </div>

        {isManual && (
          <div className="space-y-4">
            <p className="text-white/80 text-sm font-medium">
              Overtime rule not verified for this jurisdiction.
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
              We only calculate statutory overtime from rules verified against official government
              sources, so no statutory result is shown here. If you know your own threshold and
              multiplier, use manual mode below — the result is computed from your numbers, not a
              verified rule.
            </p>
            <div className="border border-white/10 rounded-xl p-4 space-y-4">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Manual mode — your numbers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {weeklyHoursField}
                <div>
                  <label htmlFor="ot-manual-threshold" className={labelCls}>
                    Weekly OT threshold (h)
                  </label>
                  <input
                    id="ot-manual-threshold"
                    type="number"
                    min={0}
                    step="any"
                    value={manualThreshold}
                    onChange={(e) => {
                      markStarted()
                      setManualThreshold(e.target.value)
                    }}
                    className={inputCls}
                    aria-invalid={parsedManualThreshold.error !== null}
                  />
                  {parsedManualThreshold.error && <p className={errCls}>{parsedManualThreshold.error}</p>}
                </div>
                <div>
                  <label htmlFor="ot-manual-multiplier" className={labelCls}>
                    OT multiplier
                  </label>
                  <input
                    id="ot-manual-multiplier"
                    type="number"
                    min={0}
                    step="0.1"
                    value={manualMultiplier}
                    onChange={(e) => {
                      markStarted()
                      setManualMultiplier(e.target.value)
                    }}
                    className={inputCls}
                    aria-invalid={parsedManualMultiplier.error !== null}
                  />
                  {parsedManualMultiplier.error && <p className={errCls}>{parsedManualMultiplier.error}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isManual && !isDaily && weeklyHoursField}

        {!isManual && isDaily && (
          <div>
            <p className={labelCls}>Hours worked each day</p>
            <p className="text-white/40 text-xs mb-3">
              Decimal hours (8.5 = 8 h 30 m). Leave a day blank if you didn’t work — it counts as 0.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {DAY_LABELS.map((label, i) => (
                <div key={label}>
                  <label htmlFor={`ot-day-${label}`} className={labelCls}>
                    {label}
                  </label>
                  <input
                    id={`ot-day-${label}`}
                    type="number"
                    min={0}
                    max={24}
                    step="any"
                    value={days[i]}
                    onChange={(e) => {
                      markStarted()
                      setDays(days.map((d, j) => (j === i ? e.target.value : d)))
                    }}
                    className={inputCls}
                    aria-invalid={parsedDays[i].error !== null}
                  />
                  {parsedDays[i].error && <p className={errCls}>{parsedDays[i].error}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-xs">
          <label htmlFor="ot-rate" className={labelCls}>
            Hourly rate ($, optional)
          </label>
          <input
            id="ot-rate"
            type="number"
            min={0}
            step="0.01"
            value={rate}
            onChange={(e) => {
              markStarted()
              setRate(e.target.value)
            }}
            className={inputCls}
            aria-invalid={parsedRate.error !== null}
            placeholder="No rate → hours only"
          />
          {parsedRate.error && <p className={errCls}>{parsedRate.error}</p>}
        </div>
      </div>

      {/* ── Rule provenance (verified jurisdictions only) ──────────────────── */}
      {rule && (
        <div>
          <SourceInfo rule={rule} />
          <p className="mt-2 text-xs text-white/45 leading-relaxed">
            This rule does not cover everyone: {rule.exceptionsNote}
          </p>
        </div>
      )}

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      {result !== null ? (
        <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
          {isManual && (
            <p className="text-xs text-[#FBBF24] font-semibold uppercase tracking-wide mb-3">
              Computed from your numbers — not a verified statutory rule
            </p>
          )}
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5">
            {result.grossPay !== null ? 'Estimated gross pay' : 'Overtime hours'}
          </p>
          <p className="text-5xl font-bold text-white tracking-tight">
            {result.grossPay !== null ? money(result.grossPay) : `${hrs(result.otHours)} h`}
          </p>

          <dl className="mt-5 space-y-2 text-sm max-w-xs">
            <div className="flex justify-between">
              <dt className="text-white/50">Regular hours</dt>
              <dd className="text-white font-medium">{hrs(result.regularHours)} h</dd>
            </div>
            {result.otBreakdown.length === 0 && (
              <div className="flex justify-between">
                <dt className="text-white/50">Overtime hours</dt>
                <dd className="text-white font-medium">0 h</dd>
              </div>
            )}
            {result.otBreakdown.map((b) => (
              <div key={b.multiplier} className="flex justify-between">
                <dt className="text-white/50">Overtime @ {b.multiplier}×</dt>
                <dd className="text-[#5EEAD4] font-medium">{hrs(b.hours)} h</dd>
              </div>
            ))}
            {result.regularPay !== null && (
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/50">Regular pay</dt>
                <dd className="text-white font-medium">{money(result.regularPay)}</dd>
              </div>
            )}
            {result.otPay !== null && (
              <div className="flex justify-between">
                <dt className="text-white/50">Overtime pay</dt>
                <dd className="text-[#5EEAD4] font-medium">{money(result.otPay)}</dd>
              </div>
            )}
          </dl>
          {result.grossPay === null && (
            <p className="mt-3 text-xs text-white/40">Add an hourly rate to see the pay breakdown.</p>
          )}

          <div
            className="mt-6 max-w-md"
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest('a')) {
                trackToolEvent('calculator_cta_clicked', analyticsProps)
              }
            }}
          >
            <ShiftFlowCta
              ct={CALCULATOR}
              headline="Working overtime every week?"
              sub="ShiftFlow tracks your shifts and splits regular vs. overtime hours automatically — no spreadsheet math."
            />
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-sm">Fix the highlighted fields to see your overtime.</p>
      )}
    </div>
  )
}
