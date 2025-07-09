import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
  images: {
    domains: ["picsum.photos", "unsplash.com"],
  },
};

export default nextConfig;
