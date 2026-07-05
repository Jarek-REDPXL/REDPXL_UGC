// Generates public/noise.png — a tiny tiling grain texture. Replaces per-element
// SVG feTurbulence (expensive per-pixel CPU noise, ~29 instances) with one cheap
// cached raster tiled via CSS background. Run: node scripts/gen-noise.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SIZE = 96;
// deterministic pseudo-random so the texture is stable across builds
let seed = 1337;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

// grayscale noise, single channel; contrast kept mild so the overlay reads soft
const buf = Buffer.alloc(SIZE * SIZE);
for (let i = 0; i < buf.length; i++) {
  const n = rand();
  buf[i] = Math.round(90 + n * 130); // mid-range grays 90..220
}

const png = await sharp(buf, {
  raw: { width: SIZE, height: SIZE, channels: 1 },
})
  .png({ compressionLevel: 9 })
  .toBuffer();

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
await sharp(png).toFile(join(root, "public/noise.png"));
console.log(`wrote public/noise.png (${png.length} bytes)`);
