'use client'

import Link from 'next/link'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="relative -mt-[84px] bg-hero pt-[84px]">
      <div className="mx-auto flex min-h-[78vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <span className="display grid h-20 w-20 place-items-center rounded-full bg-teal text-[2.4rem] text-brand">!</span>
        <h1 className="display mt-7 text-[2.4rem] text-dark">Something went wrong</h1>
        <p className="mt-4 max-w-md text-[1.05rem] leading-[1.65] text-dark/80">
          An unexpected error occurred. Your booking has not been placed.
          Please try again or reach us on WhatsApp.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button onClick={reset} className="btn btn-dark">Try again <span className="arr" aria-hidden>→</span></button>
          <Link href="/" className="btn btn-ghost text-dark hover:text-paper">Go to homepage</Link>
        </div>
        <p className="mt-12 text-xs font-semibold text-dark/65">India only &middot; Education only &middot; No diagnosis or prescribing</p>
      </div>
    </main>
  )
}
