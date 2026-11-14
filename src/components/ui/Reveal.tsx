"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The one scroll fade-up. Wrap a block; it fades up once when first scrolled into view.
 * `index` staggers siblings (80ms each). Charts inside (`.draw-line`, `.grow-x`) draw when
 * the nearest Reveal ancestor becomes visible. Content is fully visible without JS (the
 * `.js` class is set by an inline script in layout.tsx) and under prefers-reduced-motion.
 * <Section> already wraps its header (index 0) and body (index 1) - you rarely need this directly.
 */
export function Reveal({
  index = 0,
  as: Tag = "div",
  className,
  children,
  ...rest
}: { index?: number; as?: React.ElementType; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ "--i": index } as React.CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
