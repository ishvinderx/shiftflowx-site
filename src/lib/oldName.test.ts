import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// HoursFlow is a new app. The former product name must not appear anywhere in the repository.
// The forbidden string is assembled from parts so this guard never contains it literally,
// and every tracked file (path and content) is scanned with no allow-list.
export const FORBIDDEN = new RegExp(["shift", "flow"].join(""), "i");

export function oldNameHits(file: string, text: string): string[] {
  const hits: string[] = [];
  text.split("\n").forEach((line, i) => {
    if (FORBIDDEN.test(line)) hits.push(`${file}:${i + 1}: ${line.trim()}`);
  });
  return hits;
}

describe("old product name guard", () => {
  it("detects the forbidden name (self-check)", () => {
    expect(oldNameHits("src/x.ts", `const a = "${["Shift", "Flow"].join("")}"`)).toHaveLength(1);
    expect(oldNameHits("src/x.ts", "const a = 'HoursFlow'")).toHaveLength(0);
  });

  it("no tracked file path or content mentions it", () => {
    const root = process.cwd();
    const files = execFileSync("git", ["ls-files", "-z"], { cwd: root }).toString().split("\0").filter(Boolean);
    expect(files.length).toBeGreaterThan(50);
    const bad: string[] = [];
    for (const f of files) {
      if (FORBIDDEN.test(f)) bad.push(`path: ${f}`);
      let text: string;
      try { text = readFileSync(join(root, f), "utf8"); } catch { continue; }
      if (text.includes("\0")) continue;
      bad.push(...oldNameHits(f, text));
    }
    expect(bad).toEqual([]);
  });
});
