import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // CMS-hosted cover images (dojos/instructors/adventures/events/news) assume the
      // production backend serves media from hdkikenya.co.ke or a subdomain of it. Confirm
      // the real media host once the backend is deployed, then drop `unoptimized` from the
      // <Image> tags in *DetailClient.tsx that currently bypass optimization because of this.
      {
        protocol: "https",
        hostname: "hdkikenya.co.ke",
      },
      {
        protocol: "https",
        hostname: "*.hdkikenya.co.ke",
      },
    ],
  },
};

export default nextConfig;
