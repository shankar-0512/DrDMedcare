import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { waLink, WA_MESSAGES } from '@/components/WhatsappButton'
import { createSupabaseServer } from '@/lib/supabase/server'

export const revalidate = 300

export const metadata: Metadata = {
  title: "Dr D's MedCare - Medication Counselling by a Clinical Pharmacist",
  description: "Confused about your prescription? Book a personalised medication counselling session with Dr Priyanka Deventhiran, Pharm D. Understand your medicines, interactions, and side effects. India only.",
  alternates: {
    canonical: '/',
    languages: { 'en-IN': '/' },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: "Dr D's MedCare",
  url: 'https://drdmedcare.com',
  logo: 'https://drdmedcare.com/logo.png',
  image: 'https://drdmedcare.com/ogimage.png',
  description: 'Personalised medication counselling sessions for patients in India. Prescription education, adherence planning, elderly care, and more.',
  telephone: '+919080709332',
  areaServed: 'IN',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  availableLanguage: ['English', 'Tamil', 'Telugu', 'Hindi'],
  priceRange: '₹₹',
  medicalSpecialty: 'Pharmacy',
  employee: {
    '@type': 'Person',
    name: 'Dr Priyanka Deventhiran',
    jobTitle: 'Clinical Pharmacist',
    honorificPrefix: 'Dr',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Pharm D',
    },
    knowsLanguage: ['English', 'Tamil', 'Telugu', 'Hindi'],
    worksFor: { '@type': 'Organization', name: "Dr D's MedCare" },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Medication Counselling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prescription Counselling', description: 'Understand your prescription in detail.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Adherence Planning', description: 'Build a medication routine that fits your life.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elderly Care', description: 'Safe medication review for seniors on multiple drugs.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disease Awareness Session', description: 'Understand your condition and how your medicines work.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Device & Inhaler Training', description: 'Learn to use inhalers, insulin pens, and other devices correctly.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Side Effects Counselling', description: 'Identify, manage, and report side effects safely.' } },
    ],
  },
};

type Service = { id: number; slug: string; title: string; short_desc: string; base_price_inr: number | null }

const FALLBACK_SERVICES: Service[] = [
  { id: 1, slug: 'prescription-counselling', title: 'Prescription counselling', short_desc: 'Understand what each medicine is for and how to take it safely.', base_price_inr: null },
  { id: 2, slug: 'adherence-planning', title: 'Medication adherence planning', short_desc: 'A simple timing plan to help you take medicines correctly and consistently.', base_price_inr: null },
  { id: 3, slug: 'elderly-polypharmacy', title: 'Elderly & polypharmacy care', short_desc: 'A careful review for seniors taking many medicines together.', base_price_inr: null },
  { id: 7, slug: 'disease-awareness', title: 'Disease awareness counselling', short_desc: 'What your diagnosis means, and how your medicines work to manage it.', base_price_inr: null },
  { id: 8, slug: 'device-usage', title: 'Medication device counselling', short_desc: 'Inhaler, insulin pen, BP monitor or glucometer, step by step.', base_price_inr: null },
  { id: 9, slug: 'side-effects', title: 'Side-effects counselling', short_desc: 'Recognise, manage and report side effects safely.', base_price_inr: null },
]

async function getServices(): Promise<Service[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('service_types')
      .select('id,slug,title,short_desc,base_price_inr')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    if (error || !data || data.length === 0) return FALLBACK_SERVICES
    return data as Service[]
  } catch {
    return FALLBACK_SERVICES
  }
}

const STEPS = [
  { n: '01', title: 'Share your prescription', body: 'Book a slot, then send your prescription on WhatsApp or upload it while booking. Nothing else to prepare.' },
  { n: '02', title: 'Talk it through', body: 'A focused 15 or 30 minute call, in Tamil, English, Telugu or Hindi. Ask everything, at your pace.' },
  { n: '03', title: 'Leave with clarity', body: 'You know what each medicine is for, how to take it, what to avoid, and when to go back to your doctor.' },
]

const MARQUEE = ['Prescription counselling', 'Side effects', 'Drug interactions', 'Medication routines', 'Inhaler & insulin pen training', 'Elderly care', 'Disease awareness']

function Capsule({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute overflow-hidden rounded-full ${className}`} style={style} aria-hidden>
      <div className="absolute inset-x-0 top-0 h-1/2 bg-panel" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-deep" />
    </div>
  )
}

export default async function HomePage() {
  const services = await getServices()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[84px] overflow-hidden bg-hero pt-[84px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-6 pb-20 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="chip rise rise-1"><span className="dot" />Clinical pharmacist &middot; Chennai</p>
            <h1 className="display rise rise-2 mt-7 text-[clamp(2.5rem,4.9vw,4.7rem)] text-dark">
              Understand your medicines <em className="!text-dark-2">before</em> you take them.
            </h1>
            <p className="rise rise-3 mt-8 max-w-[33rem] text-[1.14rem] leading-[1.65] text-dark/80">
              A private one-to-one session with Dr Priyanka Deventhiran to explain your prescription, spot side effects, and know when to go back to your doctor.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-4">
              <Link href="/book" className="btn btn-dark">
                Book a session <span className="arr" aria-hidden>→</span>
              </Link>
              <a href={waLink(WA_MESSAGES.booking)} target="_blank" rel="noreferrer" className="btn btn-ghost text-dark hover:text-paper">
                WhatsApp
              </a>
            </div>
            <p className="rise rise-4 mt-9 text-[0.85rem] font-semibold text-dark/70">
              Pharm D &nbsp;&middot;&nbsp; Tamil &nbsp;&middot;&nbsp; English &nbsp;&middot;&nbsp; Telugu &nbsp;&middot;&nbsp; Hindi
            </p>
          </div>

          {/* capsule composition */}
          <div className="rise rise-3 relative mx-auto h-[560px] w-full max-w-[520px] lg:h-[640px]">
            <Capsule className="right-[2%] top-[4%] h-[470px] w-[210px] rotate-[16deg] lg:h-[540px] lg:w-[240px]" />
            <Capsule className="bottom-[2%] left-[4%] h-[150px] w-[68px] -rotate-[28deg]" />
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[300px] -translate-x-[54%] -translate-y-1/2 overflow-hidden rounded-full border-[7px] border-brand bg-paper shadow-[0_30px_60px_-24px_rgb(var(--c-dark)/0.55)] lg:h-[580px] lg:w-[340px]">
              <Image
                src="/photos/hero-corridor.jpg"
                alt="Dr Priyanka Deventhiran, clinical pharmacist"
                fill
                priority
                sizes="340px"
                className="object-cover object-[50%_14%]"
              />
            </div>
            <p className="chip floaty absolute left-[-2%] top-[14%] shadow-lg" style={{ ['--r' as string]: '-4deg' }}>Before or after food?</p>
            <p className="chip floaty absolute right-[-2%] top-[46%] shadow-lg" style={{ ['--r' as string]: '3deg', animationDelay: '1.2s' }}>Safe with my other tablets?</p>
            <p className="chip floaty absolute bottom-[10%] left-[2%] shadow-lg" style={{ ['--r' as string]: '-2deg', animationDelay: '2.2s' }}>Is this side effect normal?</p>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="overflow-hidden bg-panel py-4 text-dark" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {MARQUEE.map((m) => (
                <span key={m + k} className="flex items-center whitespace-nowrap text-[1.05rem] font-semibold">
                  <span className="px-7">{m}</span>
                  <span className="h-2.5 w-5 rounded-full bg-brand-deep" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── The gap ───────── */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <div className="mx-auto grid aspect-square w-[min(300px,70vw)] place-items-center rounded-full bg-brand text-center text-dark">
              <div>
                <p className="display text-[7.5rem] leading-none">5</p>
                <p className="-mt-1 text-[0.82rem] font-bold uppercase tracking-[0.14em]">minutes<br />with your doctor</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark-2">The gap</p>
            <p className="display mt-6 text-[clamp(1.9rem,3.7vw,3.3rem)] text-dark">
              There is no time to explain every medicine, every interaction, every side effect. <em>That&rsquo;s the gap I work in.</em>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section className="bg-second-soft">
        <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark-2">How it works</p>
            <h2 className="display mt-6 max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] text-dark">
              One focused conversation. <em>Nothing rushed.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((st, i) => (
              <Reveal key={st.n} delay={i * 100}>
                <div className="h-full rounded-[2rem] bg-paper p-8 shadow-[0_1px_0_rgb(var(--c-dark)/0.06)]">
                  <span className="display grid h-14 w-14 place-items-center rounded-full bg-brand text-[1.5rem] text-dark">{st.n.replace('0', '')}</span>
                  <h3 className="display mt-7 text-[1.65rem] text-dark">{st.title}</h3>
                  <p className="mt-3 text-[1rem] leading-[1.65] text-subtle">{st.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section id="how-i-can-help" className="scroll-mt-24 bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark-2">What I offer</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,4.8vw,4.2rem)] text-dark">
              How I can <em>help.</em>
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.65] text-subtle">
              Every session is education and counselling. I never prescribe, diagnose, or change a dose.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={`/book?type=${encodeURIComponent(s.slug)}`}
                  className="group flex h-full items-start gap-5 rounded-[2rem] border-2 border-dark/10 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-dark hover:bg-hero sm:p-8"
                >
                  <span className="display grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-[1.15rem] text-dark transition-colors group-hover:bg-dark group-hover:text-brand">{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="display text-[1.5rem] leading-[1.1] text-dark">{s.title}</h3>
                    <p className="mt-2 text-[0.97rem] leading-[1.6] text-subtle group-hover:text-dark/80">{s.short_desc}</p>
                    <div className="mt-5 flex items-center justify-between">
                      {s.base_price_inr ? (
                        <span className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[0.82rem] font-bold text-dark group-hover:bg-paper">from &#8377;{s.base_price_inr}</span>
                      ) : <span />}
                      <span className="arr-c bg-dark text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Routine ───────── */}
      <section className="bg-panel text-dark">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-full border-[6px] border-brand">
              <Image
                src="/photos/pill-organiser.jpg"
                alt="Hands sorting daily tablets into a weekly pill organiser"
                fill
                sizes="(min-width:1024px) 640px, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark">Adherence</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,4.2vw,3.6rem)] text-dark">
              The medicine is rarely the problem. <em>The routine is.</em>
            </h2>
            <p className="mt-7 max-w-lg text-[1.05rem] leading-[1.7] text-dark/75">
              Doses get missed, timings get mixed up, and tablets get stopped the moment someone feels better. Together we build a simple routine around your day, so the treatment can actually work.
            </p>
            <Link href="/book?type=adherence-planning" className="btn btn-dark mt-9">
              Plan my routine <span className="arr" aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Meet Priyanka ───────── */}
      <section className="bg-hero">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4.4] w-full max-w-[360px] overflow-hidden rounded-full border-[7px] border-brand bg-paper">
              <Image
                src="/photos/counselling-counter.jpg"
                alt="Dr Priyanka explaining a medicine to a patient"
                fill
                sizes="360px"
                className="object-cover object-[62%_30%]"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark-2">Meet Priyanka</p>
            <h2 className="display mt-6 text-[clamp(2.1rem,4vw,3.5rem)] text-dark">
              After years in a hospital, I kept seeing patients leave with prescriptions <em className="!text-dark-2">they didn&rsquo;t fully understand.</em>
            </h2>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.7] text-dark/80">
              I&rsquo;m a clinical pharmacist from Chennai with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. Dr D&rsquo;s MedCare exists so that no one has to take a medicine they don&rsquo;t understand.
            </p>
            <Link href="/about" className="btn btn-dark mt-9">
              Read my story <span className="arr" aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Closing CTA ───────── */}
      <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5">
        <div className="mx-auto max-w-[1280px] rounded-[2.5rem] bg-panel px-6 py-20 text-center text-dark lg:py-28">
          <Reveal>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2.4rem,5.4vw,4.8rem)] text-dark">
              Ready to understand <em>your medicines?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[1.05rem] text-dark/70">Booking takes under two minutes.</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn btn-dark">
                Book a session <span className="arr" aria-hidden>→</span>
              </Link>
              <a href={waLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-ghost text-dark hover:!bg-dark hover:!text-paper">
                Ask a question first
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
