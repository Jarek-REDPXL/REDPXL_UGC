import CyclingCaption from "./CyclingCaption";

/**
 * DESIGN.md §12 — PosterCanvas.
 * A designed placeholder for a src-less VideoSlot: a quiet per-niche duotone,
 * a UGC caption/progress overlay, and a faint film-grain layer. Makes the reel
 * and hero read as a wall of real, varied content rather than empty boxes.
 *
 * Pure server component (no hydration): the ~24 posters across the reel + hero
 * render as static markup. Only when `cycleHooks` is passed (the single hero
 * middle phone) does a tiny CyclingCaption client island mount for the cycling
 * top line. All poster hexes are CSS vars in globals.css (§11 — hex-free).
 */

type Niche =
  | "skincare"
  | "fitness"
  | "fashion"
  | "beauty"
  | "food"
  | "supplements"
  | "app"
  | "pet"
  | "home"
  | "default";

function nicheFromChip(chip: string): Niche {
  const subject = chip.split("·")[0].trim().toLowerCase();
  if (subject.includes("skincare")) return "skincare";
  if (subject.includes("fitness")) return "fitness";
  if (subject.includes("fashion")) return "fashion";
  if (subject.includes("beauty")) return "beauty";
  if (subject.includes("food")) return "food";
  if (subject.includes("supplement")) return "supplements";
  if (subject.includes("pet")) return "pet";
  if (subject.includes("home")) return "home";
  if (subject.includes("app") || subject.includes("saas")) return "app";
  return "default";
}

const CAPTIONS: Record<Niche, [string, string]> = {
  skincare: ["POV: I finally fixed my skin", "the routine that actually worked"],
  fitness: ["POV: 12 weeks, no gym", "what I changed first"],
  fashion: ["the fit everyone asks about", "3 ways to style it"],
  beauty: ["this took five minutes", "the one product I rebuy"],
  food: ["the 10-minute version", "save this for later"],
  supplements: ["I stopped feeling tired", "what moved the needle"],
  app: ["I automated the boring part", "watch how fast this is"],
  pet: ["my dog is obsessed", "the one thing that worked"],
  home: ["this changed my space", "before vs after"],
  default: ["POV: you found the one", "wait for the results"],
};

// deterministic (SSR-safe) hash → progress width 30–70%
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const capClass =
  "mono-note rounded-[4px] bg-black/35 px-1.5 py-0.5 text-[10px]! leading-tight";

export default function PosterCanvas({
  chip,
  cycleHooks,
}: {
  chip: string;
  /** if provided (hero middle phone), the top caption crossfades through these */
  cycleHooks?: string[];
}) {
  const niche = nicheFromChip(chip);
  const [line1, line2] = CAPTIONS[niche];
  const progress = 30 + (hash(chip) % 41);
  const cycling = !!cycleHooks && cycleHooks.length > 1;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* per-niche duotone */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(125% 120% at 50% 22%, var(--poster-${niche}-1), var(--poster-${niche}-2))`,
        }}
      />

      {/* film grain — cheap cached tiled raster (see globals .grain-tex) */}
      <div className="grain-tex absolute inset-0 opacity-[0.05]" />

      {/* UGC caption overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
        <div className="flex">
          {cycling ? (
            <CyclingCaption hooks={cycleHooks!} className={`${capClass} text-white`} />
          ) : (
            <span className={`${capClass} text-white`}>{line1}</span>
          )}
        </div>
        <div className="flex">
          <span className={`${capClass} text-white/90`}>{line2}</span>
        </div>

        {/* progress bar */}
        <div className="mt-1.5 h-0.5 w-full rounded-full bg-white/25">
          <div
            className="h-0.5 rounded-full bg-white/70"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
