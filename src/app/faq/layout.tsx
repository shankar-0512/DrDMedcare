import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "FAQ — Your Medication Counselling Questions Answered | Dr D's MedCare",
  description: "What happens in a session? Do I need a prescription? How much does it cost? Common questions about booking a medication counselling session with Dr Priyanka Deventhiran.",
  alternates: { canonical: '/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
