import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ is NOT disallowed: blocking CSS/JS stops renderers from
        // seeing pages as users do, and Google has advised against it for
        // years. Nothing private lives there — it is build output.
        disallow: ['/api/'],
      },
      // Explicitly allow all major AI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
    ],
    sitemap: 'https://shiftflowx.net/sitemap.xml',
    host: 'https://shiftflowx.net',
  }
}
