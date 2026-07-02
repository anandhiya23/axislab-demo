import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Wordmark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Book a session — Axis Lab",
  description: "Reserve your Fitness, Pilates, or Sports Therapy session at Axis Lab.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Left panel */}
      <div className="relative hidden md:block md:basis-[42%]">
        <PhotoSlot className="absolute inset-0 h-full w-full" label="Book — studio" priority />
        <div className="absolute left-8 top-8 text-paper">
          <Link href="/">
            <Wordmark />
          </Link>
        </div>
        <div className="absolute bottom-10 left-8 right-8 text-paper">
          <p className="text-2xl font-light leading-tight tracking-tight">
            Finding your body&apos;s ideal rhythm.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center px-5 py-24 sm:px-10 md:basis-[58%]">
        <div className="mx-auto w-full max-w-lg">
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-paper/50 hover:text-paper md:hidden"
          >
            ← Axis Lab
          </Link>
          <div className="label mb-3 text-paper/40">Book your session</div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Reserve your slot.
          </h1>
          <p className="mt-3 mb-10 text-sm leading-relaxed text-paper/55">
            Fill in the details and we&apos;ll confirm your booking by email and
            WhatsApp. You&apos;ll get a Booking ID to track your status.
          </p>

          <BookingForm defaultService={service} />

          <div className="mt-8 text-center text-sm text-paper/50">
            Already booked?{" "}
            <Link href="/status" className="text-paper underline underline-offset-2">
              Check your status
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
