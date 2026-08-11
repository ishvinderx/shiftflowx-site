import Link from 'next/link'
import { relatedTools } from '@/lib/tools/registry'

const pillCls =
  'text-white/60 hover:text-white bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 transition-colors'

export default function RelatedTools({
  slug,
  extraLinks = [],
}: {
  slug: string
  extraLinks?: { href: string; label: string }[]
}) {
  const tools = relatedTools(slug)
  if (tools.length === 0 && extraLinks.length === 0) return null
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-6">Related calculators</h2>
      <div className="flex flex-wrap gap-3 text-sm">
        {tools.map((t) => (
          <Link key={t.slug} href={`/${t.slug}`} className={pillCls} title={t.shortDescription}>
            {t.title} →
          </Link>
        ))}
        {extraLinks.map((l) => (
          <Link key={l.href} href={l.href} className={pillCls}>
            {l.label} →
          </Link>
        ))}
      </div>
    </section>
  )
}
