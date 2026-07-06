import { Check, X, Minus } from "lucide-react";
import Canvas from "@/components/ui/Canvas";
import Reveal from "@/components/Reveal";

/**
 * DESIGN.md §9 [05] THE DIFFERENCE — comparison table (§8.7).
 * lg+: real <table> with hairline row dividers, REDPXL column highlighted.
 * <lg: three stacked cards, REDPXL first with accent border.
 */

type Verdict = "pos" | "neg" | "neutral";
type Cell = { verdict: Verdict; text: string };

const COLUMNS = [
  "Traditional UGC creators",
  "DIY AI tools",
  "REDPXL UGC",
] as const;

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  {
    label: "Cost per video",
    cells: [
      { verdict: "neg", text: "£150 to £400" },
      { verdict: "neutral", text: "Your time" },
      { verdict: "pos", text: "From £100/ad on plans" },
    ],
  },
  {
    label: "Turnaround",
    cells: [
      { verdict: "neg", text: "2 to 4 weeks" },
      { verdict: "neutral", text: "Days of trial and error" },
      { verdict: "pos", text: "72 hours" },
    ],
  },
  {
    label: "Consistency",
    cells: [
      { verdict: "neutral", text: "Varies per creator" },
      { verdict: "neg", text: "Varies per prompt" },
      { verdict: "pos", text: "Engineered pipeline" },
    ],
  },
  {
    label: "Usage rights",
    cells: [
      { verdict: "neg", text: "Licensed, expiring" },
      { verdict: "neutral", text: "Unclear" },
      { verdict: "pos", text: "Full, forever" },
    ],
  },
  {
    label: "Hook strategy",
    cells: [
      { verdict: "neutral", text: "Creator's instinct" },
      { verdict: "neg", text: "None" },
      { verdict: "pos", text: "50+ tested frameworks" },
    ],
  },
  {
    label: "Revisions",
    cells: [
      { verdict: "neg", text: "Renegotiated" },
      { verdict: "neg", text: "Start over" },
      { verdict: "pos", text: "Included" },
    ],
  },
];

// §2.3 semantic verdict colours (comparison table only)
function VerdictIcon({ verdict }: { verdict: Verdict }) {
  if (verdict === "pos")
    return <Check className="h-4 w-4 shrink-0 text-pos" strokeWidth={2.5} />;
  if (verdict === "neg")
    return <X className="h-4 w-4 shrink-0 text-neg" strokeWidth={2.5} />;
  return <Minus className="h-4 w-4 shrink-0 text-neutral" strokeWidth={2.5} />;
}

// §8.7 — mobile stacks REDPXL first, then Traditional, then DIY
const MOBILE_ORDER = [2, 0, 1] as const;

export default function Comparison() {
  return (
    <Canvas
      id="comparison"
      idx="08"
      name="THE DIFFERENCE"
      note="OLD WAY VS REDPXL"
      tint="white-border"
      title="The old way vs the Redpxl way."
    >
      {/* TODO:REAL-DATA figures */}

      {/* Desktop table (lg+) */}
      <Reveal className="hidden lg:block">
        <div className="overflow-hidden rounded-frame border border-line">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="mono-note text-text-3 bg-bg p-5 align-bottom">
                  Compare
                </th>
                {COLUMNS.map((col, i) => {
                  const isRedpxl = i === COLUMNS.length - 1;
                  const cls = isRedpxl
                    ? "title-2 p-5 align-bottom bg-accent-soft border-t-2 border-accent text-accent-dark"
                    : "title-2 p-5 align-bottom bg-bg text-text-2";
                  return (
                    <th key={col} className={cls}>
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-t border-line hover:bg-bg-subtle transition-colors duration-[120ms] ease-[var(--ease-out)]"
                >
                  <td className="label p-5 align-top">{row.label}</td>
                  {row.cells.map((cell, i) => {
                    const isRedpxl = i === row.cells.length - 1;
                    const cls = isRedpxl
                      ? "body-copy p-5 align-top bg-accent-soft text-ink"
                      : "body-copy p-5 align-top";
                    return (
                      <td key={i} className={cls}>
                        <span className="flex items-center gap-2">
                          <VerdictIcon verdict={cell.verdict} />
                          <span>{cell.text}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Mobile stacked cards (<lg) */}
      <div className="mt-10 space-y-4 lg:hidden">
        {MOBILE_ORDER.map((c) => {
          const isRedpxl = c === 2;
          const name = COLUMNS[c];
          return (
            <Reveal
              key={name}
              className={`rounded-card border p-6 bg-bg ${
                isRedpxl ? "border-accent" : "border-line"
              }`}
            >
              <h3 className={`title-2 ${isRedpxl ? "text-accent-dark" : "text-ink"}`}>
                {name}
              </h3>
              <dl className="mt-4">
                {ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between border-t border-line pt-3 first:border-t-0 first:pt-0"
                  >
                    <dt className="mono-note text-text-3">{row.label}</dt>
                    <dd className="flex items-center gap-1.5 text-right body-copy text-ink">
                      <span>{row.cells[c].text}</span>
                      <VerdictIcon verdict={row.cells[c].verdict} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          );
        })}
      </div>
    </Canvas>
  );
}
