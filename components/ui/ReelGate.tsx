"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Wraps the Work reel and viewport-gates its videos: an IntersectionObserver
 * plays every <video> in the subtree only while the marquee is in/near the
 * viewport, and pauses them when scrolled far away — so the 10 looping clips
 * don't decode alongside the hero's 5. The CSS scroll loop is untouched.
 */
export default function ReelGate({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        for (const v of el.querySelectorAll("video")) {
          if (visible) {
            const p = v.play();
            if (p) p.catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
