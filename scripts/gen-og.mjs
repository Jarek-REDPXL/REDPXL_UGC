// Generates public/og.png (1200×630) — ink bg, REDPXL wordmark + red square,
// tagline in Inter 600. Run: node scripts/gen-og.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontB64 = readFileSync(
  join(root, "public/fonts/InterVariable.woff2")
).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <style>
    @font-face { font-family:'InterEmbed'; src:url(data:font/woff2;base64,${fontB64}) format('woff2'); font-weight:100 900; }
    .wm  { font-family:'InterEmbed','Segoe UI',Arial,sans-serif; fill:#FFFFFF; font-weight:650; letter-spacing:-2px; }
    .tag { font-family:'InterEmbed','Segoe UI',Arial,sans-serif; fill:#FFFFFF; font-weight:600; letter-spacing:-2.5px; }
    .sub { font-family:'InterEmbed','Segoe UI',Arial,sans-serif; fill:#8A8D93; font-weight:400; letter-spacing:0; }
  </style>
  <rect width="1200" height="630" fill="#17181A"/>
  <!-- wordmark + red square -->
  <text x="80" y="132" class="wm" font-size="46">REDPXL</text>
  <rect x="332" y="112" width="16" height="16" fill="#E62E2E"/>
  <!-- headline -->
  <text x="80" y="330" class="tag" font-size="82">AI UGC ads</text>
  <text x="80" y="426" class="tag" font-size="82">engineered to convert.</text>
  <!-- subline -->
  <text x="80" y="520" class="sub" font-size="30">Done-for-you AI video &amp; static ads — delivered in 72 hours.</text>
  <!-- hairline accent -->
  <rect x="80" y="556" width="64" height="3" fill="#E62E2E"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, "public/og.png"));
console.log("wrote public/og.png");
