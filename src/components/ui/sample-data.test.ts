import { describe, expect, it } from "vitest";
import { SAMPLE_ALLOCATION, SAMPLE_DEDUCTIONS, SAMPLE_EARNINGS, SAMPLE_SHIFTS, SAMPLE_STILL_TO_EARN, money } from "./sample-data";

const total = SAMPLE_SHIFTS.reduce((a, s) => a + s.pay, 0);

describe("sample data is one consistent story (Maya Patel, Harbour Clinic)", () => {
  it("allocation segments add up to the planned $1,590.00", () => {
    expect(SAMPLE_ALLOCATION.segments.reduce((a, s) => a + s.value, 0)).toBe(SAMPLE_ALLOCATION.income);
    expect(SAMPLE_ALLOCATION.income).toBe(1590);
  });
  it("each shift's pay is hours x rate", () => {
    for (const s of SAMPLE_SHIFTS) expect(s.hours * s.rate).toBeCloseTo(s.pay, 2);
  });
  it("the pay period is 48.0 h and $1,512.00 before tax", () => {
    expect(SAMPLE_SHIFTS.reduce((a, s) => a + s.hours, 0)).toBe(48);
    expect(total).toBeCloseTo(1512, 2);
    expect(SAMPLE_EARNINGS.at(-1)!.value).toBeCloseTo(1512, 2);
  });
  it("after deductions and still to earn match the presentation", () => {
    expect(money(total - SAMPLE_DEDUCTIONS)).toBe("$1,368.36");
    expect(SAMPLE_ALLOCATION.income - (total - SAMPLE_DEDUCTIONS)).toBeCloseTo(SAMPLE_STILL_TO_EARN, 2);
  });
  it("the old stray figures are gone", () => {
    const files = JSON.stringify([SAMPLE_ALLOCATION, SAMPLE_SHIFTS]);
    expect(files).not.toMatch(/2400|863|Northside/);
  });
});
