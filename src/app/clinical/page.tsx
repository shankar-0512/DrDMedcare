import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
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
    updated: '2026',
    patientLeaflet: true,
  },
]

export default function ClinicalIndexPage() {
  return (
    <main className="min-h-screen" style={{ background: 'rgb(var(--color-bg))', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero strip */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-primary)) 100%)' }}>
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="px-6 py-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white/90 transition-colors mb-6">
            ← Back to drdmedcare.com
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-widest mb-4">
            ⚕️ For Healthcare Professionals Only
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Clinical Drug Monographs</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl">
            Evidence-based clinical reference compiled by Dr Priyanka Deventhiran, Pharm D.
            Each monograph covers mechanism, dosing, pharmacokinetics, interactions, monitoring, and counselling points.
          </p>
        </div>
      </div>

      <div className="px-6 py-8 max-w-3xl mx-auto">

        {/* Disclaimer */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Important</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            These monographs are intended for use by qualified healthcare professionals only.
            They do not constitute medical advice and should not be used by patients for self-treatment decisions.
          </p>
        </div>

        {/* Monograph cards */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Available Monographs</p>
        <div className="flex flex-col gap-3">
          {MONOGRAPHS.map(m => (
            <div key={m.slug} className="bg-white rounded-2xl border border-slate-200 border-l-4 hover:shadow-md transition-all" style={{ borderLeftColor: 'rgb(var(--color-primary))' }}>
              <Link href={`/clinical/${m.slug}`} className="block group p-5 pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[rgb(var(--color-primary))] transition-colors">{m.name}</h2>
                    <p className="text-xs text-slate-400 mb-3 font-mono">{m.class} · ATC {m.atc} · {m.sections} sections · Last reviewed {m.updated}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.tags.map(t => (
                        <span key={t} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium border" style={{ background: 'rgb(var(--color-primary-soft))', color: 'rgb(var(--color-primary))', borderColor: 'rgb(var(--color-primary-mid))' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl font-bold transition-transform group-hover:translate-x-1" style={{ color: 'rgb(var(--color-primary))' }}>→</span>
                </div>
              </Link>
              {m.patientLeaflet && (
                <div className="px-5 pb-4 pt-0 flex items-center gap-2 border-t border-slate-100 mt-0 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Also available:</span>
                  <Link href={`/clinical/${m.slug}/patient-leaflet`} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border hover:shadow-sm transition-all" style={{ background: 'rgb(var(--color-primary-soft))', color: 'rgb(var(--color-primary))', borderColor: 'rgb(var(--color-primary-mid))' }}>
                    📄 Patient Information Leaflet
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-400 text-center">
          More monographs will be added over time. · Compiled by Dr Priyanka Deventhiran, Pharm D
        </p>
      </div>
    </main>
  )
}
