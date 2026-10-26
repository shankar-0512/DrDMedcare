import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Page Not Found | Dr D's MedCare",
}

export default function NotFound() {
  return (
    <main className="relative -mt-[84px] bg-hero pt-[84px]">
      <div className="mx-auto flex min-h-[78vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="display text-[clamp(6rem,22vw,12rem)] leading-none text-dark">404</p>
        <h1 className="display mt-2 text-[2.2rem] text-dark">Page not found</h1>
        <p className="mt-4 max-w-md text-[1.05rem] leading-[1.65] text-dark/80">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-dark">Go to homepage <span className="arr" aria-hidden>→</span></Link>
          <Link href="/book" className="btn btn-ghost text-dark hover:text-paper">Book a session</Link>
        </div>
        <p className="mt-12 text-xs font-semibold text-dark/65">India only &middot; Education only &middot; No diagnosis or prescribing</p>
      </div>
    </main>
  )
}
