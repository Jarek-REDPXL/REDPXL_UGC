import Canvas from "@/components/ui/Canvas";
import TeamPhoto from "@/components/ui/TeamPhoto";
import TeamVideoPoster from "@/components/ui/TeamVideoPoster";

/**
 * DESIGN.md §9 [11] MEET THE TEAM — a mist-canvas bento. Every member is a real
 * team card: a 3:4 portrait (accepting /public/images/team/member-0X.jpg with
 * zero code change; --bg-inset + User placeholder otherwise) with the name/role
 * beneath it. lg is a clean 4-column grid (all portraits equal 3:4): intro + two
 * portraits on row 1, three portraits on row 2, and a tall social-video tile
 * spanning both rows on the right. DOM order (intro → members → video) is the
 * mobile stack.
 */

// TODO:REAL-DATA member photo + name + role (names kept literal "Name")
const MEMBERS = [
  { role: "Founder", img: "/images/team/member-01.jpg", place: "lg:col-start-4 lg:row-start-1" },
  { role: "Creative Lead", img: "/images/team/member-02.jpg", place: "lg:col-start-7 lg:row-start-1" },
  { role: "AI Video Specialist", img: "/images/team/member-03.jpg", place: "lg:col-start-1 lg:row-start-2" },
  { role: "Strategist", img: "/images/team/member-04.jpg", place: "lg:col-start-4 lg:row-start-2" },
  { role: "Editor", img: "/images/team/member-05.jpg", place: "lg:col-start-7 lg:row-start-2" },
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* intro */}
        <div className="flex flex-col rounded-frame border border-line bg-bg p-6 sm:col-span-2 lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <span className="mono-note text-text-3">REDPXL UGC · STUDIO</span>
          <h3 className="title-1 mt-3 text-[26px] leading-tight">
            The people behind the work.
          </h3>
          <p className="body-copy mt-3">
            A small team of designers, strategists and AI creative specialists,
            obsessed with ads that actually convert.
          </p>
          <span className="mono-note mt-auto pt-6 text-text-3">
            CANARY WHARF, LONDON · EST. 2024
          </span>
        </div>

        {/* member cards: 3:4 portrait + name/role beneath */}
        {MEMBERS.map((m, i) => (
          <div
            key={i}
            className={`group flex flex-col overflow-hidden rounded-frame border border-line bg-bg transition-colors duration-[180ms] ease-[var(--ease-out)] hover:border-line-hover lg:col-span-3 ${m.place}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-bg-inset">
              <div className="absolute inset-0 transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
                <TeamPhoto src={m.img} />
              </div>
            </div>
            <div className="px-3.5 py-3">
              <div className="title-2 leading-tight text-ink">Name</div>
              <div className="mono-note mt-0.5 text-text-2">{m.role}</div>
            </div>
          </div>
        ))}

        {/* tall social video tile — spans both portrait rows on lg */}
        <div className="relative aspect-[9/16] overflow-hidden rounded-frame border border-line bg-bg-inset sm:col-span-1 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:aspect-auto">
          <TeamVideoPoster />
        </div>
      </div>
    </Canvas>
  );
}
