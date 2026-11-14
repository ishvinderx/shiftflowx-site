"use client";

import { useState } from "react";
import { API_V1_URL, SUPPORT_EMAIL } from "@/lib/constants";
import { inputCls, labelCls, errCls } from "@/components/calculator/kit";

const subjects = [
  "General Question",
  "Account Issue",
  "Billing & Subscription",
  "Payroll Discrepancy",
  "Technical Bug",
  "Feature Request",
  "Delete My Account",
  "Other",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(f: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address, such as you@example.com.";
  if (!f.message.trim()) e.message = "Tell us what you need help with.";
  return e;
}

export default function SupportClient() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });

  // Posts to the backend support endpoint (stored + emailed to the support inbox) and shows an
  // honest failure state with a mailto fallback. Never fakes success.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(`support-${first}`)?.focus();
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${API_V1_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setSubmitted(true);
    } catch {
      setError("We couldn't send your message right now.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="border-t border-ink pt-6">
        <p className="t-label">Message sent</p>
        <p className="t-h3 mt-3">Thanks for reaching out.</p>
        <p className="t-body mt-3 text-ink-2">
          We will reply to <strong className="font-semibold text-ink">{form.email}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  const describe = (k: keyof Errors) => (errors[k] ? `support-${k}-err` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="support-name" className={labelCls}>Name</label>
          <input id="support-name" type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
          {errors.name && <p id="support-name-err" className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="support-email" className={labelCls}>Email</label>
          <input id="support-email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
          {errors.email && <p id="support-email-err" className={errCls}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="support-subject" className={labelCls}>Subject</label>
        <select id="support-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls}>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="support-message" className={labelCls}>Message</label>
        <textarea id="support-message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputCls} resize-y border border-ink-2 px-3`} aria-invalid={!!errors.message} aria-describedby={describe("message")} />
        {errors.message && <p id="support-message-err" className={errCls}>{errors.message}</p>}
      </div>

      {error && (
        <p role="alert" className="text-[0.9375rem] text-alert">
          {error} Please email us directly at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-4">{SUPPORT_EMAIL}</a>.
        </p>
      )}
      <div>
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
