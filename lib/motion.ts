import type { Variants, Transition } from "motion/react";

// DESIGN.md §7 — single shared motion source. Every framer-motion animation
// pulls its easing/duration from here; no ad-hoc values in components.
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.18, // hovers, accordion icon
  base: 0.4, // reveals
  slow: 0.6, // large elements
} as const;

// §7.1 Reveal — opacity 0→1, y 8→0.
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: easeOut } },
};

// larger elements rise from a bigger offset over dur-slow.
export const fadeRiseLg: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: easeOut } },
};

// alias kept for the Reveal wrapper.
export const reveal = fadeRise;

// Parent that reveals its children with a 60ms stagger.
export const staggerParent = (stagger = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

// §7 — reveals fire once, never re-trigger on scroll up.
export const viewportOnce = { once: true, margin: "-10% 0px" } as const;

// shared transitions for non-variant animations.
export const fastTransition: Transition = { duration: DUR.fast, ease: easeOut };
export const baseTransition: Transition = { duration: DUR.base, ease: easeOut };
// §7.5 accordion answer height.
export const accordionTransition: Transition = { duration: 0.26, ease: easeOut };
