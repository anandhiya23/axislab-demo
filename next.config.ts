import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote photography if the client hosts assets on a CDN later.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
