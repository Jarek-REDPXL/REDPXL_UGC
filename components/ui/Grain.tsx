/**
 * DESIGN.md §13/§14 — shared film-grain overlay. A cached tiled raster
 * (public/noise.png via the .grain-tex class) instead of SVG feTurbulence, so
 * many grained surfaces stay cheap to paint. Used on tinted canvases (3%).
 * aria-hidden, static.
 */
export default function Grain({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="grain-tex absolute inset-0"
      style={{ opacity }}
    />
  );
}
