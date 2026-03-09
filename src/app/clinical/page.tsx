import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Clinical Reference — Drug Monographs | Dr D's MedCare",
  description: 'Clinical drug monographs for healthcare professionals. Compiled by Dr Priyanka Deventhiran, Pharm D.',
  robots: { index: true, follow: true },
}

const MONOGRAPHS = [
  {
    slug: 'medroxyprogesterone-acetate',
    name: 'Medroxyprogesterone Acetate',
    atc: 'G03AC06',
    class: 'Synthetic Progestogen',
    sections: 25,
    tags: ['Gynaecology', 'Contraception', 'HRT', 'Oncology'],
    updated: '2025',
  },
]

export default function ClinicalIndexPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8f4ee', padding: '3rem 2rem 5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(13,27,42,0.08)', border: '1px solid rgba(13,27,42,0.15)',
            color: '#0d1b2a', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '0.3rem 0.8rem', borderRadius: '2px', marginBottom: '1rem',
          }}>
            ⚕️ For Healthcare Professionals Only
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0d1b2a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
            Clinical Drug Monographs
          </h1>
          <p style={{ color: '#5a6478', maxWidth: '58ch', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Evidence-based clinical reference compiled by Dr Priyanka Deventhiran, Pharm D.
            Each monograph covers mechanism, dosing, pharmacokinetics, interactions, monitoring, and counselling points.
          </p>
          <div style={{
            marginTop: '1.2rem', padding: '0.9rem 1.1rem',
            background: '#fefce8', border: '1px solid #b45309',
            borderLeft: '4px solid #b45309', borderRadius: '4px',
            fontSize: '0.83rem', color: '#78350f', lineHeight: 1.6,
          }}>
            <strong>Important:</strong> These monographs are intended for use by qualified healthcare professionals only.
            They do not constitute medical advice and should not be used by patients for self-treatment decisions.
          </div>
        </div>

        <style>{`
          .monograph-card { background:#fff; border:1px solid #d8cfc4; border-radius:8px; padding:1.4rem 1.6rem; border-left:4px solid #c9a84c; transition:box-shadow 0.2s,transform 0.15s; }
          .monograph-card:hover { box-shadow:0 6px 24px rgba(0,0,0,0.1); transform:translateY(-1px); }
        `}</style>

        {/* Monograph cards */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {MONOGRAPHS.map(m => (
            <Link key={m.slug} href={`/clinical/${m.slug}`} style={{ textDecoration: 'none' }}>
              <div className="monograph-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d1b2a', marginBottom: '0.25rem', fontFamily: 'Georgia, serif' }}>
                      {m.name}
                    </h2>
                    <p style={{ fontSize: '0.78rem', color: '#5a6478', marginBottom: '0.7rem' }}>
                      {m.class} · ATC {m.atc} · {m.sections} sections · Last reviewed {m.updated}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {m.tags.map(t => (
                        <span key={t} style={{
                          background: '#e8f0fe', color: '#1d4ed8',
                          padding: '0.2rem 0.55rem', borderRadius: '2px',
                          fontSize: '0.73rem', fontWeight: 500,
                          border: '1px solid rgba(29,78,216,0.15)',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '1.2rem', marginTop: '0.2rem' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.78rem', color: '#9ca3af', textAlign: 'center' }}>
          More monographs will be added over time. · Compiled by Dr Priyanka Deventhiran, Pharm D
        </p>
      </div>
    </main>
  )
}
