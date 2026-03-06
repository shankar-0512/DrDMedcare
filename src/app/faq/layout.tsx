import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "FAQ | Dr D's MedCare",
  description: "Answers to common questions about medication counselling, booking a session, payment, and what to expect from Dr D's MedCare.",
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
