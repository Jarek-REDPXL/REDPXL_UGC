import { ArrowRight } from "lucide-react";

/**
 * DESIGN.md §9 [01] / §14 — VolumeGap. Two bars contrasting how many ads most
 * brands ship a month vs how many winning on paid social takes, over a
 * bg-inset track. Pure-CSS server component: bars grow from scaleX(0) as the
 * card scrolls into view (staggered), with a static-full fallback for
 * reduced-motion and browsers without scroll-timeline. Tabular figures.
 */
export default function VolumeGap({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex h-full flex-col rounded-frame border border-line bg-bg p-6 ${className}`}
    >
      <style>{`
        .vg-fill{transform-origin:left;transform:scaleX(1)}
        @media (prefers-reduced-motion: no-preference){
          @supports (animation-timeline: view()){
            .vg-fill{transform:scaleX(0);animation:vg-grow linear both;animation-timeline:view()}
            .vg-a{animation-range:entry 10% cover 36%}
            .vg-b{animation-range:entry 16% cover 46%}
          }
        }
        @keyframes vg-grow{to{transform:scaleX(1)}}
      `}</style>

      <div>
        <span className="mono-note text-text-3">OUTPUT / MONTH</span>
        <h3 className="title-1 mt-2">The volume gap</h3>
        <p className="body-copy mt-2 max-w-[34ch]">
          Most brands replace creative too slowly to keep paid media efficient.
        </p>
      </div>

      {/* bars, lower in the card */}
      <div className="mt-auto flex flex-col gap-5 pt-8">
        {/* shipped */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="mono-note text-text-3">SHIPPED</span>
            <span className="label tabular-nums">
              2 to 4 <span className="mono-note text-text-3">/MO</span>
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-bg-inset">
            <div className="vg-fill vg-a h-full rounded-full bg-text-3" style={{ width: "22%" }} />
          </div>
        </div>

        {/* needed */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <span className="mono-note text-text-3">NEEDED</span>
            <span className="label tabular-nums">
              15 to 20 <span className="mono-note text-text-3">/MO</span>
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-bg-inset">
            <div className="vg-fill vg-b h-full rounded-full bg-deep-sand" style={{ width: "85%" }} />
          </div>
        </div>
      </div>

      {/* the gap */}
      <div className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 mono-note text-text-2">
          <ArrowRight className="h-3 w-3 text-accent-dark" />
          GAP: 13+ ads every month
        </span>
      </div>
    </div>
  );
}
