/**
 * DESIGN.md §14 — SpeedDelivery. The Why/Speed card graphic: our short accent
 * track (BRIEF → BATCH, 72H) with a dot that zips across fast on a ~2s loop,
 * over a long faint "TRADITIONAL · 2 WEEKS" track that barely fills — so the eye
 * reads "ours is far faster". Pure-CSS server component; reduced motion rests
 * the dot at BATCH. Tabular figures, mono labels. aria-hidden.
 */
export default function SpeedDelivery({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        .spd-dot{left:98%}
        @media (prefers-reduced-motion: no-preference){
          .spd-dot{animation:spd-zip 2.2s cubic-bezier(0.55,0,0.15,1) infinite}
        }
        @keyframes spd-zip{0%{left:3%}55%,100%{left:98%}}
      `}</style>

      {/* ours — fast */}
      <div className="flex items-center justify-between">
        <span className="mono-note text-text-3">BRIEF</span>
        <span className="label tabular-nums text-accent-dark">72H</span>
        <span className="mono-note text-text-3">BATCH</span>
      </div>
      <div className="relative mt-2 h-1.5 w-full rounded-full bg-accent-soft">
        <div className="absolute inset-0 rounded-full bg-accent" />
        <span className="spd-dot absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent" />
      </div>

      {/* traditional — slow */}
      <div className="mt-4 flex items-center justify-between">
        <span className="mono-note text-text-3">TRADITIONAL</span>
        <span className="mono-note text-text-3">2 WEEKS</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-bg-inset">
        <div className="h-full rounded-full bg-text-3/50" style={{ width: "15%" }} />
      </div>
    </div>
  );
}
