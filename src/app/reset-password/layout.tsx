import type { Metadata } from "next";

// Token-bearing page (?token=…) — must never be indexed. The page itself is a
// client component and can't export metadata, so this server layout sets noindex.
export const metadata: Metadata = {
  title: "Reset Password · ShiftFlow",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
