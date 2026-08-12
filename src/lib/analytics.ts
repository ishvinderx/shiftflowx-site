// Client-side calculator analytics. ONE chokepoint: every tool event in the
// site goes through trackToolEvent, which queues to window.__sfToolEvents (for
// debugging) and forwards to PostHog when a key is configured.
//
// NEVER pass financial inputs or results (rates, pay, tax amounts) into
// analytics — the props type is limited to calculator/category/jurisdiction
// on purpose. Do not widen it.
//
// Transport: a direct fetch to PostHog's capture endpoint — no posthog-js, so
// no autocapture, no session recording, no cookies, no bundle weight. The site
// CSP already allows connect-src to us.i.posthog.com (script-src does not, so a
// CDN-loaded SDK would be blocked anyway).
//
// Privacy stance (matches the published cookie policy: anonymised, aggregated,
// no advertising networks): the distinct_id is a random id held in
// sessionStorage — scoped to one browsing session, never persisted across
// sessions, never linked to an account, and never derived from user input.
//
// INERT UNTIL CONFIGURED: with NEXT_PUBLIC_POSTHOG_KEY unset, nothing is sent
// anywhere. Setting the env var in Vercel turns the whole funnel on with no
// code change.

export type ToolEvent =
  | 'calculator_viewed'
  | 'calculator_started'
  | 'calculator_completed'
  | 'calculator_cta_clicked'

export interface ToolEventProps {
  calculator: string
  category: string
  jurisdiction?: string
}

interface QueuedToolEvent extends ToolEventProps {
  event: ToolEvent
  ts: number
}

declare global {
  interface Window {
    __sfToolEvents?: QueuedToolEvent[]
  }
}

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const SESSION_KEY = 'sf_anon_id'

/** Session-scoped anonymous id. Falls back to a per-page-load id in privacy
 *  modes where sessionStorage throws. */
function anonId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

export function trackToolEvent(event: ToolEvent, props: ToolEventProps): void {
  if (typeof window === 'undefined') return

  const queue = (window.__sfToolEvents ??= [])
  queue.push({ event, ...props, ts: Date.now() })
  if (queue.length > 100) queue.splice(0, queue.length - 100)

  if (!KEY) return // no platform configured — queue only, transmit nothing

  // Fire-and-forget. Analytics must never break a calculator.
  try {
    void fetch(`${HOST}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        api_key: KEY,
        event,
        distinct_id: anonId(),
        properties: {
          ...props,
          $current_url: window.location.pathname, // path only — never query strings
        },
      }),
    }).catch(() => {})
  } catch {
    // ignore
  }
}
