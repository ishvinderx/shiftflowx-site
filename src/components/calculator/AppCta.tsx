import { appStoreCampaignUrl, BRAND } from '@/lib/constants'

// One quiet line inviting the reader to the app, placed after the result. Plain anchor so it
// works in server and client components. Click tracking (calculator_cta_clicked) is the
// caller's job: wrap in a client-side onClickCapture where needed.
export default function AppCta({
  ct,
  headline,
  sub,
  label = `Track hours with ${BRAND.name}`,
}: {
  ct: string
  headline: string
  sub: string
  label?: string
}) {
  return (
    <p className="text-[0.9375rem] text-ink-2">
      <span className="text-ink">{headline}</span> {sub}{' '}
      <a href={appStoreCampaignUrl(ct)} className="link-hover whitespace-nowrap text-ink underline underline-offset-4 decoration-1 hover:decoration-2">
        {label}
      </a>
    </p>
  )
}
