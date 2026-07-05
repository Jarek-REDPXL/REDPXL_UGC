import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 320, height: 568 } });
const p = await ctx.newPage();
await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
await p.waitForTimeout(800);
const res = await p.evaluate(() => {
  const win = window.innerWidth;
  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > win + 0.5) {
      let clipped = false, a = el.parentElement;
      while (a) {
        const s = getComputedStyle(a);
        if (["hidden", "clip", "scroll", "auto"].includes(s.overflowX)) { clipped = true; break; }
        a = a.parentElement;
      }
      if (!clipped) out.push({ tag: el.tagName.toLowerCase(), cls: (el.className || "").toString().slice(0, 70), right: Math.round(r.right), w: Math.round(r.width), text: (el.textContent || "").trim().slice(0, 50) });
    }
  }
  return { win, docW: document.documentElement.scrollWidth, offenders: out.slice(0, 15) };
});
console.log("win", res.win, "docW", res.docW);
res.offenders.forEach((o) => console.log(`  right=${o.right}\t w=${o.w}\t<${o.tag} ${o.cls}>`));
await b.close();
