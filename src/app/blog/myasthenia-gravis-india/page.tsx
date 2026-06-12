import type { Metadata } from 'next'
import BlogPostLayout from '@/components/BlogPostLayout'

const _title = 'Myasthenia Gravis: Treatment and the Medicines to Avoid'
const _desc = 'MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis. Here is what every patient and carer needs to know.'
const _ogImage = 'https://drdmedcare.com/og/myasthenia-gravis-india.jpg'

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: {
    title: _title,
    description: _desc,
    type: 'article',
    url: 'https://drdmedcare.com/blog/myasthenia-gravis-india',
    images: [{ url: _ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: _title,
    description: _desc,
    images: [_ogImage],
  },
  alternates: { canonical: '/blog/myasthenia-gravis-india' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Myasthenia Gravis: Understanding the Disease, the Treatment, and the Medicines to Avoid',
  description: 'MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis.',
  author: { '@type': 'Person', name: 'Dr Priyanka Deventhiran', jobTitle: 'Clinical Pharmacist' },
  publisher: { '@type': 'Organization', name: "Dr D's MedCare", url: 'https://drdmedcare.com' },
  datePublished: '2026-06-02',
  url: 'https://drdmedcare.com/blog/myasthenia-gravis-india',
  image: 'https://drdmedcare.com/og/myasthenia-gravis-india.jpg',
  inLanguage: 'en-IN',
  keywords: 'myasthenia gravis India, myasthenia gravis treatment, myasthenia gravis medicines avoid, myasthenic crisis, pyridostigmine India',
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostLayout
        title="Myasthenia Gravis: Understanding the Disease, the Treatment, and the Medicines to Avoid"
        excerpt="MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis. Here is what every patient and carer needs to know."
        category="Education"
        readTime="7 min read"
        date="June 2026"
      >
        <p>
          Imagine waking up one morning with eyelids too heavy to fully open. By afternoon, your voice sounds nasal and chewing through a meal leaves you exhausted. By evening, you feel almost normal again. The next day, it starts over.
        </p>
        <p>
          This fluctuating, activity-dependent weakness - worse with effort, better with rest - is the hallmark of myasthenia gravis (MG). It is one of the most misunderstood conditions in neurology. In India, it is frequently mistaken for fatigue, thyroid problems, or cervical spondylosis for months or even years before the correct diagnosis is made.
        </p>
        <p>
          More than almost any other chronic condition, MG demands careful medication management. The treatment itself is complex, but what makes MG particularly dangerous is a long list of common medicines - antibiotics, antacids, eye drops, heart medicines - that can silently worsen the disease or trigger a life-threatening crisis in someone who is otherwise stable.
        </p>

        <h2>What happens in the body</h2>
        <p>
          Normally, when your brain wants a muscle to move, it sends a signal down a nerve. At the nerve ending, a chemical called acetylcholine is released, crosses a tiny gap, and attaches to receptors on the muscle to trigger movement. In myasthenia gravis, the immune system produces antibodies that attack and block these acetylcholine receptors. Fewer receptors mean weaker signals, and weaker signals mean weaker muscles.
        </p>
        <p>
          The weakness is not constant because the nerve keeps releasing acetylcholine. But the more you use a muscle, the more the available acetylcholine is depleted, and the weaker the muscle gets. Rest allows it to build up again, which is why patients often feel better in the morning and weaker as the day goes on.
        </p>
        <p>
          In most patients, the antibodies target the acetylcholine receptor (AChR). In a smaller group, they target a protein called MuSK (muscle-specific kinase). A third group is described as seronegative - the antibodies are present but current tests cannot detect them. This matters because treatment response can differ between these groups.
        </p>

        {/* Ocular vs Generalised */}
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="text-2xl mb-2">👁️</div>
            <p className="text-sm font-bold text-amber-800 mb-1">Ocular MG - 15% of patients</p>
            <p className="text-sm text-amber-700 leading-relaxed">Weakness confined only to the eyelids and eye muscles. No other muscles affected. Some patients remain in this form permanently.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <div className="text-2xl mb-2">💪</div>
            <p className="text-sm font-bold text-violet-800 mb-1">Generalised MG - 85% of patients</p>
            <p className="text-sm text-violet-700 leading-relaxed">Weakness spreads to the face, throat, neck, and limbs. In severe cases, breathing muscles are affected.</p>
          </div>
        </div>

        <h2>Symptoms to look out for</h2>
        <p>
          MG can affect any voluntary muscle, but certain muscles are involved far more commonly than others. The pattern of weakness is characteristic: it worsens with repeated use and improves with rest.
        </p>

        {/* Symptom cards */}
        <div className="not-prose rounded-xl border-2 border-violet-200 bg-violet-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4">Common symptoms of MG</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: '👁️', label: 'Drooping eyelids (ptosis)', note: 'Often worse in the evening or after prolonged screen use' },
              { icon: '👀', label: 'Double vision (diplopia)', note: 'Caused by weakness in the eye-movement muscles' },
              { icon: '🗣️', label: 'Nasal or slurred voice', note: 'Particularly after talking for a while' },
              { icon: '🍽️', label: 'Difficulty swallowing', note: 'Choking or fatigue at the end of meals' },
              { icon: '🦾', label: 'Proximal limb weakness', note: 'Trouble climbing stairs, lifting arms, rising from a chair' },
              { icon: '🙆', label: 'Neck weakness', note: 'Difficulty holding the head up, especially by afternoon' },
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
          MG does not cause pain, numbness, tingling, or problems with bladder or bowel function. If those symptoms are present, another diagnosis should be considered.
        </p>

        <h2>How MG is diagnosed</h2>
        <p>
          Diagnosis is made by a neurologist and involves a combination of clinical assessment, blood tests, and electrical studies. The key investigations are:
        </p>

        {/* Diagnosis cards */}
        <div className="not-prose rounded-xl border border-slate-200 overflow-hidden my-6">
          <div className="bg-slate-100 px-5 py-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Diagnostic investigations</p>
          </div>
          {[
            {
              test: 'AChR antibody blood test',
              detail: 'Positive in ~85% of generalised MG and ~50% of ocular MG. A positive result is highly specific for the diagnosis.',
              tag: 'First-line',
              tagColor: 'bg-violet-100 text-violet-700',
            },
            {
              test: 'Anti-MuSK antibody test',
              detail: 'Ordered for patients who are AChR-antibody negative.',
              tag: 'Second-line',
              tagColor: 'bg-amber-100 text-amber-700',
            },
            {
              test: 'Repetitive nerve stimulation (RNS) / Single-fibre EMG',
              detail: 'Electrophysiological tests that demonstrate the characteristic fatiguable weakness. Single-fibre EMG is the most sensitive test available.',
              tag: 'Specialist',
              tagColor: 'bg-slate-100 text-slate-600',
            },
            {
              test: 'CT scan of the chest',
              detail: 'To check for a thymoma (thymus gland tumour), which is found in 10–15% of MG patients and requires surgical removal.',
              tag: 'All patients',
              tagColor: 'bg-teal-100 text-teal-700',
            },
            {
              test: 'The ice pack test',
              detail: 'A simple bedside test for ptosis. Applying an ice pack to the drooping eyelid for two minutes temporarily improves neuromuscular transmission. Improvement points towards MG.',
              tag: 'Bedside',
              tagColor: 'bg-blue-100 text-blue-700',
            },
          ].map(({ test, detail, tag, tagColor }) => (
            <div key={test} className="flex items-start gap-4 px-5 py-4 border-t border-slate-100 bg-white">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-sm font-semibold text-slate-800">{test}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${tagColor}`}>{tag}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>The medicines used to treat MG</h2>
        <p>
          Treatment has two goals: relieve symptoms in the short term, and suppress the underlying autoimmune process in the long term. The two are usually managed together.
        </p>

        {/* Treatment medicines */}
        <div className="not-prose rounded-xl border border-teal-200 bg-teal-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-4">Treatment medicines in MG</p>
          <div className="flex flex-col gap-4">
            {[
              {
                name: 'Pyridostigmine (Mestinon)',
                type: 'Symptomatic',
                how: 'Blocks the enzyme that breaks down acetylcholine, letting more of it accumulate. Effect lasts 3–4 hours. Taken multiple times a day.',
                note: 'Dose must be carefully calibrated. Too much can paradoxically worsen weakness - a condition called cholinergic crisis.',
                tagColor: 'bg-teal-200 text-teal-800',
              },
              {
                name: 'Prednisolone (corticosteroids)',
                type: 'Immunosuppressant',
                how: 'Most widely used immunosuppressive in India. Effective but carries a burden of side effects with long-term use: weight gain, blood sugar elevation, bone loss.',
                note: 'Important: weakness may transiently worsen in the first 2–3 weeks of starting steroids before it improves. This is expected, not treatment failure.',
                tagColor: 'bg-amber-100 text-amber-800',
              },
              {
                name: 'Azathioprine',
                type: 'Steroid-sparing agent',
                how: 'Started alongside steroids to allow eventual dose reduction. Takes 3–12 months to show full effect.',
                note: 'Regular blood count and liver function monitoring is mandatory during treatment.',
                tagColor: 'bg-slate-100 text-slate-700',
              },
              {
                name: 'IVIG / Plasma exchange',
                type: 'Crisis management',
                how: 'Rapid interventions for myasthenic crisis or before surgery. Work within days but the effect lasts only a few weeks.',
                note: 'Bridges rather than long-term treatments.',
                tagColor: 'bg-red-100 text-red-700',
              },
              {
                name: 'Thymectomy',
                type: 'Surgery',
                how: 'Removal of the thymus gland. Recommended for all patients with thymoma. Also recommended for AChR-positive generalised MG under age 65.',
                note: 'Improves long-term outcomes and reduces medication requirements over time.',
                tagColor: 'bg-violet-100 text-violet-700',
              },
            ].map(({ name, type, how, note, tagColor }) => (
              <div key={name} className="bg-white rounded-lg border border-teal-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-slate-800">{name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${tagColor}`}>{type}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{how}</p>
                <p className="text-xs text-teal-700 font-medium">ℹ️ {note}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Medicines that can worsen MG - the critical list</h2>
        <p>
          This is the section that matters most from a medication safety perspective, and the one most often overlooked in routine care. Many common medicines prescribed for entirely different conditions can exacerbate MG or precipitate a crisis. Patients must be aware of this risk every time a new medicine is prescribed.
        </p>

        {/* Medicines to avoid - main visual */}
        <div className="not-prose rounded-xl border-2 border-red-200 bg-red-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">⚠️ Medicines to avoid or use with extreme caution</p>

          <div className="flex flex-col gap-3">
            {[
              {
                category: 'Aminoglycoside antibiotics',
                examples: 'Gentamicin, amikacin, tobramycin',
                risk: 'Absolutely contraindicated. Impair acetylcholine release at the neuromuscular junction. Even a single IV dose can cause acute, severe worsening.',
                level: 'Avoid completely',
                levelColor: 'bg-red-600 text-white',
                rowColor: 'bg-red-100 border-red-200',
              },
              {
                category: 'Fluoroquinolone antibiotics',
                examples: 'Ciprofloxacin, levofloxacin, ofloxacin',
                risk: 'Among the most prescribed antibiotics in India for UTI and chest infections. All carry a documented risk of worsening MG. Inform your neurologist before any antibiotic course.',
                level: 'Avoid if possible',
                levelColor: 'bg-red-500 text-white',
                rowColor: 'bg-red-50 border-red-200',
              },
              {
                category: 'Macrolide antibiotics',
                examples: 'Azithromycin, erythromycin, clarithromycin',
                risk: 'Documented risk of neuromuscular junction impairment. Commonly prescribed for respiratory infections.',
                level: 'Avoid if possible',
                levelColor: 'bg-red-500 text-white',
                rowColor: 'bg-red-50 border-red-200',
              },
              {
                category: 'Magnesium (all forms)',
                examples: 'Magnesium-containing antacids (Gelusil, Digene), laxatives, IV magnesium',
                risk: 'Can significantly worsen MG. Many popular Indian antacids contain magnesium hydroxide. Patients admitted to hospital for any reason should inform staff that magnesium is contraindicated.',
                level: 'Avoid completely',
                levelColor: 'bg-red-600 text-white',
                rowColor: 'bg-red-100 border-red-200',
              },
              {
                category: 'Beta-blockers',
                examples: 'Propranolol, atenolol, metoprolol, bisoprolol',
                risk: 'Widely used for hypertension and heart disease. Can impair neuromuscular transmission. Associated with crisis in MG patients. If genuinely needed, decision must involve the neurologist.',
                level: 'Use with caution',
                levelColor: 'bg-orange-500 text-white',
                rowColor: 'bg-orange-50 border-orange-200',
              },
              {
                category: 'Statins',
                examples: 'Atorvastatin, rosuvastatin, simvastatin',
                risk: 'Can cause myopathy that mimics or aggravates MG weakness. Any new muscle weakness after starting a statin requires immediate review.',
                level: 'Use with caution',
                levelColor: 'bg-orange-500 text-white',
                rowColor: 'bg-orange-50 border-orange-200',
              },
              {
                category: 'Chloroquine / Hydroxychloroquine',
                examples: 'Used for malaria, lupus, rheumatoid arthritis',
                risk: 'Known to worsen MG. Should be avoided or used only after careful neurological review.',
                level: 'Avoid if possible',
                levelColor: 'bg-red-500 text-white',
                rowColor: 'bg-red-50 border-red-200',
              },
              {
                category: 'Iodinated contrast (CT / X-ray dye)',
                examples: 'Used in contrast CT scans, some angiograms',
                risk: 'Can precipitate acute worsening. The radiologist and anaesthetist must be informed of the MG diagnosis before any contrast procedure.',
                level: 'Inform team first',
                levelColor: 'bg-amber-500 text-white',
                rowColor: 'bg-amber-50 border-amber-200',
              },
              {
                category: 'Anaesthetic agents',
                examples: 'Vecuronium, rocuronium, succinylcholine',
                risk: 'Neuromuscular blocking agents used in surgery have exaggerated and prolonged effects in MG. The anaesthetist must always be told about the MG diagnosis before any surgery, even minor procedures.',
                level: 'Inform anaesthetist',
                levelColor: 'bg-amber-500 text-white',
                rowColor: 'bg-amber-50 border-amber-200',
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
          <p className="text-xs text-red-700 font-semibold mt-4">
            The general rule: if you have MG and are prescribed any new medicine - including over-the-counter products, antacids, eye drops, or supplements - check with your neurologist or clinical pharmacist before starting it.
          </p>
        </div>

        <h2>Myasthenic crisis: know when to go to hospital</h2>
        <p>
          A myasthenic crisis is a medical emergency defined by respiratory muscle weakness severe enough to require ventilatory support. It can develop over hours or days and is triggered by infection, surgery, missed medication, or the wrong medicine.
        </p>

        {/* Crisis warning card */}
        <div className="not-prose rounded-xl border border-red-200 bg-red-50 p-6 my-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">🚨 Warning signs of a developing crisis</p>
          <div className="flex flex-col gap-3">
            {[
              { icon: '😮‍💨', text: 'Increasing difficulty breathing, especially when lying flat' },
              { icon: '🤐', text: 'Worsening difficulty swallowing with risk of choking' },
              { icon: '😶', text: 'Weak cough that cannot clear secretions' },
              { icon: '💬', text: 'Speaking or breathing requires unusual effort' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-red-100">
                <span className="text-xl shrink-0">{icon}</span>
                <p className="text-sm font-medium text-slate-800">{text}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-4 border-l-4 border-red-400 pl-4">
            <p className="text-sm font-semibold text-red-800">If any of these appear, go directly to a hospital with a neurology or ICU. This is not a wait-and-see situation.</p>
          </blockquote>
        </div>

        <h2>Living with MG</h2>
        <p>
          Unlike many chronic conditions where missing a dose is inconvenient but not immediately dangerous, pyridostigmine is time-sensitive. Missing a dose means the acetylcholine at the neuromuscular junction is not being protected, and weakness returns quickly. Time your doses around your day.
        </p>

        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {[
            {
              icon: '⏰',
              title: 'Dose timing matters',
              text: 'Take pyridostigmine 30 minutes before meals to ensure adequate swallowing strength. Set fixed alarms for every dose.',
            },
            {
              icon: '🌡️',
              title: 'Heat worsens MG',
              text: 'Hot weather, hot baths, and fever all impair neuromuscular transmission. Stay cool, especially during summer. Treat fevers promptly with MG-safe medicines.',
            },
            {
              icon: '🛌',
              title: 'Rest is therapeutic',
              text: 'Physical and emotional stress, sleep deprivation, and overexertion can all trigger worsening. Learn your body\'s patterns and build in rest.',
            },
            {
              icon: '🩺',
              title: 'Tell every healthcare provider',
              text: 'Before any consultation, procedure, or prescription - inform the provider you have MG. A medical alert ID is worth wearing.',
            },
          ].map(({ icon, title, text }) => (
            <div key={title} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-sm font-bold text-slate-800 mb-1">{title}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <h2>Why medication review matters in MG</h2>
        <p>
          Patients with MG are, by necessity, on multiple medicines. Often a symptomatic agent, one or two immunosuppressants, and additional medicines to manage the side effects of those immunosuppressants (calcium and vitamin D for bone protection during steroid use, for example). Many will also have separate conditions - hypertension, diabetes, thyroid disorders - with their own medications.
        </p>
        <p>
          In this context, a full medication review by a clinical pharmacist is a practical safeguard, not a luxury. The aim is to ensure that every medicine being taken is necessary, appropriately dosed, and compatible with the MG diagnosis. It is also an opportunity to flag anything in the regimen that carries MG-specific risk and to review medicines that may have been continued out of habit long after they were needed.
        </p>
        <p>
          If you or a family member has been diagnosed with MG and would like a structured review of your medicines, that is exactly the kind of session Dr D's MedCare offers.
        </p>

      </BlogPostLayout>
    </>
  )
}
