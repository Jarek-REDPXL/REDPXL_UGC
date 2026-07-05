"use client";

import { useReducedMotion } from "motion/react";

/**
 * DESIGN.md §14 — FatigueCurve. The ad-fatigue story for the Problem canvas
 * (sand → deep companion tone = deep-sand).
 *
 * A decaying CTR line drops from a high left start toward the right (a top
 * creative fatiguing over ~14 days). An accent dot rides the exact decay path
 * on a 6s loop; a dashed deep-sand "fresh batch" line rises off the fatigued
 * tail, marching upward to suggest a reset.
 *
 * Fixed 340×240 viewBox + preserveAspectRatio → zero layout shift; the SVG
 * fills its container (w-full h-auto). Mono labels are absolutely-positioned
 * HTML over the SVG so they use the real .mono-note face. Under reduced motion
 * the dot rests at the bottom of the curve and the fresh line is static.
 */
export default function FatigueCurve({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  // The single source of truth for the decay curve; the dot rides this exact id.
  const CURVE = "M40 46 C74 50 92 92 138 122 C184 152 244 170 320 176";

  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg
        viewBox="0 0 340 240"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
        role="presentation"
      >
        {/* soft area under the decay — quiet warmth, reads as lost performance */}
        <path
          d="M40 46 C74 50 92 92 138 122 C184 152 244 170 320 176 L320 200 L40 200 Z"
          fill="var(--deep-sand)"
          opacity="0.08"
        />

        {/* axes (subtle ink hairlines) with direction arrows */}
        <g fill="none" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 24V200" />
          <path d="M40 200H322" />
          {/* CTR up-arrow (y-axis rises) */}
          <path d="M36 32 40 24 44 32" />
          {/* time right-arrow (x-axis) */}
          <path d="M316 196 322 200 316 204" />
        </g>

        {/* fresh-batch reset — dashed deep-sand line rising off the tail */}
        <path
          d="M232 166 C258 158 266 116 302 80"
          fill="none"
          stroke="var(--deep-sand)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 5"
        >
          {!reduced && (
            <animate
              attributeName="stroke-dashoffset"
              from="11"
              to="0"
              dur="1.4s"
              repeatCount="indefinite"
            />
          )}
        </path>
        {/* fresh endpoint marker */}
        <circle cx="302" cy="80" r="2.5" fill="var(--deep-sand)" />

        {/* the decaying CTR curve — the prominent line the dot rides */}
        <path
          id="curve"
          d={CURVE}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* travelling CTR dot: rides #curve on a 6s loop; rests at the tail when reduced */}
        <circle
          r="5"
          fill="var(--accent)"
          stroke="#fff"
          strokeWidth="1.5"
          cx={reduced ? 320 : 0}
          cy={reduced ? 176 : 0}
        >
          {!reduced && (
            <animateMotion dur="6s" repeatCount="indefinite" rotate="0">
              <mpath href="#curve" />
            </animateMotion>
          )}
        </circle>
      </svg>

      {/* mono-note labels (real .mono-note face) positioned over the SVG */}
      <span className="mono-note absolute" style={{ left: "12%", top: "3%" }}>
        CTR
      </span>
      <span className="mono-note absolute" style={{ left: "12%", top: "87%" }}>
        Day 1
      </span>
      <span
        className="mono-note absolute text-right"
        style={{ right: "5%", top: "87%" }}
      >
        Day 14
      </span>
      <span
        className="mono-note absolute text-right"
        style={{ right: "4%", top: "18%", color: "var(--deep-sand)" }}
      >
        Fresh batch
      </span>
    </div>
  );
}
