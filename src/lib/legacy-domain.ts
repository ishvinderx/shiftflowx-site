import { SITE_HOST, SITE_URL } from "./constants";

// ─── Retired domain (redirects + CSP transition only) ────────────────────────
// The product moved from the old domain to SITE_HOST. This is the ONLY file (with
// its test) where the old domain may appear; it is allow-listed in brand.test.ts.
// It must never reach rendered public text.
export const LEGACY_HOSTS = ["shiftflowx.net", "www.shiftflowx.net"] as const;

// Old API origin, kept in CSP connect-src during the transition.
// TODO: remove after the API cut-over to api.<SITE_HOST> is complete.
export const LEGACY_API_ORIGIN = "https://api.shiftflowx.net";

const hostPattern = (host: string) => host.replace(/\./g, "\\.");

/** Permanent (308) host-based redirects, each keeping the request path. */
export function domainRedirects() {
  return [
    ...LEGACY_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: hostPattern(host) }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    })),
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: hostPattern(`www.${SITE_HOST}`) }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    },
  ];
}
