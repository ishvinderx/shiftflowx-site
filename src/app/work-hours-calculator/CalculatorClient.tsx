'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { trackToolEvent } from '@/lib/analytics'
import { appStoreCampaignUrl } from '@/lib/constants'
import { calculate, fmtHM, type BreakEntry } from './calc'

// The acquisition tool itself (Phase 18.3): works instantly, no signup, no paywall.
// Native <input type="time"> keeps it fast and accessible on mobile — where most
// "work hours calculator" searches happen.

const DEFAULT_BREAK: BreakEntry = { minutes: 30, paid: false }

const ANALYTICS = { calculator: 'work-hours-calculator', category: 'Work & Time' }

export default function CalculatorClient() {
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('17:00')
  const [breaks, setBreaks] = useState<BreakEntry[]>([{ ...DEFAULT_BREAK }])
  const [rate, setRate] = useState('')
  const [otThreshold, setOtThreshold] = useState('8')
  const [otMultiplier, setOtMultiplier] = useState('1.5')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!start || !end) return null
    return calculate({
      start,
      end,
      breaks,
      hourlyRate: rate.trim() === '' ? null : Math.max(0, parseFloat(rate) || 0),
      overtimeThresholdHours: parseFloat(otThreshold) || 8,
      overtimeMultiplier: parseFloat(otMultiplier) || 1.5,
    })
  }, [start, end, breaks, rate, otThreshold, otMultiplier])

  const overnight = useMemo(() => {
    if (!start || !end) return false
    return end <= start
  }, [start, end])

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid result has rendered.
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }
  useEffect(() => {
    if (result === null || completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const summaryText = useMemo(() => {
    if (!result) return ''
    const lines = [
      `Work hours: ${start} – ${end}${overnight ? ' (overnight)' : ''}`,
      `Total worked: ${fmtHM(result.workedMinutes)} (${result.decimalHours} decimal hours)`,
      `Unpaid breaks: ${fmtHM(result.unpaidBreakMinutes)}`,
    ]
    if (result.overtimeMinutes > 0) {
      lines.push(`Regular: ${fmtHM(result.regularMinutes)} · Overtime: ${fmtHM(result.overtimeMinutes)}`)
    }
    if (result.grossPay != null) lines.push(`Estimated gross pay: $${result.grossPay.toFixed(2)}`)
    lines.push('Calculated with shiftflowx.net/work-hours-calculator')
    return lines.join('\n')
  }, [result, start, end, overnight])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Work Hours Calculator', text: summaryText })
      } catch {
        /* user cancelled */
      }
    } else {
      copy()
    }
  }

  const reset = () => {
    setStart('09:00')
    setEnd('17:00')
    setBreaks([{ ...DEFAULT_BREAK }])
    setRate('')
    setOtThreshold('8')
    setOtMultiplier('1.5')
  }

  const setBreak = (i: number, patch: Partial<BreakEntry>) =>
    setBreaks((prev) => prev.map((b, j) => (j === i ? { ...b, ...patch } : b)))

  const inputCls =
    'w-full bg-track/40 border border-rule rounded-xl px-3 py-2.5 text-ink text-sm focus:outline-none focus:border-ink/60 [color-scheme:dark]'
  const labelCls = 'block text-xs font-semibold text-ink-2 uppercase tracking-wide mb-1.5'

  return (
    <div className="grid lg:grid-cols-2 gap-6 print:block">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div
        className="bg-track/40 border border-rule rounded-2xl p-6 print:hidden"
        onChangeCapture={markStarted}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="whc-start" className={labelCls}>Start time</label>
            <input id="whc-start" type="time" value={start} onChange={(e) => setStart(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="whc-end" className={labelCls}>End time</label>
            <input id="whc-end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} className={inputCls} />
          </div>
        </div>
        {overnight && (
          <p className="mt-2 text-xs text-positive">End is before start — calculated as an overnight shift.</p>
        )}

        <div className="mt-5">
          <span className={labelCls}>Breaks</span>
          {breaks.map((b, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="number" min={0} max={720} value={b.minutes}
                onChange={(e) => setBreak(i, { minutes: Math.max(0, parseInt(e.target.value) || 0) })}
                className={`${inputCls} w-24`} aria-label={`Break ${i + 1} minutes`}
              />
              <span className="text-ink-2 text-sm">min</span>
              <label className="flex items-center gap-1.5 text-sm text-ink-2 ml-2 cursor-pointer">
                <input
                  type="checkbox" checked={b.paid}
                  onChange={(e) => setBreak(i, { paid: e.target.checked })}
                  className="accent-ink"
                />
                Paid
              </label>
              {breaks.length > 1 && (
                <button
                  onClick={() => setBreaks((prev) => prev.filter((_, j) => j !== i))}
                  className="ml-auto text-ink-2 hover:text-ink text-sm px-2" aria-label={`Remove break ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setBreaks((prev) => [...prev, { minutes: 15, paid: false }])}
            className="text-sm text-ink hover:text-ink font-medium mt-1"
          >
            + Add break
          </button>
          <p className="text-xs text-ink-2 mt-1.5">Unpaid breaks are subtracted from worked hours. Paid breaks count as time worked.</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="whc-rate" className={labelCls}>Hourly rate</label>
            <input id="whc-rate" type="number" min={0} step="0.01" placeholder="Optional" value={rate} onChange={(e) => setRate(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="whc-ot" className={labelCls}>OT after (h)</label>
            <input id="whc-ot" type="number" min={0} step="0.5" value={otThreshold} onChange={(e) => setOtThreshold(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label htmlFor="whc-mult" className={labelCls}>OT rate ×</label>
            <input id="whc-mult" type="number" min={1} step="0.1" value={otMultiplier} onChange={(e) => setOtMultiplier(e.target.value)} className={inputCls} />
          </div>
        </div>

        <button onClick={reset} className="mt-5 text-sm text-ink-2 hover:text-ink transition-colors">
          Reset
        </button>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      <div className="border border-ink/25 rounded-2xl p-6 flex flex-col">
        <p className="text-xs font-semibold text-ink-2 uppercase tracking-wide mb-3">Your result</p>
        {result ? (
          <>
            <p className="text-5xl font-bold text-ink tracking-tight">{fmtHM(result.workedMinutes)}</p>
            <p className="text-ink-2 mt-1 text-sm">= {result.decimalHours} decimal hours worked</p>

            <dl className="mt-6 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink-2">Shift span</dt><dd className="text-ink">{fmtHM(result.totalShiftMinutes)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-2">Unpaid breaks</dt><dd className="text-ink">−{fmtHM(result.unpaidBreakMinutes)}</dd></div>
              {result.paidBreakMinutes > 0 && (
                <div className="flex justify-between"><dt className="text-ink-2">Paid breaks (counted)</dt><dd className="text-ink">{fmtHM(result.paidBreakMinutes)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-ink-2">Regular hours</dt><dd className="text-ink">{fmtHM(result.regularMinutes)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-ink-2">Overtime</dt>
                <dd className={result.overtimeMinutes > 0 ? 'text-positive font-medium' : 'text-ink'}>{fmtHM(result.overtimeMinutes)}</dd>
              </div>
              {result.grossPay != null && (
                <div className="flex justify-between pt-2.5 border-t border-rule">
                  <dt className="text-ink-2 font-medium">Estimated gross pay</dt>
                  <dd className="text-ink font-bold">${result.grossPay.toFixed(2)}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap gap-2 mt-6 print:hidden">
              <button onClick={copy} className="text-xs font-medium text-ink bg-track/40 hover:bg-track/40 border border-rule rounded-full px-4 py-2 transition-colors">
                {copied ? 'Copied ✓' : 'Copy result'}
              </button>
              <button onClick={share} className="text-xs font-medium text-ink bg-track/40 hover:bg-track/40 border border-rule rounded-full px-4 py-2 transition-colors">
                Share
              </button>
              <button onClick={() => window.print()} className="text-xs font-medium text-ink bg-track/40 hover:bg-track/40 border border-rule rounded-full px-4 py-2 transition-colors">
                Print
              </button>
            </div>

            {/* SEO → app funnel (Phase 18.4): contextual, after the value is delivered,
                never interrupting the calculator. */}
            <div className="mt-auto pt-6">
              <div className="bg-track/40 border border-rule rounded-xl p-4">
                <p className="text-sm text-ink font-medium">Tracking these hours by hand every shift?</p>
                <p className="text-xs text-ink-2 mt-1">
                  HoursFlow logs your shifts, calculates overtime and take-home pay automatically, and predicts your next payday.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <a
                    href={appStoreCampaignUrl('work-hours-calculator')}
                    onClick={() => trackToolEvent('calculator_cta_clicked', ANALYTICS)}
                    className="text-xs font-semibold text-ground bg-ink hover:bg-ink-2 rounded-full px-4 py-2 transition-colors"
                  >
                    Track Hours with HoursFlow
                  </a>
                  <Link href="/features" className="text-xs text-ink-2 hover:text-ink transition-colors">
                    See how it works →
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-ink-2 text-sm">Enter a start and end time to calculate.</p>
        )}
      </div>
    </div>
  )
}
