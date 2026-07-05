import { Play } from "lucide-react";
import PosterCanvas from "./PosterCanvas";
import EditorialPoster, {
  type PosterPalette,
  type PosterVariant,
} from "./EditorialPoster";

type Ratio = "9:16" | "1:1" | "16:9";

export type EditorialSpec = {
  variant: PosterVariant;
  palette: PosterPalette;
  hook: string;
  meta: string;
  cycleSets?: { hook: string; meta: string }[];
};

type VideoSlotProps = {
  /* TODO:REAL-DATA drop MP4s in /public/videos and pass e.g. src="/videos/skincare.mp4" */
  src?: string;
  poster?: string;
  /** factual chip label, format SUBJECT · PLATFORM (e.g. "SKINCARE · TIKTOK") */
  chip: string;
  ratio?: Ratio;
  /** rounding of the media surface (PhoneFrame inner uses a tighter radius) */
  rounded?: string;
  /** hero middle phone: cycle the poster's top caption through these hooks */
  cycleHooks?: string[];
  /** hero posters: use the editorial poster (texture + two-chip caption) and
      suppress the niche chip; when absent the marquee PosterCanvas is used */
  editorial?: EditorialSpec;
};

const ratioClass: Record<Ratio, string> = {
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
};

/** DESIGN.md §8.3 + §12 — VideoSlot with a designed PosterCanvas placeholder. */
export default function VideoSlot({
  src,
  poster,
  chip,
  ratio = "9:16",
  rounded = "rounded-card",
  cycleHooks,
  editorial,
}: VideoSlotProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden bg-bg-inset ${ratioClass[ratio]} ${rounded}`}
    >
      {/* poster inner content — scales 1.03 on card hover (§1) */}
      {!src && (
        <div className="absolute inset-0 transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
          {editorial ? (
            <EditorialPoster {...editorial} />
          ) : (
            <PosterCanvas chip={chip} cycleHooks={cycleHooks} />
          )}
        </div>
      )}

      {/* 1px inner hairline → line-hover on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-line transition-colors duration-[180ms] ease-[var(--ease-out)] group-hover:border-line-hover" />

      {/* centred play button (poster state) — scales + inverts on hover */}
      {!src && (
        <div className="absolute inset-0 z-10 grid place-items-center">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-[transform,background-color,color] duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.08] group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <Play className="h-4 w-4 translate-x-px" fill="currentColor" />
          </span>
        </div>
      )}

      {/* real video (renders only when a src is provided) */}
      {src && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={chip}
        />
      )}

      {/* niche label chip — suppressed for editorial hero posters (they carry
          their own two-chip caption) */}
      {!editorial && (
        <span className="mono-note absolute left-2 top-2 z-20 rounded-chip border border-line bg-white/[0.92] px-2 py-[3px] !text-ink">
          {chip}
        </span>
      )}

      {/* dev-only placeholder badge — flags an unfilled slot in development;
          never renders in the production build (see ASSETS.md drop-in map) */}
      {!src && process.env.NODE_ENV === "development" && (
        <span className="mono-note absolute bottom-2 right-2 z-20 rounded-chip border border-dashed border-accent bg-white/[0.92] px-2 py-[3px] !text-[9px] uppercase tracking-wider !text-accent">
          Placeholder
        </span>
      )}
    </div>
  );
}
