'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import { appStoreCampaignUrl } from '@/lib/constants'
import { fmtHM } from '../work-hours-calculator/calc'
import { calculateWeek, type DayRow } from './weekCalc'
import { inputCls, resultsCls, miniBtnCls } from '@/components/calculator/kit'

// Weekly time-card grid (SEO P0 #2). Distinct UX from the single-shift calculator:
// one row per day, weekly overtime threshold. Works instantly, no signup.

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const defaultRow = (enabled: boolean): DayRow => ({ enabled, start: '09:00', end: '17:00', breakMinutes: 30 })

const ANALYTICS = { calculator: 'time-card-calculator', category: 'Work & Time' }

export default function TimeCardClient() {
  const [rows, setRows] = useState<DayRow[]>(DAY_NAMES.map((_, i) => defaultRow(i < 5)))
  const [rate, setRate] = useState('')
  const [otThreshold, setOtThreshold] = useState('40')
  const [otMultiplier, setOtMultiplier] = useState('1.5')
  const [copied, setCopied] = useState(false)

  const result = useMemo(
    () =>
      calculateWeek(
        rows,
        parseFloat(otThreshold) || 40,
        parseFloat(otMultiplier) || 1.5,
        rate.trim() === '' ? null : Math.max(0, parseFloat(rate) || 0),
      ),
    [rows, rate, otThreshold, otMultiplier],
  )

  const setRow = (i: number, patch: Partial<DayRow>) =>
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)))

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid (non-empty) week total has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }
  useEffect(() => {
    if (result.totalMinutes <= 0 || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const summaryText = useMemo(() => {
    const lines = rows
      .map((r, i) => ({ r, i, mins: result.perDayMinutes[i] }))
      .filter((x) => x.r.enabled && x.mins > 0)
      .map((x) => `${DAY_NAMES[x.i]}: ${x.r.start}–${x.r.end} (−${x.r.breakMinutes}m break) = ${fmtHM(x.mins)}`)
    lines.push(`Week total: ${fmtHM(result.totalMinutes)} (${result.decimalHours} decimal hours)`)
    if (result.overtimeMinutes > 0) lines.push(`Regular: ${fmtHM(result.regularMinutes)} · Overtime: ${fmtHM(result.overtimeMinutes)}`)
    if (result.grossPay != null) lines.push(`Estimated gross pay: $${result.grossPay.toFixed(2)}`)
    lines.push('Calculated with shiftflowx.net/time-card-calculator')
    return lines.join('\n')
  }, [rows, result])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  
  return (
    <div className="space-y-6">
      {/* ── Week grid ─────────────────────────────────────────────────────── */}
      <div
        className="min-w-0 overflow-x-auto print:hidden"
        onChangeCapture={markStarted}
      >
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left text-[0.875rem] text-ink-2 uppercase tracking-wide">
              <th className="pb-2 pr-2 font-semibold">Day</th>
              <th className="pb-2 pr-2 font-semibold">Start</th>
              <th className="pb-2 pr-2 font-semibold">End</th>
              <th className="pb-2 pr-2 font-semibold">Break (min)</th>
              <th className="pb-2 font-semibold text-right">Worked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={DAY_NAMES[i]} className="border-t border-rule">
                <td className="py-2 pr-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={row.enabled}
                      onChange={(e) => setRow(i, { enabled: e.target.checked })}
                      className="accent-ink"
                      aria-label={`Include ${DAY_NAMES[i]}`}
                    />
                    <span className={row.enabled ? 'text-ink' : 'text-ink-2'}>{DAY_NAMES[i]}</span>
                  </label>
                </td>
                <td className="py-2 pr-2">
                  <input type="time" value={row.start} disabled={!row.enabled}
                    onChange={(e) => setRow(i, { start: e.target.value })}
                    className={`${inputCls} disabled:opacity-30`} aria-label={`${DAY_NAMES[i]} start time`} />
                </td>
                <td className="py-2 pr-2">
                  <input type="time" value={row.end} disabled={!row.enabled}
                    onChange={(e) => setRow(i, { end: e.target.value })}
                    className={`${inputCls} disabled:opacity-30`} aria-label={`${DAY_NAMES[i]} end time`} />
                </td>
                <td className="py-2 pr-2">
                  <input type="number" min={0} max={720} value={row.breakMinutes} disabled={!row.enabled}
                    onChange={(e) => setRow(i, { breakMinutes: Math.max(0, parseInt(e.target.value) || 0) })}
                    className={`${inputCls} w-20 disabled:opacity-30`} aria-label={`${DAY_NAMES[i]} unpaid break minutes`} />
                </td>
                <td className="py-2 text-right text-ink-2 tabular-nums">
                  {row.enabled && result.perDayMinutes[i] > 0 ? fmtHM(result.perDayMinutes[i]) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap items-end gap-4 mt-5 pt-4 border-t border-rule">
          <div>
            <label htmlFor="tc-rate" className="block t-label mb-1">Hourly rate</label>
            <input id="tc-rate" type="number" min={0} step="0.01" placeholder="Optional" value={rate}
              onChange={(e) => setRate(e.target.value)} className={`${inputCls} w-28`} />
          </div>
          <div>
            <label htmlFor="tc-ot" className="block t-label mb-1">Weekly OT after (h)</label>
            <input id="tc-ot" type="number" min={0} step="1" value={otThreshold}
              onChange={(e) => setOtThreshold(e.target.value)} className={`${inputCls} w-24`} />
          </div>
          <div>
            <label htmlFor="tc-mult" className="block t-label mb-1">OT rate ×</label>
            <input id="tc-mult" type="number" min={1} step="0.1" value={otMultiplier}
              onChange={(e) => setOtMultiplier(e.target.value)} className={`${inputCls} w-20`} />
          </div>
          <button
            onClick={() => { setRows(DAY_NAMES.map((_, i) => defaultRow(i < 5))); setRate(''); setOtThreshold('40'); setOtMultiplier('1.5') }}
            className="ml-auto text-sm text-ink-2 hover:text-ink transition-colors pb-1.5"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Weekly summary ────────────────────────────────────────────────── */}
      <div className={resultsCls}>
        <p className="t-label mb-3">Week total</p>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="num text-[clamp(2.5rem,1.8rem+3vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink">{fmtHM(result.totalMinutes)}</p>
          <p className="text-ink-2 text-sm">= {result.decimalHours} decimal hours</p>
        </div>
        <dl className="ledger-dl mt-6">
          <div><dt className="text-ink-2">Regular</dt><dd className="text-ink font-medium">{fmtHM(result.regularMinutes)}</dd></div>
          <div>
            <dt className="text-ink-2">Overtime</dt>
            <dd className={result.overtimeMinutes > 0 ? 'text-positive font-medium' : 'text-ink font-medium'}>{fmtHM(result.overtimeMinutes)}</dd>
          </div>
          {result.grossPay != null && (
            <div><dt className="text-ink-2">Est. gross pay</dt><dd className="text-ink font-bold">${result.grossPay.toFixed(2)}</dd></div>
          )}
        </dl>

        <div className="flex flex-wrap gap-2 mt-6 print:hidden">
          <button onClick={copy} className={miniBtnCls}>
            {copied ? 'Copied ✓' : 'Copy timesheet'}
          </button>
          <button onClick={() => window.print()} className={miniBtnCls}>
            Print
          </button>
        </div>

        <p className="mt-6 text-[0.9375rem] text-ink-2 print:hidden">
          Filling this in every week? HoursFlow tracks every shift, splits regular and overtime hours, and shows your next payday.{' '}
          <a
            href={appStoreCampaignUrl('time-card-calculator')}
            onClick={() => trackToolEvent('calculator_cta_clicked', ANALYTICS)}
            className="link-hover whitespace-nowrap text-ink underline underline-offset-4 decoration-1 hover:decoration-2"
          >
            Track hours with HoursFlow
          </a>
        </p>
      </div>
    </div>
  )
}
