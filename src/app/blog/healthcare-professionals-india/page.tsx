import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

const _title = 'Who Does What in Indian Healthcare — A Simple Guide'
const _desc = 'Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse — each plays a distinct role. A quick guide to who does what in Indian healthcare.'
const _ogImage = 'https://drdmedcare.com/og/healthcare-professionals-india.jpg'

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: {
    title: _title,
    description: _desc,
    type: 'article',
    url: 'https://drdmedcare.com/blog/healthcare-professionals-india',
    images: [{ url: _ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _desc,
    images: [_ogImage],
  },,
  alternates: { canonical: '/blog/healthcare-professionals-india' },
}
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Who does what in Indian healthcare — a simple guide',
  description: 'Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse — each plays a distinct role. A quick guide to who does what in Indian healthcare.',
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://drdmedcare.com' },
  datePublished: '2026-03-15',
  url: 'https://drdmedcare.com/blog/healthcare-professionals-india',
  image: 'https://drdmedcare.com/ogimage.png',
  inLanguage: 'en-IN',
  keywords: 'Indian healthcare professionals, clinical pharmacist India, doctor vs pharmacist, healthcare roles India',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
      title="Who does what in Indian healthcare — a simple guide"
      excerpt="Doctor, specialist, clinical pharmacist, medication counsellor, pharmacist, nurse, physiotherapist, dietitian, lab technician and ASHA worker — each plays a distinct and important role. Here's a quick guide to who does what."
      category="Awareness"
      readTime="4 min read"
      date="March 2026"
    >
      <p>
        The Indian healthcare system involves many different professionals, each with a specific and well-defined role. Understanding who does what can help you ask the right questions, approach the right person, and make the most of every healthcare interaction.
      </p>

      <h2>Doctor (MBBS / MD / MS)</h2>
      <p>
        A doctor examines patients, diagnoses conditions, and prescribes medicines or treatment plans. They are the primary decision-makers in your medical care.
      </p>

      <h2>Specialist doctor (MD / MS / DM / MCh)</h2>
      <p>
        A specialist has completed advanced training in a specific area — such as cardiology, neurology, paediatrics or orthopaedics — and focuses on complex conditions within that field.
      </p>

      <h2>Clinical pharmacist (Pharm D)</h2>
      <p>
        A clinical pharmacist is a pharmacist with advanced clinical training who works directly in patient care settings — reviewing medication plans, identifying drug interactions, counselling patients on their medicines, and collaborating with doctors to optimise treatment outcomes.
      </p>

      <h2>Medication counsellor</h2>
      <p>
        A medication counsellor — typically a pharmacist by training — focuses exclusively on helping patients understand their prescribed medicines. This includes explaining what each medicine does, how and when to take it, what side effects to watch for, and how to stay consistent with a treatment plan.
      </p>

      <h2>Pharmacist (B Pharm / M Pharm)</h2>
      <p>
        A pharmacist is an expert in medicines. They dispense prescriptions, verify dosages, check for drug interactions, and provide guidance on the correct and safe use of medicines.
      </p>

      <h2>Nurse (GNM / B.Sc Nursing)</h2>
      <p>
        Nurses provide hands-on patient care — administering medicines, monitoring vitals, assisting in procedures, and supporting patient recovery in hospitals and clinics.
      </p>

      <h2>Physiotherapist (BPT / MPT)</h2>
      <p>
        A physiotherapist helps patients restore and maintain movement and physical function, particularly after injury, surgery, or conditions affecting mobility.
      </p>

      <h2>Dietitian / Nutritionist (B.Sc / M.Sc in Nutrition)</h2>
      <p>
        A registered dietitian assesses nutritional needs and creates personalised diet plans, particularly for patients managing chronic conditions like diabetes, kidney disease, or heart conditions.
      </p>

      <h2>Lab technician (DMLT / BMLT)</h2>
      <p>
        A lab technician collects samples and performs diagnostic tests — blood work, urine analysis, cultures and more — providing the data that doctors use to diagnose and monitor conditions.
      </p>

      <h2>Health worker / ASHA worker</h2>
      <p>
        Accredited Social Health Activists (ASHA workers) are community-level health workers who serve as a bridge between local communities and the public health system, particularly in rural India.
      </p>

      <hr />

      <p>
        Every one of these professionals plays a vital role in your care. The best health outcomes happen when patients engage actively with each of them — asking questions, following guidance, and never hesitating to seek clarification on anything they don't understand.
      </p>

      <p>
        If you have questions specifically about your medicines, that's where a medication counselling session can help.
      </p>

    </BlogPostLayout>
    </>
  )
}