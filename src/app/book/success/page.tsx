'use client'

import { useSearchParams } from 'next/navigation'

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')

  const whatsappText = encodeURIComponent(
    `Hi MedXplain, I have made the payment for my booking.\n\nBooking ID: ${bookingId ?? ''}\n\nI am attaching the payment screenshot / reference number.`
  )

  const whatsappLink = `https://wa.me/919999999999?text=${whatsappText}`

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Booking created ✅</h1>

      <div className="mt-4 rounded-md border p-4">
        <p className="text-sm text-gray-600">Booking ID</p>
        <p className="mt-1 break-all font-mono text-sm">{bookingId ?? '—'}</p>
      </div>

      <a
        className="mt-6 block w-full rounded-md bg-green-600 px-4 py-3 text-center text-white"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        Pay & Send Proof on WhatsApp
      </a>

      <p className="mt-4 text-xs text-gray-500">
        India only • Education only • No diagnosis/prescribing • Not for emergencies
      </p>
    </main>
  )
}