import { Suspense } from 'react'
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
