import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare Tunnel domains in dev mode without throwing Unauthorized on HMR
  allowedDevOrigins: ["*.trycloudflare.com", "localhost:3000"],
};

export default nextConfig;
