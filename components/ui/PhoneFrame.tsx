import VideoSlot from "./VideoSlot";

/**
 * DESIGN.md §8.4 — PhoneFrame: bezel wrapper (radius 28, bg bezel, padding 8,
 * shadow-phone) holding a 9:16 VideoSlot with a 20px inner radius.
 */
export default function PhoneFrame({
  src,
  chip,
  className = "",
}: {
  src?: string;
  chip: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-phone bg-bezel p-2 shadow-[var(--shadow-phone)] ${className}`}
    >
      <div className="overflow-hidden rounded-[20px]">
        <VideoSlot src={src} chip={chip} ratio="9:16" rounded="rounded-[20px]" />
      </div>
    </div>
  );
}
