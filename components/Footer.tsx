import Link from "next/link";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer id="visit" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/55">
              A place to return to the core. A space to maintain balance.
              A system designed to grow with time.
            </p>
          </div>

          <div className="text-sm">
            <div className="label mb-4 text-paper/40">Visit</div>
            <p className="leading-relaxed text-paper/70">
              Jalan Hang Lekir No. 8<br />
              Kebayoran Baru<br />
              Jakarta Selatan 12120<br />
              Indonesia
            </p>
          </div>

          <div className="text-sm">
            <div className="label mb-4 text-paper/40">Contact</div>
            <p className="space-y-1 leading-relaxed text-paper/70">
              <a href="tel:+622156781234" className="block hover:text-paper">
                (021) 5678 1234
              </a>
              <a href="mailto:hello@axislab.id" className="block hover:text-paper">
                hello@axislab.id
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="block hover:text-paper"
              >
                WhatsApp CS
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-paper/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Axis Lab · by Body Gravity</span>
          <Link href="/status" className="hover:text-paper">
            Check a booking →
          </Link>
        </div>
      </div>
    </footer>
  );
}
