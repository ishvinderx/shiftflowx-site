"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description:
 "We explain our calculations and label estimates as estimates. Your data is yours, and you always know how we use it.",
    color: "var(--color-ink)",
    bg: "var(--color-rule)",
  },
  {
    icon: Eye,
    title: "Privacy",
    description:
 "Your payroll data is among the most sensitive information you have. We encrypt everything, never sell data, and give you full control to delete at any time.",
    color: "var(--color-commit)",
    bg: "var(--color-rule)",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description:
 "Knowledge is power. HoursFlow gives you a clear record of your hours and earnings — so you can check your pay with confidence.",
    color: "var(--color-positive)",
    bg: "var(--color-rule)",
  },
  {
    icon: Heart,
    title: "Simplicity",
    description:
 "Tracking your pay should not be another chore. We keep the app simple and quick to use.",
    color: "var(--color-positive)",
    bg: "var(--color-rule)",
  },
];

export default function AboutClient() {
  return (
    <div className="bg-ground min-h-screen pt-24">
      {/* Mission hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="relative max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink/10 border border-ink/20 mb-8">
              <span className="text-ink text-xs font-semibold uppercase tracking-wider">Our Mission</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-ink tracking-tight leading-[1.08] mb-8">
              We believe every worker<br />
              deserves to be{" "}
              <span className="text-ink">paid fairly.</span>
            </h1>
            <p className="text-xl text-ink-2 leading-relaxed max-w-2xl mx-auto">
              HoursFlow was born from a simple observation: workers are at an information disadvantage.
              Employers have payroll systems, compliance teams, and legal departments.
              Workers have a pay stub and a hope that the numbers are right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-ground">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-ink mb-6 tracking-tight">Our story</h2>
            <div className="space-y-5 text-ink-2 text-lg leading-relaxed">
              <p>
                HoursFlow started with a question: why do so many workers get paid less than they&apos;re owed?
                Research suggests that wage theft — through missed overtime, incorrect rates, and unpaid breaks —
                costs workers billions of dollars every year. Most of it goes undetected.
              </p>
              <p>
                We built HoursFlow to change that. With simple,
                intuitive design, we created a tool that any worker — nurse, driver, barista, contractor —
                can use to track their hours, income, bills and tax estimates.
              </p>
              <p>
                When you don&apos;t know when your next paycheck arrives or what it should be,
                planning is hard. HoursFlow helps by keeping your hours, payday and bills in one place.
              </p>
              <p>
                HoursFlow is built for workers across the US, Canada, UK, and Australia.
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
            <h2 className="text-3xl font-bold text-ink mb-6 tracking-tight">Our philosophy</h2>
            <div className="space-y-5 text-ink-2 text-lg leading-relaxed">
              <p>
                <strong className="text-ink">Good tools shouldn&apos;t be a privilege.</strong>{" "}
                Tracking your hours and pay should be available to every worker, regardless of education, background, or income level.
              </p>
              <p>
                <strong className="text-ink">Your data is yours.</strong>{" "}
                You can export your data and delete your account from the app at any time.
              </p>
              <p>
                <strong className="text-ink">Estimates should say they are estimates.</strong>{" "}
                Payday and tax figures in HoursFlow are estimates based on what you enter.
                We believe trust comes from being clear about what the app can and cannot tell you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-ground">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-ink mb-12 tracking-tight text-center">Our values</h2>
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
                  className="bg-track/40 border border-rule rounded-2xl p-6"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: v.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-ink font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-ink-2 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ink mb-4">Join the movement.</h2>
          <p className="text-ink-2 text-lg mb-8">
            Every paycheck protected is a step toward a fairer workforce. Start free today.
          </p>
          <a
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink hover:bg-ink-2 rounded-xl text-ground font-bold text-sm   transition-all duration-200"
          >
            Download HoursFlow Free
          </a>
        </div>
      </section>
    </div>
  );
}
