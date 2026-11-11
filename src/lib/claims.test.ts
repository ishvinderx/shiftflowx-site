import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// Features the ShiftFlow app does NOT have. None of these may be advertised in src/ or public/.
const BANNED = ["ShiftFlow Score", "burnout", "AI Assistant", "credit score", "net worth"];

// Files that still contain banned text and are deliberately out of scope of the marketing
// clean-up. Each needs an owner decision, then should be removed from this list (the
// "stale exemption" test below fails once a listed file is clean, so the list can only shrink).
//  - referral pages: excluded from the clean-up brief (not to be touched).
//  - privacy / data-policy / security: legal text; edits need owner/lawyer review.
const EXEMPT = new Set([
  "src/app/referral/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/data-policy/page.tsx",
  "src/app/security/page.tsx",
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|txt|md|json|svg|css)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

const root = process.cwd();
const files = [...walk(join(root, "src")), ...walk(join(root, "public"))].map((f) => ({
  rel: relative(root, f),
  text: readFileSync(f, "utf8").toLowerCase(),
}));
const hits = (text: string) => BANNED.filter((b) => text.includes(b.toLowerCase()));

describe("no claims about features the app does not have", () => {
  it("scans files", () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it("src/ and public/ do not mention removed features (outside the documented exemptions)", () => {
    const offenders = files
      .filter((f) => !EXEMPT.has(f.rel))
      .map((f) => ({ file: f.rel, found: hits(f.text) }))
      .filter((o) => o.found.length > 0);
    expect(offenders).toEqual([]);
  });

  it("exemptions are not stale", () => {
    const stale = [...EXEMPT].filter((rel) => {
      const f = files.find((x) => x.rel === rel);
      return !f || hits(f.text).length === 0;
    });
    expect(stale).toEqual([]);
  });
});
