import Link from 'next/link'

const LINKS = [
  { label: 'Services', href: '/#how-i-can-help' },
  { label: 'About me', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Disclaimer', href: '/legal/disclaimer' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Clinical Reference ⚕️', href: '/clinical' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Links */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs text-slate-500 hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copyright + disclaimer */}
        <p className="text-xs text-slate-400 shrink-0">
          © {new Date().getFullYear()} Dr D's MedCare · Education only · India only
        </p>

      </div>
    </footer>
  )
}