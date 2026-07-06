"use client";

import { useEffect, useRef, useState } from "react";

const SAND_POSTER =
  "linear-gradient(158deg, var(--canvas-sand) 0%, color-mix(in oklab, var(--canvas-sand) 66%, var(--deep-sand)) 100%)";

/**
 * The [11] team/social tile — just the clip, no overlay. A real <video> plays
 * /videos/socialmedia.mp4 (public/ is served from the root, so no "/public" in
 * the path): muted/looped/autoplay/playsInline, object-cover, filling the tile.
 * On error the quiet --canvas-sand poster shows so it never looks broken.
 */
export default function TeamSocialVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  // Viewport-gate: this tile is always below the fold, so play only while it's
  // in/near view (IntersectionObserver) and pause otherwise — it never decodes
  // on initial load. Muted, so play() when in view is an allowed autoplay.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) tryPlay();
        else v.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    v.addEventListener("canplay", tryPlay);
    return () => {
      io.disconnect();
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  if (failed) {
    return (
      <div className="absolute inset-0" style={{ background: SAND_POSTER }}>
        <div className="grain-tex absolute inset-0 opacity-[0.04]" />
      </div>
    );
  }

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src="/videos/socialmedia.mp4"
      muted
      loop
      playsInline
      preload="none"
      onError={() => setFailed(true)}
    />
  );
}
