"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  accentColor: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/screenshots/home.png",
    alt: "ShiftFlow Home Dashboard",
    label: "Dashboard",
    accentColor: "#D63C6B",
  },
  {
    src: "/screenshots/shifts.png",
    alt: "ShiftFlow Shifts tab",
    label: "Shifts",
    accentColor: "#D63C6B",
  },
  {
    src: "/screenshots/insights.png",
    alt: "ShiftFlow Financial Intelligence Center",
    label: "Insights",
    accentColor: "#0EA5E9",
  },
  {
    src: "/screenshots/paycheck.png",
    alt: "ShiftFlow Paycheck Protection",
    label: "Paycheck",
    accentColor: "#22C55E",
  },
  {
    src: "/screenshots/home-dashboard.png",
    alt: "ShiftFlow Home with Quick Actions",
    label: "Quick Actions",
    accentColor: "#F97316",
  },
  {
    src: "/screenshots/profile.png",
    alt: "ShiftFlow Profile & Settings",
    label: "Profile",
    accentColor: "#8B5CF6",
  },
];

function GalleryPhone({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
      className="flex-shrink-0 flex flex-col items-center gap-4"
    >
      {/* Device */}
      <div
        style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.65))" }}
        className="relative"
      >
        <div
          style={{
            width: 200,
            height: 432,
            borderRadius: 44,
            background: "#111",
            border: "2.5px solid rgba(255,255,255,0.13)",
            overflow: "hidden",
            position: "relative",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.8)",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 96,
              height: 26,
              borderRadius: "0 0 18px 18px",
              background: "#111",
              zIndex: 20,
            }}
          />
          {/* Screenshot */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 42,
              overflow: "hidden",
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
          {/* Shine */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 42,
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        </div>

        {/* Colour glow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-36 h-20 blur-2xl rounded-full pointer-events-none"
          style={{ background: item.accentColor, opacity: 0.15 }}
        />
      </div>

      {/* Label */}
      <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
        {item.label}
      </p>
    </motion.div>
  );
}

export default function AppGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative py-24 md:py-32 bg-[#050508] overflow-hidden"
      id="gallery"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,60,107,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
        <SectionHeader
          label="App Gallery"
          title="Every screen. Built for you."
          subtitle="Real screenshots from ShiftFlow running on iPhone. What you see is what you get."
        />
      </div>

      {/* Scrollable gallery row */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#050508] to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#050508] to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-16 md:px-32 pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryItems.map((item, i) => (
            <GalleryPhone key={item.src} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Attribution */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mt-8 text-center">
        <p className="text-white/20 text-xs">
          All screenshots captured from ShiftFlow running on iPhone 17 Pro simulator · iOS 26.4
        </p>
      </div>
    </section>
  );
}
