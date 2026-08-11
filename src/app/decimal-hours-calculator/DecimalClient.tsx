'use client'

import { useMemo, useState } from 'react'
import { appStoreCampaignUrl } from '@/lib/constants'

// Two-way hours↔decimal converter (P1). Instant, no signup. The conversion table
// below the tool is server-rendered on the page for snippet extraction.

export default function DecimalClient() {
  const [hours, setHours] = useState('8')
  const [minutes, setMinutes] = useState('45')
  const [decimal, setDecimal] = useState('8.75')
  const [lastEdited, setLastEdited] = useState<'hm' | 'dec'>('hm')

  const result = useMemo(() => {
    if (lastEdited === 'hm') {
      const h = Math.max(0, parseInt(hours) || 0)
      const m = Math.min(59, Math.max(0, parseInt(minutes) || 0))
      return { dec: (h + m / 60).toFixed(2), h, m }
    }
    const d = Math.max(0, parseFloat(decimal) || 0)
    const h = Math.floor(d)
    const m = Math.round((d - h) * 60)
    return { dec: d.toFixed(2), h, m }
  }, [hours, minutes, decimal, lastEdited])

  const inputCls =
    'bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-lg font-semibold text-center focus:outline-none focus:border-[#D63C6B]/60 w-24'

  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <div>
            <label htmlFor="dh-h" className="block text-xs text-white/45 text-center mb-1">Hours</label>
            <input id="dh-h" type="number" min={0} value={lastEdited === 'hm' ? hours : String(result.h)}
              onChange={(e) => { setHours(e.target.value); setLastEdited('hm') }} className={inputCls} />
          </div>
          <span className="text-white/40 text-xl mt-5">:</span>
          <div>
            <label htmlFor="dh-m" className="block text-xs text-white/45 text-center mb-1">Minutes</label>
            <input id="dh-m" type="number" min={0} max={59} value={lastEdited === 'hm' ? minutes : String(result.m)}
              onChange={(e) => { setMinutes(e.target.value); setLastEdited('hm') }} className={inputCls} />
          </div>
        </div>

        <span className="text-2xl text-[#D63C6B] font-bold mt-4" aria-hidden>=</span>

        <div>
          <label htmlFor="dh-d" className="block text-xs text-white/45 text-center mb-1">Decimal hours</label>
          <input id="dh-d" type="number" min={0} step="0.01" value={lastEdited === 'dec' ? decimal : result.dec}
            onChange={(e) => { setDecimal(e.target.value); setLastEdited('dec') }}
            className={`${inputCls} w-32 border-[#D63C6B]/40`} />
        </div>
      </div>

      <p className="text-center text-white/45 text-sm mt-5">
        {result.h}h {String(result.m).padStart(2, '0')}m = <span className="text-white font-semibold">{result.dec}</span> decimal
        hours{' '}— at $20/hr that&apos;s <span className="text-white/70">${(parseFloat(result.dec) * 20).toFixed(2)}</span> gross.
      </p>

      {/* Funnel CTA — was missing here (found by production verification Phase 13):
          this page linked only to /download, so its installs were unattributable. */}
      <div className="mt-6 max-w-md mx-auto bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
        <p className="text-sm text-white/80 font-medium">Converting timesheets by hand every week?</p>
        <p className="text-xs text-white/45 mt-1">ShiftFlow tracks shifts and does the decimal math automatically — pay estimates included.</p>
        <a
          href={appStoreCampaignUrl('decimal-hours-calculator')}
          className="inline-block mt-3 text-xs font-semibold text-white bg-[#D63C6B] hover:bg-[#c0355f] rounded-full px-4 py-2 transition-colors"
        >
          Track Hours with ShiftFlow
        </a>
      </div>
    </div>
  )
}
