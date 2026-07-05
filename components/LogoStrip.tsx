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

export default function LogoStrip() {
  return (
    <section className="py-12">
      <div className="container-x">
        <p className="text-[13px] text-text-3 text-center">
          Trusted by brands across e-commerce, apps and FMCG
        </p>
      </div>

      {/* §8.11 — row 56px, 64px gaps, 48px edge fade; track duplicated for a
          seamless loop (second pass aria-hidden). */}
      <div className="mt-6 marquee-viewport mask-fade-x overflow-hidden">
        <div className="marquee-track">
          {WORDMARKS.map((name) => (
            <div key={`a-${name}`} className="flex h-14 items-center">
              <span className="label text-[15px]! text-text-3 opacity-70 whitespace-nowrap mx-7">
                {name}
              </span>
            </div>
          ))}
          {WORDMARKS.map((name) => (
            <div
              key={`b-${name}`}
              aria-hidden={true}
              className="flex h-14 items-center"
            >
              <span className="label text-[15px]! text-text-3 opacity-70 whitespace-nowrap mx-7">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* TODO:REAL-DATA swap for real client SVG logos */}
    </section>
  );
}
