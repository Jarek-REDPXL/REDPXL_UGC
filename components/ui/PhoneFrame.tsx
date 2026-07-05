import VideoSlot, { type EditorialSpec } from "./VideoSlot";

/**
 * DESIGN.md §8.4 — PhoneFrame: bezel wrapper (radius 28, bg bezel, 6px padding
 * so media dominates, shadow-phone) holding a 9:16 VideoSlot at 20px radius.
 */
export default function PhoneFrame({
  src,
  chip,
  className = "",
  cycleHooks,
  editorial,
}: {
  src?: string;
  chip: string;
  className?: string;
  cycleHooks?: string[];
  editorial?: EditorialSpec;
}) {
  return (
    <div
      className={`rounded-phone bg-bezel p-1.5 shadow-[var(--shadow-phone)] ${className}`}
    >
      <div className="overflow-hidden rounded-[20px]">
        <VideoSlot
          src={src}
          chip={chip}
          ratio="9:16"
          rounded="rounded-[20px]"
          cycleHooks={cycleHooks}
          editorial={editorial}
        />
      </div>
    </div>
  );
}
