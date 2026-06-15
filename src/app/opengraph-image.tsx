import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ShiftFlow — Protect Every Paycheck'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#050508', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#D63C6B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: '900' }}>S</div>
        <span style={{ color: 'white', fontSize: '36px', fontWeight: '800' }}>ShiftFlow</span>
      </div>
      <h1 style={{ color: 'white', fontSize: '64px', fontWeight: '900', margin: '0 0 16px', textAlign: 'center', lineHeight: 1.1 }}>Protect Every Paycheck.</h1>
      <p style={{ color: '#9ca3af', fontSize: '24px', margin: '0 0 40px', textAlign: 'center' }}>AI-powered workforce financial intelligence</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['AI Payroll Protection', 'Payday Forecasting', 'Burnout Prevention', 'Tax Tracking'].map(f => (
          <div key={f} style={{ background: 'rgba(214,60,107,0.15)', border: '1px solid rgba(214,60,107,0.3)', borderRadius: '100px', padding: '8px 16px', color: '#D63C6B', fontSize: '14px', fontWeight: '600' }}>{f}</div>
        ))}
      </div>
    </div>
  )
}
