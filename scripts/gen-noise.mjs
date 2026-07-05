// Generates public/noise.png — a tiny tiling grain texture. Replaces per-element
// SVG feTurbulence (expensive per-pixel CPU noise, ~29 instances) with one cheap
// cached raster tiled via CSS background. Run: node scripts/gen-noise.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SIZE = 128;
// Uniform white noise (no large-scale clustering) centred on mid-grey so the
// mix-blend-overlay stays even and subtle on both light tints and the dark ink
// band — no muddy gradient. Grays kept in a tight band around 128.
const buf = Buffer.alloc(SIZE * SIZE);
for (let i = 0; i < buf.length; i++) {
  buf[i] = Math.round(108 + Math.random() * 40); // grays 108..148 (soft, even)
}

const png = await sharp(buf, {
  raw: { width: SIZE, height: SIZE, channels: 1 },
})
  .png({ compressionLevel: 9 })
  .toBuffer();

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
await sharp(png).toFile(join(root, "public/noise.png"));
console.log(`wrote public/noise.png (${png.length} bytes)`);
