'use client'

import Link from 'next/link'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <div
        className="inline-flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-lg"
        style={{ background: 'rgb(var(--color-primary-soft))' }}
      >
        ⚠️
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-base text-slate-500 leading-relaxed">
        An unexpected error occurred. Your booking has not been placed.
        Please try again or reach us on WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
        >
          Go to homepage
        </Link>
      </div>

      <p className="mt-10 text-xs text-slate-400">
        India only · Education only · No diagnosis or prescribing
      </p>
    </main>
  )
}
