import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Book Medication Counselling | Dr D's MedCare",
  description: "Book a medication counselling session with Dr Priyanka Deventhiran, Pharm D. Pick a slot and pay via UPI. Sessions in Tamil, Telugu, Hindi and English.",
  alternates: {
    canonical: '/book',
    languages: { 'en-IN': '/book' },
  },
}
import BookingWizard from './_components/BookingWizard'

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Suspense>
        <BookingWizard />
      </Suspense>
    </div>
  )
}
