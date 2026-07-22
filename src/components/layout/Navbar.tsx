"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ShiftFlowLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image
          src="/icon-192.png"
          alt="ShiftFlow"
          width={32}
          height={32}
          className="rounded-[9px]"
          priority
        />
        <div className="absolute inset-0 rounded-[9px] bg-[#D63C6B] opacity-0 group-hover:opacity-20 blur-[6px] transition-opacity duration-300" />
      </div>
      <span className="text-white font-bold text-[17px] tracking-tight">
        Shift<span className="text-[#D63C6B]">Flow</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#050508]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-[#050508]/40 backdrop-blur-xl border-b border-white/[0.04]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <ShiftFlowLogo />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-4 right-4 h-px bg-[#D63C6B] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/download"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#D63C6B] text-white hover:bg-[#c0355f] shadow-[0_0_20px_rgba(214,60,107,0.3)] hover:shadow-[0_0_30px_rgba(214,60,107,0.5)] transition-all duration-200"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050508]/98 backdrop-blur-2xl flex flex-col pt-[72px]"
          >
            <nav className="flex flex-col px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-4 text-xl font-semibold text-white/70 hover:text-white border-b border-white/[0.06] transition-colors"
                  >
                    {link.label}
                    <span className="text-white/20 text-base">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="px-6 mt-8"
            >
              <Link
                href="/download"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-4 text-base font-bold rounded-2xl bg-[#D63C6B] text-white shadow-[0_0_30px_rgba(214,60,107,0.4)] hover:bg-[#c0355f] transition-colors"
              >
                Start Free Trial →
              </Link>
              <p className="text-center text-white/30 text-sm mt-4">7-day free trial · Cancel anytime</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
