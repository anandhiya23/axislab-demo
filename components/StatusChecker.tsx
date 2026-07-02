"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Booking = {
  booking_id: string;
  name: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
};

const STATUS_COPY: Record<string, string> = {
  pending: "We've received your request and will confirm shortly.",
  confirmed: "Your slot is confirmed. See you at the studio.",
  completed: "Session completed. Nice work.",
  cancelled: "This booking was cancelled. Contact us to rebook.",
};

export function StatusChecker() {
  const params = useSearchParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const lookup = useCallback(async (bookingId: string) => {
    const clean = bookingId.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setError(null);
    setBooking(null);
    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Not found.");
      setBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-lookup when arriving from an email link (?id=AXL-XXXXXX)
  useEffect(() => {
    const fromUrl = params.get("id");
    if (fromUrl) {
      setId(fromUrl);
      lookup(fromUrl);
    }
  }, [params, lookup]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(id);
        }}
        className="flex gap-3"
      >
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="AXL-XXXXXX"
          className="w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-sm uppercase tracking-wide text-paper outline-none placeholder:text-paper/30 focus:border-paper/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-lg bg-paper px-6 py-3 text-sm font-semibold text-ink disabled:opacity-60"
        >
          {loading ? "…" : "Check"}
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-lg border border-line px-4 py-3 text-sm text-paper/60">
          {error}
        </p>
      )}

      {booking && (
        <div className="mt-8 rounded-xl border border-line p-7 rise">
          <div className="flex items-center justify-between">
            <span className="label text-paper/40">Booking</span>
            <StatusPill status={booking.status} />
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-tight">
            {booking.booking_id}
          </div>
          <p className="mt-2 text-sm text-paper/60">
            {STATUS_COPY[booking.status] ?? "Status updated."}
          </p>

          <dl className="mt-6 space-y-3 text-sm">
            <Row k="Name" v={booking.name} />
            <Row k="Program" v={booking.service} />
            <Row k="Date" v={booking.preferred_date} />
            <Row k="Time" v={booking.preferred_time} />
          </dl>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-line pb-3">
      <dt className="text-paper/45">{k}</dt>
      <dd className="text-paper/90">{v}</dd>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 text-xs capitalize text-paper/80">
      {status}
    </span>
  );
}
