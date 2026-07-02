-- Axis Lab — bookings table
-- Run in the Supabase SQL editor (or `supabase db push`).

create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  booking_id     text not null unique,
  name           text not null,
  email          text not null,
  phone          text not null,
  service        text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes          text,
  source         text not null default 'website'
                   check (source in ('website', 'whatsapp')),
  status         text not null default 'pending'
                   check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at     timestamptz not null default now()
);

create index if not exists bookings_booking_id_idx on public.bookings (booking_id);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- RLS: lock the table down. All access goes through the server API using the
-- service-role key (which bypasses RLS). No anon/public policies are granted,
-- so the anon key can neither read nor write bookings directly.
alter table public.bookings enable row level security;

-- CS agents create WhatsApp bookings straight from the Supabase dashboard,
-- which uses the service-role connection — so the same table stays the single
-- source of truth for both website and WhatsApp orders.
