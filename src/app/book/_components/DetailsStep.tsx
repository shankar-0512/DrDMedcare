'use client'

import { useMemo, useState } from 'react'

type BookingDraft = {
  serviceType?: { slug: string; title: string; base_price_inr: number }
  plan?: { code: string; title: string; duration_minutes: number }
  finalPriceInr?: number
  slotId?: string
  preferredStart?: string
  preferredEnd?: string
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'hi', label: 'Hindi' },
]

const GENDERS = ['Male', 'Female', 'Other']

function formatReadable(isoString: string): string {
  try {
    const date = new Date(isoString)
    return date.toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return isoString
  }
}

export default function DetailsStep(props: {
  draft: BookingDraft & Record<string, any>
  onBack: () => void
  onError: (msg: string) => void
}) {
  const [loading, setLoading] = useState(false)

  const [patientName, setPatientName]     = useState('')
  const [patientAge, setPatientAge]       = useState('')
  const [patientGender, setPatientGender] = useState('')
  const [patientPhone, setPatientPhone]   = useState('')
  const [patientAddress, setPatientAddress] = useState('')
  const [patientEmail, setPatientEmail]   = useState('')
  const [language, setLanguage]           = useState('en')

  const [cLegal, setCLegal] = useState(false)
  const [cRx, setCRx] = useState(false) // prescription consent

  const isPrescription = props.draft.serviceType?.slug === 'prescription-counselling'

  const summary = useMemo(() => ({
    serviceType: props.draft.serviceType?.title ?? '—',
    plan: props.draft.plan?.title ?? '—',
    duration: props.draft.plan?.duration_minutes ?? '—',
    final: props.draft.finalPriceInr ?? 0,
    slot: props.draft.preferredStart ?? '—',
  }), [props.draft])

  async function submit() {
    props.onError('')

    // Draft validations
    if (!props.draft.serviceType?.slug)                          { props.onError('Missing service type. Please go back.'); return }
    if (!props.draft.plan?.code)                                 { props.onError('Missing plan. Please go back.'); return }
    if (!props.draft.preferredStart || !props.draft.preferredEnd){ props.onError('Missing slot. Please go back.'); return }
    if (!props.draft.finalPriceInr || props.draft.finalPriceInr <= 0) { props.onError('Price could not be calculated. Please go back.'); return }

    // Field validations
    if (!patientName.trim())    { props.onError('Please enter your full name.'); return }
    if (!patientAge.trim())     { props.onError('Please enter your age.'); return }
    const ageNum = parseInt(patientAge, 10)
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) { props.onError('Please enter a valid age.'); return }
    if (!patientGender)         { props.onError('Please select your gender.'); return }
    if (!patientPhone.trim())   { props.onError('Please enter your phone number.'); return }
    if (!/^[6-9]\d{9}$/.test(patientPhone.trim())) { props.onError('Please enter a valid 10-digit Indian mobile number.'); return }
    if (!patientAddress.trim()) { props.onError('Please enter your address.'); return }

    // Consent validations
    if (!cLegal) { props.onError('Please agree to the Terms of Service, Disclaimer, and Privacy Policy to continue.'); return }
    if (isPrescription && !cRx) { props.onError('Please confirm you will send your prescription on WhatsApp.'); return }

    setLoading(true)

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceTypeSlug: props.draft.serviceType.slug,
        planCode: props.draft.plan.code,
        slotId: props.draft.slotId,
        preferredStart: props.draft.preferredStart,
        preferredEnd: props.draft.preferredEnd,
        patientName: patientName.trim(),
        patientAge: ageNum,
        patientGender,
        patientPhone: patientPhone.trim(),
        patientAddress: patientAddress.trim(),
        patientEmail: patientEmail.trim(),
        language,
        consentLegal: cLegal,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      props.onError(data?.message ?? 'Failed to create booking.')
      setLoading(false)
      return
    }

    const params = new URLSearchParams({
      bookingId:      data.bookingId,
      patientName:    patientName.trim(),
      finalPrice:     String(data.finalPriceInr),
      serviceSlug:    props.draft.serviceType.slug,
      planCode:       props.draft.plan.code,
      preferredStart: props.draft.preferredStart ?? '',
    })
    window.location.href = `/book/success?${params.toString()}`
  }

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[rgb(var(--color-primary))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]/10 transition-all'

  return (
    <div className="space-y-5">

      {/* Booking summary */}
      <div
        className="rounded-xl border p-4"
        style={{ borderColor: 'rgb(var(--color-primary-mid))', background: 'rgb(var(--color-primary-soft) / 0.5)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))] mb-3">
          Booking summary
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Service</p>
            <p className="font-medium text-slate-800">{summary.serviceType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Plan</p>
            <p className="font-medium text-slate-800">{summary.plan}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Preferred slot</p>
            <p className="font-medium text-slate-800 text-xs">{formatReadable(summary.slot)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Amount</p>
            <p className="text-lg font-bold text-slate-900">₹{summary.final}</p>
          </div>
        </div>
      </div>

      {/* Prescription notice — only for prescription-counselling */}
      {isPrescription && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0">📋</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">Prescription required</p>
              <p className="mt-1 text-sm text-amber-700 leading-relaxed">
                Please send a clear photo of your prescription on WhatsApp along with your payment confirmation. Your session will not be confirmed without it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Personal details */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Your details
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* Full name */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Ramesh Kumar"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Age <span className="text-red-400">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. 45"
              type="number"
              min={1}
              max={120}
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Gender <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3 pt-1">
              {GENDERS.map((g) => (
                <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                  <div
                    className={[
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                      patientGender === g
                        ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]'
                        : 'border-slate-300',
                    ].join(' ')}
                  >
                    {patientGender === g && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name="gender"
                    value={g}
                    checked={patientGender === g}
                    onChange={() => setPatientGender(g)}
                  />
                  <span className="text-sm text-slate-700">{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Phone number <span className="text-red-400">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="10-digit mobile number"
              type="tel"
              maxLength={10}
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Email address <span className="text-slate-300">(optional)</span>
            </label>
            <input
              className={inputClass}
              placeholder="you@example.com"
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Address <span className="text-red-400">*</span>
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              placeholder="Door no, Street, City, State"
              rows={2}
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
            />
          </div>

          {/* Language */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Preferred session language <span className="text-red-400">*</span>
            </label>
            <select
              className={inputClass}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Consent */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Consent
        </p>
        <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-4">
          {[
            { state: cLegal, set: setCLegal, legal: true },
            ...(isPrescription ? [{ state: cRx, set: setCRx, text: 'I will send a clear photo of my prescription on WhatsApp along with my payment confirmation.' }] : []),
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <div
                className={[
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all',
                  item.state
                    ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]'
                    : 'border-slate-300 group-hover:border-[rgb(var(--color-primary))]',
                ].join(' ')}
              >
                {item.state && (
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={item.state}
                onChange={(e) => item.set(e.target.checked)}
              />
              {'legal' in item ? (
                <span className="text-sm text-slate-600 leading-relaxed">
                  I have read and agree to the{' '}
                  <a href="/legal/terms" target="_blank" className="underline text-[rgb(var(--color-primary))]">Terms of Service</a>,{' '}
                  <a href="/legal/disclaimer" target="_blank" className="underline text-[rgb(var(--color-primary))]">Disclaimer</a>, and{' '}
                  <a href="/legal/privacy" target="_blank" className="underline text-[rgb(var(--color-primary))]">Privacy Policy</a>.
                </span>
              ) : (
                <span className="text-sm text-slate-600 leading-relaxed">{item.text}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={props.onBack}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
          style={{ background: 'rgb(var(--color-primary))' }}
        >
          {loading
            ? <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating…
              </span>
            : 'Confirm booking →'
          }
        </button>
      </div>

    </div>
  )
}