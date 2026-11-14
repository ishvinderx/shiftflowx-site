import type { NextConfig } from "next";
import { API_BASE_URL } from "./src/lib/constants";

// CSP connect-src is derived from the same constant the pages fetch with.
const API_ORIGIN = new URL(API_BASE_URL).origin;
const POSTHOG_ORIGIN = new URL(
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
).origin;

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // Force HTTPS for 2 years incl. subdomains (site is HTTPS-only on Vercel).
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Allow Next.js inline scripts and same-origin fetches; block everything else.
    // 'unsafe-inline' on script-src is required for Next.js hydration in pages router;
    // App Router uses nonces — tighten this further once all pages use App Router.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `connect-src 'self' ${API_ORIGIN} ${POSTHOG_ORIGIN}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Anti-duplicate (spec §35): identical search intent — one canonical URL.
        source: "/hours-worked-calculator",
        destination: "/work-hours-calculator",
        permanent: true,
      },
      // Information architecture (2026-11): /how-it-works was folded into /features;
      // /compare was removed (unverified competitor claims).
      { source: "/how-it-works", destination: "/features", permanent: true },
      { source: "/compare", destination: "/features", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
