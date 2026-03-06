'use client'

import Link from 'next/link'
import { useState } from 'react'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'

type FAQItem = { q: string; a: string }
type FAQCategory = { title: string; icon: string; items: FAQItem[] }

const FAQ_DATA: FAQCategory[] = [
  {
    title: 'About the service',
    icon: '💊',
    items: [
      { q: 'What exactly is medication counselling?', a: 'Medication counselling is a focused session where I explain your medicines to you clearly — what each one does, how and when to take it, what side effects to watch for, and what foods or other medicines to avoid. It fills the gap that a 5-minute doctor consultation simply cannot.' },
      { q: 'Is this the same as seeing a doctor?', a: 'No. I am a clinical pharmacist, not a prescribing doctor. I will not diagnose conditions, change your prescription, or alter your dosage. All medical decisions remain with your doctor. This is purely education and counselling about medicines you have already been prescribed.' },
      { q: "Can you prescribe medicines or change my dosage?", a: "No — and this is important. Dr D's MedCare is an education-only service. I don't write prescriptions, change dosages, or stop or start medicines. If you need a dosage change, please contact your doctor." },
      { q: "Why doesn't my doctor or pharmacist already do this?", a: 'In western countries like the UK, US, Australia and Canada, dedicated medication counselling is a standard part of every pharmacy visit. In India, that system doesn\'t exist at scale yet — doctors are overworked, consultations average 5 minutes, and pharmacists are focused on dispensing. Dr D\'s MedCare exists to fill exactly that gap.' },
      { q: 'Is this service available outside India?', a: "Currently, Dr D's MedCare is available for patients in India only." },
    ],
  },
  {
    title: 'Before your session',
    icon: '📋',
    items: [
      { q: 'Do I need a prescription to book?', a: 'For prescription counselling sessions, yes — you will need to share your prescription. You can upload it during booking on the website, or send it via WhatsApp before your session. For medication adherence planning, a prescription is helpful but not always required.' },
      { q: 'What languages are sessions available in?', a: 'Sessions are available in Tamil, English, Telugu and Hindi. Please mention your preferred language when booking.' },
      { q: "Who is this service for?", a: "Dr D's MedCare is especially helpful for elderly patients managing multiple medicines, parents of young children on medications, patients with chronic conditions like diabetes or hypertension, caregivers managing medicines for a family member, and anyone who wants to understand their prescription better before starting a new medicine." },
      { q: 'Is this service for emergencies?', a: 'No. This is not an emergency service. If you or someone around you is experiencing a medical emergency, please call 112 or go to your nearest hospital immediately.' },
    ],
  },
  {
    title: 'Sessions & booking',
    icon: '📅',
    items: [
      { q: 'How does booking work?', a: 'Choose your service type and plan on the booking page, pick a preferred slot, and fill in your details. Once your booking is created, send payment proof on WhatsApp. I will confirm your slot after payment is verified — usually within a few hours.' },
      { q: 'How is the session conducted?', a: 'Sessions are conducted over a phone or video call, depending on your preference. You will receive the call details after your booking is confirmed.' },
      { q: 'What is the difference between the 15-minute and 30-minute sessions?', a: 'The 15-minute Quick Consult is ideal for a single focused question — understanding one medicine, checking one interaction, or a quick clarification. The 30-minute Full Session covers your entire prescription or a more detailed review of multiple medicines and interactions.' },
      { q: 'What is the monthly plan?', a: 'The monthly plan is designed for patients who need ongoing support — typically those on long-term or chronic medications. It includes regular check-ins to review adherence, discuss any new symptoms or concerns, and adjust the medication schedule if needed.' },
    ],
  },
  {
    title: 'Payment & privacy',
    icon: '🔒',
    items: [
      { q: 'How do I pay?', a: 'Payment is accepted via UPI or bank transfer. After creating your booking, you will receive payment details. Send your payment screenshot on WhatsApp along with your Booking ID, and I will confirm your session.' },
      { q: 'Is my prescription and health information kept private?', a: 'Yes. Any information you share — prescriptions, health history, personal details — is used only for your counselling session and is kept strictly confidential. It is never shared with third parties.' },
      { q: 'What if I need to reschedule?', a: 'If you need to reschedule, please message on WhatsApp as early as possible. I will do my best to accommodate a new slot.' },
    ],
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${isOpen ? 'shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
      style={isOpen ? { borderColor: 'rgb(var(--color-primary-mid))', background: 'rgb(var(--color-primary-soft) / 0.3)' } : {}}
    >
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left">
        <span className={`text-sm font-semibold leading-relaxed ${isOpen ? 'text-[rgb(var(--color-primary))]' : 'text-slate-800'}`}>{item.q}</span>
        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${isOpen ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-white' : 'border-slate-300 text-slate-400'}`}>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />}
          </svg>
        </div>
      </button>
      {isOpen && <div className="px-5 pb-5"><p className="text-sm leading-relaxed text-slate-600">{item.a}</p></div>}
    </div>
  )
}

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  function toggle(key: string) { setOpenKey((prev) => (prev === key ? null : key)) }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.06]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-16 right-64 h-8 w-8 rounded-full bg-amber-300 opacity-40" />
        <div className="absolute top-[60%] -left-20 h-72 w-72 rounded-full opacity-[0.04]" style={{ background: 'rgb(var(--color-primary))' }} />
      </div>

      <section className="relative mx-auto max-w-3xl px-4 py-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'rgb(var(--color-primary))' }} />
          Frequently asked questions
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Got questions? We've got answers.</h1>
        <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto leading-relaxed">Everything you need to know about Dr D's MedCare before booking your first session.</p>
      </section>

      <section className="relative mx-auto max-w-3xl px-4 pb-20 space-y-10">
        {FAQ_DATA.map((category, ci) => (
          <div key={category.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl border" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
                {category.icon}
              </div>
              <h2 className="text-lg font-bold text-slate-900">{category.title}</h2>
            </div>
            <div className="space-y-2">
              {category.items.map((item, ii) => {
                const key = `${ci}-${ii}`
                return <AccordionItem key={key} item={item} isOpen={openKey === key} onToggle={() => toggle(key)} />
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="rounded-2xl border bg-white/80 p-8 text-center shadow-sm" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-bold text-slate-900">Still have a question?</h3>
          <p className="mt-2 text-sm text-slate-500">Drop a message on WhatsApp and I'll get back to you.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <WhatsAppButton message={WA_MESSAGES.faq} variant="green" />
            <Link href="/book" className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              Book a session →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}