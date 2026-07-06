import { ArrowDown } from "lucide-react";

/**
 * DESIGN.md §14 — CostLadder. The "much cheaper" story for the Why canvas, as
 * two clean prices: a faded, struck-through creator rate (£150–500) above a big
 * bold REDPXL rate (£100), with a green "↓ UP TO 80% LESS" chip. One number is
 * clearly smaller — "much cheaper" reads instantly, no graph.
 *
 * Static server component (no motion needed — the contrast is the message).
 * Tabular figures so the prices align. Tokens only. aria-hidden.
 */
export default function CostLadder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <div className="flex flex-col gap-5">
        <div>
          <span className="mono-note text-text-3">CREATOR</span>
          <div className="title-2 mt-1 whitespace-nowrap text-text-3 line-through tabular-nums">
            £150–500
          </div>
        </div>

        <div>
          <span className="mono-note text-text-3">REDPXL</span>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span className="stat leading-none text-ink tabular-nums">£100</span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-pos/25 bg-pos/10 px-2.5 py-1 mono-note text-pos">
              <ArrowDown className="h-3 w-3" /> UP TO 80% LESS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
