/**
 * Plain two-column question/answer list (a <dl>, not an accordion): question left,
 * answer right, hairline between items. Stacks on phones.
 * `items` = [{ q, a }]; the same array can feed FAQPage JSON-LD so schema matches the page.
 */
export function FaqList({ items }: { items: readonly { q: string; a: React.ReactNode }[] }) {
  return (
    <dl className="border-b border-rule">
      {items.map((it, i) => (
        <div key={i} className="grid gap-2 border-t border-rule py-6 md:grid-cols-[5fr_7fr] md:gap-16">
          <dt className="text-[1.0625rem] font-semibold text-ink">{it.q}</dt>
          <dd className="t-body text-ink-2">{it.a}</dd>
        </div>
      ))}
    </dl>
  );
}
