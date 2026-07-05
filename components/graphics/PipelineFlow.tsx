"use client";

import { useReducedMotion } from "motion/react";

/**
 * DESIGN.md §13 / §14 — PipelineFlow graphic (Process canvas, mist).
 *
 * A flat horizontal "marble-run": a single gentle S-curve (deep-mist, 1.5px)
 * threads three evenly-spaced nodes — BRIEF -> PRODUCE -> TEST — each a white
 * circle holding a lucide-style icon (document / sparkles / target), with a
 * mono-note label beneath. A 6px accent dot rides the path on an 8s loop.
 *
 * Fixed 720x140 viewBox + preserveAspectRatio => zero layout shift; the SVG
 * fills its container width and scales down cleanly above the three cards.
 * Under prefers-reduced-motion the dot parks at the first node, no motion.
 */

const CY = 54;
const NODES = [
  { x: 120, label: "BRIEF", kind: 0 as const },
  { x: 360, label: "PRODUCE", kind: 1 as const },
  { x: 600, label: "TEST", kind: 2 as const },
];

/** Single continuous S-path: node1 -> (dip) -> node2 -> (rise) -> node3. */
const PATH = "M120 54 C195 72 285 72 360 54 C435 36 525 36 600 54";

function NodeIcon({ kind, cx, cy }: { kind: 0 | 1 | 2; cx: number; cy: number }) {
  return (
    <g
      transform={`translate(${cx} ${cy}) scale(0.8) translate(-12 -12)`}
      stroke="var(--ink)"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {kind === 0 && (
        <>
          {/* document (brief) */}
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h8" />
          <path d="M8 9h2" />
        </>
      )}

      {kind === 1 && (
        <>
          {/* sparkles (produce) */}
          <path d="M12 4 L13.4 9.2 A2 2 0 0 0 14.8 10.6 L20 12 L14.8 13.4 A2 2 0 0 0 13.4 14.8 L12 20 L10.6 14.8 A2 2 0 0 0 9.2 13.4 L4 12 L9.2 10.6 A2 2 0 0 0 10.6 9.2 Z" />
          <circle cx="18.4" cy="5.6" r="0.9" fill="var(--ink)" stroke="none" />
          <circle cx="5.8" cy="17.8" r="0.7" fill="var(--ink)" stroke="none" />
        </>
      )}

      {kind === 2 && (
        <>
          {/* target (test) */}
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" fill="var(--ink)" stroke="none" />
        </>
      )}
    </g>
  );
}

export default function PipelineFlow({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 720 140"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
        fill="none"
      >
        {/* connecting S-path (marble-run track) */}
        <path
          d={PATH}
          stroke="var(--deep-mist)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* nodes — white circles with hairline border + icon, drawn over the path */}
        {NODES.map((n) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={CY}
              r={22}
              fill="var(--bg)"
              stroke="var(--line)"
              strokeWidth={1}
            />
            <NodeIcon kind={n.kind} cx={n.x} cy={CY} />
          </g>
        ))}

        {/* travelling accent dot (halo + core) */}
        {reduced ? (
          <g>
            <circle cx={120} cy={CY} r={6} fill="var(--accent)" opacity={0.16} />
            <circle cx={120} cy={CY} r={3} fill="var(--accent)" />
          </g>
        ) : (
          <g>
            <circle r={6} fill="var(--accent)" opacity={0.16} />
            <circle r={3} fill="var(--accent)" />
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              calcMode="linear"
              path={PATH}
            />
          </g>
        )}
      </svg>

      {/* mono-note labels — crisp overlaid HTML, positioned under each node */}
      {NODES.map((n) => (
        <span
          key={n.label}
          className="mono-note absolute -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${(n.x / 720) * 100}%`, top: "60%" }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}
