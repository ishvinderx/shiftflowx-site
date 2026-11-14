import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// Features the HoursFlow app does NOT have. None of these may be advertised in src/ or public/.
const BANNED = ["HoursFlow Score", "ShiftFlow Score", "burnout", "AI Assistant", "credit score", "net worth"];

// Files deliberately exempt from the scan. The list is now empty; the stale-exemption
// test below keeps it honest (a listed file that is clean fails the test).
const EXEMPT = new Set<string>([]);

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
