import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// Ledger design guard: colours live in tokens (src/app/globals.css) only. Under src/app and
// src/components, no hex colours, rgb()/hsl(), text-white, bg-black, gradient or shadow classes.
// ALLOW lists files that genuinely need literals (ImageResponse cannot read CSS variables).
const ALLOW = new Set<string>(["src/app/opengraph-image.tsx"]);

const RULES: [string, RegExp][] = [
  ["hex colour", /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![\w-])/],
  ["rgb/hsl literal", /\b(?:rgba?|hsla?)\(/],
  ["text-white / bg-black / bg-white", /\b(?:text-white|bg-black|bg-white)\b/],
  ["gradient", /(?:^|[\s"'`:])(?:from|via|to)-(?:\[|ink|ground|mint|periwinkle|rule|track|transparent|white|black|brand|teal|indigo|[a-z]+-\d)|\bbg-gradient|(?:linear|radial|conic)-gradient/],
  ["shadow", /\b(?:drop-)?shadow(?:-|\b)|box-?[sS]hadow|text-?[sS]hadow/],
];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|css)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

const root = process.cwd();
const files = [...walk(join(root, "src/app")), ...walk(join(root, "src/components"))]
  .map((f) => relative(root, f))
  .filter((f) => f !== "src/app/globals.css" && !ALLOW.has(f));

describe("design guard", () => {
  it("scans files", () => expect(files.length).toBeGreaterThan(30));
  for (const [name, re] of RULES) {
    it(`no ${name} outside globals.css`, () => {
      const offenders = files.flatMap((f) =>
        readFileSync(join(root, f), "utf8")
          .split("\n")
          // hrefs and HTML entities such as &#8217; or anchors like "#overview" are not colours
          .map((l, i) => ({ f, i: i + 1, l: l.replace(/&#\d+;|href="[^"]*"|id="[^"]*"/g, "") }))
          .filter((x) => re.test(x.l))
          .map((x) => `${x.f}:${x.i}`),
      );
      expect(offenders).toEqual([]);
    });
  }
});
