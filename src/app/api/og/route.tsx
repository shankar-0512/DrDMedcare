import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Awareness':            { bg: '#e0f2fe', text: '#0369a1' },
  'Education':            { bg: '#fef3c7', text: '#b45309' },
  'Our story':            { bg: '#ccfbf1', text: '#0f766e' },
  'Devices & conditions': { bg: '#ede9fe', text: '#7c3aed' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? "Dr D's MedCare Blog"
  const category = searchParams.get('category') ?? 'Awareness'
  const cat = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['Awareness']

  const fontSize = title.length > 80 ? 38 : title.length > 55 ? 44 : 52

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top teal accent bar */}
        <div style={{ height: '10px', background: '#0f766e', width: '100%', display: 'flex' }} />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '56px 80px',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f766e' }}>Dr D's MedCare</span>
            <span style={{ color: '#cbd5e1', fontSize: '20px' }}>·</span>
            <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 400 }}>Blog</span>
          </div>

          {/* Category badge + Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                display: 'flex',
                background: cat.bg,
                color: cat.text,
                fontSize: '16px',
                fontWeight: 700,
                padding: '6px 18px',
                borderRadius: '100px',
                width: 'fit-content',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.2,
                maxWidth: '980px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '17px', color: '#94a3b8' }}>dr-d-medcare.vercel.app</span>
            <span style={{ fontSize: '16px', color: '#0f766e', fontWeight: 600 }}>
              Medication Counselling · India
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
