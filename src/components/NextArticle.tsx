'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PostCover from '@/components/PostCover'
import { POSTS } from '@/app/blog/posts'

export default function NextArticle() {
  const pathname = usePathname()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const i = POSTS.findIndex((p) => p.slug === slug)
  if (i === -1) return null
  const next = POSTS[(i + 1) % POSTS.length]

  return (
    <section aria-label="Next article" className="mt-16">
      <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-dark">Read next</p>
      <Link href={`/blog/${next.slug}`} className="group mt-5 grid overflow-hidden rounded-[2.5rem] border-2 border-dark/10 bg-paper transition-all duration-300 hover:border-dark sm:grid-cols-[0.8fr_1.2fr]">
        <PostCover slug={next.slug} className="min-h-[200px]" sizes="(min-width:640px) 340px, 92vw" />
        <div className="flex flex-col justify-center p-7 lg:p-10">
          <span className="text-[0.8rem] font-semibold text-subtle">{next.category} &middot; {next.readTime}</span>
          <h3 className="display mt-3 text-[1.5rem] leading-[1.15] text-dark lg:text-[1.9rem]">{next.title}</h3>
          <p className="mt-3 line-clamp-2 text-[0.97rem] leading-[1.6] text-subtle">{next.excerpt}</p>
          <span className="btn btn-dark mt-6 self-start">Read article <span className="arr" aria-hidden /></span>
        </div>
      </Link>
    </section>
  )
}

export function CurrentCover({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  return <PostCover slug={slug} className={className} sizes="(min-width:1024px) 520px, 92vw" priority />
}
