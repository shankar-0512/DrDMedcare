'use client'

import { useEffect, useState } from 'react'

/** Sidebar card showing how far through the article the reader is. Desktop only (sidebar is sticky). */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    let raf = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight * 0.8
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.2, 0), total)
      setPct(total > 0 ? (done / total) * 100 : 0)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [targetId])

  const value = Math.round(pct)

  return (
    <div className="hidden rounded-[2rem] border-2 border-dark/10 bg-paper p-5 lg:block" role="progressbar" aria-label="Reading progress" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex items-baseline justify-between">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-dark">Reading progress</p>
        <p className="display text-[1.1rem] tabular-nums text-dark">{value}%</p>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-hero">
        <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%`, transition: 'width 120ms linear' }} />
      </div>
    </div>
  )
}
