import type { ReactNode } from "react";
import Reveal from "../Reveal";

/**
 * DESIGN.md §6.1 — production-index annotation row.
 * Left: [NN] NAME (index in accent). Right: a factual note. Whitespace only,
 * no border. Used standalone by bespoke sections (Hero, Final CTA).
 */
export function Annotation({
  idx,
  name,
  note,
  labelId,
  tone = "light",
}: {
  idx: string;
  name: string;
  note?: string;
  labelId?: string;
  tone?: "light" | "dark";
}) {
  const nameColor = tone === "dark" ? "text-white/50" : "text-text-3";
  const ruleColor = tone === "dark" ? "bg-white/15" : "bg-line";
  return (
    <div
      className="flex items-baseline gap-4"
      id={labelId ? `${labelId}-idx` : undefined}
    >
      <span className="flex items-baseline gap-3 whitespace-nowrap">
        <span className="mono-idx">[{idx}]</span>
        <span className={`mono-note ${nameColor}`}>{name}</span>
      </span>
      {/* §5 — 1px rule filling the gap between label and note */}
      <span className={`h-px flex-1 self-center ${ruleColor}`} aria-hidden />
      {note && (
        <span className="mono-note whitespace-nowrap">/ {note}</span>
      )}
    </div>
  );
}

/**
 * §8.5 — standard section shell: container, annotation row, title, optional
 * sub, then content (48px gap). Semantic landmark with aria-labelledby.
 */
export default function Section({
  id,
  idx,
  name,
  note,
  title,
  sub,
  band = false,
  dividerTop = false,
  children,
  contentClassName = "",
  fullBleed,
}: {
  id?: string;
  idx: string;
  name: string;
  note?: string;
  title: string;
  sub?: string;
  band?: boolean;
  dividerTop?: boolean;
  children: ReactNode;
  contentClassName?: string;
  /** optional element rendered full-bleed (outside the container) after content */
  fullBleed?: ReactNode;
}) {
  const labelId = id ? `${id}-title` : `sec-${idx}-title`;
  return (
    <section
      id={id}
      aria-labelledby={labelId}
      className={`${band ? "bg-bg-subtle" : ""} ${
        dividerTop ? "divider-top" : ""
      }`}
    >
      <div className="section-y">
        <div className="container-x">
          <Reveal>
            <Annotation idx={idx} name={name} note={note} labelId={labelId} />
          </Reveal>

          <Reveal>
            <h2 id={labelId} className="display-2 mt-5">
              {title}
            </h2>
          </Reveal>

          {sub && (
            <Reveal>
              <p className="body-lg mt-3">{sub}</p>
            </Reveal>
          )}

          <div className={`mt-12 ${contentClassName}`}>{children}</div>
        </div>
        {fullBleed}
      </div>
    </section>
  );
}
