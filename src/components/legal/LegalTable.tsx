import type { ReactNode } from "react";

/**
 * A legal table that scrolls inside its own box on narrow screens, so the page never
 * scrolls sideways. `caption` names the table for screen readers. In print the box is
 * unrolled (see .legal-table in globals.css).
 */
export default function LegalTable({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="legal-table" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}
