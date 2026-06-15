import type { MetadataRoute } from 'next'

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
    // Use case pages
    { url: `${BASE}/use-cases/gig-workers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/freelancers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/hourly-workers`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/nurses`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/use-cases/contractors`, priority: 0.7, changeFrequency: 'monthly' as const },
    // Blog
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/blog/how-to-track-work-hours`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE}/blog/how-payroll-errors-happen`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE}/blog/gig-workers-tax-guide`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE}/blog/signs-of-work-burnout`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE}/blog/how-payday-forecasting-works`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE}/blog/freelancer-invoice-guide`, priority: 0.7, changeFrequency: 'yearly' as const },
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

  return static_pages.map(p => ({ ...p, lastModified: now }))
}
