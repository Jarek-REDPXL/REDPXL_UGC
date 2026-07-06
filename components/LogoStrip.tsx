// DESIGN.md §9 [—] LOGO STRIP + §8.11 — connective tissue: no annotation row,
// no border/divider. An honest, category-led positioning line.
//
// TODO:REAL-DATA — the client wordmark marquee (NORTHWIND / LUMEN +212% ROAS,
// etc.) was fabricated placeholder brands + metrics and must NOT ship (trust
// guardrail). It's preserved below for easy restore once real, named clients
// and verified numbers (with real SVG logos) exist:
//
//   const WORDMARKS = ["NORTHWIND","LUMEN","AVELINE","CORE&CO","PIXELWARE",
//     "MERIDIAN","HALOGEN","VERAX"];
//   const CHIPS = { LUMEN: "+212% ROAS", MERIDIAN: "-38% CPA", VERAX: "72H DELIVERY" };
//   function MarqueePass({ hidden }) { ...map WORDMARKS → label + optional stat-chip... }
//   <div className="mt-6 marquee-viewport mask-fade-x overflow-hidden">
//     <div className="marquee-track"><MarqueePass /><MarqueePass hidden /></div>
//   </div>

export default function LogoStrip() {
  return (
    <section className="py-12">
      <div className="container-x">
        <p className="text-[13px] text-text-3 text-center">
          Built for DTC brands running paid on Meta &amp; TikTok
        </p>
      </div>
    </section>
  );
}
