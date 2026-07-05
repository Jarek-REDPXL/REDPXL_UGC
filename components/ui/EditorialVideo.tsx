"use client";

import { useEffect, useRef, useState } from "react";
import EditorialPoster, {
  type PosterPalette,
  type PosterVariant,
} from "./EditorialPoster";
import CyclingChips from "./CyclingChips";

/**
 * Hero phone screen: a muted, looping, autoplaying video (object-cover) with the
 * two-chip caption overlaid on top (center phone cycles). If the video ever
 * fails to load, it falls back to the EditorialPoster so the hero never shows a
 * black/broken screen. A play() retry on `canplay` covers deferred autoplay
 * (Safari/iOS). aria-hidden — decorative.
 */

function ChipPair({ hook, meta }: { hook: string; meta: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="mono-note rounded-[4px] bg-white/[0.92] px-2 py-1 text-[11px]! leading-tight text-ink">
        {hook}
      </span>
      <span className="mono-note rounded-[4px] bg-white/80 px-2 py-1 text-[10px]! leading-tight text-text-2">
        {meta}
      </span>
    </div>
  );
}

export default function EditorialVideo({
  src,
  variant,
  palette,
  hook,
  meta,
  cycleSets,
}: {
  src: string;
  variant: PosterVariant;
  palette: PosterPalette;
  hook: string;
  meta: string;
  cycleSets?: { hook: string; meta: string }[];
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  if (failed) {
    return (
      <EditorialPoster
        variant={variant}
        palette={palette}
        hook={hook}
        meta={meta}
        cycleSets={cycleSets}
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-x-3 bottom-[20%]">
        {cycleSets && cycleSets.length > 1 ? (
          <CyclingChips sets={cycleSets} />
        ) : (
          <ChipPair hook={hook} meta={meta} />
        )}
      </div>
    </div>
  );
}
