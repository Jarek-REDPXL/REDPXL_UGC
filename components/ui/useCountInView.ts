"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number from `from` to `to` once, when the element scrolls into view
 * (native IntersectionObserver, no motion library). ~1.2s ease-out cubic so it
 * decelerates onto the final value; `landed` flips true on arrival (drives
 * land-only UI like a strikethrough or a chip). Under prefers-reduced-motion it
 * jumps straight to the final value + landed. Shared so the Cost (down) and
 * Volume (up) counters stay a matched pair — identical timing + easing.
 */
export function useCountInView(from: number, to: number, duration = 1200) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(from);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      setLanded(true);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min(1, (ts - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out
        setValue(Math.round(from + (to - from) * eased));
        if (t < 1) raf = requestAnimationFrame(step);
        else setLanded(true);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to, duration]);

  return { value, landed, ref };
}
