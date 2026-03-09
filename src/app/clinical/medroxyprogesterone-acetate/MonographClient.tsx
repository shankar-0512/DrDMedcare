'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import s from './monograph.module.css'

const NAV_ITEMS = [
  { id: 's1',  num: '01', title: 'Overview & Classification' },
  { id: 's2',  num: '02', title: 'Mechanism of Action' },
  { id: 's3',  num: '03', title: 'Indications' },
  { id: 's4',  num: '04', title: 'Off-label Uses' },
  { id: 's5',  num: '05', title: 'Forms & Formulations' },
  { id: 's6',  num: '06', title: 'Dosage & Administration' },
  { id: 's7',  num: '07', title: 'Pharmacokinetics (ADME)' },
  { id: 's8',  num: '08', title: 'Pharmacodynamics' },
  { id: 's9',  num: '09', title: 'Onset & Duration' },
  { id: 's10', num: '10', title: 'Therapeutic Index' },
  { id: 's11', num: '11', title: 'Contraindications' },
  { id: 's12', num: '12', title: 'Warnings & Precautions' },
  { id: 's13', num: '13', title: 'Adverse Effects' },
  { id: 's14', num: '14', title: 'Drug Interactions' },
  { id: 's15', num: '15', title: 'Overdose & Toxicity' },
  { id: 's16', num: '16', title: 'Pregnancy & Lactation' },
  { id: 's17', num: '17', title: 'Paediatric Use' },
  { id: 's18', num: '18', title: 'Geriatric Use' },
  { id: 's19', num: '19', title: 'Renal & Hepatic Dosing' },
  { id: 's20', num: '20', title: 'Monitoring Parameters' },
  { id: 's21', num: '21', title: 'Patient Counselling' },
  { id: 's22', num: '22', title: 'Storage & Handling' },
  { id: 's23', num: '23', title: 'Cost & Availability' },
  { id: 's24', num: '24', title: 'Regulatory Status' },
  { id: 's25', num: '25', title: 'Recent Updates' },
]

// ── Callout ───────────────────────────────────────────────

type CalloutType = 'danger' | 'warning' | 'info' | 'success'

const CALLOUT_STYLES: Record<CalloutType, { wrap: string; title: string; icon: string }> = {
  danger:  { wrap: 'bg-red-50 border-l-4 border-red-500',    title: 'text-red-700',    icon: '⛔' },
  warning: { wrap: 'bg-amber-50 border-l-4 border-amber-500', title: 'text-amber-700',  icon: '⚠️' },
  info:    { wrap: 'bg-teal-50 border-l-4 border-teal-600',   title: 'text-teal-800',   icon: 'ℹ️' },
  success: { wrap: 'bg-green-50 border-l-4 border-green-600', title: 'text-green-800',  icon: '✅' },
}

function Callout({ type, title, children }: { type: CalloutType; title: string; children: React.ReactNode }) {
  const c = CALLOUT_STYLES[type]
  return (
    <div className={`${c.wrap} rounded-r-xl p-4 my-4`}>
      <p className={`${c.title} text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5`}>
        {title}
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-1">{children}</div>
    </div>
  )
}

// ── Table ─────────────────────────────────────────────────

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  )
}

function THead({ children }: { children: React.ReactNode }) {
  return <thead style={{ background: 'rgb(var(--color-primary))' }}>{children}</thead>
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap" style={{ color: 'rgb(var(--color-primary-soft))' }}>
      {children}
    </th>
  )
}

function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <td className={`px-4 py-3 text-slate-600 border-b border-slate-100 align-top text-sm leading-relaxed ${bold ? 'font-semibold text-slate-800' : ''}`}>
      {children}
    </td>
  )
}

function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="transition-colors hover:bg-teal-50/40">{children}</tr>
}

// ── Dose Card ─────────────────────────────────────────────

function DoseCard({ indication, dose, notes }: { indication: string; dose: string; notes: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 border-t-2 hover:shadow-md transition-shadow" style={{ borderTopColor: 'rgb(var(--color-primary))' }}>
      <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgb(var(--color-primary))' }}>{indication}</p>
      <p className="font-mono text-base font-semibold text-slate-900 mb-1">{dose}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{notes}</p>
    </div>
  )
}

// ── PK Card ───────────────────────────────────────────────

function PKCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl p-4 relative overflow-hidden" style={{ background: 'rgb(var(--color-secondary))' }}>
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, rgb(var(--color-primary-mid)), transparent)' }} />
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgb(var(--color-primary-mid))' }}>{label}</p>
      <p className="font-mono text-sm font-semibold text-white leading-tight mb-1">{value}</p>
      <p className="text-[11px] text-slate-400 leading-relaxed">{note}</p>
    </div>
  )
}

// ── AE Item ───────────────────────────────────────────────

function AEItem({ type, children }: { type: 'common' | 'serious'; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${type === 'common' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {children}
    </li>
  )
}

// ── Counsel Card ──────────────────────────────────────────

function CounselCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 border-l-4 hover:shadow-sm transition-shadow" style={{ borderLeftColor: 'rgb(var(--color-primary))' }}>
      <div className="text-xl mb-2">{icon}</div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700 mb-1.5">{title}</p>
      <p className="text-sm text-slate-500 leading-relaxed">{children}</p>
    </div>
  )
}

// ── Monitor Item ──────────────────────────────────────────

function MonitorItem({ param, freq }: { param: string; freq: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 hover:border-teal-300 hover:shadow-sm transition-all">
      <p className="text-sm font-semibold text-slate-800 mb-0.5">{param}</p>
      <p className="text-xs font-mono text-slate-400 leading-snug">{freq}</p>
    </div>
  )
}

// ── Tag ───────────────────────────────────────────────────

function Tag({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'amber' | 'red' | 'green' | 'teal' }) {
  const v = {
    blue:  'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red:   'bg-red-50 text-red-700 border-red-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    teal:  'bg-teal-50 border-teal-200',
  }[variant]
  const tealStyle = variant === 'teal' ? { color: 'rgb(var(--color-primary))' } : {}
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${v}`} style={tealStyle}>
      {children}
    </span>
  )
}

// ── Section ───────────────────────────────────────────────

function Section({ id, num, title, collapsed, onToggle, children }: {
  id: string; num: string; title: string; collapsed: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-slate-50/80 transition-colors"
        aria-expanded={!collapsed}
      >
        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border" style={{ color: 'rgb(var(--color-primary))', background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
          {num}
        </span>
        <h2 className="flex-1 text-base font-bold text-slate-900 leading-snug">{title}</h2>
        <svg className={`w-4 h-4 text-slate-400 ${s.chevron} ${collapsed ? s.chevronCollapsed : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`${s.sectionContent} ${collapsed ? s.sectionContentCollapsed : ''}`}>
        <div className="px-6 pb-6 pt-1 space-y-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          {children}
        </div>
      </div>
    </section>
  )
}

// ── Main Component ────────────────────────────────────────

export default function MonographClient() {
  const allIds = NAV_ITEMS.map(n => n.id)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState('s1')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const collapseAll = () => {
    const all: Record<string, boolean> = {}
    allIds.forEach(id => { all[id] = true })
    setCollapsed(all)
  }

  const expandAll = () => setCollapsed({})

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
    }, { rootMargin: '-10% 0px -80% 0px' })
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setShowTop(scrolled > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const link = navRef.current.querySelector(`[data-id="${activeId}"]`)
    link?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeId])

  const filteredIds = new Set(
    NAV_ITEMS.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) || n.num.includes(search)
    ).map(n => n.id)
  )

  const completedCount = allIds.filter(id => !collapsed[id]).length

  return (
    <>
      {/* Progress bar */}
      <div className={s.progressBar} style={{ width: `${scrollProgress}%` }} />

      {/* Mobile toggle */}
      <button className={s.mobileToggle} onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle navigation">
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div className={`${s.overlay} ${s.overlayVisible}`} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`${s.sidebar} bg-slate-900 border-r border-slate-800 flex flex-col ${sidebarOpen ? s.sidebarOpen : ''}`}>

        {/* Header */}
        <div className="px-4 py-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center justify-between mb-3">
            <Link href="/clinical" className="flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-300 transition-colors">
              ← Clinical Reference
            </Link>
            <Link href="/" className="flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-teal-400 transition-colors">
              🏠 Home
            </Link>
          </div>
          <p className="text-white text-sm font-bold leading-tight">Medroxyprogesterone Acetate</p>
          <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest mt-0.5">Clinical Drug Monograph</p>
          <Link href="/clinical/medroxyprogesterone-acetate/patient-leaflet" className="inline-flex items-center gap-1 mt-2 text-[10px] font-medium rounded-full px-2.5 py-0.5 border border-teal-800 bg-teal-900/40 text-teal-400 hover:bg-teal-800/60 transition-colors">
            📄 Patient Leaflet
          </Link>

          {/* Progress indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-slate-800 rounded-full h-1">
              <div className="h-1 rounded-full transition-all" style={{ width: `${scrollProgress}%`, background: 'rgb(var(--color-primary))' }} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">{Math.round(scrollProgress)}%</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3 pb-1">
          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-500 outline-none focus:border-teal-600 transition-colors"
            placeholder="Search sections…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Collapse controls */}
        <div className="flex gap-2 px-3 py-2">
          <button onClick={expandAll} className="flex-1 text-[10px] font-semibold uppercase tracking-wide py-1 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            Expand all
          </button>
          <button onClick={collapseAll} className="flex-1 text-[10px] font-semibold uppercase tracking-wide py-1 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            Collapse all
          </button>
        </div>

        {/* Sections open counter */}
        <p className="px-4 text-[10px] text-slate-600 pb-1">{completedCount} of {allIds.length} sections expanded</p>

        {/* Nav */}
        <nav ref={navRef} className="flex-1 overflow-y-auto pb-4">
          <p className="px-4 pt-3 pb-1 text-[9px] font-bold uppercase tracking-widest text-slate-600">Contents</p>
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              className={[
                s.navLink,
                activeId === item.id ? s.navLinkActive : '',
                !filteredIds.has(item.id) ? s.navLinkHidden : '',
              ].join(' ')}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="font-mono text-[10px] text-slate-600 min-w-[1.6rem] mt-0.5">{item.num}</span>
              {item.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main className={s.main} style={{ background: 'rgb(var(--color-bg))' }}>

        {/* ── Hero ── */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-primary)) 100%)' }}>
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-40 h-40 rounded-full opacity-5 bg-white" />

          <div className="relative px-8 py-10 lg:py-14">
            <Link href="/clinical" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white/90 transition-colors mb-6">
              ← Clinical Reference
            </Link>

            <div className="flex flex-wrap items-start gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-widest">
                ⚕️ PharmD Clinical Monograph
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-semibold text-white/80 hover:bg-white/20 transition-colors uppercase tracking-widest cursor-pointer"
              >
                🖨 Print / PDF
              </button>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1">
              Medroxyprogesterone <span className="text-white/70">Acetate</span>
            </h1>
            <p className="text-white/55 text-sm uppercase tracking-widest font-medium mb-6">
              Comprehensive Clinical Reference · Oral & Parenteral Formulations
            </p>

            {/* Classification tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['Synthetic Progestogen', 'ATC G03AC06', 'Prescription Only', 'Hormonal Therapy', 'CYP3A4 Substrate'].map(t => (
                <span key={t} className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-medium text-white/80">{t}</span>
              ))}
            </div>
            <Link href="/clinical/medroxyprogesterone-acetate/patient-leaflet" className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/25 transition-colors mb-8">
              📄 Patient Information Leaflet →
            </Link>

            {/* Quick-ref meta strip */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-5">
              {[
                ['Molecular Formula', 'C₂₄H₃₄O₄'],
                ['Molecular Weight', '386.52 g/mol'],
                ['CAS Number', '71-58-9'],
                ['FDA Approval', 'June 18, 1959'],
                ['Last Reviewed', '2025'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-0.5">{label}</p>
                  <p className="font-mono text-xs text-white/80 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-6 py-6">

          {/* 01 */}
          <Section id="s1" num="01" title="What Is It? — Drug Overview & Classification" collapsed={!!collapsed['s1']} onToggle={() => toggleSection('s1')}>
            <p>Medroxyprogesterone acetate (MPA) is a synthetic progestogen derived from progesterone. Structurally it is the 17α-acetate ester of medroxyprogesterone, carrying a 6α-methyl substitution on the pregnane steroid backbone. These modifications — the 6α-methyl group and the 17α-acetoxy moiety — substantially increase metabolic stability relative to native progesterone, conferring superior oral bioavailability and a prolonged duration of action, particularly in parenteral depot formulations.</p>
            <p>MPA is a potent, selective progesterone receptor (PR) agonist. It does not bind sex hormone-binding globulin (SHBG), which distinguishes it from some other progestins. While MPA exhibits weak androgenic activity, it is largely devoid of significant oestrogenic action at therapeutic doses. At high doses, it also demonstrates glucocorticoid receptor cross-reactivity, explaining the Cushingoid features observed in oncology dosing regimens.</p>
            <p>It is classified under the hormonal agents — progestogens — and is used across a broad spectrum of gynaecological, oncological, and endocrinological indications.</p>
            <Table>
              <THead><tr><Th>Parameter</Th><Th>Detail</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Generic Name</Td><Td>Medroxyprogesterone Acetate (MPA)</Td></TRow>
                <TRow><Td bold>Drug Class</Td><Td>Progestogen — Synthetic Progestin (Pregnane derivative)</Td></TRow>
                <TRow><Td bold>Therapeutic Class</Td><Td>Hormones — Sex Hormones & Modulators of the Genital System</Td></TRow>
                <TRow><Td bold>ATC Code</Td><Td>G03AC06</Td></TRow>
                <TRow><Td bold>Chemical Name</Td><Td>6α-Methyl-17α-acetoxypregn-4-ene-3,20-dione</Td></TRow>
                <TRow><Td bold>Molecular Formula</Td><Td>C₂₄H₃₄O₄</Td></TRow>
                <TRow><Td bold>Molecular Weight</Td><Td>386.52 g/mol</Td></TRow>
                <TRow><Td bold>CAS Number</Td><Td>71-58-9</Td></TRow>
                <TRow><Td bold>FDA First Approval</Td><Td>June 18, 1959</Td></TRow>
                <TRow><Td bold>Route of Administration</Td><Td>Oral; Intramuscular (IM); Subcutaneous (SC)</Td></TRow>
                <TRow><Td bold>Receptor Targets</Td><Td>Progesterone receptor (primary); weak glucocorticoid & androgen receptor activity</Td></TRow>
                <TRow><Td bold>SHBG Binding</Td><Td>None (unlike some progestins)</Td></TRow>
              </tbody>
            </Table>
          </Section>

          {/* 02 */}
          <Section id="s2" num="02" title="How It Works — Mechanism of Action" collapsed={!!collapsed['s2']} onToggle={() => toggleSection('s2')}>
            <p>MPA acts as a potent full agonist at the progesterone receptor (PR), with approximately 100-fold higher binding affinity and transactivation potency compared to endogenous progesterone. This explains why oral doses of just 10 mg/day can suppress ovulation — a task that would require 300 mg/day of exogenous progesterone.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Endometrial Effects</p>
            <p>When adequate endogenous oestrogen is present, MPA transforms proliferative endometrium into secretory endometrium. This is the basis for its utility in treating dysfunctional uterine bleeding and for providing endometrial protection in women receiving unopposed oestrogen as HRT.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Hypothalamic–Pituitary Axis Suppression</p>
            <p>MPA binds progesterone receptors in the hypothalamus and anterior pituitary, suppressing GnRH secretion and consequently reducing LH and FSH release. This effect is dose- and route-dependent:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Parenteral high-dose MPA (e.g., 150 mg IM):</strong> Reliably inhibits follicular maturation and ovulation — the basis for its contraceptive action.</li>
              <li><strong className="text-slate-800">Standard oral doses:</strong> Do <em>not</em> reliably suppress ovulation. This is a clinically critical point when counselling patients on contraception.</li>
            </ul>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Antiproliferative Effects</p>
            <p>MPA inhibits gonadotrophin production and has antiproliferative effects on endometrial tissue. At high doses used in oncology, it induces p53-dependent apoptosis in cancer cell lines and reduces nuclear oestrogen receptor expression and DNA synthesis in endometrial epithelial cells.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Other Receptor Activities</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Androgenic:</strong> Weak androgenic activity may contribute to acne and hair loss as adverse effects.</li>
              <li><strong className="text-slate-800">Glucocorticoid:</strong> At high (oncology) doses, cross-reactivity with glucocorticoid receptors produces Cushingoid features — moon facies, fluid retention, glucose intolerance.</li>
              <li><strong className="text-slate-800">PGRMC1 (membrane PR component-1):</strong> MPA weakly stimulates MCF-7 breast cancer cell proliferation via PGRMC1 in vitro, independent of classical PRs. This in vitro observation may partly explain the breast cancer signal observed in the WHI CE/MPA combination study, though the in vivo clinical relevance remains under investigation.</li>
            </ul>
          </Section>

          {/* 03 */}
          <Section id="s3" num="03" title="What It Treats — Licensed Indications" collapsed={!!collapsed['s3']} onToggle={() => toggleSection('s3')}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-primary))' }}>Standard-Dose Oral (2.5–10 mg tablets)</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Secondary amenorrhoea</strong> due to hormonal imbalance (excluding organic causes such as fibroids or uterine cancer)</li>
              <li><strong className="text-slate-800">Abnormal uterine bleeding</strong> due to ovulatory dysfunction</li>
              <li><strong className="text-slate-800">Prevention of endometrial hyperplasia</strong> in postmenopausal women receiving unopposed oestrogen HRT (intact uterus)</li>
              <li><strong className="text-slate-800">Endometriosis</strong> — symptom management including dysmenorrhoea and dyspareunia</li>
              <li><strong className="text-slate-800">Polycystic ovary syndrome (PCOS)</strong> — induction of withdrawal bleeding in oligomenorrhoeic or anovulatory women</li>
              <li><strong className="text-slate-800">Hot flushes</strong> associated with androgen deprivation therapy for prostate cancer</li>
            </ul>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Injectable Formulations</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">IM 150 mg/mL:</strong> Contraception; adjunctive/palliative therapy for inoperable, recurrent, or metastatic endometrial carcinoma (400 mg/mL formulation)</li>
              <li><strong className="text-slate-800">SC 104 mg/0.65 mL:</strong> Contraception; pain management in endometriosis</li>
            </ul>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>High-Dose Oral (100–400 mg tablets)</p>
            <p>Reserved exclusively for certain oncological indications. Not within the scope of this standard-dose monograph — specialist oncology guidance should be followed.</p>
          </Section>

          {/* 04 */}
          <Section id="s4" num="04" title="Off-label Uses" collapsed={!!collapsed['s4']} onToggle={() => toggleSection('s4')}>
            <Callout type="warning" title="⚠️ Note">
              <p>The following uses are not formally licensed but are recognised in clinical practice. Evidence quality and regulatory acceptance vary by indication and jurisdiction.</p>
            </Callout>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Male hypersexuality / paraphilia:</strong> High-dose IM MPA has been used for pharmacological libido suppression — a controversial application with significant ethical considerations.</li>
              <li><strong className="text-slate-800">Preterm birth prevention:</strong> Limited evidence for risk reduction in selected high-risk pregnancies; largely superseded by 17-hydroxyprogesterone caproate in most guidelines.</li>
              <li><strong className="text-slate-800">Progestin-primed ovarian stimulation (PPOS) in ART:</strong> Increasingly used as part of IVF stimulation protocols to prevent premature LH surges; MPA co-administered with gonadotrophins during controlled ovarian stimulation.</li>
              <li><strong className="text-slate-800">Appetite stimulation and cancer cachexia:</strong> Related progestin megestrol acetate is more commonly used; MPA occasionally substituted.</li>
              <li><strong className="text-slate-800">Atypical endometrial hyperplasia / early endometrial cancer (fertility-sparing):</strong> MPA 500 mg/day — specialist oncology context only.</li>
            </ul>
          </Section>

          {/* 05 */}
          <Section id="s5" num="05" title="Forms & Formulations" collapsed={!!collapsed['s5']} onToggle={() => toggleSection('s5')}>
            <Table>
              <THead><tr><Th>Formulation</Th><Th>Strength(s)</Th><Th>Route</Th><Th>Primary Use</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Oral Tablet (standard)</Td><Td>2.5 mg, 5 mg, 10 mg</Td><Td>Oral (PO)</Td><Td>Gynaecological conditions, HRT adjunct, prostate cancer hot flushes</Td></TRow>
                <TRow><Td bold>Oral Tablet (high-dose)</Td><Td>100 mg, 200 mg, 400 mg</Td><Td>Oral (PO)</Td><Td>Oncology only — endometrial/renal carcinoma</Td></TRow>
                <TRow><Td bold>Injectable Suspension (IM)</Td><Td>150 mg/mL (1 mL vial or prefilled syringe)</Td><Td>Deep IM injection</Td><Td>Contraception; oncology palliative (400 mg/mL)</Td></TRow>
                <TRow><Td bold>Injectable Suspension (SC)</Td><Td>104 mg/0.65 mL prefilled syringe</Td><Td>Subcutaneous</Td><Td>Contraception; endometriosis pain</Td></TRow>
              </tbody>
            </Table>
            <p><strong className="text-slate-800">Inactive excipients (oral tablets):</strong> Typically include crospovidone, lactose monohydrate, magnesium stearate, methylcellulose, pregelatinised corn starch, and sodium lauryl sulfate. Clinicians should verify excipient content per product-specific SmPC — particularly for patients with lactose intolerance.</p>
          </Section>

          {/* 06 */}
          <Section id="s6" num="06" title="Dosage & Administration" collapsed={!!collapsed['s6']} onToggle={() => toggleSection('s6')}>
            <Callout type="info" title="ℹ️ Food Effect">
              <p>Taking oral MPA with food significantly increases bioavailability. A 10 mg dose taken peri-prandially increases Cmax by 50–70% and AUC by 18–33%, without altering half-life. While not strictly required, consistent administration with or without food is advisable for predictable drug levels.</p>
            </Callout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
              <DoseCard indication="Secondary Amenorrhoea" dose="5–10 mg OD × 5–10 days" notes="Commence at any point in cycle. Withdrawal bleed expected 3–7 days post-course." />
              <DoseCard indication="Abnormal Uterine Bleeding" dose="5–10 mg OD × 5–10 days" notes="Begin on days 16–21 of cycle. If oestrogenic deficiency co-exists, add oestrogen." />
              <DoseCard indication="Endometriosis" dose="10 mg TDS × 3 months" notes="30 mg/day continuously. Begin on first day of a period." />
              <DoseCard indication="PCOS (Oligomenorrhoea)" dose="10 mg OD × 14 days" notes="Every 1–3 months to induce withdrawal bleeding." />
              <DoseCard indication="HRT Endometrial Protection" dose="1.5–10 mg OD" notes="Sequential: 10 mg × 12–14 days/cycle. Continuous combined: 2.5–5 mg daily." />
              <DoseCard indication="Prostate Cancer Hot Flushes" dose="20 mg OD (2 × 10 mg)" notes="Initial 10-week course. Review and continue as needed." />
              <DoseCard indication="Contraception (IM)" dose="150 mg IM q13 weeks" notes="Initiate within 5 days of menstrual onset. Vigorously shake vial before use." />
              <DoseCard indication="Contraception (SC)" dose="104 mg SC q13 weeks" notes="Anterior thigh or abdomen. 45° angle. Do not rub after injection." />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest pt-1" style={{ color: 'rgb(var(--color-primary))' }}>Administration Notes</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Tablets: Swallow whole with water. May be taken with or without food (though food improves absorption).</li>
              <li>Sublingual administration of tablets is pharmacologically feasible but not routinely recommended.</li>
              <li>IM injections: Administer to gluteal or deltoid region. Vigorously shake suspension immediately before use. Never dilute, never administer IV.</li>
              <li>SC injections: Administer to anterior thigh or abdomen at 45°. Pull skin away from body before injecting. Press lightly — do not rub post-injection.</li>
              <li>If more than 13 weeks have elapsed since the last injectable dose, exclude pregnancy before re-administering.</li>
              <li>Duration of therapy is indication-dependent. Most gynaecological oral courses run 2–3 months. Injectable contraception requires ongoing q13-week scheduling.</li>
            </ul>
          </Section>

          {/* 07 */}
          <Section id="s7" num="07" title="Pharmacokinetics — ADME" collapsed={!!collapsed['s7']} onToggle={() => toggleSection('s7')}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-primary))' }}>Absorption</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <PKCard label="Tmax (oral)" value="2–4 hours" note="Rapid GI absorption; lag time ~30 min" />
              <PKCard label="Cmax (oral 10 mg)" value="1.2–5.2 ng/mL" note="Via GC-MS; highly variable between individuals" />
              <PKCard label="Food Effect" value="↑Cmax 50–70%" note="↑AUC 18–33%; t½ unchanged" />
              <PKCard label="Oral Bioavailability" value="~100%" note="Absolute bioavailability not formally studied; high relative BA confirmed" />
              <PKCard label="Tmax (IM 150 mg)" value="~3 weeks" note="Peak plasma 1–7 ng/mL; prolonged depot release" />
              <PKCard label="Tmax (SC 104 mg)" value="~6.5 days" note="Cmax ~3.83 nmol/L; slower absorption vs IM" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Distribution</p>
            <div className="grid grid-cols-2 gap-2.5 my-3">
              <PKCard label="Protein Binding" value="86–90%" note="Primarily to albumin; NO binding to SHBG" />
              <PKCard label="Volume of Distribution" value="High (lipophilic)" note="Extensive tissue distribution; exact Vd not standardised" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Metabolism</p>
            <p>MPA is extensively metabolised in the liver, primarily via CYP3A4-mediated hydroxylation at positions C6β, C21, C2β, and C1β. Additional metabolic routes include 3- and 5-dihydro and 3,5-tetrahydro metabolite formation, as well as conjugation reactions. The 6α-methyl and 17α-acetoxy modifications make MPA more resistant to first-pass metabolism than progesterone, accounting for its superior oral efficacy.</p>
            <p>No formal DDI studies with specific CYP3A4 inducers or inhibitors have been conducted for MPA, though CYP3A4 inducers are known to reduce MPA plasma concentrations clinically.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-2" style={{ color: 'rgb(var(--color-primary))' }}>Elimination</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <PKCard label="Half-life (oral)" value="11.6–33 hours" note="Variable; some sources report up to 40–60 hours for high-dose formulations" />
              <PKCard label="Half-life (IM depot)" value="~50 days" note="Microcrystalline aqueous suspension" />
              <PKCard label="Half-life (SC depot)" value="~40 days" note="Microcrystalline aqueous suspension" />
              <PKCard label="Urinary Excretion" value="20–50%" note="Following IV administration" />
              <PKCard label="Faecal Excretion" value="5–10%" note="Minor route of elimination" />
              <PKCard label="Clearance (oral)" value="1,600–4,000 L/day" note="High inter-patient variability; mean ~1,668 L/day" />
            </div>
            <Callout type="warning" title="⚠️ Hepatic Impairment — PK Impact">
              <p>MPA is almost exclusively hepatically cleared. In patients with alcoholic cirrhosis, elimination is significantly reduced. Oral dose reduction may be warranted; injectable formulations have no established dose-adjustment guidance in this setting. Avoid in significant liver disease.</p>
            </Callout>
          </Section>

          {/* 08 */}
          <Section id="s8" num="08" title="Pharmacodynamics — What MPA Does to the Body" collapsed={!!collapsed['s8']} onToggle={() => toggleSection('s8')}>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Endometrial transformation:</strong> Converts proliferative to secretory endometrium in the presence of adequate endogenous oestrogen.</li>
              <li><strong className="text-slate-800">GnRH suppression:</strong> Reduces hypothalamic GnRH pulsatility → ↓ FSH & LH → follicular suppression (dose- and route-dependent).</li>
              <li><strong className="text-slate-800">Cervical mucus thickening:</strong> Contributes to contraceptive efficacy of injectable formulations.</li>
              <li><strong className="text-slate-800">Androgenic effects:</strong> Mild acnegenic and androgenic activity at the skin level; modest impact on lipid profile (↑ LDL, ↓ HDL with long-term use).</li>
              <li><strong className="text-slate-800">Glucocorticoid receptor activity (high doses):</strong> Adrenal suppression, Cushingoid features, glucose intolerance possible with oncology-level dosing.</li>
              <li><strong className="text-slate-800">Bone mineral density (parenteral, long-term):</strong> Suppression of ovarian oestrogen production leads to progressive BMD reduction with continued Depo-MPA use — particularly significant in adolescents during peak bone accrual.</li>
              <li><strong className="text-slate-800">CNS:</strong> Mood changes, depression, insomnia — mechanism incompletely understood; likely mediated via hypothalamic serotonergic and GABAergic modulation.</li>
            </ul>
          </Section>

          {/* 09 */}
          <Section id="s9" num="09" title="Onset & Duration of Action" collapsed={!!collapsed['s9']} onToggle={() => toggleSection('s9')}>
            <Table>
              <THead><tr><Th>Formulation</Th><Th>Onset</Th><Th>Full Effect</Th><Th>Duration</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Oral (gynaecological)</Td><Td>Immediate (pharmacologically)</Td><Td>2–3 months for full symptom resolution</Td><Td>Per treatment course (typically 5–14 days or cyclic)</Td></TRow>
                <TRow><Td bold>IM 150 mg (contraception)</Td><Td>Contraceptive within 24 hours if given on day 1–5 of cycle</Td><Td>Peak serum ~3 weeks post-injection</Td><Td>13 weeks (3 months) per dose</Td></TRow>
                <TRow><Td bold>SC 104 mg (contraception)</Td><Td>Contraceptive within 24 hours (day 1–5 of cycle)</Td><Td>Peak ~6–7 days</Td><Td>13 weeks per dose</Td></TRow>
                <TRow><Td bold>Fertility return (post-IM)</Td><Td>N/A</Td><Td>Median 10 months post last injection</Td><Td>Up to 12–18 months in some patients</Td></TRow>
              </tbody>
            </Table>
            <p>Oral tablets begin working immediately but patients should be counselled that symptom improvement — particularly for heavy periods or endometriosis pain — may take one to three months to become fully apparent.</p>
          </Section>

          {/* 10 */}
          <Section id="s10" num="10" title="Therapeutic Index" collapsed={!!collapsed['s10']} onToggle={() => toggleSection('s10')}>
            <Callout type="success" title="✅ Wide Therapeutic Index">
              <p>MPA has a wide therapeutic window. Doses range from 2.5 mg/day (HRT adjunct) to 1,000 mg or more (oncology), with no defined toxic serum threshold in routine clinical use. The oral LD₅₀ in rats exceeds 6,400 mg/kg. Overdose from standard formulations is unlikely to produce a specific toxic syndrome beyond an exaggeration of common adverse effects.</p>
            </Callout>
            <p>The principal clinical concern is not acute toxicity but rather long-term safety signals: BMD reduction with prolonged parenteral use, and cardiovascular/oncological risks when combined with oestrogen in HRT — neither of which constitutes narrow therapeutic index behaviour in the classical sense.</p>
          </Section>

          {/* 11 */}
          <Section id="s11" num="11" title="Contraindications — When NOT to Use" collapsed={!!collapsed['s11']} onToggle={() => toggleSection('s11')}>
            <Callout type="danger" title="⛔ Absolute Contraindications">
              <ul className="list-disc pl-4 space-y-1">
                <li>Known or suspected <strong>hypersensitivity</strong> to MPA or any formulation excipient</li>
                <li>Current or past <strong>breast cancer</strong> or other hormone-sensitive malignancy</li>
                <li><strong>Undiagnosed abnormal vaginal bleeding</strong> — organic cause must be excluded first</li>
                <li><strong>Pregnancy</strong> (FDA Category X; potential fetal genital abnormalities with first-trimester exposure)</li>
                <li>Active or past history of <strong>thromboembolic disorders</strong> — DVT, pulmonary embolism, cerebrovascular disease, retinal thrombosis, or coronary occlusion</li>
                <li>Active or significant <strong>hepatic impairment</strong> or liver disease with abnormal function</li>
                <li>Known or past <strong>meningioma</strong> (MPA has been implicated in meningioma growth promotion)</li>
                <li>Active <strong>porphyria</strong></li>
                <li>Known hypersensitivity to <strong>peanuts</strong> — verify per product SmPC, as some injectable formulations contain peanut oil</li>
              </ul>
            </Callout>
          </Section>

          {/* 12 */}
          <Section id="s12" num="12" title="Warnings & Precautions" collapsed={!!collapsed['s12']} onToggle={() => toggleSection('s12')}>
            <Callout type="danger" title="⚠️ Black Box Warning (FDA) — Combination HRT with Oestrogen">
              <p>The following warnings apply <strong>specifically when MPA is used in combination with oestrogen</strong> (e.g., conjugated oestrogens + MPA as HRT). They do <strong>not</strong> apply to MPA used alone at standard doses. This distinction is clinically critical and must be explicitly communicated to patients and prescribers.</p>
              <ul className="list-disc pl-4 space-y-1 mt-2">
                <li><strong>Cardiovascular:</strong> CE/MPA combination significantly increases risk of myocardial infarction, stroke, and pulmonary embolism (WHI data; mean follow-up 5.6 years; trial stopped early)</li>
                <li><strong>Breast cancer:</strong> RR 1.24 (95% CI 1.01–1.54) for invasive breast cancer — 41 vs 33 cases per 10,000 women-years vs placebo</li>
                <li><strong>Dementia:</strong> Increased risk of probable dementia in women ≥65 years receiving combined oestrogen–progestin HRT (WHIMS sub-study)</li>
              </ul>
            </Callout>
            {[
              ['Thromboembolic Risk (MPA Alone)', 'An inherent risk of venous and arterial thromboembolism exists with progestin therapy, particularly at higher doses or with parenteral formulations. Discontinue immediately if DVT, PE, stroke, or retinal thrombosis is suspected or confirmed.'],
              ['Bone Mineral Density — Injectable MPA', 'Prolonged use of depot injectable MPA reduces BMD due to suppression of ovarian oestrogen production. Loss is cumulative with duration, may not fully reverse, and is of greatest concern in adolescents and young adults during peak bone accrual. Injectable MPA should not be used as a long-term contraceptive (>2 years) unless alternatives are inadequate. BMD monitoring should be considered in long-term users.'],
              ['Glucose Metabolism', 'MPA may impair insulin sensitivity and carbohydrate metabolism. Diabetic patients should have blood glucose monitored more closely during therapy.'],
              ['Depression and Mood', 'MPA has been associated with mood changes, depression, and emotional lability. Use with caution in patients with a current or past history of depression. If clinically significant depressive symptoms emerge, reassess the benefit-risk profile.'],
              ['Fluid Retention', 'MPA-related fluid retention may exacerbate conditions such as epilepsy, migraine, asthma, cardiac dysfunction, or renal impairment. Use with caution in these populations.'],
              ['Liver Function', 'If jaundice or clinically significant disturbance of liver function tests develops during therapy, MPA should be discontinued immediately.'],
              ['Meningioma', 'An association between long-term high-dose MPA and intracranial meningioma has been reported. Any patient developing new neurological symptoms during therapy should have this considered in the differential diagnosis.'],
            ].map(([heading, body]) => (
              <div key={heading}>
                <p className="text-xs font-bold uppercase tracking-widest pt-2 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>{heading}</p>
                <p>{body}</p>
              </div>
            ))}
            <p className="text-xs font-bold uppercase tracking-widest pt-2 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Laboratory Test Interference</p>
            <p>MPA may alter the following laboratory parameters — results should be interpreted with caution in patients on therapy:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Tag variant="amber">↑ LDL cholesterol</Tag>
              <Tag variant="amber">↑ Triglycerides</Tag>
              <Tag variant="amber">↓ HDL cholesterol</Tag>
              <Tag variant="amber">Glucose metabolism</Tag>
              <Tag variant="blue">Thyroid function tests (TBG)</Tag>
              <Tag variant="blue">Coagulation factors</Tag>
            </div>
          </Section>

          {/* 13 */}
          <Section id="s13" num="13" title="Side Effects — Adverse Effects Profile" collapsed={!!collapsed['s13']} onToggle={() => toggleSection('s13')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest pb-2 flex items-center gap-2" style={{ color: 'rgb(var(--color-primary))' }}>
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Common ({'>'} 1 in 100)
                </p>
                <ul className="space-y-1.5">
                  {['Headache','Nausea','Irregular vaginal bleeding / spotting','Weight gain','Breast tenderness','Mood changes / depression','Insomnia','Dizziness','Fatigue','Acne','Pruritus (itchy skin)','Hair thinning / mild loss','Changes in vaginal discharge','Elevated body temperature / flushing','Reduced libido'].map(e => <AEItem key={e} type="common">{e}</AEItem>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest pb-2 flex items-center gap-2 text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Serious ({'<'} 1 in 1,000)
                </p>
                <ul className="space-y-1.5">
                  {['Deep vein thrombosis (DVT)','Pulmonary embolism','Retinal vascular thrombosis','Thrombophlebitis','Anaphylaxis / anaphylactoid reaction','Jaundice / hepatic dysfunction','Meningioma (high dose/long term)','BMD reduction (long-term parenteral)','Cushingoid features (high-dose oncology)','Ectopic pregnancy (injectable — if contraceptive failure occurs)'].map(e => <AEItem key={e} type="serious">{e}</AEItem>)}
                </ul>
              </div>
            </div>
            <Callout type="danger" title="🚨 Seek Emergency Medical Attention For">
              <ul className="list-disc pl-4 space-y-1">
                <li>Sudden unilateral visual loss (possible retinal vein occlusion)</li>
                <li>Chest pain, sudden dyspnoea, haemoptysis (possible PE)</li>
                <li>Unilateral leg swelling, warmth, erythema (possible DVT)</li>
                <li>Sudden severe headache, hemiplegia, dysphasia (possible CVA)</li>
                <li>Anaphylaxis: lip/tongue/throat swelling, stridor, hypotension, collapse</li>
              </ul>
            </Callout>
            <p className="text-xs font-bold uppercase tracking-widest pt-2 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Injectable-Specific — Menstrual Changes Over Time</p>
            <p>Menstrual irregularity is the single most common adverse effect of injectable MPA used as contraception:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>~57% of users experience irregular bleeding or spotting at 12 months</li>
              <li>~60–70% develop amenorrhoea by 12–24 months of use</li>
              <li>Weight gain {'>'} 10 lb in ~38% at 24 months</li>
            </ul>
          </Section>

          {/* 14 */}
          <Section id="s14" num="14" title="Drug Interactions" collapsed={!!collapsed['s14']} onToggle={() => toggleSection('s14')}>
            <p className="text-xs font-bold uppercase tracking-widest pb-1" style={{ color: 'rgb(var(--color-primary))' }}>CYP3A4 Inducers — Reduce MPA Efficacy</p>
            <Table>
              <THead><tr><Th>Drug / Class</Th><Th>Example(s)</Th><Th>Clinical Consequence</Th><Th>Action</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Antibiotics (RIFA)</Td><Td>Rifampicin</Td><Td>↑ MPA metabolism → ↓ plasma levels</Td><Td>Avoid; use alternative contraception</Td></TRow>
                <TRow><Td bold>Antiepileptics</Td><Td>Carbamazepine, Phenytoin, Phenobarbital, Primidone</Td><Td>↑ CYP3A4 induction → ↓ MPA efficacy</Td><Td>Non-hormonal backup contraception</Td></TRow>
                <TRow><Td bold>Antiretrovirals</Td><Td>Ritonavir-boosted regimens, efavirenz</Td><Td>Variable: induction or inhibition possible</Td><Td>Specialist review required</Td></TRow>
                <TRow><Td bold>HCV Direct-acting antivirals</Td><Td>Some NS5B inhibitors</Td><Td>Possible enzyme induction</Td><Td>Prescriber alert</Td></TRow>
                <TRow><Td bold>Herbal</Td><Td>St John's Wort (Hypericum perforatum)</Td><Td>CYP3A4 induction → ↓ MPA levels</Td><Td>Contraindicated with MPA</Td></TRow>
              </tbody>
            </Table>
            {[
              ['CYP3A4 Inhibitors — May Increase MPA Exposure', 'No formal studies. Inhibitors such as ketoconazole, itraconazole, clarithromycin, or grapefruit juice may theoretically increase MPA plasma concentrations, increasing adverse effect risk. Clinical significance is not quantified; exercise caution and monitor where co-prescription is unavoidable.'],
              ['Warfarin / Anticoagulants', 'MPA may alter coagulation factors, potentially affecting anticoagulant response. INR should be monitored more closely in patients on concurrent warfarin therapy after initiation or discontinuation of MPA.'],
              ['Food Interactions', 'No specific food avoidances. Grapefruit/grapefruit juice — weak theoretical CYP3A4 inhibitory effect. Standard dietary habits are acceptable. Alcohol does not directly interact with MPA pharmacokinetically but worsens common adverse effects (fatigue, headache, dizziness).'],
              ['Laboratory Test Interactions', 'Clinicians must interpret the following with caution in MPA users: coagulation profiles, thyroid function tests (TBG), LDL/cholesterol, triglycerides, glucose metabolism panels. Notify the ordering laboratory and interpreting clinician of concurrent MPA use.'],
            ].map(([heading, body]) => (
              <div key={heading}>
                <p className="text-xs font-bold uppercase tracking-widest pt-3 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>{heading}</p>
                <p>{body}</p>
              </div>
            ))}
          </Section>

          {/* 15 */}
          <Section id="s15" num="15" title="Overdose & Toxicity" collapsed={!!collapsed['s15']} onToggle={() => toggleSection('s15')}>
            <p>MPA has a wide therapeutic index and acute overdose toxicity is low. No specific toxic serum concentration threshold is defined for standard oral doses.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-2 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Expected Signs of Overdose</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nausea and vomiting</li>
              <li>Drowsiness and excessive fatigue</li>
              <li>Fluid retention and oedema</li>
              <li>Exaggeration of common adverse effects (breast tenderness, mood changes)</li>
            </ul>
            <Callout type="info" title="ℹ️ Management Principles">
              <ul className="list-disc pl-4 space-y-1">
                <li>No specific antidote exists.</li>
                <li>Treatment is symptomatic and supportive.</li>
                <li>Discontinue MPA.</li>
                <li>Contact Poison Control / appropriate toxicology services for guidance.</li>
                <li>Monitor vital signs, fluid balance, and mood status.</li>
                <li>In parenteral overdose scenarios (accidental repeat dosing), the prolonged depot half-life means clinical effects may persist for weeks — prolonged monitoring is required.</li>
              </ul>
            </Callout>
            <p><strong className="text-slate-800">Oral LD₅₀:</strong> {'>'} 6,400 mg/kg (rat); {'>'} 16 g/kg (mouse). Confirms a very wide safety margin between therapeutic and lethal doses.</p>
          </Section>

          {/* 16 */}
          <Section id="s16" num="16" title="Pregnancy & Lactation" collapsed={!!collapsed['s16']} onToggle={() => toggleSection('s16')}>
            <p className="text-xs font-bold uppercase tracking-widest pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Pregnancy</p>
            <Callout type="danger" title="⛔ Contraindicated in Pregnancy — FDA Category X">
              <p>MPA should not be used during pregnancy. First-trimester exposure has been associated with potential increased risk of hypospadias, clitoral enlargement, and labial fusion in offspring, though clear causation has not been definitively established. If pregnancy is confirmed during therapy, MPA should be discontinued immediately and the patient counselled on fetal risk.</p>
              <p className="mt-2"><strong>Low-dose exposure before pregnancy was known:</strong> Standard oral doses (2.5–10 mg) taken before awareness of pregnancy are unlikely to cause significant fetal harm.</p>
            </Callout>
            <p>MPA can affect the hormonal milieu of pregnancy. Injectable MPA is not recommended for women attempting to conceive, given the prolonged fertility delay post-discontinuation.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-3 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Lactation</p>
            <p>Detectable but low amounts of MPA are excreted in breast milk. Infant absorption from breast milk is minimal.</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Standard oral doses:</strong> Generally considered compatible with breastfeeding by most international guidance. The American Academy of Pediatrics classifies progestins as compatible with breastfeeding.</li>
              <li><strong className="text-slate-800">Injectable MPA:</strong> Should not be initiated until at least 6 weeks postpartum in breastfeeding women (to allow establishment of lactation), or 5 days postpartum in non-breastfeeding women.</li>
              <li><strong className="text-slate-800">High-dose oncology MPA:</strong> Individual specialist assessment required — benefit-risk decision should involve the treating oncologist.</li>
            </ul>
            <p>Clinicians should monitor infants for adequate feeding and normal development where maternal MPA therapy is ongoing.</p>
            <p className="text-xs font-bold uppercase tracking-widest pt-3 pb-1" style={{ color: 'rgb(var(--color-primary))' }}>Fertility</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-slate-800">Oral MPA:</strong> Fertility typically returns promptly after cessation.</li>
              <li><strong className="text-slate-800">Injectable MPA:</strong> Median return of fertility is approximately 10 months post last injection, but can extend to 12–18 months. Patients planning pregnancy should be counselled about this delay before initiating injectable therapy.</li>
              <li>Ectopic pregnancy has been reported in cases of contraceptive failure with injectable MPA.</li>
            </ul>
          </Section>

          {/* 17 */}
          <Section id="s17" num="17" title="Paediatric Use" collapsed={!!collapsed['s17']} onToggle={() => toggleSection('s17')}>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-slate-800">Pre-pubertal children:</strong> Not indicated. MPA tablets are not licensed for paediatric use in children who have not yet reached menarche.</li>
              <li><strong className="text-slate-800">Post-pubertal adolescent females:</strong> May be used for the same gynaecological indications as adults (secondary amenorrhoea, abnormal uterine bleeding, endometriosis) at standard adult doses. Specific paediatric dose-finding studies have not been conducted.</li>
              <li><strong className="text-slate-800">BMD concern in adolescents:</strong> This is a particularly important consideration. Adolescence is a critical period of peak bone accrual. Long-term use of injectable depot MPA in adolescents may significantly impair peak bone mass, increasing long-term osteoporotic fracture risk. Injectable MPA should not be the first-line contraceptive choice in adolescents; if used, duration should be minimised and calcium/vitamin D supplementation and regular BMD monitoring should be considered.</li>
            </ul>
          </Section>

          {/* 18 */}
          <Section id="s18" num="18" title="Geriatric Use" collapsed={!!collapsed['s18']} onToggle={() => toggleSection('s18')}>
            <ul className="list-disc pl-5 space-y-2">
              <li>In the WHI estrogen plus progestin substudy, 44% of participants were ≥65 years, and 6.6% were ≥75 years.</li>
              <li>The elevated risks of <strong className="text-slate-800">probable dementia</strong> and cardiovascular events identified in the WHI were most pronounced in women ≥65 years receiving combined CE/MPA therapy.</li>
              <li>MPA in combination with oestrogen <strong className="text-slate-800">should not be used to prevent cognitive decline, dementia, or cardiovascular disease</strong> in older women.</li>
              <li>For women ≥65 using MPA as part of HRT for genuine symptom management, the lowest effective dose for the shortest necessary duration is the recommended approach.</li>
              <li>No specific dose adjustment guidelines for MPA monotherapy in the elderly based solely on age; however, age-related changes in hepatic metabolism and the higher prevalence of co-morbidities and polypharmacy in this population warrant careful monitoring.</li>
            </ul>
          </Section>

          {/* 19 */}
          <Section id="s19" num="19" title="Renal & Hepatic Dosing" collapsed={!!collapsed['s19']} onToggle={() => toggleSection('s19')}>
            <Table>
              <THead><tr><Th>Impairment</Th><Th>Oral MPA</Th><Th>Injectable MPA</Th><Th>Notes</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Mild hepatic impairment</Td><Td>Use with caution; monitor LFTs</Td><Td>Use with caution</Td><Td>Regular liver function monitoring advisable</Td></TRow>
                <TRow><Td bold>Significant / severe hepatic impairment</Td><Td>Contraindicated</Td><Td>Contraindicated (no dose guidance)</Td><Td>Alcoholic cirrhosis markedly reduces MPA elimination; dose reduction may be needed if oral use unavoidable</Td></TRow>
                <TRow><Td bold>Active liver disease / jaundice</Td><Td>Discontinue</Td><Td>Discontinue</Td><Td>MPA should be stopped if jaundice or LFT disturbance develops</Td></TRow>
                <TRow><Td bold>Renal impairment</Td><Td>No dose adjustment established</Td><Td>No dose adjustment established</Td><Td>MPA can cause fluid retention; caution in pre-existing renal disease. Monitor fluid status.</Td></TRow>
              </tbody>
            </Table>
          </Section>

          {/* 20 */}
          <Section id="s20" num="20" title="Monitoring Parameters" collapsed={!!collapsed['s20']} onToggle={() => toggleSection('s20')}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-2">
              <MonitorItem param="Blood Pressure" freq="Baseline + periodic" />
              <MonitorItem param="Liver Function Tests" freq="Baseline; during therapy if hepatic risk" />
              <MonitorItem param="Blood Glucose / HbA1c" freq="Baseline + q6 months in diabetics" />
              <MonitorItem param="Lipid Profile" freq="Baseline + annually (long-term use)" />
              <MonitorItem param="Bone Mineral Density (DEXA)" freq="If injectable use >2 years, esp. adolescents" />
              <MonitorItem param="Mood / Mental Health Screen" freq="Each consultation" />
              <MonitorItem param="Weight" freq="Periodic (injectable use — weight gain common)" />
              <MonitorItem param="Pregnancy Status" freq="Before each injectable dose if >13 weeks elapsed" />
              <MonitorItem param="Menstrual Pattern" freq="Patient-reported; each consultation" />
              <MonitorItem param="Signs of DVT / PE" freq="Patient counselled; emergency if suspected" />
              <MonitorItem param="INR (if on warfarin)" freq="More frequent after MPA initiation/cessation" />
              <MonitorItem param="Breast Examination" freq="Routine (as per breast screening guidelines)" />
            </div>
          </Section>

          {/* 21 */}
          <Section id="s21" num="21" title="Patient Counselling Points" collapsed={!!collapsed['s21']} onToggle={() => toggleSection('s21')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-2">
              <CounselCard icon="💊" title="How to Take It">Swallow tablets whole with a glass of water. You can take them with or without food, but taking them with food helps your body absorb the medicine better. Try to take them at the same time each day.</CounselCard>
              <CounselCard icon="🚫" title="It Is NOT a Contraceptive (Tablets)">Oral tablets do not reliably prevent ovulation and will NOT protect you from pregnancy. If you are sexually active and do not wish to become pregnant, use a non-hormonal method such as condoms.</CounselCard>
              <CounselCard icon="⏱️" title="When to Expect Results">This medicine starts working straight away, but full improvement in your symptoms — such as lighter periods or less endometriosis pain — can take 2 to 3 months. Do not stop taking it early unless your doctor tells you to.</CounselCard>
              <CounselCard icon="❓" title="Missed Dose">If you forget a dose, take it as soon as you remember — unless your next dose is coming up soon, in which case just skip the missed one. Never take two doses together to catch up. Missing doses may cause unexpected spotting or bleeding.</CounselCard>
              <CounselCard icon="🩸" title="Irregular Bleeding Is Expected">Especially in the first few months, you may notice spotting or changes to your period — this is common. Report it to your doctor only if it is very heavy, prolonged, or if you are concerned.</CounselCard>
              <CounselCard icon="🛑" title="Do NOT Stop Suddenly Without Advice">If you stop taking this medicine, you will usually have a withdrawal bleed within a few days. If no bleed occurs and you are sexually active, take a pregnancy test and inform your doctor.</CounselCard>
              <CounselCard icon="🚗" title="Driving & Machinery">This medicine can cause dizziness and fatigue. If you feel drowsy or dizzy, do not drive, cycle, or operate machinery until you feel better.</CounselCard>
              <CounselCard icon="🍺" title="Alcohol">You can drink alcohol in moderation while taking this medicine. However, alcohol will make side effects like headaches, dizziness, and fatigue worse — so drink cautiously.</CounselCard>
              <CounselCard icon="🌿" title="Herbal Supplements">Do not take St John's Wort while on this medicine — it significantly reduces its effectiveness. Always tell your doctor or pharmacist about any herbal products, vitamins, or supplements you take.</CounselCard>
              <CounselCard icon="🤰" title="Planning a Pregnancy">Tell your doctor before starting this medicine if you plan to get pregnant. Oral MPA: fertility returns quickly after stopping. Injectable MPA: fertility can take 10–18 months to return after the last injection.</CounselCard>
              <CounselCard icon="😔" title="Mood Changes">Some people feel low in mood, anxious, or depressed while taking this medicine. If you notice significant changes in how you feel emotionally, speak to your doctor — do not simply stop the medication without guidance.</CounselCard>
              <CounselCard icon="⚖️" title="Weight & Lifestyle">A small amount of weight gain is possible, especially with injections. A balanced diet and regular physical activity can help manage this. Weight-bearing exercise also helps protect bone density with long-term use.</CounselCard>
              <CounselCard icon="🦴" title="Bone Health (Injections Only)">Long-term use of the injection can reduce bone density. Discuss calcium and vitamin D supplementation with your doctor if you are using the injection for more than 2 years. Avoid smoking, which worsens bone loss.</CounselCard>
              <CounselCard icon="❤️" title="Heart Disease Warning — Clarification">You may have read that this medicine increases the risk of heart attacks, strokes, or dementia. This risk specifically applies when MPA is used <strong>combined with oestrogen</strong> as HRT — not when taken alone at standard doses. Ask your doctor if you are unsure which applies to you.</CounselCard>
              <CounselCard icon="🆘" title="When to Seek Emergency Help">Call 999 / 112 / your emergency services immediately if you develop: sudden shortness of breath or chest pain, sudden leg pain or swelling, sudden loss of vision, severe headache or weakness on one side of the body, or signs of a severe allergic reaction (swelling of the throat, difficulty breathing).</CounselCard>
              <CounselCard icon="💉" title="Injection Timing (Depo Users)">Your injection must be given every 13 weeks (3 months) to remain effective as contraception. If you are more than 13 weeks late, do not assume you are still protected — use condoms and contact your clinic, as a pregnancy test will be needed before the next injection.</CounselCard>
            </div>
          </Section>

          {/* 22 */}
          <Section id="s22" num="22" title="Storage & Handling" collapsed={!!collapsed['s22']} onToggle={() => toggleSection('s22')}>
            <Table>
              <THead><tr><Th>Parameter</Th><Th>Oral Tablets</Th><Th>Injectable Suspension</Th></tr></THead>
              <tbody>
                <TRow><Td bold>Temperature</Td><Td>20–25°C (68–77°F) — Controlled Room Temperature (USP)</Td><Td>15–30°C — protect from freezing</Td></TRow>
                <TRow><Td bold>Light</Td><Td>Protect from light; store in tight, light-resistant container</Td><Td>Keep in original packaging; protect from prolonged light</Td></TRow>
                <TRow><Td bold>Moisture</Td><Td>Keep away from moisture; do not store in bathroom medicine cabinet</Td><Td>N/A (aqueous suspension)</Td></TRow>
                <TRow><Td bold>Special handling</Td><Td>None required</Td><Td>Shake vigorously immediately before use. Do not dilute. Do not administer IV. Single use only.</Td></TRow>
                <TRow><Td bold>Child safety</Td><Td>Store in a child-resistant container out of reach of children</Td><Td>Dispose of needles/syringes in approved sharps container</Td></TRow>
                <TRow><Td bold>Disposal</Td><Td>Follow local pharmaceutical waste disposal guidelines</Td><Td>Sharps container for needles; unused product via pharmacy take-back</Td></TRow>
              </tbody>
            </Table>
          </Section>

          {/* 23 */}
          <Section id="s23" num="23" title="Cost & Availability" collapsed={!!collapsed['s23']} onToggle={() => toggleSection('s23')}>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-slate-800">Generic availability:</strong> MPA is widely available as a generic in most markets. Generic tablets (2.5 mg, 5 mg, 10 mg) are significantly less expensive than branded equivalents.</li>
              <li><strong className="text-slate-800">UK (NHS):</strong> Available on NHS prescription. Tablets dispensed under generic name or branded equivalents. Injectable Depo-Provera available at sexual and reproductive health clinics and GP surgeries. No patient prescription charge for those with exemption certificates.</li>
              <li><strong className="text-slate-800">India:</strong> Available in multiple generic tablet brands across all tiers of healthcare. Widely accessible and inexpensive.</li>
              <li><strong className="text-slate-800">US:</strong> Provera (branded) and generic MPA tablets widely available. Depo-Provera injection available at clinics. Covered under most insurance plans for contraception at no cost under ACA-mandated preventive services.</li>
              <li><strong className="text-slate-800">High-dose formulations (100–400 mg):</strong> Less widely available; typically dispensed through specialist oncology pharmacy channels.</li>
            </ul>
          </Section>

          {/* 24 */}
          <Section id="s24" num="24" title="Regulatory Status" collapsed={!!collapsed['s24']} onToggle={() => toggleSection('s24')}>
            <Table>
              <THead><tr><Th>Jurisdiction</Th><Th>Status</Th><Th>Notes</Th></tr></THead>
              <tbody>
                <TRow><Td bold>United States (FDA)</Td><Td>Prescription Only (Rx)</Td><Td>Schedule: Non-controlled. Approved since June 18, 1959. Current label rev. March 2024.</Td></TRow>
                <TRow><Td bold>United Kingdom (MHRA)</Td><Td>Prescription Only Medicine (POM)</Td><Td>Licensed for gynaecological indications and HRT adjunct. Tablets available on NHS prescription.</Td></TRow>
                <TRow><Td bold>European Union (EMA)</Td><Td>Prescription Only</Td><Td>Available across EU member states under national authorisations. High-dose oncology formulations subject to separate national approvals.</Td></TRow>
                <TRow><Td bold>India (CDSCO)</Td><Td>Schedule H (Prescription Required)</Td><Td>Widely marketed in multiple generic formulations. Depo-Provera IM introduced into India's public health system in 2016.</Td></TRow>
                <TRow><Td bold>Australia (TGA)</Td><Td>Prescription Only (S4)</Td><Td>Registered for gynaecological and contraceptive indications.</Td></TRow>
              </tbody>
            </Table>
            <p>MPA is <strong className="text-slate-800">not a controlled substance</strong> in any major jurisdiction. It is universally classified as a prescription-only medicine and is not available over the counter.</p>
          </Section>

          {/* 25 */}
          <Section id="s25" num="25" title="Recent Updates — New Findings & Guideline Changes" collapsed={!!collapsed['s25']} onToggle={() => toggleSection('s25')}>
            {[
              ['FDA Label Update — March 2024', 'The Provera (medroxyprogesterone acetate tablets) prescribing information was updated in March 2024. The removal of pregnancy as a contraindication from the injectable formulation\'s label (Depo-Provera) was noted in April 2024 — a regulatory label alignment, not a change in clinical recommendation (MPA remains contraindicated in pregnancy).'],
              ['Meningioma Risk — Growing Evidence Base', 'Accumulating real-world pharmacovigilance data and cohort studies (2022–2024) have strengthened the association between high-dose, long-duration progestogen use (including MPA) and intracranial meningioma. Regulatory agencies in France (ANSM) and the UK have issued guidance advising clinicians to review patients on high-dose MPA for neurological symptoms and to consider alternative therapies where possible. This signal appears dose-dependent and is most notable with oncology-level dosing.'],
              ['PPOS (Progestin-Primed Ovarian Stimulation) — Growing ART Use', 'MPA as part of PPOS protocols in IVF has gained increasing traction in the literature (2020–2024), particularly in China, showing comparable clinical pregnancy rates to GnRH antagonist protocols in freeze-all cycles. MPA (10 mg/day) administered alongside gonadotrophins prevents premature LH surges without reducing ovarian response. Not yet universally adopted in Western ART practice but increasingly recognised in international guidelines.'],
              ['BMD Evidence — ACOG Guidance', 'The American College of Obstetricians and Gynecologists (ACOG) has reaffirmed guidance that the BMD reduction with injectable MPA should not deter clinicians from prescribing it when it is the most appropriate contraceptive for a patient — including adolescents — provided counselling on the risk is given and duration is minimised. BMD loss has been shown to recover after discontinuation in most patients.'],
              ['MPA vs. Newer Progestogens in HRT', 'Ongoing discussion in the literature continues to compare MPA\'s safety profile in combination HRT against newer, more progesterone-like progestins (e.g., dydrogesterone, micronised progesterone). Some observational data suggest that micronised progesterone may carry a more favourable breast cancer risk profile compared to MPA when used in HRT, though head-to-head RCT data remain limited. This area is expected to produce updated clinical guideline recommendations in coming years.'],
            ].map(([heading, body]) => (
              <div key={heading} className="border-l-2 pl-4 py-1 my-3" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
                <p className="text-xs font-bold uppercase tracking-widest pb-1" style={{ color: 'rgb(var(--color-primary))' }}>{heading}</p>
                <p>{body}</p>
              </div>
            ))}
          </Section>

        </div>{/* /content */}

        {/* Footer */}
        <div className="px-6 py-8 mt-4 border-t border-slate-200" style={{ background: 'rgb(var(--color-secondary))' }}>
          <p className="text-xs text-white/40 leading-relaxed">
            This monograph is intended for use by qualified healthcare professionals only. It does not constitute medical advice. Clinical decisions should be made in conjunction with the complete prescribing information and individual patient assessment. Last reviewed: 2025.
          </p>
        </div>

      </main>

      {/* Back to top */}
      <button
        className={`${s.backToTop} ${showTop ? s.backToTopVisible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >↑</button>
    </>
  )
}
