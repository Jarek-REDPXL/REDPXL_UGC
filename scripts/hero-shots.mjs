// Captures just the hero (#top) at each width into /audit/hero, for fast review.
import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "audit", "hero");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const WIDTHS = [320, 390, 768, 1024, 1280, 1440, 1920];
const b = await chromium.launch();
for (const w of WIDTHS) {
  // taller viewport at narrow widths (hero stacks taller); page screenshot so
  // overflow-x-clip on the section doesn't confuse element-bound capture
  const h = w < 768 ? 1180 : 1000;
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: join(OUT, `hero-${w}.png`) });
  await ctx.close();
  console.log("hero", w);
}
await b.close();
