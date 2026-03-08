import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Blog | Dr D's MedCare",
  description: "Plain-language articles on medicines, drug interactions, medication adherence, and patient education for Indian patients.",
}
import Image from 'next/image'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  featured?: boolean
}

const POSTS: BlogPost[] = [
  {
    slug: 'clinical-pharmacist-vs-pharmacist',
    title: "Clinical pharmacist vs pharmacist — what's the difference and why does it matter?",
    excerpt: "Both work with medicines — but their roles, training, and what they can do for you are very different. Here's a clear breakdown.",
    category: 'Awareness',
    readTime: '5 min read',
    date: 'March 2025',
    featured: true,
  },
  {
    slug: 'healthcare-professionals-india',
    title: 'Who does what in Indian healthcare — a simple guide',
    excerpt: "Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse, physiotherapist, dietitian, lab technician and ASHA worker — each plays a distinct and important role. Here's a quick guide to who does what.",
    category: 'Awareness',
    readTime: '4 min read',
    date: 'March 2025',
  },
  {
    slug: 'why-i-started-drd-medcare',
    title: "Why I started Dr D's MedCare",
    excerpt: 'A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me.',
    category: 'Our story',
    readTime: '4 min read',
    date: 'March 2025',
  },
  {
    slug: 'drug-food-interactions-india',
    title: 'Common drug-food interactions every Indian patient should know',
    excerpt: 'Dal, milk, banana, tea — everyday foods that can silently reduce or amplify the effect of your medicines.',
    category: 'Education',
    readTime: '6 min read',
    date: 'March 2025',
  },
  {
    slug: 'why-you-must-finish-antibiotics',
    title: 'Why stopping antibiotics midway is dangerous',
    excerpt: "Feeling better doesn't mean the infection is gone. Here's what actually happens when you stop your course early.",
    category: 'Education',
    readTime: '5 min read',
    date: 'March 2025',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Our story':            'brand',
  'Education':            'bg-amber-50 text-amber-700 border-amber-200',
  'Awareness':            'bg-sky-50 text-sky-700 border-sky-200',
  'Devices & conditions': 'bg-violet-50 text-violet-700 border-violet-200',
}

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? 'bg-slate-50 text-slate-600 border-slate-200'
  if (color === 'brand') {
    return (
      <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold text-[rgb(var(--color-primary))]" style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}>
        {category}
      </span>
    )
  }
  return <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${color}`}>{category}</span>
}

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured)
  const rest = POSTS.filter((p) => !p.featured)

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

      <div className="relative mx-auto max-w-6xl px-4 pb-20">

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="rounded-2xl border-2 bg-white/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
              <div className="grid lg:grid-cols-[1fr_380px]">
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-full bg-[rgb(var(--color-primary))] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">Featured</span>
                    <CategoryBadge category={featured.category} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[rgb(var(--color-primary))] transition-colors lg:text-3xl leading-snug">{featured.title}</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-500">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full overflow-hidden border border-slate-200">
                        <Image src="/priyanka.jpg" alt="Dr Priyanka" width={28} height={28} className="object-cover object-top" />
                      </div>
                      <span className="text-xs font-medium text-slate-600">Dr Priyanka Deventhiran</span>
                    </div>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{featured.date}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400">{featured.readTime}</span>
                  </div>
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--color-primary))] group-hover:gap-2 transition-all">Read article →</span>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-sky-50/60 p-10">
                  <div className="text-center">
                    <div className="text-7xl">💊</div>
                    <p className="mt-4 text-sm font-medium text-sky-700">Awareness</p>
                    <p className="mt-1 text-xs text-slate-400 max-w-[200px] leading-relaxed">Understanding who does what with your medicines</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-5">Latest articles</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="h-full rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                    <CategoryBadge category={post.category} />
                    <h3 className="mt-3 text-base font-bold leading-snug text-slate-900 group-hover:text-[rgb(var(--color-primary))] transition-colors">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200">
                          <Image src="/priyanka.jpg" alt="Dr Priyanka" width={24} height={24} className="object-cover object-top" />
                        </div>
                        <span className="text-xs text-slate-400">{post.date} · {post.readTime}</span>
                      </div>
                      <span className="text-xs font-semibold text-[rgb(var(--color-primary))] opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/40 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="text-3xl mb-3">✍️</div>
                <p className="text-sm font-medium text-slate-500">More articles coming soon</p>
                <p className="mt-1 text-xs text-slate-400">New posts every month</p>
              </div>
            </div>
          </div>
        )}

        {/* Blog CTA */}
        <div className="mt-12 rounded-2xl border bg-white/80 p-8 shadow-sm text-center" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-bold text-slate-900">Have a topic you'd like covered?</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Send a message on WhatsApp and I'll add it to the list.</p>
          <div className="mt-5">
            <WhatsAppButton message={WA_MESSAGES.blog} variant="green" label="Suggest a topic" />
          </div>
        </div>

      </div>
    </main>
  )
}