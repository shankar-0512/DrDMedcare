# SEO Audit — Dr D's MedCare
**Audit date:** 2026-06-12  
**Target audience:** Indian patients searching in English  
**Auditor scope:** All `src/app/**/page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `next.config.ts`, JSON-LD schema, and en/em dash character sweep.

---

## 1. Page title and description table

Character counts are for the string as Google truncates it (title ~60 chars, description ~160 chars). Blog posts use the pattern `_title + " | Dr D's MedCare Blog"` (22-char suffix added automatically).

| Route | Title (as rendered in `<title>`) | Title chars | Status | Description chars | Status |
|---|---|---|---|---|---|
| `/` | Dr D's MedCare - Medication Counselling by a Clinical Pharmacist | **63** | ⚠️ Over | Confused about your prescription? Book a personalised medication counselling session with Dr Priyanka Deventhiran, Pharm D. Understand your medicines, interactions, and side effects. India only. | **196** | ❌ Too long |
| `/about` | About Dr Priyanka Deventhiran \| Dr D's MedCare | **47** | ✅ OK | Clinical pharmacist with a Pharm D from Tamil Nadu Dr. M.G.R. Medical University. Helping patients in India understand their medicines through personalised counselling sessions. | **176** | ⚠️ Slightly long |
| `/faq` | FAQ - Your Medication Counselling Questions Answered \| Dr D's MedCare | **70** | ❌ Over | What happens in a session? Do I need a prescription? How much does it cost? Common questions about booking a medication counselling session with Dr Priyanka Deventhiran. | **169** | ⚠️ Slightly long |
| `/book` | *(inherits root layout — same as homepage)* | — | ❌ No dedicated title | *(none)* | — | ❌ Missing |
| `/blog` | Blog \| Dr D's MedCare | **21** | ❌ Too short | Plain-language articles on medicines, drug interactions, medication adherence, and patient education for Indian patients. | **120** | ⚠️ Slightly short |
| `/blog/clinical-pharmacist-vs-pharmacist` | Clinical Pharmacist vs Pharmacist - What's the Difference? \| Dr D's MedCare Blog | **81** | ❌ Over | Both work with medicines - but their roles, training, and what they can do for you are very different. Here's what you need to know. | **132** | ⚠️ Short |
| `/blog/drug-food-interactions-india` | Common Drug-Food Interactions Every Indian Patient Should Know \| Dr D's MedCare Blog | **84** | ❌ Over | Dal, milk, banana, tea - everyday foods that can silently reduce or amplify the effect of your medicines. | **105** | ❌ Too short |
| `/blog/healthcare-professionals-india` | Who Does What in Indian Healthcare - A Simple Guide \| Dr D's MedCare Blog | **73** | ⚠️ Over | Doctor, specialist, pharmacist, clinical pharmacist, medication counsellor, nurse - each plays a distinct role. A quick guide to who does what in Indian healthcare. | **164** | ⚠️ Slightly long |
| `/blog/meningitis-symptoms-india` | Meningitis: Warning Signs Every Indian Family Must Know \| Dr D's MedCare Blog | **77** | ⚠️ Over | Bacterial meningitis can become life-threatening within 24 hours. Here's how to recognise it early, what to do, and which vaccines are available in India. | **154** | ✅ OK |
| `/blog/why-you-must-finish-antibiotics` | Why Stopping Antibiotics Midway Is Dangerous \| Dr D's MedCare Blog | **66** | ⚠️ Over | Feeling better doesn't mean the infection is gone. Here's what actually happens when you stop your antibiotic course early. | **124** | ⚠️ Short |
| `/blog/myasthenia-gravis-india` | Myasthenia Gravis: Treatment and the Medicines to Avoid \| Dr D's MedCare Blog | **77** | ⚠️ Over | MG is a rare autoimmune disease where muscle weakness is unpredictable, and where a common antibiotic or antacid can trigger a crisis. Here is what every patient and carer needs to know. | **187** | ❌ Too long |
| `/blog/how-to-use-blood-pressure-monitors-at-home-a-guide-for-beginners` | How to Use Blood Pressure Monitors at Home: A Guide for Beginners \| Dr D's MedCare Blog | **87** | ❌ Over | Monitoring your blood pressure at home is a simple yet powerful way to take control of your heart health. Learn how to choose a device, take accurate readings, and interpret results. | **183** | ❌ Too long |
| `/blog/why-i-started-drd-medcare` | Why I Became a Medication Counsellor \| Dr D's MedCare Blog | **58** | ✅ OK | A child died because nobody warned a mother about mixing cough syrup with milk. That moment changed everything for me. | **118** | ⚠️ Short |
| `/clinical` | *(inherits root — "Dr D's MedCare - Medication…")* | — | ❌ Missing | Clinical drug monographs for healthcare professionals... | **88** | ⚠️ Short |
| `/clinical/medroxyprogesterone-acetate` | *(inherits root)* | — | ❌ Missing | Comprehensive clinical drug monograph for medroxyprogesterone acetate (MPA)... | **79** | ⚠️ Short |
| `/legal/disclaimer` | *(inherits root)* | — | ❌ Missing | *(none)* | — | ❌ Missing |
| `/legal/privacy` | *(inherits root)* | — | ❌ Missing | *(none)* | — | ❌ Missing |
| `/legal/terms` | *(inherits root)* | — | ❌ Missing | *(none)* | — | ❌ Missing |

### Summary of title issues

- **3 pages have no dedicated title** (`/book`, `/clinical/*`, `/legal/*`) — they silently inherit the homepage title, which Google may use to rank wrong pages or generate confusing SERP snippets.
- **8 of 13 blog/content page titles exceed 60 characters** after the ` | Dr D's MedCare Blog` suffix. Google truncates these with "..." which wastes your India-signal keywords.
- **Blog index title** ("Blog | Dr D's MedCare") has no searchable keyword. It won't rank for anything.

### India keyword assessment per title

The question is: if someone in Chennai Googles "medication counselling Tamil Nadu" or "clinical pharmacist India", does the title give Google enough signal?

| Page | Has "India" / city / Indian-context keyword? |
|---|---|
| `/` | No explicit "India" — "Clinical Pharmacist" is generic |
| `/about` | No — just name |
| `/faq` | No |
| `/book` | *(no title)* |
| `/blog` | No |
| `/blog/drug-food-interactions-india` | ✅ "Indian Patient" in title |
| `/blog/healthcare-professionals-india` | ✅ "Indian Healthcare" |
| `/blog/meningitis-symptoms-india` | ✅ "Indian Family" |
| `/blog/clinical-pharmacist-vs-pharmacist` | No |
| `/blog/why-you-must-finish-antibiotics` | No |
| `/blog/myasthenia-gravis-india` | No |
| `/blog/how-to-use-blood-pressure-monitors` | No |
| `/blog/why-i-started-drd-medcare` | No |

**Recommendation:** Homepage and `/about` titles should include either "India" or "Chennai" explicitly. The homepage JSON-LD already has `areaServed: 'IN'` but the title does not reinforce this.

---

## 2. Meta description quality — India-context signals

Indian patient context means: UPI payment, regional languages (Tamil/Telugu/Hindi), Indian drug brand names, reference to "chemist" rather than "pharmacy", the 5-minute doctor problem, etc.

| Page | India signals present? | Key gaps |
|---|---|---|
| `/` | ✅ "India only" at end | Buried at end; UPI, language options not mentioned |
| `/about` | ✅ "patients in India" | No city/region, no language mention |
| `/faq` | ✅ Mentions "booking a session" — implicitly India | No UPI, no language, no "chemist" terminology |
| `/blog` | ✅ "Indian patients" | Fine but short |
| `/blog/drug-food-interactions-india` | ✅ Indian foods named (dal, curd, etc.) | Description just lists foods — doesn't say "book a session" or sell the value |
| `/blog/clinical-pharmacist-vs-pharmacist` | Partial — implied India context | No India signal in description |
| `/blog/myasthenia-gravis-india` | Partial | Description says "patient and carer" but no India signal |

**Gaps:**
- No description mentions UPI payment or session languages, which are the strongest trust-building differentiators for Indian patients.
- The `/faq` description could mention "Tamil, Telugu, Hindi sessions" to capture language-specific queries.

---

## 3. hreflang and geo-targeting

**Current state: None.**

Checked `next.config.ts`, `src/app/layout.tsx`, and `src/app/sitemap.ts`. There is no `hreflang` attribute, no `<link rel="alternate" hreflang="en-IN">` in the `<head>`, and no language alternates in the sitemap.

**Should you add it?**

The short answer is: yes, `hreflang="en-IN"` is worth adding, but it won't dramatically move the needle on its own.

**What `hreflang="en-IN"` does:** Tells Google that this page is written in English and is intended for users in India. It helps Google surface your pages specifically in Indian SERPs over `.com` English pages targeted at UK/US users.

**How to add it (two options):**

**Option A — In root layout (recommended for single-language sites):**
```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  ...
  alternates: {
    canonical: 'https://drdmedcare.com',
    languages: {
      'en-IN': 'https://drdmedcare.com',
    },
  },
}
```

**Option B — In sitemap.ts (more complete):**
```ts
// Each URL entry would need alternates — Next.js sitemap doesn't natively support hreflang
// You'd need to return raw XML or use a custom sitemap route
```

Option A is sufficient for this site. It sets the global hreflang at the root and each page inherits it unless it sets its own `alternates`.

**Note:** The language tag should be `en-IN` (English as spoken in India), not just `en`. This specifically tells Google "English-language content for India" rather than generic English.

---

## 4. Sitemap and robots audit

### `src/app/sitemap.ts`

**What it does well:**
- All public content pages are listed.
- Blog posts have accurate `lastModified` dates.
- Priority values are reasonable (1.0 homepage, 0.9 book, 0.6 blog posts).
- `changeFrequency` is sensible.

**Issues:**

1. **`lastModified: new Date()` on static pages.** Pages like `/about`, `/faq`, and `/legal/*` use `new Date()` which means every Vercel deploy updates their `lastModified` to today, even if the content hasn't changed. Google ignores sitemap dates that are always today. Fix: use hardcoded dates matching when those pages were last meaningfully updated.

2. **No hreflang alternates in sitemap.** For a multilingual-locale signal, each URL could include an `<xhtml:link rel="alternate" hreflang="en-IN" href="..." />`. The Next.js `MetadataRoute.Sitemap` type doesn't support this natively — you'd need a custom `app/sitemap.xml/route.ts` route handler returning raw XML.

3. **`/clinical/medroxyprogesterone-acetate/patient-leaflet` is in the sitemap at priority 0.6** but this page targets a very specific drug that most patients won't search for by name. Worth keeping but no action needed.

4. **`/about` priority is 0.8** — reasonable. For a personal-brand service, the about page is important for "Dr Priyanka Deventhiran" branded searches.

### `src/app/robots.ts`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /book/success
Sitemap: https://drdmedcare.com/sitemap.xml
```

**Assessment:**
- `/admin/` is correctly blocked.
- `/book/success` is correctly blocked (it contains booking IDs in URL params).
- No geo-targeting directives — these don't exist in `robots.txt` anyway (it's a crawl-control file, not a geo-targeting file).
- **No issue.** This is correct.

---

## 5. JSON-LD schema audit

### Homepage (`/`) — `MedicalBusiness`

```json
{
  "@type": "MedicalBusiness",
  "areaServed": "IN",
  "availableLanguage": ["English", "Tamil", "Telugu", "Hindi"],
  "telephone": "+919080709332",
  "medicalSpecialty": "Pharmacy"
}
```

**What's good:** `areaServed: "IN"` is set. `availableLanguage` is set. Phone number is set. Services are listed.

**What's missing:**

| Missing field | Why it matters |
|---|---|
| `address` with `addressCountry: "IN"`, city, state | A `PostalAddress` on a `MedicalBusiness` is how Google populates Knowledge Graph and Maps-adjacent results. Without it, Google has no structured city/region signal. |
| `openingHoursSpecification` | For a booking service, showing that sessions are on weekends reinforces trust in SERPs |
| `priceRange` | Set to `"₹₹"` — this is fine as-is |
| `sameAs` links | Instagram, LinkedIn profile, etc. help Google consolidate entity identity |

**Recommended addition to homepage JSON-LD:**
```ts
address: {
  '@type': 'PostalAddress',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  addressCountry: 'IN',
},
openingHoursSpecification: [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday'],
    opens: '09:00',
    closes: '17:00',
  },
],
```

### Blog posts — `BlogPosting`

All 8 blog posts have `BlogPosting` JSON-LD with:
- `author` (Dr Priyanka Deventhiran, Clinical Pharmacist) ✅
- `publisher` (Dr D's MedCare) ✅
- `datePublished` ✅
- `inLanguage: "en-IN"` ✅
- `image` (post-specific OG image URL) ✅
- `keywords` ✅

**What's missing on blog posts:**
- No `dateModified` — add this when a post is updated. Google uses it for freshness signals.
- No `mainEntityOfPage` — this is a minor nice-to-have that explicitly ties the JSON-LD to the canonical URL.

### Pages with no JSON-LD at all

| Page | Schema that would help |
|---|---|
| `/about` | `Person` schema with `Dr Priyanka Deventhiran`, credentials, affiliation |
| `/faq` | `FAQPage` schema — Google can display FAQ answers directly in SERPs (rich result) |
| `/book` | No schema needed |
| `/clinical` | `Dataset` or simple `WebPage` — low priority |
| `/legal/*` | None needed |

**The `/faq` `FAQPage` schema is a high-value quick win.** It can generate FAQ rich results in Google SERPs, giving the site more SERP real estate at no cost. The FAQ page is already a client component so schema needs to go in `faq/layout.tsx` (already the correct pattern).

---

## 6. En dash and em dash sweep results

### Em dashes (—)

The previous bulk replacement (`sed -i '' 's/—/-/g'`) was run across all `src/**/*.tsx` and `src/**/*.ts` files. **0 em dashes remain** in any source file.

```bash
grep -rn "—" src/ --include="*.tsx" --include="*.ts"
# → 0 results
```

### En dashes (–) — fixes applied in this audit

The following files contained en dashes in user-facing content. All were replaced with `-` in this session:

| File | Line | Before | After |
|---|---|---|---|
| `src/app/about/page.tsx` | 21 | `Drug–drug and drug–food interactions` | `Drug-drug and drug-food interactions` |
| `src/app/blog/meningitis-symptoms-india/page.tsx` | 67 | `1–2 weeks` | `1-2 weeks` |
| `src/app/blog/meningitis-symptoms-india/page.tsx` | 72 | `24–48 hours` | `24-48 hours` |
| `src/app/blog/meningitis-symptoms-india/page.tsx` | 102 | `39–40°C` | `39-40°C` |
| `src/app/blog/drug-food-interactions-india/page.tsx` | 102 | `30–60 minutes` | `30-60 minutes` |
| `src/app/blog/how-to-use-blood-pressure-monitors-at-home-a-guide-for-beginners/page.tsx` | 80 | `₹1000–₹2500` | `₹1000-₹2500` |
| `src/app/blog/myasthenia-gravis-india/page.tsx` | 150 | `10–15%` | `10-15%` |
| `src/app/blog/myasthenia-gravis-india/page.tsx` | 186 | `3–4 hours` | `3-4 hours` |
| `src/app/blog/myasthenia-gravis-india/page.tsx` | 194 | `2–3 weeks` | `2-3 weeks` |
| `src/app/blog/myasthenia-gravis-india/page.tsx` | 200 | `3–12 months` | `3-12 months` |
| `src/app/book/_components/SlotStep.tsx` | 229 | `start – end IST` | `start - end IST` |

### En dashes still remaining (not in user-facing patient content)

These files still contain en dashes but were intentionally left:

| File | Context | Action |
|---|---|---|
| `src/app/admin/availability/page.tsx` | Time range display in admin UI (e.g. `09:00 – 09:30`) | Not patient-facing — leave |
| `src/app/admin/slots/page.tsx` | Admin UI time display + comment `1–7 slots` | Not patient-facing — leave |
| `src/app/clinical/medroxyprogesterone-acetate/MonographClient.tsx` | Medical terminology: `Hypothalamic–Pituitary Axis` | Clinical document for HCPs — could argue either way |
| `src/app/clinical/medroxyprogesterone-acetate/patient-leaflet/PILClient.tsx` | Dosage ranges: `2.5–10mg`, `1–3 months` | Patient-facing — **recommend fixing** |

---

## 7. Prioritised action list

Ordered by expected SEO impact for India-targeting:

### High priority

**H1. Add `address` to MedicalBusiness JSON-LD on homepage**  
Without a `PostalAddress` with city + country, Google has no structured location signal. This is the single most impactful structural change for local India SEO. Add to `src/app/page.tsx` JSON-LD:
```ts
address: {
  '@type': 'PostalAddress',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  addressCountry: 'IN',
},
```

**H2. Add `FAQPage` JSON-LD to `/faq`**  
The FAQ page has ~12 well-structured questions. FAQPage rich results can earn 2-4× more SERP space (accordion dropdowns under the main result). Add schema to `src/app/faq/layout.tsx`. This is the highest-ROI schema addition available.

**H3. Add dedicated title + description to `/book`**  
The booking page has no title and no description. It's showing as "Dr D's MedCare - Medication Counselling by a Clinical Pharmacist" which is the homepage title — wasted. Suggested:
- Title: `Book a Medication Counselling Session | Dr D's MedCare` (51 chars)
- Desc: `Choose a service, pick a slot, and book your session in under 2 minutes. Sessions in Tamil, Telugu, Hindi and English. Pay via UPI.` (133 chars)

**H4. Add `hreflang="en-IN"` to root layout**  
Confirms to Google this is English content targeted at India, not UK/US/global English. Without it, UK impressions (already showing in Search Console) dilute your India CTR. Single-line change in `src/app/layout.tsx`.

### Medium priority

**M1. Shorten blog post titles — drop the ` | Dr D's MedCare Blog` suffix or use a shorter brand name**  
8 of 8 blog titles are over 60 chars once the suffix is added. The suffix adds 22 characters. Options:
- Drop suffix entirely (title alone is enough — Google adds site name)
- Shorten suffix to ` | MedCare Blog` (saves 8 chars)
- Shorten `_title` values

**M2. Improve blog index title and description**  
Current: "Blog | Dr D's MedCare" (21 chars, zero keywords).  
Suggested: `Medicines Explained Simply - Blog by Dr Priyanka Deventhiran` (61 chars)  
Suggested desc: `Plain-English articles on drug interactions, antibiotic safety, prescription counselling, and more. Written for Indian patients by a Pharm D.` (143 chars)

**M3. Add `Person` JSON-LD to `/about`**  
Helps Google build an entity graph around Dr Priyanka Deventhiran as a clinical pharmacist in Chennai. Schema.org `Person` with `worksFor`, `alumniOf`, `knowsLanguage`, `hasCredential`.

**M4. Fix homepage and FAQ description lengths**  
- Homepage desc (196 chars) → trim to ~155 chars
- FAQ desc (169 chars) → trim to ~155 chars

**M5. Fix `lastModified: new Date()` in sitemap for static pages**  
Use actual dates. `new Date()` makes every deploy look like a content update. Suggested: `new Date('2026-03-01')` for legal pages, `new Date('2026-03-01')` for about, etc.

### Low priority

**L1. Add `sameAs` to MedicalBusiness JSON-LD**  
Link to Instagram or LinkedIn profile to help Google consolidate entity identity.

**L2. Add `dateModified` to all BlogPosting JSON-LD**  
Currently only `datePublished` is set. Add `dateModified` when posts are substantively updated.

**L3. Fix en dashes in PILClient.tsx**  
The patient information leaflet for medroxyprogesterone-acetate has several en dashes in dosage ranges. These are patient-facing. Low priority since the clinical section isn't heavily indexed.

**L4. Add title/description to `/clinical` pages**  
`/clinical` and `/clinical/medroxyprogesterone-acetate` are indexed (`robots: { index: true }`) but both inherit the homepage title. Suggest:
- `/clinical` title: `Clinical Drug Monographs | Dr D's MedCare` (41 chars)
- `/clinical/medroxyprogesterone-acetate` title: `Medroxyprogesterone Acetate - Clinical Monograph | Dr D's MedCare` (65 chars)

---

## 8. What was fixed in this session

1. **All em dashes (—)** replaced with hyphens across all `src/**/*.tsx` and `src/**/*.ts` files (done in previous session, verified here: 0 remaining).
2. **11 en dashes (–)** replaced with hyphens in user-facing blog and booking content (see table in section 6 above).

Files modified in this session:
- `src/app/about/page.tsx`
- `src/app/blog/meningitis-symptoms-india/page.tsx`
- `src/app/blog/drug-food-interactions-india/page.tsx`
- `src/app/blog/how-to-use-blood-pressure-monitors-at-home-a-guide-for-beginners/page.tsx`
- `src/app/blog/myasthenia-gravis-india/page.tsx`
- `src/app/book/_components/SlotStep.tsx`

No metadata changes were made. All suggestions above are proposals for review — not yet implemented.
