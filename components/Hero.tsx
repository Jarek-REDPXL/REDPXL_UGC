import Button from "./ui/Button";
import WhatsAppButton from "./ui/WhatsAppButton";
import PhoneFrame from "./ui/PhoneFrame";
import type { EditorialSpec } from "./ui/VideoSlot";

// center phone: its two-chip caption crossfades through these
const CENTER_SETS = [
  { hook: "THE £40 AD THAT SOLD OUT", meta: "30S · HOOK: BENEFIT STACK" },
  { hook: "STOP SCROLLING, START SELLING", meta: "28S · HOOK: PATTERN INTERRUPT" },
  { hook: "3 REASONS YOUR ADS FLOP", meta: "26S · HOOK: LISTICLE" },
];

type HeroPhone = {
  chip: string; // aria label only (editorial hides the visible niche chip)
  editorial: EditorialSpec;
  /** responsive width + arc step-down (margin-top); outer pair hidden < lg */
  wrap: string;
  z: number;
  delay: string;
};

// Video file number per phone position (left → right). Reordered from the
// natural 1-5 so the arc plays Main Hero (1)(4)(3)(5)(2).
const VIDEO_ORDER = [1, 4, 3, 5, 2];

// left → right; variants a–e, palettes sand/mist/cream/blush/sage.
// Each phone plays /public/videos/Main Hero (1…5).mp4; the editorial poster is
// the fallback if a video fails to load.
const PHONES: HeroPhone[] = [
  {
    chip: "Skincare editorial ad",
    editorial: { variant: "leaf", palette: "sand", hook: "HYDRATION THAT LASTS", meta: "30S · HOOK: PROBLEM" },
    wrap: "hidden lg:block w-[224px] xl:w-[264px] mt-16 xl:mt-24",
    z: 10,
    delay: "0.58s",
  },
  {
    chip: "Fitness editorial ad",
    editorial: { variant: "smear", palette: "mist", hook: "12 WEEKS, NO GYM", meta: "25S · HOOK: TRANSFORMATION" },
    wrap: "w-[176px] md:w-[208px] lg:w-[248px] xl:w-[288px] mt-8 lg:mt-12",
    z: 20,
    delay: "0.50s",
  },
  {
    chip: "Skincare editorial ad",
    editorial: {
      variant: "sphere",
      palette: "cream",
      hook: "THE £40 AD THAT SOLD OUT",
      meta: "30S · HOOK: BENEFIT STACK",
      cycleSets: CENTER_SETS,
    },
    wrap: "w-[200px] md:w-[236px] lg:w-[272px] xl:w-[312px]",
    z: 30,
    delay: "0.42s",
  },
  {
    chip: "Beauty editorial ad",
    editorial: { variant: "ripple", palette: "blush", hook: "CLEAN SKIN, NO COMPROMISES", meta: "27S · HOOK: OBJECTION" },
    wrap: "w-[176px] md:w-[208px] lg:w-[248px] xl:w-[288px] mt-8 lg:mt-12",
    z: 20,
    delay: "0.50s",
  },
  {
    chip: "Supplements editorial ad",
    editorial: { variant: "gel", palette: "sage", hook: "DAILY CARE, REAL RESULTS", meta: "20S · HOOK: REMINDER" },
    wrap: "hidden lg:block w-[224px] xl:w-[264px] mt-16 xl:mt-24",
    z: 10,
    delay: "0.58s",
  },
];

/**
 * DESIGN.md §9 [00] — HERO "Centered Monument". Open white (no frame, no
 * canvas). Centered annotation → H1 → sub → CTAs, then a full-bleed arc of 5
 * editorial PhoneFrames (center largest + highest, stepped down and edge-cropped
 * outward, bottoms bleeding out of the section). Server component; the CSS
 * `hero-rise` / `phone-rise` load sequence keeps the LCP text server-rendered.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip pt-12">
      <div className="container-x flex flex-col items-center text-center">
        {/* annotation pill */}
        <span
          className="hero-rise inline-flex items-center rounded-full border border-line bg-bg-subtle px-4 py-1.5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="mono-note">AI UGC VIDEO ADS · DONE FOR YOU</span>
        </span>

        {/* H1 — one line at >=1280, balances to two below */}
        <h1
          id="hero-title"
          className="display-1 hero-rise mx-auto mt-6 max-w-[1120px] text-balance text-[clamp(2.5rem,5.3vw,3.9rem)]"
          style={{ animationDelay: "0.14s" }}
        >
          UGC ads engineered to convert.
        </h1>

        {/* sub */}
        <p
          className="body-lg hero-rise mx-auto mt-5 max-w-[620px] text-center"
          style={{ animationDelay: "0.23s" }}
        >
          Hyper-realistic AI-generated video and static ads for your brand.
          Scripted with proven direct-response hooks, delivered in 72 hours,
          ready for TikTok, Meta and YouTube.
        </p>

        {/* CTAs */}
        <div
          className="hero-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          style={{ animationDelay: "0.32s" }}
        >
          <WhatsAppButton className="w-full sm:w-auto" />
          <Button href="#work" variant="secondary" className="w-full sm:w-auto">
            See the work →
          </Button>
        </div>
      </div>

      {/* THE PHONE ARC — full-bleed, clips horizontally + crops phone bottoms */}
      <div className="relative mt-16 h-[320px] w-full overflow-hidden sm:h-[400px] lg:h-[460px] xl:h-[500px]">
        <div className="flex items-start justify-center">
          {PHONES.map((p, i) => (
            <div
              key={i}
              className={`phone-rise -mx-1.5 shrink-0 ${p.wrap}`}
              style={{ zIndex: p.z, animationDelay: p.delay }}
            >
              {/* real videos, left → right (spaces encoded); just video, no caption */}
              <PhoneFrame
                chip={p.chip}
                editorial={p.editorial}
                src={`/videos/Main%20Hero%20(${VIDEO_ORDER[i]}).mp4`}
                hideCaption
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
