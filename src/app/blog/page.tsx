import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "ShiftFlow Blog — Workforce Financial Intelligence Guides",
  description: "Expert guides on payroll protection, payday forecasting, gig worker taxes, burnout prevention, freelancer invoicing, and workforce financial wellness.",
  alternates: { canonical: 'https://shiftflowx.net/blog' },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://shiftflowx.net/blog" }
  ]
};

const categoryColors: Record<string, string> = {
  'Shift Tracking': '#14B8A6',
  'Payroll Protection': '#D63C6B',
  'Tax Guide': '#F59E0B',
  'Burnout Prevention': '#22C55E',
  'AI Technology': '#6366F1',
  'Freelancer Guide': '#D63C6B',
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

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
              <span>/</span>
              <span className="text-white/60">Blog</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Workforce Financial Intelligence
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Guides on payroll protection, payday forecasting, gig worker taxes, burnout prevention, and financial wellness for modern workers.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map(post => {
              const color = categoryColors[post.category] || '#D63C6B';
              return (
                <article key={post.slug} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${color}20`, color }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-white/30">{post.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-white/90 transition-colors">
                    <Link href={`/blog/${post.slug}`} className="hover:underline decoration-white/20">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                    {getExcerpt(post.content)}
                  </p>

                  <div className="flex items-center justify-between">
                    <time className="text-xs text-white/30" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-[#D63C6B] hover:text-[#c0355f] transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Protect your paycheck with ShiftFlow</h3>
            <p className="text-white/60 mb-6">AI-powered workforce financial intelligence. Free 30-day trial.</p>
            <Link
              href="/download"
              className="inline-block bg-[#D63C6B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c0355f] transition-colors"
            >
              Download ShiftFlow Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
