"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * FormatMorph — a single rounded frame that smoothly morphs between the three
 * delivery aspect ratios 9:16 → 1:1 → 4:5 on an infinite loop (Why canvas,
 * "Every format" tile). One React state drives both the frame dimensions and
 * the mono-note label so they stay in sync; a fixed 200×220 outer box means the
 * inner frame can resize with zero layout shift. Reduced motion → static 4:5.
 *
 * Sizes are percentages of the fixed box, each fitted (aspect-preserving) inside
 * a 170×200 bounding area so the varied ratios read clearly and stay centered.
 */
const FRAMES = [
  { label: "9:16", w: "56.25%", h: "90.91%" }, // 112.5×200 in a 200×220 box
  { label: "1:1", w: "85%", h: "77.27%" }, //     170×170
  { label: "4:5", w: "80%", h: "90.91%" }, //     160×200
];

export default function FormatMorph({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % FRAMES.length);
    }, 2200); // ~1.2s morph + ~1s hold
    return () => clearInterval(id);
  }, [reduced]);

  const active = reduced ? FRAMES[2] : FRAMES[i];

  const frameClass = [
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "rounded-[14px] border-[1.5px] border-ink bg-bg-inset",
    reduced
      ? ""
      : "transition-[width,height] duration-[1200ms] ease-[var(--ease-out)]",
  ].join(" ");

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      aria-hidden
    >
      <div className="relative aspect-[200/220] w-full max-w-[200px]">
        <div
          className={frameClass}
          style={{ width: active.w, height: active.h }}
        />
      </div>
      <span className="mono-note mt-4 tabular-nums">{active.label}</span>
    </div>
  );
}
