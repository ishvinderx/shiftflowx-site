import { appStoreCampaignUrl } from '@/lib/constants'

// App Store CTA card — place INSIDE/AFTER the result, never before the tool.
// Plain anchor so it works in both server and client components. Click
// tracking (calculator_cta_clicked) is the caller's job: wrap in a
// client-side onClickCapture where needed.
export default function ShiftFlowCta({
  ct,
  headline,
  sub,
  label = 'Track Hours with ShiftFlow',
}: {
  ct: string
  headline: string
  sub: string
  label?: string
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
      <p className="text-sm text-white/80 font-medium">{headline}</p>
      <p className="text-xs text-white/45 mt-1">{sub}</p>
      <a
        href={appStoreCampaignUrl(ct)}
        className="inline-block mt-3 text-xs font-semibold text-white bg-[#D63C6B] hover:bg-[#c0355f] rounded-full px-4 py-2 transition-colors"
      >
        {label}
      </a>
    </div>
  )
}
