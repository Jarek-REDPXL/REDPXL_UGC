"use client";

import { ArrowDown } from "lucide-react";
import { useCountInView } from "@/components/ui/useCountInView";

/**
 * DESIGN.md §14 — CostLadder. The "much cheaper" story as an animated count-DOWN:
 * on inView the big price ticks from £500 down to £100 (~1.2s ease-out), landing
 * hard on £100. The faded creator range (£150–500) strikes through and the green
 * "↓ UP TO 80% LESS" chip pops in once it lands. Sibling of VolumeCadence
 * (same number size, labels, timing) but counting the opposite direction.
 * Reduced-motion: final state (£100 + struck £150–500 + chip). Tokens only.
 */
export default function CostLadder({ className = "" }: { className?: string }) {
  const { value, landed, ref } = useCountInView(500, 100, 1200);

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden>
      <style>{`
        .count-pop{animation:count-pop 360ms ease-out}
        @keyframes count-pop{0%{transform:scale(1)}45%{transform:scale(1.04)}100%{transform:scale(1)}}
      `}</style>

      <div className="flex flex-col gap-4">
        <div>
          <span className="mono-note text-text-3">CREATOR</span>
          <div
            className={`title-2 mt-1 whitespace-nowrap tabular-nums text-text-3 ${
              landed ? "line-through" : ""
            }`}
          >
            £150–500
          </div>
        </div>

        <div>
          <span className="mono-note text-text-3">REDPXL · FROM</span>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className={`stat inline-block origin-left leading-none tabular-nums text-ink ${
                landed ? "count-pop" : ""
              }`}
            >
              £{value}
            </span>
            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full border border-pos/25 bg-pos/10 px-2.5 py-1 mono-note text-pos transition-all duration-300 ease-[var(--ease-out)] ${
                landed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              <ArrowDown className="h-3 w-3" /> UP TO 80% LESS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
