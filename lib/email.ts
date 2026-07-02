import { Resend } from "resend";
import type { BookingRow } from "./supabase";

// Confirmation email via Resend. Fails soft: if the key is missing or the
// send errors, we log and let the booking succeed anyway (email is a nicety,
// not a blocker for the reservation record).

const FROM = process.env.BOOKING_FROM_EMAIL || "Axis Lab <onboarding@resend.dev>";

export async function sendBookingConfirmation(booking: BookingRow): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping confirmation email.");
    return;
  }

  const resend = new Resend(apiKey);
  const statusUrl = `${siteUrl()}/status?id=${encodeURIComponent(booking.booking_id)}`;

  try {
    await resend.emails.send({
      from: FROM,
      to: booking.email,
      subject: `Your Axis Lab booking — ${booking.booking_id}`,
      html: render(booking, statusUrl),
      text: renderText(booking, statusUrl),
    });
  } catch (err) {
    console.error("[email] confirmation send failed:", err);
  }
}

function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function renderText(b: BookingRow, url: string): string {
  return [
    `Axis Lab — Booking received`,
    ``,
    `Hi ${b.name},`,
    `We've received your booking request. Our team will confirm your slot shortly.`,
    ``,
    `Booking ID: ${b.booking_id}`,
    `Program: ${b.service}`,
    `Preferred: ${b.preferred_date} at ${b.preferred_time}`,
    `Status: ${b.status}`,
    ``,
    `Check your booking anytime: ${url}`,
    ``,
    `A space for alignment, balance, and progress.`,
    `Axis Lab — Fitness & Pilates`,
  ].join("\n");
}

function render(b: BookingRow, url: string): string {
  return `
  <div style="background:#0a0a0a;padding:40px 0;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f4ef">
    <div style="max-width:520px;margin:0 auto;padding:0 24px">
      <div style="letter-spacing:.28em;font-size:18px;font-weight:600">AXIS&nbsp;LAB</div>
      <div style="letter-spacing:.22em;font-size:10px;color:#9a9a9a;margin-top:6px">FITNESS &amp; PILATES</div>

      <div style="height:1px;background:rgba(255,255,255,.14);margin:28px 0"></div>

      <h1 style="font-size:22px;font-weight:600;margin:0 0 8px">Booking received</h1>
      <p style="color:#b8b6ad;font-size:14px;line-height:1.6;margin:0 0 24px">
        Hi ${escapeHtml(b.name)}, we've received your request. Our team will
        confirm your slot shortly — you'll get another note once it's locked in.
      </p>

      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Booking ID", `<strong style="letter-spacing:.08em">${b.booking_id}</strong>`)}
        ${row("Program", escapeHtml(b.service))}
        ${row("Preferred date", escapeHtml(b.preferred_date))}
        ${row("Preferred time", escapeHtml(b.preferred_time))}
        ${row("Status", `<span style="text-transform:capitalize">${escapeHtml(b.status)}</span>`)}
      </table>

      <a href="${url}" style="display:inline-block;margin-top:28px;background:#f5f4ef;color:#0a0a0a;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.04em">
        Check your booking status
      </a>

      <div style="height:1px;background:rgba(255,255,255,.14);margin:32px 0 20px"></div>
      <p style="color:#7a7a7a;font-size:12px;line-height:1.6;margin:0">
        A space for alignment, balance, and progress.<br/>
        Axis Lab — Fitness &amp; Pilates
      </p>
    </div>
  </div>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;color:#8a8a8a;border-bottom:1px solid rgba(255,255,255,.08)">${label}</td>
    <td style="padding:10px 0;text-align:right;border-bottom:1px solid rgba(255,255,255,.08)">${value}</td>
  </tr>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
