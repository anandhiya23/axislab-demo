"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#programs", label: "Classes" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#visit", label: "Visit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-500 ${
        scrolled ? "bg-ink/85 shadow-[0_1px_0_0_var(--color-line)]" : "bg-ink/40"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-paper">
          <LogoMark size={26} />
          <span className="brand-word text-sm sm:text-base">AXIS LAB</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-paper/80 transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="ml-2 rounded-full bg-paper px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-paper"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-px w-6 bg-paper" />
            <span className="block h-px w-6 bg-paper" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/95 px-5 py-4 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-paper/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-paper px-5 py-3 text-center font-semibold text-ink"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
