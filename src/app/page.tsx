import Link from 'next/link'
import Image from 'next/image'
import HomeServiceTabs from '@/components/HomeServiceTabs'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: "Dr D's MedCare",
  url: 'https://dr-d-medcare.vercel.app',
  logo: 'https://dr-d-medcare.vercel.app/logo.png',
  image: 'https://dr-d-medcare.vercel.app/ogimage.png',
  description: 'Personalised medication counselling sessions for patients in India. Prescription education, adherence planning, polypharmacy management, and more.',
  telephone: '+919080709332',
  areaServed: 'IN',
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
    worksFor: { '@name': "Dr D's MedCare" },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Medication Counselling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prescription Counselling', description: 'Understand your prescription in detail.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Adherence Planning', description: 'Build a medication routine that fits your life.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elderly Polypharmacy Review', description: 'Safe medication review for seniors on multiple drugs.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Disease Awareness Session', description: 'Understand your condition and how your medicines work.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Device & Inhaler Training', description: 'Learn to use inhalers, insulin pens, and other devices correctly.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Side Effects Counselling', description: 'Identify, manage, and report side effects safely.' } },
    ],
  },
};

const TRUST_BADGES = [
  { icon: '🎓', label: 'Pharm D Qualified' },
  { icon: '🇮🇳', label: 'India Only' },
  { icon: '💬', label: 'Personalised Sessions' },
]

const STATS = [
  { value: '500+', label: 'Patients Counselled' },
  { value: '3', label: 'Session Plans' },
  { value: '8+', label: 'Specialisations' },
]

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.07]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-16 right-64 h-8 w-8 rounded-full bg-amber-300 opacity-40" />
        <div className="absolute top-[55%] -left-20 h-72 w-72 rounded-full opacity-[0.05]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-[75%] -right-10 h-48 w-48 rounded-full opacity-[0.04]" style={{ background: 'rgb(var(--color-primary))' }} />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">

            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]"
                style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-primary))] animate-pulse" />
                Medication Education · India
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 lg:text-5xl">
                Understand your{' '}
                <span className="relative inline-block" style={{ color: 'rgb(var(--color-primary))' }}>
                  medicines
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" style={{ height: '6px' }}>
                    <path d="M0,6 Q50,0 100,5 Q150,10 200,4" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                {' '}before you take them
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
                I help patients and caregivers understand prescriptions, spot side effects,
                and know when to go back to their doctor — all in a single focused session.
              </p>

              <p className="mt-4 text-sm italic text-slate-400">
                "Patient counselling — the missing pill in Indian healthcare."
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                  style={{ background: 'rgb(var(--color-primary))' }}
                >
                  Book a session →
                </Link>
                <WhatsAppButton message={WA_MESSAGES.booking} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    <span>{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-8 border-t border-slate-100 pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>{s.value}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl" style={{ background: 'rgb(var(--color-primary))', opacity: 0.12 }} />
                <div className="absolute -top-4 -left-4 grid grid-cols-4 gap-1.5 opacity-40">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  ))}
                </div>
                <div className="relative z-10 h-[420px] w-[320px] overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                  <Image src="/priyanka.jpg" alt="Dr Priyanka Deventhiran" fill className="object-cover object-top" priority />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                    <p className="text-sm font-semibold text-slate-900">Dr Priyanka Deventhiran</p>
                    <p className="mt-0.5 text-xs text-slate-500">Pharm D · Medication Counsellor</p>
                    <div className="mt-2 flex items-center gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-slate-500">5.0 · Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="pointer-events-none">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none" style={{ height: '40px', display: 'block' }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="rgb(241 245 249)" />
          </svg>
        </div>
      </section>

      {/* Services */}
      <div id="how-i-can-help" className="relative scroll-mt-36">
        <HomeServiceTabs />
      </div>
    </main>
  )
}