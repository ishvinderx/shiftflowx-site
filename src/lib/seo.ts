import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

// SEO helpers for calculator pages — the exact house metadata + JSON-LD shapes
// already used by the live calculators. New tool pages use these; existing
// pages migrate in a later wave.

export interface Faq {
  q: string
  a: string
}

/** Escape for safe embedding in <script type="application/ld+json">. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function toolMetadata(cfg: { slug: string; title: string; description: string }): Metadata {
  const url = `${SITE_URL}/${cfg.slug}`
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: url },
    openGraph: { title: cfg.title, description: cfg.description, url },
  }
}

export function webAppSchema(cfg: { slug: string; title: string; description: string }): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: cfg.title,
    url: `${SITE_URL}/${cfg.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: cfg.description,
    publisher: { '@type': 'Organization', name: 'ShiftFlow', url: SITE_URL },
  }
}

/** Must be generated 1:1 from the FAQ array rendered on the page. */
export function faqSchema(faq: Faq[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path === '/' ? '' : t.path}`,
    })),
  }
}
