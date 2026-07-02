// Human-friendly booking reference, e.g. "AXL-7QK2P9".
// Avoids ambiguous characters (0/O, 1/I) so it's easy to read over the phone.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateBookingId(): string {
  let out = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < 6; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return `AXL-${out}`;
}

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  source?: "website" | "whatsapp";
};

export function validateBooking(input: Partial<BookingInput>): string | null {
  if (!input.name || input.name.trim().length < 2) return "Please enter your name.";
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    return "Please enter a valid email address.";
  if (!input.phone || input.phone.trim().length < 6)
    return "Please enter a valid WhatsApp number.";
  if (!input.service) return "Please choose a program.";
  if (!input.preferred_date) return "Please choose a preferred date.";
  if (!input.preferred_time) return "Please choose a preferred time.";
  return null;
}
