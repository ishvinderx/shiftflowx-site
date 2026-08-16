import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog'
import { TOOLS } from '@/lib/tools/registry'

const BASE = 'https://shiftflowx.net'
const now = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/features`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/pricing`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/download`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/support`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/security`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/how-it-works`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/compare`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/referral`, priority: 0.7, changeFrequency: 'monthly' as const },
    // Free tools hub (calculator entries derive from the registry below)
    { url: `${BASE}/tools`, priority: 0.9, changeFrequency: 'monthly' as const },
    // Use case pages
    { url: `${BASE}/use-cases/gig-workers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/freelancers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/hourly-workers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/nurses`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/contractors`, priority: 0.7, changeFrequency: 'monthly' as const },
    // Blog index (posts derive from BLOG_POSTS below)
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    // Legal
    { url: `${BASE}/privacy`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/terms`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/eula`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${BASE}/subscription-terms`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${BASE}/cookie-policy`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${BASE}/refund`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${BASE}/delete`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/data-policy`, priority: 0.5, changeFrequency: 'yearly' as const },
    // Admin dashboard excluded from sitemap intentionally
  ]

  // Calculators derive from the tool registry — planned tools never leak in.
  const tool_pages = TOOLS.filter((t) => t.status === 'live').map((t) => ({
    url: `${BASE}/${t.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  }))

  // Blog posts derive from the blog source of truth.
  const blog_pages = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'yearly' as const,
  }))

  return [...static_pages, ...tool_pages, ...blog_pages].map((p) => ({ ...p, lastModified: now }))
}
