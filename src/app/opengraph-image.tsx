import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/constants'

export const runtime = 'edge'
export const alt = `${BRAND.name} — ${BRAND.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Colour literals are allowed here (ImageResponse cannot read CSS variables); they mirror
// the light-scheme Emerald tokens in globals.css: ground, ink, secondary text, rule, and the
// emerald gradient and mark colours from the app icon.
const GROUND = '#F4F2EC'
const INK = '#0D1220'
const INK_2 = '#5B6172'
const RULE = '#E6E3DA'
const EMERALD_GRADIENT = 'linear-gradient(135deg, #0F7D5A 0%, #0A5E45 55%, #063528 100%)'
const STEM = '#F3FBF7'
const BAR = '#C9FFE9'

export default function Image() {
  return new ImageResponse(
    <div style={{ background: GROUND, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* The H mark: emerald gradient tile, pale stems, mint-white crossbar (matches the app icon) */}
        <div style={{ width: '72px', height: '72px', background: EMERALD_GRADIENT, borderRadius: '16px', position: 'relative', display: 'flex' }}>
          <div style={{ position: 'absolute', left: '19px', top: '16px', width: '9px', height: '40px', background: STEM, borderRadius: '4px' }} />
          <div style={{ position: 'absolute', left: '44px', top: '16px', width: '9px', height: '40px', background: STEM, borderRadius: '4px' }} />
          <div style={{ position: 'absolute', left: '24px', top: '34px', width: '24px', height: '6px', background: BAR, transform: 'rotate(-12deg)' }} />
        </div>
        <span style={{ color: INK, fontSize: '44px', fontWeight: 600, letterSpacing: '-0.02em' }}>{BRAND.name}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: INK, fontSize: '112px', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.0, maxWidth: '900px' }}>{BRAND.tagline}</div>
        <div style={{ marginTop: '36px', height: '2px', width: '100%', background: RULE, display: 'flex' }} />
        <div style={{ marginTop: '24px', color: INK_2, fontSize: '28px' }}>Track hours, earnings, bills and tax estimates</div>
      </div>
    </div>,
    { ...size }
  )
}
