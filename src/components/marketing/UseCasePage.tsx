import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FreeVsPro from "@/components/marketing/FreeVsPro";
import {
  AllocationBar, AppStoreButton, Button, Container, FaqList, FeatureRow, Figure, LedgerTable,
  LineChart, PageHeader, PhoneFrame, Section, TextLink,
} from "@/components/ui";
import { APP_STORE_URL } from "@/lib/constants";
import { faqSchema, jsonLd } from "@/lib/seo";
import type { UseCase, UseCaseVisual } from "@/content/use-cases";

function Visual({ v }: { v: UseCaseVisual }) {
  switch (v.kind) {
    case "phone":
      return <PhoneFrame src={v.src} alt={v.alt} />;
    case "allocation":
      return <AllocationBar />;
    case "earnings":
      return (
        <div className="grid gap-8">
          <Figure label="Expected paycheque" value="$863" cents=".83" tone="positive" note="Sample data: $1,008.00 gross less $144.17 estimated deductions" />
          <LineChart />
        </div>
      );
    case "ledger":
      return (
        <figure>
          <figcaption className="mb-3 flex items-baseline justify-between gap-4">
            <span className="t-label">{v.caption}</span>
            <span className="t-label">Sample data</span>
          </figcaption>
          <LedgerTable tableClassName="min-w-0" caption={v.caption} columns={v.columns} rows={v.rows} footer={v.footer} />
        </figure>
      );
  }
}

/** The shared template for /use-cases/[slug]. All copy comes from src/content/use-cases.ts. */
export default function UseCasePage({ data }: { data: UseCase }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(data.faq)) }} />
      <Breadcrumbs
        trail={[
          { name: "HoursFlow", path: "/" },
          { name: "Use cases", path: "/use-cases" },
          { name: data.name, path: `/use-cases/${data.slug}` },
        ]}
      />
      <PageHeader label={`For ${data.name.toLowerCase()}`} title={data.h1} lede={data.lede}>
        <AppStoreButton href={APP_STORE_URL} />
        <Button href="/pricing" variant="secondary">See pricing</Button>
      </PageHeader>

      <section>
        <Container>
          {data.rows.map((r, i) => (
            <FeatureRow key={r.title} label={r.label} title={r.title} reverse={i % 2 === 1} visual={<Visual v={r.visual} />}>
              {r.body.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </FeatureRow>
          ))}
        </Container>
      </section>

      <Section label="Free and Pro" title="What each plan includes">
        <FreeVsPro />
      </Section>

      <Section label="Questions" title={`Questions from ${data.name.toLowerCase()}`}>
        <FaqList items={data.faq} />
        <p className="t-body mt-8 text-ink-2">
          Free calculators for this:{" "}
          {data.tools.map((t, i) => (
            <span key={t.href}>
              {i > 0 && ", "}
              <TextLink href={t.href}>{t.label}</TextLink>
            </span>
          ))}
          .
        </p>
      </Section>
    </>
  );
}
