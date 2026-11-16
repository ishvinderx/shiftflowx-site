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
  vi.stubGlobal('navigator', {})
  const storage = { getItem: vi.fn(), setItem: vi.fn() }
  vi.stubGlobal('sessionStorage', storage)
  vi.stubGlobal('localStorage', storage)
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
    const body = JSON.parse(((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]).body as string)
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

  it('stores nothing on the device and keeps one in-memory id per page load', async () => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'phc_test')
    const { trackToolEvent } = await import('./analytics')
    trackToolEvent('calculator_viewed', { calculator: 'x', category: 'y' })
    trackToolEvent('calculator_started', { calculator: 'x', category: 'y' })
    const ids = fetchMock.mock.calls.map((c) => JSON.parse(((c as unknown as [string, RequestInit])[1]).body as string).distinct_id)
    expect(ids).toEqual(['test-uuid', 'test-uuid'])
    expect(sessionStorage.setItem).not.toHaveBeenCalled()
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })

  it.each([
    ['Do Not Track', { doNotTrack: '1' }],
    ['Global Privacy Control', { globalPrivacyControl: true }],
  ])('transmits nothing when the browser sends %s', async (_name, nav) => {
    vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'phc_test')
    vi.stubGlobal('navigator', nav)
    const { trackToolEvent } = await import('./analytics')
    trackToolEvent('calculator_viewed', { calculator: 'x', category: 'y' })
    expect(fetchMock).not.toHaveBeenCalled()
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
