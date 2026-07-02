import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateBookingId, validateBooking, type BookingInput } from "@/lib/booking";
import { sendBookingConfirmation } from "@/lib/email";
import { SERVICE_NAMES } from "@/lib/services";

export async function POST(req: NextRequest) {
  let body: Partial<BookingInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const error = validateBooking(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  if (!SERVICE_NAMES.includes(body.service!)) {
    return NextResponse.json({ error: "Unknown program." }, { status: 400 });
  }

  const source = body.source === "whatsapp" ? "whatsapp" : "website";
  const bookingId = generateBookingId();

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json(
      { error: "Booking service is not configured. Please contact us via WhatsApp." },
      { status: 503 },
    );
  }

  const { data, error: dbError } = await supabase
    .from("bookings")
    .insert({
      booking_id: bookingId,
      name: body.name!.trim(),
      email: body.email!.trim().toLowerCase(),
      phone: body.phone!.trim(),
      service: body.service!,
      preferred_date: body.preferred_date!,
      preferred_time: body.preferred_time!,
      notes: body.notes?.trim() || null,
      source,
      status: "pending",
    })
    .select()
    .single();

  if (dbError || !data) {
    console.error("[bookings] insert failed:", dbError);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 },
    );
  }

  await sendBookingConfirmation(data);

  return NextResponse.json(
    { booking_id: data.booking_id, status: data.status },
    { status: 201 },
  );
}
