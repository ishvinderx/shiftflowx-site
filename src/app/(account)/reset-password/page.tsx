"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import StatePanel from "@/components/account/StatePanel";
import { API_V1_URL, APP_STORE_URL } from "@/lib/constants";
import { errCls, inputCls, labelCls } from "@/components/calculator/kit";

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
      const res = await fetch(`${API_V1_URL}/auth/reset-password`, {
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
      <StatePanel
        label="Reset link problem"
        tone="error"
        title="This reset link is incomplete"
        body="The link is missing its token. Open the link from your email again, or request a new reset email from the HoursFlow login screen."
      />
    );
  }

  if (state === "done") {
    return (
      <StatePanel
        label="Password updated"
        tone="success"
        title="Your password has been changed"
        body="Open HoursFlow and sign in with your new password."
      >
        <Button href={APP_STORE_URL}>Open HoursFlow</Button>
      </StatePanel>
    );
  }

  return (
    <StatePanel
      label="Reset password"
      title="Set a new password"
      body="Choose a new password for your HoursFlow account. Reset links work once and expire after 1 hour."
    >
      <form onSubmit={submit} noValidate className="grid gap-6">
        <div>
          <label htmlFor="rp-password" className={labelCls}>New password</label>
          <input id="rp-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password" className={inputCls} aria-describedby="rp-hint" />
          <p id="rp-hint" className="mt-1.5 text-[0.875rem] text-ink-2">At least 8 characters.</p>
        </div>
        <div>
          <label htmlFor="rp-confirm" className={labelCls}>Confirm password</label>
          <input id="rp-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password" className={inputCls} aria-invalid={!!message && state !== "busy"} aria-describedby={message ? "rp-msg" : undefined} />
        </div>
        {message && <p id="rp-msg" role="alert" className={errCls}>{message}</p>}
        <div>
          <button type="submit" disabled={state === "busy"} className="btn btn-primary disabled:opacity-60">
            {state === "busy" ? "Updating…" : "Update password"}
          </button>
        </div>
      </form>
    </StatePanel>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<StatePanel label="Please wait" title="Loading" />}>
      <ResetForm />
    </Suspense>
  );
}
