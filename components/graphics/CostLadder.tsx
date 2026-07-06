import { ArrowDown } from "lucide-react";

/**
 * DESIGN.md §14 — CostLadder. The "cost coming down" story for the Why canvas.
 *
 * A stepped line descends down-right over four levels (soft --bg-inset fill
 * beneath, faint dashed gridlines behind), a bordered mono price chip on each
 * step: £500 → £350 → £200 → FROM £100 (the final chip in --accent). The line
 * draws in left→right as the card scrolls in. A "UNIT COST / DESCENDING"
 * caption sits bottom-left; a bordered "↓ UP TO 80% LESS" chip bottom-right.
 *
 * Pure-CSS server component. The line draws down on a gentle infinite loop
 * (draw in ~1s, hold, retract, ~4.2s) so it stays alive whenever the card is on
 * screen; the base state is the fully-drawn ladder, so reduced-motion gets the
 * static final.
 * SVG strokes use non-scaling-stroke so the steps stay crisp 1.5px. Tabular
 * figures throughout.
 */
const STEP = [
  { x: 10, y: 4, w: 58, label: "£500", accent: false },
  { x: 64, y: 36, w: 58, label: "£350", accent: false },
  { x: 120, y: 68, w: 58, label: "£200", accent: false },
  { x: 168, y: 100, w: 72, label: "FROM £100", accent: true },
];

export default function CostLadder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .cl-line{stroke-dasharray:1;stroke-dashoffset:0}
        @media (prefers-reduced-motion: no-preference){
          .cl-line{animation:cl-draw 4.2s ease-in-out infinite}
        }
        @keyframes cl-draw{0%,6%{stroke-dashoffset:1}30%,82%{stroke-dashoffset:0}100%{stroke-dashoffset:1}}
      `}</style>

      <svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" className="h-auto w-full">
        {/* faint gridlines behind */}
        {[24, 56, 88, 120].map((y) => (
          <line key={y} x1="6" y1={y} x2="234" y2={y} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" vectorEffect="non-scaling-stroke" />
        ))}
        {/* soft fill under the staircase */}
        <path d="M12 24 H68 V56 H124 V88 H180 V120 H232 V150 H12 Z" fill="var(--bg-inset)" opacity="0.7" />
        {/* staircase line — draws in left→right */}
        <path className="cl-line" pathLength="1" d="M12 24 H68 V56 H124 V88 H180 V120 H232" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {/* price chips at each step */}
        {STEP.map((s) => (
          <foreignObject key={s.label} x={s.x} y={s.y} width={s.w} height="20">
            <div className="flex h-full items-center">
              <span
                className={`rounded border bg-bg px-1.5 py-0.5 mono-note tabular-nums text-[10px]! leading-none ${
                  s.accent ? "border-accent text-accent-dark" : "border-line text-text-2"
                }`}
              >
                {s.label}
              </span>
            </div>
          </foreignObject>
        ))}
      </svg>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="mono-note text-[8.5px]! leading-[1.3] text-text-3">
          UNIT COST
          <br />
          DESCENDING
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 mono-note text-accent-dark">
          <ArrowDown className="h-3 w-3" /> UP TO 80% LESS
        </span>
      </div>
    </div>
  );
}
