import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND, APP_STORE_URL, PRICING, SITE_URL, SUPPORT_EMAIL, INFO_EMAIL, PRIVACY_EMAIL, API_BASE_URL, API_V1_URL } from "./constants";

// HoursFlow is a new app on hoursflow.app. The full-repository old-name guard lives in
// oldName.test.ts; here we only check the brand constants and public text files.

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
    expect(APP_STORE_URL).toMatch(/^https:\/\/apps\.apple\.com\//);
  });

  it("scans a meaningful number of public files", () => {
    expect(files.length).toBeGreaterThan(50);
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
  });

  it("public/llms.txt names the paid tier and trial from the constants", () => {
    const llms = readFileSync(join(root, "public/llms.txt"), "utf8");
    expect(llms).toContain(`${BRAND.proName} Monthly: ${PRICING.monthly.perLabel}`);
    expect(llms).toContain(APP_STORE_URL);
    expect(llms).toContain(BRAND.name);
  });
});
