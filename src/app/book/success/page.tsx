'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'

type BookingDetail = {
  id: string
  service_type_slug: string
  plan_code: string
  preferred_start: string
  final_price_inr: number
  patient_name: string
}

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    })
  } catch {
    return iso
  }
}

function formatSlug(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function SuccessContent() {
  const searchParams   = useSearchParams()
  const bookingId      = searchParams.get('bookingId')
  const patientName    = searchParams.get('patientName')
  const finalPrice     = searchParams.get('finalPrice')
  const serviceSlug    = searchParams.get('serviceSlug')
  const planCode       = searchParams.get('planCode')
  const preferredStart = searchParams.get('preferredStart')

  const booking: BookingDetail | null = bookingId ? {
    id:                bookingId,
    patient_name:      patientName ?? '',
    final_price_inr:   Number(finalPrice ?? 0),
    service_type_slug: serviceSlug ?? '',
    plan_code:         planCode ?? '',
    preferred_start:   preferredStart ?? '',
  } : null

  const whatsappText = encodeURIComponent(
    `Hi Dr D's MedCare, I have made the payment for my booking.\n\nBooking ID: ${bookingId ?? ''}\n\nI am attaching the payment screenshot / reference number.`
  )
  const whatsappLink = `https://wa.me/919080709332?text=${whatsappText}`

  return (
    <main className="mx-auto max-w-lg px-4 py-16">

      {/* Success icon */}
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-lg"
          style={{ background: 'rgb(var(--color-primary-soft))' }}
        >
          ✅
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
          Booking received
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-sm leading-relaxed">
          Your slot is reserved. Send your payment proof on WhatsApp to confirm the session.
        </p>
      </div>

      {/* Booking summary card */}
      <div
        className="mt-8 rounded-2xl border-2 p-5 space-y-4"
        style={{ borderColor: 'rgb(var(--color-primary-mid))', background: 'rgb(var(--color-primary-soft) / 0.4)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--color-primary))]">
          Booking summary
        </p>

        {booking ? (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            <div>
              <p className="text-xs text-slate-400">Patient</p>
              <p className="font-medium text-slate-800">{booking.patient_name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Amount</p>
              <p className="text-lg font-bold text-slate-900">₹{booking.final_price_inr}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Service</p>
              <p className="font-medium text-slate-800">{formatSlug(booking.service_type_slug)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Plan</p>
              <p className="font-medium text-slate-800">{formatSlug(booking.plan_code)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-slate-400">Slot</p>
              <p className="font-medium text-slate-800">{formatDateTime(booking.preferred_start)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Could not load booking details.</p>
        )}

        <div className="border-t pt-3" style={{ borderColor: 'rgb(var(--color-primary-mid))' }}>
          <p className="text-xs text-slate-400 mb-1">Booking ID</p>
          <p className="break-all font-mono text-sm font-semibold text-slate-800">
            {bookingId ?? '—'}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Include this ID in your WhatsApp message.
          </p>
        </div>
      </div>

      {/* Payment QR */}
      {booking && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Pay via UPI
          </p>
          <div className="flex justify-center">
            <div className="rounded-xl border border-slate-200 p-3 bg-white inline-block">
              <QRCodeSVG
                value={`upi://pay?pa=priyankanandhini8-3@okaxis&pn=Dr D's MedCare&am=${booking.final_price_inr}&cu=INR`}
                size={180}
                marginSize={0}
              />
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-800">priyankanandhini8-3@okaxis</p>
          <p className="mt-0.5 text-xs text-slate-400">Scan with any UPI app · Amount ₹{booking.final_price_inr} is pre-filled</p>
          <a
            href={`upi://pay?pa=priyankanandhini8-3@okaxis&pn=Dr D's MedCare&am=${booking.final_price_inr}&cu=INR`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90"
            style={{ background: 'rgb(var(--color-primary))' }}
          >
            Open UPI App to Pay ₹{booking.final_price_inr}
          </a>
          <p className="mt-2 text-xs text-slate-400">Opens GPay, PhonePe, Paytm &amp; more</p>
        </div>
      )}

      {/* Steps */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          What happens next
        </p>
        <div className="space-y-3">
          {[
            'Make payment via UPI or bank transfer.',
            'Send your payment screenshot on WhatsApp along with your Booking ID.',
            'We will confirm your session slot within a few hours.',
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: 'rgb(var(--color-primary))' }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg"
      >
        <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.849L.057 23.535a.75.75 0 0 0 .92.92l5.733-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 0 1-4.953-1.355l-.355-.211-3.664.936.972-3.573-.231-.368A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        Send Payment Proof on WhatsApp
      </a>

      <p className="mt-6 text-center text-xs text-slate-400">
        India only · Education only · No diagnosis or prescribing · Not for emergencies
      </p>

    </main>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
