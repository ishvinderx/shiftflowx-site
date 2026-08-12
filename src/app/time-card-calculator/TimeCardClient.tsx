'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { trackToolEvent } from '@/lib/analytics'
import { appStoreCampaignUrl } from '@/lib/constants'
import { fmtHM } from '../work-hours-calculator/calc'
import { calculateWeek, type DayRow } from './weekCalc'

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

  const inputCls =
    'bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'

  return (
    <div className="space-y-6">
      {/* ── Week grid ─────────────────────────────────────────────────────── */}
      <div
        className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 sm:p-6 overflow-x-auto print:hidden"
        onChangeCapture={markStarted}
      >
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="text-left text-xs text-white/40 uppercase tracking-wide">
              <th className="pb-2 pr-2 font-semibold">Day</th>
              <th className="pb-2 pr-2 font-semibold">Start</th>
              <th className="pb-2 pr-2 font-semibold">End</th>
              <th className="pb-2 pr-2 font-semibold">Break (min)</th>
              <th className="pb-2 font-semibold text-right">Worked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={DAY_NAMES[i]} className="border-t border-white/[0.06]">
                <td className="py-2 pr-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox" checked={row.enabled}
                      onChange={(e) => setRow(i, { enabled: e.target.checked })}
                      className="accent-[#D63C6B]"
                      aria-label={`Include ${DAY_NAMES[i]}`}
                    />
                    <span className={row.enabled ? 'text-white/85' : 'text-white/35'}>{DAY_NAMES[i]}</span>
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
                <td className="py-2 text-right text-white/70 tabular-nums">
                  {row.enabled && result.perDayMinutes[i] > 0 ? fmtHM(result.perDayMinutes[i]) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap items-end gap-4 mt-5 pt-4 border-t border-white/[0.06]">
          <div>
            <label htmlFor="tc-rate" className="block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">Hourly rate</label>
            <input id="tc-rate" type="number" min={0} step="0.01" placeholder="Optional" value={rate}
              onChange={(e) => setRate(e.target.value)} className={`${inputCls} w-28`} />
          </div>
          <div>
            <label htmlFor="tc-ot" className="block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">Weekly OT after (h)</label>
            <input id="tc-ot" type="number" min={0} step="1" value={otThreshold}
              onChange={(e) => setOtThreshold(e.target.value)} className={`${inputCls} w-24`} />
          </div>
          <div>
            <label htmlFor="tc-mult" className="block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">OT rate ×</label>
            <input id="tc-mult" type="number" min={1} step="0.1" value={otMultiplier}
              onChange={(e) => setOtMultiplier(e.target.value)} className={`${inputCls} w-20`} />
          </div>
          <button
            onClick={() => { setRows(DAY_NAMES.map((_, i) => defaultRow(i < 5))); setRate(''); setOtThreshold('40'); setOtMultiplier('1.5') }}
            className="ml-auto text-sm text-white/40 hover:text-white/70 transition-colors pb-1.5"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Weekly summary ────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Week total</p>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="text-5xl font-bold text-white tracking-tight">{fmtHM(result.totalMinutes)}</p>
          <p className="text-white/50 text-sm">= {result.decimalHours} decimal hours</p>
        </div>
        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm max-w-lg">
          <div><dt className="text-white/50">Regular</dt><dd className="text-white/90 font-medium">{fmtHM(result.regularMinutes)}</dd></div>
          <div>
            <dt className="text-white/50">Overtime</dt>
            <dd className={result.overtimeMinutes > 0 ? 'text-[#5EEAD4] font-medium' : 'text-white/90 font-medium'}>{fmtHM(result.overtimeMinutes)}</dd>
          </div>
          {result.grossPay != null && (
            <div><dt className="text-white/50">Est. gross pay</dt><dd className="text-white font-bold">${result.grossPay.toFixed(2)}</dd></div>
          )}
        </dl>

        <div className="flex flex-wrap gap-2 mt-6 print:hidden">
          <button onClick={copy} className="text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-full px-4 py-2 transition-colors">
            {copied ? 'Copied ✓' : 'Copy timesheet'}
          </button>
          <button onClick={() => window.print()} className="text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-full px-4 py-2 transition-colors">
            Print
          </button>
        </div>

        <div className="mt-6 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
          <p className="text-sm text-white/80 font-medium">Filling this in every week?</p>
          <p className="text-xs text-white/45 mt-1">
            ShiftFlow tracks every shift automatically, splits regular and overtime hours, and predicts your next paycheck.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <a
              href={appStoreCampaignUrl('time-card-calculator')}
              onClick={() => trackToolEvent('calculator_cta_clicked', ANALYTICS)}
              className="text-xs font-semibold text-white bg-[#D63C6B] hover:bg-[#c0355f] rounded-full px-4 py-2 transition-colors"
            >
              Track Hours with ShiftFlow
            </a>
            <Link href="/work-hours-calculator" className="text-xs text-white/50 hover:text-white transition-colors">
              Single-shift calculator →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
