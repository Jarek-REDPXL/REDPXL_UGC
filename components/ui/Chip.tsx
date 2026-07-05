import type { ReactNode } from "react";

/** DESIGN.md §5 chips — radius 6px, 1px line, mono-note. */
export default function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mono-note inline-flex items-center rounded-chip border border-line px-2 py-1 text-text-2 ${className}`}
    >
      {children}
    </span>
  );
}
