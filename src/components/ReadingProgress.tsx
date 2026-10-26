'use client'

import { useEffect, useState } from 'react'

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

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1.5 bg-transparent" role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-r-full bg-brand" style={{ width: `${pct}%`, transition: 'width 80ms linear' }} />
    </div>
  )
}
