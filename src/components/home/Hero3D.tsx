"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { APP_STORE_URL } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

// Floating glass chip that orbits the device.
function Chip({
  className,
  icon,
  label,
  value,
  delay,
  depth,
  mx,
  my,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  // Parallax: chips drift opposite the tilt, scaled by their depth.
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div
      style={{ x, y }}
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <div className="float-y-slow glass rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl">
        <span className="grid place-items-center w-8 h-8 rounded-xl bg-brand/15 text-brand">
          {icon}
        </span>
        <div className="leading-tight">
          <p className="text-[10px] uppercase tracking-wider text-white/45 font-semibold">{label}</p>
          <p className="text-sm font-bold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Raw pointer offset from center (−0.5…0.5), spring-smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });

  // Device tilt from pointer (clamped, subtle).
  const rotateY = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  // Chip parallax uses the smoothed pointer in px.
  const driftX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const driftY = useTransform(sy, [-0.5, 0.5], [-26, 26]);

  function onMove(e: React.MouseEvent) {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32">
      {/* Ambient light field */}
      <div className="absolute inset-0 -z-10">
        <div className="blob blob-a w-[520px] h-[520px] bg-brand/30 -top-32 -left-24" />
        <div className="blob blob-b w-[480px] h-[480px] bg-indigo/25 top-40 -right-20" />
        <div className="blob blob-a w-[360px] h-[360px] bg-teal/15 bottom-0 left-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(214,60,107,0.12),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-6 items-center">
        {/* ── Copy ── */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full glass-soft px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            For employees, contractors &amp; both
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
            className="mt-6 text-[44px] sm:text-6xl lg:text-[68px] font-bold leading-[1.03] tracking-tight text-white"
          >
            Know exactly<br />what you&apos;ve{" "}
            <span className="gradient-text">earned.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
            className="mt-6 text-lg sm:text-xl text-white/55 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Track every shift, estimate your next paycheck and taxes, send invoices, and
            ask your AI financial copilot anything — in one calm, private app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href={APP_STORE_URL}
              className="btn-primary rounded-full px-7 py-3.5 text-white font-semibold text-[15px]"
            >
              Download on the App Store
            </a>
            <Link
              href="/how-it-works"
              className="glass rounded-full px-7 py-3.5 text-white/85 font-semibold text-[15px] hover:text-white transition-colors"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-5 text-sm text-white/35"
          >
            30-day free trial · No card to start · Your data stays yours.
          </motion.p>
        </div>

        {/* ── 3D device ── */}
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="stage-3d relative h-[560px] sm:h-[640px] flex items-center justify-center"
        >
          <motion.div
            className="device-3d float-y relative"
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <div className="phone-shell w-[276px] sm:w-[310px]">
              <div className="phone-screen aspect-[9/19.5]">
                <Image
                  src="/screenshots/home.png"
                  alt="ShiftFlow home dashboard showing total earnings and next payday"
                  fill
                  priority
                  sizes="310px"
                  className="object-cover object-top"
                />
                {/* screen gloss */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.14),transparent_35%)] pointer-events-none" />
                {/* dynamic island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-black/90" />
              </div>
            </div>
          </motion.div>

          {/* Orbiting glass chips */}
          <Chip
            className="top-10 -left-2 sm:left-4"
            label="Est. next pay"
            value="$720.04"
            delay={0.5}
            depth={1.4}
            mx={driftX}
            my={driftY}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8h18M7 12h4m-4 4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
            }
          />
          <Chip
            className="bottom-24 -right-1 sm:right-2"
            label="ShiftFlow Score"
            value="57 · Fair"
            delay={0.66}
            depth={1.8}
            mx={driftX}
            my={driftY}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-9 9-2 2m13 0-2-2m-9-9-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          />
          <Chip
            className="bottom-2 -left-3 sm:-left-2"
            label="AI Copilot"
            value="Ask anything"
            delay={0.8}
            depth={2.2}
            mx={driftX}
            my={driftY}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M12 3v4M9 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
