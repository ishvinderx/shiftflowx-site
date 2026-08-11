// Client-side analytics stub. Events queue into window.__sfToolEvents (capped
// at 100) so a future analytics platform (GA4 vs PostHog — operator decision
// pending) can drain the queue with zero call-site changes.
//
// NEVER pass financial inputs or results (rates, pay, tax amounts) into
// analytics — the props type is limited to calculator/category/jurisdiction
// on purpose. Do not widen it.

export type ToolEvent =
  | 'calculator_viewed'
  | 'calculator_started'
  | 'calculator_completed'
  | 'calculator_cta_clicked'

interface QueuedToolEvent {
  event: ToolEvent
  calculator: string
  category: string
  jurisdiction?: string
  ts: number
}

declare global {
  interface Window {
    __sfToolEvents?: QueuedToolEvent[]
  }
}

export function trackToolEvent(
  event: ToolEvent,
  props: { calculator: string; category: string; jurisdiction?: string },
): void {
  if (typeof window === 'undefined') return
  const queue = (window.__sfToolEvents ??= [])
  queue.push({ event, ...props, ts: Date.now() })
  if (queue.length > 100) queue.splice(0, queue.length - 100)
}
