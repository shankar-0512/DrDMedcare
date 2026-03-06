import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "About Dr Priyanka Deventhiran | Dr D's MedCare",
  description: "Clinical pharmacist with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. Helping patients in India understand their medicines through personalised counselling sessions.",
}
import Image from 'next/image'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'

const CREDENTIALS = [
  { icon: '🎓', label: 'Pharm D', sub: 'Tamil Nadu Dr. M.G.R. Medical University' },
  { icon: '🏥', label: 'Clinical Pharmacist', sub: 'Private Hospital, India' },
  { icon: '📍', label: 'Based in Chennai', sub: 'Tamil Nadu, India' },
  { icon: '🗣️', label: 'Tamil, English, Telugu, Hindi', sub: 'Session languages' },
]

const APPROACH_ITEMS = [
  { icon: '💊', title: 'Prescription clarity', desc: 'I go through your prescription line by line — what each medicine is for, how and when to take it, and what to watch out for.' },
  { icon: '⚠️', title: 'Interaction awareness', desc: 'Drug–drug and drug–food interactions are common and dangerous. I flag these clearly so you know exactly what to avoid.' },
  { icon: '📅', title: 'Medication adherence', desc: 'For chronic patients, I build a structured schedule and follow up to make sure medicines are being taken correctly and consistently.' },
  { icon: '👨‍👩‍👧', title: 'Special populations', desc: 'Extra care for elderly, paediatric and chronic patients — those who need the most guidance and are often underserved.' },
]

const STATS = [
  { value: '500+', label: 'Patients counselled' },
  { value: '4', label: 'Languages' },
  { value: '3+', label: 'Years of experience' },
  { value: '8+', label: 'Specialisations' },
]

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.06]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-16 right-64 h-8 w-8 rounded-full bg-amber-300 opacity-40" />
        <div className="absolute top-[50%] -left-20 h-72 w-72 rounded-full opacity-[0.04]" style={{ background: 'rgb(var(--color-primary))' }} />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[420px_1fr]">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl opacity-10" style={{ background: 'rgb(var(--color-primary))' }} />
              <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-1.5 opacity-40">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                ))}
              </div>
              <div className="relative z-10 h-[440px] w-[320px] overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                <Image src="/priyanka2.jpg" alt="Dr Priyanka Deventhiran" fill className="object-cover object-top" priority />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-900">Dr Priyanka Deventhiran</p>
                  <p className="mt-0.5 text-xs text-slate-500">Pharm D · Medication Counsellor</p>
                  <p className="mt-0.5 text-xs text-slate-400">Chennai, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
              About me
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              Hi, I'm{' '}
              <span className="relative inline-block" style={{ color: 'rgb(var(--color-primary))' }}>
                Priyanka
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 8" preserveAspectRatio="none" style={{ height: '6px' }}>
                  <path d="M0,6 Q30,0 60,5 Q90,10 120,4" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              I'm a clinical pharmacist from Chennai with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. After years working in a private hospital, I saw the same problem repeat itself every single day — patients leaving with prescriptions they didn't fully understand.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              The moment that crystallised everything for me was reading about a mother who gave her child cough syrup with milk. The child died from a drug interaction that nobody had warned her about. That shouldn't happen. It doesn't have to happen. That's why Dr D's MedCare exists.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/book" className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90" style={{ background: 'rgb(var(--color-primary))' }}>
                Book a session →
              </Link>
              <WhatsAppButton message={WA_MESSAGES.general} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border bg-white/80 p-8 shadow-sm lg:p-12" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
                The problem
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Medication counselling is the missing pill in Indian healthcare</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">Doctors in India are overworked. A consultation lasts 5 minutes on average. There's no time to explain every medicine, every interaction, every side effect. Patients go home with a prescription and a prayer.</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">Elders skip doses. Parents misread instructions. Chronic patients stop their medicines the moment they feel better. These aren't careless mistakes — they're the result of a system that never took the time to explain.</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">In the UK, US, Australia and Canada, every pharmacy has a dedicated pharmacist whose job is to counsel patients on their medicines — it's built into the system as a standard of care. In India, that role simply doesn't exist at scale yet.</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">To make things more complicated, India has no legal definition of "OTC" — meaning antibiotics and other potent drugs are routinely sold without a prescription, often without any guidance on how to use them safely.</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">I fill that gap. One focused session where your medicines are explained clearly, in your language, at your pace.</p>
            </div>
            <div className="space-y-4">
              {[
                { stat: '50%', text: 'of Indian patients do not take medicines as prescribed' },
                { stat: '1 in 3', text: 'hospital readmissions are linked to medication errors' },
                { stat: '5 mins', text: 'average doctor consultation time in India' },
                { stat: '0', text: 'legal definition of "OTC" exists in India — potent drugs are sold freely without guidance' },
              ].map((item) => (
                <div key={item.stat} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-2xl font-bold shrink-0" style={{ color: 'rgb(var(--color-primary))' }}>{item.stat}</div>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
            Background
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Qualifications & experience</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c) => (
            <div key={c.label} className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-3 font-semibold text-slate-900">{c.label}</div>
              <div className="mt-1 text-xs text-slate-500 leading-relaxed">{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-slate-200 bg-white/80 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
              My approach
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">What I do in a session</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">Every session is focused, personalised and conducted in your preferred language.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_ITEMS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: 'rgb(var(--color-primary-soft))' }}>{item.icon}</div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">⚠️</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Before you book — please read this</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">I am a medication counsellor, not a prescribing doctor. I will never change your prescription, alter your dosage, or advise you to stop a medicine. All medical decisions remain with your doctor.</p>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="text-amber-600 shrink-0">→</span> For prescription counselling, please have your prescription ready to share on WhatsApp or upload during booking.</li>
                <li className="flex items-start gap-2"><span className="text-amber-600 shrink-0">→</span> This service is for education only — not for emergencies or diagnosis.</li>
                <li className="flex items-start gap-2"><span className="text-amber-600 shrink-0">→</span> Available for patients in India only.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white/80 px-4 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Ready to understand your medicines?</h2>
          <p className="mt-3 text-slate-500">Book a session today. Takes less than 2 minutes.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90" style={{ background: 'rgb(var(--color-primary))' }}>
              Book a session →
            </Link>
            <WhatsAppButton message={WA_MESSAGES.booking} />
          </div>
        </div>
      </section>

    </main>
  )
}