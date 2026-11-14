import { Container, Heading, Label } from "@/components/ui";

/**
 * Narrow single-purpose page body for account states (verify email, reset password):
 * label, h1, short explanation, then actions or a form. `tone="error"` colours the label.
 */
export default function StatePanel({
  label,
  title,
  tone = "neutral",
  children,
  body,
}: {
  label: string;
  title: string;
  tone?: "neutral" | "error" | "success";
  body?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const toneCls = tone === "error" ? "!text-alert" : tone === "success" ? "!text-positive" : "";
  return (
    <Container className="py-16 sm:py-24">
      <div className="grid max-w-[34rem] gap-5" role={tone === "error" ? "alert" : "status"}>
        <Label className={toneCls}>{label}</Label>
        <Heading level="h2" as="h1">{title}</Heading>
        {body && <p className="t-body text-ink-2">{body}</p>}
      </div>
      {children && <div className="mt-8 max-w-[34rem]">{children}</div>}
    </Container>
  );
}
