"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * MathsBars — horizontal cost comparison for the Maths canvas (sage).
 *
 * Two full-width tracks. The long bar (creator video, --text-3) fills its
 * track completely; the short bar (Redpxl plan, --accent) fills ~30% of it,
 * so the fraction reads visually. Bars fill from 0 → target once, when
 * scrolled into view. Under prefers-reduced-motion they render at full width
 * immediately (no animation). Values use .label + tabular figures.
 *
 * aria-hidden per the graphics convention — the Maths canvas copy carries the
 * accessible statement of the same numbers.
 */

type Row = {
  label: string;
  value: string;
  /** fill width, as a % of the track */
  pct: number;
  barClass: string;
  valueClass: string;
  delay: number;
};

const ROWS: Row[] = [
  {
    label: "Creator video",
    value: "£150–500",
    pct: 100,
    barClass: "bg-text-3",
    valueClass: "text-ink",
    delay: 0,
  },
  {
    label: "Redpxl plan",
    value: "£100–133/AD",
    pct: 30,
    barClass: "bg-accent",
    valueClass: "text-accent-dark",
    delay: 0.12,
  },
];

export default function MathsBars({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const shouldFill = reduced || inView;

  return (
    <div ref={ref} aria-hidden className={className}>
      <div className="flex flex-col gap-5">
        {ROWS.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="mono-note text-text-3">{r.label}</span>
              <span className={`label tabular-nums ${r.valueClass}`}>
                {r.value}
              </span>
            </div>
            <div className="mt-3 h-7 w-full overflow-hidden rounded-[4px] bg-ink/5">
              <motion.div
                className={`h-full rounded-[4px] ${r.barClass}`}
                initial={false}
                animate={{ width: shouldFill ? `${r.pct}%` : "0%" }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: r.delay }
                }
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mono-note text-text-3 mt-6">
        Based on starter→scale plans · excl. VAT
      </p>
    </div>
  );
}
