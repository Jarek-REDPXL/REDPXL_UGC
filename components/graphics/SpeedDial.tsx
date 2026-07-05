/**
 * DESIGN.md §14 — SpeedDial. The delivery-speed story for the Why canvas.
 *
 * Element 1: the "72 HOURS" stat on the left, a clock-face dial on the right —
 * a thin 1.5px ring with faint dashed inner ticks, a hand that sweeps from 12
 * o'clock to the top-right (accent tip dot) as the card scrolls in, then rests;
 * a small ink hub. Below it, the "DELIVERY WINDOW / COMPRESSED" caption.
 * Element 2: a faint TRADITIONAL / 2-WEEKS rail from BRIEF to BATCH, with our
 * 72H segment filling only the first ~15% — a tiny fast slice vs the long wait.
 *
 * Pure-CSS server component. The sweep is a scroll-driven `animation-timeline:
 * view()` (with an `@supports` fallback); the un-animated base state rests the
 * hand at its final angle, so no-support + reduced-motion get the correct still.
 * SVG strokes use non-scaling-stroke so the ring + hand stay crisp 1.5px.
 */
export default function SpeedDial({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .sd-hand{transform:rotate(52deg);transform-box:view-box;transform-origin:40px 40px}
        @media (prefers-reduced-motion: no-preference){
          @supports (animation-timeline: view()){
            .sd-hand{animation:sd-sweep linear both;animation-timeline:view();animation-range:entry 18% cover 42%}
          }
        }
        @keyframes sd-sweep{from{transform:rotate(0deg)}to{transform:rotate(52deg)}}
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

      {/* Element 2 — traditional 2-week rail, ours a tiny fast slice */}
      <div className="mt-6">
        <div className="flex items-center justify-between mono-note text-text-3">
          <span>BRIEF</span>
          <span>BATCH</span>
        </div>
        <div className="relative mt-2 h-1.5 w-full rounded-full bg-bg-inset">
          <div className="absolute inset-y-0 left-0 w-[15%] rounded-full bg-accent" />
          <span className="absolute left-[15%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent" />
        </div>
        <div className="relative mt-1.5 h-4">
          <span className="mono-note absolute left-[15%] -translate-x-1/2 text-accent-dark">72H</span>
          <span className="mono-note absolute right-0 top-0.5 text-[8.5px]! text-text-3">
            TRADITIONAL · 2 WEEKS
          </span>
        </div>
      </div>
    </div>
  );
}
