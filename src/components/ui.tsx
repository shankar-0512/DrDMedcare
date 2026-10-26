import Link from 'next/link'

/** Pink page hero shared by inner pages. Slides under the floating header. */
export function PageHero({
  eyebrow,
  title,
  sub,
  align = 'center',
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  sub?: string
  align?: 'center' | 'left'
  children?: React.ReactNode
}) {
  const center = align === 'center'
  return (
    <section className="relative -mt-[84px] overflow-hidden bg-hero pt-[84px]">
      <div className={`mx-auto max-w-[1280px] px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-20 ${center ? 'text-center' : ''}`}>
        <p className="chip rise rise-1"><span className="dot" />{eyebrow}</p>
        <h1 className={`display rise rise-2 mt-7 text-[clamp(2.4rem,5vw,4.4rem)] text-dark ${center ? 'mx-auto max-w-4xl' : 'max-w-3xl'}`}>{title}</h1>
        {sub && (
          <p className={`rise rise-3 mt-6 max-w-2xl text-[1.12rem] leading-[1.65] text-dark/80 ${center ? 'mx-auto' : ''}`}>{sub}</p>
        )}
        {children && <div className="rise rise-4 mt-9">{children}</div>}
      </div>
    </section>
  )
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.78rem] font-bold uppercase tracking-[0.16em] ${light ? 'text-brand' : 'text-dark-2'}`}>{children}</p>
  )
}

export function NumBadge({ n, className = '' }: { n: number | string; className?: string }) {
  return (
    <span className={`display grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-[1.15rem] text-dark ${className}`}>{n}</span>
  )
}

/** Rounded green closing card used at the bottom of inner pages. */
export function CtaCard({ title, body, secondary }: { title: React.ReactNode; body?: string; secondary?: React.ReactNode }) {
  return (
    <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5">
      <div className="mx-auto max-w-[1280px] rounded-[2.5rem] bg-panel px-6 py-16 text-center text-dark lg:py-24">
        <h2 className="display mx-auto max-w-3xl text-[clamp(2.1rem,4.6vw,4rem)] text-dark">{title}</h2>
        {body && <p className="mx-auto mt-5 max-w-md text-[1.05rem] text-dark/70">{body}</p>}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/book" className="btn btn-dark">
            Book a session <span className="arr" aria-hidden>→</span>
          </Link>
          {secondary}
        </div>
      </div>
    </section>
  )
}
