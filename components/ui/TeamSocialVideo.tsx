"use client";

import InViewVideo from "@/components/ui/InViewVideo";

const SAND_POSTER =
  "linear-gradient(158deg, var(--canvas-sand) 0%, color-mix(in oklab, var(--canvas-sand) 66%, var(--deep-sand)) 100%)";

/**
 * The tall [11] team/social tile. /public/videos/socialmedia.mp4 autoplays
 * muted + looped, viewport-gated (InViewVideo) so it only decodes near the
 * viewport; object-cover fills the rounded tile (clipped by the parent). On
 * error the quiet --canvas-sand poster shows so it never looks broken. The
 * "ON SOCIAL · @REDPXL" chip stays overlaid. Fills its positioned parent.
 */
export default function TeamSocialVideo() {
  return (
    <>
      <InViewVideo
        src="/videos/socialmedia.mp4"
        fallback={
          <div className="absolute inset-0" style={{ background: SAND_POSTER }}>
            <div className="grain-tex absolute inset-0 opacity-[0.04]" />
          </div>
        }
      />
      <span className="mono-note absolute bottom-3 left-3 z-10 rounded-[4px] bg-white/[0.92] px-2 py-1 text-[11px]! leading-tight text-ink">
        ON SOCIAL · @REDPXL
      </span>
    </>
  );
}
