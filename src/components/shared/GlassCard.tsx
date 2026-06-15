"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : undefined
      }
      className={cn(
        "relative glass-card rounded-2xl",
        hover && "cursor-default transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      {glow && (
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-[0.12] pointer-events-none transition-opacity duration-300"
          style={{ background: glow }}
        />
      )}
      {children}
    </motion.div>
  );
}
