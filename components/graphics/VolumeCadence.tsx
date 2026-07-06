/**
 * DESIGN.md §14 — VolumeCadence. The output-volume story for the Why canvas,
 * as a literal "few vs many" quantity: a typical brand ships a sparse 2–4 ads a
 * month; winning on paid social needs 15–20.
 *
 * Two rows of small identical duotone ad-tiles: 3 tiles (2–4 · YOU SHIP) above
 * a wrapping ~18 tiles (15–20 · YOU NEED). The eye reads the gap in quantity
 * instantly. The long row fills in on a gentle staggered loop so it feels alive
 * without pulling focus.
 *
 * Pure-CSS server component; the fade-in is the single quiet cue, gated by
 * `prefers-reduced-motion` (base state = all tiles solid). aria-hidden. Tokens
 * only — each tile is a token duotone (accent-soft → warmer accent).
 */
const TILE =
  "linear-gradient(155deg, var(--accent-soft) 50%, color-mix(in oklab, var(--accent) 45%, var(--bg)) 100%)";

export default function VolumeCadence({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .vq-tile{opacity:1}
        @media (prefers-reduced-motion: no-preference){
          .vq-tile{animation:vq-fill 4.6s ease-in-out infinite}
        }
        @keyframes vq-fill{0%{opacity:0.18}16%{opacity:1}84%{opacity:1}100%{opacity:0.18}}
      `}</style>

      <div className="flex flex-col gap-4">
        {/* few — what most brands ship */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-[3px]" style={{ background: TILE }} />
            ))}
          </div>
          <span className="mono-note mt-2 block text-text-3">
            <span className="tabular-nums text-ink">2–4</span> · YOU SHIP
          </span>
        </div>

        {/* many — what it takes to win (fills in on loop) */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="vq-tile h-3.5 w-3.5 rounded-[3px]"
                style={{ background: TILE, animationDelay: `-${((i * 0.24) % 4.6).toFixed(2)}s` }}
              />
            ))}
          </div>
          <span className="mono-note mt-2 block text-text-3">
            <span className="tabular-nums text-ink">15–20</span> · YOU NEED
          </span>
        </div>
      </div>
    </div>
  );
}
