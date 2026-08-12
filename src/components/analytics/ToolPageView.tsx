'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackToolEvent } from '@/lib/analytics'
import { getTool } from '@/lib/tools/registry'

// Fires calculator_viewed — the first stage of the acquisition funnel — from a
// SINGLE place, mounted once in the root layout. Route-driven: any path that
// matches a live tool slug in the registry reports a view, so a calculator
// added later is measured automatically and can never be forgotten.
//
// Renders nothing.

export default function ToolPageView() {
  const pathname = usePathname()
  const lastReported = useRef<string | null>(null)

  useEffect(() => {
    const tool = getTool(pathname.replace(/^\//, ''))
    if (!tool || tool.status !== 'live') return
    if (lastReported.current === tool.slug) return // ignore re-renders, not real navigations
    lastReported.current = tool.slug
    trackToolEvent('calculator_viewed', { calculator: tool.slug, category: tool.category })
  }, [pathname])

  return null
}
