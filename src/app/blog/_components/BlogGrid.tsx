'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsappButton'
import PostCover from '@/components/PostCover'
import { POSTS, type BlogPost } from '../posts'

const CATEGORIES = ['All', 'Education', 'Awareness', 'Our story'] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_STYLES: Record<string, string> = {
  'Our story':            'bg-dark text-brand',
  'Education':            'bg-brand text-dark',
  'Awareness':            'bg-brand-soft text-dark shadow-[inset_0_0_0_1.5px_rgb(var(--c-dark)/0.25)]',
  'Devices & conditions': 'bg-brand-deep text-dark',
}

function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] ?? 'bg-brand-soft text-dark'
  return <span className={`inline-block rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wide ${style}`}>{category}</span>
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-[2rem] border-2 border-dark/10 bg-paper p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-dark group-hover:bg-hero">
        <PostCover slug={post.slug} className="aspect-[1200/630] rounded-[1.5rem]" />
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <CategoryBadge category={post.category} />
        <h3 className="display mt-5 text-[1.3rem] leading-[1.18] text-dark">{post.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-[1.6] text-subtle group-hover:text-dark/80">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-paper">
              <Image src="/photos/hero-corridor.jpg" alt="Dr Priyanka" width={28} height={28} className="h-full w-full object-cover object-top" />
            </div>
            <span className="text-[0.78rem] font-semibold text-subtle group-hover:text-dark/80">{post.date} &middot; {post.readTime}</span>
          </div>
          <span className="arr-c bg-dark text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </div>
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
    <div className="bg-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap items-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? POSTS.length : POSTS.filter((p) => p.category === cat).length
            const isActive = active === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={[
                  'rounded-full px-5 py-2.5 text-[0.92rem] font-bold transition-all duration-200',
                  isActive ? 'bg-dark text-paper' : 'bg-brand-soft text-dark hover:bg-brand',
                ].join(' ')}
              >
                {cat}
                <span className={`ml-2 text-[0.78rem] font-semibold ${isActive ? 'text-brand' : 'text-dark/60'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Featured post - only on All tab */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group mb-12 block">
            <div className="grid overflow-hidden rounded-[2.5rem] bg-panel text-dark lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-dark">Featured</span>
                  <span className="rounded-full px-3 py-1 text-[0.72rem] font-bold text-dark shadow-[inset_0_0_0_1.5px_currentColor]">{featured.category}</span>
                </div>
                <h2 className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] text-dark">{featured.title}</h2>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.7] text-dark/75">{featured.excerpt}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.82rem] font-semibold text-dark/70">
                  <span>Dr Priyanka Deventhiran</span><span aria-hidden>&middot;</span><span>{featured.date}</span><span aria-hidden>&middot;</span><span>{featured.readTime}</span>
                </div>
                <span className="btn btn-dark mt-8 self-start">Read article <span className="arr" aria-hidden>→</span></span>
              </div>
              <div className="flex items-center bg-hero p-5 sm:p-8 lg:p-10">
                <PostCover slug={featured.slug} className="aspect-[1200/630] w-full rounded-[1.5rem] shadow-[0_24px_50px_-28px_rgb(var(--c-dark)/0.5)]" sizes="(min-width:1024px) 560px, 92vw" priority />
              </div>
            </div>
          </Link>
        )}

        {/* Posts grid */}
        {gridPosts.length > 0 && (
          <div>
            {active === 'All' && <h2 className="display mb-6 text-[1.9rem] text-dark">All articles</h2>}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
              {active === 'All' && (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-dark/25 bg-brand-soft p-6 text-center">
                  <p className="display text-[1.2rem] text-dark">More articles coming soon</p>
                  <p className="mt-1 text-[0.85rem] text-subtle">New posts every month</p>
                </div>
              )}
            </div>
          </div>
        )}

        {gridPosts.length === 0 && (
          <div className="rounded-[2rem] border-2 border-dashed border-dark/25 bg-brand-soft py-16 text-center">
            <p className="display text-[1.2rem] text-dark">No articles in this category yet</p>
            <p className="mt-1 text-[0.85rem] text-subtle">Check back soon</p>
          </div>
        )}

        {/* Blog CTA */}
        <div className="mt-16 rounded-[2.5rem] bg-hero p-10 text-center lg:p-14">
          <h3 className="display text-[clamp(1.7rem,3vw,2.4rem)] text-dark">Have a topic you&rsquo;d like covered?</h3>
          <p className="mx-auto mt-3 max-w-sm text-[1rem] text-dark/80">Send a message on WhatsApp and I&rsquo;ll add it to the list.</p>
          <div className="mt-7">
            <WhatsAppButton message={WA_MESSAGES.blog} variant="green" label="Suggest a topic" />
          </div>
        </div>
      </div>
    </div>
  )
}
