"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  center?: boolean;
  titleClassName?: string;
  gradient?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  center,
  titleClassName,
  gradient = false,
}: SectionHeaderProps) {
  const isCentered = center !== undefined ? center : align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-16", isCentered && "text-center")}
    >
      {label && (
        <div className={cn("flex items-center gap-2 mb-5", isCentered && "justify-center")}>
          <div className="h-px w-6 bg-[#D63C6B]" />
          <span className="text-[#D63C6B] text-[11px] font-semibold uppercase tracking-[0.15em]">
            {label}
          </span>
          <div className="h-px w-6 bg-[#D63C6B]" />
        </div>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight",
          gradient && "gradient-text",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-white/50 leading-relaxed",
            isCentered && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
