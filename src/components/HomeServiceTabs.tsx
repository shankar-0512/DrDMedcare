'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

type ServiceType = {
  id: number
  slug: string
  title: string
  short_desc: string
  long_desc?: string | null
  icon?: string | null
  base_price_inr: number
}

const CACHE_KEY = 'drds_service_types_v2'
const CACHE_TTL = 1000 * 60 * 10 // 10 minutes

function getCached(): ServiceType[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (!Array.isArray(data) || data.length === 0) return null
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCache(data: ServiceType[]) {
  try {
    // Never cache empty results
    if (!data || data.length === 0) return
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
  } catch {}
}

function iconFor(slug: string) {
  const map: Record<string, string> = {
    'prescription-counselling': '🧾',
    'adherence-planning':       '⏱️',
    'elderly-polypharmacy':     '👵',
    'disease-awareness':        '🩺',
    'device-usage':             '💉',
    'side-effects':             '⚠️',
  }
  return map[slug] ?? '✅'
}

function accentColor(index: number) {
  const accents = [
    { bg: 'bg-[rgb(var(--color-primary-soft))]', border: 'border-[rgb(var(--color-primary-mid))]', dot: 'bg-[rgb(var(--color-primary))]', badge: 'text-[rgb(var(--color-primary))]' },
    { bg: 'bg-amber-50',   border: 'border-amber-200',   dot: 'bg-amber-500',   badge: 'text-amber-700'   },
    { bg: 'bg-sky-50',     border: 'border-sky-200',     dot: 'bg-sky-500',     badge: 'text-sky-700'     },
    { bg: 'bg-violet-50',  border: 'border-violet-200',  dot: 'bg-violet-500',  badge: 'text-violet-700'  },
    { bg: 'bg-rose-50',    border: 'border-rose-200',    dot: 'bg-rose-500',    badge: 'text-rose-700'    },
  ]
  return accents[index % accents.length]
}

function ServiceSkeleton() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header skeleton */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-2 h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        {/* Cards skeleton — same grid as real cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-2xl border-2 border-transparent bg-white p-5 shadow-sm">
              {/* Icon */}
              <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />
              {/* Title */}
              <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
              {/* Desc */}
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
              </div>
              {/* Price */}
              <div className="mt-4 h-4 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomeServiceTabs() {
  const [items, setItems]           = useState<ServiceType[]>([])
  const [loading, setLoading]       = useState(true)
  const [activeSlug, setActiveSlug] = useState<string>('')
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cached = getCached()
    if (cached && cached.length > 0) {
      setItems(cached)
      setActiveSlug(cached[0]?.slug ?? '')
      setLoading(false)
      return
    }

    async function load() {
      const { data, error } = await supabase
        .from('service_types')
        .select('id,slug,title,short_desc,long_desc,icon,base_price_inr')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) { setLoading(false); return }
      const list = (data ?? []) as ServiceType[]
      setCache(list)
      setItems(list)
      setActiveSlug(list[0]?.slug ?? '')
      setLoading(false)
    }
    load()
  }, [])

  const activeIndex = useMemo(() => items.findIndex((x) => x.slug === activeSlug), [items, activeSlug])
  const active = items[activeIndex] ?? null

  if (loading) return <ServiceSkeleton />

  if (items.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl text-sm text-slate-400">No services available right now.</div>
      </section>
    )
  }

  return (
    <section id="how-i-can-help" className="px-4 py-16 scroll-mt-28">
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]"
              style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
              What I offer
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              How I can help you
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a service below to learn more and book a session.
            </p>
          </div>
        </div>

        {/* Service cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const accent = accentColor(i)
            const isActive = s.slug === activeSlug
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveSlug(s.slug)
                  setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
                }}
                className={[
                  'group relative rounded-2xl border-2 p-5 text-left transition-all duration-200',
                  isActive
                    ? `${accent.border} bg-white shadow-md`
                    : 'border-transparent bg-white shadow-sm hover:shadow-md hover:border-slate-200',
                ].join(' ')}
              >
                {isActive && (
                  <span className={`absolute top-4 right-4 h-2 w-2 rounded-full ${accent.dot}`} />
                )}

                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl ${accent.bg}`}>
                  {s.icon ?? iconFor(s.slug)}
                </div>

                <div className="mt-3 text-base font-semibold text-slate-900 leading-snug">
                  {s.title}
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
                  {s.short_desc}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${accent.badge}`}>
                    From ₹{s.base_price_inr}
                  </span>
                  <span className={`text-xs font-medium transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'} text-slate-400`}>
                    View details ↓
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Expanded detail panel */}
        {active && (
          <div ref={detailRef} className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1 w-full" style={{ background: 'rgb(var(--color-primary))' }} />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${accentColor(activeIndex).bg}`}>
                      {active.icon ?? iconFor(active.slug)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{active.title}</h3>
                      <p className="text-xs text-slate-400">Education only · India only</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{active.short_desc}</p>
                  {active.long_desc && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{active.long_desc}</p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Focused session', 'Plain language', 'Q&A included', 'No prescribing'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end sm:min-w-[160px]">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p className="text-3xl font-bold text-slate-900">₹{active.base_price_inr}</p>
                    <p className="mt-0.5 text-xs text-slate-400">Select a plan on the next step</p>
                  </div>

                  <Link
                    href={`/book?type=${encodeURIComponent(active.slug)}`}
                    className="w-full rounded-xl px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg sm:w-auto"
                    style={{ background: 'rgb(var(--color-primary))' }}
                  >
                    Book this session →
                  </Link>

                  <p className="text-xs text-slate-400 sm:text-right">
                    Confirmation after payment proof on WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          Education only · No diagnosis or prescribing · Not for emergencies
        </p>
      </div>
    </section>
  )
}