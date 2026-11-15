import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND, APP_STORE_URL, PRICING, SITE_URL, SUPPORT_EMAIL, INFO_EMAIL, PRIVACY_EMAIL, API_BASE_URL, API_V1_URL } from "./constants";

// The product was renamed from the old name to HoursFlow, and the domain moved to hoursflow.app.
// The old name (including the old domain "shiftflowx") must not appear in src/ or public/
// except inside the patterns below. This file and other tests are skipped.
const OLD = /shiftflow/i;
const ALLOWED = [
  /\bsf_[a-z_]+/gi, // storage keys, deliberately unchanged
  /com\.ShiftFlowx\.app/g, // iOS bundle id: technical identifier, must not change
];
// The one non-test file allowed to name the retired domain: redirects + CSP transition only.
const LEGACY_DOMAIN_FILE = join("src", "lib", "legacy-domain.ts");

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
        if (relative(root, f) === LEGACY_DOMAIN_FILE) return { file: "", found: false };
        let text = readFileSync(f, "utf8");
        for (const re of ALLOWED) text = text.replace(re, "");
        return { file: relative(root, f), found: OLD.test(text) };
      })
      .filter((o) => o.found)
      .map((o) => o.file);
    expect(offenders).toEqual([]);
  });

  it("canonical site address and emails come from hoursflow.app", () => {
    expect(SITE_URL).toBe("https://hoursflow.app");
    expect(SUPPORT_EMAIL).toBe("support@hoursflow.app");
    expect(INFO_EMAIL).toBe("info@hoursflow.app");
    expect(API_BASE_URL).toBe(process.env.NEXT_PUBLIC_API_URL ? API_BASE_URL : "https://api.hoursflow.app");
    expect(API_V1_URL.endsWith("/api/v1")).toBe(true);
  });

  it("public/llms.txt uses the new domain only", () => {
    const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
    expect(llms).toContain(`${SITE_URL}/pricing.md`);
    expect(llms).toContain(SUPPORT_EMAIL);
    expect(llms).toContain(PRIVACY_EMAIL);
    expect(llms).not.toMatch(/shiftflowx/i);
  });

  it("public/llms.txt names the paid tier and trial from the constants", () => {
    const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
    expect(llms).toContain(`${BRAND.proName} Monthly: ${PRICING.monthly.perLabel}`);
    expect(llms).toContain(APP_STORE_URL);
    expect(llms).toContain(BRAND.name);
  });
});
