import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FREE_FEATURES, PLAN_POLICY, PRICING, PRO_FEATURES } from "./constants";

describe("PRICING (single source of truth)", () => {
  it("states the current prices and trial", () => {
    expect(PRICING.monthly.priceLabel).toBe("$6.49");
    expect(PRICING.annual.priceLabel).toBe("$64.99");
    expect(PRICING.trialDays).toBe(7);
  });

  it("derives the annual maths from the two prices", () => {
    // 6.49 x 12 = 77.88 vs 64.99
    expect(PRICING.annual.monthlyEquivalentLabel).toBe("$5.42");
    expect(PRICING.annual.savingsAmount).toBe(12.89);
    expect(PRICING.annual.savingsPct).toBe(17);
  });

  it("public/llms.txt (static, cannot import constants) has not drifted", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    expect(llms).toContain(`HoursFlow Pro Monthly: ${PRICING.monthly.perLabel}`);
    expect(llms).toContain(
      `HoursFlow Pro Annual: ${PRICING.annual.perLabel} (~${PRICING.annual.savingsPct}% savings vs monthly)`
    );
    expect(llms).toContain(`Free Trial: ${PRICING.trialDays} days`);
  });

  it("splits the paycheque check: the answer is Free and Pro, the detail is Pro", () => {
    expect(FREE_FEATURES).toContain("Paycheque check: the answer");
    expect(PRO_FEATURES).toContain("Paycheque check detail");
    expect(FREE_FEATURES).not.toContain("Paycheque check detail");
    expect(PRO_FEATURES).not.toContain("Paycheque check: the answer");
  });

  it("import from a CSV file is Free; shift import from a photo is Pro", () => {
    expect(FREE_FEATURES).toContain("Import from a CSV file");
    expect(PRO_FEATURES).toContain("Shift import from a photo");
    expect(PRO_FEATURES).not.toContain("Import from a CSV file");
  });

  it("plan policy text matches the tiers", () => {
    expect(PLAN_POLICY.free).toMatch(/paycheque check answer/);
    expect(PLAN_POLICY.free).toMatch(/CSV/);
    expect(PLAN_POLICY.subscribers).toMatch(/detail behind a paycheque check/);
  });

  it("public/llms.txt lists the split features", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    for (const f of ["Paycheque check: the answer", "Paycheque check detail", "Import from a CSV file", "Shift import from a photo"]) {
      expect(llms).toContain(f);
    }
  });

  it("no US spelling of paycheque in site text", () => {
    const text = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    expect(text).not.toMatch(/paycheck/i);
  });
});
