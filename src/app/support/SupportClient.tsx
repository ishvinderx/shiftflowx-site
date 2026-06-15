"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, MessageSquare, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { FAQ_ITEMS, SUPPORT_EMAIL } from "@/lib/constants";

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
      className="border border-white/8 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-[#D63C6B]" : "bg-white/8"}`}>
          {open ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-white/60" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              <p className="text-white/55 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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

export default function SupportClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.08)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
              How can we <span className="gradient-text">help?</span>
            </h1>
            <p className="text-xl text-white/50">
              We&apos;re here for you. Send us a message and we&apos;ll get back within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info cards */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Mail, label: "Email us", value: SUPPORT_EMAIL, link: `mailto:${SUPPORT_EMAIL}` },
              { icon: Clock, label: "Response time", value: "Within 24 hours", link: null },
              { icon: MessageSquare, label: "Delete account", value: "Visit /delete", link: "/delete" },
            ].map(({ icon: Icon, label, value, link }) => (
              <div key={label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#D63C6B]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#D63C6B]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">{label}</p>
                  {link ? (
                    <a href={link} className="text-white text-sm font-medium hover:text-[#D63C6B] transition-colors">{value}</a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Send a message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#22C55E]/10 border border-[#22C55E]/25 rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#22C55E]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent!</h3>
                <p className="text-white/55 text-sm">
                  Thanks for reaching out. We&apos;ll reply to <strong className="text-white/80">{form.email}</strong> within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D63C6B]/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D63C6B]/50 transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D63C6B]/50 transition-colors appearance-none"
                    style={{ colorScheme: "dark" }}
                  >
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 text-xs font-medium mb-1.5">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D63C6B]/50 transition-colors resize-none"
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D63C6B] hover:bg-[#c0355f] rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#D63C6B]/25"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Quick answers</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.slice(0, 5).map((item, i) => (
                <FAQItem key={i} q={item.question} a={item.answer} i={i} />
              ))}
            </div>

            {/* Subscription help */}
            <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-2 text-sm">Subscription help</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                All subscriptions are managed by Apple. To cancel or manage your plan, go to
                Settings → Apple ID → Subscriptions on your iPhone.
              </p>
              <Link
                href="/subscription-terms"
                className="text-[#D63C6B] text-xs hover:text-[#D63C6B]/80 transition-colors"
              >
                View Subscription Terms →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
