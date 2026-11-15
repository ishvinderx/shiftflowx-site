import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { SITE_URL } from "./constants";
import { LEGACY_API_ORIGIN, LEGACY_HOSTS, domainRedirects } from "./legacy-domain";

describe("domain redirects", () => {
  const rules = domainRedirects();

  it("sends the old domain, old www and new www to the canonical host, same path, permanently", () => {
    const hostValues = rules.map((r) => r.has[0].value);
    for (const h of [...LEGACY_HOSTS, "www.hoursflow.app"]) {
      const rule = rules.find((r) => new RegExp(`^${r.has[0].value}$`).test(h));
      expect(rule, h).toBeDefined();
      expect(rule!.has[0].type).toBe("host");
      expect(rule!.source).toBe("/:path*");
      expect(rule!.destination).toBe(`${SITE_URL}/:path*`);
      expect(rule!.permanent).toBe(true);
    }
    // dots are escaped, so lookalike hosts do not match
    expect(hostValues.some((v) => new RegExp(`^${v}$`).test("shiftflowxXnet"))).toBe(false);
    // the canonical host itself is never redirected (no loop)
    expect(hostValues.some((v) => new RegExp(`^${v}$`).test("hoursflow.app"))).toBe(false);
  });

  it("is wired into next.config redirects, ahead of the path redirects", async () => {
    const all = await nextConfig.redirects!();
    expect(all.slice(0, rules.length)).toEqual(rules);
  });

  it("keeps the old API host and allows the new one in CSP connect-src", async () => {
    const headers = await nextConfig.headers!();
    const csp = headers[0].headers.find((h) => h.key === "Content-Security-Policy")!.value;
    const connect = csp.split("; ").find((d) => d.startsWith("connect-src"))!;
    expect(connect).toContain("https://api.hoursflow.app");
    expect(connect).toContain(LEGACY_API_ORIGIN);
  });
});
