import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Pins the two claims the measurement layer makes: (1) with no key configured
// the site transmits NOTHING, and (2) when configured it sends only the typed,
// non-financial props.

const fetchMock = vi.fn(() => Promise.resolve({ ok: true } as Response))

beforeEach(() => {
  vi.resetModules()
  fetchMock.mockClear()
  vi.stubGlobal('fetch', fetchMock)
  vi.stubGlobal('window', { location: { pathname: '/gst-hst-calculator' } })
  vi.stubGlobal('sessionStorage', {
    _v: null as string | null,
    getItem() {
      return this._v
    },
    setItem(_k: string, v: string) {
      this._v = v
    },
  })
  vi.stubGlobal('crypto', { randomUUID: () => 'test-uuid' })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('trackToolEvent', () => {
  it('transmits nothing when no analytics key is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', '')
    const { trackToolEvent } = await import('./analytics')

    trackToolEvent('calculator_viewed', { calculator: 'gst-hst-calculator', category: 'GST/HST & Invoices' })

    expect(fetchMock).not.toHaveBeenCalled()
    expect(window.__sfToolEvents).toHaveLength(1)
    expect(window.__sfToolEvents![0].event).toBe('calculator_viewed')
  })

  it('sends only the typed non-financial props once a key is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'phc_test')
    const { trackToolEvent } = await import('./analytics')

    trackToolEvent('calculator_completed', {
      calculator: 'hst-invoice-calculator',
      category: 'GST/HST & Invoices',
      jurisdiction: 'ON',
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string)
    expect(body.event).toBe('calculator_completed')
    expect(body.api_key).toBe('phc_test')
    expect(Object.keys(body.properties).sort()).toEqual([
      '$current_url',
      'calculator',
      'category',
      'jurisdiction',
    ])
    // No amounts, rates, or results may ever reach the wire.
    expect(JSON.stringify(body)).not.toMatch(/rate|amount|pay|tax(?!Type)|revenue/i)
  })

  it('caps the debug queue at 100 events', async () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', '')
    const { trackToolEvent } = await import('./analytics')

    for (let i = 0; i < 130; i++) {
      trackToolEvent('calculator_started', { calculator: 'x', category: 'Work & Time' })
    }

    expect(window.__sfToolEvents).toHaveLength(100)
  })
})
