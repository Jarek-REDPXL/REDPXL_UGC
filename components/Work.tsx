import PhoneFrame from "@/components/ui/PhoneFrame";
import Reveal from "@/components/Reveal";

// 10 marquee slots. Each blank phone plays /public/videos/work-0X.mp4 if the
// file exists, otherwise shows a clean --bg-inset screen. TODO:REAL-DATA.
const SLOTS = Array.from(
  { length: 10 },
  (_, i) => `/videos/work-${String(i + 1).padStart(2, "0")}.mp4`
);

// shared width + arc stagger for every marquee phone (bigger than v1: ~260 desktop)
const PHONE = "shrink-0 w-[200px] md:w-[230px] lg:w-[260px] mx-2.5";

/**
 * DESIGN.md §9 [02] THE WORK + §15 — a full-bleed white band carrying an
 * infinite PhoneFrame reel (the same PhoneFrame as the hero). The annotation
 * row, title and sub stay content-aligned; the reel bleeds edge-to-edge. The ten
 * blank frames render twice (second pass aria-hidden) so the pure-CSS
 * `.reel-track` loop is seamless. No client hooks — reduced motion is CSS-only.
 */
export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="section-y [content-visibility:auto] [contain-intrinsic-size:auto_720px]"
    >
      <div className="content-x">
        <Reveal>
          {/* §6.1 annotation row — [02] pill matches the canvas pill style */}
          <div className="flex items-baseline gap-4">
            <span className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="anno-pill mono-idx">[02]</span>
              <span className="mono-note text-text-3">THE WORK</span>
            </span>
            <span className="h-px flex-1 self-center bg-line" aria-hidden />
            <span className="mono-note hidden whitespace-nowrap min-[380px]:inline">
              / WORK IN PROGRESS · LOOPING
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
          left→right loop; motion is pure CSS (.reel-track). Blank screens await
          real video (work-01…10.mp4). */}
      <div className="reel-viewport mask-fade-x overflow-hidden mt-12">
        <div className="reel-track">
          {SLOTS.map((src, i) => (
            <div key={`a-${i}`} className={`${PHONE} ${i % 2 === 1 ? "translate-y-3" : ""}`}>
              <PhoneFrame blank src={src} />
            </div>
          ))}
          {SLOTS.map((src, i) => (
            <div
              key={`b-${i}`}
              aria-hidden
              className={`${PHONE} ${i % 2 === 1 ? "translate-y-3" : ""}`}
            >
              <PhoneFrame blank src={src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
