import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

const _title = 'Meningitis: Warning Signs Every Indian Family Must Know'
const _desc = "Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India."
const _ogImage = 'https://drdmedcare.com/og/meningitis-symptoms-india.jpg'

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: {
    title: _title,
    description: _desc,
    type: 'article',
    url: 'https://drdmedcare.com/blog/meningitis-symptoms-india',
    images: [{ url: _ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _desc,
    images: [_ogImage],
  },
  alternates: { canonical: '/blog/meningitis-symptoms-india' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Meningitis: Warning signs every Indian family must know',
  description: "Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India.",
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://drdmedcare.com' },
  datePublished: '2026-03-22',
  url: 'https://drdmedcare.com/blog/meningitis-symptoms-india',
  image: _ogImage,
  inLanguage: 'en-IN',
  keywords: 'meningitis symptoms India, meningitis vaccine India, bacterial meningitis, meningitis treatment, neck stiffness fever headache',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
        title="Meningitis: warning signs every Indian family must know"
        excerpt="Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India."
        category="Education"
        readTime="6 min read"
        date="March 2026"
      >
        <p>
          In my years of practice, meningitis is one condition I wish more families in India knew about. It is rare — but when it strikes, it moves fast. Bacterial meningitis can kill or cause permanent disability within 24 to 48 hours of symptoms starting. The difference between a good outcome and a devastating one is almost entirely down to how quickly a family recognises it and gets to hospital.
        </p>

        <h2>What is meningitis?</h2>

        <p>
          Meningitis is an infection of the meninges — the thin membranes that surround and protect your brain and spinal cord. It is most commonly caused by bacteria or viruses.
        </p>

        {/* Viral vs Bacterial comparison card */}
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="text-2xl mb-2">🦠</div>
            <p className="text-sm font-bold text-amber-800 mb-1">Viral meningitis</p>
            <p className="text-sm text-amber-700 leading-relaxed">More common. Usually resolves in 1–2 weeks with medicines and rest. Caused by enteroviruses — the same family behind the common cold.</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-sm font-bold text-red-800 mb-1">Bacterial meningitis</p>
            <p className="text-sm text-red-700 leading-relaxed">Far more dangerous. Can be fatal within 24–48 hours. Can cause hearing loss, brain damage, or limb loss even with treatment.</p>
          </div>
        </div>

        <p>
          The principal causative organisms in India are <em>Neisseria meningitidis</em> (meningococcal disease), <em>Streptococcus pneumoniae</em> (pneumococcal disease), and in young children, <em>Haemophilus influenzae</em>.
        </p>

        <h2>Who is at risk?</h2>

        <ul>
          <li><strong>Infants and young children</strong> — their immune systems are still developing and their blood-brain barrier is more vulnerable</li>
          <li><strong>Teenagers and young adults</strong> — especially those in close contact settings like hostels, colleges, and coaching centres</li>
          <li><strong>Elderly individuals</strong> and those with weakened immunity (diabetes, HIV, those on long-term steroids)</li>
          <li><strong>Hajj and Umrah pilgrims</strong> — meningococcal vaccination is mandatory for travel to Saudi Arabia for a reason; large gatherings are a well-documented risk factor</li>
          <li><strong>People living in crowded conditions</strong> — a factor that is sadly still common across many parts of India</li>
        </ul>

        <h2>The warning signs — know these by heart</h2>

        <p>
          The classic triad of meningitis is: <strong>sudden severe headache, high fever, and stiff neck</strong>. But in practice, not every patient will have all three at once, especially in the early hours.
        </p>

        {/* Warning signs visual card */}
        <div className="not-prose rounded-xl border-2 border-violet-200 bg-violet-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4">Warning signs</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: '🤕', label: 'Sudden severe headache', note: 'Intense, different from anything before' },
              { icon: '🌡️', label: 'High fever', note: 'Often 39–40°C, coming on fast' },
              { icon: '🔒', label: 'Stiff neck', note: 'Cannot bring chin to chest' },
              { icon: '💡', label: 'Sensitivity to light', note: 'Wants to be in a dark room' },
              { icon: '🔇', label: 'Sensitivity to sound', note: 'Noise feels unbearable' },
              { icon: '🤢', label: 'Nausea & vomiting', note: 'Often with the headache' },
              { icon: '😵', label: 'Confusion or drowsiness', note: 'Difficult to wake or keep alert' },
              { icon: '⚡', label: 'Seizures', note: 'Particularly in children' },
            ].map(({ icon, label, note }) => (
              <div key={label} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-violet-100">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          In infants, the signs are different and easier to miss. Look for a bulging fontanelle (the soft spot on the baby's head), a high-pitched unusual cry, refusal to feed, a limp or floppy body, and extreme irritability.
        </p>

        <h2>The rash — and the glass test</h2>

        <p>
          In meningococcal meningitis specifically, a rash can appear. It starts as small red or purple spots that look like tiny blood spots under the skin (petechiae). These can spread rapidly into larger blotchy bruise-like patches (purpura).
        </p>

        {/* Glass test step-by-step */}
        <div className="not-prose rounded-xl border border-red-200 bg-red-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">The glass test — step by step</p>
          <div className="flex flex-col gap-3">
            {[
              { step: '1', text: 'Find a clear drinking glass' },
              { step: '2', text: 'Press it firmly against the rash or spots' },
              { step: '3', text: 'Look through the glass while pressing' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{step}</div>
                <p className="text-sm text-red-900 font-medium">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-100 border border-green-200 p-3 text-center">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Spots fade ✓</p>
              <p className="text-xs text-green-700">Likely not meningococcal — monitor closely</p>
            </div>
            <div className="rounded-lg bg-red-200 border border-red-300 p-3 text-center">
              <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-1">Spots stay visible 🚨</p>
              <p className="text-xs text-red-800 font-semibold">Go to A&amp;E immediately. Do not wait.</p>
            </div>
          </div>
        </div>

        <blockquote>
          If the rash does not fade under a glass, do not wait. Do not call a private clinic. Go to the nearest hospital emergency department immediately.
        </blockquote>

        <h2>Why meningitis is commonly missed in India</h2>

        <p>
          The early symptoms — fever, headache, fatigue — overlap heavily with common illnesses like viral fever, dengue, typhoid, and even malaria. This is why it is so often attributed to "viral fever" and treated at home in the first critical hours.
        </p>

        {/* Comparison table */}
        <div className="not-prose rounded-xl border border-slate-200 overflow-hidden my-6">
          <div className="grid grid-cols-3 bg-slate-100 px-4 py-2.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Symptom</p>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">Viral fever</p>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Meningitis</p>
          </div>
          {[
            ['Headache', 'Mild, dull', 'Severe, sudden, constant'],
            ['Neck stiffness', 'Absent', 'Almost always present'],
            ['Light sensitivity', 'Mild', 'Intense, distressing'],
            ['Deterioration', 'Gradual over days', 'Hours — can be rapid'],
            ['Rash', 'May be present', 'Non-blanching spots'],
          ].map(([symptom, fever, meningitis]) => (
            <div key={symptom} className="grid grid-cols-3 px-4 py-3 border-t border-slate-100 bg-white">
              <p className="text-sm font-semibold text-slate-700">{symptom}</p>
              <p className="text-sm text-amber-700">{fever}</p>
              <p className="text-sm text-red-700 font-medium">{meningitis}</p>
            </div>
          ))}
        </div>

        <h2>What to do if you suspect meningitis</h2>

        <p>
          <strong>Do not wait to see if it improves.</strong> Meningitis is not a wait-and-watch situation. If you see a combination of severe headache, fever, and neck stiffness — particularly in a child or young adult — go to hospital immediately. Tell the healthcare staff you are concerned about meningitis. Those words will ensure the person is seen urgently.
        </p>

        <p>
          In hospital, the diagnosis is confirmed with a lumbar puncture (spinal tap) — a procedure where a small sample of the fluid surrounding the spinal cord is tested. Blood cultures are also taken. Treatment for bacterial meningitis is intravenous antibiotics, started as soon as possible. Every hour of delay worsens the outcome.
        </p>

        <h2>Vaccines available in India</h2>

        <p>
          This is an area where awareness is genuinely low in India. Vaccines against the most common causes of bacterial meningitis are available but not yet part of the national immunisation schedule.
        </p>

        {/* Vaccines card */}
        <div className="not-prose rounded-xl border border-teal-200 bg-teal-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-4">Vaccines available in India 💉</p>
          <div className="flex flex-col gap-4">
            {[
              {
                name: 'Pneumococcal vaccine',
                brands: 'PCV13 / PCV15 / PPSV23',
                protects: 'Streptococcus pneumoniae — the leading cause of bacterial meningitis in India',
                who: 'All children, adults over 65, anyone with chronic illness or weakened immunity',
                note: 'PCV13 available at many government hospitals at subsidised rates',
              },
              {
                name: 'Meningococcal vaccine',
                brands: 'MenACWY',
                protects: 'Neisseria meningitidis serogroups A, C, W & Y',
                who: 'Adolescents, Hajj & Umrah pilgrims (mandatory), travellers to high-risk regions',
                note: 'Mandatory for Saudi Arabia travel',
              },
              {
                name: 'Hib vaccine',
                brands: 'Part of Pentavalent vaccine',
                protects: 'Haemophilus influenzae type b',
                who: 'Infants — already in Universal Immunisation Programme',
                note: 'Ensure all scheduled infant doses are completed',
              },
            ].map(({ name, brands, protects, who, note }) => (
              <div key={name} className="bg-white rounded-lg border border-teal-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-slate-800">{name}</p>
                  <span className="text-xs bg-teal-100 text-teal-700 font-semibold px-2 py-0.5 rounded-full shrink-0">{brands}</span>
                </div>
                <p className="text-xs text-slate-600 mb-1"><span className="font-semibold">Protects against:</span> {protects}</p>
                <p className="text-xs text-slate-600 mb-1"><span className="font-semibold">Recommended for:</span> {who}</p>
                <p className="text-xs text-teal-700 font-medium mt-2">ℹ️ {note}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>A note on antibiotic use</h2>

        <p>
          Bacterial meningitis requires immediate intravenous antibiotics — not oral tablets bought from a chemist. If you suspect meningitis, please do not attempt to treat it at home with leftover antibiotics. The causative bacteria need to be identified first through culture testing, so the correct antibiotic can be chosen. Self-medicating can also mask symptoms and delay accurate diagnosis.
        </p>

        <h2>The bottom line</h2>

        <p>
          Meningitis is uncommon, but it is serious enough that every Indian family should know its warning signs. The combination of sudden severe headache, high fever, neck stiffness, and light sensitivity in any person — especially a child, teenager, or young adult — should be treated as an emergency until proven otherwise. If in doubt, go to hospital. It is always better to be wrong than to wait too long.
        </p>

        <p>
          Speak to your doctor about meningitis vaccines, particularly if you have young children, elderly family members, or anyone travelling for Hajj. Prevention, when available, is always better than treatment.
        </p>
      </BlogPostLayout>
    </>
  )
}
