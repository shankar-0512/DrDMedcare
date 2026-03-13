# Dr D's MedCare — Technical Reference

This is the kind of doc you wish existed when you first opened the codebase. It covers how things actually work, where the tricky bits are, and what decisions were made deliberately vs what just happened to work.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                        # Homepage
│   ├── layout.tsx                      # Root layout — metadata, fonts, Analytics
│   ├── error.tsx                       # Global error boundary
│   ├── about/ faq/ legal/              # Static content pages
│   ├── blog/
│   │   ├── page.tsx                    # Blog index — POSTS array lives here
│   │   └── [slug]/page.tsx             # Individual blog posts (static, not dynamic route)
│   ├── book/
│   │   ├── page.tsx                    # Booking entry point
│   │   ├── success/
│   │   │   ├── layout.tsx              # noindex metadata
│   │   │   └── page.tsx                # Post-booking confirmation + UPI QR
│   │   └── _components/
│   │       ├── BookingWizard.tsx       # Orchestrates the 3 steps
│   │       ├── ServiceStep.tsx         # Step 1: pick service + plan
│   │       ├── SlotStep.tsx            # Step 2: pick date + time
│   │       └── DetailsStep.tsx         # Step 3: patient details form
│   ├── clinical/
│   │   ├── page.tsx                    # Monograph index
│   │   └── medroxyprogesterone-acetate/
│   │       ├── page.tsx                # Drug monograph
│   │       └── patient-leaflet/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx                  # Sidebar nav, sign out
│   │   ├── page.tsx                    # Dashboard
│   │   ├── availability/page.tsx       # Weekly rules + date overrides
│   │   ├── slots/page.tsx              # Generate + manage slots
│   │   └── bookings/page.tsx           # Split-view booking manager
│   └── api/
│       ├── bookings/route.ts           # POST — creates bookings (public)
│       ├── services/route.ts           # GET — active service types (public)
│       ├── services/plans/route.ts     # GET — plans for a service type (public)
│       ├── public-slots/route.ts       # GET — available slots by date (public)
│       └── admin/
│           ├── availability/route.ts   # GET/POST/PATCH — availability rules + overrides
│           ├── bookings/route.ts       # GET/PATCH — bookings
│           ├── slots/route.ts          # GET/POST/PATCH — slots
│           └── delete-booking/route.ts # DELETE — removes booking + frees slot
├── components/
│   ├── AppShell.tsx                    # Layout wrapper, hides header/footer on /admin and /clinical
│   ├── HomeServiceTabs.tsx             # Service cards on homepage, fetches live from DB
│   ├── BlogPostLayout.tsx              # Shared blog post template
│   └── WhatsappButton.tsx             # wa.me link buttons with pre-filled messages
├── lib/
│   ├── supabase/client.ts              # Browser client (anon key) — auth only
│   ├── supabase/server.ts              # Server client (service role key)
│   └── pricing.ts                     # Price calculation with plan multipliers
└── proxy.ts                           # Next.js middleware — guards /admin/*
```

---

## Database tables

The schema lives in Supabase. There are no migration files in this repo — everything is managed through the Supabase dashboard.

### `service_types`
The services Priyanka offers. Editable from the Supabase dashboard without touching code.

| Column | Type | Notes |
|---|---|---|
| id | int | |
| slug | text | Used in URLs and booking records |
| title | text | Display name |
| short_desc | text | One-line description |
| long_desc | text | Expanded description for detail panel |
| icon | text | Emoji, optional |
| base_price_inr | int | Base price, multiplied by plan |
| is_active | boolean | Filters what shows on the homepage |
| sort_order | int | Controls display order |

### `service_type_plans`
Which plans are available for each service.

| Column | Type |
|---|---|
| service_type_slug | text |
| plan_code | text (quick_15 / full_30 / monthly) |
| is_active | boolean |
| sort_order | int |

The `monthly` plan is excluded from the public booking form. It's only activated by admin after a patient is already in the system.

### `services`
Plan metadata (duration, price label). Referenced via join in booking wizard.

### `slots`
The actual time slots patients can book.

| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| slot_date | date | YYYY-MM-DD |
| start_time | time | HH:MM |
| end_time | time | HH:MM (start + 30 min) |
| is_booked | boolean | Set atomically during booking |
| is_dummy | boolean | Looks booked to users, but isn't |
| is_blocked | boolean | Admin hold, not selectable |
| booking_id | uuid | Linked after booking created |

### `bookings`
Every booking ever made.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Shown to patient on success page |
| service_type_slug | text | |
| plan_code | text | |
| status | text | pending_payment / confirmed / completed / cancelled |
| payment_status | text | awaiting_proof / received / verified |
| payment_ref | text | Admin fills this in manually |
| patient_name / age / gender / phone / email / address | various | Collected in step 3 |
| language | text | en / ta / te / hi |
| base_price_inr / final_price_inr | int | Final = base × plan multiplier |
| preferred_start / preferred_end | timestamptz | ISO strings with +05:30 offset |
| slot_id | uuid | Links to slots table |
| consent_legal | boolean | Required for all bookings |
| created_at | timestamptz | |

### `availability_rules`
Priyanka's weekly schedule. Each row is one time block for one day.

| Column | Type | Notes |
|---|---|---|
| id | int | |
| day_of_week | int | 0=Sunday, 1=Monday, … 6=Saturday |
| start_time | time | |
| end_time | time | |
| is_active | boolean | |
| created_at | timestamptz | **No DB default — must be passed explicitly on insert** |

That `created_at` thing has bitten us before. When saving availability rules, the code deletes all existing rows and reinserts. You have to pass `created_at: new Date().toISOString()` manually or the insert fails with a NOT NULL error.

### `availability_overrides`
One row per date exception.

| Column | Type | Notes |
|---|---|---|
| date | date | Unique |
| is_available | boolean | False = full day blocked |
| start_time / end_time | time | Only used if is_available=true |
| reason | text | Optional note |

Overrides completely replace weekly rules for that date. They don't add to them.

---

## Auth

Admin auth uses Supabase's built-in email/password auth. There's one account — Priyanka's.

The middleware (`proxy.ts`) checks for a valid Supabase session on every request to `/admin/*`. If there's no session, it redirects to `/admin/login?redirectTo=<original-url>`.

**Important:** The middleware only covers `/admin/*` pages. It does not cover `/api/*` routes. So any API route that should be admin-only needs to check the session itself. The delete-booking route does this using `@supabase/ssr` + `cookies()` from `next/headers`.

Sign out redirects to `/` (home), not back to `/admin/login`.

---

## The booking API (`/api/bookings`)

This is the most critical route in the codebase. Here's what happens on every POST:

1. **Zod validation** — request body is validated against a schema. Bad data gets a 400.
2. **Service check** — confirms the service type exists and is active.
3. **Plan check** — confirms the plan is valid for that service.
4. **Price validation** — sanity checks the price is a finite positive number.
5. **Rate limiting** — max 3 bookings per phone number in a rolling 24-hour window. Returns 429 if exceeded.
6. **Atomic slot claim** — if a slotId was provided, runs:
   ```sql
   UPDATE slots
   SET is_booked = true
   WHERE id = $slotId
     AND is_booked = false
     AND is_blocked = false
     AND is_dummy = false
   RETURNING id
   ```
   If this returns no rows, the slot is gone — returns 409. This prevents double-bookings even under concurrent requests.
7. **Insert booking** — creates the booking record with `status=pending_payment`.
8. **Link slot** — updates the slot's `booking_id` to point to the new booking.
9. **Email notification** — fires off a Resend email to Priyanka. Non-blocking — if this fails, the booking still succeeds.

The response includes `bookingId`, `serviceTypeSlug`, `planCode`, `basePriceInr`, and `finalPriceInr`. The success page uses these from URL params.

---

## Slot generation

Slots are generated from the admin panel, not automatically. Priyanka clicks "Generate" for the next N days. The logic:

1. For each day in the range, check if there's an override for that date.
2. If the override marks the date as unavailable → skip.
3. If there's an available override with custom times → use those times.
4. Otherwise → look up the weekly rule for that day-of-week.
5. For each active time range → generate a slot every 30 minutes.
6. Upsert with conflict on `(slot_date, start_time)` — safe to re-run.

**Auto-dummy slots:** There's a checkbox in the admin panel called "Automatic dummy slots" (on by default). When enabled, generation randomly picks 1–7 slots from the batch and marks them `is_dummy = true`. This makes the calendar look partially booked to new visitors. The checkbox can be turned off when real bookings are high enough.

---

## IST timezone

All dates and times in the database are stored as plain `date` and `time` columns (not `timestamptz`). The server doesn't know about timezones — everything is assumed to be IST.

On the client side, when working out what "today" is or whether a slot is in the past, we manually offset:

```ts
const nowIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
```

Don't use `new Date()` directly for IST logic. It'll give you UTC, which is 5:30 behind — slots near midnight will show incorrectly.

---

## Pricing

The multipliers are in `src/lib/pricing.ts`:

```ts
quick_15: 1.0×
full_30:  1.6×
monthly:  3.5×
```

After multiplying, prices are rounded:
- Under ₹1000 → nearest ₹50
- ₹1000 and above → nearest ₹100

---

## Supabase clients

There are two:

**`lib/supabase/client.ts`** — uses the anon key, runs in the browser. Only used for auth operations (`signInWithPassword`, `signOut`). Nothing else.

**`lib/supabase/server.ts`** — uses the service role key, runs server-side only. Bypasses RLS. Used by all API routes for every database read/write. Never expose the service role key to the client.

All data fetching — including public-facing pages like the booking wizard and slot picker — goes through API routes that use the service role client. The anon client is not used for any data operations because RLS policies block it.

---

## Email

Resend handles email notifications. Two emails are sent on each booking:

1. **Admin notification** — always sent to Priyanka. Includes patient details, session info, and a link to the admin panel.
2. **Patient confirmation** — sent only if the patient provided an email address. Includes booking summary and payment instructions.

Both are non-blocking — if either fails, the booking still succeeds. Email templates are inline HTML built directly in the booking API route.

Note: Resend's free tier only allows sending to the account owner's email (`drpriyankamedcare@gmail.com`). In production with a verified domain, both emails go to their intended recipients.

---

## OG images

Each blog post has a unique OG image (1200×630 PNG) stored in `/public/og/`. These are generated by `scripts/generate-og-images.mjs` using Puppeteer — it renders HTML to a screenshot.

There's also an edge function at `/api/og` that can generate images dynamically, but the blog posts are now wired to the static PNGs. The edge function is still there if needed for future pages.

When adding a new blog post, run the generator script. See `docs/adding-blog-posts.md`.

---

## Environment variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=         # Project URL (public, safe in browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Anon key (public, safe in browser)
SUPABASE_SERVICE_ROLE_KEY=        # Service role (server only — never expose)

# Resend
RESEND_API_KEY=                   # API key
RESEND_FROM_EMAIL=                # e.g. Dr D's MedCare <onboarding@resend.dev>
RESEND_REPLY_TO=                  # Admin's email — drpriyankamedcare@gmail.com
```

All of these need to be set in Vercel's environment variables for production. The `NEXT_PUBLIC_*` ones are also needed locally in `.env.local`.

---

## Things that have broken before (and why)

**"Slots not showing in order"** — The slot list was split into two arrays: available first, then booked. Fixed by rendering a single array with conditional styling.

**"Services not loading after visiting admin"** — The homepage was caching service data in sessionStorage. On a cache miss with a failed Supabase call, it silently showed nothing. Fixed by removing the cache entirely. Six rows, no reason to cache.

**"Error saving availability: NOT NULL constraint"** — `availability_rules.created_at` has no database default. When we delete-and-reinsert, we have to pass `created_at` manually. It's easy to miss.

**"Booking went through twice on the same slot"** — The old code checked if a slot was available and then updated it in two separate queries. A race condition meant two concurrent requests could both pass the check. Fixed with a single atomic UPDATE.

**"Wrong IST date near midnight"** — The old timezone offset calculation had a bug with minutes. Replaced with `Date.now() + 5.5 * 60 * 60 * 1000`.

**"Phone number with +91 failing validation"** — Some users paste or autofill their number as `919876543210`. The form now detects 12-digit numbers starting with `91` and strips the prefix automatically.

**"OG image showing wrong content"** — The `next/og` route used `width: fit-content` which Satori doesn't support — it silently collapsed the layout to a white box. Replaced with a flex wrapper.

**"Admin data not loading / availability saves but comes back empty"** — All Supabase tables have RLS policies that block the anon key for writes and sometimes reads. The fix was to route every admin operation (and all public data fetches) through server-side API routes that use the service role key. Never use the browser client (`lib/supabase/client.ts`) for data — only for auth.
