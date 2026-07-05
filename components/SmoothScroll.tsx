"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll, desktop only. Lenis is dynamically imported and only on
 * a fine pointer (mouse/wheel) device, so touch devices never download or parse
 * it — native momentum scroll is better there anyway, and it keeps mobile JS
 * off the main thread. Skipped entirely under prefers-reduced-motion.
 *
 * Anchor links route through lenis.scrollTo with the sticky-nav offset so
 * section jumps glide. The reel's internal scroll is excluded via
 * data-lenis-prevent on the Work reel.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return; // native scroll on touch / reduced

    let cleanup = () => {};
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
      });

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
        const anchor = (e.target as HTMLElement)?.closest?.(
          'a[href^="#"]'
        ) as HTMLAnchorElement | null;
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.2 });
        history.pushState(null, "", hash);
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
