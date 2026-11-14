import { cn } from "@/lib/utils";

export type LedgerColumn = { key: string; label: string; align?: "left" | "right"; className?: string };

/**
 * Ledger-style table: hairline rows, tabular figures, no fills. Scrolls inside its own box
 * on narrow screens (keyboard focusable). `rows` are records keyed by column key.
 * `footer` is an optional totals row. Numeric columns: align: "right".
 * `caption` is announced to screen readers and shown above the table when `showCaption`.
 */
export function LedgerTable({
  columns,
  rows,
  footer,
  caption,
  showCaption = false,
  className,
  tableClassName = "min-w-[480px]",
}: {
  columns: LedgerColumn[];
  rows: Record<string, React.ReactNode>[];
  footer?: Record<string, React.ReactNode>;
  caption: string;
  showCaption?: boolean;
  className?: string;
  /** Minimum table width before the box scrolls; pass "min-w-0" for narrow tables. */
  tableClassName?: string;
}) {
  const cell = (c: LedgerColumn) => cn("py-3 pr-4 last:pr-0 align-top", c.align === "right" ? "text-right num" : "text-left", c.className);
  return (
    <div className={cn("overflow-x-auto", className)} tabIndex={0} role="region" aria-label={caption}>
      <table className={cn("w-full border-collapse text-[0.9375rem] num", tableClassName)}>
        <caption className={showCaption ? "t-label mb-3 text-left" : "sr-only"}>{caption}</caption>
        <thead>
          <tr className="border-b border-ink">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn(cell(c), "t-label font-medium")}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule">
              {columns.map((c, j) =>
                j === 0 ? (
                  <th key={c.key} scope="row" className={cn(cell(c), "font-medium text-ink")}>
                    {r[c.key]}
                  </th>
                ) : (
                  <td key={c.key} className={cell(c)}>
                    {r[c.key]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="border-t border-ink font-semibold">
              {columns.map((c) => (
                <td key={c.key} className={cell(c)}>
                  {footer[c.key]}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
