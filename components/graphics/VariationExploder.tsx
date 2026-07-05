"use client";

import { useReducedMotion } from "motion/react";

/**
 * DESIGN.md §14 — VariationExploder. The "unlimited variations" story for the
 * Why canvas: one master creative branching into many.
 *
 * A single "MASTER" phone on the left fans six thin deep-sand connectors out to
 * six tiny variant cards, each carrying a different mock hook chip. The variant
 * cards float gently (translate on the y-axis only) on a staggered ~4s loop via
 * SMIL, so labels stay locked to their card. prefers-reduced-motion renders the
 * static, evenly-placed end-state.
 *
 * Fixed 300×260 viewBox + preserveAspectRatio → zero layout shift; the SVG
 * fills its container (w-full h-auto). aria-hidden. Labels ride inside each
 * animated group via foreignObject so they use the real .mono-note face and
 * float in sync with their card.
 */

const START_X = 62;
const START_Y = 134;

const CARDS: { label: string; cy: number }[] = [
  { label: "POV", cy: 34 },
  { label: "STOP", cy: 74 },
  { label: "3 WAYS", cy: 114 },
  { label: "WHY", cy: 154 },
  { label: "TRY", cy: 194 },
  { label: "NEW", cy: 234 },
];

// organic desync — vary duration + phase so no two cards breathe in lockstep.
// negative begins start each loop mid-flight (no initial pop).
const DUR = ["4s", "4.4s", "3.8s", "4.2s", "3.6s", "4.6s"];
const BEGIN = ["0s", "-0.7s", "-1.4s", "-2.1s", "-2.8s", "-3.5s"];

export default function VariationExploder({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 300 260"
      preserveAspectRatio="xMidYMid meet"
      className={`h-auto w-full ${className}`}
      role="presentation"
    >
      {/* connectors — behind everything, fan from the master's right edge */}
      {CARDS.map(({ cy }) => (
        <path
          key={`link-${cy}`}
          d={`M${START_X} ${START_Y} C 118 ${START_Y}, 126 ${cy}, 200 ${cy}`}
          fill="none"
          stroke="var(--deep-sand)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}

      {/* MASTER phone — the ink-anchored source creative */}
      <g>
        <rect
          x="18"
          y="96"
          width="44"
          height="76"
          rx="8"
          fill="#fff"
          stroke="var(--ink)"
          strokeWidth="1.5"
        />
        <rect
          x="24"
          y="106"
          width="32"
          height="50"
          rx="5"
          fill="var(--bg-inset)"
        />
        {/* brand mark — the one accent touch */}
        <rect x="28.5" y="111" width="3" height="3" rx="0.5" fill="var(--accent)" />
        {/* mock script lines */}
        <line
          x1="28.5"
          y1="145"
          x2="51"
          y2="145"
          stroke="var(--text-3)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="28.5"
          y1="150.5"
          x2="45"
          y2="150.5"
          stroke="var(--text-3)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <foreignObject x="4" y="176" width="72" height="12">
          <div className="flex h-full w-full items-center justify-center">
            <span className="mono-note text-ink text-[8px]! leading-none">
              MASTER
            </span>
          </div>
        </foreignObject>
      </g>

      {/* variant cards — gently floating, each label locked to its card */}
      {CARDS.map(({ label, cy }, i) => (
        <g key={label}>
          {!reduced && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 -4; 0 4; 0 -4"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              dur={DUR[i]}
              begin={BEGIN[i]}
              repeatCount="indefinite"
              additive="sum"
            />
          )}
          <rect
            x="200"
            y={cy - 14}
            width="48"
            height="28"
            rx="6"
            fill="#fff"
            stroke="var(--text-3)"
            strokeWidth="1.5"
          />
          <foreignObject x="200" y={cy - 14} width="48" height="28">
            <div className="flex h-full w-full items-center justify-center">
              <span className="mono-note text-ink text-[8px]! leading-none">
                {label}
              </span>
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}
