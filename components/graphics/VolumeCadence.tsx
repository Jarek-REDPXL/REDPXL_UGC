"use client";

import { useCountInView } from "@/components/ui/useCountInView";

/**
 * DESIGN.md §14 — VolumeCadence. The output-volume story as an animated count-UP,
 * the mirror of CostLadder (rising instead of falling): on inView the big number
 * ticks from what most brands ship (2–4) up to what winning takes (15–20), ~1.2s
 * ease-out, landing with a subtle pop. Same number size / label style / timing
 * as Cost so the bottom row reads as a matched pair.
 *
 * Ranges are shown at the resting endpoints (2–4 → 15–20) with a single
 * representative integer counting between them. Reduced-motion: final "15–20".
 * Tokens only, tabular figures, aria-hidden.
 */
export default function VolumeCadence({ className = "" }: { className?: string }) {
  const { value, landed, ref } = useCountInView(4, 20, 1200);
  const display = landed ? "15–20" : value <= 4 ? "2–4" : value;

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden>
      <style>{`
        .count-pop{animation:count-pop 360ms ease-out}
        @keyframes count-pop{0%{transform:scale(1)}45%{transform:scale(1.04)}100%{transform:scale(1)}}
      `}</style>

      <div className="flex flex-col gap-4">
        <div>
          <span className="mono-note text-text-3">MOST BRANDS SHIP</span>
          <div className="title-2 mt-1 whitespace-nowrap tabular-nums text-text-3">2–4</div>
        </div>

        <div>
          <span className="mono-note text-text-3">YOU NEED · PER MONTH</span>
          <div className="mt-1">
            <span
              className={`stat inline-block origin-left leading-none tabular-nums text-ink ${
                landed ? "count-pop" : ""
              }`}
            >
              {display}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
