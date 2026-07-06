/**
 * MathsBars — horizontal cost comparison for the Maths canvas (sage).
 *
 * Two full-width tracks. The short bar (Redpxl plan, --pos green — the cheaper,
 * positive option) sits on top and fills ~30%; the long bar (creator video,
 * --text-3 grey) below fills its track completely, so the fraction reads
 * visually. Values use .label + tabular figures.
 *
 * Pure-CSS server component — no JS, no hydration. Each bar grows from
 * scaleX(0) → scaleX(1) (transform-origin left, compositor-friendly) as the
 * graphic scrolls into view, via a CSS scroll-driven animation. The base state
 * is scaleX(1) (full), so reduced-motion users and any browser without
 * scroll-timeline support get the correct static full bars — no flash of empty.
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
};

const ROWS: Row[] = [
  {
    label: "Redpxl plan",
    value: "£100 to £133/AD",
    pct: 30,
    barClass: "bg-pos",
    valueClass: "text-pos",
  },
  {
    label: "Creator video",
    value: "£150 to £500",
    pct: 100,
    barClass: "bg-text-3",
    valueClass: "text-ink",
  },
];

export default function MathsBars({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <style>{`
        /* base = static full (reduced-motion + no scroll-timeline support) */
        .mb-fill{transform-origin:left;transform:scaleX(1)}
        @media (prefers-reduced-motion: no-preference){
          @supports (animation-timeline: view()){
            .mb-fill{
              transform:scaleX(0);
              animation:mb-grow linear both;
              animation-timeline:view();
              animation-range:entry 15% cover 45%;
            }
          }
        }
        @keyframes mb-grow{to{transform:scaleX(1)}}
      `}</style>

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
              <div
                className={`mb-fill h-full rounded-[4px] ${r.barClass}`}
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mono-note text-text-3 mt-6">
        Based on starter to scale plans · excl. VAT
      </p>
    </div>
  );
}
