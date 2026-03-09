'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

// ── Sub-components ────────────────────────────────────────

function Callout({ type, title, children }: { type: 'danger'|'warning'|'info'|'success', title: string, children: React.ReactNode }) {
  const cls = { danger: s.calloutDanger, warning: s.calloutWarning, info: s.calloutInfo, success: s.calloutSuccess }[type]
  return (
    <div className={`${s.callout} ${cls}`}>
      <div className={s.calloutTitle}>{title}</div>
      {children}
    </div>
  )
}

function DoseCard({ indication, dose, notes }: { indication: string, dose: string, notes: string }) {
  return (
    <div className={s.doseCard}>
      <div className={s.doseIndication}>{indication}</div>
      <div className={s.doseDose}>{dose}</div>
      <div className={s.doseNotes}>{notes}</div>
    </div>
  )
}

function PKCard({ label, value, note }: { label: string, value: string, note: string }) {
  return (
    <div className={s.pkCard}>
      <div className={s.pkLabel}>{label}</div>
      <div className={s.pkValue}>{value}</div>
      <div className={s.pkNote}>{note}</div>
    </div>
  )
}

function AEItem({ type, children }: { type: 'common'|'serious', children: React.ReactNode }) {
  return (
    <li className={s.aeItem}>
      <span className={`${s.aeDot} ${type === 'common' ? s.aeDotCommon : s.aeDotSerious}`} />
      {children}
    </li>
  )
}

function CounselCard({ icon, title, children }: { icon: string, title: string, children: React.ReactNode }) {
  return (
    <div className={s.counselCard}>
      <div className={s.counselIcon}>{icon}</div>
      <div className={s.counselTitle}>{title}</div>
      <p>{children}</p>
    </div>
  )
}

function MonitorItem({ param, freq }: { param: string, freq: string }) {
  return (
    <div className={s.monitorItem}>
      <div className={s.monitorParam}>{param}</div>
      <div className={s.monitorFreq}>{freq}</div>
    </div>
  )
}

// ── Collapsible Section ───────────────────────────────────

function Section({ id, num, title, collapsed, onToggle, children }: {
  id: string, num: string, title: string, collapsed: boolean, onToggle: () => void, children: React.ReactNode
}) {
  return (
    <section className={s.section} id={id}>
      <div className={s.sectionHeader} onClick={onToggle} role="button" aria-expanded={!collapsed}>
        <span className={s.sectionNum}>{num}</span>
        <h2 className={s.sectionTitle}>{title}</h2>
        <span className={`${s.sectionToggle} ${collapsed ? s.sectionToggleCollapsed : ''}`}>▾</span>
      </div>
      <div className={`${s.sectionContent} ${collapsed ? s.sectionContentCollapsed : ''}`}>
        {children}
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

  const toggleSection = useCallback((id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const collapseAll = () => {
    const all: Record<string, boolean> = {}
    allIds.forEach(id => { all[id] = true })
    setCollapsed(all)
  }

  const expandAll = () => setCollapsed({})

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id)
      })
    }, { rootMargin: '-10% 0px -80% 0px' })
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setShowTop(scrolled > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll active nav link into view
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (navRef.current) {
      const link = navRef.current.querySelector(`[data-id="${activeId}"]`)
      link?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [activeId])

  const filteredNav = NAV_ITEMS.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.num.includes(search)
  )

  return (
    <div className={s.root}>
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
      <aside className={`${s.sidebar} ${sidebarOpen ? s.sidebarOpen : ''}`}>
        <div className={s.sidebarHeader}>
          <div className={s.drugName}>Medroxyprogesterone Acetate</div>
          <div className={s.monographLabel}>Clinical Drug Monograph</div>
        </div>

        <input
          className={s.sidebarSearch}
          placeholder="Filter sections…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Filter sections"
        />

        <div className={s.collapseControls}>
          <button className={s.collapseBtn} onClick={expandAll}>Expand All</button>
          <button className={s.collapseBtn} onClick={collapseAll}>Collapse All</button>
        </div>

        <div className={s.navSectionLabel}>Contents</div>
        <nav ref={navRef}>
          {NAV_ITEMS.map(item => {
            const hidden = !filteredNav.find(f => f.id === item.id)
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                className={[
                  s.navLink,
                  activeId === item.id ? s.navLinkActive : '',
                  hidden ? s.navLinkHidden : '',
                ].join(' ')}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={s.navNum}>{item.num}</span>
                {item.title}
              </a>
            )
          })}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main className={s.main}>

        {/* Hero */}
        <div className={s.hero} id="top">
          <div className={s.heroBadge}>⚕️ PharmD Clinical Monograph</div>
          <h1 className={s.heroH1}>Medroxyprogesterone <span>Acetate</span></h1>
          <div className={s.heroSub}>Comprehensive Clinical Reference · Oral & Parenteral Formulations</div>

          <div className={s.heroActions}>
            <button className={`${s.heroBtn} ${s.heroBtnPrint}`} onClick={() => window.print()}>
              🖨 Print / Save PDF
            </button>
          </div>

          <div className={s.heroTags}>
            <span className={s.heroTag}>Synthetic Progestogen</span>
            <span className={s.heroTag}>ATC G03AC06</span>
            <span className={s.heroTag}>Prescription Only</span>
            <span className={s.heroTag}>Hormonal Therapy</span>
            <span className={s.heroTag}>CYP3A4 Substrate</span>
          </div>
          <div className={s.heroMeta}>
            <div><div className={s.heroMetaLabel}>Molecular Formula</div><div className={s.heroMetaValue}>C₂₄H₃₄O₄</div></div>
            <div><div className={s.heroMetaLabel}>Molecular Weight</div><div className={s.heroMetaValue}>386.52 g/mol</div></div>
            <div><div className={s.heroMetaLabel}>CAS Number</div><div className={s.heroMetaValue}>71-58-9</div></div>
            <div><div className={s.heroMetaLabel}>FDA Approval</div><div className={s.heroMetaValue}>June 18, 1959</div></div>
            <div><div className={s.heroMetaLabel}>Last Reviewed</div><div className={s.heroMetaValue}>2025</div></div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className={s.content}>

          {/* 01 */}
          <Section id="s1" num="01" title="What Is It? — Drug Overview & Classification"
            collapsed={!!collapsed['s1']} onToggle={() => toggleSection('s1')}>
            <p>Medroxyprogesterone acetate (MPA) is a synthetic progestogen derived from progesterone. Structurally it is the 17α-acetate ester of medroxyprogesterone, carrying a 6α-methyl substitution on the pregnane steroid backbone. These modifications — the 6α-methyl group and the 17α-acetoxy moiety — substantially increase metabolic stability relative to native progesterone, conferring superior oral bioavailability and a prolonged duration of action, particularly in parenteral depot formulations.</p>
            <p>MPA is a potent, selective progesterone receptor (PR) agonist. It does not bind sex hormone-binding globulin (SHBG), which distinguishes it from some other progestins. While MPA exhibits weak androgenic activity, it is largely devoid of significant oestrogenic action at therapeutic doses. At high doses, it also demonstrates glucocorticoid receptor cross-reactivity, explaining the Cushingoid features observed in oncology dosing regimens.</p>
            <p>It is classified under the hormonal agents — progestogens — and is used across a broad spectrum of gynaecological, oncological, and endocrinological indications.</p>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Parameter</th><th>Detail</th></tr></thead>
                <tbody>
                  <tr><td>Generic Name</td><td>Medroxyprogesterone Acetate (MPA)</td></tr>
                  <tr><td>Drug Class</td><td>Progestogen — Synthetic Progestin (Pregnane derivative)</td></tr>
                  <tr><td>Therapeutic Class</td><td>Hormones — Sex Hormones & Modulators of the Genital System</td></tr>
                  <tr><td>ATC Code</td><td>G03AC06</td></tr>
                  <tr><td>Chemical Name</td><td>6α-Methyl-17α-acetoxypregn-4-ene-3,20-dione</td></tr>
                  <tr><td>Molecular Formula</td><td>C₂₄H₃₄O₄</td></tr>
                  <tr><td>Molecular Weight</td><td>386.52 g/mol</td></tr>
                  <tr><td>CAS Number</td><td>71-58-9</td></tr>
                  <tr><td>FDA First Approval</td><td>June 18, 1959</td></tr>
                  <tr><td>Route of Administration</td><td>Oral; Intramuscular (IM); Subcutaneous (SC)</td></tr>
                  <tr><td>Receptor Targets</td><td>Progesterone receptor (primary); weak glucocorticoid & androgen receptor activity</td></tr>
                  <tr><td>SHBG Binding</td><td>None (unlike some progestins)</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 02 */}
          <Section id="s2" num="02" title="How It Works — Mechanism of Action"
            collapsed={!!collapsed['s2']} onToggle={() => toggleSection('s2')}>
            <p>MPA acts as a potent full agonist at the progesterone receptor (PR), with approximately 100-fold higher binding affinity and transactivation potency compared to endogenous progesterone. This explains why oral doses of just 10 mg/day can suppress ovulation — a task that would require 300 mg/day of exogenous progesterone.</p>
            <h3>Endometrial Effects</h3>
            <p>When adequate endogenous oestrogen is present, MPA transforms proliferative endometrium into secretory endometrium. This is the basis for its utility in treating dysfunctional uterine bleeding and for providing endometrial protection in women receiving unopposed oestrogen as HRT.</p>
            <h3>Hypothalamic–Pituitary Axis Suppression</h3>
            <p>MPA binds progesterone receptors in the hypothalamus and anterior pituitary, suppressing GnRH secretion and consequently reducing LH and FSH release. This effect is dose- and route-dependent:</p>
            <ul>
              <li><strong>Parenteral high-dose MPA (e.g., 150 mg IM):</strong> Reliably inhibits follicular maturation and ovulation — the basis for its contraceptive action.</li>
              <li><strong>Standard oral doses:</strong> Do <em>not</em> reliably suppress ovulation. This is a clinically critical point when counselling patients on contraception.</li>
            </ul>
            <h3>Antiproliferative Effects</h3>
            <p>MPA inhibits gonadotrophin production and has antiproliferative effects on endometrial tissue. At high doses used in oncology, it induces p53-dependent apoptosis in cancer cell lines and reduces nuclear oestrogen receptor expression and DNA synthesis in endometrial epithelial cells.</p>
            <h3>Other Receptor Activities</h3>
            <ul>
              <li><strong>Androgenic:</strong> Weak androgenic activity may contribute to acne and hair loss as adverse effects.</li>
              <li><strong>Glucocorticoid:</strong> At high (oncology) doses, cross-reactivity with glucocorticoid receptors produces Cushingoid features — moon facies, fluid retention, glucose intolerance.</li>
              <li><strong>PGRMC1 (membrane PR component-1):</strong> MPA weakly stimulates MCF-7 breast cancer cell proliferation via PGRMC1 in vitro, independent of classical PRs. This in vitro observation may partly explain the breast cancer signal observed in the WHI CE/MPA combination study, though the in vivo clinical relevance remains under investigation.</li>
            </ul>
          </Section>

          {/* 03 */}
          <Section id="s3" num="03" title="What It Treats — Licensed Indications"
            collapsed={!!collapsed['s3']} onToggle={() => toggleSection('s3')}>
            <h3>Standard-Dose Oral (2.5–10 mg tablets)</h3>
            <ul>
              <li><strong>Secondary amenorrhoea</strong> due to hormonal imbalance (excluding organic causes such as fibroids or uterine cancer)</li>
              <li><strong>Abnormal uterine bleeding</strong> due to ovulatory dysfunction</li>
              <li><strong>Prevention of endometrial hyperplasia</strong> in postmenopausal women receiving unopposed oestrogen HRT (intact uterus)</li>
              <li><strong>Endometriosis</strong> — symptom management including dysmenorrhoea and dyspareunia</li>
              <li><strong>Polycystic ovary syndrome (PCOS)</strong> — induction of withdrawal bleeding in oligomenorrhoeic or anovulatory women</li>
              <li><strong>Hot flushes</strong> associated with androgen deprivation therapy for prostate cancer</li>
            </ul>
            <h3>Injectable Formulations</h3>
            <ul>
              <li><strong>IM 150 mg/mL:</strong> Contraception; adjunctive/palliative therapy for inoperable, recurrent, or metastatic endometrial carcinoma (400 mg/mL formulation)</li>
              <li><strong>SC 104 mg/0.65 mL:</strong> Contraception; pain management in endometriosis</li>
            </ul>
            <h3>High-Dose Oral (100–400 mg tablets)</h3>
            <p>Reserved exclusively for certain oncological indications. Not within the scope of this standard-dose monograph — specialist oncology guidance should be followed.</p>
          </Section>

          {/* 04 */}
          <Section id="s4" num="04" title="Off-label Uses"
            collapsed={!!collapsed['s4']} onToggle={() => toggleSection('s4')}>
            <Callout type="warning" title="⚠️ Note">
              <p>The following uses are not formally licensed but are recognised in clinical practice. Evidence quality and regulatory acceptance vary by indication and jurisdiction.</p>
            </Callout>
            <ul>
              <li><strong>Male hypersexuality / paraphilia:</strong> High-dose IM MPA has been used for pharmacological libido suppression — a controversial application with significant ethical considerations.</li>
              <li><strong>Preterm birth prevention:</strong> Limited evidence for risk reduction in selected high-risk pregnancies; largely superseded by 17-hydroxyprogesterone caproate in most guidelines.</li>
              <li><strong>Progestin-primed ovarian stimulation (PPOS) in ART:</strong> Increasingly used as part of IVF stimulation protocols to prevent premature LH surges; MPA co-administered with gonadotrophins during controlled ovarian stimulation.</li>
              <li><strong>Appetite stimulation and cancer cachexia:</strong> Related progestin megestrol acetate is more commonly used; MPA occasionally substituted.</li>
              <li><strong>Atypical endometrial hyperplasia / early endometrial cancer (fertility-sparing):</strong> MPA 500 mg/day — specialist oncology context only.</li>
            </ul>
          </Section>

          {/* 05 */}
          <Section id="s5" num="05" title="Forms & Formulations"
            collapsed={!!collapsed['s5']} onToggle={() => toggleSection('s5')}>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Formulation</th><th>Strength(s)</th><th>Route</th><th>Primary Use</th></tr></thead>
                <tbody>
                  <tr><td>Oral Tablet (standard)</td><td>2.5 mg, 5 mg, 10 mg</td><td>Oral (PO)</td><td>Gynaecological conditions, HRT adjunct, prostate cancer hot flushes</td></tr>
                  <tr><td>Oral Tablet (high-dose)</td><td>100 mg, 200 mg, 400 mg</td><td>Oral (PO)</td><td>Oncology only — endometrial/renal carcinoma</td></tr>
                  <tr><td>Injectable Suspension (IM)</td><td>150 mg/mL (1 mL vial or prefilled syringe)</td><td>Deep IM injection</td><td>Contraception; oncology palliative (400 mg/mL)</td></tr>
                  <tr><td>Injectable Suspension (SC)</td><td>104 mg/0.65 mL prefilled syringe</td><td>Subcutaneous</td><td>Contraception; endometriosis pain</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>Inactive excipients (oral tablets):</strong> Typically include crospovidone, lactose monohydrate, magnesium stearate, methylcellulose, pregelatinised corn starch, and sodium lauryl sulfate. Clinicians should verify excipient content per product-specific SmPC — particularly for patients with lactose intolerance.</p>
          </Section>

          {/* 06 */}
          <Section id="s6" num="06" title="Dosage & Administration"
            collapsed={!!collapsed['s6']} onToggle={() => toggleSection('s6')}>
            <Callout type="info" title="ℹ️ Food Effect">
              <p>Taking oral MPA with food significantly increases bioavailability. A 10 mg dose taken peri-prandially increases Cmax by 50–70% and AUC by 18–33%, without altering half-life. While not strictly required, consistent administration with or without food is advisable for predictable drug levels.</p>
            </Callout>
            <div className={s.doseGrid}>
              <DoseCard indication="Secondary Amenorrhoea" dose="5–10 mg OD × 5–10 days" notes="Commence at any point in cycle. Withdrawal bleed expected 3–7 days post-course." />
              <DoseCard indication="Abnormal Uterine Bleeding" dose="5–10 mg OD × 5–10 days" notes="Begin on days 16–21 of cycle. If oestrogenic deficiency co-exists, add oestrogen." />
              <DoseCard indication="Endometriosis" dose="10 mg TDS × 3 months" notes="30 mg/day continuously. Begin on first day of a period." />
              <DoseCard indication="PCOS (Oligomenorrhoea)" dose="10 mg OD × 14 days" notes="Every 1–3 months to induce withdrawal bleeding." />
              <DoseCard indication="HRT Endometrial Protection" dose="1.5–10 mg OD" notes="Sequential: 10 mg × 12–14 days/cycle. Continuous combined: 2.5–5 mg daily." />
              <DoseCard indication="Prostate Cancer Hot Flushes" dose="20 mg OD (2 × 10 mg)" notes="Initial 10-week course. Review and continue as needed." />
              <DoseCard indication="Contraception (IM)" dose="150 mg IM q13 weeks" notes="Initiate within 5 days of menstrual onset. Vigorously shake vial before use." />
              <DoseCard indication="Contraception (SC)" dose="104 mg SC q13 weeks" notes="Anterior thigh or abdomen. 45° angle. Do not rub after injection." />
            </div>
            <h3>Administration Notes</h3>
            <ul>
              <li>Tablets: Swallow whole with water. May be taken with or without food (though food improves absorption).</li>
              <li>Sublingual administration of tablets is pharmacologically feasible but not routinely recommended.</li>
              <li>IM injections: Administer to gluteal or deltoid region. Vigorously shake suspension immediately before use. Never dilute, never administer IV.</li>
              <li>SC injections: Administer to anterior thigh or abdomen at 45°. Pull skin away from body before injecting. Press lightly — do not rub post-injection.</li>
              <li>If more than 13 weeks have elapsed since the last injectable dose, exclude pregnancy before re-administering.</li>
              <li>Duration of therapy is indication-dependent. Most gynaecological oral courses run 2–3 months. Injectable contraception requires ongoing q13-week scheduling.</li>
            </ul>
          </Section>

          {/* 07 */}
          <Section id="s7" num="07" title="Pharmacokinetics — ADME"
            collapsed={!!collapsed['s7']} onToggle={() => toggleSection('s7')}>
            <h3>Absorption</h3>
            <div className={s.pkGrid}>
              <PKCard label="Tmax (oral)" value="2–4 hours" note="Rapid GI absorption; lag time ~30 min" />
              <PKCard label="Cmax (oral 10 mg)" value="1.2–5.2 ng/mL" note="Via GC-MS; highly variable between individuals" />
              <PKCard label="Food Effect" value="↑Cmax 50–70%" note="↑AUC 18–33%; t½ unchanged" />
              <PKCard label="Oral Bioavailability" value="~100%" note="Absolute bioavailability not formally studied; high relative BA confirmed" />
              <PKCard label="Tmax (IM 150 mg)" value="~3 weeks" note="Peak plasma 1–7 ng/mL; prolonged depot release" />
              <PKCard label="Tmax (SC 104 mg)" value="~6.5 days" note="Cmax ~3.83 nmol/L; slower absorption vs IM" />
            </div>
            <h3>Distribution</h3>
            <div className={s.pkGrid}>
              <PKCard label="Protein Binding" value="86–90%" note="Primarily to albumin; NO binding to SHBG" />
              <PKCard label="Volume of Distribution" value="High (lipophilic)" note="Extensive tissue distribution; exact Vd not standardised" />
            </div>
            <h3>Metabolism</h3>
            <p>MPA is extensively metabolised in the liver, primarily via CYP3A4-mediated hydroxylation at positions C6β, C21, C2β, and C1β. Additional metabolic routes include 3- and 5-dihydro and 3,5-tetrahydro metabolite formation, as well as conjugation reactions. The 6α-methyl and 17α-acetoxy modifications make MPA more resistant to first-pass metabolism than progesterone, accounting for its superior oral efficacy.</p>
            <p>No formal DDI studies with specific CYP3A4 inducers or inhibitors have been conducted for MPA, though CYP3A4 inducers are known to reduce MPA plasma concentrations clinically.</p>
            <h3>Elimination</h3>
            <div className={s.pkGrid}>
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
          <Section id="s8" num="08" title="Pharmacodynamics — What MPA Does to the Body"
            collapsed={!!collapsed['s8']} onToggle={() => toggleSection('s8')}>
            <ul>
              <li><strong>Endometrial transformation:</strong> Converts proliferative to secretory endometrium in the presence of adequate endogenous oestrogen.</li>
              <li><strong>GnRH suppression:</strong> Reduces hypothalamic GnRH pulsatility → ↓ FSH & LH → follicular suppression (dose- and route-dependent).</li>
              <li><strong>Cervical mucus thickening:</strong> Contributes to contraceptive efficacy of injectable formulations.</li>
              <li><strong>Androgenic effects:</strong> Mild acnegenic and androgenic activity at the skin level; modest impact on lipid profile (↑ LDL, ↓ HDL with long-term use).</li>
              <li><strong>Glucocorticoid receptor activity (high doses):</strong> Adrenal suppression, Cushingoid features, glucose intolerance possible with oncology-level dosing.</li>
              <li><strong>Bone mineral density (parenteral, long-term):</strong> Suppression of ovarian oestrogen production leads to progressive BMD reduction with continued Depo-MPA use — particularly significant in adolescents during peak bone accrual.</li>
              <li><strong>CNS:</strong> Mood changes, depression, insomnia — mechanism incompletely understood; likely mediated via hypothalamic serotonergic and GABAergic modulation.</li>
            </ul>
          </Section>

          {/* 09 */}
          <Section id="s9" num="09" title="Onset & Duration of Action"
            collapsed={!!collapsed['s9']} onToggle={() => toggleSection('s9')}>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Formulation</th><th>Onset</th><th>Full Effect</th><th>Duration</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Oral (gynaecological)</td>
                    <td>Immediate (pharmacologically)</td>
                    <td>2–3 months for full symptom resolution</td>
                    <td>Per treatment course (typically 5–14 days or cyclic)</td>
                  </tr>
                  <tr>
                    <td>IM 150 mg (contraception)</td>
                    <td>Contraceptive within 24 hours if given on day 1–5 of cycle</td>
                    <td>Peak serum ~3 weeks post-injection</td>
                    <td>13 weeks (3 months) per dose</td>
                  </tr>
                  <tr>
                    <td>SC 104 mg (contraception)</td>
                    <td>Contraceptive within 24 hours (day 1–5 of cycle)</td>
                    <td>Peak ~6–7 days</td>
                    <td>13 weeks per dose</td>
                  </tr>
                  <tr>
                    <td>Fertility return (post-IM)</td>
                    <td>N/A</td>
                    <td>Median 10 months post last injection</td>
                    <td>Up to 12–18 months in some patients</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Oral tablets begin working immediately but patients should be counselled that symptom improvement — particularly for heavy periods or endometriosis pain — may take one to three months to become fully apparent.</p>
          </Section>

          {/* 10 */}
          <Section id="s10" num="10" title="Therapeutic Index"
            collapsed={!!collapsed['s10']} onToggle={() => toggleSection('s10')}>
            <Callout type="success" title="✅ Wide Therapeutic Index">
              <p>MPA has a wide therapeutic window. Doses range from 2.5 mg/day (HRT adjunct) to 1,000 mg or more (oncology), with no defined toxic serum threshold in routine clinical use. The oral LD₅₀ in rats exceeds 6,400 mg/kg. Overdose from standard formulations is unlikely to produce a specific toxic syndrome beyond an exaggeration of common adverse effects.</p>
            </Callout>
            <p>The principal clinical concern is not acute toxicity but rather long-term safety signals: BMD reduction with prolonged parenteral use, and cardiovascular/oncological risks when combined with oestrogen in HRT — neither of which constitutes narrow therapeutic index behaviour in the classical sense.</p>
          </Section>

          {/* 11 */}
          <Section id="s11" num="11" title="Contraindications — When NOT to Use"
            collapsed={!!collapsed['s11']} onToggle={() => toggleSection('s11')}>
            <Callout type="danger" title="⛔ Absolute Contraindications">
              <ul>
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
          <Section id="s12" num="12" title="Warnings & Precautions"
            collapsed={!!collapsed['s12']} onToggle={() => toggleSection('s12')}>
            <Callout type="danger" title="⚠️ Black Box Warning (FDA) — Combination HRT with Oestrogen">
              <p>The following warnings apply <strong>specifically when MPA is used in combination with oestrogen</strong> (e.g., conjugated oestrogens + MPA as HRT). They do <strong>not</strong> apply to MPA used alone at standard doses. This distinction is clinically critical and must be explicitly communicated to patients and prescribers.</p>
              <ul>
                <li><strong>Cardiovascular:</strong> CE/MPA combination significantly increases risk of myocardial infarction, stroke, and pulmonary embolism (WHI data; mean follow-up 5.6 years; trial stopped early)</li>
                <li><strong>Breast cancer:</strong> RR 1.24 (95% CI 1.01–1.54) for invasive breast cancer — 41 vs 33 cases per 10,000 women-years vs placebo</li>
                <li><strong>Dementia:</strong> Increased risk of probable dementia in women ≥65 years receiving combined oestrogen–progestin HRT (WHIMS sub-study)</li>
              </ul>
            </Callout>
            <h3>Thromboembolic Risk (MPA Alone)</h3>
            <p>An inherent risk of venous and arterial thromboembolism exists with progestin therapy, particularly at higher doses or with parenteral formulations. Discontinue immediately if DVT, PE, stroke, or retinal thrombosis is suspected or confirmed.</p>
            <h3>Bone Mineral Density — Injectable MPA</h3>
            <p>Prolonged use of depot injectable MPA reduces BMD due to suppression of ovarian oestrogen production. Loss is cumulative with duration, may not fully reverse, and is of greatest concern in adolescents and young adults during peak bone accrual. Injectable MPA should not be used as a long-term contraceptive ({'>'} 2 years) unless alternatives are inadequate. BMD monitoring should be considered in long-term users.</p>
            <h3>Glucose Metabolism</h3>
            <p>MPA may impair insulin sensitivity and carbohydrate metabolism. Diabetic patients should have blood glucose monitored more closely during therapy.</p>
            <h3>Depression and Mood</h3>
            <p>MPA has been associated with mood changes, depression, and emotional lability. Use with caution in patients with a current or past history of depression. If clinically significant depressive symptoms emerge, reassess the benefit-risk profile.</p>
            <h3>Fluid Retention</h3>
            <p>MPA-related fluid retention may exacerbate conditions such as epilepsy, migraine, asthma, cardiac dysfunction, or renal impairment. Use with caution in these populations.</p>
            <h3>Liver Function</h3>
            <p>If jaundice or clinically significant disturbance of liver function tests develops during therapy, MPA should be discontinued immediately.</p>
            <h3>Meningioma</h3>
            <p>An association between long-term high-dose MPA and intracranial meningioma has been reported. Any patient developing new neurological symptoms during therapy should have this considered in the differential diagnosis.</p>
            <h3>Laboratory Test Interference</h3>
            <p>MPA may alter the following laboratory parameters — results should be interpreted with caution in patients on therapy:</p>
            <div className={s.tagList}>
              <span className={`${s.tag} ${s.tagAmber}`}>↑ LDL cholesterol</span>
              <span className={`${s.tag} ${s.tagAmber}`}>↑ Triglycerides</span>
              <span className={`${s.tag} ${s.tagAmber}`}>↓ HDL cholesterol</span>
              <span className={`${s.tag} ${s.tagAmber}`}>Glucose metabolism</span>
              <span className={s.tag}>Thyroid function tests (TBG)</span>
              <span className={s.tag}>Coagulation factors</span>
            </div>
          </Section>

          {/* 13 */}
          <Section id="s13" num="13" title="Side Effects — Adverse Effects Profile"
            collapsed={!!collapsed['s13']} onToggle={() => toggleSection('s13')}>
            <div className={s.aeGrid}>
              <div>
                <h3>Common ({'>'} 1 in 100)</h3>
                <ul className={s.aeList}>
                  {['Headache','Nausea','Irregular vaginal bleeding / spotting','Weight gain','Breast tenderness','Mood changes / depression','Insomnia','Dizziness','Fatigue','Acne','Pruritus (itchy skin)','Hair thinning / mild loss','Changes in vaginal discharge','Elevated body temperature / flushing','Reduced libido'].map(e => (
                    <AEItem key={e} type="common">{e}</AEItem>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Serious ({'<'} 1 in 1,000)</h3>
                <ul className={s.aeList}>
                  {['Deep vein thrombosis (DVT)','Pulmonary embolism','Retinal vascular thrombosis','Thrombophlebitis','Anaphylaxis / anaphylactoid reaction','Jaundice / hepatic dysfunction','Meningioma (high dose/long term)','BMD reduction (long-term parenteral)','Cushingoid features (high-dose oncology)','Ectopic pregnancy (injectable — if contraceptive failure occurs)'].map(e => (
                    <AEItem key={e} type="serious">{e}</AEItem>
                  ))}
                </ul>
              </div>
            </div>
            <Callout type="danger" title="🚨 Seek Emergency Medical Attention For">
              <ul>
                <li>Sudden unilateral visual loss (possible retinal vein occlusion)</li>
                <li>Chest pain, sudden dyspnoea, haemoptysis (possible PE)</li>
                <li>Unilateral leg swelling, warmth, erythema (possible DVT)</li>
                <li>Sudden severe headache, hemiplegia, dysphasia (possible CVA)</li>
                <li>Anaphylaxis: lip/tongue/throat swelling, stridor, hypotension, collapse</li>
              </ul>
            </Callout>
            <h3>Injectable-Specific — Menstrual Changes Over Time</h3>
            <p>Menstrual irregularity is the single most common adverse effect of injectable MPA used as contraception:</p>
            <ul>
              <li>~57% of users experience irregular bleeding or spotting at 12 months</li>
              <li>~60–70% develop amenorrhoea by 12–24 months of use</li>
              <li>Weight gain {'>'} 10 lb in ~38% at 24 months</li>
            </ul>
          </Section>

          {/* 14 */}
          <Section id="s14" num="14" title="Drug Interactions"
            collapsed={!!collapsed['s14']} onToggle={() => toggleSection('s14')}>
            <h3>CYP3A4 Inducers — Reduce MPA Efficacy</h3>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Drug / Class</th><th>Example(s)</th><th>Clinical Consequence</th><th>Action</th></tr></thead>
                <tbody>
                  <tr><td>Antibiotics (RIFA)</td><td>Rifampicin</td><td>↑ MPA metabolism → ↓ plasma levels</td><td>Avoid; use alternative contraception</td></tr>
                  <tr><td>Antiepileptics</td><td>Carbamazepine, Phenytoin, Phenobarbital, Primidone</td><td>↑ CYP3A4 induction → ↓ MPA efficacy</td><td>Non-hormonal backup contraception</td></tr>
                  <tr><td>Antiretrovirals</td><td>Ritonavir-boosted regimens, efavirenz</td><td>Variable: induction or inhibition possible</td><td>Specialist review required</td></tr>
                  <tr><td>HCV Direct-acting antivirals</td><td>Some NS5B inhibitors</td><td>Possible enzyme induction</td><td>Prescriber alert</td></tr>
                  <tr><td>Herbal</td><td>St John's Wort (Hypericum perforatum)</td><td>CYP3A4 induction → ↓ MPA levels</td><td>Contraindicated with MPA</td></tr>
                </tbody>
              </table>
            </div>
            <h3>CYP3A4 Inhibitors — May Increase MPA Exposure</h3>
            <p>No formal studies. Inhibitors such as ketoconazole, itraconazole, clarithromycin, or grapefruit juice may theoretically increase MPA plasma concentrations, increasing adverse effect risk. Clinical significance is not quantified; exercise caution and monitor where co-prescription is unavoidable.</p>
            <h3>Warfarin / Anticoagulants</h3>
            <p>MPA may alter coagulation factors, potentially affecting anticoagulant response. INR should be monitored more closely in patients on concurrent warfarin therapy after initiation or discontinuation of MPA.</p>
            <h3>Food Interactions</h3>
            <p>No specific food avoidances. Grapefruit/grapefruit juice — weak theoretical CYP3A4 inhibitory effect. Standard dietary habits are acceptable. Alcohol does not directly interact with MPA pharmacokinetically but worsens common adverse effects (fatigue, headache, dizziness).</p>
            <h3>Laboratory Test Interactions</h3>
            <p>Clinicians must interpret the following with caution in MPA users: coagulation profiles, thyroid function tests (TBG), LDL/cholesterol, triglycerides, glucose metabolism panels. Notify the ordering laboratory and interpreting clinician of concurrent MPA use.</p>
          </Section>

          {/* 15 */}
          <Section id="s15" num="15" title="Overdose & Toxicity"
            collapsed={!!collapsed['s15']} onToggle={() => toggleSection('s15')}>
            <p>MPA has a wide therapeutic index and acute overdose toxicity is low. No specific toxic serum concentration threshold is defined for standard oral doses.</p>
            <h3>Expected Signs of Overdose</h3>
            <ul>
              <li>Nausea and vomiting</li>
              <li>Drowsiness and excessive fatigue</li>
              <li>Fluid retention and oedema</li>
              <li>Exaggeration of common adverse effects (breast tenderness, mood changes)</li>
            </ul>
            <h3>Management</h3>
            <Callout type="info" title="ℹ️ Management Principles">
              <ul>
                <li>No specific antidote exists.</li>
                <li>Treatment is symptomatic and supportive.</li>
                <li>Discontinue MPA.</li>
                <li>Contact Poison Control / appropriate toxicology services for guidance.</li>
                <li>Monitor vital signs, fluid balance, and mood status.</li>
                <li>In parenteral overdose scenarios (accidental repeat dosing), the prolonged depot half-life means clinical effects may persist for weeks — prolonged monitoring is required.</li>
              </ul>
            </Callout>
            <p><strong>Oral LD₅₀:</strong> {'>'} 6,400 mg/kg (rat); {'>'} 16 g/kg (mouse). Confirms a very wide safety margin between therapeutic and lethal doses.</p>
          </Section>

          {/* 16 */}
          <Section id="s16" num="16" title="Pregnancy & Lactation"
            collapsed={!!collapsed['s16']} onToggle={() => toggleSection('s16')}>
            <h3>Pregnancy</h3>
            <Callout type="danger" title="⛔ Contraindicated in Pregnancy — FDA Category X">
              <p>MPA should not be used during pregnancy. First-trimester exposure has been associated with potential increased risk of hypospadias, clitoral enlargement, and labial fusion in offspring, though clear causation has not been definitively established. If pregnancy is confirmed during therapy, MPA should be discontinued immediately and the patient counselled on fetal risk.</p>
              <p style={{ marginTop: '0.5rem' }}><strong>Low-dose exposure before pregnancy was known:</strong> Standard oral doses (2.5–10 mg) taken before awareness of pregnancy are unlikely to cause significant fetal harm.</p>
            </Callout>
            <p>MPA can affect the hormonal milieu of pregnancy. Injectable MPA is not recommended for women attempting to conceive, given the prolonged fertility delay post-discontinuation.</p>
            <h3>Lactation</h3>
            <p>Detectable but low amounts of MPA are excreted in breast milk. Infant absorption from breast milk is minimal.</p>
            <ul>
              <li><strong>Standard oral doses:</strong> Generally considered compatible with breastfeeding by most international guidance. The American Academy of Pediatrics classifies progestins as compatible with breastfeeding.</li>
              <li><strong>Injectable MPA:</strong> Should not be initiated until at least 6 weeks postpartum in breastfeeding women (to allow establishment of lactation), or 5 days postpartum in non-breastfeeding women.</li>
              <li><strong>High-dose oncology MPA:</strong> Individual specialist assessment required — benefit-risk decision should involve the treating oncologist.</li>
            </ul>
            <p>Clinicians should monitor infants for adequate feeding and normal development where maternal MPA therapy is ongoing.</p>
            <h3>Fertility</h3>
            <ul>
              <li><strong>Oral MPA:</strong> Fertility typically returns promptly after cessation.</li>
              <li><strong>Injectable MPA:</strong> Median return of fertility is approximately 10 months post last injection, but can extend to 12–18 months. Patients planning pregnancy should be counselled about this delay before initiating injectable therapy.</li>
              <li>Ectopic pregnancy has been reported in cases of contraceptive failure with injectable MPA.</li>
            </ul>
          </Section>

          {/* 17 */}
          <Section id="s17" num="17" title="Paediatric Use"
            collapsed={!!collapsed['s17']} onToggle={() => toggleSection('s17')}>
            <ul>
              <li><strong>Pre-pubertal children:</strong> Not indicated. MPA tablets are not licensed for paediatric use in children who have not yet reached menarche.</li>
              <li><strong>Post-pubertal adolescent females:</strong> May be used for the same gynaecological indications as adults (secondary amenorrhoea, abnormal uterine bleeding, endometriosis) at standard adult doses. Specific paediatric dose-finding studies have not been conducted.</li>
              <li><strong>BMD concern in adolescents:</strong> This is a particularly important consideration. Adolescence is a critical period of peak bone accrual. Long-term use of injectable depot MPA in adolescents may significantly impair peak bone mass, increasing long-term osteoporotic fracture risk. Injectable MPA should not be the first-line contraceptive choice in adolescents; if used, duration should be minimised and calcium/vitamin D supplementation and regular BMD monitoring should be considered.</li>
            </ul>
          </Section>

          {/* 18 */}
          <Section id="s18" num="18" title="Geriatric Use"
            collapsed={!!collapsed['s18']} onToggle={() => toggleSection('s18')}>
            <ul>
              <li>In the WHI estrogen plus progestin substudy, 44% of participants were ≥65 years, and 6.6% were ≥75 years.</li>
              <li>The elevated risks of <strong>probable dementia</strong> and cardiovascular events identified in the WHI were most pronounced in women ≥65 years receiving combined CE/MPA therapy.</li>
              <li>MPA in combination with oestrogen <strong>should not be used to prevent cognitive decline, dementia, or cardiovascular disease</strong> in older women.</li>
              <li>For women ≥65 using MPA as part of HRT for genuine symptom management, the lowest effective dose for the shortest necessary duration is the recommended approach.</li>
              <li>No specific dose adjustment guidelines for MPA monotherapy in the elderly based solely on age; however, age-related changes in hepatic metabolism and the higher prevalence of co-morbidities and polypharmacy in this population warrant careful monitoring.</li>
            </ul>
          </Section>

          {/* 19 */}
          <Section id="s19" num="19" title="Renal & Hepatic Dosing"
            collapsed={!!collapsed['s19']} onToggle={() => toggleSection('s19')}>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Impairment</th><th>Oral MPA</th><th>Injectable MPA</th><th>Notes</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Mild hepatic impairment</td>
                    <td>Use with caution; monitor LFTs</td>
                    <td>Use with caution</td>
                    <td>Regular liver function monitoring advisable</td>
                  </tr>
                  <tr>
                    <td>Significant / severe hepatic impairment</td>
                    <td>Contraindicated</td>
                    <td>Contraindicated (no dose guidance)</td>
                    <td>Alcoholic cirrhosis markedly reduces MPA elimination; dose reduction may be needed if oral use unavoidable</td>
                  </tr>
                  <tr>
                    <td>Active liver disease / jaundice</td>
                    <td>Discontinue</td>
                    <td>Discontinue</td>
                    <td>MPA should be stopped if jaundice or LFT disturbance develops</td>
                  </tr>
                  <tr>
                    <td>Renal impairment</td>
                    <td>No dose adjustment established</td>
                    <td>No dose adjustment established</td>
                    <td>MPA can cause fluid retention; caution in pre-existing renal disease. Monitor fluid status.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 20 */}
          <Section id="s20" num="20" title="Monitoring Parameters"
            collapsed={!!collapsed['s20']} onToggle={() => toggleSection('s20')}>
            <div className={s.monitorGrid}>
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
          <Section id="s21" num="21" title="Patient Counselling Points"
            collapsed={!!collapsed['s21']} onToggle={() => toggleSection('s21')}>
            <div className={s.counselGrid}>
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
          <Section id="s22" num="22" title="Storage & Handling"
            collapsed={!!collapsed['s22']} onToggle={() => toggleSection('s22')}>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Parameter</th><th>Oral Tablets</th><th>Injectable Suspension</th></tr></thead>
                <tbody>
                  <tr><td>Temperature</td><td>20–25°C (68–77°F) — Controlled Room Temperature (USP)</td><td>15–30°C — protect from freezing</td></tr>
                  <tr><td>Light</td><td>Protect from light; store in tight, light-resistant container</td><td>Keep in original packaging; protect from prolonged light</td></tr>
                  <tr><td>Moisture</td><td>Keep away from moisture; do not store in bathroom medicine cabinet</td><td>N/A (aqueous suspension)</td></tr>
                  <tr><td>Special handling</td><td>None required</td><td>Shake vigorously immediately before use. Do not dilute. Do not administer IV. Single use only.</td></tr>
                  <tr><td>Child safety</td><td>Store in a child-resistant container out of reach of children</td><td>Dispose of needles/syringes in approved sharps container</td></tr>
                  <tr><td>Disposal</td><td>Follow local pharmaceutical waste disposal guidelines</td><td>Sharps container for needles; unused product via pharmacy take-back</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 23 */}
          <Section id="s23" num="23" title="Cost & Availability"
            collapsed={!!collapsed['s23']} onToggle={() => toggleSection('s23')}>
            <ul>
              <li><strong>Generic availability:</strong> MPA is widely available as a generic in most markets. Generic tablets (2.5 mg, 5 mg, 10 mg) are significantly less expensive than branded equivalents.</li>
              <li><strong>UK (NHS):</strong> Available on NHS prescription. Tablets dispensed under generic name or branded equivalents. Injectable Depo-Provera available at sexual and reproductive health clinics and GP surgeries. No patient prescription charge for those with exemption certificates.</li>
              <li><strong>India:</strong> Available in multiple generic tablet brands across all tiers of healthcare. Widely accessible and inexpensive.</li>
              <li><strong>US:</strong> Provera (branded) and generic MPA tablets widely available. Depo-Provera injection available at clinics. Covered under most insurance plans for contraception at no cost under ACA-mandated preventive services.</li>
              <li><strong>High-dose formulations (100–400 mg):</strong> Less widely available; typically dispensed through specialist oncology pharmacy channels.</li>
            </ul>
          </Section>

          {/* 24 */}
          <Section id="s24" num="24" title="Regulatory Status"
            collapsed={!!collapsed['s24']} onToggle={() => toggleSection('s24')}>
            <div className={s.tableWrap}>
              <table>
                <thead><tr><th>Jurisdiction</th><th>Status</th><th>Notes</th></tr></thead>
                <tbody>
                  <tr><td>United States (FDA)</td><td>Prescription Only (Rx)</td><td>Schedule: Non-controlled. Approved since June 18, 1959. Current label rev. March 2024.</td></tr>
                  <tr><td>United Kingdom (MHRA)</td><td>Prescription Only Medicine (POM)</td><td>Licensed for gynaecological indications and HRT adjunct. Tablets available on NHS prescription.</td></tr>
                  <tr><td>European Union (EMA)</td><td>Prescription Only</td><td>Available across EU member states under national authorisations. High-dose oncology formulations subject to separate national approvals.</td></tr>
                  <tr><td>India (CDSCO)</td><td>Schedule H (Prescription Required)</td><td>Widely marketed in multiple generic formulations. Depo-Provera IM introduced into India's public health system in 2016.</td></tr>
                  <tr><td>Australia (TGA)</td><td>Prescription Only (S4)</td><td>Registered for gynaecological and contraceptive indications.</td></tr>
                </tbody>
              </table>
            </div>
            <p>MPA is <strong>not a controlled substance</strong> in any major jurisdiction. It is universally classified as a prescription-only medicine and is not available over the counter.</p>
          </Section>

          {/* 25 */}
          <Section id="s25" num="25" title="Recent Updates — New Findings & Guideline Changes"
            collapsed={!!collapsed['s25']} onToggle={() => toggleSection('s25')}>
            <h3>FDA Label Update — March 2024</h3>
            <p>The Provera (medroxyprogesterone acetate tablets) prescribing information was updated in March 2024. The removal of pregnancy as a contraindication from the injectable formulation's label (Depo-Provera) was noted in April 2024 — a regulatory label alignment, not a change in clinical recommendation (MPA remains contraindicated in pregnancy).</p>
            <h3>Meningioma Risk — Growing Evidence Base</h3>
            <p>Accumulating real-world pharmacovigilance data and cohort studies (2022–2024) have strengthened the association between high-dose, long-duration progestogen use (including MPA) and intracranial meningioma. Regulatory agencies in France (ANSM) and the UK have issued guidance advising clinicians to review patients on high-dose MPA for neurological symptoms and to consider alternative therapies where possible. This signal appears dose-dependent and is most notable with oncology-level dosing.</p>
            <h3>PPOS (Progestin-Primed Ovarian Stimulation) — Growing ART Use</h3>
            <p>MPA as part of PPOS protocols in IVF has gained increasing traction in the literature (2020–2024), particularly in China, showing comparable clinical pregnancy rates to GnRH antagonist protocols in freeze-all cycles. MPA (10 mg/day) administered alongside gonadotrophins prevents premature LH surges without reducing ovarian response. Not yet universally adopted in Western ART practice but increasingly recognised in international guidelines.</p>
            <h3>BMD Evidence — ACOG Guidance</h3>
            <p>The American College of Obstetricians and Gynecologists (ACOG) has reaffirmed guidance that the BMD reduction with injectable MPA should not deter clinicians from prescribing it when it is the most appropriate contraceptive for a patient — including adolescents — provided counselling on the risk is given and duration is minimised. BMD loss has been shown to recover after discontinuation in most patients.</p>
            <h3>MPA vs. Newer Progestogens in HRT</h3>
            <p>Ongoing discussion in the literature continues to compare MPA's safety profile in combination HRT against newer, more progesterone-like progestins (e.g., dydrogesterone, micronised progesterone). Some observational data suggest that micronised progesterone may carry a more favourable breast cancer risk profile compared to MPA when used in HRT, though head-to-head RCT data remain limited. This area is expected to produce updated clinical guideline recommendations in coming years.</p>
          </Section>

        </div>{/* /content */}

        <div className={s.footer}>
          <strong>Sources:</strong> FDA/DailyMed Provera Prescribing Information (rev. March 2024) · Pfizer Medical Information (Provera) · StatPearls — Medroxyprogesterone (NCBI, updated February 2024) · DrugBank DB00603 · Wikipedia/MPA (primary literature) · WHI Estrogen Plus Progestin Substudy · European Medicines Agency (EMA) · MHRA (UK) SmPC · ACOG Practice Bulletins · Drugs.com Monograph (reviewed July 2025) · DailyMed (rev. C, 3/2024)<br /><br />
          This monograph is intended for use by qualified healthcare professionals only. It does not constitute medical advice. Clinical decisions should be made in conjunction with the complete prescribing information and individual patient assessment. Last reviewed: 2025.
        </div>

      </main>

      {/* Back to top */}
      <button
        className={`${s.backToTop} ${showTop ? s.backToTopVisible : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >↑</button>
    </div>
  )
}
