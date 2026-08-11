import { Fragment } from 'react'
import Link from 'next/link'

// Visual breadcrumb only — pages render the matching BreadcrumbList schema
// themselves via breadcrumbSchema() so the two can't silently diverge.
export default function ToolBreadcrumb({ trail }: { trail: { name: string; path?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/30 mb-8" aria-label="Breadcrumb">
      {trail.map((item, i) => (
        <Fragment key={item.name}>
          {i > 0 && <span>/</span>}
          {item.path ? (
            <Link href={item.path} className="hover:text-white/60 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-white/60">{item.name}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
