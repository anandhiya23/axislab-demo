// Single source of truth for programs, shared by the landing page,
// pricing, and the booking form. Prices from the brand deck (IDR).

export type Service = {
  slug: string;
  name: string;
  intensity: string;
  blurb: string;
  price: string; // display string; null-ish handled as "By consultation"
};

export const SERVICES: Service[] = [
  {
    slug: "therapy",
    name: "Sports Therapy",
    intensity: "Low–Moderate Intensity",
    blurb:
      "Prioritizes recovery, mobility, and rehabilitation while rebuilding foundational strength.",
    price: "By consultation",
  },
  {
    slug: "pilates",
    name: "Pilates",
    intensity: "Moderate Intensity",
    blurb:
      "Enhances core stability, control, and balanced endurance through sustained, mindful effort.",
    price: "IDR 1,600,000 / 4 sessions",
  },
  {
    slug: "fitness",
    name: "Fitness",
    intensity: "Moderate–High Intensity",
    blurb:
      "Focuses on strength and endurance training. Drives performance gains, power, and cardiovascular capacity.",
    price: "IDR 1,200,000 / 4 sessions",
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    intensity: "Tailored Intensity",
    blurb:
      "One-on-one coaching built around your body's ideal rhythm, goals, and recovery.",
    price: "IDR 2,600,000 / 4 sessions",
  },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.name);

export function serviceByName(name: string): Service | undefined {
  return SERVICES.find((s) => s.name === name);
}
