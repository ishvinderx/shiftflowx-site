import { appStoreCampaignUrl, BRAND } from '@/lib/constants'

// App Store CTA card — place INSIDE/AFTER the result, never before the tool.
// Plain anchor so it works in both server and client components. Click
// tracking (calculator_cta_clicked) is the caller's job: wrap in a
// client-side onClickCapture where needed.
export default function AppCta({
  ct,
  headline,
  sub,
  label = `Track Hours with ${BRAND.name}`,
}: {
  ct: string
  headline: string
  sub: string
  label?: string
}) {
  return (
    <div className="bg-track/40 border border-rule rounded-xl p-4 text-center">
      <p className="text-sm text-ink font-medium">{headline}</p>
      <p className="text-xs text-ink-2 mt-1">{sub}</p>
      <a
        href={appStoreCampaignUrl(ct)}
        className="inline-block mt-3 text-xs font-semibold text-ground bg-ink hover:bg-ink-2 rounded-full px-4 py-2 transition-colors"
      >
        {label}
      </a>
    </div>
  )
}
