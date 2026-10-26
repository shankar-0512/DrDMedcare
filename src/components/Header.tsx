'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Services', href: '/#how-i-can-help', anchor: 'how-i-can-help' },
  { label: 'About',    href: '/about' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'Journal',  href: '/blog' },
]

function Mark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <g transform="rotate(-40 17 17)">
        <rect x="2" y="9.5" width="30" height="15" rx="7.5" style={{ fill: 'rgb(var(--c-teal))' }} />
        <path d="M17 9.5h8a7.5 7.5 0 0 1 0 15h-8z" style={{ fill: 'rgb(var(--c-brand-deep))' }} />
        <rect x="2" y="9.5" width="30" height="15" rx="7.5" fill="none" style={{ stroke: 'rgb(var(--c-teal))' }} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(e: React.MouseEvent, link: typeof NAV_LINKS[number]) {
    setMenuOpen(false)
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
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={[
          'mx-auto flex h-[64px] max-w-[1280px] items-center justify-between rounded-full px-4 pl-5 shadow-[0_10px_30px_-12px_rgb(var(--c-dark)/0.35)] transition-all duration-300 sm:px-3 sm:pl-6',
          scrolled || menuOpen
            ? 'bg-paper/90 backdrop-blur-md'
            : 'bg-paper/70 backdrop-blur-sm',
        ].join(' ')}
      >
        <Link
          href="/"
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap"
          aria-label="Dr D's MedCare, home"
        >
          <Mark />
          <span className="display text-[1.35rem] text-dark">Dr D&rsquo;s MedCare</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={[
                  'rounded-full px-4 py-2 text-[0.93rem] font-semibold transition-colors',
                  active ? 'bg-brand text-dark' : 'text-dark/75 hover:bg-brand/60 hover:text-dark',
                ].join(' ')}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link href="/book" className="btn btn-dark !px-5 !py-2.5 !text-[0.88rem]">
              Book a session <span className="arr">→</span>
            </Link>
          </span>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-dark md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                : <path strokeLinecap="round" d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[84px] z-40 overflow-y-auto bg-hero px-6 pb-10 pt-8 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="display rounded-full bg-paper/60 px-6 py-4 text-[1.9rem] text-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/book" onClick={() => setMenuOpen(false)} className="btn btn-dark mt-8 w-full justify-center">
            Book a session <span className="arr">→</span>
          </Link>
          <p className="mt-6 text-center text-xs text-dark/70">Education only · India only · Not for emergencies</p>
        </div>
      )}
    </header>
  )
}
