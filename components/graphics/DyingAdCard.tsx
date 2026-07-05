import { Clock, ArrowDown, ArrowUp } from "lucide-react";

/**
 * DESIGN.md §9 [01] / §14 — DyingAdCard. An illustrative "ad going stale" panel:
 * a mock creative header whose status flips ACTIVE → FATIGUED on an 8s loop, three
 * declining performance metrics, and a 14-day CTR-decay chart that draws in when
 * the section scrolls into view. Pure-CSS server component (no hydration); the
 * status crossfade and the line draw are gated by prefers-reduced-motion, which
 * holds the FATIGUED, fully-drawn end state. aria-hidden — the section copy
 * carries the message; the numbers here are illustrative. (TODO:REAL-DATA)
 */

const METRICS = [
  { label: "CTR", value: "2.32%", delta: "45%", dir: "down" as const },
  { label: "FREQUENCY", value: "2.8", delta: "112%", dir: "up" as const },
  { label: "CPA", value: "£38", delta: "40%", dir: "up" as const },
];

// 14-day CTR decay (fast drop, then flattening); x 10→290, y 24 (high) → 91 (low)
const PTS: [number, number][] = [
  [10, 24], [31, 27], [53, 33], [74, 41], [96, 50], [117, 58], [139, 65],
  [160, 71], [182, 76], [204, 80], [225, 84], [247, 87], [268, 89], [290, 91],
];
const LINE = "M" + PTS.map(([x, y]) => `${x} ${y}`).join(" L");
const AREA = LINE + " L290 110 L10 110 Z";

export default function DyingAdCard({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex h-full flex-col rounded-frame border border-line bg-bg p-6 ${className}`}
    >
      <style>{`
        .dac-active,.dac-fat{transition:none}
        .dac-active{opacity:0}
        .dac-fat{opacity:1}
        .dac-line{stroke-dasharray:640;stroke-dashoffset:0}
        @media (prefers-reduced-motion: no-preference){
          .dac-active{animation:dac-active 8s ease-in-out infinite}
          .dac-fat{animation:dac-fat 8s ease-in-out infinite}
          .dac-line{animation:dac-draw 1.2s var(--ease-out) both}
        }
        @keyframes dac-active{0%,42%{opacity:1}50%,92%{opacity:0}100%{opacity:1}}
        @keyframes dac-fat{0%,42%{opacity:0}50%,92%{opacity:1}100%{opacity:0}}
        @keyframes dac-draw{from{stroke-dashoffset:640}to{stroke-dashoffset:0}}
      `}</style>

      {/* header: creative id + status */}
      <div className="flex items-center justify-between gap-3">
        <span className="mono-note text-text-2">REDPXL UGC · VIDEO 01 · ID 2387</span>
        <span className="relative inline-flex items-center">
          <span className="dac-fat rounded-chip bg-accent-soft px-2 py-0.5 mono-note text-accent-dark">
            FATIGUED
          </span>
          <span className="dac-active absolute right-0 top-0 whitespace-nowrap rounded-chip bg-pos/10 px-2 py-0.5 mono-note text-pos">
            ACTIVE
          </span>
        </span>
      </div>

      {/* three declining metrics */}
      <div className="mt-6 grid grid-cols-3 divide-x divide-line">
        {METRICS.map((m) => (
          <div key={m.label} className="px-4 first:pl-0">
            <div className="mono-note text-text-3">{m.label}</div>
            <div className="title-1 mt-1.5 text-[28px] leading-none tabular-nums">
              {m.value}
            </div>
            <div className="mono-note mt-1.5 inline-flex items-center gap-1 text-accent-dark">
              {m.dir === "down" ? (
                <ArrowDown className="h-3 w-3" />
              ) : (
                <ArrowUp className="h-3 w-3" />
              )}
              {m.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 h-px w-full bg-line" />

      {/* chart */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="mono-note text-text-3">PERFORMANCE / 14 DAYS</span>
          <span className="mono-note text-accent-dark">CTR DECAY</span>
        </div>
        <svg viewBox="0 0 300 110" className="mt-3 h-auto w-full" role="presentation">
          {/* faint gridlines */}
          <g stroke="var(--line)" strokeWidth="1">
            <line x1="0" y1="34" x2="300" y2="34" />
            <line x1="0" y1="58" x2="300" y2="58" />
            <line x1="0" y1="82" x2="300" y2="82" />
          </g>
          {/* area fill */}
          <path d={AREA} fill="var(--bg-inset)" />
          {/* decay line (draws in on view) */}
          <path
            className="dac-line"
            d={LINE}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* data points; final one is the red endpoint */}
          {PTS.map(([x, y], i) =>
            i === PTS.length - 1 ? (
              <circle key={i} cx={x} cy={y} r="3.5" fill="var(--accent)" stroke="#fff" strokeWidth="1.5" />
            ) : (
              <circle key={i} cx={x} cy={y} r="1.5" fill="var(--ink)" opacity="0.35" />
            )
          )}
        </svg>
      </div>

      {/* footer caption */}
      <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
        <Clock className="h-3.5 w-3.5 shrink-0 text-text-3" />
        <span className="mono-note text-text-3">
          A top creative on Meta/TikTok fatigues in 7 to 14 days.
        </span>
      </div>
    </div>
  );
}
