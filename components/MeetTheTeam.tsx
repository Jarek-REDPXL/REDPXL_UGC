import Canvas from "@/components/ui/Canvas";
import TeamPhoto from "@/components/ui/TeamPhoto";
import TeamSocialVideo from "@/components/ui/TeamSocialVideo";

/**
 * DESIGN.md §9 [11] MEET THE TEAM — a mist-canvas bento with real size
 * hierarchy. A 10-column grid tessellates a filled rectangle: a WIDE-short
 * intro banner (col-span-6, row 1), a TALL social-video tile (col-span-2,
 * row-span-2) anchoring the right, and FIVE equal medium portraits
 * (col-span-2 each) wrapping the remaining space — one beside the intro on
 * row 1, four across row 2. No empty cells, no lonely columns.
 *
 * DOM order (intro → video → members) is the small-screen stack. md collapses
 * to a uniform 2-col grid (intro full-width, then video + portraits as equal
 * 3:4 tiles); base is a single column.
 */

// Real team, prominent-first (Zain leads the top row beside the intro).
const MEMBERS = [
  { name: "Zain", role: "Director", img: "/images/team/zain.png", place: "lg:col-start-7 lg:row-start-1" },
  { name: "Hendrix", role: "Creative Director", img: "/images/team/hendrix.png", place: "lg:col-start-1 lg:row-start-2" },
  { name: "Reis Williams", role: "Project Manager", img: "/images/team/reis.png", place: "lg:col-start-3 lg:row-start-2" },
  { name: "Maya", role: "Story Teller", img: "/images/team/maya.png", place: "lg:col-start-5 lg:row-start-2" },
  { name: "Jarek", role: "Tool Developer", img: "/images/team/jarek.png", place: "lg:col-start-7 lg:row-start-2" },
];

export default function MeetTheTeam() {
  return (
    <Canvas
      id="team"
      idx="11"
      name="MEET THE TEAM"
      note="THE PEOPLE BEHIND THE WORK"
      tint="mist"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-10">
        {/* Intro — wide, short banner (col-span-6, one portrait-row tall) */}
        <div className="flex flex-col justify-center rounded-frame border border-line bg-bg p-6 sm:p-7 md:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <span className="mono-note text-text-3">REDPXL UGC · STUDIO</span>
          <h3 className="title-1 mt-3 text-[26px] leading-tight text-balance">
            The people behind the work.
          </h3>
          <p className="body-copy mt-3 max-w-[46ch]">
            A small team of designers, strategists and AI creative specialists,
            obsessed with ads that actually convert.
          </p>
          <span className="mono-note mt-4 text-text-3">
            CANARY WHARF, LONDON · EST. 2024
          </span>
        </div>

        {/* Tall social-video tile — anchors the right, spans both portrait rows */}
        <div className="relative aspect-[9/16] overflow-hidden rounded-frame border border-line bg-bg-inset md:aspect-[3/4] lg:col-span-2 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:aspect-auto">
          <TeamSocialVideo />
        </div>

        {/* Five equal medium portraits: 3:4 photo + name/role beneath */}
        {MEMBERS.map((m, i) => (
          <div
            key={i}
            className={`group flex flex-col overflow-hidden rounded-frame border border-line bg-bg transition-colors duration-[180ms] ease-[var(--ease-out)] hover:border-line-hover lg:col-span-2 ${m.place}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-bg-inset">
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
