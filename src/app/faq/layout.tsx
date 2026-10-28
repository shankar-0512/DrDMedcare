import type { Metadata } from 'next'
import { FAQ_DATA } from './data'

export const metadata: Metadata = {
  title: "FAQ - Your Medication Counselling Questions Answered | Dr D's MedCare",
  description: "What happens in a session? Do I need a prescription? How much does it cost? Common questions about booking a medication counselling session with Dr Priyanka Deventhiran.",
  alternates: {
    canonical: '/faq',
    languages: { 'en-IN': '/faq' },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.flatMap((c) => c.items).map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  )
}
