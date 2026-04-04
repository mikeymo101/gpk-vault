import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.geepeekay.com",
        pathname: "/gallery/**",
      },
    ],
  },
};

export default nextConfig;
