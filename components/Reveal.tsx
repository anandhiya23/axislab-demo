"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-in reveal as *progressive enhancement*: the content is visible by
// default (SSR / no-JS / crawlers all see it). Only after mount do we hide it
// and animate it in when it scrolls into view. If the observer never fires,
// a fallback timer reveals it so content can never get stuck hidden.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const reveal = () => setShown(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    // Safety net: never leave content hidden if the observer doesn't fire.
    const t = setTimeout(reveal, 1200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const hidden = mounted && !shown;
  return (
    <div
      ref={ref}
      className={`${className} ${shown ? "rise" : ""} ${hidden ? "opacity-0" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
