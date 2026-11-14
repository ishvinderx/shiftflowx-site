'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import { appStoreCampaignUrl } from '@/lib/constants'
import { decimalToHm, hmToDecimal } from './decimalCalc'

// Two-way hours↔decimal converter (P1). Instant, no signup. The conversion table
// below the tool is server-rendered on the page for snippet extraction.

const ANALYTICS = { calculator: 'decimal-hours-calculator', category: 'Work & Time' }

export default function DecimalClient() {
  const [hours, setHours] = useState('8')
  const [minutes, setMinutes] = useState('45')
  const [decimal, setDecimal] = useState('8.75')
  const [lastEdited, setLastEdited] = useState<'hm' | 'dec'>('hm')

  const result = useMemo(
    () => (lastEdited === 'hm' ? hmToDecimal(hours, minutes) : decimalToHm(decimal)),
    [hours, minutes, decimal, lastEdited],
  )

  // Once-per-mount analytics: started on first input interaction, completed
  // when a valid result has rendered (the converter always shows one).
  const startedRef = useRef(false)
  const completedRef = useRef(false)
  const markStarted = () => {
    if (startedRef.current) return
    startedRef.current = true
    trackToolEvent('calculator_started', ANALYTICS)
  }
  useEffect(() => {
    if (completedRef.current) return
    completedRef.current = true
    trackToolEvent('calculator_completed', ANALYTICS)
  }, [result])

  const inputCls =
    'bg-track/40 border border-rule rounded-xl px-3 py-2.5 text-ink text-lg font-semibold text-center focus:outline-none focus:border-ink/60 w-24'

  return (
    <div className="bg-track/40 border border-rule rounded-2xl p-6" onChangeCapture={markStarted}>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <div>
            <label htmlFor="dh-h" className="block text-xs text-ink-2 text-center mb-1">Hours</label>
            <input id="dh-h" type="number" min={0} value={lastEdited === 'hm' ? hours : String(result.h)}
              onChange={(e) => { setHours(e.target.value); setLastEdited('hm') }} className={inputCls} />
          </div>
          <span className="text-ink-2 text-xl mt-5">:</span>
          <div>
            <label htmlFor="dh-m" className="block text-xs text-ink-2 text-center mb-1">Minutes</label>
            <input id="dh-m" type="number" min={0} max={59} value={lastEdited === 'hm' ? minutes : String(result.m)}
              onChange={(e) => { setMinutes(e.target.value); setLastEdited('hm') }} className={inputCls} />
          </div>
        </div>

        <span className="text-2xl text-ink font-bold mt-4" aria-hidden>=</span>

        <div>
          <label htmlFor="dh-d" className="block text-xs text-ink-2 text-center mb-1">Decimal hours</label>
          <input id="dh-d" type="number" min={0} step="0.01" value={lastEdited === 'dec' ? decimal : result.dec}
            onChange={(e) => { setDecimal(e.target.value); setLastEdited('dec') }}
            className={`${inputCls} w-32 border-ink/40`} />
        </div>
      </div>

      <p className="text-center text-ink-2 text-sm mt-5">
        {result.h}h {String(result.m).padStart(2, '0')}m = <span className="text-ink font-semibold">{result.dec}</span> decimal
        hours{' '}— at $20/hr that&apos;s <span className="text-ink-2">${(parseFloat(result.dec) * 20).toFixed(2)}</span> gross.
      </p>

      {/* Funnel CTA — was missing here (found by production verification Phase 13):
          this page linked only to /download, so its installs were unattributable. */}
      <div className="mt-6 max-w-md mx-auto bg-track/40 border border-rule rounded-xl p-4 text-center">
        <p className="text-sm text-ink font-medium">Converting timesheets by hand every week?</p>
        <p className="text-xs text-ink-2 mt-1">HoursFlow tracks shifts and does the decimal math automatically — pay estimates included.</p>
        <a
          href={appStoreCampaignUrl('decimal-hours-calculator')}
          onClick={() => trackToolEvent('calculator_cta_clicked', ANALYTICS)}
          className="inline-block mt-3 text-xs font-semibold text-ground bg-ink hover:bg-ink-2 rounded-full px-4 py-2 transition-colors"
        >
          Track Hours with HoursFlow
        </a>
      </div>
    </div>
  )
}
