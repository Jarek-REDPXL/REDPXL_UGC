"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import Section from "@/components/ui/Section";
import { accordionTransition } from "@/lib/motion";

/**
 * DESIGN.md §9 [07] FAQ + §8.8 accordion.
 * No boxes; hairline dividers. One item open at a time.
 */
type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "Do the videos really look human?",
    a: "Yes. We generate hyper-realistic AI creators that read as authentic UGC to anyone scrolling a feed. On your strategy call we'll show you live examples in your niche so you can judge for yourself before committing.",
  },
  {
    q: "Who owns the videos?",
    a: "You do — completely and forever. Every plan includes full usage rights across paid and organic, with no creator licensing fees, usage windows or renewal invoices.",
  },
  {
    q: "What do you need from us?",
    a: "Very little. A 15-minute call or a short async form covering your brand, product, audience and offer. If you have brand guidelines or existing assets we'll use them, but they aren't required to start.",
  },
  {
    q: "How fast is delivery?",
    a: "First drafts land within 48 hours of your brief. After launch, we ship fresh variations of your winning ads every week so your creative pipeline never runs dry.",
  },
  {
    q: "What about revisions?",
    a: "Revisions are included in every plan. We iterate on scripts, hooks, pacing and captions until the ad is ready to run — no per-change reshoot fees like traditional UGC.",
  },
  {
    q: "Which platforms do they work on?",
    a: "All of them. Every video is delivered in 9:16, 1:1 and 16:9, optimised for TikTok, Meta, YouTube Shorts and beyond — ready to upload straight into your ad manager.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section
      id="faq"
      idx="07"
      name="FAQ"
      note="06 QUESTIONS"
      title="The honest answers."
    >
      <div className="border-t border-line">
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="title-1">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={isOpen ? "text-accent" : "text-text-3"}
                >
                  <Plus className="h-[18px] w-[18px]" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={accordionTransition}
                    className="overflow-hidden"
                  >
                    <p className="body-copy max-w-[640px] pb-6">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
