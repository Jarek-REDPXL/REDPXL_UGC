// Generates /public/og.png — a designed 1200x630 social share card, on-brand
// (dark --ink, real REDPXL logo, current copy), rendered with headless Chromium
// so the real Inter font + logo render pixel-perfect. Run: node scripts/make-og.mjs
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const logo = readFileSync("public/logo.webp").toString("base64");
const font = readFileSync("public/fonts/InterVariable.woff2").toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:'Inter';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal;font-display:block}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;font-family:'Inter',sans-serif;
    background:#17181a;
    background-image:
      radial-gradient(60% 95% at 112% 122%, rgba(230,46,46,0.16), transparent 60%),
      radial-gradient(135% 130% at 84% -12%, #202226 0%, #17181a 54%);
  }
  .wrap{width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;padding:76px 88px}
  .logo{height:44px;filter:brightness(0) invert(1)}
  h1{font-size:80px;line-height:1.04;font-weight:600;letter-spacing:-0.032em;color:#ffffff;max-width:860px}
  .sub{margin-top:26px;font-size:30px;line-height:1.42;font-weight:400;letter-spacing:-0.01em;color:#a2a5aa;max-width:900px}
  .tag{display:flex;align-items:center;gap:13px}
  .dot{width:13px;height:13px;border-radius:3px;background:#e62e2e}
  .tag span{font-size:18px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#7e8187}
</style></head><body><div class="wrap">
  <div><img class="logo" src="data:image/webp;base64,${logo}" alt=""></div>
  <div>
    <h1>Never run a tired ad again.</h1>
    <p class="sub">15&ndash;30 fresh, scroll-stopping UGC ads a month, delivered in 72 hours.</p>
  </div>
  <div class="tag"><span class="dot"></span><span>AI UGC video ads &middot; done for you</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("wrote public/og.png (1200x630)");
