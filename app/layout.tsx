import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axis Lab — Fitness & Pilates",
  description:
    "A space for alignment, balance, and progress. Fitness, Pilates, and Sports Therapy in Jakarta. Book your session at Axis Lab.",
  metadataBase: new URL("https://axislab.id"),
  openGraph: {
    title: "Axis Lab — Fitness & Pilates",
    description: "A space for alignment, balance, and progress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
