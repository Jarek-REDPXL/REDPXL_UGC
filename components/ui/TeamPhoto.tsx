import Image from "next/image";

/**
 * A member portrait rendered with next/image (fill + object-cover) so it fills
 * the 3:4 tile with no layout shift and is served optimised. The tile's
 * --bg-inset shows underneath while the image loads.
 */
export default function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 22vw"
      className="object-cover"
    />
  );
}
