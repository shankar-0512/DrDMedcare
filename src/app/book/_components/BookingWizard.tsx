'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import ServiceStep from './ServiceStep'
import SlotStep from './SlotStep'
import DetailsStep from './DetailsStep'
import { calculateFinalPrice, PlanCode } from '@/lib/pricing'

type Plan = {
  code: PlanCode
  title: string
  duration_minutes: number
  price_inr: number
}

type ServiceType = {
  slug: string
  title: string
  short_desc: string
  base_price_inr: number
}

type BookingDraft = {
  serviceType?: ServiceType
  plan?: Plan
  finalPriceInr?: number
  slotId?: string
  preferredStart?: string
  preferredEnd?: string
  patientName?: string
  patientAge?: number
  patientGender?: string
  patientPhone?: string
  patientAddress?: string
  patientEmail?: string
  city?: string
  language?: string
  consentEducation?: boolean
  consentNoPrescribing?: boolean
  consentNotEmergency?: boolean
}

const STEPS = [
  { number: 1, label: 'Choose plan' },
  { number: 2, label: 'Pick a slot' },
  { number: 3, label: 'Your details' },
]

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {STEPS.map((s, i) => {
        const done = s.number < current
        const active = s.number === current

        return (
          <div key={s.number} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                  done
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))] text-white'
                    : active
                    ? 'border-[rgb(var(--color-primary))] bg-white text-[rgb(var(--color-primary))] shadow-md'
                    : 'border-slate-200 bg-white text-slate-400',
                ].join(' ')}
              >
                {done ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.number
                )}
              </div>
              <span
                className={[
                  'text-xs font-medium whitespace-nowrap',
                  active ? 'text-[rgb(var(--color-primary))]' : done ? 'text-slate-500' : 'text-slate-300',
                ].join(' ')}
              >
                {s.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="mx-2 mb-5 h-0.5 w-16 sm:w-24 rounded-full transition-all duration-300"
                style={{ background: s.number < current ? 'rgb(var(--color-primary))' : '#e2e8f0' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function BookingWizard() {
  const searchParams = useSearchParams()
  const preselectedType = (searchParams.get('type') ?? '').trim()

  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [draft, setDraft] = useState<BookingDraft>({})
  const [error, setError] = useState<string>('')
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError('')

      const { data, error } = await supabase
        .from('service_types')
        .select('slug,title,short_desc,base_price_inr')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      const types = (data ?? []) as ServiceType[]
      setServiceTypes(types)

      if (types.length > 0) {
        const found = preselectedType
          ? types.find((t) => t.slug === preselectedType)
          : types[0]

        if (found) {
          setDraft((d) => ({ ...d, serviceType: found, plan: undefined, finalPriceInr: undefined }))
          await loadPlansFor(found.slug)
        }
      }

      setLoading(false)
    }

    load()
  }, [preselectedType])

  function ensurePricing(nextPlan: Plan, nextType?: ServiceType) {
    const type = nextType ?? draft.serviceType
    if (!type) return { final: undefined as number | undefined }
    const final = calculateFinalPrice(type.base_price_inr, nextPlan.code)
    return { final }
  }

  async function loadPlansFor(serviceTypeSlug: string) {
    setError('')

    const { data, error } = await supabase
      .from('service_type_plans')
      .select(`
        plan_code,
        sort_order,
        services:services (
          code,
          title,
          duration_minutes,
          price_inr
        )
      `)
      .eq('service_type_slug', serviceTypeSlug)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      setError(error.message)
      setPlans([])
      return
    }

    const list = (data ?? [])
      .map((row: any) => row.services)
      .filter((p: any) => !!p) as Plan[]

    setPlans(list)
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-[rgb(var(--color-primary))]" />
            <p className="text-sm text-slate-400">Loading…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">

      {/* Page title */}
      <div className="mb-8 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]"
          style={{ background: 'rgb(var(--color-primary-soft))', borderColor: 'rgb(var(--color-primary-mid))' }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'rgb(var(--color-primary))' }} />
          Book a session
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Let's get you booked
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Takes less than 2 minutes. Confirmation after payment proof on WhatsApp.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator current={step} />

      {/* Service type pill selector */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Service type
        </p>
        <div className="flex flex-wrap gap-2">
          {serviceTypes.map((t) => {
            const isSelected = draft.serviceType?.slug === t.slug
            return (
              <button
                key={t.slug}
                type="button"
                onClick={async () => {
                  setDraft((d) => ({ ...d, serviceType: t, plan: undefined, finalPriceInr: undefined }))
                  setStep(1)
                  await loadPlansFor(t.slug)
                }}
                className={[
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                  isSelected
                    ? 'border-transparent bg-[rgb(var(--color-primary))] text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[rgb(var(--color-primary))] hover:text-[rgb(var(--color-primary))]',
                ].join(' ')}
              >
                {t.title}
              </button>
            )
          })}
        </div>
        {draft.serviceType && (
          <p className="mt-3 text-sm text-slate-500">{draft.serviceType.short_desc}</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div ref={errorRef} className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step content */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {step === 1 && (
          <ServiceStep
            plans={plans}
            serviceType={draft.serviceType}
            selectedPlanCode={draft.plan?.code ?? ''}
            onSelect={(plan) => {
              const { final } = ensurePricing(plan)
              setDraft((d) => ({ ...d, plan, finalPriceInr: final }))
              setStep(2)
            }}
          />
        )}

        {step === 2 && (
          <SlotStep
            durationMinutes={draft.plan?.duration_minutes ?? 15}
            selectedSlotId={draft.slotId}
            onBack={() => setStep(1)}
            onNext={(slotId, preferredStart, preferredEnd) => {
              setDraft((d) => ({ ...d, slotId, preferredStart, preferredEnd }))
              setStep(3)
            }}
          />
        )}

        {step === 3 && (
          <DetailsStep
            draft={draft}
            onBack={() => setStep(2)}
            onError={(msg) => setError(msg)}
          />
        )}
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        India only · Education only · No diagnosis or prescribing · Not for emergencies
      </p>
    </div>
  )
}