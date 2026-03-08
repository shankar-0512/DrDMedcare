import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

const _title = 'Common Drug-Food Interactions Every Indian Patient Should Know'
const _desc = 'Dal, milk, banana, tea — everyday foods that can silently reduce or amplify the effect of your medicines.'
const _ogImage = `https://dr-d-medcare.vercel.app/api/og?title=${encodeURIComponent(_title)}&category=Education`

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: {
    title: _title,
    description: _desc,
    type: 'article',
    url: 'https://dr-d-medcare.vercel.app/blog/drug-food-interactions-india',
    images: [{ url: _ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _desc,
    images: [_ogImage],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Common drug-food interactions every Indian patient should know',
  description: 'Dal, milk, banana, tea — everyday foods that can silently reduce or amplify the effect of your medicines.',
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://dr-d-medcare.vercel.app' },
  datePublished: '2026-03-05',
  url: 'https://dr-d-medcare.vercel.app/blog/drug-food-interactions-india',
  image: 'https://dr-d-medcare.vercel.app/ogimage.png',
  inLanguage: 'en-IN',
  keywords: 'drug food interactions India, milk antibiotics, medicine with food, Indian diet medicine',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
      title="Common drug-food interactions every Indian patient should know"
      excerpt="Dal, milk, banana, tea — everyday foods that can silently reduce or amplify the effect of your medicines."
      category="Education"
      readTime="6 min read"
      date="March 2026"
    >
      <p>
        Most people know that you shouldn't drink alcohol with certain medicines. But very few people know that a glass of milk, a cup of tea, or even a banana can interfere with their medication just as significantly. In India, where food and medicine routines are deeply intertwined, this is one of the most common — and most overlooked — causes of medicines not working as they should.
      </p>

      <h2>Milk and antibiotics</h2>

      <p>
        Milk is perhaps the most well-known culprit. Tetracycline antibiotics, as well as some fluoroquinolones like ciprofloxacin, bind to the calcium in milk and dairy products. When this happens, the antibiotic cannot be properly absorbed by your body — meaning you're taking the medicine but not getting its full benefit.
      </p>

      <p>
        <strong>What to do:</strong> Take these antibiotics at least 2 hours before or after any dairy products. This includes milk, curd, paneer, and cheese.
      </p>

      <h2>Tea, coffee and iron tablets</h2>

      <p>
        Iron deficiency is extremely common in India, especially among women. Many patients are prescribed iron supplements — but far fewer are told that tea and coffee can significantly reduce how much iron their body absorbs. The tannins in both drinks bind to iron and prevent it from entering the bloodstream.
      </p>

      <p>
        <strong>What to do:</strong> Take iron tablets on an empty stomach, or with a glass of water or orange juice (vitamin C actually helps iron absorption). Avoid tea and coffee for at least one hour before and after your iron dose.
      </p>

      <h2>Bananas and blood pressure medicines</h2>

      <p>
        Bananas are high in potassium. Certain blood pressure medicines — particularly ACE inhibitors like enalapril and lisinopril, and potassium-sparing diuretics — also increase potassium levels in the body. Eating large amounts of bananas while on these medicines can push potassium levels dangerously high, causing heart rhythm problems.
      </p>

      <p>
        <strong>What to do:</strong> You don't need to avoid bananas entirely, but don't overdo it. One banana a day is generally fine. Talk to your doctor or pharmacist if you're on multiple blood pressure medicines.
      </p>

      <h2>Grapefruit and statins</h2>

      <p>
        This one surprises many people. Grapefruit and grapefruit juice contain compounds that interfere with the enzyme your body uses to break down many statins (cholesterol medicines like atorvastatin and simvastatin). The result is that more of the medicine enters your bloodstream than intended, increasing the risk of side effects including muscle damage.
      </p>

      <p>
        <strong>What to do:</strong> If you're on a statin, avoid grapefruit and grapefruit juice entirely. Regular oranges and other citrus fruits are fine.
      </p>

      <h2>Dal and thyroid medicines</h2>

      <p>
        This is particularly relevant for patients on levothyroxine (thyroid replacement medicine). Foods high in dietary fibre — including many dals and pulses — can reduce the absorption of levothyroxine if eaten too close to the dose.
      </p>

      <p>
        <strong>What to do:</strong> Levothyroxine should always be taken on an empty stomach, 30–60 minutes before breakfast. Don't eat your morning dal immediately after taking your thyroid tablet.
      </p>

      <h2>Vitamin K-rich foods and blood thinners</h2>

      <p>
        Patients on warfarin (a blood thinner) are often warned to be careful with vitamin K-rich foods — including leafy greens like spinach, methi (fenugreek), and palak. Vitamin K helps blood to clot, and eating large amounts of these foods can reduce the effectiveness of warfarin.
      </p>

      <p>
        <strong>What to do:</strong> You don't need to avoid these vegetables, but try to keep your intake consistent from day to day. Sudden large increases can affect how well your blood thinner is working.
      </p>

      <h2>The bottom line</h2>

      <p>
        Food-drug interactions are real, common, and often go unmentioned at the time of prescribing. The good news is that once you know about them, most are easy to manage. The key is timing — and knowing which foods to watch out for with which medicines.
      </p>

      <p>
        If you'd like to go through your specific prescription and understand exactly what to eat, avoid, and when — that's precisely what a prescription counselling session with me covers.
      </p>
    </BlogPostLayout>
    </>
  )
}