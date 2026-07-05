import PhoneFrame from "@/components/ui/PhoneFrame";
import Reveal from "@/components/Reveal";

// DESIGN.md §9 [02] THE WORK + §15 — 10 niches, chip format SUBJECT · PLATFORM.
const CHIPS = [
  "SKINCARE · TIKTOK",
  "SUPPLEMENTS · META",
  "FASHION · TIKTOK",
  "MOBILE APP · META",
  "BEAUTY · TIKTOK",
  "FITNESS · REELS",
  "FOOD & BEV · TIKTOK",
  "SAAS · YOUTUBE",
  "PET CARE · TIKTOK",
  "HOME & LIVING · REELS",
];

/**
 * DESIGN.md §9 [02] THE WORK + §15 — a full-bleed white band carrying an
 * infinite PhoneFrame reel. The annotation row, title and sub stay inside the
 * 1152px container; the reel bleeds edge-to-edge. The ten frames render twice
 * (second pass aria-hidden) so the pure-CSS `.reel-track` loop is seamless.
 * No client hooks — reduced motion is handled entirely in CSS.
 */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-y [content-visibility:auto] [contain-intrinsic-size:auto_720px]"
    >
      <div className="container-x">
        <Reveal>
          {/* §6.1 annotation row — [02] pill matches the canvas pill style */}
          <div className="flex items-baseline gap-4">
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="anno-pill mono-idx">[02]</span>
              <span className="mono-note text-text-3">THE WORK</span>
            </span>
            <span className="h-px flex-1 self-center bg-line" aria-hidden />
            <span className="mono-note hidden whitespace-nowrap min-[380px]:inline">
              / 10 NICHES · LOOPING
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 id="work-title" className="display-2 mt-5">
            Made to stop the scroll.
          </h2>
        </Reveal>

        <Reveal>
          <p className="body-lg mt-3">
            See it, then judge it. Most people can&apos;t tell it&apos;s AI. On
            paid social, native beats polished.
          </p>
        </Reveal>
      </div>

      {/* §15 full-bleed infinite reel — track rendered twice for a seamless
          left→right loop; motion is pure CSS (.reel-track). */}
      {/* TODO:REAL-DATA drop MP4s in /public/videos and pass src to PhoneFrame */}
      <div className="reel-viewport mask-fade-x overflow-hidden mt-12">
        <div className="reel-track">
          {CHIPS.map((chip, i) => (
            <div
              key={`a-${chip}`}
              className={`shrink-0 w-[200px] mx-2.5 ${
                i % 2 === 1 ? "translate-y-3" : ""
              }`}
            >
              <PhoneFrame chip={chip} />
            </div>
          ))}
          {CHIPS.map((chip, i) => (
            <div
              key={`b-${chip}`}
              aria-hidden
              className={`shrink-0 w-[200px] mx-2.5 ${
                i % 2 === 1 ? "translate-y-3" : ""
              }`}
            >
              <PhoneFrame chip={chip} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
