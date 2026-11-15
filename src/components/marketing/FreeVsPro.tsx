import { LedgerTable, Callout } from "@/components/ui";
import { FREE_FEATURES, PRO_FEATURES, PLAN_POLICY } from "@/lib/constants";


/** Free vs Pro ledger table rendered from the constants, with the no-deletion policy sentence. */
export default function FreeVsPro({ showFullPolicy = false }: { showFullPolicy?: boolean }) {
  const yes = <span className="font-semibold text-positive">Included</span>;
  const no = (
    <span className="text-ink-2" aria-label="Not included">
      &mdash;
    </span>
  );
  const rows = [
    ...FREE_FEATURES.map((f) => ({ feature: f, free: yes, pro: yes })),
    { feature: "Record history", free: "Last 30 days", pro: "Full history" },
    ...PRO_FEATURES.filter((f) => !/history/i.test(f)).map((f) => ({ feature: f, free: no, pro: yes })),
  ];
  return (
    <div className="grid gap-8">
      <LedgerTable
        tableClassName="min-w-0"
        caption="What is included in Free and in Pro"
        columns={[
          { key: "feature", label: "Feature" },
          { key: "free", label: "Free", align: "right" },
          { key: "pro", label: "Pro", align: "right" },
        ]}
        rows={rows}
      />
      <Callout label="If a subscription lapses">
        {showFullPolicy ? (
          <>
            <span className="block">{PLAN_POLICY.free}</span>
            <span className="mt-2 block">{PLAN_POLICY.subscribers}</span>
            <span className="mt-2 block">{PLAN_POLICY.lapse}</span>
          </>
        ) : (
          PLAN_POLICY.lapse
        )}
      </Callout>
    </div>
  );
}
