# Dr D's MedCare — What This Is and How It Works

## The idea

Dr Priyanka Deventhiran is a clinical pharmacist (Pharm D). She built this platform to do one thing: give Indian patients a proper conversation about their medicines — something that almost never happens after a doctor's appointment.

The service is simple. A patient books a 15 or 30-minute session, pays via UPI, sends proof on WhatsApp, and gets a focused session where someone who actually knows pharmacology explains their prescription to them. No diagnosis, no prescribing. Just education.

---

## Who uses it

**Patients** — anyone in India who has questions about their medicines. The most common cases are people on multiple chronic medications, elderly patients with complex prescriptions, and parents trying to understand what their child has been prescribed.

**Admin (Priyanka)** — manages the entire backend herself. Sets her own availability, confirms bookings once payment is received, and runs sessions.

---

## The booking flow

Here's exactly what happens when a patient books:

1. They land on the `/book` page and pick a service (e.g. Prescription Counselling, Elderly Care, Side Effects Review).
2. They choose a plan — Quick 15-minute session or Full 30-minute session.
3. They pick a date and time from the available slots Priyanka has set up.
4. They fill in their details — name, age, language preference, phone, and a brief description of what they need.
5. Their booking is created in the database with status `pending_payment`.
6. They're shown a UPI QR code and a payment amount on the success page.
7. They pay and send proof on WhatsApp.
8. Priyanka receives an email notification (via Resend) the moment the booking is created.
9. She confirms payment on WhatsApp, then goes into the admin panel and marks the booking as `confirmed`.
10. The session happens. She marks it `completed` afterwards.

There's no automated payment verification. It's intentionally manual — Priyanka reviews each booking herself.

---

## Services and pricing

Services are stored in the database (`service_types` table), so Priyanka can manage them without touching code. There are six services currently:

- Prescription Counselling
- Adherence Planning
- Elderly Care
- Disease Awareness
- Device Usage
- Side Effects Review

Each service has a base price. The plan multiplies it:
- **Quick (15 min)** — 1× base price
- **Full (30 min)** — 1.6× base price
- **Monthly** — 3.5× base price (ongoing support, admin-activated)

Prices are rounded to the nearest ₹50 (under ₹1000) or ₹100 (₹1000 and above).

---

## How Priyanka manages everything

The admin panel lives at `/admin`. It's protected — you need to be logged in via Supabase Auth to access it. There are four sections:

**Dashboard** — quick overview. Today's sessions, pending payments, total revenue, booking counts. Designed so Priyanka can see what needs attention the moment she opens it.

**Availability** — she sets her working hours here. She can configure a weekly schedule (e.g. Mon–Fri 10am–6pm) and create exceptions for specific dates (blocking a holiday, adding extra hours on a weekend). This is the source of truth for slot generation.

**Slots** — once availability is set, she generates actual 30-minute slots for the next 7, 14, 21, or 30 days. She can also block individual slots, mark them as dummy (they appear booked to users but aren't), or delete unused ones.

**Bookings** — the main working area. Left panel is the full list, right panel shows the selected booking in detail. From here she can update payment status, confirm a booking, mark it complete, activate a monthly plan, or cancel/delete it.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database + Auth | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Email | Resend |
| Styling | Tailwind CSS 4 |
| Analytics | Vercel Analytics |
| Payment | UPI (manual, no gateway) |
| WhatsApp | wa.me links (no API) |

---

## What this is not

- Not a telemedicine platform. No video, no audio built in.
- Not an automated payment system. Every payment is manually verified.
- Not a multi-provider platform. One practitioner, one admin account.
- Not available outside India.

---

## The blog

There's a blog at `/blog`. Priyanka writes plain-language articles about medicines, drug interactions, and patient education. Each post has a unique OG image (generated with Puppeteer and stored as static PNGs in `/public/og/`), proper JSON-LD structured data, and is submitted to Google Search Console for indexing.

The blog doubles as SEO content — it brings in patients who are searching for things like "why finish antibiotics" or "drug food interactions India" and introduces them to the service.

See `docs/adding-blog-posts.md` for the full checklist when adding a new post.
