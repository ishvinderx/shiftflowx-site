import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { AppStoreButton, Container, Heading, Lede, Section } from "@/components/ui";
import { BLOG_POSTS, formatPostDate, getPostBySlug } from "@/lib/blog";
import { APP_STORE_URL, PRICING } from "@/lib/constants";
import { jsonLd } from "@/lib/seo";

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
      authors: ['HoursFlow'],
      tags: [post.category, 'HoursFlow', 'workforce finance'],
    },
  };
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.trim().split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let tableRows: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={`ul-${listKey++}`} className="mb-6 list-disc space-y-2 pl-5 marker:text-ink">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-ink">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  // Markdown-style tables scroll in their own focusable box so the page never overflows.
  const flushTable = () => {
    if (tableRows.length === 0) return;
    const cells = (r: string) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const [head, , ...body] = tableRows;
    nodes.push(
      <div key={`tb-${listKey++}`} className="mb-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Table">
        <table className="num w-full min-w-[480px] border-collapse text-[0.9375rem]">
          <thead>
            <tr className="border-b border-ink">
              {cells(head).map((c, k) => <th key={k} scope="col" className="py-2 pr-4 text-left font-semibold">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.map((r, k) => (
              <tr key={k} className="border-b border-rule">
                {cells(r).map((c, m) => <td key={m} className="py-2 pr-4 align-top">{renderInline(c)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('|')) {
      flushList();
      tableRows.push(line);
      i++;
      continue;
    }
    flushTable();

    if (line.startsWith('### ')) {
      flushList();
      nodes.push(<h3 key={i} className="mb-3 mt-8 text-[1.25rem] font-semibold leading-snug text-ink">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      nodes.push(<h2 key={i} className="mb-4 mt-12 border-t border-rule pt-8 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{line.slice(3)}</h2>);
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '') {
      flushList();
    } else if (line.trim()) {
      flushList();
      nodes.push(<p key={i} className="mb-5 text-ink">{renderInline(line)}</p>);
    }

    i++;
  }

  flushList();
  flushTable();
  return nodes;
}

function renderInline(text: string): React.ReactNode {
  // Bold + markdown links. Internal hrefs (/path) render as Next <Link> — added for
  // the calculator-cluster articles (article → calculator → CTA funnel).
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const label = link[1];
      const href = link[2];
      if (href.startsWith('/')) {
        return <Link key={i} href={href} className="link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2">{label}</Link>;
      }
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2">{label}</a>;
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": { "@type": "Organization", "name": "HoursFlow" },
    "publisher": {
      "@type": "Organization",
      "name": "HoursFlow",
      "logo": { "@type": "ImageObject", "url": "https://shiftflowx.net/icon.png" }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://shiftflowx.net/blog/${post.slug}` },
    "url": `https://shiftflowx.net/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      <Breadcrumbs
        trail={[
          { name: "HoursFlow", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <header className="border-b border-rule">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-16">
          <div className="grid max-w-[44rem] gap-5">
            <p className="t-label">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.category} · {post.readTime}
            </p>
            <Heading level="h2" as="h1">{post.title}</Heading>
            <Lede>{post.description}</Lede>
          </div>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <article className="max-w-[65ch] text-[1.0625rem] leading-[1.75]">
          {renderContent(post.content)}
        </article>
      </Container>

      <Section title="Track your own hours" lede={`Shifts, earnings, payday, budget and bills in one app. Pro includes a ${PRICING.trialDays}-day free trial.`}>
        <AppStoreButton href={APP_STORE_URL} />
      </Section>

      {relatedPosts.length > 0 && (
        <Section label="More guides">
          <ul className="border-b border-rule">
            {relatedPosts.map(related => (
              <li key={related.slug} className="border-t border-rule">
                <Link href={`/blog/${related.slug}`} className="group grid gap-1 py-5 md:grid-cols-[8fr_4fr] md:gap-10">
                  <span className="font-semibold text-ink group-hover:underline underline-offset-4">{related.title}</span>
                  <span className="text-[0.9375rem] text-ink-2 md:text-right">{related.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
