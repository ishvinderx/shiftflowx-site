import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/constants'

export const runtime = 'edge'
export const alt = `${BRAND.name} — ${BRAND.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Colour literals are allowed here (ImageResponse cannot read CSS variables); they mirror
// the light-scheme tokens in globals.css: ground, ink, secondary text, mint, rule.
const GROUND = '#F5F3EE'
const INK = '#111827'
const INK_2 = '#5B6170'
const MINT = '#A8E6CF'
const RULE = '#DDD8CC'

export default function Image() {
  return new ImageResponse(
    <div style={{ background: GROUND, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* The H mark: midnight tile, ivory stems, mint crossbar */}
        <div style={{ width: '72px', height: '72px', background: INK, borderRadius: '16px', position: 'relative', display: 'flex' }}>
          <div style={{ position: 'absolute', left: '19px', top: '16px', width: '9px', height: '40px', background: GROUND, borderRadius: '4px' }} />
          <div style={{ position: 'absolute', left: '44px', top: '16px', width: '9px', height: '40px', background: GROUND, borderRadius: '4px' }} />
          <div style={{ position: 'absolute', left: '24px', top: '34px', width: '24px', height: '6px', background: MINT, transform: 'rotate(-12deg)' }} />
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
