"use client";

import { useState } from "react";

const SAND_POSTER =
  "linear-gradient(158deg, var(--canvas-sand) 0%, color-mix(in oklab, var(--canvas-sand) 66%, var(--deep-sand)) 100%)";

/**
 * The [11] team/social tile — just the clip, no overlay. A real <video> plays
 * /videos/socialmedia.mp4 (public/ is served from the root, so no "/public" in
 * the path): muted/looped/autoplay/playsInline, object-cover, filling the tile.
 * On error the quiet --canvas-sand poster shows so it never looks broken.
 */
export default function TeamSocialVideo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0" style={{ background: SAND_POSTER }}>
        <div className="grain-tex absolute inset-0 opacity-[0.04]" />
      </div>
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src="/videos/socialmedia.mp4"
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      aria-hidden
    />
  );
}
