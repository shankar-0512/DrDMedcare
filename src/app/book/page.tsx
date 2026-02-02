'use client'

import { useState } from 'react'

type ApiResponse = { bookingId: string } | { message: string }

export default function BookPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>('')

  async function createBooking() {
    setLoading(true)
    setResult('')

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceCode: 'quick_15',
        preferredStart: '2026-02-03T10:00:00+05:30',
        preferredEnd: '2026-02-03T10:15:00+05:30',
        patientName: 'Test User',
        patientPhone: '9000000000',
        patientEmail: 'test@example.com',
        city: 'Chennai',
        language: 'en',
        consentEducation: true,
        consentNoPrescribing: true,
        consentNotEmergency: true,
      }),
    })

    const data = (await res.json()) as ApiResponse

    if ('bookingId' in data) {
      window.location.href = `/book/success?bookingId=${encodeURIComponent(data.bookingId)}`
      return
    }

    setResult(data.message ?? 'Something went wrong')
    setLoading(false)
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Book</h1>
      <p className="mt-2 text-sm text-gray-600">
        Temporary booking button (we’ll replace with the 3-step wizard next).
      </p>

      <button
        className="mt-6 w-full rounded-md bg-black px-4 py-3 text-white disabled:opacity-60"
        onClick={createBooking}
        disabled={loading}
      >
        {loading ? 'Creating booking…' : 'Create test booking'}
      </button>

      {result ? (
        <p className="mt-4 text-sm text-red-600">{result}</p>
      ) : null}
    </main>
  )
}