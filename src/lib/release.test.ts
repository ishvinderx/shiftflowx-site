import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { APP_STORE_URL, APP_STORE_URL_PLACEHOLDER, resolveAppStoreUrl } from "./constants";

describe("resolveAppStoreUrl", () => {
  it("falls back to the placeholder and honours the env override", () => {
    expect(resolveAppStoreUrl({})).toBe(APP_STORE_URL_PLACEHOLDER);
    expect(resolveAppStoreUrl({ NEXT_PUBLIC_APP_STORE_URL: "  " })).toBe(APP_STORE_URL_PLACEHOLDER);
    expect(resolveAppStoreUrl({ NEXT_PUBLIC_APP_STORE_URL: "https://apps.apple.com/app/hoursflow/id1" }))
      .toBe("https://apps.apple.com/app/hoursflow/id1");
  });
});

// Release gate. Normal builds and test runs are unaffected: this only bites when ALL of
//   RELEASE=1, NODE_ENV=production and NEXT_PUBLIC_APP_STORE_URL unset
// are combined, e.g.  RELEASE=1 NODE_ENV=production npx vitest run src/lib/release.test.ts
const releaseCheck = process.env.RELEASE === "1" && process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_APP_STORE_URL;

describe("release gate: App Store URL", () => {
  it.runIf(releaseCheck)("is not the placeholder (set NEXT_PUBLIC_APP_STORE_URL)", () => {
    expect(APP_STORE_URL).not.toBe(APP_STORE_URL_PLACEHOLDER);
  });

  it.skipIf(releaseCheck)("is skipped outside a release check", () => {
    expect(true).toBe(true);
  });

  it("public/llms.txt carries the App Store URL in use, or the placeholder", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    expect(llms).toContain(`- App Store: ${APP_STORE_URL}`);
  });
});
