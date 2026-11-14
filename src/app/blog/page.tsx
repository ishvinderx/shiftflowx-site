import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Pay & Tax Guides for Workers",
  description: "Guides on paychecks, payday, gig worker taxes and freelancer invoicing.",
  alternates: { canonical: 'https://shiftflowx.net/blog' },
};

const breadcrumb = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "HoursFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://shiftflowx.net/blog" }
  ]
};

const categoryColors: Record<string, string> = {
  'Shift Tracking': 'var(--color-positive)',
  'Payroll Protection': 'var(--color-ink)',
  'Tax Guide': 'var(--color-ink)',
  'Freelancer Guide': 'var(--color-ink)',
  'Pay & Hours': 'var(--color-positive)',
};

function getExcerpt(content: string): string {
  const cleaned = content.replace(/#{1,6}\s+/g, '').replace(/\*\*/g, '').trim();
  const firstParagraph = cleaned.split('\n\n')[0].trim();
  return firstParagraph.length > 200 ? firstParagraph.slice(0, 200) + '…' : firstParagraph;
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-ground pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 text-sm text-ink-2 mb-8">
              <Link href="/" className="hover:text-ink transition-colors">HoursFlow</Link>
              <span>/</span>
              <span className="text-ink-2">Blog</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-6">
              HoursFlow Blog
            </h1>
            <p className="text-xl text-ink-2 max-w-2xl">
              Guides on paychecks, payday, gig worker taxes and freelancer invoicing.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map(post => {
              const color = categoryColors[post.category] || 'var(--color-ink)';
              return (
                <article key={post.slug} className="rounded-2xl border border-rule bg-track/40 p-6 hover:border-rule transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${color}20`, color }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-ink-2">{post.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-ink mb-3 leading-snug group-hover:text-ink transition-colors">
                    <Link href={`/blog/${post.slug}`} className="hover:underline decoration-white/20">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-ink-2 leading-relaxed mb-4 line-clamp-3">
                    {getExcerpt(post.content)}
                  </p>

                  <div className="flex items-center justify-between">
                    <time className="text-xs text-ink-2" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-ink hover:text-ink transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 rounded-2xl border border-ink/20 text-center">
            <h3 className="text-2xl font-bold text-ink mb-3">Track your hours with HoursFlow</h3>
            <p className="text-ink-2 mb-6">Track hours, earnings, bills and tax estimates. Pro includes a 7-day free trial.</p>
            <Link
              href="/download"
              className="inline-block bg-ink text-ground px-8 py-3 rounded-full font-semibold hover:bg-ink-2 transition-colors"
            >
              Download HoursFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
