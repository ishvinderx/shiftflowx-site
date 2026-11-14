import { describe, expect, it } from "vitest";
import { SAMPLE_ALLOCATION, SAMPLE_EARNINGS, SAMPLE_SHIFTS } from "./sample-data";

describe("sample data is internally consistent", () => {
  it("allocation segments add up to the income", () => {
    expect(SAMPLE_ALLOCATION.segments.reduce((a, s) => a + s.value, 0)).toBe(SAMPLE_ALLOCATION.income);
  });
  it("each shift's pay is hours x rate", () => {
    for (const s of SAMPLE_SHIFTS) expect(s.hours * s.rate).toBe(s.pay);
  });
  it("the earnings line ends at the sum of shift pay", () => {
    expect(SAMPLE_EARNINGS.at(-1)!.value).toBe(SAMPLE_SHIFTS.reduce((a, s) => a + s.pay, 0));
  });
});
