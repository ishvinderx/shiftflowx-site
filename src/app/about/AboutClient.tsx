"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description:
      "We explain every insight, every calculation, every alert. No black boxes. Your data is yours, and you always know how we use it.",
    color: "#D63C6B",
    bg: "rgba(214,60,107,0.1)",
  },
  {
    icon: Eye,
    title: "Privacy",
    description:
      "Your payroll data is among the most sensitive information you have. We encrypt everything, never sell data, and give you full control to delete at any time.",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description:
      "Knowledge is power. ShiftFlow arms you with the same tools and intelligence that large employers use — so you can advocate for yourself with confidence.",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.1)",
  },
  {
    icon: Heart,
    title: "Wellbeing",
    description:
      "Your health matters as much as your paycheck. We believe financial wellness and physical wellness are deeply connected, and we design for both.",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.1)",
  },
];

export default function AboutClient() {
  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24">
      {/* Mission hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(214,60,107,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D63C6B]/10 border border-[#D63C6B]/20 mb-8">
              <span className="text-[#D63C6B] text-xs font-semibold uppercase tracking-wider">Our Mission</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-8">
              We believe every worker<br />
              deserves to be{" "}
              <span className="gradient-text">paid fairly.</span>
            </h1>
            <p className="text-xl text-white/55 leading-relaxed max-w-2xl mx-auto">
              ShiftFlow was born from a simple observation: workers are at an information disadvantage.
              Employers have payroll systems, compliance teams, and legal departments.
              Workers have a pay stub and a hope that the numbers are right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Our story</h2>
            <div className="space-y-5 text-white/55 text-lg leading-relaxed">
              <p>
                ShiftFlow started with a question: why do so many workers get paid less than they&apos;re owed?
                Research suggests that wage theft — through missed overtime, incorrect rates, and unpaid breaks —
                costs workers billions of dollars every year. Most of it goes undetected.
              </p>
              <p>
                We built ShiftFlow to change that. By combining the power of AI with simple,
                intuitive design, we created a tool that any worker — nurse, driver, barista, contractor —
                can use to track their income, verify their pay, and understand their finances.
              </p>
              <p>
                Financial wellness and emotional wellbeing are deeply linked. When you don&apos;t know when
                your next paycheck arrives, anxiety follows. When you can&apos;t track your burnout, health suffers.
                ShiftFlow addresses both — because protecting a paycheck is about protecting a life.
              </p>
              <p>
                ShiftFlow is built for workers across the US, Canada, UK, and Australia.
                We&apos;re just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Our philosophy</h2>
            <div className="space-y-5 text-white/55 text-lg leading-relaxed">
              <p>
                <strong className="text-white/85">Financial intelligence shouldn&apos;t be a privilege.</strong>{" "}
                It should be available to every worker, regardless of education, background, or income level.
                ShiftFlow democratizes the tools that previously only well-resourced professionals had access to.
              </p>
              <p>
                <strong className="text-white/85">Emotional intelligence matters as much as financial intelligence.</strong>{" "}
                Burnout is real. Fatigue affects judgment, health, and relationships.
                We built burnout tracking directly into the core of ShiftFlow because a healthy worker
                is a financially healthy worker.
              </p>
              <p>
                <strong className="text-white/85">AI should explain itself.</strong>{" "}
                When ShiftFlow alerts you to a pay discrepancy, it tells you exactly why.
                When it predicts your payday, it shows its reasoning.
                We believe AI earns trust through transparency — not mysticism.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#080810]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-white mb-12 tracking-tight text-center">Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: v.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Join the movement.</h2>
          <p className="text-white/50 text-lg mb-8">
            Every paycheck protected is a step toward a fairer workforce. Start free today.
          </p>
          <a
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D63C6B] hover:bg-[#c0355f] rounded-xl text-white font-bold text-sm shadow-lg shadow-[#D63C6B]/30 transition-all duration-200"
          >
            Download ShiftFlow Free
          </a>
        </div>
      </section>
    </div>
  );
}
