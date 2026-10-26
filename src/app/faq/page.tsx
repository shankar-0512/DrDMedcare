'use client'

import { useState } from 'react'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'
import { PageHero, CtaCard } from '@/components/ui'

type FAQItem = { q: string; a: string }
type FAQCategory = { title: string; items: FAQItem[] }

const FAQ_DATA: FAQCategory[] = [
  {
    title: 'About the service',
    items: [
      { q: 'What exactly is medication counselling?', a: 'Medication counselling is a focused session where I explain your medicines to you clearly - what each one does, how and when to take it, what side effects to watch for, and what foods or other medicines to avoid. It fills the gap that a 5-minute doctor consultation simply cannot.' },
      { q: 'Is this the same as seeing a doctor?', a: 'No. I am a clinical pharmacist, not a prescribing doctor. I will not diagnose conditions, change your prescription, or alter your dosage. All medical decisions remain with your doctor. This is purely education and counselling about medicines you have already been prescribed.' },
      { q: "Can you prescribe medicines or change my dosage?", a: "No - and this is important. Dr D's MedCare is an education-only service. I don't write prescriptions, change dosages, or stop or start medicines. If you need a dosage change, please contact your doctor." },
      { q: "Why doesn't my doctor or pharmacist already do this?", a: 'In western countries like the UK, US, Australia and Canada, dedicated medication counselling is a standard part of every pharmacy visit. In India, that system doesn\'t exist at scale yet - doctors are overworked, consultations average 5 minutes, and pharmacists are focused on dispensing. Dr D\'s MedCare exists to fill exactly that gap.' },
      { q: 'Is this service available outside India?', a: "Currently, Dr D's MedCare is available for patients in India only." },
    ],
  },
  {
    title: 'Before your session',
    items: [
      { q: 'Do I need a prescription to book?', a: 'For prescription counselling sessions, yes - you will need to share your prescription via WhatsApp before your session. For medication adherence planning, a prescription is helpful but not always required.' },
      { q: 'What languages are sessions available in?', a: 'Sessions are available in Tamil, English, Telugu and Hindi. Please mention your preferred language when booking.' },
      { q: "Who is this service for?", a: "Dr D's MedCare is especially helpful for elderly patients managing multiple medicines, parents of young children on medications, patients with chronic conditions like diabetes or hypertension, caregivers managing medicines for a family member, and anyone who wants to understand their prescription better before starting a new medicine." },
      { q: 'Is this service for emergencies?', a: 'No. This is not an emergency service. If you or someone around you is experiencing a medical emergency, please call 112 or go to your nearest hospital immediately.' },
    ],
  },
  {
    title: 'Sessions & booking',
    items: [
      { q: 'How does booking work?', a: 'Choose your service type and plan on the booking page, pick a preferred slot, and fill in your details. Once your booking is created, send payment proof on WhatsApp. I will confirm your slot after payment is verified - usually within a few hours.' },
      { q: 'How is the session conducted?', a: 'Sessions are conducted over a phone or video call, depending on your preference. You will receive the call details after your booking is confirmed.' },
      { q: 'What is the difference between the 15-minute and 30-minute sessions?', a: 'The 15-minute Quick Consult is ideal for a single focused question - understanding one medicine, checking one interaction, or a quick clarification. The 30-minute Full Session covers your entire prescription or a more detailed review of multiple medicines and interactions.' },
      { q: 'What is the monthly plan?', a: 'The monthly plan is designed for patients who need ongoing support - typically those on long-term or chronic medications. It includes regular check-ins to review adherence, discuss any new symptoms or concerns, and adjust the medication schedule if needed.' },
    ],
  },
  {
    title: 'Payment & privacy',
    items: [
      { q: 'How do I pay?', a: 'Payment is accepted via UPI or bank transfer. After creating your booking, you will receive payment details. Send your payment screenshot on WhatsApp along with your Booking ID, and I will confirm your session.' },
      { q: 'Is my prescription and health information kept private?', a: 'Yes. Any information you share - prescriptions, health history, personal details - is used only for your counselling session and is kept strictly confidential. It is never shared with third parties.' },
      { q: 'What if I need to reschedule?', a: 'If you need to reschedule, please message on WhatsApp as early as possible. I will do my best to accommodate a new slot.' },
    ],
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-[1.75rem] border-2 transition-colors duration-200 ${isOpen ? 'border-dark bg-brand-soft' : 'border-dark/10 bg-paper hover:border-dark/40'}`}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
        <span className="display text-[1.1rem] leading-snug text-dark">{item.q}</span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-200 ${isOpen ? 'rotate-45 bg-teal text-brand' : 'bg-brand text-dark'}`}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      {isOpen && <div className="px-6 pb-6"><p className="max-w-2xl text-[1rem] leading-[1.7] text-dark/85">{item.a}</p></div>}
    </div>
  )
}

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>('0-0')
  function toggle(key: string) { setOpenKey((prev) => (prev === key ? null : key)) }

  return (
    <main>
      <PageHero
        eyebrow="Frequently asked questions"
        title={<>Got questions? <em>Good.</em></>}
        sub="Everything you need to know about Dr D's MedCare before booking your first session."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <nav className="hidden lg:block" aria-label="FAQ sections">
              <ul className="sticky top-28 space-y-2">
                {FAQ_DATA.map((c, i) => (
                  <li key={c.title}>
                    <a href={`#faq-${i}`} className="flex items-center gap-3 rounded-full px-4 py-3 text-[0.97rem] font-semibold text-dark/80 transition-colors hover:bg-brand hover:text-dark">
                      <span className="display grid h-8 w-8 place-items-center rounded-full bg-brand text-[0.9rem] text-dark">{i + 1}</span>
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16">
              {FAQ_DATA.map((category, ci) => (
                <div key={category.title} id={`faq-${ci}`} className="scroll-mt-28">
                  <h2 className="display flex items-center gap-4 text-[1.9rem] text-dark">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-[1.1rem] text-brand">{ci + 1}</span>
                    {category.title}
                  </h2>
                  <div className="mt-6 space-y-3">
                    {category.items.map((item, ii) => {
                      const key = `${ci}-${ii}`
                      return <AccordionItem key={key} item={item} isOpen={openKey === key} onToggle={() => toggle(key)} />
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaCard
        title={<>Still have a <em>question?</em></>}
        body="Drop a message on WhatsApp and I'll get back to you."
        secondary={<WhatsAppButton message={WA_MESSAGES.faq} variant="green" />}
      />
    </main>
  )
}
