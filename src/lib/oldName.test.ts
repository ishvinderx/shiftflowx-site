import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The old product name may only appear in the places below. Anything else fails the build.
// Stripped everywhere: the legacy hosts / Vercel project (`shiftflowx`, see
// src/lib/legacy-domain.ts) and live Railway names the owner still has to rename.
const GLOBAL_ALLOWED: RegExp[] = [/shiftflowx/gi, /shiftflow-backend(?:-production)?/g, /Railway project: ShiftFlow/g];
const FILE_ALLOWED: Record<string, RegExp[]> = {
  "src/lib/brand.test.ts": [/shiftflow/gi], // guard: must spell the old name to forbid it
  "src/lib/claims.test.ts": [/ShiftFlow Score/g], // guard: banned-claims list
  "src/lib/oldName.test.ts": [/.*/g],
};

export function oldNameHits(file: string, text: string): string[] {
  const allowed = [...GLOBAL_ALLOWED, ...(FILE_ALLOWED[file] ?? [])];
  const hits: string[] = [];
  text.split("\n").forEach((line, i) => {
    let rest = line;
    for (const re of allowed) rest = rest.replace(re, "");
    if (/shiftflow/i.test(rest)) hits.push(`${file}:${i + 1}: ${line.trim()}`);
  });
  return hits;
}

describe("old product name guard", () => {
  it("detects the old name outside the allow-list (self-check)", () => {
    expect(oldNameHits("src/x.ts", 'const a = "ShiftFlow"')).toHaveLength(1);
    expect(oldNameHits("src/x.ts", "https://shiftflowx.net and shiftflow-backend")).toHaveLength(0);
  });

  it("no tracked file path or content mentions the old name except the frozen/allow-listed ones", () => {
    const root = process.cwd();
    const files = execFileSync("git", ["ls-files", "-z"], { cwd: root }).toString().split("\0").filter(Boolean);
    const bad: string[] = [];
    for (const f of files) {
      if (f === "package-lock.json") continue;
      if (/shiftflow/i.test(f.replace(/shiftflowx/gi, ""))) bad.push(`path: ${f}`);
      let text: string;
      try { text = readFileSync(join(root, f), "utf8"); } catch { continue; }
      if (text.includes("\0")) continue;
      bad.push(...oldNameHits(f, text));
    }
    expect(bad).toEqual([]);
  });
});
