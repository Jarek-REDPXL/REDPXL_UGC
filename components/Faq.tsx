"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Canvas from "@/components/ui/Canvas";

/**
 * DESIGN.md §9 [07] FAQ + §8.8 accordion.
 * No boxes; hairline dividers. One item open at a time.
 */
type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "Does AI-made creative actually convert?",
    a: "Yes. On paid social, native-feeling creative consistently beats studio gloss, and that's exactly what we make. Most viewers can't tell it's AI, and every ad is built around proven direct-response hooks rather than novelty. You test them like any other batch and keep what wins.",
  },
  {
    q: "Will it match my brand?",
    a: "Everything is produced to your brand: your product, your positioning, your look and tone. We study your current ads and best performers first, so what we ship feels like you, only faster and in far more volume.",
  },
  {
    q: "Do I keep the rights?",
    a: "Yes. Every tier includes full paid usage rights to everything we deliver. Run it on any platform, for as long as you like, with no per-asset licensing or renewal fees.",
  },
  {
    q: "How fast can we start?",
    a: "Brief us today and your first batch lands in 72 hours. There's no lengthy onboarding. A short form or a 15-minute call is enough to get production moving.",
  },
  {
    q: "What if I don't like them?",
    a: "Start with a trial batch. If you wouldn't run them, you don't owe us for the batch. The downside is entirely ours. And the £750 is credited toward your first month if you go on to a plan.",
  },
  {
    q: "What's the difference between the trial and a plan?",
    a: "The trial is a one-time 8-ad batch to prove the quality, credited toward month one if you continue. Plans deliver a fixed volume of ads every month, either 15, 30 or 60, with revisions, reviews and ongoing refreshes as your winners fatigue.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Canvas
      id="faq"
      idx="11"
      name="FAQ"
      note="06 QUESTIONS"
      tint="white-border"
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
                <span
                  className={`shrink-0 transition-[transform,color] duration-[180ms] ease-[var(--ease-out)] ${
                    isOpen ? "rotate-45 text-accent" : "text-text-3"
                  }`}
                >
                  <Plus className="h-[18px] w-[18px]" />
                </span>
              </button>

              {/* pure-CSS accordion: grid-rows 0fr → 1fr animates height, no JS */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-[300ms] ease-[var(--ease-out)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="body-copy max-w-[640px] pb-6">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Canvas>
  );
}
