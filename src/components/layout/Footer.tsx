import Link from "next/link";
import { SUPPORT_EMAIL } from "@/lib/constants";

const footerLinks = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/download", label: "Download" },
    { href: "/about", label: "About" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/eula", label: "EULA" },
    { href: "/subscription-terms", label: "Subscription Terms" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/refund", label: "Refund Policy" },
  ],
  Support: [
    { href: "/support", label: "Help Center" },
    { href: "/support", label: "Contact Us" },
    { href: "/delete", label: "Delete Account" },
    { href: "/support", label: "FAQ" },
  ],
  Company: [
    { href: "/about", label: "About ShiftFlow" },
    { href: "/about", label: "Our Mission" },
    { href: `mailto:${SUPPORT_EMAIL}`, label: "support@shiftflowx.net" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030306] border-t border-white/[0.06] overflow-hidden">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-16 pb-10">

        {/* Top section: logo + links */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 lg:gap-20 mb-14">
          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="relative w-8 h-8 flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="9" fill="#D63C6B" />
                  <path
                    d="M21 10.5H13.5C12.12 10.5 11 11.62 11 13C11 14.38 12.12 15.5 13.5 15.5H18.5C19.88 15.5 21 16.62 21 18C21 19.38 19.88 20.5 18.5 20.5H11"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-[17px] tracking-tight">
                Shift<span className="text-[#D63C6B]">Flow</span>
              </span>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Protect Every Paycheck.
              <br />
              AI-powered workforce financial intelligence.
            </p>

            {/* App Store badge */}
            <Link
              href="/download"
              className="inline-flex items-center gap-3 px-4 py-3 bg-white/[0.05] border border-white/[0.09] rounded-xl hover:bg-white/[0.09] hover:border-white/15 transition-all duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div className="text-white/35 text-[10px] font-normal">Download on the</div>
                <div className="text-white text-sm font-semibold">App Store</div>
              </div>
            </Link>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://twitter.com/shiftflowapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all"
                aria-label="Follow on X (Twitter)"
              >
                {/* X/Twitter icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/shiftflowapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all"
                aria-label="Follow on Instagram"
              >
                {/* Instagram icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white/35 text-[10px] font-semibold uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/25 text-sm">
            <p>© {currentYear} ShiftFlow. All rights reserved.</p>
            <span className="hidden sm:block">·</span>
            <p className="text-white/25">Made for workers. Powered by AI.</p>
          </div>
          <div className="flex items-center gap-5">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookie-policy", label: "Cookies" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/25 text-sm hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
