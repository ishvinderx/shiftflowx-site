import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Container, PageHeader, Section } from '@/components/ui'
import { jsonLd, toolMetadata } from '@/lib/seo'
import { getTool, TOOLS } from '@/lib/tools/registry'
import { TOOL_GROUPS, TOOL_PAIRS } from '@/content/tool-guidance'
import { SITE_URL } from '@/lib/constants'

// Free-tools hub: everything here derives from the registry. A tool flipped to 'live'
// still needs a place in TOOL_GROUPS (src/content/tool-guidance.ts) to be listed.

export const metadata: Metadata = toolMetadata({
  slug: 'tools',
  title: 'Free Calculators for Hourly & Self-Employed Workers',
  description:
    'Free calculators from HoursFlow: work hours, time cards, decimal hours, overtime, pay, GST/HST and contractor take-home. Instant answers, no signup.',
})

const LIVE_TOOLS = TOOLS.filter((t) => t.status === 'live')

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Calculators for Hourly & Self-Employed Workers',
  itemListElement: LIVE_TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.title,
    url: `${SITE_URL}/${t.slug}`,
  })),
}

const TRAIL = [
  { name: 'HoursFlow', path: '/' },
  { name: 'Free tools', path: '/tools' },
]

export default function ToolsPage() {
  const groups = TOOL_GROUPS.map((g) => ({
    heading: g.heading,
    tools: g.slugs.map(getTool).filter((t): t is NonNullable<typeof t> => !!t && t.status === 'live'),
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />
      <Breadcrumbs trail={TRAIL} />
      <PageHeader
        label="Free tools"
        title="Free calculators"
        lede="Work hours, time cards, pay and tax, with instant answers and no signup. Built by the team behind the HoursFlow app."
      />

      {groups.map((g, gi) => (
        <Section key={g.heading} rule={gi > 0} title={g.heading} className="py-12 sm:py-16">
          <ul className="border-b border-rule">
            {g.tools.map((t) => (
              <li key={t.slug} className="border-t border-rule">
                <Link
                  href={`/${t.slug}`}
                  className="link-hover grid min-h-[44px] gap-1 py-5 text-ink md:grid-cols-[5fr_7fr] md:gap-16 hover:underline underline-offset-4"
                >
                  <span className="text-[1.0625rem] font-semibold">{t.title}</span>
                  <span className="text-ink-2">{t.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Which one should I use?" lede="A few calculators overlap. Here is how they differ.">
        <ul className="border-b border-rule">
          {TOOL_PAIRS.map((p) => {
            const a = getTool(p.a)
            const b = getTool(p.b)
            if (!a || !b) return null
            return (
              <li key={p.a} className="grid gap-3 border-t border-rule py-6 md:grid-cols-[5fr_7fr] md:gap-16">
                <p className="font-semibold text-ink">
                  <Link href={`/${a.slug}`} className="link-hover underline underline-offset-4 decoration-1 hover:decoration-2">{a.title}</Link>
                  <span className="text-ink-2"> or </span>
                  <Link href={`/${b.slug}`} className="link-hover underline underline-offset-4 decoration-1 hover:decoration-2">{b.title}</Link>
                </p>
                <p className="t-body text-ink-2">{p.text}</p>
              </li>
            )
          })}
        </ul>
      </Section>

      <section className="border-t border-rule">
        <Container className="py-12 sm:py-16">
          <p className="t-body text-ink-2">
            Tracking hours every week?{' '}
            <Link href="/features" className="link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2">
              See what the HoursFlow app does
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  )
}
