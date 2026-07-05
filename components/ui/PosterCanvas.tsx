"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * DESIGN.md §12 — PosterCanvas.
 * A designed placeholder for a src-less VideoSlot: a quiet per-niche duotone,
 * a UGC caption/progress overlay, and a faint film-grain layer. Makes the reel
 * and hero read as a wall of real, varied content rather than empty boxes.
 * All poster hexes are CSS vars in globals.css (§11 — components stay hex-free).
 */

type Niche =
  | "skincare"
  | "fitness"
  | "fashion"
  | "beauty"
  | "food"
  | "supplements"
  | "app"
  | "default";

function nicheFromChip(chip: string): Niche {
  const subject = chip.split("·")[0].trim().toLowerCase();
  if (subject.includes("skincare")) return "skincare";
  if (subject.includes("fitness")) return "fitness";
  if (subject.includes("fashion")) return "fashion";
  if (subject.includes("beauty")) return "beauty";
  if (subject.includes("food")) return "food";
  if (subject.includes("supplement")) return "supplements";
  if (subject.includes("app") || subject.includes("saas")) return "app";
  return "default";
}

const CAPTIONS: Record<Niche, [string, string]> = {
  skincare: ["POV: I finally fixed my skin", "the routine that actually worked"],
  fitness: ["POV: 12 weeks, no gym", "what I changed first"],
  fashion: ["the fit everyone asks about", "3 ways to style it"],
  beauty: ["this took five minutes", "the one product I rebuy"],
  food: ["the 10-minute version", "save this for later"],
  supplements: ["I stopped feeling tired", "what moved the needle"],
  app: ["I automated the boring part", "watch how fast this is"],
  default: ["POV: you found the one", "wait for the results"],
};

// deterministic (SSR-safe) hash → progress width 30–70%
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function PosterCanvas({
  chip,
  cycleHooks,
}: {
  chip: string;
  /** if provided (hero middle phone), the top caption crossfades through these */
  cycleHooks?: string[];
}) {
  const reduced = useReducedMotion();
  const niche = nicheFromChip(chip);
  const [line1, line2] = CAPTIONS[niche];
  const progress = 30 + (hash(chip) % 41);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const cycling = !!cycleHooks && cycleHooks.length > 1 && !reduced;

  useEffect(() => {
    if (!cycling || paused) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % cycleHooks!.length),
      3500
    );
    return () => clearInterval(id);
  }, [cycling, paused, cycleHooks]);

  const topLine = cycleHooks ? cycleHooks[idx] : line1;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden
    >
      {/* per-niche duotone */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(125% 120% at 50% 22%, var(--poster-${niche}-1), var(--poster-${niche}-2))`,
        }}
      />

      {/* film grain */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay">
        <filter id="poster-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#poster-grain)" />
      </svg>

      {/* UGC caption overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
        <div className="flex">
          {cycling ? (
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mono-note rounded-[4px] bg-black/35 px-1.5 py-0.5 text-[10px]! leading-tight text-white"
              >
                {topLine}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="mono-note rounded-[4px] bg-black/35 px-1.5 py-0.5 text-[10px]! leading-tight text-white">
              {topLine}
            </span>
          )}
        </div>
        <div className="flex">
          <span className="mono-note rounded-[4px] bg-black/35 px-1.5 py-0.5 text-[10px]! leading-tight text-white/90">
            {line2}
          </span>
        </div>

        {/* progress bar */}
        <div className="mt-1.5 h-0.5 w-full rounded-full bg-white/25">
          <div
            className="h-0.5 rounded-full bg-white/70"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
