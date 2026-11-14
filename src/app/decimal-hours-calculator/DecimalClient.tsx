'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import { appStoreCampaignUrl } from '@/lib/constants'
import { decimalToHm, hmToDecimal } from './decimalCalc'
import { Figure } from '@/components/ui'
import { calcGridCls, inputCls, labelCls, resultsCls } from '@/components/calculator/kit'

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

  
  return (
    <div className={calcGridCls} onChangeCapture={markStarted}>
      <div className="grid min-w-0 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dh-h" className={labelCls}>Hours</label>
          <input id="dh-h" type="number" min={0} value={lastEdited === 'hm' ? hours : String(result.h)}
            onChange={(e) => { setHours(e.target.value); setLastEdited('hm') }} className={inputCls} />
        </div>
        <div>
          <label htmlFor="dh-m" className={labelCls}>Minutes</label>
          <input id="dh-m" type="number" min={0} max={59} value={lastEdited === 'hm' ? minutes : String(result.m)}
            onChange={(e) => { setMinutes(e.target.value); setLastEdited('hm') }} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="dh-d" className={labelCls}>Decimal hours</label>
          <input id="dh-d" type="number" min={0} step="0.01" value={lastEdited === 'dec' ? decimal : result.dec}
            onChange={(e) => { setDecimal(e.target.value); setLastEdited('dec') }} className={inputCls} />
          <p className="mt-1.5 text-[0.875rem] text-ink-2">Edit either side; the other updates.</p>
        </div>
      </div>

      <div className={resultsCls}>
        <Figure
          label="Decimal hours"
          value={result.dec}
          note={`${result.h}h ${String(result.m).padStart(2, '0')}m. At $20/hr that is $${(parseFloat(result.dec) * 20).toFixed(2)} gross.`}
        />
        {/* Funnel CTA: attributed App Store link (ct=decimal-hours-calculator). */}
        <p className="mt-8 text-[0.9375rem] text-ink-2">
          Converting timesheets by hand every week? HoursFlow tracks shifts and does the decimal math for you.{' '}
          <a
            href={appStoreCampaignUrl('decimal-hours-calculator')}
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
