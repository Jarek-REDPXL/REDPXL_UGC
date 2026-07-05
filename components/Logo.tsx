import Image from "next/image";
import logoSrc from "@/public/logo.webp";

/** REDPXL brand wordmark (dark slate + red dot). */
export default function Logo({ className = "h-5 w-auto" }: { className?: string }) {
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
