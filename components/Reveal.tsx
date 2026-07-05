import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
};

/**
 * DESIGN.md §7.1 — fade + 8px rise as the element scrolls into view, once.
 * Pure-CSS server component: the `.reveal` class (globals.css) drives a
 * scroll-driven animation where supported, and shows content immediately under
 * reduced motion or on browsers without scroll-timeline. No JS, no hydration.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  return <Tag className={`reveal ${className}`.trim()}>{children}</Tag>;
}
