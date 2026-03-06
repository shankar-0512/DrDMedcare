import Link from 'next/link'
import Image from 'next/image'

type BlogPostLayoutProps = {
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  children: React.ReactNode
}

const CATEGORY_COLORS: Record<string, string> = {
  'Our story': 'brand',
  'Education': 'bg-amber-50 text-amber-700 border-amber-200',
  'Awareness': 'bg-sky-50 text-sky-700 border-sky-200',
  'Devices & conditions': 'bg-violet-50 text-violet-700 border-violet-200',
}

export default function BlogPostLayout({ title, excerpt, category, readTime, date, children }: BlogPostLayoutProps) {
  const color = CATEGORY_COLORS[category] ?? 'bg-slate-50 text-slate-600 border-slate-200'
  const isBrand = color === 'brand'

  return (
    <main className="relative overflow-hidden">

      {/* Background geometry */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.06]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-16 right-64 h-8 w-8 rounded-full bg-amber-300 opacity-40" />
      </div>

      {/* ── Article header ── */}
      <header className="relative mx-auto max-w-3xl px-4 pt-14 pb-10">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[rgb(var(--color-primary))] transition-colors mb-6">
          ← Back to blog
        </Link>

        {isBrand ? (
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold text-[rgb(var(--color-primary))]"
            style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
          >
            {category}
          </span>
        ) : (
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${color}`}>
            {category}
          </span>
        )}

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-lg leading-relaxed text-slate-500">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
            <Image src="/priyanka.jpg" alt="Dr Priyanka" width={40} height={40} className="object-cover object-top" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Dr Priyanka Deventhiran</p>
            <p className="text-xs text-slate-400">Pharm D · Medication Counsellor · {date} · {readTime}</p>
          </div>
        </div>
      </header>

      {/* ── Article body ── */}
      <article className="relative mx-auto max-w-3xl px-4 pb-16">
        <div className="space-y-5 text-slate-600 text-base leading-relaxed [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-2 [&>p]:text-justify [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-[rgb(var(--color-primary))] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>hr]:border-slate-200 [&>hr]:my-6 [&_strong]:font-semibold [&_strong]:text-slate-800 [&_em]:italic [&_a]:text-[rgb(var(--color-primary))] [&_a]:underline [&_li]:leading-relaxed">
          {children}
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1">Disclaimer</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            This article is for educational purposes only. It does not constitute medical advice and should not replace a consultation with your doctor or pharmacist. Always consult a qualified healthcare professional before making any changes to your medicines.
          </p>
        </div>

        {/* ── CTA ── */}
        <div className="mt-8 rounded-2xl border bg-white/80 p-8 text-center shadow-sm" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
          <h3 className="text-lg font-bold text-slate-900">Have questions about your medicines?</h3>
          <p className="mt-2 text-sm text-slate-500">Book a personalised session with Dr Priyanka.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90"
              style={{ background: 'rgb(var(--color-primary))' }}
            >
              Book a session →
            </Link>
            <a
              href="https://wa.me/919080709332"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </article>
    </main>
  )
}