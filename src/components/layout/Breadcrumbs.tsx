import { Fragment } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { breadcrumbSchema, jsonLd } from '@/lib/seo'

export type Crumb = { name: string; path: string }

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD, built from one array so the
 * two cannot diverge. The last crumb is the current page (not a link, aria-current="page").
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(trail)) }} />
      <Container className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-[0.875rem] text-ink-2">
            {trail.map((c, i) => {
              const last = i === trail.length - 1
              return (
                <Fragment key={c.path}>
                  {i > 0 && <li aria-hidden="true">/</li>}
                  <li>
                    {last ? (
                      <span aria-current="page" className="text-ink">{c.name}</span>
                    ) : (
                      <Link href={c.path} className="link-hover inline-flex min-h-[44px] items-center underline-offset-4 hover:text-ink hover:underline">
                        {c.name}
                      </Link>
                    )}
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </nav>
      </Container>
    </>
  )
}
