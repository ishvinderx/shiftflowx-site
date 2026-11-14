import type { ReactNode } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { Container, FaqList, PageHeader, Section } from '@/components/ui'
import ToolDisclaimer from '@/components/calculator/ToolDisclaimer'
import { getTool, relatedTools } from '@/lib/tools/registry'
import { pairFor } from '@/content/tool-guidance'
import type { Faq } from '@/lib/seo'

/**
 * Shared calculator page: breadcrumb, header (what it calculates, one sentence), the working
 * area (`children`: a client component laid out as two columns), a short explanation,
 * FAQ, related calculators as text links, and the estimate disclaimer.
 * JSON-LD for the tool and its FAQ stays in each page; breadcrumbs are emitted here.
 */
export default function ToolLayout({
  slug,
  title,
  lede,
  children,
  explainTitle,
  explain,
  faq,
  faqTitle = 'Questions, answered',
  extraLinks = [],
  disclaimer,
}: {
  slug: string
  title: string
  lede: string
  children: ReactNode
  explainTitle?: string
  explain?: ReactNode
  faq: Faq[]
  faqTitle?: string
  extraLinks?: { href: string; label: string }[]
  disclaimer: ReactNode
}) {
  const tool = getTool(slug)
  const related = relatedTools(slug)
  const pair = pairFor(slug)
  const pairTool = pair ? getTool(pair.other) : undefined
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: 'HoursFlow', path: '/' },
          { name: 'Free tools', path: '/tools' },
          { name: tool?.title ?? title, path: `/${slug}` },
        ]}
      />
      <PageHeader label="Free calculator" title={title} lede={lede} />
      <Section rule={false} className="py-12 sm:py-16">
        {children}
      </Section>
      {explain && (
        <Section label="Method" title={explainTitle}>
          <div className="tool-prose">{explain}</div>
        </Section>
      )}
      <Section label="FAQ" title={faqTitle}>
        <FaqList items={faq.map((f) => ({ q: f.q, a: f.a }))} />
      </Section>
      <section className="border-t border-rule">
        <Container className="grid gap-8 py-12 sm:py-16 md:grid-cols-[5fr_7fr] md:gap-16">
          <div className="grid content-start gap-4">
            <h2 className="t-h3">Related calculators</h2>
            {pair && pairTool && (
              <p className="t-body text-ink-2">
                Which one? {pair.text}{' '}
                <Link href={`/${pairTool.slug}`} className="link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2">
                  Open {pairTool.title}
                </Link>
                .
              </p>
            )}
          </div>
          <ul>
            {[
              ...related.map((t) => ({ href: `/${t.slug}`, label: t.title, note: t.shortDescription })),
              ...extraLinks.map((l) => ({ ...l, note: '' })),
            ].map((l) => (
              <li key={l.href} className="border-t border-rule first:border-t-0">
                <Link href={l.href} className="link-hover flex min-h-[44px] flex-wrap items-baseline justify-between gap-x-6 py-3 text-ink hover:underline underline-offset-4">
                  <span className="font-semibold">{l.label}</span>
                  {l.note && <span className="text-[0.9375rem] text-ink-2 sm:max-w-[34ch]">{l.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-t border-rule">
        <Container className="py-12 sm:py-16">
          <div className="max-w-[65ch]">
            <ToolDisclaimer>{disclaimer}</ToolDisclaimer>
          </div>
        </Container>
      </section>
    </>
  )
}
