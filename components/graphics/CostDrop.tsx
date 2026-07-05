import { ArrowDown } from "lucide-react";

/**
 * DESIGN.md §14 — CostDrop. The Why/Cost card graphic: two bars, a tall grey
 * "CREATOR" (£150-500) and a short accent "REDPXL" (from £100), plus a red
 * down-arrow "UP TO 80% LESS" chip — the price coming down. The accent bar grows
 * up from 0 as the card scrolls into view (static-full fallback for reduced
 * motion / no scroll-timeline). Tabular figures, mono labels. aria-hidden.
 */
export default function CostDrop({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .cd-bar{transform-origin:bottom;transform:scaleY(1)}
        @media (prefers-reduced-motion: no-preference){
          @supports (animation-timeline: view()){
            .cd-bar{transform:scaleY(0);animation:cd-grow linear both;animation-timeline:view();animation-range:entry 12% cover 42%}
          }
        }
        @keyframes cd-grow{to{transform:scaleY(1)}}
      `}</style>

      <div className="flex items-end gap-3">
        {/* creator — tall grey */}
        <div className="flex flex-1 flex-col items-center">
          <span className="label tabular-nums text-[13px]! text-text-2">£150-500</span>
          <div className="mt-1.5 flex h-[76px] w-full items-end overflow-hidden rounded-t-[4px] bg-bg-inset">
            <div className="h-full w-full rounded-t-[4px] bg-text-3" />
          </div>
          <span className="mono-note mt-2 text-text-3">CREATOR</span>
        </div>
        {/* redpxl — short accent, grows on view */}
        <div className="flex flex-1 flex-col items-center">
          <span className="label tabular-nums text-[13px]! text-accent-dark">£100</span>
          <div className="mt-1.5 flex h-[76px] w-full items-end overflow-hidden rounded-t-[4px] bg-bg-inset">
            <div className="cd-bar h-[26%] w-full rounded-t-[4px] bg-accent" />
          </div>
          <span className="mono-note mt-2 text-text-3">REDPXL</span>
        </div>
      </div>

      <div className="mt-3">
        <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 mono-note text-accent-dark">
          <ArrowDown className="h-3 w-3" /> UP TO 80% LESS
        </span>
      </div>
    </div>
  );
}
