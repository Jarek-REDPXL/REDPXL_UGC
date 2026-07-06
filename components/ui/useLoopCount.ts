"use client";

import { useEffect, useRef, useState } from "react";

export type LoopPhase = "roll" | "hold" | "reset";

const ROLL = 2000; // count animation (~2s, strong ease-out)
const HOLD = 2000; // rest on the final value
const RESET = 800; // fade out + snap back before the next roll
const CYCLE = ROLL + HOLD + RESET;

/**
 * Loops a count from `from` to `to` while the element is in view: roll (~2s
 * ease-out cubic) → hold (~2s on the landed value) → reset (~0.8s, consumer
 * fades out) → repeat. A native IntersectionObserver gates the rAF loop so it
 * only runs on screen. Under prefers-reduced-motion it jumps to the final value
 * and holds (no loop). Shared so the Cost (down) and Volume (up) counters stay a
 * matched pair — identical timing + easing. rAF timestamps drive it (no Date).
 */
export function useLoopCount(from: number, to: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(from);
  const [phase, setPhase] = useState<LoopPhase>("roll");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      setPhase("hold");
      return;
    }

    let raf = 0;
    let t0: number | null = null;
    let running = false;

    const frame = (ts: number) => {
      if (t0 === null) t0 = ts;
      const t = (ts - t0) % CYCLE;
      if (t < ROLL) {
        const p = 1 - Math.pow(1 - t / ROLL, 3); // ease-out
        setValue(from + (to - from) * p);
        setPhase((x) => (x === "roll" ? x : "roll"));
      } else if (t < ROLL + HOLD) {
        setValue(to);
        setPhase((x) => (x === "hold" ? x : "hold"));
      } else {
        setValue(to); // keep the landed value visible; consumer fades it out
        setPhase((x) => (x === "reset" ? x : "reset"));
      }
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting ?? false;
        if (vis && !running) {
          running = true;
          t0 = null;
          raf = requestAnimationFrame(frame);
        } else if (!vis && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return { value, phase, ref };
}
