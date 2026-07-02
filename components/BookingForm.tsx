"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/lib/services";

const TIME_SLOTS = [
  "08:30",
  "09:20",
  "10:30",
  "11:30",
  "13:00",
  "15:30",
  "17:00",
  "18:30",
];

type Success = { booking_id: string; status: string };

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
      preferred_date: String(fd.get("preferred_date") || ""),
      preferred_time: String(fd.get("preferred_time") || ""),
      notes: String(fd.get("notes") || ""),
      source: "website" as const,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccess(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-line p-8 text-center rise">
        <div className="label text-paper/40">Booking received</div>
        <div className="mt-4 text-3xl font-semibold tracking-tight">
          {success.booking_id}
        </div>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
          Save your Booking ID. We&apos;ve emailed a confirmation, and our team
          will reach out on WhatsApp to lock in your slot. Status is currently{" "}
          <span className="capitalize text-paper">{success.status}</span>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/status?id=${success.booking_id}`}
            className="rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink"
          >
            Check status
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 text-sm text-paper/80 hover:text-paper"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Full name">
        <input name="name" required autoComplete="name" className={inputCls} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
        </Field>
        <Field label="WhatsApp number">
          <input
            name="phone"
            type="tel"
            required
            placeholder="+62…"
            autoComplete="tel"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Program">
        <select
          name="service"
          required
          defaultValue={defaultService || ""}
          className={inputCls}
        >
          <option value="" disabled>
            Choose a program
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name} — {s.intensity}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date">
          <input
            name="preferred_date"
            type="date"
            required
            min={today}
            className={inputCls}
          />
        </Field>
        <Field label="Preferred time">
          <select name="preferred_time" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Choose a time
            </option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Notes (optional)">
        <textarea name="notes" rows={3} className={inputCls} />
      </Field>

      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-paper py-4 text-sm font-semibold text-ink transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Request booking"}
      </button>

      <p className="text-center text-xs text-paper/40">
        Prefer to talk?{" "}
        <a
          href="https://wa.me/6281234567890"
          className="underline underline-offset-2 hover:text-paper"
        >
          Book via WhatsApp
        </a>{" "}
        — it lands in the same system.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-paper/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-wide text-paper/50">
        {label}
      </span>
      {children}
    </label>
  );
}
