import Link from 'next/link'
import { waLink, WA_MESSAGES } from '@/components/WhatsappButton'

const EXPLORE = [
  { label: 'Services', href: '/#how-i-can-help' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Journal', href: '/blog' },
  { label: 'Drug monographs', href: '/clinical' },
]

const LEGAL = [
  { label: 'Disclaimer', href: '/legal/disclaimer' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
]

export default function Footer() {
  return (
    <footer className="on-dark mt-0 bg-panel text-paper">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 lg:px-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <p className="display text-[2.3rem] text-paper sm:text-[2.9rem]">
              Understand your medicines. <em>Properly.</em>
            </p>
            <Link href="/book" className="btn btn-brand mt-9">
              Book a session <span className="arr">→</span>
            </Link>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand">Explore</h3>
            <ul className="mt-6 space-y-3 text-[0.97rem] text-paper/80">
              {EXPLORE.map((l) => (
                <li key={l.label}><Link href={l.href} className="transition-colors hover:text-brand">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand">Legal</h3>
            <ul className="mt-6 space-y-3 text-[0.97rem] text-paper/80">
              {LEGAL.map((l) => (
                <li key={l.label}><Link href={l.href} className="transition-colors hover:text-brand">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand">Contact</h3>
            <ul className="mt-6 space-y-3 text-[0.97rem] text-paper/80">
              <li><a href="tel:+919080709332" className="transition-colors hover:text-brand">+91 90807 09332</a></li>
              <li><a href={waLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">WhatsApp</a></li>
              <li><a href="mailto:drpriyankamedcare@gmail.com" className="break-all transition-colors hover:text-brand">drpriyankamedcare@gmail.com</a></li>
              <li><a href="https://instagram.com/drdmedcare" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand">Instagram &middot; @drdmedcare</a></li>
              <li className="pt-2 text-paper/50">Chennai, Tamil Nadu</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-7 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Dr D&rsquo;s MedCare</p>
          <p>Education only &middot; Not a substitute for medical advice &middot; India only</p>
        </div>
      </div>
    </footer>
  )
}
