# Measurement Runbook — turning the free-tools funnel on

Date: 2026-08-12. The calculator architecture is FROZEN; the next work is
measurement. Everything below is operator-credentialed — the engineering is
done and inert until these three inputs exist. No code change is needed for any
of them.

The funnel we are trying to observe end to end:

    Google → calculator page → calculation → CTA click → App Store → install
    → onboarding → first shift → Pro

Stages 1–4 are the website's job (this doc). Stages 5+ already report through
the backend's canonical event pipeline and the admin Funnel page.

---

## 1. APP_STORE_PT — unlocks App Store attribution (highest leverage)

Every calculator already emits a unique `ct=` campaign token. Apple **ignores
`ct` entirely unless `pt` (provider token) is also present**, so today all 14
tokens record nothing.

1. App Store Connect → your app → **App Analytics** → **Acquisition** →
   Campaigns → *Create Campaign* (or any existing campaign link).
2. The generated link contains `pt=XXXXXXXXX`. Copy that numeric value only.
3. Paste it into `src/lib/constants.ts`:
   `export const APP_STORE_PT = "XXXXXXXXX"`
4. Commit + push. Vercel redeploys; every calculator's link is tagged from that
   moment forward.

Then in ASC → App Analytics → Acquisition → Campaigns you can read installs per
`ct`, i.e. per calculator:

`work-hours-calculator`, `time-card-calculator`, `decimal-hours-calculator`,
`hourly-pay-calculator`, `overtime-calculator`, `gross-pay-calculator`,
`take-home-pay-calculator`, `contractor-pay-calculator`,
`contractor-take-home-pay-calculator`, `tax-reserve-calculator`,
`gst-hst-calculator`, `hst-invoice-calculator`,
`owner-operator-pay-calculator`, `truck-driver-settlement-calculator`.

That answers "which problem brings people in" with install data, not intuition.

## 2. Web analytics — one platform, one env var

**Recommendation: PostHog.** Reasons, in order of weight:

- The published cookie policy states verbatim *"We do not use Google
  Analytics, Facebook Pixel, or any advertising-related tracking cookies."*
  Installing GA4 would contradict a live legal page and require rewriting it.
- PostHog is already named in the privacy policy and data policy, already
  whitelisted in the site CSP (`connect-src https://us.i.posthog.com`), and is
  already the iOS app's analytics — so web and app events land in ONE system
  and the funnel joins up instead of splitting across two tools.

**To turn it on:** set `NEXT_PUBLIC_POSTHOG_KEY` (the PostHog *project* API key,
`phc_…`) in the Vercel project env for Production, then redeploy. Optionally set
`NEXT_PUBLIC_POSTHOG_HOST` if not on US cloud. That is the entire change — no
code edit.

What ships when you do:

| Event | Fires when |
|---|---|
| `calculator_viewed` | a live tool route renders (route-driven, so future tools are measured automatically) |
| `calculator_started` | first real interaction with the inputs |
| `calculator_completed` | a valid result renders |
| `calculator_cta_clicked` | the ShiftFlow App Store CTA is clicked |

Every event carries only `calculator`, `category`, optional `jurisdiction`, and
the path. **No financial value ever leaves the browser** — no rate, amount, pay,
tax, or result. That restriction is enforced by the type signature and pinned by
`src/lib/analytics.test.ts`.

Privacy shape (deliberate, matches the existing cookie policy): a direct fetch
to PostHog's capture endpoint — no `posthog-js`, so no autocapture, no session
recording, no cookies, no bundle weight. The anonymous id lives in
`sessionStorage`, scoped to a single browsing session, never linked to an
account. With no key set, nothing is transmitted at all.

## 3. Google Search Console — start the indexing clock

Cannot be done without your Google login. Steps:

1. Search Console → Add property → **Domain** property `shiftflowx.net`
   (preferred; covers all subdomains) → add the TXT record it gives you to the
   domain's DNS in Vercel. *(URL-prefix property with an HTML meta tag also
   works if you'd rather not touch DNS — tell me and I'll add the tag.)*
2. Sitemaps → submit `https://shiftflowx.net/sitemap.xml`.
3. URL Inspection → request indexing for `/tools` and 2–3 priority calculators
   to prime discovery.

Then leave it alone. Meaningful data takes weeks.

---

## What to read, and when

**~7 days:** Search Console Coverage — are the 14 tool URLs *indexed*? Anything
excluded, and why? That is a technical answer, not a demand signal.

**~30 days:** Search Console Performance, filtered to the tool URLs:

- Which calculators earn impressions at all → real demand exists there.
- Queries at **positions 5–20** → the highest-leverage optimisation targets;
  improving an existing near-miss page beats publishing a new one.
- Query text you did not anticipate → what people actually call the problem;
  this is how you name the next tool.

Cross-reference with PostHog: impressions → `calculator_viewed` →
`calculator_completed` (does the tool actually work for them?) →
`calculator_cta_clicked` (does the result create app intent?), and with ASC
campaigns for installs per calculator.

**Decision rule for the next tool:** build it when a query cluster shows real
impressions and no page of ours serves it well — not because a keyword exists.
The contractor / owner-operator cluster is the current hypothesis; let the data
confirm or kill it.

## Not proven yet — do not claim

Production returning HTTP 200 proves deployment and availability. It does not
prove indexing, ranking, traffic, or conversion. Until Search Console and
PostHog accumulate real numbers, the honest status of every SEO claim is
UNVERIFIED, and no ranking or traffic figure should appear in any document.
