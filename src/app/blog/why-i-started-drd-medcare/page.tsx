import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

export const metadata: Metadata = {
  title: "Why I Started Dr D's MedCare | Dr D's MedCare Blog",
  description: "A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me.",
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "Why I started Dr D's MedCare",
  description: "A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me.",
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://dr-d-medcare.vercel.app' },
  datePublished: '2026-03-01',
  url: 'https://dr-d-medcare.vercel.app/blog/why-i-started-drd-medcare',
  image: 'https://dr-d-medcare.vercel.app/ogimage.png',
  inLanguage: 'en-IN',
  keywords: 'medication counselling India, clinical pharmacist India, patient education',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
      title="Why I started Dr D's MedCare"
      excerpt="A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me."
      category="Our story"
      readTime="4 min read"
      date="March 2026"
    >
      <p>
        I was working as a clinical pharmacist in a private hospital in Chennai when I read a news report that I haven't been able to forget since. A mother had given her young child a dose of cough syrup mixed into a glass of milk — thinking, as many parents do, that it would make the medicine easier to swallow. The child died from a drug interaction.
      </p>

      <p>
        She wasn't careless. She wasn't negligent. She simply didn't know. And nobody had told her.
      </p>

      <h2>The gap nobody talks about</h2>

      <p>
        Every day in India, patients leave hospitals and clinics with prescriptions in hand and almost no understanding of what they're holding. A doctor's consultation lasts an average of five minutes. In that time, a diagnosis is made, a prescription is written, and the patient is sent on their way. There is no time — and often, no system — for anyone to sit down and explain what each medicine does, how to take it, what to avoid, and what to watch out for.
      </p>

      <p>
        In countries like the UK, the US, and Australia, this gap is filled by a dedicated pharmacist counsellor at every pharmacy. It's built into the healthcare system as a standard of care. In India, that role simply doesn't exist at scale.
      </p>

      <p>
        The result? Medicines are taken at the wrong time, with the wrong foods, in the wrong doses. Antibiotics are stopped midway. Chronic patients skip doses because nobody explained why consistency matters. Elders mix multiple medicines without anyone checking for interactions. And sometimes, tragedies happen that were entirely preventable.
      </p>

      <h2>What I kept seeing at the hospital</h2>

      <p>
        As a clinical pharmacist, I was one of the few people in the hospital whose job included talking to patients about their medicines. And every single day, I would see the same things. Patients who had been on a medicine for months but had no idea what it was for. Caregivers managing five or six medicines for an elderly parent with no understanding of which one was for what. Parents terrified because their child had been given a new antibiotic and they'd read something frightening about it online.
      </p>

      <p>
        The questions were always the same. <em>Can I take this with food? Can I take this with my other tablet? What happens if I miss a dose? Is it safe to take during my fast?</em> Simple questions, with clear answers — but nobody had ever given them those answers.
      </p>

      <h2>Why I built this</h2>

      <p>
        Dr D's MedCare started from a simple idea: what if patients could get 15 or 30 minutes with someone who would just explain their medicines to them? No diagnosis. No prescription changes. Just clear, honest, personalised education — in their own language, at their own pace.
      </p>

      <p>
        Medication counselling is the missing pill in Indian healthcare. I'm here to fill that gap — one session at a time.
      </p>

      <blockquote>
        "Patient counselling — the missing pill in Indian healthcare."
      </blockquote>

      <p>
        If you've ever left a doctor's appointment with questions you were too nervous to ask, or stared at a prescription wondering what you're actually taking — this service is for you.
      </p>
    </BlogPostLayout>
    </>
  )
}