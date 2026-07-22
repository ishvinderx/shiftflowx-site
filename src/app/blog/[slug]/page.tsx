import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://shiftflowx.net/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://shiftflowx.net/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ['ShiftFlow'],
      tags: [post.category, 'ShiftFlow', 'workforce finance'],
    },
  };
}

const categoryColors: Record<string, string> = {
  'Shift Tracking': '#14B8A6',
  'Payroll Protection': '#D63C6B',
  'Tax Guide': '#F59E0B',
  'Burnout Prevention': '#22C55E',
  'AI Technology': '#6366F1',
  'Freelancer Guide': '#D63C6B',
};

function renderContent(content: string): React.ReactNode[] {
  const lines = content.trim().split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={`ul-${listKey++}`} className="space-y-2 mb-6 pl-5">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-white/60 leading-relaxed list-disc marker:text-[#D63C6B]">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('### ')) {
      flushList();
      nodes.push(<h3 key={i} className="text-lg font-bold text-white mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      nodes.push(<h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4 pt-6 border-t border-white/5">{line.slice(3)}</h2>);
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '') {
      flushList();
    } else if (line.trim()) {
      flushList();
      nodes.push(<p key={i} className="text-white/60 leading-relaxed mb-4">{renderInline(line)}</p>);
    }

    i++;
  }

  flushList();
  return nodes;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white/85 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const color = categoryColors[post.category] || '#D63C6B';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": { "@type": "Organization", "name": "ShiftFlow" },
    "publisher": {
      "@type": "Organization",
      "name": "ShiftFlow",
      "logo": { "@type": "ImageObject", "url": "https://shiftflowx.net/icon.png" }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://shiftflowx.net/blog/${post.slug}` },
    "url": `https://shiftflowx.net/blog/${post.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ShiftFlow", "item": "https://shiftflowx.net" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://shiftflowx.net/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://shiftflowx.net/blog/${post.slug}` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">ShiftFlow</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${color}20`, color }}
              >
                {post.category}
              </span>
              <span className="text-xs text-white/30">{post.readTime}</span>
              <time className="text-xs text-white/30" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Article Body */}
          <article>
            {renderContent(post.content)}
          </article>

          {/* CTA Card */}
          <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-[#D63C6B]/10 to-[#D63C6B]/5 border border-[#D63C6B]/20 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Protect your income with ShiftFlow</h3>
            <p className="text-white/60 mb-5 text-sm">AI payroll protection, payday forecasting, burnout analytics. Free 7-day trial.</p>
            <Link
              href="/download"
              className="inline-block bg-[#D63C6B] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#c0355f] transition-colors"
            >
              Download on iOS →
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-10 border-t border-white/5">
              <h2 className="text-lg font-bold text-white mb-6">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map(related => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <div>
                      <span
                        className="text-xs font-semibold mb-1 inline-block"
                        style={{ color: categoryColors[related.category] || '#D63C6B' }}
                      >
                        {related.category}
                      </span>
                      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">
                        {related.title}
                      </p>
                    </div>
                    <span className="text-white/30 text-sm mt-0.5 flex-shrink-0">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
