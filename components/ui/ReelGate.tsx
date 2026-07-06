"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Viewport-gates the Work reel at the PER-PHONE level so only the phones inside
 * the horizontal reel window decode, not all 20 at once (20 concurrent H.264
 * decoders was the marquee's lag). Two observers:
 *  - coarse: is the reel vertically on/near screen at all? (root = viewport)
 *  - fine:   which phones are within the horizontal reel window right now?
 *            (root = the reel viewport itself, ~1 phone of horizontal margin)
 * A phone's <video> plays only when BOTH are true; everything else is paused.
 * Both the primary and the duplicate (aria-hidden) track are gated the same way,
 * so a duplicated phone only decodes while it's actually the one on screen —
 * ~4–7 concurrent decoders on desktop, ~2–3 on mobile, instead of 20. The CSS
 * transform loop is untouched, so it stays seamless.
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
    const track = el.querySelector<HTMLElement>(".reel-track");
    const phones = track ? (Array.from(track.children) as HTMLElement[]) : [];
    if (!phones.length) return;

    let sectionActive = false;
    const inWindow = new WeakSet<Element>();

    const sync = (phone: HTMLElement) => {
      const v = phone.querySelector("video");
      if (!v) return;
      if (sectionActive && inWindow.has(phone)) {
        const p = v.play();
        if (p) p.catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    };
    const syncAll = () => phones.forEach(sync);

    // coarse — reel vertically on/near screen (small margin so the decode spike
    // doesn't fire far ahead of the section)
    const sectionIO = new IntersectionObserver(
      (entries) => {
        sectionActive = entries[0]?.isIntersecting ?? false;
        syncAll();
      },
      { rootMargin: "120px 0px" }
    );
    sectionIO.observe(el);

    // fine — which phones sit within the horizontal reel window (root = the reel
    // viewport). ~100px horizontal margin so a phone starts just before it
    // slides in and pauses just after it slides out (a ~2.5s lead at the reel's
    // ~40px/s, plenty for a preload=metadata clip to start cleanly), keeping the
    // concurrent-decoder count to roughly the on-screen phones only.
    const phoneIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inWindow.add(e.target);
          else inWindow.delete(e.target);
          sync(e.target as HTMLElement);
        }
      },
      { root: el, rootMargin: "0px 100px" }
    );
    phones.forEach((p) => phoneIO.observe(p));

    return () => {
      sectionIO.disconnect();
      phoneIO.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
