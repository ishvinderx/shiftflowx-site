import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPANY_LOCATION, FOOTER_LINKS, LEGAL_LAST_UPDATED, PLAN_POLICY, PRIVACY_EMAIL, SUPPORT_EMAIL } from "./constants";
import { LEGAL_PAGES } from "@/content/legal";
import { DATA_CATEGORIES, PROVIDERS } from "@/content/dataPractices";
import sitemap from "@/app/sitemap";

const root = process.cwd();
const read = (rel: string) => readFileSync(join(root, rel), "utf8");
const pageFile = (href: string) =>
  [`src/app/(legal)${href}/page.tsx`, `src/app/(account)${href}/page.tsx`, `src/app/(legal)${href}/page.tsx`].find((f) => existsSync(join(root, f)));

describe("legal pages", () => {
  it("every page in the legal index exists, is in the sitemap, and is linked from the footer or the hub", () => {
    const urls = sitemap().map((s) => s.url);
    for (const p of LEGAL_PAGES) {
      expect(pageFile(p.href), p.href).toBeTruthy();
      expect(urls, p.href).toContain(`https://hoursflow.app${p.href}`);
    }
    for (const l of FOOTER_LINKS.Legal) expect(pageFile(l.href), l.href).toBeTruthy();
  });

  it("every page takes its date from one constant and says what changed", () => {
    expect(LEGAL_LAST_UPDATED).toBe("15 November 2026");
    for (const p of LEGAL_PAGES) {
      const src = read(pageFile(p.href)!);
      expect(src, p.href).toContain("whatChanged=");
      expect(src, p.href).not.toMatch(/effectiveDate/);
    }
  });

  it("the in-app legal links resolve to pages that exist", () => {
    for (const href of ["/privacy", "/terms", "/subscription-terms", "/data-policy", "/support"]) {
      expect(pageFile(href) ?? existsSync(join(root, `src/app/(account)${href}/page.tsx`)), href).toBeTruthy();
    }
  });

  it("publishes no street address and shows the city, province and contact emails", () => {
    expect(COMPANY_LOCATION).toBe("Brampton, Ontario, Canada");
    expect(PRIVACY_EMAIL).toBe("privacy@hoursflow.app");
    expect(SUPPORT_EMAIL).toBe("support@hoursflow.app");
    for (const p of LEGAL_PAGES) {
      const src = read(pageFile(p.href)!);
      expect(src, p.href).not.toMatch(/\b[A-Z]\d[A-Z] ?\d[A-Z]\d\b/); // Canadian postal code
      expect(src, p.href).not.toMatch(/Blvd|Unit \d+/);
    }
  });

  it("chooses Apple's standard EULA, consistently", () => {
    const eula = read("src/app/(legal)/eula/page.tsx");
    const terms = read("src/app/(legal)/terms/page.tsx");
    expect(eula).toContain("https://www.apple.com/legal/internet-services/itunes/dev/stdeula/");
    expect(eula).toContain("We have not written a custom EULA");
    expect(terms).toContain("do not replace it");
  });

  it("states the plan limits the product uses", () => {
    expect(PLAN_POLICY.free).toContain("two employers");
    expect(PLAN_POLICY.subscribers).toContain("more than two employers");
    const subs = read("src/app/(legal)/subscription-terms/page.tsx");
    expect(subs).toContain("Family Sharing is not enabled");
    expect(subs).toContain("at least 24 hours before");
    expect(subs).toContain("reportaproblem.apple.com");
  });

  it("the data policy and privacy policy come from the same source and list no push tokens", () => {
    const dp = read("src/app/(legal)/data-policy/page.tsx");
    const pp = read("src/app/(legal)/privacy/page.tsx");
    expect(dp).toContain("DATA_CATEGORIES");
    expect(pp).toContain("DATA_CATEGORIES");
    expect(JSON.stringify(DATA_CATEGORIES)).not.toMatch(/push (notification )?token|device token/i);
    expect(PROVIDERS.map((p) => p.id)).toEqual(
      expect.arrayContaining(["railway", "cloudflare-r2", "resend", "revenuecat", "posthog", "sentry", "apple", "google", "vercel"]),
    );
  });
});
