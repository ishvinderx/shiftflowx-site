"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FAQ_ITEMS } from "@/lib/constants";

function FAQItem({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="border border-white/8 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-base pr-4">{item.question}</span>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
            open ? "bg-[#D63C6B]" : "bg-white/8 border border-white/10"
          }`}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5 text-white" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white/60" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 border-t border-white/5">
              <p className="text-white/55 text-sm leading-relaxed pt-4">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-24 md:py-32 bg-[#080810] overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          label="FAQ"
          title="Common questions."
          subtitle="Everything you need to know about ShiftFlow."
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
