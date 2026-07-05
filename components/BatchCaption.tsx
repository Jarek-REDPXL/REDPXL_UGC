"use client";

import { useEffect, useState } from "react";

/**
 * Tiny client island: the hero output-log caption whose batch number ticks
 * 012 to 013 to 014 once on load (§2). Isolated so the hero's LCP text can stay
 * server-rendered. Reduced motion (checked via matchMedia, no motion library)
 * jumps straight to 014.
 */
export default function BatchCaption({ className = "" }: { className?: string }) {
  const [batch, setBatch] = useState(12);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBatch(14);
      return;
    }
    const t1 = setTimeout(() => setBatch(13), 200);
    const t2 = setTimeout(() => setBatch(14), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <p className={`mono-note ${className}`}>
      output / batch{" "}
      <span className="tabular-nums">{String(batch).padStart(3, "0")}</span> ·
      skincare · 9:16 · 72h
    </p>
  );
}
