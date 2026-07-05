"use client";

import { useState } from "react";

/**
 * A marquee phone screen: a muted, looping, object-cover video with no autoplay
 * of its own — the parent ReelGate plays/pauses it based on viewport visibility
 * so 10+ clips never decode at once. On error it renders nothing, leaving the
 * VideoSlot's --bg-inset blank screen as the fallback (never black/broken).
 * aria-hidden — decorative.
 */
export default function MarqueeVideoScreen({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      aria-hidden
    />
  );
}
