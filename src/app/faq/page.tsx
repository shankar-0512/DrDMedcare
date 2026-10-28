'use client'

import { useState } from 'react'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'
import { PageHero, CtaCard } from '@/components/ui'
import { FAQ_DATA, type FAQItem } from './data'

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
