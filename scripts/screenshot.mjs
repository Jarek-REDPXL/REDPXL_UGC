// REDPXL UGC — responsive audit capture.
// Screens the running site at 8 widths (320→1920), full-page + per-section,
// captures a few interaction states, and runs an AUTOMATED horizontal-overflow
// check at every width. Any overflow (document.scrollWidth > innerWidth) is a
// hard failure: the script prints it loudly and exits non-zero.
//
//   Prereq: dev server running (npm run dev) or a prod preview on BASE_URL.
//   Run:    node scripts/screenshot.mjs           (defaults to localhost:3000)
//           BASE_URL=http://localhost:3000 node scripts/screenshot.mjs
//
// Output → /audit  (gitignored): /audit/full/<w>.png, /audit/section/<id>-<w>.png,
//          /audit/state/<name>.png, and /audit/overflow-report.json
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "audit");
const BASE = process.env.BASE_URL || "http://localhost:3000";

// 8 viewports — the full responsive envelope (§ responsive mandate)
const VIEWPORTS = [
  { w: 320, h: 568, label: "320-iphone-se" },
  { w: 390, h: 844, label: "390-iphone-12" },
  { w: 430, h: 932, label: "430-iphone-pro-max" },
  { w: 768, h: 1024, label: "768-ipad-portrait" },
  { w: 1024, h: 768, label: "1024-ipad-landscape" },
  { w: 1280, h: 800, label: "1280-laptop" },
  { w: 1440, h: 900, label: "1440-desktop" },
  { w: 1920, h: 1080, label: "1920-wide" },
];

// section ids to capture individually (must match component `id`s in page.tsx)
const SECTION_IDS = [
  "work",
  "why",
  "maths",
  "process",
  "deliverables",
  "results",
  "comparison",
  "pricing",
  "guarantee",
  "faq",
];

const clean = () => {
  rmSync(OUT, { recursive: true, force: true });
  for (const d of ["full", "section", "state"]) mkdirSync(join(OUT, d), { recursive: true });
};

async function overflowAt(page) {
  return page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    const offenders = [];
    if (docW > winW) {
      // find the widest elements that breach the viewport
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.right > winW + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.toString().slice(0, 80)) || "",
            right: Math.round(r.right),
            left: Math.round(r.left),
          });
        }
      }
    }
    return { docW, winW, overflow: docW > winW, offenders: offenders.slice(0, 12) };
  });
}

const run = async () => {
  clean();
  const browser = await chromium.launch();
  const report = { base: BASE, results: [], failures: [] };

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
    // let entrance/CSS sequences settle
    await page.waitForTimeout(1200);

    const of = await overflowAt(page);
    report.results.push({ width: vp.w, ...of });
    const badge = of.overflow ? "❌ OVERFLOW" : "✓ ok";
    console.log(`  ${badge}  ${vp.w}px  doc=${of.docW} win=${of.winW}`);
    if (of.overflow) {
      report.failures.push({ width: vp.w, ...of });
      for (const o of of.offenders) console.log(`       ↳ <${o.tag} class="${o.cls}"> right=${o.right}`);
    }

    await page.screenshot({ path: join(OUT, "full", `${vp.label}.png`), fullPage: true });

    // per-section (only meaningful on a subset of widths to keep it fast)
    if ([390, 768, 1280, 1920].includes(vp.w)) {
      for (const id of SECTION_IDS) {
        const el = page.locator(`#${id}`).first();
        if ((await el.count()) > 0) {
          try {
            await el.scrollIntoViewIfNeeded();
            await page.waitForTimeout(250);
            await el.screenshot({ path: join(OUT, "section", `${id}-${vp.w}.png`) });
          } catch {
            /* element not screenshottable at this width — skip */
          }
        }
      }
    }
    await ctx.close();
  }

  // interaction states at a representative desktop + mobile width
  for (const vp of [{ w: 1280, h: 800 }, { w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // FAQ: open first item
    const faq = page.locator("#faq button").first();
    if ((await faq.count()) > 0) {
      await faq.scrollIntoViewIfNeeded();
      await faq.click().catch(() => {});
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(OUT, "state", `faq-open-${vp.w}.png`) });
    }

    // Nav scrolled state
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(OUT, "state", `nav-scrolled-${vp.w}.png`) });
    await ctx.close();
  }

  await browser.close();
  writeFileSync(join(OUT, "overflow-report.json"), JSON.stringify(report, null, 2));

  console.log("\n" + "=".repeat(52));
  if (report.failures.length) {
    console.log(`❌ OVERFLOW FAILURES at ${report.failures.length} width(s): ${report.failures.map((f) => f.width + "px").join(", ")}`);
    console.log("   See audit/overflow-report.json. Fix before shipping.");
    process.exitCode = 1;
  } else {
    console.log("✓ ZERO horizontal overflow across all 8 widths (320→1920).");
  }
  console.log(`   Shots written to /audit. Base: ${BASE}`);
};

run().catch((e) => {
  console.error("screenshot run failed:", e);
  process.exit(1);
});
