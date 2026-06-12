'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    slug: 'myasthenia-gravis-india',
    title: 'Myasthenia Gravis: Understanding the Disease, the Treatment, and the Medicines to Avoid',
    excerpt: "MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis. Here is what every patient and carer needs to know.",
    category: 'Education',
    readTime: '7 min read',
    date: 'June 2026',
    featured: true,
  },
  {
    slug: 'how-to-use-blood-pressure-monitors-at-home-a-guide-for-beginners',
    title: 'How to Use Blood Pressure Monitors at Home: A Guide for Beginners',
    excerpt: 'Monitoring your blood pressure at home is a simple yet powerful way to take control of your heart health. With the right device and technique, you can track readings regularly and share them with your doctor for better management.',
    category: 'Education',
    readTime: '4 min read',
    date: 'April 2026',
  },
  {
    slug: 'meningitis-symptoms-india',
    title: 'Meningitis: warning signs every Indian family must know',
    excerpt: "Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India.",
    category: 'Education',
    readTime: '6 min read',
    date: 'March 2026',
  },
  {
    slug: 'drug-food-interactions-india',
    title: 'Common drug-food interactions every Indian patient should know',
    excerpt: 'Dal, milk, banana, tea - everyday foods that can silently reduce or amplify the effect of your medicines.',
    category: 'Education',
    readTime: '6 min read',
    date: 'March 2026',
  },
  {
    slug: 'why-you-must-finish-antibiotics',
    title: 'Why stopping antibiotics midway is dangerous',
    excerpt: "Feeling better doesn't mean the infection is gone. Here's what actually happens when you stop your course early.",
    category: 'Education',
    readTime: '5 min read',
    date: 'March 2026',
  },
  {
    slug: 'clinical-pharmacist-vs-pharmacist',
    title: "Clinical pharmacist vs pharmacist - what's the difference and why does it matter?",
    excerpt: "Both work with medicines - but their roles, training, and what they can do for you are very different. Here's a clear breakdown.",
    category: 'Awareness',
    readTime: '5 min read',
    date: 'March 2026',
  },
  {
    slug: 'healthcare-professionals-india',
    title: 'Who does what in Indian healthcare - a simple guide',
    excerpt: "Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse, physiotherapist, dietitian, lab technician and ASHA worker - each plays a distinct and important role.",
    category: 'Awareness',
    readTime: '4 min read',
    date: 'March 2026',
  },
  {
    slug: 'why-i-started-drd-medcare',
    title: "Why I started Dr D's MedCare",
    excerpt: 'A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me.',
    category: 'Our story',
    readTime: '4 min read',
    date: 'March 2026',
  },
]

const CATEGORIES = ['All', 'Education', 'Awareness', 'Our story'] as const
type Category = (typeof CATEGORIES)[number]

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

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
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
  )
}

export default function BlogGrid() {
  const [active, setActive] = useState<Category>('All')

  const featured = active === 'All' ? POSTS.find((p) => p.featured) : null
  const gridPosts = active === 'All'
    ? POSTS.filter((p) => !p.featured)
    : POSTS.filter((p) => p.category === active)

  return (
    <div className="relative mx-auto max-w-6xl px-4 pb-20">

      {/* Category tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All' ? POSTS.length : POSTS.filter((p) => p.category === cat).length
          const isActive = active === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
              ].join(' ')}
              style={isActive ? { background: 'rgb(var(--color-primary))' } : {}}
            >
              {cat}
              <span className={`ml-1.5 text-xs font-normal ${isActive ? 'opacity-70' : 'text-slate-400'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Featured post - only on All tab */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group block mb-8">
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
              <div className="hidden lg:flex items-center justify-center bg-violet-50/60 p-10">
                <div className="text-center">
                  <div className="text-7xl">🧠</div>
                  <p className="mt-4 text-sm font-medium text-violet-700">Education</p>
                  <p className="mt-1 text-xs text-slate-400 max-w-[200px] leading-relaxed">Understanding a rare condition and its medicines</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Posts grid */}
      {gridPosts.length > 0 && (
        <div>
          {active === 'All' && (
            <h2 className="text-lg font-bold text-slate-900 mb-5">All articles</h2>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            {active === 'All' && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/40 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="text-3xl mb-3">✍️</div>
                <p className="text-sm font-medium text-slate-500">More articles coming soon</p>
                <p className="mt-1 text-xs text-slate-400">New posts every month</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state for filtered tabs */}
      {gridPosts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/40 py-16 text-center">
          <div className="text-4xl mb-3">✍️</div>
          <p className="text-sm font-medium text-slate-500">No articles in this category yet</p>
          <p className="mt-1 text-xs text-slate-400">Check back soon</p>
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
  )
}
