import type { ReactNode } from "react";

/**
 * §7.1 — a group whose children reveal on scroll. Pure-CSS server components:
 * StaggerGroup is a plain layout wrapper; each RevealItem carries the `.reveal`
 * class (globals.css) and reveals as it enters view. Items lower on the page
 * enter slightly later, which reads as a natural stagger. No JS, no hydration.
 */
export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  /** kept for call-site compatibility; stagger is now positional (scroll-driven) */
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return <Tag className={`reveal ${className}`.trim()}>{children}</Tag>;
}
