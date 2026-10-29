import Link from 'next/link'
import Image from 'next/image'
import ReadingProgress from '@/components/ReadingProgress'
import NextArticle, { CurrentCover } from '@/components/NextArticle'

type BlogPostLayoutProps = {
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  children: React.ReactNode
}

const CATEGORY_STYLES: Record<string, string> = {
  'Our story':            'bg-teal text-brand',
  'Education':            'bg-paper text-dark',
  'Awareness':            'bg-brand-soft text-dark',
  'Devices & conditions': 'bg-brand-deep text-dark',
}

export default function BlogPostLayout({ title, excerpt, category, readTime, date, children }: BlogPostLayoutProps) {
  const badge = CATEGORY_STYLES[category] ?? 'bg-paper text-dark'

  return (
    <main>
      {/* ── Article header ── */}
      <header className="relative -mt-[84px] bg-hero pt-[84px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 pb-14 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-20">
          <div>
            <Link href="/blog" className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-[0.85rem] font-bold text-dark/80 transition-colors hover:text-dark">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-paper text-dark" aria-hidden>←</span> All articles
            </Link>
            <div>
              <span className={`inline-block rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wide ${badge}`}>{category}</span>
            </div>
            <h1 className="display mt-5 text-[clamp(2rem,4.2vw,3.7rem)] leading-[1.06] text-dark">{title}</h1>
            <p className="mt-5 max-w-2xl text-[1.15rem] leading-[1.6] text-dark/80">{excerpt}</p>

            <div className="mt-8 flex items-center gap-3.5 border-t-2 border-dark/15 pt-6">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] border-brand">
                <Image src="/photos/hero-corridor.jpg" alt="Dr Priyanka" width={48} height={48} className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <p className="text-[0.95rem] font-bold text-dark">Dr Priyanka Deventhiran</p>
                <p className="text-[0.82rem] text-dark/70">Pharm D &middot; Clinical pharmacist &middot; {date} &middot; {readTime}</p>
              </div>
            </div>
          </div>
          <CurrentCover className="aspect-[1200/630] rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(var(--c-dark)/0.45)]" />
        </div>
      </header>

      {/* ── Article body ── */}
      <div className="bg-paper">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-10 lg:pt-20">
          <article id="article-body" className="min-w-0">
            <div className="space-y-5 text-[1.07rem] leading-[1.8] text-slate-600 [&>p]:max-w-[48rem] [&>ul]:max-w-[48rem] [&>ol]:max-w-[48rem] [&>blockquote]:max-w-[48rem] [&>h2]:max-w-[48rem] [&>h2]:font-bold [&>h2]:tracking-[-0.03em] [&>h2]:mt-12 [&>h2]:mb-3 [&>h2]:text-[1.75rem] [&>h2]:leading-tight [&>h2]:text-dark [&>p]:text-left [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:rounded-[1.5rem] [&>blockquote]:bg-hero [&>blockquote]:p-6 [&>blockquote]:font-semibold [&>blockquote]:text-dark [&>hr]:my-10 [&>hr]:border-dark/15 [&_strong]:font-bold [&_strong]:text-dark [&_em]:italic [&_a]:font-semibold [&_a]:text-dark [&_a]:underline [&_li]:leading-relaxed">
              {children}
            </div>

            {/* ── Disclaimer ── */}
            <div className="mt-14 max-w-[48rem] rounded-[2rem] border-2 border-dark/15 bg-brand-soft p-6 lg:p-7">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-dark">Disclaimer</p>
              <p className="mt-2 text-[0.92rem] leading-[1.7] text-subtle">
                This article is for educational purposes only. It does not constitute medical advice and should not replace a consultation with your doctor. Always consult a qualified healthcare professional before making any changes to your medicines.
              </p>
            </div>

            <NextArticle />
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:pt-2">
            <div className="grid gap-5 md:grid-cols-2 lg:sticky lg:top-28 lg:block lg:space-y-5">
              <ReadingProgress targetId="article-body" />
              <div className="rounded-[2rem] border-2 border-dark/10 bg-paper p-6">
                <div className="flex items-center gap-3.5">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-[3px] border-brand">
                    <Image src="/photos/hero-corridor.jpg" alt="Dr Priyanka" width={56} height={56} className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-[0.98rem] font-bold text-dark">Dr Priyanka Deventhiran</p>
                    <p className="text-[0.8rem] text-subtle">Pharm D &middot; Clinical pharmacist</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.92rem] leading-[1.6] text-subtle">Plain-language medicine education for patients and families across India.</p>
                <p className="mt-4 text-[0.8rem] font-semibold text-dark/70">{date} &middot; {readTime}</p>
              </div>

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
