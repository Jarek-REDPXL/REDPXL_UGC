import { Annotation } from "./ui/Section";
import Button from "./ui/Button";
import PhoneFrame from "./ui/PhoneFrame";
import BatchCaption from "./BatchCaption";
import { site } from "@/lib/site";

// hero middle-phone caption cycles through these (client PosterCanvas)
const HERO_HOOKS = [
  "POV: I finally found the one",
  "stop scrolling if you need this",
  "3 reasons your ads flop",
];

// Attio-style corner ticks on the hero frame
const CORNERS = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
];

function CornerTick({ className }: { className: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      aria-hidden
      className={`absolute text-text-3 ${className}`}
    >
      <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Server component. The load sequence (§7.2) is CSS (`hero-rise`, staggered via
 * animation-delay) so the LCP text is server-rendered and painted at first
 * paint — never gated behind JS hydration. Only the poster subtree and the
 * batch-number caption are client islands.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="container-x grid grid-cols-1 items-center gap-12 pb-24 pt-16 lg:grid-cols-[7fr_5fr] lg:gap-16">
        {/* Left column — server-rendered text, CSS staggered rise */}
        <div>
          <div className="hero-rise" style={{ animationDelay: "0.05s" }}>
            <Annotation
              idx="00"
              name="AI UGC video ads — done for you"
              labelId="hero-title"
            />
          </div>

          <h1
            id="hero-title"
            className="display-1 mt-5 hero-rise"
            style={{ animationDelay: "0.14s" }}
          >
            UGC ads engineered to convert.
          </h1>

          <p
            className="body-lg mt-3 hero-rise"
            style={{ animationDelay: "0.23s" }}
          >
            Hyper-realistic AI-generated video and static ads for your brand.
            Scripted with proven direct-response hooks, delivered in 72 hours,
            ready for TikTok, Meta and YouTube.
          </p>

          <div
            className="mt-8 flex flex-col gap-4 hero-rise sm:flex-row sm:items-center"
            style={{ animationDelay: "0.32s" }}
          >
            <Button href={site.bookingUrl} external variant="primary">
              Book a free strategy call
            </Button>
            <Button href="#work" variant="secondary">
              See the work →
            </Button>
          </div>
        </div>

        {/* Right column — hero frame */}
        <div
          className="w-full hero-rise-slow"
          style={{ animationDelay: "0.41s" }}
        >
          <div className="relative rounded-frame border border-line bg-bg p-6 shadow-[var(--shadow-frame)]">
            {CORNERS.map((c) => (
              <CornerTick key={c} className={c} />
            ))}

            {/* desktop: 3-phone cluster (§8.4); middle phone caption cycles */}
            <div className="hidden items-center justify-center sm:flex">
              {/* TODO:REAL-DATA drop MP4s in /public/videos and pass src */}
              <PhoneFrame
                chip="FITNESS · REELS"
                className="-mr-6 w-[200px] -rotate-[2.5deg] lg:w-[220px]"
              />
              <PhoneFrame
                chip="SKINCARE · TIKTOK"
                cycleHooks={HERO_HOOKS}
                className="relative z-10 w-[220px] -translate-y-3 lg:w-[240px]"
              />
              <PhoneFrame
                chip="SAAS · YOUTUBE"
                className="-ml-6 w-[200px] rotate-[2deg] lg:w-[220px]"
              />
            </div>

            {/* mobile: 2 phones, no rotation */}
            <div className="flex items-center justify-center gap-4 sm:hidden">
              <PhoneFrame
                chip="SKINCARE · TIKTOK"
                cycleHooks={HERO_HOOKS}
                className="w-[150px]"
              />
              <PhoneFrame chip="SAAS · YOUTUBE" className="w-[150px]" />
            </div>
          </div>

          <BatchCaption />
        </div>
      </div>
    </section>
  );
}
