# Dr D's MedCare - Complete System Guide

**Site:** https://drdmedcare.com  
**Owner:** Dr Priyanka Deventhiran (Pharm D, Clinical Pharmacist)  
**Stack:** Next.js 16, Supabase, Tailwind CSS 4, Vercel, Resend  
**Launched:** March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Directory Structure](#2-directory-structure)
3. [Tech Stack & Dependencies](#3-tech-stack--dependencies)
4. [Environment Variables](#4-environment-variables)
5. [Design System](#5-design-system)
6. [Public Pages](#6-public-pages)
7. [Booking Flow](#7-booking-flow)
8. [Admin Panel](#8-admin-panel)
9. [API Routes](#9-api-routes)
10. [Blog System](#10-blog-system)
11. [Database & Supabase](#11-database--supabase)
12. [Email System](#12-email-system)
13. [SEO & Metadata](#13-seo--metadata)
14. [Scripts & Automation](#14-scripts--automation)
15. [Deployment](#15-deployment)
16. [Common Tasks](#16-common-tasks)

---

## 1. Project Overview

Dr D's MedCare is a medication counselling booking platform. Patients browse services, pick a date and time slot, fill in their details, and are directed to pay via UPI on WhatsApp. Dr Priyanka manages everything through a password-protected admin panel.

**Key flows:**
- Patient books a session → admin gets an email notification → admin confirms after payment proof arrives on WhatsApp
- Admin controls availability (weekly rules + date overrides) and generates time slots manually
- Blog publishes educational articles on medicines and conditions

**What the site does NOT do:**
- No live payments (UPI payment is done outside the app via WhatsApp)
- No diagnosis or prescription writing
- No automated slot generation (admin triggers it manually)

---

## 2. Directory Structure

```
DrDMedcare/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: metadata, fonts, Analytics
│   │   ├── page.tsx                # Homepage
│   │   ├── sitemap.ts              # XML sitemap for SEO
│   │   ├── robots.ts               # robots.txt
│   │   ├── globals.css             # Tailwind + CSS design tokens
│   │   │
│   │   ├── about/                  # About Dr Priyanka page
│   │   ├── faq/
│   │   │   ├── layout.tsx          # SEO metadata (page is 'use client')
│   │   │   └── page.tsx            # FAQ accordion (client component)
│   │   ├── book/
│   │   │   ├── page.tsx            # Booking entry point
│   │   │   ├── _components/        # Wizard steps (see §7)
│   │   │   └── success/            # Post-booking confirmation page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog index (metadata only, renders BlogGrid)
│   │   │   ├── _components/
│   │   │   │   └── BlogGrid.tsx    # Client component: tabs + cards
│   │   │   └── [slug]/page.tsx     # Individual blog posts
│   │   ├── clinical/               # Drug monograph pages
│   │   ├── legal/                  # Privacy, Terms, Disclaimer
│   │   ├── admin/                  # Protected admin panel (see §8)
│   │   └── api/                    # All API routes (see §9)
│   │
│   ├── components/
│   │   ├── AppShell.tsx            # Wraps pages: Header + Footer (skipped for /admin)
│   │   ├── Header.tsx              # Nav, social icons, Book button
│   │   ├── Footer.tsx              # Links, copyright, disclaimer
│   │   ├── HomeServiceTabs.tsx     # Services grid on homepage (fetches API)
│   │   ├── BlogPostLayout.tsx      # Article wrapper: title, date, author, prose
│   │   └── WhatsappButton.tsx      # Floating/inline WhatsApp CTA
│   │
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts           # Browser Supabase client (anon key)
│       │   └── server.ts           # Server Supabase client (service role key)
│       └── pricing.ts              # Price calculation + rounding logic
│
├── scripts/
│   └── generate-og-images.mjs     # Puppeteer: generates /public/og/*.jpg
│
├── public/
│   ├── logo.png
│   ├── ogimage.png                 # Site-wide OG image
│   ├── priyanka.jpg                # Profile photo (used in blog bylines)
│   └── og/                         # Blog OG images (one per post)
│
├── docs/                           # Documentation
├── next.config.ts                  # Redirects (www, old Vercel domain)
├── vercel.json                     # Cron job config
└── .env.local                      # Environment variables (not committed)
```

---

## 3. Tech Stack & Dependencies

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js | 16.1.6 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Database | Supabase (PostgreSQL) | @supabase/ssr ^0.8 |
| Auth | Supabase Auth | built-in |
| Email | Resend | 6.9.1 |
| Validation | Zod | 4.3.6 |
| Analytics | Vercel Analytics | latest |
| QR codes | qrcode.react | 4.2.0 |
| OG images | Puppeteer | 24.38.0 |
| Hosting | Vercel | - |

---

## 4. Environment Variables

Create `.env.local` in the project root. All are required unless marked optional.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...         # Safe for browser
SUPABASE_SERVICE_ROLE_KEY=eyJ...             # Server-only, never expose

# Email (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@drdmedcare.com
RESEND_REPLY_TO=drpriyankamedcare@gmail.com  # Optional
```

**Important:** `SUPABASE_SERVICE_ROLE_KEY` bypasses all Row Level Security. Never use it in client-side code. It is only imported in `src/lib/supabase/server.ts`.

---

## 5. Design System

### Brand Colours

Defined as CSS variables in `src/app/globals.css`:

```css
--color-primary:      15 118 110   /* Teal-700  #0f766e */
--color-primary-soft: 204 251 241  /* Teal-100  (light backgrounds) */
--color-primary-mid:  99 194 184   /* Teal-400  (borders) */
--color-secondary:    17 94 89     /* Teal-800  (hover, darker) */
```

Usage in Tailwind: `text-[rgb(var(--color-primary))]` or inline `style={{ background: 'rgb(var(--color-primary))' }}`

### Fonts

Geist (sans-serif) and Geist Mono, loaded via `next/font/google` in `layout.tsx`.

### Component Conventions

- Cards: `rounded-2xl border border-slate-200 bg-white/80 shadow-sm`
- Buttons (primary): Inline `background: rgb(var(--color-primary))`, `text-white`, `rounded-xl`
- Buttons (secondary): `border-2 border-slate-200 bg-white text-slate-700 rounded-xl`
- Badges: `rounded-full border px-2.5 py-0.5 text-[10px] font-semibold`
- Section headers: `text-xs font-semibold uppercase tracking-widest text-slate-400`

---

## 6. Public Pages

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage: hero, service tabs, about snippet, blog preview |
| `/about` | `app/about/page.tsx` | Dr Priyanka's credentials and approach |
| `/faq` | `app/faq/page.tsx` | Accordion FAQ, `'use client'`; metadata in `faq/layout.tsx` |
| `/book` | `app/book/page.tsx` | Booking wizard entry; accepts `?type=` query param |
| `/book/success` | `app/book/success/page.tsx` | Post-booking: UPI QR code, WhatsApp CTA, booking ID |
| `/blog` | `app/blog/page.tsx` | Blog index with category filter tabs |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |
| `/clinical/[slug]` | `app/clinical/[slug]/page.tsx` | Drug monograph pages |
| `/legal/privacy` | `app/legal/privacy/page.tsx` | Privacy policy |
| `/legal/terms` | `app/legal/terms/page.tsx` | Terms of service |
| `/legal/disclaimer` | `app/legal/disclaimer/page.tsx` | Medical disclaimer |

### AppShell routing logic

`AppShell.tsx` checks the current pathname:
- Routes starting with `/admin` or `/clinical`: No header/footer (standalone layout)
- All other routes: Wrapped with `<Header>` and `<Footer>`

---

## 7. Booking Flow

The booking wizard lives at `/book` and is split into three steps:

```
/book
  └── _components/
       ├── BookingWizard.tsx   # Orchestrator: holds state, step navigation
       ├── ServiceStep.tsx     # Step 1: service + plan selection
       ├── SlotStep.tsx        # Step 2: date + time slot selection
       └── DetailsStep.tsx     # Step 3: patient info + consent + submit
```

### Step 1 - Service & Plan

- Fetches `/api/services` and `/api/services/plans?type=<slug>`
- Displays two plan options: `quick_15` (15 min) and `full_30` (30 min)
- The `monthly` plan is hidden from public booking
- Price calculation uses `calculateFinalPrice()` from `src/lib/pricing.ts`:
  - `quick_15`: base price × 1.0
  - `full_30`: base price × 1.6
  - Rounded to nearest ₹50 (under ₹1000) or ₹100 (₹1000+)

### Step 2 - Date & Time

- Fetches `/api/available-dates?from=...&to=...` for the next 30 days
- Only shows dates that actually have available (non-booked, non-dummy) slots
- Selecting a date fetches `/api/public-slots?date=YYYY-MM-DD`
- Past slots for today are filtered by comparing against IST time
- Dummy slots (`is_dummy: true`) are shown as greyed out but selectable for booking check - actually filtered out: `!slot.is_dummy`
- Selecting a slot shows a confirmation card below the grid

### Step 3 - Patient Details

Form fields:
- Full name (min 2 chars)
- Age (1–120)
- Gender (Male / Female / Other)
- Phone (10-digit Indian number, must start with 6, 7, 8, or 9)
- Email (optional)
- Address
- Preferred language (English, Tamil, Telugu, Hindi)
- Legal consent checkbox (required)
- Prescription upload consent (only for `prescription-counselling` service type)

On submit: `POST /api/bookings` → on success, redirect to `/book/success?bookingId=...`

### Success Page

Displays:
- Booking reference ID
- Selected slot date/time
- Amount due
- UPI QR code (generated client-side with `qrcode.react`)
- WhatsApp button pre-filled: "Hi Dr Priyanka, my booking ID is [X]. Please find payment screenshot attached."

---

## 8. Admin Panel

All admin pages are under `/admin/` and protected by Supabase authentication. Unauthenticated users are redirected to `/admin/login`.

**Important:** Middleware only protects `/admin/*` pages, not `/api/admin/*` routes. Each admin API route must manually check the session.

```
app/admin/
├── layout.tsx          # Sidebar nav, auth check, sign-out
├── page.tsx            # Dashboard: stats, today's slots, pending payments
├── login/page.tsx      # Email + password login via Supabase
├── availability/
│   └── page.tsx        # Weekly rules + date overrides
├── slots/
│   └── page.tsx        # View, generate, edit individual slots
└── bookings/
    └── page.tsx        # All bookings: view, update status, cancel, delete
```

### Dashboard

Shows:
- 4 stat cards: total bookings, confirmed, pending payment, estimated revenue
- Today's slot grid (colour-coded: green = available, blue = booked, amber = dummy, red = blocked)
- Pending payment list (up to 5, links to bookings page)
- Today's confirmed sessions

### Availability

**Weekly rules:** Set working hours per day of the week. Each day can have multiple time blocks (e.g., 9am–12pm and 3pm–6pm). Inactive blocks are saved but not used for slot generation.

**Date overrides:** Override a specific date - mark it closed, or give it different hours. Examples: holidays, conference days, special availability.

### Slots

Slot generation algorithm:
1. Select a date range (default: next 7 days)
2. For each date, find the applicable rule (override first, then weekly)
3. Generate 30-minute slots from start to end time
4. Optionally mark 1–7 random slots as `is_dummy: true` (appear unavailable to patients)
5. POST to `/api/admin/slots` - deletes unbooked slots for those dates first, then inserts new ones

Slot states:
- **Available** (green): `is_booked: false`, `is_dummy: false`, `is_blocked: false`
- **Booked** (blue): `is_booked: true`
- **Dummy** (amber): `is_dummy: true` - shown as unavailable to patients, hides real availability
- **Blocked** (red): `is_blocked: true` - completely hidden from public API

### Bookings

Booking statuses:
- `pending_payment` - just submitted, awaiting WhatsApp payment proof
- `confirmed` - payment verified, session scheduled
- `completed` - session done
- `cancelled` - cancelled, slot released

Payment statuses:
- `awaiting_proof` → `received` → `verified`

Admin actions:
- Update payment status
- Confirm booking
- Mark as completed
- Cancel (releases slot back to available)
- Delete (hard delete, irreversible)

---

## 9. API Routes

### Public (no auth)

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/ping` | Health check (called by Vercel cron) |
| GET | `/api/services` | All active service types |
| GET | `/api/services/plans?type=<slug>` | Plans for a service |
| GET | `/api/available-dates?from=&to=` | Dates with at least one available slot |
| GET | `/api/public-slots?date=YYYY-MM-DD` | All slots for a date (non-blocked) |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/og?title=&category=` | Dynamic OG image (Edge runtime) |

### Admin (Supabase session required)

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/admin/availability` | Weekly rules + date overrides |
| POST | `/api/admin/availability` | Replace all weekly rules |
| PATCH | `/api/admin/availability` | Upsert or delete one date override |
| GET | `/api/admin/slots?date=` | All slots for a date (admin view) |
| POST | `/api/admin/slots` | Bulk insert generated slots |
| PATCH | `/api/admin/slots` | Update or delete one slot |
| GET | `/api/admin/bookings` | All bookings (last 200) |
| PATCH | `/api/admin/bookings` | Update status, or cancel + release slot |
| DELETE | `/api/admin/delete-booking` | Hard-delete a booking |

### Booking API - key logic

```
POST /api/bookings
  1. Zod validates request body
  2. Checks service exists and is active
  3. Rate limit: max 3 bookings per phone per 24h
  4. Atomically marks slot as booked:
       UPDATE slots SET is_booked=true WHERE id=X AND is_booked=false
     (If 0 rows updated → slot already taken → 409 Conflict)
  5. INSERT into bookings table
  6. UPDATE slot with booking_id
  7. Send emails via Resend (non-blocking - booking succeeds even if email fails)
  8. Return { bookingId, finalPriceInr, ... }
```

---

## 10. Blog System

### Adding a new post

1. Create `src/app/blog/[slug]/page.tsx` - copy an existing post as template
2. Add entry to `scripts/generate-og-images.mjs` POSTS array
3. Run `node scripts/generate-og-images.mjs` to generate the OG image
4. Add to `POSTS` array in `src/app/blog/_components/BlogGrid.tsx`
5. Add URL to `src/app/sitemap.ts`
6. Commit and push
7. Request indexing in Google Search Console

Full checklist: `docs/adding-blog-posts.md`

### Blog post file structure

```tsx
// src/app/blog/[slug]/page.tsx

const _title = 'Post title (kept under 60 chars for SEO)'
const _desc = 'Meta description (150–160 chars, compelling, no em dashes)'
const _ogImage = 'https://drdmedcare.com/og/[slug].jpg'

export const metadata: Metadata = {
  title: `${_title} | Dr D's MedCare Blog`,
  description: _desc,
  openGraph: { ... },
  twitter: { ... },
  alternates: { canonical: '/blog/[slug]' },
}

const jsonLd = {
  '@type': 'BlogPosting',
  // All fields - importantly: image must match _ogImage, not the generic site OG image
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" ... />
      <BlogPostLayout title="..." excerpt="..." category="..." readTime="..." date="...">
        {/* Content */}
      </BlogPostLayout>
    </>
  )
}
```

### Visual components available inside posts

Use these Tailwind classes inside `BlogPostLayout` children:

```tsx
// Coloured info/warning box
<div className="not-prose rounded-xl border border-amber-200 bg-amber-50 p-5">

// Symptom/feature grid (2 columns on desktop)
<div className="not-prose grid sm:grid-cols-2 gap-4 my-6">

// Table
<div className="overflow-hidden rounded-lg border border-slate-200 my-6">
  <table className="w-full text-sm"> ...

// Numbered steps with circle badges
<ol className="space-y-3">
  <li className="flex items-start gap-3">
    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full ...">1</span>

// Warning card (red)
<div className="not-prose rounded-xl border-2 border-red-200 bg-red-50 p-6 my-6">

// Blockquote
<blockquote className="border-l-4 border-teal-500 pl-4 ...">
```

### Category filter tabs (BlogGrid.tsx)

The blog index has tabs: `All`, `Education`, `Awareness`, `Our story`.

When a post is added to `POSTS` in `BlogGrid.tsx`, the count on each tab updates automatically. To mark a post as featured (appears as the large hero card on the All tab), add `featured: true`.

### OG image colours by category

| Category | Background | Accent |
|---|---|---|
| Education | Amber/cream | `#b45309` |
| Awareness | Blue/sky | `#0369a1` |
| Our story | Teal | `#0f766e` |
| Devices & conditions | Indigo | `#4f46e5` |
| Neurological (MG) | Purple/violet | `#6d28d9` |

---

## 11. Database & Supabase

### Supabase clients

**Browser client** (`src/lib/supabase/client.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Used in: login page, client-side auth checks
- Subject to Row Level Security

**Server client** (`src/lib/supabase/server.ts`):
- Uses `SUPABASE_SERVICE_ROLE_KEY`
- Used in: all API routes
- Bypasses RLS - full access
- Never persists session, no refresh token

### Key tables (inferred from API usage)

| Table | Key columns |
|---|---|
| `service_types` | id, slug, title, short_desc, long_desc, icon, base_price_inr, is_active |
| `service_type_plans` | id, service_type_id, code (quick_15/full_30/monthly) |
| `slots` | id (UUID), slot_date, start_time, end_time, is_booked, is_dummy, is_blocked, booking_id, created_at |
| `bookings` | id (UUID), slot_id, service_type_slug, plan_code, patient_name, patient_age, patient_gender, patient_phone, patient_email, patient_address, language, base_price_inr, final_price_inr, status, payment_status, payment_ref, created_at |
| `availability_rules` | id, day_of_week (0=Sun–6=Sat), start_time, end_time, is_active, created_at |
| `availability_overrides` | id, date, is_available, start_time, end_time, reason |

### Known database quirks

- `availability_rules.created_at` has `NOT NULL` with no default - must be passed explicitly when inserting
- Slot double-booking prevention: conditional UPDATE (`WHERE is_booked = false`) as an optimistic lock - if 0 rows affected, the slot was taken

---

## 12. Email System

Provider: **Resend** (free tier, only sends to the account owner's email while on free plan - `drpriyankamedcare@gmail.com`)

### Triggered by

`POST /api/bookings` - after a booking is successfully created

### Emails sent

**Admin notification** (to `RESEND_REPLY_TO` or fallback):
- Subject: New booking - Patient name, service, date/time
- Body: Full booking details, slot info, amount, payment status
- Includes direct link to admin bookings page

**Patient confirmation** (to `patientEmail` if provided):
- Subject: Booking confirmed - reference ID
- Body: What happens next, UPI payment instructions, WhatsApp number, booking ID

### Email failure handling

Email failures are logged but do not fail the booking. The booking record and slot claim succeed regardless of whether Resend returns an error. This prevents email issues from blocking patient bookings.

---

## 13. SEO & Metadata

### Root layout defaults (`src/app/layout.tsx`)

```
Title:       "Dr D's MedCare - Medication Counselling by a Clinical Pharmacist"
Description: "Personalised medication counselling sessions with Dr Priyanka Deventhiran, Pharm D. ..."
OG image:    https://drdmedcare.com/ogimage.png
Twitter:     summary_large_image
metadataBase: https://drdmedcare.com
```

### Page-level overrides

Every page should override title and description. Key rules:
- **Title length:** Keep `_title` under 60 characters (the full title with ` | Dr D's MedCare Blog` suffix should stay under ~75)
- **No em dashes in descriptions** - reads as AI-generated in search snippets
- **Description:** 150–160 chars, should answer "why click this?" not just describe the page
- **Canonical:** Always set via `alternates: { canonical: '/path' }` - Next.js resolves this against `metadataBase`
- **JSON-LD `image`:** Must use the post-specific OG image (`/og/[slug].jpg`), not the generic `/ogimage.png`

### Sitemap (`src/app/sitemap.ts`)

All public URLs are listed. Update when adding new pages or blog posts.

Priority guide:
- Homepage: 1.0
- Book, About, Blog index: 0.8
- Blog posts, FAQ, Clinical: 0.6–0.7
- Legal pages: 0.3

### robots.ts

Disallows: `/admin/`, `/book/success`

### Google Search Console

- Property: `https://drdmedcare.com/`
- Verification code in root layout metadata
- After any new page: request indexing via URL Inspection tool

---

## 14. Scripts & Automation

### OG Image Generator

```bash
node scripts/generate-og-images.mjs
```

- Uses Puppeteer to render HTML → 1200×630 JPEG screenshot
- Output: `public/og/[slug].jpg`
- Run after adding a new blog post (before committing)
- Each entry in the POSTS array provides: `slug`, `html` (from the `base()` helper)

### Vercel Cron

Defined in `vercel.json`:
```json
{
  "crons": [{ "path": "/api/ping", "schedule": "0 0 */5 * *" }]
}
```
Pings the database every 5 days to keep the Supabase connection warm on the free tier.

---

## 15. Deployment

**Platform:** Vercel (connected to GitHub `main` branch)

Every push to `main` triggers a production deployment automatically.

### Domain setup

- Primary: `drdmedcare.com`
- Redirects (301) configured in `next.config.ts`:
  - `dr-d-medcare.vercel.app` → `drdmedcare.com`
  - `www.drdmedcare.com` → `drdmedcare.com`

### Environment variables

Set in Vercel project settings (Settings → Environment Variables), not in the repo:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_REPLY_TO`

### Build commands

```bash
npm run dev       # Local development (localhost:3000)
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
npx tsc --noEmit  # Type check only
```

---

## 16. Common Tasks

### Add a new blog post

See `docs/adding-blog-posts.md` for the full checklist.

Quick version:
1. `src/app/blog/[slug]/page.tsx` - write post
2. `scripts/generate-og-images.mjs` - add POSTS entry, run script
3. `src/app/blog/_components/BlogGrid.tsx` - add to POSTS array
4. `src/app/sitemap.ts` - add URL
5. Commit + push
6. Google Search Console → Request indexing

### Add a new service type

Insert directly into the Supabase `service_types` table via the Supabase dashboard. No code changes needed - the booking wizard fetches services dynamically.

### Change service pricing

Update `base_price_inr` in the `service_types` table. The multipliers and rounding logic live in `src/lib/pricing.ts`.

### Change the brand colour

Update the three CSS variables in `src/app/globals.css`:
```css
--color-primary
--color-primary-soft
--color-primary-mid
```

The entire site uses these variables - no individual component changes needed.

### Add a new admin page

1. Create `src/app/admin/[page-name]/page.tsx`
2. Add nav link to the sidebar in `src/app/admin/layout.tsx`
3. Create API route if needed in `src/app/api/admin/[route]/route.ts`
4. Remember: check Supabase session at the top of each admin API route

### Fix a metadata/SEO issue

- Page title or description: edit `_title` / `_desc` at the top of `page.tsx`
- JSON-LD structured data: edit the `jsonLd` const in the same file
- Sitemap: edit `src/app/sitemap.ts`
- Root defaults: edit `src/app/layout.tsx`

### Update availability

Log into `/admin` → Availability. Set weekly rules (working hours per day) and add any date-specific overrides. Then go to Slots and generate slots for the upcoming weeks.

### Manage a booking

Log into `/admin` → Bookings. Find the booking, update payment status as proof arrives via WhatsApp, confirm it, and mark complete after the session.
