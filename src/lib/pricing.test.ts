import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PRICING } from "./constants";

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
});
