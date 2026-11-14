import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND, APP_STORE_URL, PRICING } from "./constants";

// The product was renamed from the old name to HoursFlow. The old name must not appear in
// src/ or public/ except inside the patterns below (the domain, email addresses and
// storage keys, which are deliberately unchanged). This file and other tests are skipped.
const OLD = /shiftflow/i;
const ALLOWED = [
  /shiftflowx\.net/gi, // domain, API host and email addresses
  /\bsf_[a-z_]+/gi, // storage keys
];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|txt|md|json|svg|css|html|xml)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

const root = process.cwd();
const files = [...walk(join(root, "src")), ...walk(join(root, "public"))];

describe("brand", () => {
  it("is HoursFlow, with the paid tier named from it", () => {
    expect(BRAND.name).toBe("HoursFlow");
    expect(BRAND.proName).toBe(`${BRAND.name} Pro`);
    expect(BRAND.legalEntity).toBe("Flowmatix Creative Inc.");
    expect(APP_STORE_URL).toContain("/id6768095892");
    expect(APP_STORE_URL).toContain("/app/hoursflow/");
  });

  it("the old product name does not appear in src/ or public/ (outside domain, email, storage keys)", () => {
    expect(files.length).toBeGreaterThan(50);
    const offenders = files
      .map((f) => {
        let text = readFileSync(f, "utf8");
        for (const re of ALLOWED) text = text.replace(re, "");
        return { file: relative(root, f), found: OLD.test(text) };
      })
      .filter((o) => o.found)
      .map((o) => o.file);
    expect(offenders).toEqual([]);
  });

  it("public/llms.txt names the paid tier and trial from the constants", () => {
    const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
    expect(llms).toContain(`${BRAND.proName} Monthly: ${PRICING.monthly.perLabel}`);
    expect(llms).toContain(APP_STORE_URL);
    expect(llms).toContain(BRAND.name);
  });
});
