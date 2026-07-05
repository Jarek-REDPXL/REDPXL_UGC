import type { ReactNode } from "react";
import Grain from "./Grain";

export type Tint =
  | "white"
  | "white-border"
  | "sand"
  | "sage"
  | "blush"
  | "mist"
  | "cream"
  | "ink";

const TINTED: Tint[] = ["sand", "sage", "blush", "mist", "cream"];

/** three scattered "+" corner ticks (Attio detail carried into v2.0) */
function CanvasTicks({ dark }: { dark: boolean }) {
  const color = dark ? "text-white/20" : "text-text-3/70";
  const spots = [
    "left-5 top-5",
    "right-5 top-5",
    "left-5 bottom-5",
  ];
  return (
    <>
      {spots.map((s) => (
        <svg
          key={s}
          width="8"
          height="8"
          viewBox="0 0 8 8"
          aria-hidden
          className={`pointer-events-none absolute z-0 ${color} ${s}`}
        >
          <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}

/**
 * DESIGN.md §13 — Section Canvas. A full-width rounded card (radius 32, 64px
 * padding, 16px viewport margin, 16px stacked gaps) holding the section's
 * annotation row (index in a pill), a two-tone title, optional sub, and content.
 * Tinted canvases get 3% grain + a deep companion tone for the title phrase.
 */
export default function Canvas({
  id,
  idx,
  name,
  note,
  title,
  titleDeep,
  sub,
  tint = "white-border",
  children,
  contentClassName = "",
  float,
  titleClassName = "",
}: {
  id?: string;
  idx: string;
  name: string;
  note?: string;
  title: string;
  /** phrase rendered in the canvas's deep companion tone (Clay two-tone) */
  titleDeep?: string;
  sub?: string;
  tint?: Tint;
  children: ReactNode;
  contentClassName?: string;
  /** optional small floating primitive, absolutely positioned by the caller */
  float?: ReactNode;
  titleClassName?: string;
}) {
  const labelId = id ? `${id}-title` : `sec-${idx}-title`;
  const dark = tint === "ink";
  const tinted = TINTED.includes(tint);

  const nameColor = dark ? "text-white/50" : "text-text-3";
  const noteColor = dark ? "text-white/40" : "";
  const ruleColor = dark ? "bg-white/15" : "bg-line";
  const titleColor = dark ? "text-white" : "";
  const subColor = dark ? "text-white/65" : "";

  return (
    <section id={id} aria-labelledby={labelId} className="canvas-wrap">
      <div className={`canvas canvas--${tint}`}>
        {tinted && <Grain />}
        <CanvasTicks dark={dark} />
        {float}

        <div className="relative z-10">
          {/* annotation row: [NN] pill — name — rule — note */}
          <div className="flex items-baseline gap-4">
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="anno-pill mono-idx">[{idx}]</span>
              <span className={`mono-note ${nameColor}`}>{name}</span>
            </span>
            <span className={`h-px flex-1 self-center ${ruleColor}`} aria-hidden />
            {note && (
              <span className={`mono-note whitespace-nowrap ${noteColor}`}>
                / {note}
              </span>
            )}
          </div>

          {/* two-tone title */}
          <h2
            id={labelId}
            className={`display-2 mt-5 ${titleColor} ${titleClassName}`}
          >
            {title}
            {titleDeep && <span className="title-deep">{titleDeep}</span>}
          </h2>

          {sub && <p className={`body-lg mt-3 ${subColor}`}>{sub}</p>}

          <div className={`mt-12 ${contentClassName}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}
