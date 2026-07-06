"use client";

import { useLoopCount } from "@/components/ui/useLoopCount";

/**
 * DESIGN.md §14 — VolumeCadence. The output-volume story as a looping count-UP,
 * the mirror of CostLadder (rising, not falling): the big number ticks from what
 * most brands ship (2–4) up to what winning takes (15–20), ~2s ease-out, while a
 * subtle row of small tiles fills in sync beneath it — so you SEE the volume
 * accumulate, not just a number change. Holds ~2s, fades, resets, repeats. Same
 * number size / label style / timing as Cost (siblings, opposite directions).
 * Reduced-motion: static final. Inter, tabular-nums, tokens only, aria-hidden.
 */
const TILES = 20;

export default function VolumeCadence({ className = "" }: { className?: string }) {
  const { value, phase, ref } = useLoopCount(4, 20);
  const rolling = phase === "roll";
  const resetting = phase === "reset";
  const n = Math.round(value);
  const filled = rolling ? Math.max(0, Math.min(TILES, n)) : TILES;
  const display = rolling ? (n <= 4 ? "2–4" : n) : "15–20";

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden>
      <div className="flex flex-col gap-4">
        <div>
          <span className="mono-note text-text-3">MOST BRANDS SHIP</span>
          <div className="title-2 mt-1 whitespace-nowrap tabular-nums text-text-3">2–4</div>
        </div>

        <div
          className={`transition-opacity duration-300 ${resetting ? "opacity-0" : "opacity-100"}`}
        >
          <span className="mono-note text-text-3">YOU NEED · PER MONTH</span>
          <div className="stat mt-1 leading-none tabular-nums text-ink">{display}</div>

          {/* subtle quantity cue — tiles fill in sync with the number */}
          <div className="mt-3 flex flex-wrap gap-[3px]">
            {Array.from({ length: TILES }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-[2px] transition-colors duration-150 ${
                  i < filled ? "bg-accent-soft" : "bg-bg-inset"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
