/**
 * DESIGN.md §13/§14 — shared SVG film-grain overlay (feTurbulence).
 * Used on tinted canvases (3%) and poster placeholders. aria-hidden, static.
 */
export default function Grain({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      style={{ opacity }}
    >
      <filter id="canvas-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#canvas-grain)" />
    </svg>
  );
}
