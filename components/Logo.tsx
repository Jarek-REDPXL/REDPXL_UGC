import Image from "next/image";
import logoSrc from "@/public/logo.webp";

/**
 * REDPXL brand wordmark (dark slate + trailing red square).
 * - `variant="mark"` (default, footer): the full wordmark including the square.
 * - `variant="ugc"` (nav): the wordmark with the trailing red square cropped
 *   off, followed by a small bordered "UGC" chip.
 */
export default function Logo({
  className = "h-5 w-auto",
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "ugc";
}) {
  if (variant === "ugc") {
    return (
      <span className="flex items-center gap-2">
        {/* clip the trailing red square (~last 5% of the wordmark image) */}
        <span className="block h-[22px] w-[154px] overflow-hidden">
          <Image
            src={logoSrc}
            alt="REDPXL"
            className="h-[22px] w-auto max-w-none"
            priority
            sizes="180px"
          />
        </span>
        <span className="mono-note rounded-[4px] border border-line px-1.5 py-0.5 text-text-2">
          UGC
        </span>
      </span>
    );
  }

  return (
    <Image
      src={logoSrc}
      alt="REDPXL"
      className={className}
      priority
      sizes="160px"
    />
  );
}
