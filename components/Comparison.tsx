import { Check, X, Minus } from "lucide-react";
import Canvas from "@/components/ui/Canvas";
import Reveal from "@/components/Reveal";

/**
 * DESIGN.md §9 [08] THE DIFFERENCE — three comparison cards (§8.7 rework).
 * Traditional and DIY are quiet grey cards; REDPXL is the hero card (accent
 * border, BEST CHOICE badge, subtle elevation, all-green checks). Each card
 * lists the six attributes as icon + label + value with hairline dividers, and
 * a big win-tally scorecard at the bottom (0/6 · 0/6 · 6/6). On mobile the cards
 * stack with the REDPXL card first so the winner leads.
 */

type Verdict = "pos" | "neg" | "neutral";
type Row = { label: string; value: string; verdict: Verdict };
type Card = { name: string; subtitle: string; hero?: boolean; rows: Row[] };

const CARDS: Card[] = [
  {
    name: "Traditional UGC",
    subtitle: "CREATOR-LED",
    rows: [
      { label: "Cost per video", value: "£150–£400", verdict: "neg" },
      { label: "Turnaround", value: "2–4 weeks", verdict: "neg" },
      { label: "Consistency", value: "Varies per creator", verdict: "neutral" },
      { label: "Usage rights", value: "Licensed, expiring", verdict: "neg" },
      { label: "Hook strategy", value: "Creator's instinct", verdict: "neutral" },
      { label: "Revisions", value: "Renegotiated", verdict: "neg" },
    ],
  },
  {
    name: "DIY AI tools",
    subtitle: "PROMPT-LED",
    rows: [
      { label: "Cost per video", value: "Your time", verdict: "neutral" },
      { label: "Turnaround", value: "Days of trial and error", verdict: "neutral" },
      { label: "Consistency", value: "Varies per prompt", verdict: "neg" },
      { label: "Usage rights", value: "Unclear", verdict: "neutral" },
      { label: "Hook strategy", value: "None", verdict: "neg" },
      { label: "Revisions", value: "Start over", verdict: "neg" },
    ],
  },
  {
    name: "REDPXL UGC",
    subtitle: "THE REDPXL WAY",
    hero: true,
    rows: [
      { label: "Cost per video", value: "From £100/ad on plans", verdict: "pos" },
      { label: "Turnaround", value: "72 hours", verdict: "pos" },
      { label: "Consistency", value: "Same pipeline, every batch", verdict: "pos" },
      { label: "Usage rights", value: "Full, forever", verdict: "pos" },
      { label: "Hook strategy", value: "50+ tested frameworks", verdict: "pos" },
      { label: "Revisions", value: "Included", verdict: "pos" },
    ],
  },
];

// §2.3 semantic verdict colours (comparison only)
function VerdictIcon({ verdict }: { verdict: Verdict }) {
  if (verdict === "pos")
    return <Check className="h-4 w-4 shrink-0 text-pos" strokeWidth={2.5} />;
  if (verdict === "neg")
    return <X className="h-4 w-4 shrink-0 text-neg" strokeWidth={2.5} />;
  return <Minus className="h-4 w-4 shrink-0 text-neutral" strokeWidth={2.5} />;
}

export default function Comparison() {
  return (
    <Canvas
      id="comparison"
      idx="08"
      name="THE DIFFERENCE"
      note="OLD WAY VS REDPXL"
      tint="white-border"
      title="The old way vs the REDPXL way."
      sub="Three approaches. One is built to scale."
    >
      {/* TODO:REAL-DATA figures */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card) => {
          const wins = card.rows.filter((r) => r.verdict === "pos").length;
          return (
            <Reveal
              key={card.name}
              className={`flex flex-col rounded-card border p-6 ${
                card.hero
                  ? "order-first border-accent bg-bg shadow-[var(--shadow-frame)] md:order-none"
                  : "border-line bg-bg-subtle"
              }`}
            >
              {/* header — subtitle + (hero) badge, then name */}
              <div className="flex items-start justify-between gap-2">
                <p className="mono-note text-text-3">{card.subtitle}</p>
                {card.hero && (
                  <span className="shrink-0 rounded-full bg-pos/10 px-2 py-0.5 mono-note text-pos">
                    Best choice
                  </span>
                )}
              </div>
              <h3 className={`title-1 mt-1 ${card.hero ? "text-accent-dark" : "text-ink"}`}>
                {card.name}
              </h3>

              {/* attribute rows */}
              <ul className="mt-5 flex flex-col">
                {card.rows.map((r, i) => (
                  <li
                    key={r.label}
                    className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <span className="mt-[3px]">
                      <VerdictIcon verdict={r.verdict} />
                    </span>
                    <div className="min-w-0">
                      <div className="mono-note text-text-3">{r.label}</div>
                      <div className={`body-copy text-ink ${card.hero ? "font-medium" : ""}`}>
                        {r.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* scorecard footer — big win tally */}
              <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-4">
                <span
                  className={`stat leading-none tabular-nums ${
                    card.hero ? "text-pos" : "text-text-3"
                  }`}
                >
                  {wins}/6
                </span>
                <span className="mono-note text-text-3">Clear wins</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Canvas>
  );
}
