import Canvas from "@/components/ui/Canvas";
import TeamPhoto from "@/components/ui/TeamPhoto";
import TeamSocialVideo from "@/components/ui/TeamSocialVideo";

/**
 * DESIGN.md §9 [11] MEET THE TEAM — a mist-canvas bento. The left column holds a
 * WIDE-short intro banner over a row of five equal square portraits (first-name
 * + role); the right column is a TALL 9:16 social-video tile (no phone chrome —
 * a normal card) that spans the left column's full height, so the 9:16 clip
 * lines up cleanly with the intro + portrait block.
 *
 * lg: left content + video side by side. <lg: single column — intro, portraits
 * (2–3 per row), then the 9:16 video.
 */

// Real team, first-name only, prominent-first.
const MEMBERS = [
  { name: "Zain", role: "Founder", img: "/images/team/zain.png" },
  { name: "Hendrix", role: "Creative Director", img: "/images/team/hendrix.png" },
  { name: "Reis", role: "Project Manager", img: "/images/team/reis.png" },
  { name: "Maya", role: "Story Teller", img: "/images/team/maya.png" },
  { name: "Jarek", role: "Tool Developer", img: "/images/team/jarek.png" },
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_270px] lg:items-stretch">
        {/* LEFT — wide intro banner + row of five portraits */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center rounded-frame border border-line bg-bg p-6 sm:p-7">
            <span className="mono-note text-text-3">REDPXL UGC · STUDIO</span>
            <h3 className="title-1 mt-3 text-balance text-[26px] leading-tight">
              The people behind the work.
            </h3>
            <p className="body-copy mt-3 max-w-[54ch]">
              A small team of designers, strategists and AI creative specialists,
              obsessed with ads that actually convert.
            </p>
            <span className="mono-note mt-4 text-text-3">
              CANARY WHARF, LONDON · EST. 2024
            </span>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {MEMBERS.map((m) => (
              <div
                key={m.name}
                className="group flex flex-col overflow-hidden rounded-frame border border-line bg-bg transition-colors duration-[180ms] ease-[var(--ease-out)] hover:border-line-hover"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-inset">
                  <div className="absolute inset-0 transition-transform duration-[180ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
                    <TeamPhoto src={m.img} alt={`${m.name}, ${m.role} at REDPXL`} />
                  </div>
                </div>
                <div className="px-3 py-2.5">
                  <div className="title-2 leading-tight text-ink">{m.name}</div>
                  <div className="mono-note mt-0.5 text-text-2">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — tall 9:16 social video (no bezel; a normal card) */}
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-frame border border-line bg-bg-inset lg:mx-0 lg:aspect-auto lg:max-w-none">
          <TeamSocialVideo />
        </div>
      </div>
    </Canvas>
  );
}
