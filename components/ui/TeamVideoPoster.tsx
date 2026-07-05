"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * The tall 9:16 team/social tile. A quiet duotone poster with a centered play
 * circle and a caption chip — click to play /public/videos/team-social.mp4 (with
 * sound, user-initiated). If the file isn't there the click falls back to the
 * poster. No autoplay. TODO:REAL-DATA drop team-social.mp4 in.
 */
export default function TeamVideoPoster() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/team-social.mp4"
        autoPlay
        loop
        playsInline
        controls
        onError={() => setPlaying(false)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play REDPXL social video"
      className="group/vid absolute inset-0"
      style={{
        background:
          "linear-gradient(158deg, var(--canvas-sand) 0%, color-mix(in oklab, var(--canvas-sand) 66%, var(--deep-sand)) 100%)",
      }}
    >
      <div className="grain-tex absolute inset-0 opacity-[0.04]" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-white text-ink transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover/vid:scale-[1.08]">
          <Play className="h-5 w-5 translate-x-px" fill="currentColor" />
        </span>
      </span>
      <span className="mono-note absolute bottom-3 left-3 rounded-[4px] bg-white/[0.92] px-2 py-1 text-[11px]! leading-tight text-ink">
        ON SOCIAL · @REDPXL
      </span>
    </button>
  );
}
