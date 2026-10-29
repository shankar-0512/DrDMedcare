'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { waLink, WA_MESSAGES } from '@/components/WhatsappButton'

/** Phone-only sticky action bar. Appears once the hero has scrolled away. */
export default function MobileActionBar() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/book')) return null

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-40 border-t border-dark/10 bg-paper/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 md:hidden',
        show ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <Link href="/book" tabIndex={show ? 0 : -1} className="btn btn-dark flex-1 justify-center !py-3.5">
          Book a session <span className="arr" aria-hidden />
        </Link>
        <a
          href={waLink(WA_MESSAGES.general)}
          target="_blank"
          rel="noreferrer"
          tabIndex={show ? 0 : -1}
          aria-label="Chat on WhatsApp"
          className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-whatsapp text-white"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L.057 23.535a.75.75 0 0 0 .92.92l5.733-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.355l-.355-.211-3.664.936.972-3.573-.231-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
