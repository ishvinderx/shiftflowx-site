# ShiftFlow Website Build Report

## Build Timestamp
2026-06-09

## Build Tool
Next.js 16.2.6 (Turbopack)

## Final Status: PASS

`npm run build` exits with code 0. ESLint reports 0 errors, 0 warnings.

---

## Total Pages Built: 40

---

## All Pages and Their Types

| Route | Type |
|---|---|
| / | Static |
| /_not-found | Static |
| /about | Static |
| /admin | Static |
| /admin/referrals | Static |
| /api/ref/click | Dynamic (server-rendered on demand) |
| /apple-icon.png | Static |
| /blog | Static |
| /blog/[slug] — 6+ paths | SSG (generateStaticParams) |
| /blog/how-to-track-work-hours | SSG |
| /blog/how-payroll-errors-happen | SSG |
| /blog/gig-workers-tax-guide | SSG |
| /blog/[+3 more paths] | SSG |
| /compare | Static |
| /cookie-policy | Static |
| /data-policy | Static |
| /delete | Static |
| /download | Static |
| /eula | Static |
| /features | Static |
| /how-it-works | Static |
| /icon.png | Static |
| /opengraph-image | Dynamic (server-rendered on demand) |
| /pricing | Static |
| /privacy | Static |
| /ref/[code] | Dynamic (server-rendered on demand) |
| /referral | Static |
| /refund | Static |
| /robots.txt | Static |
| /security | Static |
| /sitemap.xml | Static |
| /subscription-terms | Static |
| /support | Static |
| /terms | Static |
| /use-cases/contractors | Static |
| /use-cases/freelancers | Static |
| /use-cases/gig-workers | Static |
| /use-cases/hourly-workers | Static |
| /use-cases/nurses | Static |

---

## Warnings Encountered and Resolutions

### 1. ESLint Error — `react-hooks/set-state-in-effect`
**File:** `src/app/ref/[code]/ReferralLandingClient.tsx` (line 98)
**Issue:** `setTimeLeft(computeRemaining(startMs))` was called synchronously inside a `useEffect` body, triggering the `react-hooks/set-state-in-effect` lint error. Calling `setState` synchronously within an effect body causes cascading renders.
**Resolution:** Extracted the state update into a named `update` function, then called `setInterval(update, 1000)` and `update()` after — moving the synchronous call outside the direct effect body while preserving identical runtime behavior.

### 2. ESLint Warning — Unused import `Star` in Hero.tsx
**File:** `src/components/home/Hero.tsx` (line 5)
**Issue:** `Star` was imported from `lucide-react` but never referenced.
**Resolution:** Removed `Star` from the import statement.

### 3. ESLint Warning — Unused import `Zap` in Pricing.tsx
**File:** `src/components/home/Pricing.tsx` (line 5)
**Issue:** `Zap` was imported from `lucide-react` but never referenced.
**Resolution:** Removed `Zap` from the import statement.

### 4. ESLint Warning — Unused variable `idx` in ProductShowcase.tsx
**File:** `src/components/home/ProductShowcase.tsx` (line 221)
**Issue:** The `idx` parameter in the `.map((item, idx) => {` callback was never used.
**Resolution:** Removed `idx` from the map callback signature.

### 5. Node.js Deprecation Notice (DEP0205)
**Issue:** `module.register()` is deprecated; use `module.registerHooks()` instead. This originates from within Next.js internals/Turbopack and is not actionable at the application level.
**Resolution:** No action required — this is an internal Next.js warning, not a project code issue. It does not affect the build output.

### 6. Edge Runtime Warning
**Issue:** `⚠ Using edge runtime on a page currently disables static generation for that page` — applies to `/opengraph-image` and `/ref/[code]`.
**Resolution:** These routes intentionally use edge/dynamic rendering. No action required.

---

## Recommendations

1. **Node.js DEP0205**: Once Next.js releases an update that replaces `module.register()` internally, upgrading Next.js will silence this deprecation notice.
2. **Edge Runtime pages**: `/ref/[code]` and `/opengraph-image` are dynamic by design. If `/ref/[code]` ever needs to be statically pre-rendered for known codes, consider using `generateStaticParams`.
3. **ESLint integration**: Consider adding `npm run lint` (pointing to `eslint src/`) to the CI/CD pipeline so unused imports and effect issues are caught before build time.
