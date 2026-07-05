import Canvas from "@/components/ui/Canvas";
import TeamPhoto from "@/components/ui/TeamPhoto";
import TeamVideoPoster from "@/components/ui/TeamVideoPoster";

/**
 * DESIGN.md §9 [11] MEET THE TEAM — a mist-canvas bento: an intro tile, a tall
 * click-to-play social video tile, and five member portrait tiles (placeholders
 * that accept a real /public/images/team/member-0X.jpg with zero code change).
 * DOM order (intro → video → members) is the mobile stack; lg uses explicit
 * 12-col placement for the balanced bento.
 */

// TODO:REAL-DATA member photo + name + role (names kept literal "Name")
const MEMBERS = [
  { role: "Founder", img: "/images/team/member-01.jpg", place: "lg:col-start-6 lg:col-span-2 lg:row-start-1" },
  { role: "Creative Lead", img: "/images/team/member-02.jpg", place: "lg:col-start-8 lg:col-span-2 lg:row-start-1" },
  { role: "AI Video Specialist", img: "/images/team/member-03.jpg", place: "lg:col-start-1 lg:col-span-3 lg:row-start-2" },
  { role: "Strategist", img: "/images/team/member-04.jpg", place: "lg:col-start-4 lg:col-span-3 lg:row-start-2" },
  { role: "Editor", img: "/images/team/member-05.jpg", place: "lg:col-start-7 lg:col-span-3 lg:row-start-2" },
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        {/* intro */}
        <div className="flex min-h-[200px] flex-col rounded-frame border border-line bg-bg p-8 md:col-span-2 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <span className="mono-note text-text-3">REDPXL UGC · STUDIO</span>
          <h3 className="title-1 mt-3 text-[28px] leading-tight">
            The people behind the work.
          </h3>
          <p className="body-copy mt-3 max-w-[46ch]">
            A small team of designers, strategists and AI creative specialists,
            obsessed with ads that actually convert.
          </p>
          <span className="mono-note mt-auto pt-8 text-text-3">
            CANARY WHARF, LONDON · EST. 2024
          </span>
        </div>

        {/* tall social video tile */}
        <div className="relative min-h-[280px] overflow-hidden rounded-frame border border-line bg-bg-inset md:row-span-2 lg:col-start-10 lg:col-span-3 lg:row-span-2 lg:row-start-1">
          <TeamVideoPoster />
        </div>

        {/* five member portraits */}
        {MEMBERS.map((m, i) => (
          <div
            key={i}
            className={`group relative min-h-[200px] overflow-hidden rounded-frame border border-line bg-bg-inset transition-colors duration-[180ms] ease-[var(--ease-out)] hover:border-line-hover ${m.place}`}
          >
            <div className="absolute inset-0 transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
              <TeamPhoto src={m.img} />
            </div>
            <div className="absolute inset-x-2 bottom-2 rounded-chip bg-white/[0.92] px-2.5 py-1.5">
              <div className="title-2 leading-tight text-ink">Name</div>
              <div className="mono-note text-text-2">{m.role}</div>
            </div>
          </div>
        ))}
      </div>
    </Canvas>
  );
}
