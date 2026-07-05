import { Image as ImageIcon, Package, Play } from "lucide-react";

/**
 * DESIGN.md — Deliverables canvas graphic (cream). A folder/delivery mock: a
 * white bordered frame headed with a mono batch line, holding a grid of 8 tiny
 * labelled ad tiles (image / video) on the left and a mono file-list column on
 * the right (hidden on narrow — mobile keeps just the tile grid).
 *
 * Pure-CSS server component: the 8 tiles do a gentle staggered opacity pulse
 * (0.85 → 1) on a ~6s loop via a namespaced keyframe; per-tile delay is a static
 * inline style. Motion is gated by `prefers-reduced-motion: no-preference`, so
 * reduced-motion users get the fully static grid with zero JS.
 */

/* TODO:REAL-DATA sample tiles */
const TILES: { label: string; type: "video" | "image" }[] = [
  { label: "AD-01", type: "video" },
  { label: "AD-02", type: "image" },
  { label: "AD-03", type: "video" },
  { label: "AD-04", type: "image" },
  { label: "AD-05", type: "video" },
  { label: "AD-06", type: "image" },
  { label: "AD-07", type: "video" },
  { label: "AD-08", type: "image" },
];

/* TODO:REAL-DATA sample filenames */
const FILES = [
  "AD-01_HOOK-POV_9x16.MP4",
  "AD-02_STATIC_1x1.JPG",
  "AD-03_HOOK-STOP_4x5.MP4",
  "AD-04_STATIC_9x16.JPG",
  "AD-05_UGC_9x16.MP4",
  "AD-06_HOOK-3WAYS_1x1.JPG",
];

export default function BatchDrop({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`} aria-hidden>
      <style>{`
        @keyframes bd-pulse{0%,100%{opacity:.85}50%{opacity:1}}
        .bd-tile{opacity:.85}
        @media (prefers-reduced-motion: no-preference){
          .bd-tile{animation:bd-pulse 6s ease-in-out infinite}
        }
      `}</style>

      <div className="overflow-hidden rounded-frame border border-line bg-bg">
        {/* header — BATCH_014 / 30 ASSETS / READY */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 sm:px-5">
          <Package size={14} className="text-text-2" />
          <span className="mono-note">
            batch_014 / 30 assets / <span className="text-pos">ready</span>
          </span>
        </div>

        {/* body — tile grid (left) + file list (right, hidden on narrow) */}
        <div className="grid gap-4 p-4 sm:grid-cols-[1.5fr_1fr] sm:p-5">
          <div className="grid grid-cols-4 gap-2">
            {TILES.map((t, i) => (
              <div
                key={t.label}
                style={{ animationDelay: `${(i * 0.22).toFixed(2)}s` }}
                className="bd-tile flex aspect-square flex-col items-center justify-center gap-1 rounded-chip border border-line bg-bg-inset"
              >
                {t.type === "video" ? (
                  <Play size={16} className="text-text-2" />
                ) : (
                  <ImageIcon size={16} className="text-text-2" />
                )}
                <span className="font-mono text-[8px] uppercase leading-none tracking-wider text-text-3">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden flex-col gap-2 border-l border-line pl-4 sm:flex">
            {FILES.map((f) => (
              <span key={f} className="mono-note truncate">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
