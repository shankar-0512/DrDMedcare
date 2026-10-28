import Link from 'next/link'
import ReadingProgress from '@/components/ReadingProgress'

const DOCS = [
  { slug: 'disclaimer', title: 'Disclaimer', blurb: 'What this service is, and what it is not.' },
  { slug: 'privacy',    title: 'Privacy Policy', blurb: 'How your information is collected, used and protected.' },
  { slug: 'terms',      title: 'Terms of Service', blurb: 'Booking, payment, cancellations and responsibilities.' },
]

export default function LegalLayout({ current, updated, children }: { current: string; updated: string; children: React.ReactNode }) {
  const i = Math.max(0, DOCS.findIndex((d) => d.slug === current))
  const doc = DOCS[i]
  const next = DOCS[(i + 1) % DOCS.length]

  return (
    <main>
      <header className="relative -mt-[84px] bg-hero pt-[84px]">
        <div className="mx-auto max-w-[1280px] px-6 pb-14 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
          <p className="chip rise rise-1"><span className="dot" />Legal</p>
          <h1 className="display rise rise-2 mt-7 text-[clamp(2.4rem,5vw,4.4rem)] text-dark">{doc.title}</h1>
          <p className="rise rise-3 mt-5 text-[0.95rem] font-semibold text-dark/70">Last updated: {updated}</p>
        </div>
      </header>

      <div className="bg-paper">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-10 lg:pt-20">
          <article id="legal-body" className="min-w-0">
            <div className="max-w-[48rem] space-y-10 text-[1.02rem] leading-[1.8] text-slate-600 [&_h2]:mb-3 [&_h2]:text-[1.5rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-dark [&_strong]:font-bold [&_strong]:text-dark [&_a]:font-semibold [&_a]:text-dark [&_a]:underline [&_li]:leading-relaxed">
              {children}
            </div>

            <section aria-label="Next document" className="mt-16">
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark">Read next</p>
              <Link href={`/legal/${next.slug}`} className="group mt-5 flex items-center justify-between gap-6 rounded-[2.5rem] border-2 border-dark/10 bg-paper p-7 transition-all duration-300 hover:border-dark hover:bg-hero lg:p-9">
                <div>
                  <h3 className="display text-[1.5rem] leading-[1.15] text-dark lg:text-[1.9rem]">{next.title}</h3>
                  <p className="mt-2 text-[0.97rem] leading-[1.6] text-subtle">{next.blurb}</p>
                </div>
                <span className="arr-c shrink-0 bg-teal text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </section>
          </article>

          <aside>
            <div className="space-y-5 lg:sticky lg:top-28">
              <ReadingProgress targetId="legal-body" />
              <nav aria-label="Legal documents" className="rounded-[2rem] border-2 border-dark/10 bg-paper p-3">
                <p className="px-4 pb-1 pt-3 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-dark">Legal documents</p>
                {DOCS.map((d, n) => (
                  <Link
                    key={d.slug}
                    href={`/legal/${d.slug}`}
                    aria-current={d.slug === current ? 'page' : undefined}
                    className={['flex items-center gap-3 rounded-full px-4 py-3 text-[0.95rem] font-semibold transition-colors', d.slug === current ? 'bg-brand text-dark' : 'text-dark/75 hover:bg-hero hover:text-dark'].join(' ')}
                  >
                    <span className="display grid h-7 w-7 place-items-center rounded-full bg-teal text-[0.8rem] text-brand">{n + 1}</span>
                    {d.title}
                  </Link>
                ))}
              </nav>

              <div className="on-dark rounded-[2rem] bg-panel p-6 text-paper">
                <h3 className="display text-[1.4rem] leading-tight text-paper">Questions about <em>your medicines?</em></h3>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-paper/70">A private one-to-one session, in your language.</p>
                <Link href="/book" className="btn btn-brand mt-5 !px-5 !py-3 !text-[0.9rem]">Book a session <span className="arr" aria-hidden /></Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
