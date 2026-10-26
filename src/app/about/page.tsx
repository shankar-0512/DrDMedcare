import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "About Dr Priyanka Deventhiran | Dr D's MedCare",
  description: "Clinical pharmacist with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. Helping patients in India understand their medicines through personalised counselling sessions.",
  alternates: {
    canonical: '/about',
    languages: { 'en-IN': '/about' },
  },
}
import Image from 'next/image'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'
import Reveal from '@/components/Reveal'
import { Eyebrow, NumBadge, CtaCard } from '@/components/ui'

const CREDENTIALS = [
  { label: 'Pharm D', sub: 'Tamil Nadu Dr. M.G.R. Medical University' },
  { label: 'Clinical Pharmacist', sub: 'Private Hospital, India' },
  { label: 'Based in Chennai', sub: 'Tamil Nadu, India' },
  { label: 'Tamil, English, Telugu, Hindi', sub: 'Session languages' },
]

const APPROACH_ITEMS = [
  { title: 'Prescription clarity', desc: 'I go through your prescription line by line - what each medicine is for, how and when to take it, and what to watch out for.' },
  { title: 'Interaction awareness', desc: 'Drug-drug and drug-food interactions are common and dangerous. I flag these clearly so you know exactly what to avoid.' },
  { title: 'Medication adherence', desc: 'For chronic patients, I build a structured schedule and follow up to make sure medicines are being taken correctly and consistently.' },
  { title: 'Special populations', desc: 'Extra care for elderly, paediatric and chronic patients - those who need the most guidance and are often underserved.' },
]

const STATS = [
  { value: '500+', label: 'Patients counselled' },
  { value: '4', label: 'Languages' },
  { value: '3+', label: 'Years of experience' },
  { value: '8+', label: 'Specialisations' },
]

const PROBLEM_STATS = [
  { stat: '50%', text: 'of Indian patients do not take medicines as prescribed' },
  { stat: '1 in 3', text: 'hospital readmissions are linked to medication errors' },
  { stat: '5 mins', text: 'average doctor consultation time in India' },
  { stat: '0', text: 'legal definition of "OTC" exists in India - potent drugs are sold freely without guidance' },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative -mt-[84px] overflow-hidden bg-hero pt-[84px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="chip rise rise-1"><span className="dot" />About me</p>
            <h1 className="display rise rise-2 mt-7 text-[clamp(2.8rem,6vw,5.4rem)] text-dark">
              Hi, I&rsquo;m <em>Priyanka.</em>
            </h1>
            <p className="rise rise-3 mt-7 max-w-xl text-[1.15rem] leading-[1.7] text-dark/85">
              I&rsquo;m a clinical pharmacist from Chennai with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. After years working in a private hospital, I saw the same problem repeat itself every single day - patients leaving with prescriptions they didn&rsquo;t fully understand.
            </p>
            <p className="rise rise-3 mt-5 max-w-xl text-[1.02rem] leading-[1.7] text-dark/75">
              The moment that crystallised everything for me was reading about a mother who gave her child cough syrup with milk. The child died from a drug interaction that nobody had warned her about. That shouldn&rsquo;t happen. It doesn&rsquo;t have to happen. That&rsquo;s why Dr D&rsquo;s MedCare exists.
            </p>
            <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-4">
              <Link href="/book" className="btn btn-dark">Book a session <span className="arr" aria-hidden>→</span></Link>
              <WhatsAppButton message={WA_MESSAGES.general} />
            </div>
          </div>
          <div className="rise rise-3 relative mx-auto w-full max-w-[400px]">
            <div className="absolute -right-5 top-6 h-[78%] w-[60%] rotate-[10deg] rounded-full bg-panel" aria-hidden />
            <div className="relative aspect-[3/4.3] overflow-hidden rounded-full border-[7px] border-brand bg-paper shadow-[0_30px_60px_-24px_rgb(var(--c-dark)/0.55)]">
              <Image src="/photos/counselling-counter.jpg" alt="Dr Priyanka Deventhiran" fill priority sizes="400px" className="object-cover object-[62%_30%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-panel text-dark">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-10">
          {STATS.map((st) => (
            <div key={st.label} className="text-center">
              <p className="display text-[3rem] text-dark">{st.value}</p>
              <p className="mt-1 text-[0.85rem] font-semibold text-dark/75">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The problem */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)] text-dark">
              Medication counselling is the <em>missing pill</em> in Indian healthcare
            </h2>
            <div className="mt-8 space-y-4 text-[1.05rem] leading-[1.75] text-subtle">
              <p>Doctors in India are overworked. A consultation lasts 5 minutes on average. There&rsquo;s no time to explain every medicine, every interaction, every side effect. Patients go home with a prescription and a prayer.</p>
              <p>Elders skip doses. Parents misread instructions. Chronic patients stop their medicines the moment they feel better. These aren&rsquo;t careless mistakes - they&rsquo;re the result of a system that never took the time to explain.</p>
              <p>In the UK, US, Australia and Canada, every pharmacy has a dedicated pharmacist whose job is to counsel patients on their medicines - it&rsquo;s built into the system as a standard of care. In India, that role simply doesn&rsquo;t exist at scale yet.</p>
              <p>To make things more complicated, India has no legal definition of &ldquo;OTC&rdquo; - meaning antibiotics and other potent drugs are routinely sold without a prescription, often without any guidance on how to use them safely.</p>
              <p className="font-semibold text-dark">I fill that gap. One focused session where your medicines are explained clearly, in your language, at your pace.</p>
            </div>
          </Reveal>
          <div className="space-y-4 lg:pt-14">
            {PROBLEM_STATS.map((it, i) => (
              <Reveal key={it.stat} delay={i * 90}>
                <div className="flex items-center gap-5 rounded-[2rem] bg-hero p-6">
                  <p className="display min-w-[5.5rem] text-[2.2rem] text-dark">{it.stat}</p>
                  <p className="text-[0.95rem] leading-snug text-dark/85">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-second-soft">
        <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-28">
          <Reveal className="max-w-2xl">
            <Eyebrow>Background</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] text-dark">Qualifications &amp; experience</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <div className="h-full rounded-[2rem] bg-paper p-7">
                  <NumBadge n={i + 1} />
                  <h3 className="display mt-6 text-[1.3rem] leading-tight text-dark">{c.label}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-subtle">{c.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <Eyebrow>My approach</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] text-dark">What I do in a <em>session</em></h2>
            <p className="mt-5 text-[1.05rem] leading-[1.65] text-subtle">Every session is focused, personalised and conducted in your preferred language.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {APPROACH_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex h-full items-start gap-5 rounded-[2rem] border-2 border-dark/10 p-7 transition-colors hover:border-dark hover:bg-hero">
                  <NumBadge n={i + 1} />
                  <div>
                    <h3 className="display text-[1.4rem] text-dark">{item.title}</h3>
                    <p className="mt-2 text-[0.97rem] leading-[1.65] text-subtle">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="bg-paper px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1280px] rounded-[2.5rem] border-2 border-dark bg-brand-soft p-8 lg:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="display grid h-14 w-14 shrink-0 place-items-center rounded-full bg-dark text-[1.6rem] text-brand">!</span>
            <div>
              <h3 className="display text-[1.7rem] text-dark">Before you book - please read this</h3>
              <p className="mt-3 max-w-3xl text-[1rem] leading-[1.7] text-subtle">I am a medication counsellor, not a prescribing doctor. I will never change your prescription, alter your dosage, or advise you to stop a medicine. All medical decisions remain with your doctor.</p>
              <ul className="mt-5 space-y-2.5 text-[0.97rem] text-subtle">
                {[
                  'For prescription counselling, please have your prescription ready to share on WhatsApp or upload during booking.',
                  'This service is for education only - not for emergencies or diagnosis.',
                  'Available for patients in India only.',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-5 shrink-0 rounded-full bg-brand-deep" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaCard title={<>Ready to understand <em>your medicines?</em></>} body="Book a session today. Takes less than 2 minutes." secondary={<WhatsAppButton message={WA_MESSAGES.booking} className="!text-paper hover:!bg-paper hover:!text-dark" />} />
    </main>
  )
}
