import Image from "next/image";
import Canvas from "@/components/ui/Canvas";
import TeamPhoto from "@/components/ui/TeamPhoto";
import TeamSocialVideo from "@/components/ui/TeamSocialVideo";

/**
 * DESIGN.md §9 [11] MEET THE TEAM — a blush-canvas bento. An 11-column grid:
 * Row 1 = wide intro banner (6) + Zain's portrait (2); Row 2 = Hendrix, Reis,
 * Maya, Jarek (2 each = 8); a tall social-video tile (col-span-3, ~9:16) spans
 * both rows on the far right. 6+2+3 = 8+3 = 11, so it tessellates with no gaps.
 * First-name labels. DOM order (intro → video → members) is the small stack.
 */

// Real team, first-name only. Zain leads the top row beside the intro.
const MEMBERS = [
  { name: "Zain", role: "Founder", img: "/images/team/zain.png", place: "lg:col-start-7 lg:row-start-1" },
  { name: "Hendrix", role: "Creative Director", img: "/images/team/hendrix.png", place: "lg:col-start-1 lg:row-start-2" },
  { name: "Reis", role: "Creative Producer", img: "/images/team/reis.png", place: "lg:col-start-3 lg:row-start-2" },
  { name: "Maya", role: "Storyteller", img: "/images/team/maya.png", place: "lg:col-start-5 lg:row-start-2" },
  { name: "Jarek", role: "Platform Technologist", img: "/images/team/jarek.png", place: "lg:col-start-7 lg:row-start-2" },
];

export default function MeetTheTeam() {
  return (
    <Canvas
      id="team"
      idx="11"
      name="MEET THE TEAM"
      note="THE PEOPLE BEHIND THE WORK"
      tint="blush"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-11">
        {/* Intro — wide banner, row 1, over the Canary Wharf skyline with a dark
            --ink scrim + gradient so the white text stays AA-readable. */}
        <div className="relative flex flex-col justify-center overflow-hidden rounded-frame border border-line p-6 sm:p-7 md:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <Image
            src="/images/team/canarywharf.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="z-0 object-cover object-center"
          />
          <div className="absolute inset-0 z-0 bg-ink/70" />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-ink/50 to-ink/15" />

          <div className="relative z-10">
            <span className="mono-note block text-white/70">REDPXL UGC · STUDIO</span>
            <h3 className="title-1 mt-3 text-balance text-[26px] leading-tight text-white">
              The people behind the work.
            </h3>
            <p className="body-copy mt-3 max-w-[46ch] text-white/85">
              A small team of designers, strategists and AI creative specialists,
              obsessed with ads that actually convert.
            </p>
            <span className="mono-note mt-4 block text-white/60">
              CANARY WHARF, LONDON · EST. 2024
            </span>
          </div>
        </div>

        {/* Tall social-video tile — col-span-3 (cols 9-11), spans both rows on
            lg and takes the grid height (~9:16); the video fills it (cover). */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-frame border border-line bg-bg-inset lg:col-span-3 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:aspect-auto">
          <TeamSocialVideo />
        </div>

        {/* Five square portraits: Zain (row 1) + four across row 2 */}
        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className={`group flex flex-col overflow-hidden rounded-frame border border-line bg-bg transition-colors duration-[180ms] ease-[var(--ease-out)] hover:border-line-hover lg:col-span-2 ${m.place}`}
          >
            <div className="relative aspect-square overflow-hidden bg-bg-inset">
              <div className="absolute inset-0 transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
                <TeamPhoto src={m.img} alt={`${m.name}, ${m.role} at REDPXL`} />
              </div>
            </div>
            <div className="px-3.5 py-3">
              <div className="title-2 leading-tight text-ink">{m.name}</div>
              <div className="mono-note mt-0.5 text-text-2">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Canvas>
  );
}
