import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'], // TMDB images come from this domain
  },
};

export default nextConfig;
