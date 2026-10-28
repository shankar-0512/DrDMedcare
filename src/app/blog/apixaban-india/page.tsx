import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

const _title = 'Apixaban: Dose, Interactions, and Contraindications Explained'
const _desc = "Apixaban is one of the most widely prescribed blood thinners in India. No INR monitoring needed - but the dose, the interactions, and the contraindications matter just as much as they did with warfarin. Here's what every patient should know."
const _ogImage = 'https://drdmedcare.com/og/apixaban-india.jpg'

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: {
    title: _title,
    description: _desc,
    type: 'article',
    url: 'https://drdmedcare.com/blog/apixaban-india',
    images: [{ url: _ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _desc,
    images: [_ogImage],
  },
  alternates: {
    canonical: '/blog/apixaban-india',
    languages: { 'en-IN': '/blog/apixaban-india' },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Apixaban: Dose, Interactions, and Contraindications Every Patient Should Know',
  description: _desc,
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://drdmedcare.com' },
  datePublished: '2026-07-08',
  url: 'https://drdmedcare.com/blog/apixaban-india',
  image: _ogImage,
  inLanguage: 'en-IN',
  keywords: 'apixaban India, apixaban dose, blood thinner India, apixaban vs warfarin, atrial fibrillation medicine, DVT PE treatment, apixaban side effects',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
        title="Apixaban: Dose, Interactions, and Contraindications Every Patient Should Know"
        excerpt={_desc}
        category="Education"
        readTime="8 min read"
        date="July 2026"
      >
        <p>
          If you or someone in your family has been started on apixaban, it is almost certainly because of atrial fibrillation, a blood clot in the leg or lung, or a recent hip or knee replacement. It is now one of the most commonly prescribed blood thinners in the country, and for good reason: it works well, and unlike its predecessor warfarin, it does not need regular blood test monitoring.
        </p>
        <p>
          But &quot;no monitoring needed&quot; does not mean &quot;nothing to think about.&quot; Apixaban still carries a real bleeding risk, still interacts with a specific set of medicines, and still requires the correct dose for your age, weight, and kidney function. This article covers what every patient on apixaban - and every caregiver - should understand.
        </p>

        <h2>What apixaban is and how it works</h2>
        <p>
          Apixaban belongs to a class of medicines called direct oral anticoagulants (DOACs), sometimes still referred to as NOACs (novel oral anticoagulants). It works by directly blocking a clotting protein called Factor Xa, which sits at a key junction in the clotting cascade. Block Factor Xa, and the body cannot generate the thrombin needed to form a clot as easily.
        </p>
        <p>
          This is a fundamentally different mechanism from warfarin, which has been the standard blood thinner for over 60 years.
        </p>

        {/* Old way vs new way */}
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-2xl mb-2">🧪</div>
            <p className="text-sm font-bold text-slate-800 mb-1">Warfarin - the old way</p>
            <p className="text-sm text-slate-600 leading-relaxed">Blocks vitamin K-dependent clotting factors. Effect varies with diet, other medicines, and genetics. Needs regular INR blood tests to stay in a safe range.</p>
          </div>
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm font-bold text-teal-800 mb-1">Apixaban - the newer way</p>
            <p className="text-sm text-teal-700 leading-relaxed">Directly and predictably blocks Factor Xa. Fixed dosing, no routine blood monitoring, far fewer food interactions.</p>
          </div>
        </div>

        <h2>Why apixaban is prescribed</h2>
        <p>
          Apixaban is approved for four main situations, and your dose depends on which one applies to you.
        </p>

        <div className="not-prose rounded-xl border border-slate-200 overflow-hidden my-6">
          <div className="bg-slate-100 px-5 py-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Approved uses</p>
          </div>
          {[
            { icon: '❤️', use: 'Stroke prevention in non-valvular atrial fibrillation', detail: 'The most common reason apixaban is prescribed. AF causes blood to pool in the heart, raising the risk of a clot travelling to the brain. Apixaban is not used for AF caused by a mechanical heart valve or significant mitral valve disease - warfarin remains standard there.' },
            { icon: '🩸', use: 'Treating a DVT or PE', detail: 'A clot in a deep leg vein (DVT) or in the lungs (pulmonary embolism, PE). Apixaban dissolves the clot risk going forward while the body reabsorbs the existing clot.' },
            { icon: '🔁', use: 'Preventing a repeat DVT or PE', detail: 'After an initial course of treatment, a lower dose is often continued long-term to prevent recurrence.' },
            { icon: '🦴', use: 'After hip or knee replacement surgery', detail: 'A short course to prevent DVT during the high-risk weeks of reduced mobility after major orthopaedic surgery.' },
          ].map(({ icon, use, detail }) => (
            <div key={use} className="flex items-start gap-4 px-5 py-4 border-t border-slate-100 bg-white">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{use}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Getting the dose right</h2>
        <p>
          This is the single most important thing to get right with apixaban - and the detail most likely to be overlooked. The correct dose depends on why it was prescribed, and in atrial fibrillation, on your age, weight, and kidney function as well.
        </p>

        <div className="not-prose rounded-xl border border-teal-200 bg-teal-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-4">Standard dosing by indication</p>
          <div className="flex flex-col gap-4">
            {[
              {
                name: 'Atrial fibrillation - stroke prevention',
                dose: '5 mg twice daily',
                note: 'Long-term, usually lifelong unless your doctor advises otherwise.',
                tagColor: 'bg-teal-200 text-teal-800',
              },
              {
                name: 'DVT or PE - initial treatment',
                dose: '10 mg twice daily for 7 days, then 5 mg twice daily',
                note: 'The higher dose in the first week clears the existing clot faster.',
                tagColor: 'bg-amber-100 text-amber-800',
              },
              {
                name: 'DVT or PE - long-term prevention of recurrence',
                dose: '2.5 mg twice daily',
                note: 'Usually started after 6 months of full-dose treatment, if continued therapy is needed.',
                tagColor: 'bg-slate-100 text-slate-700',
              },
              {
                name: 'After hip or knee replacement',
                dose: '2.5 mg twice daily',
                note: 'Started 12-24 hours after surgery; continued for 35 days (hip) or 12 days (knee).',
                tagColor: 'bg-violet-100 text-violet-700',
              },
            ].map(({ name, dose, note, tagColor }) => (
              <div key={name} className="bg-white rounded-lg border border-teal-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-slate-800">{name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${tagColor}`}>{dose}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <p>
          For atrial fibrillation specifically, the dose is reduced to <strong>2.5 mg twice daily</strong> if you meet <strong>at least two</strong> of the following three criteria. This is sometimes called the &quot;2 of 3&quot; rule, and it exists because these factors raise blood levels of the drug and, with them, bleeding risk.
        </p>

        <div className="not-prose rounded-xl border-2 border-amber-200 bg-amber-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">⚖️ Reduced-dose criteria (meet 2 of 3)</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: '🎂', label: 'Age', value: '80 years or older' },
              { icon: '⚖️', label: 'Body weight', value: '60 kg or less' },
              { icon: '🧪', label: 'Serum creatinine', value: '1.5 mg/dL or higher' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-lg p-4 border border-amber-100 text-center">
                <span className="text-xl">{icon}</span>
                <p className="text-xs font-bold text-slate-800 mt-1">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-800 font-medium mt-4">
            Meeting only one of these does not usually warrant the lower dose on its own. Severe kidney impairment can also require dose adjustment independently of this rule - your doctor factors this in when prescribing.
          </p>
        </div>

        <h2>Apixaban vs warfarin - what&apos;s actually different</h2>
        <p>
          If you or a family member has switched from warfarin, or you are simply curious why apixaban is now preferred for most patients, this comparison covers the practical differences.
        </p>

        <div className="not-prose rounded-xl border border-slate-200 overflow-hidden my-6">
          <div className="grid grid-cols-3 bg-slate-100 px-4 py-2.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Factor</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Warfarin</p>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wide">Apixaban</p>
          </div>
          {[
            ['Blood test monitoring', 'Regular INR checks needed', 'None needed'],
            ['Diet restrictions', 'Vitamin K-rich foods affect it', 'No significant food interactions'],
            ['Onset of action', 'Slow - takes days to reach effect', 'Fast - within 3-4 hours'],
            ['Dose adjustment', 'Frequent, based on INR', 'Fixed, rarely changed'],
            ['Reversal in emergency', 'Vitamin K, readily available', 'Supportive care and clotting factor concentrates; a specific antidote exists but access varies'],
          ].map(([factor, warfarin, apixaban]) => (
            <div key={factor} className="grid grid-cols-3 px-4 py-3 border-t border-slate-100 bg-white">
              <p className="text-sm font-semibold text-slate-700">{factor}</p>
              <p className="text-sm text-slate-500">{warfarin}</p>
              <p className="text-sm text-teal-700 font-medium">{apixaban}</p>
            </div>
          ))}
        </div>

        <p>
          The absence of routine monitoring is convenient, but it cuts both ways: with warfarin, a blood test would eventually flag a problem. With apixaban, there is no equivalent early warning system - which makes taking the correct dose, at the correct times, without missed or doubled doses, even more important.
        </p>
        <p>
          On reversal specifically: a targeted antidote for apixaban (andexanet alfa) is authorised for use in India, but its role is under active reassessment - it was withdrawn from the US market in December 2025 after post-marketing data linked it to an increased rate of clotting complications. In practice, major bleeding on apixaban is still managed primarily with supportive care and, where needed, clotting factor concentrates, regardless of whether the specific antidote is used.
        </p>

        <h2>If you miss a dose</h2>
        <ul>
          <li>If it has been <strong>less than 6 hours</strong> since your missed dose was due, take it as soon as you remember, then continue your normal twice-daily schedule.</li>
          <li>If <strong>more than 6 hours</strong> have passed, skip the missed dose entirely and take your next scheduled dose at the usual time - do not take two doses together to make up for it.</li>
          <li>Never double up. Taking extra apixaban to &quot;catch up&quot; meaningfully raises bleeding risk without adding protection.</li>
          <li>If you frequently forget doses, mention this to your doctor or pharmacist - alarms, pill organisers, or a change in regimen can help.</li>
        </ul>

        <h2>Signs of bleeding - what to watch for</h2>
        <p>
          Some minor bruising and slightly longer bleeding from small cuts is expected on any blood thinner. The signs below are different - they need prompt medical attention.
        </p>

        <div className="not-prose rounded-xl border-2 border-red-200 bg-red-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">🚨 Seek medical attention promptly</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: '🩹', label: 'Bruising without injury', note: 'Especially large or spreading bruises' },
              { icon: '🚽', label: 'Pink, red, or brown urine', note: 'A sign of blood in the urine' },
              { icon: '💩', label: 'Black, tarry, or bloody stools', note: 'Can indicate bleeding in the gut' },
              { icon: '🤮', label: 'Vomiting blood or coffee-ground material', note: 'Requires emergency care' },
              { icon: '🩸', label: 'Nosebleeds or gum bleeding that won\'t stop', note: 'Prolonged beyond the usual few minutes' },
              { icon: '🩷', label: 'Unusually heavy periods', note: 'Or bleeding between cycles' },
            ].map(({ icon, label, note }) => (
              <div key={label} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-red-100">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
          <blockquote className="mt-4 border-l-4 border-red-400 pl-4">
            <p className="text-sm font-semibold text-red-800">A sudden severe headache, confusion, slurred speech, or a serious fall or head injury needs emergency care immediately - these can indicate bleeding in the brain.</p>
          </blockquote>
        </div>

        <h2>Medicines and supplements that interact</h2>
        <p>
          A handful of common medicines and supplements meaningfully change how apixaban behaves in the body - either raising bleeding risk or reducing its effectiveness. Always tell every prescriber and pharmacist that you are on apixaban before starting anything new, including over-the-counter products.
        </p>

        <div className="not-prose rounded-xl border-2 border-red-200 bg-red-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">⚠️ Interactions to be aware of</p>
          <div className="flex flex-col gap-3">
            {[
              {
                category: 'NSAIDs and aspirin',
                examples: 'Ibuprofen, diclofenac, naproxen, aspirin',
                risk: 'Widely used for pain and fever in India, often bought without a prescription. Combined with apixaban, they significantly raise bleeding risk, particularly gut bleeding. Use paracetamol for pain relief instead unless your doctor specifically advises otherwise.',
                level: 'Avoid unless advised',
                levelColor: 'bg-red-500 text-white',
                rowColor: 'bg-red-50 border-red-200',
              },
              {
                category: 'Other blood thinners or antiplatelets',
                examples: 'Clopidogrel, warfarin, heparin, other DOACs',
                risk: 'Combining anticoagulants or antiplatelets is sometimes medically necessary (for example, after a heart stent) but must always be a deliberate, monitored decision - never accidental duplication.',
                level: 'Doctor-supervised only',
                levelColor: 'bg-amber-500 text-white',
                rowColor: 'bg-amber-50 border-amber-200',
              },
              {
                category: 'Strong CYP3A4 and P-gp inhibitors',
                examples: 'Ketoconazole, itraconazole, ritonavir, clarithromycin',
                risk: 'These raise apixaban blood levels substantially by slowing its breakdown, increasing bleeding risk. Often needs dose adjustment or avoidance - flag apixaban use before starting any of these.',
                level: 'Avoid or dose-adjust',
                levelColor: 'bg-red-500 text-white',
                rowColor: 'bg-red-50 border-red-200',
              },
              {
                category: 'Strong enzyme inducers',
                examples: 'Rifampicin, phenytoin, carbamazepine, St John\'s Wort',
                risk: 'These lower apixaban blood levels, which can silently reduce protection against stroke or clots. The combination is generally avoided.',
                level: 'Avoid combination',
                levelColor: 'bg-red-600 text-white',
                rowColor: 'bg-red-100 border-red-200',
              },
              {
                category: 'SSRIs and SNRIs',
                examples: 'Sertraline, escitalopram, venlafaxine',
                risk: 'Commonly prescribed antidepressants that independently increase bleeding risk when combined with anticoagulants. Not a reason to avoid either medicine, but worth being aware of.',
                level: 'Use with awareness',
                levelColor: 'bg-orange-500 text-white',
                rowColor: 'bg-orange-50 border-orange-200',
              },
            ].map(({ category, examples, risk, level, levelColor, rowColor }) => (
              <div key={category} className={`rounded-lg border p-4 ${rowColor}`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-bold text-slate-800">{category}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${levelColor}`}>{level}</span>
                </div>
                <p className="text-xs text-slate-500 mb-1.5 font-medium">Examples: {examples}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{risk}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Before surgery or dental work</h2>
        <p>
          Apixaban is usually stopped temporarily before planned surgery or invasive dental procedures, to reduce bleeding risk during and after the procedure. The exact timing - typically 24 to 48 hours beforehand, sometimes longer for higher-bleeding-risk procedures or reduced kidney function - is a decision for the prescribing doctor, made in coordination with the surgeon or dentist.
        </p>
        <div className="not-prose rounded-xl border border-amber-200 bg-amber-50/50 p-5 my-6">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Never stop apixaban on your own</strong>, even for a minor procedure. Stopping it without medical guidance removes your stroke or clot protection during the very window when you might assume it is safe to pause. Always inform your surgeon, dentist, and treating doctor that you are on apixaban well in advance, so a restart plan is agreed before you stop.
          </p>
        </div>

        <h2>Cost and access in India</h2>
        <p>
          Apixaban is available in India both as the original manufacturer&apos;s product and as several lower-cost generic versions. Generics contain the same active ingredient and are held to the same regulatory standards, but if you do switch between brands, mention it to your pharmacist - consistency matters for a medicine where dosing precision affects both clotting protection and bleeding risk. If cost is a barrier, ask your doctor or pharmacist about generic options rather than skipping or reducing doses on your own.
        </p>

        <h2>Living with apixaban</h2>
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {[
            {
              icon: '⏰',
              title: 'Keep dosing consistent',
              text: 'Take it at roughly the same two times every day, with or without food. A fixed routine - for example, with breakfast and dinner - reduces missed doses.',
            },
            {
              icon: '🪪',
              title: 'Carry a medical alert card',
              text: 'In an accident or emergency, first responders need to know you are on a blood thinner. A card, bracelet, or note in your phone can matter.',
            },
            {
              icon: '🩺',
              title: 'Tell every healthcare provider',
              text: 'Doctor, dentist, physiotherapist, even a new pharmacist for an unrelated prescription - all should know you are on apixaban.',
            },
            {
              icon: '🚫',
              title: 'Never stop it abruptly',
              text: 'Stopping apixaban suddenly - even to "take a break" - removes protection and has been linked to a rebound rise in clot risk. Any change must go through your doctor.',
            },
          ].map(({ icon, title, text }) => (
            <div key={title} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-sm font-bold text-slate-800 mb-1">{title}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <h2>Why a medication review matters</h2>
        <p>
          Patients on apixaban are frequently on several other medicines at the same time - for blood pressure, diabetes, cholesterol, or pain - and new prescriptions tend to arrive one at a time, from different doctors, without always being cross-checked against each other. A structured medication review looks at the whole list together: confirming the apixaban dose is correct for your age, weight, and kidney function, flagging anything that interacts, and making sure every provider treating you is aware you are on it.
        </p>
        <p>
          If you or a family member is on apixaban and would like that kind of review, that is exactly the kind of session Dr D&apos;s MedCare offers.
        </p>
      </BlogPostLayout>
    </>
  )
}
