"use client";

import { ArrowDown } from "lucide-react";
import { useLoopCount } from "@/components/ui/useLoopCount";

/**
 * DESIGN.md §14 — CostLadder. The "much cheaper" story as a premium odometer that
 * loops: rolling digit columns count DOWN £500 → £100 (~2s, strong ease-out),
 * land on big bold £100, then — choreographed — the CREATOR range £150–500
 * strikes through (150ms later) and the green ↓ UP TO 80% LESS chip pops in
 * (400ms later). Holds ~2s, fades out, resets, repeats. Sibling of Volume (same
 * number size / labels / timing), counting the opposite direction.
 * Reduced-motion: static final state, no loop. Inter, tabular-nums, tokens only.
 */

/** One odometer digit: a 0–9(+0) strip masked to a single row, slid by `offset`
 *  (continuous, in em) so the digit rolls smoothly like a departure board. */
function DigitCol({ offset }: { offset: number }) {
  const o = offset < 0 ? 0 : offset;
  return (
    <span className="inline-block h-[1em] overflow-hidden align-top">
      <span className="block will-change-transform" style={{ transform: `translateY(-${o}em)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
          <span key={i} className="block h-[1em] text-center leading-[1em]">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/** £ + three rolling digit columns (hundreds/tens/ones) driven by a float. */
function Odometer({ value }: { value: number }) {
  return (
    <span className="stat inline-flex items-start leading-none text-ink tabular-nums">
      <span>£</span>
      {[2, 1, 0].map((place) => (
        <DigitCol key={place} offset={(value / Math.pow(10, place)) % 10} />
      ))}
    </span>
  );
}

export default function CostLadder({ className = "" }: { className?: string }) {
  const { value, phase, ref } = useLoopCount(500, 100);
  const landed = phase === "hold";
  const resetting = phase === "reset";

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden>
      <div className="flex flex-col gap-4">
        <div>
          <span className="mono-note block text-text-3">CREATOR</span>
          <div className="relative mt-1 inline-block">
            <span className="title-2 tabular-nums text-text-3">£150–500</span>
            <span
              className={`absolute left-0 top-1/2 h-px w-full origin-left bg-text-3 transition-transform duration-300 ease-[var(--ease-out)] ${
                landed ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transitionDelay: landed ? "150ms" : "0ms" }}
            />
          </div>
        </div>

        <div>
          <span className="mono-note text-text-3">REDPXL · FROM</span>
          <div
            className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 transition-opacity duration-300 ${
              resetting ? "opacity-0" : "opacity-100"
            }`}
          >
            <Odometer value={value} />
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full border border-pos/25 bg-pos/10 px-2.5 py-1 mono-note text-pos transition-all duration-300 ease-[var(--ease-out)] ${
                landed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: landed ? "400ms" : "0ms" }}
            >
              <ArrowDown className="h-3 w-3" /> UP TO 80% LESS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
