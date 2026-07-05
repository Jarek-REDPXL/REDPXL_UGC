"use client";

import { useEffect, useState } from "react";

/**
 * The only client island inside PosterCanvas — used solely for the hero middle
 * phone, where the top caption cycles through a few hooks. Plain React + a CSS
 * fade (no motion library), so the rest of the posters stay pure server markup.
 * Reduced motion → the first hook, static.
 */
export default function CyclingCaption({
  hooks,
  className = "",
}: {
  hooks: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (hooks.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % hooks.length), 3500);
    return () => clearInterval(id);
  }, [hooks.length]);

  return (
    <span key={i} className={`poster-cap-fade ${className}`}>
      {hooks[i]}
    </span>
  );
}
