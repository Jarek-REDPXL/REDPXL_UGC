// DESIGN.md §9 [—] LOGO STRIP + §8.11 — connective tissue: no annotation row,
// no border/divider. A centred trust line above a seamless wordmark marquee.

const WORDMARKS = [
  "NORTHWIND",
  "LUMEN",
  "AVELINE",
  "CORE&CO",
  "PIXELWARE",
  "MERIDIAN",
  "HALOGEN",
  "VERAX",
];

// TODO:REAL-DATA placeholder client metrics — swap for verified numbers.
// A .stat-chip (white pill, 1px line, mono-note metric) rides beside these
// three wordmarks in both marquee passes so the loop stays seamless.
const CHIPS: Record<string, string> = {
  LUMEN: "+212% ROAS",
  MERIDIAN: "−38% CPA",
  VERAX: "72H DELIVERY",
};

function MarqueePass({ hidden }: { hidden?: boolean }) {
  return (
    <>
      {WORDMARKS.map((name) => (
        <div
          key={`${hidden ? "b" : "a"}-${name}`}
          aria-hidden={hidden ? true : undefined}
          className="flex h-16 items-center"
        >
          <span className="label text-[15px]! text-text-3 opacity-70 whitespace-nowrap mx-7">
            {name}
          </span>
          {CHIPS[name] && (
            <span className="stat-chip -ml-3">
              <span className="mono-note">{CHIPS[name]}</span>
            </span>
          )}
        </div>
      ))}
    </>
  );
}

export default function LogoStrip() {
  return (
    <section className="py-12">
      <div className="container-x">
        <p className="text-[13px] text-text-3 text-center">
          Trusted by brands across e-commerce, apps and FMCG
        </p>
      </div>

      {/* §8.11 — row 64px, 64px gaps, 48px edge fade; track duplicated for a
          seamless loop (second pass aria-hidden). */}
      <div className="mt-6 marquee-viewport mask-fade-x overflow-hidden">
        <div className="marquee-track">
          <MarqueePass />
          <MarqueePass hidden />
        </div>
      </div>
      {/* TODO:REAL-DATA swap for real client SVG logos */}
    </section>
  );
}
