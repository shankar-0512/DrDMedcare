'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Services', href: '/#how-i-can-help', anchor: 'how-i-can-help' },
  { label: 'About me', href: '/about' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'Blog',     href: '/blog' },
]

const SOCIAL_LINKS = [
  {
    label: 'Phone',
    href: 'tel:+919080709332',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/919080709332?text=${encodeURIComponent("Hi Dr Priyanka! I'd like to know more about your medication counselling services.")}`,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L.057 23.535a.75.75 0 0 0 .92.92l5.733-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.355l-.355-.211-3.664.936.972-3.573-.231-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:drpriyankamedcare@gmail.com',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/drdmedcare',
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function handleNavClick(e: React.MouseEvent, link: typeof NAV_LINKS[number]) {
    if (!link.anchor) return
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById(link.anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function isActive(href: string) {
    if (href.includes('#')) return false
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">

      {/* Top bar */}
      <div className="px-4 py-1.5" style={{ background: 'rgb(var(--color-primary))' }}>
        <div className="mx-auto max-w-6xl flex items-center justify-center text-xs text-white/85 font-medium tracking-wide">
          <span className="uppercase">Education only · No diagnosis or prescribing</span>
        </div>
      </div>

      {/* Middle row */}
      <div className="relative bg-white border-b border-slate-100 px-4 py-0 overflow-hidden">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-6 right-32 h-20 w-20 rounded-full opacity-[0.06]" style={{ background: 'rgb(var(--color-primary))' }} />
          <div className="absolute top-2 right-16 h-10 w-10 rounded-full opacity-[0.05]" style={{ background: 'rgb(var(--color-primary))' }} />
          <div className="absolute -bottom-4 right-48 h-14 w-14 rounded-full opacity-[0.04]" style={{ background: 'rgb(var(--color-primary))' }} />
          <div className="absolute top-1 right-8 h-3 w-3 rounded-full bg-amber-300 opacity-30" />
          <div className="absolute bottom-1 right-64 h-2 w-2 rounded-full bg-amber-300 opacity-25" />
        </div>

        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image
                src="/logo.png"
                alt="Dr D's MedCare"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-slate-800 tracking-tight">
                  Dr Priyanka Deventhiran
                </span>
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold text-[rgb(var(--color-primary))]"
                  style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
                >
                  India only
                </span>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
                  Education only
                </span>
              </div>
              <span className="text-xs text-[rgb(var(--color-muted))]">
                Medication Counsellor · Highly qualified expert in medicine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="hidden sm:block h-5 w-px bg-slate-200" />

            <Link
              href="/book"
              className="rounded-md px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: 'rgb(var(--color-primary))' }}
            >
              Book a session
            </Link>

            <button
              className="md:hidden rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav bar */}
      <div className="hidden md:block bg-slate-50 border-b border-slate-200 px-4">
        <div className="mx-auto max-w-6xl flex items-center justify-center">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={[
                  'relative px-4 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'text-[rgb(var(--color-primary))]'
                    : 'text-slate-700 hover:text-[rgb(var(--color-primary))] hover:bg-white rounded-sm',
                ].join(' ')}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'rgb(var(--color-primary))' }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => { handleNavClick(e, link); setMenuOpen(false) }}
                className={[
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  active
                    ? 'text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary-soft))]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[rgb(var(--color-primary))]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="flex items-center gap-3 px-3 pt-2 border-t border-slate-100 mt-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}

    </header>
  )
}