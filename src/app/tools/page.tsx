import type { Metadata } from 'next'
import Link from 'next/link'
import ToolBreadcrumb from '@/components/calculator/ToolBreadcrumb'
import { breadcrumbSchema, jsonLd, toolMetadata } from '@/lib/seo'
import { TOOLS, type ToolCategory } from '@/lib/tools/registry'

// Free-tools hub: everything here derives from the registry — a tool flipped
// to 'live' appears automatically (cards, ItemList schema, sitemap).

export const metadata: Metadata = toolMetadata({
  slug: 'tools',
  title: 'Free Calculators for Hourly & Self-Employed Workers',
  description:
    'Free calculators from ShiftFlow: work hours, time cards, decimal hours, and hourly pay. Instant answers, no signup.',
})

const CATEGORY_ORDER: ToolCategory[] = [
  'Work & Time',
  'Pay & Earnings',
  'Overtime',
  'Contractor & Self-Employed',
  'GST/HST & Invoices',
  'Owner-Operator & Trucking',
]

const LIVE_TOOLS = TOOLS.filter((t) => t.status === 'live')

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free Calculators for Hourly & Self-Employed Workers',
  itemListElement: LIVE_TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.title,
    url: `https://shiftflowx.net/${t.slug}`,
  })),
}

const trail = [
  { name: 'ShiftFlow', path: '/' },
  { name: 'Free Tools', path: '/tools' },
]

export default function ToolsPage() {
  const categories = CATEGORY_ORDER.map((category) => ({
    category,
    tools: LIVE_TOOLS.filter((t) => t.category === category),
  })).filter((g) => g.tools.length > 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(trail)) }} />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <ToolBreadcrumb trail={[trail[0], { name: 'Free Tools' }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Free Calculators
          </h1>
          <p className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            Work hours, time cards, and pay — instant answers, no signup. Built by the team
            behind the ShiftFlow app.
          </p>

          {categories.map(({ category, tools }) => (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:border-[#D63C6B]/40 transition-colors block"
                  >
                    <h3 className="text-white font-semibold mb-1.5">{t.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{t.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
