import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";
const VARIANT: Record<Variant, string> = { primary: "btn btn-primary", secondary: "btn btn-secondary", text: "btn btn-text" };

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };
type AsLink = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;
type AsButton = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/**
 * Button. variant: "primary" (dark filled; ink in light, ivory in dark), "secondary" (ink outline), "text".
 * Pass `href` to render a link (internal -> next/link; http(s) -> new-tab anchor), otherwise a <button>.
 * 44px minimum target, hover darkens, press moves 1px. Extra props (onClick, data-*, aria-*) pass through.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const cls = cn(VARIANT[variant], className);
  if ("href" in props && props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, href, ...rest } = props;
    void _v; void _c; void _ch;
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    if (href.startsWith("mailto:") || href.startsWith("#")) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props as AsButton;
  void _v; void _c; void _ch; void _h;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Inline text link: ink, underlined, thickens on hover. For use inside running text. */
export function TextLink({ href, className, children, ...rest }: { href: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const cls = cn("link-hover text-ink underline underline-offset-4 decoration-1 hover:decoration-2", className);
  if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
    const ext = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** The App Store call to action (primary button + Apple glyph). `href` should come from constants. */
export function AppStoreButton({ href, className, ...rest }: { href: string; className?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <Button href={href} variant="primary" className={className} {...rest}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      Download on the App Store
    </Button>
  );
}
