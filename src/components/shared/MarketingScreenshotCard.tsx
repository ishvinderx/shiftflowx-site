"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MarketingScreenshotCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  delay?: number;
  /** "phone" (default) | "flat" — flat has no device chrome */
  variant?: "phone" | "flat";
  /** Badge shown in top-right corner of the frame */
  badge?: { label: string; color: string };
}

/**
 * Reusable marketing screenshot card.
 * Wraps a real app screenshot in a styled iPhone device frame.
 * Animate on viewport entry. Optional hover zoom.
 */
export default function MarketingScreenshotCard({
  src,
  alt,
  title,
  description,
  delay = 0,
  variant = "phone",
  badge,
}: MarketingScreenshotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-5"
    >
      {/* Device frame */}
      <motion.div
        whileHover={{ scale: 1.03, y: -6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative"
        style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6))" }}
      >
        {variant === "phone" ? (
          <PhoneFrame src={src} alt={alt} badge={badge} />
        ) : (
          <FlatFrame src={src} alt={alt} />
        )}
      </motion.div>

      {/* Caption */}
      {(title || description) && (
        <div className="text-center max-w-xs">
          {title && (
            <p className="text-white font-semibold text-sm mb-1">{title}</p>
          )}
          {description && (
            <p className="text-white/45 text-xs leading-relaxed">{description}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

function PhoneFrame({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: { label: string; color: string };
}) {
  return (
    <div
      className="relative"
      style={{
        width: 220,
        height: 476,
        borderRadius: 44,
        background: "#1a1a1a",
        border: "2px solid rgba(255,255,255,0.12)",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Status bar notch simulation */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
        style={{
          width: 100,
          height: 28,
          borderRadius: "0 0 18px 18px",
          background: "#1a1a1a",
        }}
      />
      {/* Screenshot */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 42 }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="220px"
          priority
        />
      </div>
      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 42,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />
      {/* Badge */}
      {badge && (
        <div
          className="absolute top-4 right-3 z-20 px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
          style={{ background: badge.color }}
        >
          {badge.label}
        </div>
      )}
    </div>
  );
}

function FlatFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10"
      style={{ width: 280, height: 520 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="280px"
        priority
      />
    </div>
  );
}
