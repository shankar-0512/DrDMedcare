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
import { PageHero } from '@/components/ui'

export default function BookPage() {
  return (
    <main>
      <PageHero
        eyebrow="Book a session"
        title={<>Let&rsquo;s get you <em>booked.</em></>}
        sub="Takes less than 2 minutes. Confirmation after payment proof on WhatsApp."
      />
      <div className="bg-paper">
        <Suspense>
          <BookingWizard />
        </Suspense>
      </div>
    </main>
  )
}
