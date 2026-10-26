import type { Metadata } from 'next'
import BlogGrid from './_components/BlogGrid'
import { PageHero } from '@/components/ui'

export const metadata: Metadata = {
  title: "Blog | Dr D's MedCare",
  description: "Plain-language articles on medicines, drug interactions, medication adherence, and patient education for Indian patients.",
  alternates: {
    canonical: '/blog',
    languages: { 'en-IN': '/blog' },
  },
}

export default function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="The MedCare journal"
        title={<>Medicines, <em>explained simply.</em></>}
        sub="Practical, plain-language articles to help you understand your medicines, avoid common mistakes, and take charge of your health."
      />
      <BlogGrid />
    </main>
  )
}
