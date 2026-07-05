import Image from "next/image";
import logoSrc from "@/public/logo.webp";

/**
 * REDPXL brand wordmark (real /public/logo.webp asset, 6312×843, transparent).
 * `variant="light"` recolours it solid white (brightness-0 invert) for dark
 * backgrounds; the default dark wordmark is used on light backgrounds. `sizes`
 * lets large instances (e.g. the footer watermark) request a crisp resolution.
 */
export default function Logo({
  className = "h-5 w-auto",
  variant = "dark",
  sizes = "160px",
  alt = "REDPXL",
  priority = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  sizes?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoSrc}
      alt={alt}
      className={`${variant === "light" ? "brightness-0 invert" : ""} ${className}`.trim()}
      priority={priority}
      sizes={sizes}
    />
  );
}
