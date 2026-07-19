"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { APP_STORE_URL } from "@/lib/constants";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://shiftflow-backend-production.up.railway.app/api/v1";

// P0-01 (TestFlight): the password-reset email links to /reset-password?token=…,
// which previously existed NOWHERE (404). This page completes the flow by calling
// the existing backend POST /auth/reset-password (token is 1-hour, single-use).
function ResetForm() {
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setMessage("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setMessage("Passwords don't match."); return; }
    setState("busy"); setMessage("");
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (res.ok) { setState("done"); }
      else {
        setState("error");
        setMessage("This reset link is invalid, expired, or already used. Request a new one from the app's login screen.");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  };

  if (!token) {
    return (
      <p className="text-gray-400 leading-relaxed">
        This reset link is missing its token. Open the link from your email again, or request a
        new reset email from the ShiftFlow login screen.
      </p>
    );
  }

  if (state === "done") {
    return (
      <>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
             style={{ backgroundColor: "rgba(34,197,94,0.15)" }}>✅</div>
        <h1 className="text-2xl font-bold mb-3">Password updated</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Your password has been changed. Open ShiftFlow and sign in with your new password.
        </p>
        <a href={APP_STORE_URL}
           className="inline-block rounded-full bg-[#E91E63] px-8 py-3 font-semibold text-white">
          Open ShiftFlow
        </a>
      </>
    );
  }

  return (
    <form onSubmit={submit} className="text-left">
      <h1 className="text-2xl font-bold mb-3 text-center">Set a new password</h1>
      <p className="text-gray-400 mb-8 leading-relaxed text-center">
        Choose a new password for your ShiftFlow account. Reset links work once and expire
        after 1 hour.
      </p>
      <label className="block text-sm text-gray-300 mb-2">New password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
             minLength={8} required autoComplete="new-password"
             className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 mb-4 text-white outline-none focus:border-[#E91E63]" />
      <label className="block text-sm text-gray-300 mb-2">Confirm password</label>
      <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
             minLength={8} required autoComplete="new-password"
             className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 mb-6 text-white outline-none focus:border-[#E91E63]" />
      {message && <p className="text-[#FF6B9D] text-sm mb-4">{message}</p>}
      <button type="submit" disabled={state === "busy"}
              className="w-full rounded-full bg-[#E91E63] py-3 font-semibold text-white disabled:opacity-50">
        {state === "busy" ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-192.png" alt="ShiftFlow" width={40} height={40} className="rounded-[10px]" />
          <span className="text-2xl font-bold tracking-tight">ShiftFlow</span>
        </div>
        <Suspense>
          <ResetForm />
        </Suspense>
      </div>
    </main>
  );
}
