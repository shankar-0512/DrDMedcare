import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Dr D's MedCare — Medication Counselling for India"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'rgb(240, 253, 250)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background accent circle */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgb(15, 118, 110)',
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgb(15, 118, 110)',
            opacity: 0.06,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgb(204, 251, 241)',
            border: '1px solid rgb(99, 194, 184)',
            borderRadius: 999,
            padding: '6px 18px',
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgb(15, 118, 110)',
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'rgb(15, 118, 110)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Medication Education · India
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: 'rgb(15, 23, 42)',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 800,
          }}
        >
          Understand your medicines before you take them
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: 'rgb(100, 116, 139)',
            textAlign: 'center',
            maxWidth: 640,
            lineHeight: 1.5,
          }}
        >
          {'Personalised medication counselling sessions with Dr\u00a0Priyanka, Pharm\u00a0D'}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'rgb(15, 118, 110)',
            }}
          >
            Dr D's MedCare
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgb(148, 163, 184)' }} />
          <div style={{ fontSize: 16, color: 'rgb(148, 163, 184)' }}>drdmedcare.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
