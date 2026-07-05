"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * A single viewport-gated video: muted/loop/object-cover, played only while in
 * or near the viewport (own IntersectionObserver) so it doesn't add to always-on
 * decode load. On error it renders `fallback`. Fills its positioned parent.
 */
export default function InViewVideo({
  src,
  fallback = null,
}: {
  src: string;
  fallback?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    <video
      ref={ref}
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
