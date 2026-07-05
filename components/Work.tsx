"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { Annotation } from "@/components/ui/Section";
import PhoneFrame from "@/components/ui/PhoneFrame";
import Reveal from "@/components/Reveal";

// DESIGN.md §9 [01] THE WORK — 8 reel frames, chip format SUBJECT · PLATFORM.
const CHIPS = [
  "SKINCARE · TIKTOK",
  "SUPPLEMENTS · META",
  "FASHION · TIKTOK",
  "MOBILE APP · META",
  "BEAUTY · TIKTOK",
  "FITNESS · REELS",
  "FOOD & BEV · TIKTOK",
  "SAAS · YOUTUBE",
];

/**
 * DESIGN.md §9 [01] THE WORK + §7.6 — annotation/title stay in the container
 * while the scroll-snap reel bleeds full-width, so we compose the shell
 * manually instead of using <Section>. Pointer-drag on desktop; native
 * scroll-snap everywhere; a 2px progress hairline tracks scroll position.
 */
export default function Work() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });
  // §4/§7.6 momentum — track pointer velocity (px/ms) between moves.
  const vel = useRef({ lastX: 0, lastT: 0, velocity: 0 });
  const rafId = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(Math.min(1, Math.max(0, p)));
  };

  const stopMomentum = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  // Exponential-decay inertia after release; each frame nudges scrollLeft by
  // velocity*frameMs and decays velocity, halting on a bound or when tiny.
  const startMomentum = () => {
    let last = performance.now();
    const step = (now: number) => {
      const el = scrollRef.current;
      if (!el) {
        rafId.current = null;
        return;
      }
      const frameMs = now - last;
      last = now;
      el.scrollLeft += vel.current.velocity * frameMs;
      vel.current.velocity *= 0.94;
      updateProgress();
      const max = el.scrollWidth - el.clientWidth;
      const hitBound = el.scrollLeft <= 0 || el.scrollLeft >= max;
      if (Math.abs(vel.current.velocity) < 0.02 || hitBound) {
        rafId.current = null;
        return;
      }
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    stopMomentum();
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    vel.current = { lastX: e.clientX, lastT: performance.now(), velocity: 0 };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    const now = performance.now();
    const dt = now - vel.current.lastT;
    if (dt > 0) {
      // pointer-right shrinks scrollLeft, so scroll velocity is the negative.
      vel.current.velocity = -(e.clientX - vel.current.lastX) / dt;
    }
    vel.current.lastX = e.clientX;
    vel.current.lastT = now;
    updateProgress();
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const wasDown = drag.current.down;
    drag.current.down = false;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    // Reduced motion → instant stop; otherwise fling if velocity is meaningful.
    if (wasDown && !reduced && Math.abs(vel.current.velocity) >= 0.02) {
      startMomentum();
    }
  };

  // Clean up any in-flight decay loop on unmount.
  useEffect(() => stopMomentum, []);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-y divider-top"
    >
      <div className="container-x">
        <Reveal>
          <Annotation
            idx="02"
            name="THE WORK"
            note="HOLD ↔ DRAG"
            labelId="work-title"
          />
        </Reveal>

        <Reveal>
          <h2 id="work-title" className="display-2 mt-5">
            Made to stop the scroll.
          </h2>
        </Reveal>

        <Reveal>
          <p className="body-lg mt-3">
            See it, then judge it. Most people can&apos;t tell it&apos;s AI — and on paid social, native beats polished.
          </p>
        </Reveal>
      </div>

      {/* full-bleed draggable reel — padding aligns the first/last card to the
          1152px container edge on large screens. */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: "pan-y" }}
        className="mt-12 mask-fade-x no-scrollbar snap-x-row flex gap-5 overflow-x-auto cursor-grab active:cursor-grabbing px-6 md:px-8 lg:px-[max(40px,calc((100vw-1152px)/2))]"
      >
        {/* TODO:REAL-DATA drop MP4s in /public/videos and pass src */}
        {CHIPS.map((chip) => (
          <div
            key={chip}
            className="snap-item shrink-0 w-[180px] sm:w-[220px] select-none"
          >
            <PhoneFrame chip={chip} />
          </div>
        ))}
      </div>

      {/* §7.6 — progress hairline, width follows scroll progress. */}
      <div className="container-x mt-6">
        <div className="h-0.5 bg-line max-w-[240px]">
          <div
            className="h-0.5 bg-ink"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
