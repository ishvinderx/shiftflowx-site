'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { APP_STORE_URL } from '@/lib/constants'
import { calculate, fmtHM, type BreakEntry } from './calc'

// The acquisition tool itself (Phase 18.3): works instantly, no signup, no paywall.
// Native <input type="time"> keeps it fast and accessible on mobile — where most
// "work hours calculator" searches happen.

const DEFAULT_BREAK: BreakEntry = { minutes: 30, paid: false }

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
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D63C6B]/60 [color-scheme:dark]'
  const labelCls = 'block text-xs font-semibold text-white/50 uppercase tracking-wide mb-1.5'

  return (
    <div className="grid lg:grid-cols-2 gap-6 print:block">
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 print:hidden">
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
          <p className="mt-2 text-xs text-[#5EEAD4]">End is before start — calculated as an overnight shift.</p>
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
              <span className="text-white/40 text-sm">min</span>
              <label className="flex items-center gap-1.5 text-sm text-white/60 ml-2 cursor-pointer">
                <input
                  type="checkbox" checked={b.paid}
                  onChange={(e) => setBreak(i, { paid: e.target.checked })}
                  className="accent-[#D63C6B]"
                />
                Paid
              </label>
              {breaks.length > 1 && (
                <button
                  onClick={() => setBreaks((prev) => prev.filter((_, j) => j !== i))}
                  className="ml-auto text-white/40 hover:text-white text-sm px-2" aria-label={`Remove break ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setBreaks((prev) => [...prev, { minutes: 15, paid: false }])}
            className="text-sm text-[#D63C6B] hover:text-[#e2557f] font-medium mt-1"
          >
            + Add break
          </button>
          <p className="text-xs text-white/35 mt-1.5">Unpaid breaks are subtracted from worked hours. Paid breaks count as time worked.</p>
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

        <button onClick={reset} className="mt-5 text-sm text-white/40 hover:text-white/70 transition-colors">
          Reset
        </button>
      </div>

      {/* ── Result ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#D63C6B]/[0.07] to-transparent border border-[#D63C6B]/25 rounded-2xl p-6 flex flex-col">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-3">Your result</p>
        {result ? (
          <>
            <p className="text-5xl font-bold text-white tracking-tight">{fmtHM(result.workedMinutes)}</p>
            <p className="text-white/50 mt-1 text-sm">= {result.decimalHours} decimal hours worked</p>

            <dl className="mt-6 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-white/50">Shift span</dt><dd className="text-white/85">{fmtHM(result.totalShiftMinutes)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/50">Unpaid breaks</dt><dd className="text-white/85">−{fmtHM(result.unpaidBreakMinutes)}</dd></div>
              {result.paidBreakMinutes > 0 && (
                <div className="flex justify-between"><dt className="text-white/50">Paid breaks (counted)</dt><dd className="text-white/85">{fmtHM(result.paidBreakMinutes)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-white/50">Regular hours</dt><dd className="text-white/85">{fmtHM(result.regularMinutes)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-white/50">Overtime</dt>
                <dd className={result.overtimeMinutes > 0 ? 'text-[#5EEAD4] font-medium' : 'text-white/85'}>{fmtHM(result.overtimeMinutes)}</dd>
              </div>
              {result.grossPay != null && (
                <div className="flex justify-between pt-2.5 border-t border-white/10">
                  <dt className="text-white/70 font-medium">Estimated gross pay</dt>
                  <dd className="text-white font-bold">${result.grossPay.toFixed(2)}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap gap-2 mt-6 print:hidden">
              <button onClick={copy} className="text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-full px-4 py-2 transition-colors">
                {copied ? 'Copied ✓' : 'Copy result'}
              </button>
              <button onClick={share} className="text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Share
              </button>
              <button onClick={() => window.print()} className="text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 rounded-full px-4 py-2 transition-colors">
                Print
              </button>
            </div>

            {/* SEO → app funnel (Phase 18.4): contextual, after the value is delivered,
                never interrupting the calculator. */}
            <div className="mt-auto pt-6">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4">
                <p className="text-sm text-white/80 font-medium">Tracking these hours by hand every shift?</p>
                <p className="text-xs text-white/45 mt-1">
                  ShiftFlow logs your shifts, calculates overtime and take-home pay automatically, and predicts your next payday.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <a
                    href={`${APP_STORE_URL}?ct=work-hours-calculator`}
                    className="text-xs font-semibold text-white bg-[#D63C6B] hover:bg-[#c0355f] rounded-full px-4 py-2 transition-colors"
                  >
                    Track Hours with ShiftFlow
                  </a>
                  <Link href="/features" className="text-xs text-white/50 hover:text-white transition-colors">
                    See how it works →
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white/40 text-sm">Enter a start and end time to calculate.</p>
        )}
      </div>
    </div>
  )
}
