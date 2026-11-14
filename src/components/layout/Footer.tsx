import Image from "next/image";
import Link from "next/link";
import { SUPPORT_EMAIL, BRAND } from "@/lib/constants";

const footerLinks = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/tools", label: "Free Tools" },
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
    { href: "/about", label: `About ${BRAND.name}` },
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
                <Image
                  src="/icon-192.png"
                  alt={BRAND.name}
                  width={32}
                  height={32}
                  className="rounded-[9px]"
                />
              </div>
              <span className="text-white font-bold text-[17px] tracking-tight">
                {BRAND.name}
              </span>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {BRAND.tagline}
              <br />
              Track hours, earnings, bills and tax estimates.
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
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/45 text-sm">
            <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
            <span className="hidden sm:block">·</span>
            <p className="text-white/45">Made for workers.</p>
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
                className="text-white/45 text-sm hover:text-white/60 transition-colors"
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
