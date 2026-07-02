import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Public status lookup by Booking ID. Returns only non-sensitive fields.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bookingId = id.trim().toUpperCase();

  if (!/^AXL-[A-Z0-9]{6}$/.test(bookingId)) {
    return NextResponse.json({ error: "Invalid booking ID." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("booking_id, name, service, preferred_date, preferred_time, status, created_at")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (error) {
    console.error("[bookings] lookup failed:", error);
    return NextResponse.json({ error: "Lookup failed." }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  // Only expose the first name for privacy.
  const firstName = data.name.split(/\s+/)[0];
  return NextResponse.json({ ...data, name: firstName });
}
