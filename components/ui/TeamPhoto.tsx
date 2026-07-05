import Image from "next/image";

/**
 * A member portrait rendered with next/image (fill + object-cover) so it fills
 * the square tile with no layout shift and is served optimised. `object-top`
 * anchors the crop to the top so heads are always visible (any overflow is cut
 * from the bottom). The tile's --bg-inset shows underneath while it loads.
 */
export default function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 22vw"
      className="object-cover object-top"
    />
  );
}
