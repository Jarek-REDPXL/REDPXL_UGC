import { Play } from "lucide-react";

type Ratio = "9:16" | "1:1" | "16:9";

type VideoSlotProps = {
  /* TODO:REAL-DATA drop MP4s in /public/videos and pass e.g. src="/videos/skincare.mp4" */
  src?: string;
  poster?: string;
  /** factual chip label, format SUBJECT · PLATFORM (e.g. "SKINCARE · TIKTOK") */
  chip: string;
  ratio?: Ratio;
  /** rounding of the media surface (PhoneFrame inner uses a tighter radius) */
  rounded?: string;
};

const ratioClass: Record<Ratio, string> = {
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
};

/** DESIGN.md §8.3 — VideoSlot. */
export default function VideoSlot({
  src,
  poster,
  chip,
  ratio = "9:16",
  rounded = "rounded-card",
}: VideoSlotProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-bg-inset ${ratioClass[ratio]} ${rounded}`}
    >
      {/* poster state: inset base + 1px inner line + centred play circle */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-line" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white">
          <Play className="h-4 w-4 translate-x-px text-ink" fill="currentColor" />
        </span>
      </div>

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

      <span className="mono-note absolute left-2 top-2 rounded-chip border border-line bg-white/[0.92] px-2 py-[3px] !text-ink">
        {chip}
      </span>
    </div>
  );
}
