import type { Metadata } from 'next'
import BlogGrid from './_components/BlogGrid'

export const metadata: Metadata = {
  title: "Blog | Dr D's MedCare",
  description: "Plain-language articles on medicines, drug interactions, medication adherence, and patient education for Indian patients.",
  alternates: {
    canonical: '/blog',
    languages: { 'en-IN': '/blog' },
  },
}

export default function BlogPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-[0.06]" style={{ background: 'rgb(var(--color-primary))' }} />
        <div className="absolute top-16 right-64 h-8 w-8 rounded-full bg-amber-300 opacity-40" />
        <div className="absolute top-[60%] -left-20 h-72 w-72 rounded-full opacity-[0.04]" style={{ background: 'rgb(var(--color-primary))' }} />
      </div>

      <section className="relative mx-auto max-w-6xl px-4 py-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'rgb(var(--color-primary))' }} />
          The MedCare blog
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Medicines, explained simply</h1>
        <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto leading-relaxed">Practical, plain-language articles to help you understand your medicines, avoid common mistakes, and take charge of your health.</p>
      </section>

      <BlogGrid />
    </main>
  )
}
