import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-side admin client (service-role key). NEVER import this into a
// Client Component — the service-role key must stay on the server.
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export type BookingRow = {
  id: string;
  booking_id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  source: string; // "website" | "whatsapp"
  status: string; // "pending" | "confirmed" | "completed" | "cancelled"
  created_at: string;
};
