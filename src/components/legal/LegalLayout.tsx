import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
  toc: TocItem[];
}

export default function LegalLayout({
  title,
  effectiveDate,
  children,
  toc,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20">
      {/* Header */}
      <div className="border-b border-white/5 pb-8 mb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/30 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">
              ShiftFlow
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/60">{title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-white/40 text-sm">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex gap-16">
          {/* Sidebar TOC — desktop only */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-white/40 hover:text-white py-1 transition-colors leading-snug"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-white/30 text-xs mb-3">Need help?</p>
                <a
                  href="mailto:support@shiftflowx.net"
                  className="text-[#D63C6B] text-sm hover:text-[#D63C6B]/80 transition-colors"
                >
                  support@shiftflowx.net
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-invert max-w-none legal-content">
              {children}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .legal-content h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .legal-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .legal-content p {
          color: rgba(255,255,255,0.55);
          line-height: 1.75;
          margin-bottom: 1rem;
          font-size: 0.9375rem;
        }
        .legal-content ul, .legal-content ol {
          color: rgba(255,255,255,0.55);
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .legal-content li {
          margin-bottom: 0.4rem;
          font-size: 0.9375rem;
          line-height: 1.7;
        }
        .legal-content a {
          color: #D63C6B;
          text-decoration: none;
        }
        .legal-content a:hover {
          color: #c0355f;
        }
        .legal-content strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
