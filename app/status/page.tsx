import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { StatusChecker } from "@/components/StatusChecker";
import { Wordmark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Check your booking — Axis Lab",
  description: "Enter your Booking ID to see the status of your Axis Lab session.",
};

export default function StatusPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-24">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 inline-block">
          <Wordmark />
        </Link>
        <div className="label mb-3 text-paper/40">Booking status</div>
        <h1 className="text-3xl font-semibold tracking-tight">Check your booking.</h1>
        <p className="mt-3 mb-8 text-sm leading-relaxed text-paper/55">
          Enter the Booking ID from your confirmation email to see where things
          stand.
        </p>

        <Suspense fallback={<div className="text-sm text-paper/40">Loading…</div>}>
          <StatusChecker />
        </Suspense>

        <div className="mt-10 text-center text-sm text-paper/50">
          Need a new session?{" "}
          <Link href="/book" className="text-paper underline underline-offset-2">
            Book now
          </Link>
        </div>
      </div>
    </main>
  );
}
