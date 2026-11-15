import { TextLink, Button } from "@/components/ui";
import StatePanel from "@/components/account/StatePanel";
import { API_V1_URL, APP_STORE_URL } from "@/lib/constants";

export const metadata = {
  title: "Verify your email — HoursFlow",
  robots: { index: false },
};

// Branded email-verification landing. The verification email links here (clean
// hoursflow.app URL); this calls the backend verify endpoint and shows the result.
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let ok = false;
  if (token && token.length > 10) {
    try {
      const res = await fetch(
        `${API_V1_URL}/auth/verify-email?token=${encodeURIComponent(token)}`,
        { cache: "no-store" }
      );
      ok = res.ok;
    } catch {
      ok = false;
    }
  }

  return (
    <StatePanel
      label={ok ? "Email verified" : "Verification failed"}
      tone={ok ? "success" : "error"}
      title={ok ? "Your email is confirmed" : "Link expired or invalid"}
      body={
        ok
          ? "Your HoursFlow account is protected. You can head back to the app."
          : "This verification link is invalid or has already been used. Open HoursFlow and request a new verification email from Settings."
      }
    >
      <div className="grid gap-6">
        <div>
          <Button href={APP_STORE_URL}>Open HoursFlow</Button>
        </div>
        <p className="text-[0.9375rem] text-ink-2">
          <TextLink href="/privacy">Privacy</TextLink> · <TextLink href="/terms">Terms</TextLink>
        </p>
      </div>
    </StatePanel>
  );
}
