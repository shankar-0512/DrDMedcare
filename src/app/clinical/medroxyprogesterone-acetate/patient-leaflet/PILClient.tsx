'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    q: 'When will I feel better?',
    a: 'The medicine starts working straight away, but full effects can take 2–3 months. Most people notice improvement within the first month.',
  },
  {
    q: 'What happens when I stop taking it?',
    a: 'You will usually have a period when you stop each month or finish your course. If no period comes, speak to your doctor — in case you might be pregnant. For prostate cancer hot flushes, symptoms often improve after a few months and you may be able to stop once they have settled.',
  },
  {
    q: 'Will it affect my contraception?',
    a: 'Yes. Although medroxyprogesterone reduces fertility, it is not fully effective as contraception — you could still get pregnant. Use a non-hormonal method such as condoms. If you would prefer a hormonal option, your doctor may suggest switching to a contraceptive pill.',
  },
  {
    q: 'Can I drive?',
    a: 'This medicine can cause dizziness and fatigue. Do not drive, cycle, or use machinery if affected. It is your responsibility to decide whether it is safe. If in any doubt — do not drive.',
  },
  {
    q: 'Will I gain weight?',
    a: 'Some people gain a small amount of weight due to fluid retention. As treatment is usually short (up to 3 months), significant weight gain is unlikely. A healthy diet and regular exercise will help.',
  },
  {
    q: 'Are there similar medicines?',
    a: 'Yes — other progestogen tablets such as norethisterone work similarly. Non-hormonal options for heavy periods include tranexamic acid. Ask your doctor what is best for your situation.',
  },
  {
    q: 'Does it cause withdrawal bleeding?',
    a: 'No. Medroxyprogesterone does not cause withdrawal bleeding. If you notice unexpected bleeding or spotting after finishing a course, inform your doctor.',
  },
]

const SE_CARDS = [
  {
    emoji: '🤕',
    name: 'Headache',
    tips: [
      'Rest and drink plenty of water',
      'Try paracetamol or ibuprofen',
      'See your doctor if headaches are severe or last more than a week',
    ],
  },
  {
    emoji: '🤢',
    name: 'Nausea / Feeling sick',
    tips: [
      'Take tablets with food',
      'Avoid rich, spicy, or fatty meals',
      'Eat smaller, more frequent meals',
      'Ginger tea or ginger candies can help',
    ],
  },
  {
    emoji: '🩺',
    name: 'Breast tenderness',
    tips: [
      'Wear a well-fitting, supportive bra',
      'Use hot or cold packs on the area',
      'Limit caffeine',
      'Paracetamol or ibuprofen for pain relief',
    ],
  },
  {
    emoji: '🩸',
    name: 'Irregular bleeding / Spotting',
    tips: [
      "Make sure you're taking tablets on the correct days",
      'If it continues, speak to your doctor — dose adjustment may be needed',
    ],
  },
  {
    emoji: '⚖️',
    name: 'Weight gain',
    tips: [
      'Often due to fluid retention',
      'Eat a balanced diet and exercise regularly',
      'Usually only a small amount over a short course',
    ],
  },
  {
    emoji: '😴',
    name: 'Dizziness / Fatigue',
    tips: [
      'Sit or lie down until it passes',
      'Do not drive or use machinery',
      'Avoid alcohol — it makes these worse',
    ],
  },
  {
    emoji: '😟',
    name: 'Mood changes / Depression',
    tips: [
      'Talk to your doctor if mood changes persist',
      'Do not suffer in silence — treatment adjustments are possible',
    ],
  },
  {
    emoji: '🔴',
    name: 'Acne / Skin changes',
    tips: [
      'Wash with a mild, gentle cleanser twice daily',
      'Avoid heavy cosmetics or exfoliants',
      'Do not pick or squeeze spots',
    ],
  },
]

const LIFESTYLE_CARDS = [
  { icon: '🏃', title: 'Stay Active', desc: 'Regular exercise reduces hot flushes, improves sleep and mood, and strengthens bones. Try walking, yoga, tai chi, or aerobics.' },
  { icon: '🛏️', title: 'Better Sleep', desc: 'Wear loose clothes. Sleep in a cool, well-ventilated room. Aim for at least 8 hours. Avoid screens before bed.' },
  { icon: '☕', title: 'Avoid Triggers', desc: 'Limit caffeine, alcohol, and spicy food — all known triggers for hot flushes and night sweats.' },
  { icon: '🧘', title: 'Manage Stress', desc: 'Hormonal changes can affect your mood. Relaxation techniques and mindfulness can help reduce mood swings.' },
  { icon: '🚭', title: 'Stop Smoking', desc: 'Smoking worsens hot flushes and raises your risk of heart disease, stroke, and cancer. Stopping has immediate benefits.' },
  { icon: '🥗', title: 'Healthy Eating', desc: 'A balanced diet low in fat and high in complex carbohydrates helps with weight management and breast tenderness.' },
]

const DOSE_ROWS = [
  ['Period problems / Heavy bleeding', '2.5–10mg once daily', '5–10 days per cycle; 2–3 cycles'],
  ['Endometriosis', '10mg three times a day', '3 months continuously'],
  ['PCOS (absent/infrequent periods)', '10mg once daily', '14 days every 1–3 months'],
  ['Prostate cancer hot flushes', '20mg (two 10mg) once daily', '10 weeks, then reviewed'],
  ['Menopause symptoms (HRT)', 'As advised by doctor', 'Part of 28-day HRT cycle'],
]

const STORAGE_TAGS = [
  '🌡️ Store in a cool, dry place',
  '🌞 Keep away from direct sunlight',
  '👶 Keep out of reach of children',
  '🗑️ Do not use after the expiry date',
]

const OTHER_SE_TAGS = [
  'Stomach cramps / Bloating',
  'Difficulty sleeping',
  'Higher body temperature',
  'Hair loss',
  'Itchy skin',
  'Vaginal yeast infection',
  'Changes to vaginal discharge',
  'Back pain',
]

function TealBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 my-3 text-sm leading-relaxed"
      style={{
        background: 'rgb(var(--color-primary-soft))',
        border: '1px solid rgb(var(--color-primary-mid))',
        color: '#1a3a36',
      }}
    >
      {title && (
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgb(var(--color-primary))' }}>
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

function AmberBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 my-3 text-sm leading-relaxed text-amber-900">
      {title && <p className="text-xs font-bold uppercase tracking-wider mb-2 text-amber-700">{title}</p>}
      {children}
    </div>
  )
}

function RedBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-red-50 border border-red-200 p-4 my-3 text-sm leading-relaxed text-red-900">
      {title && <p className="text-xs font-bold uppercase tracking-wider mb-2 text-red-700">{title}</p>}
      {children}
    </div>
  )
}

function SectionCard({
  id,
  icon,
  num,
  title,
  children,
}: {
  id: string
  icon: string
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: 'rgb(var(--color-primary-soft))' }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{num}</p>
          <h2 className="text-[15px] font-bold text-slate-900 leading-snug">{title}</h2>
        </div>
      </div>
      <div className="px-6 py-5 space-y-3 text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  )
}

export default function PILClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'rgb(var(--color-bg))' }}>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-primary)) 100%)' }}
      >
        <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white opacity-5" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white opacity-[0.03]" />

        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/clinical/medroxyprogesterone-acetate"
              className="text-xs text-white/60 hover:text-white/90 transition-colors"
            >
              ← Clinical Monograph
            </Link>
            <span className="text-white/30 text-xs">·</span>
            <Link href="/clinical" className="text-xs text-white/60 hover:text-white/90 transition-colors">
              Clinical Reference
            </Link>
            <span className="text-white/30 text-xs">·</span>
            <Link href="/" className="text-xs text-white/60 hover:text-white/90 transition-colors">
              🏠 Home
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-widest mb-4">
            Patient Information Leaflet
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Medroxyprogesterone{' '}
            <span className="italic font-normal" style={{ opacity: 0.75 }}>
              Tablets
            </span>
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
            Read this leaflet carefully before you start taking this medicine. Keep it — you may need to read it again.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Synthetic Progestogen', 'Prescription Only', 'Not a Contraceptive', 'Non Habit-Forming'].map((p) => (
              <span
                key={p}
                className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white/75"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Important notice */}
        <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-5 mb-6 flex gap-4">
          <span className="text-2xl flex-shrink-0 mt-0.5">⚠️</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Important — Read First</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              Medroxyprogesterone tablets do <strong>not</strong> prevent pregnancy. They are not a contraceptive. Use
              condoms or another non-hormonal method while taking this medicine. If you think you may be pregnant, stop
              the tablets and speak to your doctor immediately.
            </p>
          </div>
        </div>

        {/* ── Section 1 ── */}
        <SectionCard id="s1" icon="💊" num="Section 1" title="What is Medroxyprogesterone and what is it used for?">
          <p>
            Medroxyprogesterone is a medicine called a <strong>progestogen</strong> — a synthetic version of
            progesterone, a hormone your body makes naturally. It works the same way as natural progesterone, but with
            stronger effects.
          </p>
          <p>
            <strong>It is used to treat:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Absence of periods (amenorrhea)</li>
            <li>Irregular or heavy periods (abnormal uterine bleeding)</li>
            <li>Endometriosis</li>
            <li>Polycystic ovary syndrome (PCOS)</li>
            <li>Menopausal symptoms — when taken alongside oestrogen as hormone replacement therapy (HRT)</li>
            <li>Hot flushes caused by prostate cancer treatment</li>
            <li>Prevention of thickening of the uterine lining (endometrial hyperplasia) in women on HRT</li>
          </ul>
          <p>
            High-dose tablets (100mg, 200mg, 400mg) are used separately for certain cancers — your doctor will explain
            this if it applies to you.
          </p>
          <TealBox title="ℹ️ Low Progesterone — What It Can Cause">
            Low progesterone can lead to missed periods, frequent miscarriages, abdominal pain in pregnancy, decreased
            sex drive, weight gain, and gallbladder problems. This medicine helps restore progesterone levels to correct
            these issues.
          </TealBox>
        </SectionCard>

        {/* ── Section 2 ── */}
        <SectionCard id="s2" icon="🚫" num="Section 2" title="Before you take Medroxyprogesterone">
          <RedBox title="🔴 Do NOT take this medicine if you:">
            <ul className="list-disc pl-5 space-y-1.5 mt-1">
              <li>Are allergic to medroxyprogesterone or peanuts</li>
              <li>Have unexplained vaginal bleeding</li>
              <li>Have had or currently have breast cancer or uterine/endometrial cancer</li>
              <li>Are already on oestrogen + progestin treatment</li>
              <li>Have had a blood clot in a vein (DVT) or lung (pulmonary embolism)</li>
              <li>Have had liver problems</li>
              <li>Have had a heart attack or have angina</li>
              <li>Have a type of brain tumour called a meningioma</li>
            </ul>
          </RedBox>

          <AmberBox title="⚠️ Tell your doctor BEFORE taking it if you have:">
            <ul className="list-disc pl-5 space-y-1.5 mt-1">
              <li>High blood pressure, kidney problems, or diabetes</li>
              <li>Epilepsy, migraines, asthma, or gallstones</li>
              <li>Lupus, thyroid problems, or high calcium levels in your blood</li>
              <li>Hearing loss caused by otosclerosis</li>
              <li>A history of mental health problems</li>
              <li>A rare blood disorder called porphyria</li>
              <li>You are pregnant, breastfeeding, or planning to get pregnant</li>
              <li>A close relative who has had hormone-related cancer</li>
            </ul>
          </AmberBox>

          <AmberBox title="⚠️ Other medicines and supplements">
            Tell your doctor if you are taking any of the following, as they can affect how medroxyprogesterone works:
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Rifampicin (antibiotic)</li>
              <li>HIV or Hepatitis C medicines</li>
              <li>Anti-epileptic medicines: carbamazepine, phenytoin, phenobarbital, primidone</li>
              <li>Warfarin (blood thinner)</li>
              <li>
                <strong>St John&apos;s Wort</strong> — do not take this herbal remedy with medroxyprogesterone
              </li>
            </ul>
            <p className="mt-2">Always tell your doctor about any herbal remedies, vitamins, or supplements you take.</p>
          </AmberBox>

          <TealBox title="🤰 Pregnancy & Breastfeeding">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pregnancy:</strong> Do not take medroxyprogesterone while pregnant. It can affect natural
                hormone changes. Low doses (2.5–10mg) are unlikely to harm if taken before pregnancy was known. Stop
                immediately and tell your doctor if you become pregnant.
              </li>
              <li>
                <strong>Breastfeeding:</strong> Generally safe — only a small amount enters breast milk. Monitor your
                baby for any changes in feeding and speak to your doctor if concerned.
              </li>
              <li>
                <strong>Fertility:</strong> This medicine may reduce fertility while taking it, but fertility returns
                after stopping. Discuss with your doctor if you plan to get pregnant.
              </li>
            </ul>
          </TealBox>
        </SectionCard>

        {/* ── Section 3 ── */}
        <SectionCard id="s3" icon="📋" num="Section 3" title="How to take Medroxyprogesterone">
          <p>
            Always take this medicine exactly as your doctor has told you. Your doctor will set the dose and duration
            based on your condition.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TealBox title="✅ You can">
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>Take with or without food</li>
                <li>Take at any time of day — but stick to the same time each day</li>
                <li>If 3 times a day: space doses evenly throughout the day</li>
              </ul>
            </TealBox>
            <RedBox title="❌ Do NOT">
              <ul className="list-disc pl-5 space-y-1.5 mt-1">
                <li>Chew, crush, or break the tablet</li>
                <li>Take a double dose to make up for a missed one</li>
                <li>Stop taking on your own without consulting your doctor</li>
              </ul>
            </RedBox>
          </div>

          <p>
            <strong>Swallow whole with a glass of water.</strong>
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  {['Condition', 'Usual Dose', 'How Long'].map((h, i) => (
                    <th
                      key={h}
                      className={`text-left p-3 text-white text-[11px] font-semibold ${i === 0 ? 'rounded-tl-lg' : i === 2 ? 'rounded-tr-lg' : ''}`}
                      style={{ background: 'rgb(var(--color-primary))' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DOSE_ROWS.map(([condition, dose, duration], i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="p-3 border-b border-slate-100 text-slate-700 font-medium align-top">{condition}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-600 align-top">{dose}</td>
                    <td className="p-3 border-b border-slate-100 text-slate-600 align-top">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AmberBox title="⏰ If you miss a dose">
            You may notice some breakthrough bleeding or spotting. Take the missed dose as soon as you remember —
            unless it is nearly time for your next dose. In that case, skip it and continue as normal.{' '}
            <strong>Never take two doses at once.</strong> Setting a daily alarm can help you remember.
          </AmberBox>

          <RedBox title="🔴 If you take too much (overdose)">
            Symptoms of overdose include: seizures (fits), vomiting, nausea, difficulty breathing, and altered mental
            status. <strong>Seek medical attention immediately</strong> if you suspect you have taken too much.
          </RedBox>
        </SectionCard>

        {/* ── Section 4 ── */}
        <SectionCard id="s4" icon="⚡" num="Section 4" title="Possible side effects">
          <p>
            Like all medicines, medroxyprogesterone can cause side effects, although not everyone gets them. Most do
            not require medical attention and resolve over time.
          </p>
          <p className="font-semibold text-slate-900">
            Common side effects (more than 1 in 100 people) — and what to do:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SE_CARDS.map((se) => (
              <div key={se.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{se.emoji}</span>
                  <span className="font-semibold text-sm text-slate-900">{se.name}</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  {se.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">Other common side effects:</p>
            <div className="flex flex-wrap gap-2">
              {OTHER_SE_TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs font-medium border"
                  style={{
                    background: 'rgb(var(--color-primary-soft))',
                    color: 'rgb(var(--color-primary))',
                    borderColor: 'rgb(var(--color-primary-mid))',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <RedBox title="🔴 Serious side effects — seek urgent help">
            <p className="mb-2">
              These are rare (less than 1 in 1,000) but serious.{' '}
              <strong>Call 999 or go to A&E immediately</strong> if you experience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Pain, swelling, redness or warmth in a leg or arm</strong> — possible deep vein thrombosis
                (DVT)
              </li>
              <li>
                <strong>Sudden shortness of breath, chest pain with cough, or coughing up blood</strong> — possible
                blood clot in the lungs
              </li>
              <li>
                <strong>Sudden loss of vision in one or both eyes</strong> — possible blood clot
              </li>
              <li>
                <strong>Lips, mouth, throat or tongue suddenly swelling</strong> — possible serious allergic reaction
              </li>
              <li>
                <strong>Struggling to breathe or swallow, throat feeling tight</strong>
              </li>
              <li>
                <strong>Skin turning blue, grey or pale</strong>
              </li>
              <li>
                <strong>Sudden extreme confusion, drowsiness or fainting</strong>
              </li>
              <li>
                <strong>Seizures (fits), severe vomiting, or difficulty breathing</strong> — possible overdose
              </li>
            </ul>
          </RedBox>

          <AmberBox title="📋 Reporting side effects">
            You can report any suspected side effect to your national medicines authority (e.g. Yellow Card scheme in
            the UK). This helps improve safety information for everyone.
          </AmberBox>
        </SectionCard>

        {/* ── Section 5 ── */}
        <SectionCard id="s5" icon="📦" num="Section 5" title="How to store Medroxyprogesterone">
          <div className="flex flex-wrap gap-2 my-1">
            {STORAGE_TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1.5 text-xs font-medium border"
                style={{
                  background: 'rgb(var(--color-primary-soft))',
                  color: 'rgb(var(--color-primary))',
                  borderColor: 'rgb(var(--color-primary-mid))',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <p>
            Do not throw away any medicines via wastewater or household waste. Contact your local pharmacy or council
            waste service for safe disposal.
          </p>
        </SectionCard>

        {/* ── Section 6 ── */}
        <SectionCard id="s6" icon="🌿" num="Section 6" title="Lifestyle tips while taking this medicine">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LIFESTYLE_CARDS.map((ls) => (
              <div key={ls.title} className="border border-slate-200 rounded-xl p-4">
                <div className="text-2xl mb-2">{ls.icon}</div>
                <p className="font-semibold text-sm text-slate-900 mb-1">{ls.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{ls.desc}</p>
              </div>
            ))}
          </div>
          <TealBox title="🍽️ Food & Drink">
            You can eat and drink normally while taking this medicine. There are no significant food interactions.
            Alcohol is permitted in moderation, but avoid it if you experience dizziness, fatigue, or sleep problems.
          </TealBox>
        </SectionCard>

        {/* ── Section 7 ── */}
        <SectionCard id="s7" icon="❓" num="Section 7" title="Further information & common questions">
          <div className="divide-y divide-slate-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <span className="font-semibold text-sm text-slate-900 group-hover:text-[rgb(var(--color-primary))] transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm transition-transform"
                    style={{
                      background: 'rgb(var(--color-primary))',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pl-0.5">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Reminder strip ── */}
        <div
          className="rounded-2xl p-5 mb-6 flex gap-4 items-center"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-primary)) 100%)',
          }}
        >
          <span className="text-2xl flex-shrink-0">💬</span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            If you have any questions or concerns about this medicine,{' '}
            <strong className="text-white">always ask your doctor</strong>. They are there to help and can answer
            questions specific to your situation.
          </p>
        </div>

        {/* ── Footer ── */}
        <div className="text-center text-xs text-slate-400 pb-6 leading-relaxed">
          <p className="font-semibold text-slate-500 mb-1">Medroxyprogesterone Tablets — Patient Information Leaflet</p>
          <p>Synthetic Progestogen · Prescription Only · Therapeutic Class: Hormones</p>
          <p className="mt-2">
            This leaflet is for informational purposes only and does not replace professional medical advice.
            <br />
            Always follow your doctor&apos;s instructions. Last reviewed: March 2026.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link
              href="/clinical/medroxyprogesterone-acetate"
              className="text-xs hover:underline transition-colors"
              style={{ color: 'rgb(var(--color-primary))' }}
            >
              ← Clinical Monograph
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/clinical"
              className="text-xs hover:underline transition-colors"
              style={{ color: 'rgb(var(--color-primary))' }}
            >
              Clinical Reference
            </Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white text-sm z-50 transition-opacity"
          style={{ background: 'rgb(var(--color-primary))' }}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </main>
  )
}
