/**
 * DESIGN.md §14 — SpeedDial. The delivery-speed story for the Why canvas.
 *
 * Element 1: the "72 HOURS" stat on the left, a clock-face dial on the right —
 * a thin 1.5px ring with faint dashed inner ticks, a hand that sweeps to the
 * top-right, a small ink hub, and a "DELIVERY WINDOW / COMPRESSED" caption.
 * Element 2: a dead-simple two-bar comparison — YOU · 72H is a short --accent
 * bar; OTHERS · 2 WEEKS is a long faded grey bar. "Way faster" at a glance.
 *
 * Pure-CSS server component. The hand sweeps and the bars grow in on gentle
 * infinite loops so they stay alive while on screen; the un-animated base state
 * rests the hand at its final angle and the bars at full width, so reduced-
 * motion gets the correct still. SVG strokes use non-scaling-stroke.
 */
export default function SpeedDial({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .sd-hand{transform:rotate(52deg);transform-box:view-box;transform-origin:40px 40px}
        .sd-bar{transform:scaleX(1);transform-origin:left center}
        @media (prefers-reduced-motion: no-preference){
          .sd-hand{animation:sd-sweep 3.6s ease-in-out infinite}
          .sd-bar{animation:sd-grow 4.2s ease-in-out infinite}
        }
        @keyframes sd-sweep{0%,8%{transform:rotate(0deg)}42%,74%{transform:rotate(52deg)}100%{transform:rotate(0deg)}}
        @keyframes sd-grow{0%,6%{transform:scaleX(0)}30%,82%{transform:scaleX(1)}100%{transform:scaleX(0)}}
      `}</style>

      {/* Element 1 — stat + dial */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="stat leading-none text-ink tabular-nums">72</span>
          <span className="mono-note text-text-3">HOURS</span>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <svg viewBox="0 0 80 80" className="h-[74px] w-[74px]">
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <circle cx="40" cy="40" r="24" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeDasharray="1.5 11.07" opacity="0.4" vectorEffect="non-scaling-stroke" />
            <g className="sd-hand">
              <line x1="40" y1="40" x2="40" y2="17" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <circle cx="40" cy="17" r="2.5" fill="var(--accent)" />
            </g>
            <circle cx="40" cy="40" r="2" fill="var(--ink)" />
          </svg>
          <span className="mono-note mt-2 text-center text-[8.5px]! leading-[1.3] text-text-3">
            DELIVERY WINDOW
            <br />
            COMPRESSED
          </span>
        </div>
      </div>

      {/* Element 2 — two bars: us (short red) vs others (long grey) */}
      <div className="mt-6 flex flex-col gap-3.5">
        <div>
          <div className="mono-note text-ink">
            YOU · <span className="tabular-nums">72H</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bg-inset">
            <div className="sd-bar h-full w-[20%] rounded-full bg-accent" />
          </div>
        </div>
        <div>
          <div className="mono-note text-text-3">
            OTHERS · <span className="tabular-nums">2 WEEKS</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bg-inset">
            <div className="sd-bar h-full w-full rounded-full bg-dot-grey" />
          </div>
        </div>
      </div>
    </div>
  );
}
