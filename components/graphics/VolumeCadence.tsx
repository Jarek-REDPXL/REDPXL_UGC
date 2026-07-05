/**
 * DESIGN.md §14 — VolumeCadence ("Calendar Drop", Option C). The output-cadence
 * story for the Why canvas: a typical brand posts a sparse 2-4 ads a month, we
 * post a steady 15-20.
 *
 * A 7×4 calendar of quiet grey day-dots. A few sparse "typical" days carry a
 * darker inner fill; many "redpxl" days get a small --accent dot dropping onto
 * them on a gentle staggered loop, so drops feel continuous but calm. A hairline
 * legend reads SPARSE 2-4 / STEADY 15-20.
 *
 * Pure-CSS server component. The drop is the single quiet motion cue, gated by
 * `prefers-reduced-motion`; the un-animated base state rests every accent dot in
 * place (visible, no drop), so reduced-motion still shows the sparse-vs-steady
 * contrast. aria-hidden. Tokens only.
 */
const DAYS = 28;
const TYPICAL = new Set([9, 16, 23]); // sparse 2-4 typical ads (darker dots)
// steady 15-20 REDPXL days that receive an accent drop
const REDPXL = new Set([0, 1, 3, 4, 6, 7, 8, 11, 13, 14, 17, 18, 20, 21, 25, 26, 27]);

export default function VolumeCadence({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        /* base = reduced/static rest state: accent dot resting in place */
        .vc-drop{opacity:1;transform:none}
        @media (prefers-reduced-motion: no-preference){
          .vc-drop{animation:vc-drop 3.8s ease-in-out infinite}
        }
        @keyframes vc-drop{
          0%{opacity:0;transform:translateY(-9px)}
          14%{opacity:1;transform:translateY(0)}
          72%{opacity:1;transform:translateY(0)}
          88%,100%{opacity:0;transform:translateY(-9px)}
        }
      `}</style>

      {/* header row */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 mono-note text-text-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> FRESH DROPS / MONTH
        </span>
        <span className="mono-note text-[9px]! text-text-3">TYPICAL → REDPXL</span>
      </div>

      {/* calendar grid */}
      <div className="mt-4 grid grid-cols-7 gap-2">
        {Array.from({ length: DAYS }).map((_, i) => {
          const typical = TYPICAL.has(i);
          const redpxl = REDPXL.has(i);
          return (
            <div key={i} className="relative flex aspect-square items-center justify-center">
              <span
                className={`h-[9px] w-[9px] rounded-full ${typical ? "bg-text-3" : "bg-dot-grey"}`}
              />
              {redpxl && (
                <span
                  className="vc-drop absolute h-[5px] w-[5px] rounded-full bg-accent"
                  style={{ animationDelay: `-${((i * 1.3) % 3.8).toFixed(2)}s` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="mono-note text-[9px]! text-text-3">
          SPARSE: <span className="tabular-nums text-ink">2–4</span>
        </span>
        <span className="mono-note text-[9px]! text-text-3">
          STEADY: <span className="tabular-nums text-ink">15–20</span>
        </span>
      </div>
    </div>
  );
}
