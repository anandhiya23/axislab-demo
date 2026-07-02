# Axis Lab — Fitness & Pilates

Black-and-white, photo-based landing page with an integrated booking flow.
Built from the Thinking\*Room brand deck.

**Stack:** Next.js 16 (App Router) · Tailwind v4 · Supabase (bookings) ·
Resend (confirmation email) · deployed on Vercel.

---

## What's inside

| Route             | Purpose                                                        |
| ----------------- | ------------------------------------------------------------- |
| `/`               | Landing: hero, manifesto, dimensions, programs, pricing, CTA  |
| `/book`           | Booking form → Supabase + confirmation email                  |
| `/status`         | Look up a booking by its ID (auto-loads from `?id=` in email) |
| `/api/bookings`   | `POST` create a booking                                       |
| `/api/bookings/:id` | `GET` public status (only non-sensitive fields)             |

### Booking flow (question 4 & 5 from the brief)

- **Website** bookings hit `POST /api/bookings`, which writes to the Supabase
  `bookings` table and emails a confirmation via Resend.
- **WhatsApp CS** bookings are entered by staff in the Supabase dashboard
  (`source = 'whatsapp'`) — **same table**, so order management stays unified.
- Every booking gets a human-readable **Booking ID** (`AXL-XXXXXX`). Customers
  check status at `/status` — no account required. (Accounts/login are the
  natural next upgrade; see the proposal.)

---

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

### 1. Supabase

Create a project, then run [`supabase/schema.sql`](supabase/schema.sql) in the
SQL editor. Copy the **Project URL** and **service-role key** into `.env.local`.

> The service-role key is server-only and bypasses RLS. It is never imported
> into a client component.

### 2. Resend

Create an API key. Until you verify the `axislab.id` domain, keep the sender as
`onboarding@resend.dev` (works immediately). After verifying the domain, set
`BOOKING_FROM_EMAIL=Axis Lab <hello@axislab.id>`.

Email sending **fails soft** — if the key is missing, bookings still save.

### 3. Photography

Placeholders render as filmic monochrome blocks. Drop real images into
`/public/photos/` and pass `src` to `<PhotoSlot>` in `app/page.tsx` /
`app/book/page.tsx`. Images are rendered grayscale to match the B&W identity.

---

## Deploy (Vercel)

1. Push to a Git repo and import into Vercel.
2. Add the env vars from `.env.example` in **Project → Settings → Environment
   Variables**.
3. Deploy. `VERCEL_URL` is used automatically for email links if
   `NEXT_PUBLIC_SITE_URL` isn't set.

---

## Content sourced from the brand deck

- Programs & intensities: Sports Therapy, Pilates, Fitness, Personal Training.
- Pricing: Fitness IDR 1,200,000 / Pilates IDR 1,600,000 / Personal Training
  IDR 2,600,000 (per 4 sessions).
- Copy: "A space for alignment, balance, and progress", the Mind/Body ·
  Strength/Mobility · Intensity/Recovery axes, and the first-timer offer.
- Logo mark recreated as SVG (`components/Logo.tsx`).
