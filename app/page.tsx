import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { LogoMark, Wordmark } from "@/components/Logo";
import { SERVICES } from "@/lib/services";

const DIMENSIONS = [
  ["Mind", "Body"],
  ["Strength", "Mobility"],
  ["Intensity", "Recovery"],
] as const;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* HERO — split: monochrome photo / paper panel */}
        <section className="relative flex min-h-screen flex-col md:flex-row">
          <div className="relative min-h-[45vh] flex-1 md:min-h-screen md:basis-[45%]">
            <PhotoSlot
              className="absolute inset-0 h-full w-full"
              label="Hero — motion portrait"
              priority
            />
            <div className="absolute left-5 top-24 z-10 text-paper sm:left-8">
              <Wordmark />
            </div>
          </div>

          <div className="flex flex-1 items-center bg-paper px-6 py-20 text-ink md:basis-[55%] md:px-16">
            <div className="max-w-xl rise">
              <div className="label mb-6 text-ink/50">What is Axis Lab?</div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                A space for alignment, balance, and progress.
              </h1>
              <p className="mt-7 max-w-md text-base leading-relaxed text-ink/60">
                At Axis Lab, we focus on restoring your body&apos;s awareness and its
                core foundation through continuous improvement. Just like a lab,
                catered for you.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/book"
                  className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
                >
                  Book a session
                </Link>
                <Link
                  href="/#programs"
                  className="text-sm font-medium text-ink/70 underline-offset-4 hover:underline"
                >
                  Explore classes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="about" className="border-t border-line bg-ink px-5 py-28 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="label mb-10 text-paper/40">Axis Lab believes that</div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                Wellness today moves very fast — but wellness is a{" "}
                <span className="font-bold">long-term game.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/55">
                We built Axis Lab on principles that don&apos;t expire. Trends,
                methods, and formats will evolve. The foundation stays the same:
                balance is the constant.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {[
                ["Core wellbeing", "Willing to invest time and attention into their core wellbeing."],
                ["Sustainability", "Care about sustainability, not quick fixes."],
                ["Progress", "Want progress without burning out."],
              ].map(([title, body], i) => (
                <Reveal key={title} delay={i * 90} className="bg-ink p-7">
                  <div className="brand-word mb-3 text-sm text-paper">{title}</div>
                  <p className="text-sm leading-relaxed text-paper/55">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DIMENSIONS — the axis motif */}
        <section className="border-t border-line bg-ink px-5 py-28 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <LogoMark size={28} className="text-paper" />
                <div className="label text-paper/40">Balance happens across dimensions</div>
              </div>
            </Reveal>

            <div className="mt-14 space-y-14">
              {DIMENSIONS.map(([a, b], i) => (
                <Reveal key={a} delay={i * 100}>
                  <div className="relative">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-light tracking-tight sm:text-5xl">
                        {a}
                      </span>
                      <span className="text-3xl font-light tracking-tight text-paper/45 sm:text-5xl">
                        {b}
                      </span>
                    </div>
                    <div className="relative mt-5 h-px w-full bg-line">
                      <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-paper/50" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="border-t border-line bg-ink px-5 py-28 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="label mb-4 text-paper/40">Our programs</div>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A cohesive system across the intensity spectrum.
              </h2>
            </Reveal>

            {/* intensity band */}
            <Reveal delay={80}>
              <div className="mt-10 flex items-center gap-4 text-[0.65rem] tracking-[0.18em] text-paper/40 uppercase">
                <span>Low</span>
                <div className="h-px flex-1 bg-gradient-to-r from-paper/10 via-paper/40 to-paper/90" />
                <span>High</span>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={i * 80}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-line">
                    <PhotoSlot className="aspect-[4/5] w-full" label={s.name} />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="label text-paper/40">{s.intensity}</div>
                      <h3 className="mt-2 text-xl font-semibold">{s.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/55">
                        {s.blurb}
                      </p>
                      <div className="mt-5 text-sm text-paper/70">{s.price}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-t border-line bg-paper px-5 py-28 text-ink sm:px-8">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="label mb-4 text-ink/40">First-timer package</div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Start with intention.
              </h2>
              <p className="mt-4 max-w-lg text-ink/60">
                Valid for 14 days from the date of your first booking.
                Non-transferable. Prices include tax.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 divide-y divide-line-dark border-y border-line-dark">
                {SERVICES.map((s) => (
                  <div
                    key={s.slug}
                    className="flex items-center justify-between gap-4 py-5"
                  >
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-ink/50">{s.intensity}</div>
                    </div>
                    <div className="text-right text-sm font-medium text-ink/80">
                      {s.price}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10">
                <Link
                  href="/book"
                  className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
                >
                  Book your first session
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-line">
          <PhotoSlot className="absolute inset-0 h-full w-full" label="" />
          <div className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8">
            <Reveal>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Don&apos;t let your resolution slip away.
              </h2>
              <p className="mt-6 max-w-md text-lg text-paper/70">
                Sign up now and get 25% off any package for your first month.
              </p>
              <Link
                href="/book"
                className="mt-9 inline-block rounded-full bg-paper px-8 py-4 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                Book your first session
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
