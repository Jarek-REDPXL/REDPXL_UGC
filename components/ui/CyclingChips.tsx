"use client";

import { useEffect, useState } from "react";

/**
 * The only client island inside the hero posters — used for the center phone,
 * whose two-chip caption crossfades through a few hook/meta sets every 3.5s.
 * Plain React + a CSS fade (`.poster-cap-fade`), no motion library. Reduced
 * motion holds the first set, static.
 */
export default function CyclingChips({
  sets,
}: {
  sets: { hook: string; meta: string }[];
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (sets.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % sets.length), 3500);
    return () => clearInterval(id);
  }, [sets.length]);

  const s = sets[i];

  return (
    <div key={i} className="poster-cap-fade flex flex-col items-start gap-1">
      <span className="mono-note rounded-[4px] bg-white/[0.92] px-2 py-1 text-[11px]! leading-tight text-ink">
        {s.hook}
      </span>
      <span className="mono-note rounded-[4px] bg-white/80 px-2 py-1 text-[10px]! leading-tight text-text-2">
        {s.meta}
      </span>
    </div>
  );
}
