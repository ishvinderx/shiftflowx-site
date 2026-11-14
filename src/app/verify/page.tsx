import Link from "next/link";
import { API_V1_URL, APP_STORE_URL } from "@/lib/constants";

export const metadata = {
  title: "Verify your email — HoursFlow",
  robots: { index: false },
};

// Branded email-verification landing. The verification email links here (clean
// shiftflowx.net URL); this calls the backend verify endpoint and shows the result.
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
    <main className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-192.png" alt="HoursFlow" width={40} height={40} className="rounded-[10px]" />
          <span className="text-2xl font-bold tracking-tight">HoursFlow</span>
        </div>

        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
          style={{ backgroundColor: ok ? "rgba(34,197,94,0.15)" : "rgba(214,60,107,0.15)" }}
        >
          {ok ? "✅" : "⚠️"}
        </div>

        <h1 className="text-2xl font-bold mb-3">
          {ok ? "Email verified" : "Link expired or invalid"}
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {ok
            ? "Your email is confirmed and your HoursFlow account is protected. You can head back to the app."
            : "This verification link is invalid or has already been used. Open HoursFlow and request a new verification email from Settings."}
        </p>

        <Link
          href={APP_STORE_URL}
          className="inline-block rounded-full px-8 py-4 font-semibold text-white"
          style={{ backgroundColor: "#D63C6B" }}
        >
          Open HoursFlow
        </Link>

        <p className="mt-10 text-xs text-gray-600">
          © {new Date().getFullYear()} HoursFlow ·{" "}
          <Link href="/privacy" className="hover:text-gray-400">Privacy</Link> ·{" "}
          <Link href="/terms" className="hover:text-gray-400">Terms</Link>
        </p>
      </div>
    </main>
  );
}
