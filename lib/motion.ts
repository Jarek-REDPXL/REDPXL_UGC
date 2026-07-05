import type { Variants, Transition } from "motion/react";

// DESIGN.md §7 — single shared motion source.
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.18,
  base: 0.4,
  slow: 0.6,
} as const;

// §7.1 Reveal — opacity 0→1, y 8→0, dur-base, once, viewport margin -10%.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: easeOut } },
};

// Parent that staggers children by 60ms.
export const staggerParent = (stagger = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const viewportOnce = { once: true, margin: "-10%" } as const;

// §7.2 Hero load sequence — runs on mount, 90ms stagger.
export const heroParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: easeOut } },
};

// §7.2 the hero frame animates slower, from a slightly larger offset.
export const heroFrame: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: easeOut } },
};

// §7.5 Accordion answer.
export const accordionTransition: Transition = {
  duration: 0.26,
  ease: easeOut,
};
