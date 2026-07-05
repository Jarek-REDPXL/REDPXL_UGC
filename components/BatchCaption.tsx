"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Tiny client island: the hero output-log caption whose batch number ticks
 * 012 → 013 → 014 once on load (§2). Isolated so the hero's LCP text can stay
 * server-rendered. Reduced motion → 014 immediately.
 */
export default function BatchCaption() {
  const reduced = useReducedMotion();
  const [batch, setBatch] = useState(12);

  useEffect(() => {
    if (reduced) {
      setBatch(14);
      return;
    }
    const t1 = setTimeout(() => setBatch(13), 200);
    const t2 = setTimeout(() => setBatch(14), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  return (
    <p className="mono-note mt-4 text-center">
      output / batch{" "}
      <span className="tabular-nums">{String(batch).padStart(3, "0")}</span> ·
      skincare · 9:16 · 72h
    </p>
  );
}
