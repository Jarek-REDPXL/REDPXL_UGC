import Canvas from "@/components/ui/Canvas";
import Button from "@/components/ui/Button";
import DyingAdCard from "@/components/graphics/DyingAdCard";
import VolumeGap from "@/components/graphics/VolumeGap";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import { TrendingUp, Factory, FlaskConical } from "lucide-react";
import type { ComponentType } from "react";

/**
 * DESIGN.md §9 [01] — THE PROBLEM (sand canvas). Bento layout: a two-column
 * header, a DyingAdCard + VolumeGap row, three cost tiles, and a footer strip.
 * Supersedes the old FatigueCurve graphic (retired).
 */

const TILES: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}[] = [
  {
    icon: TrendingUp,
    title: "Rising costs",
    body: "When creative fatigues, CPMs and CPAs climb. The algorithm punishes stale ads.",
  },
  {
    icon: Factory,
    title: "Production ceiling",
    body: "Creators, briefs, shipping, reshoots. Traditional UGC can't produce at testing pace.",
  },
  {
    icon: FlaskConical,
    title: "Testing starvation",
    body: "Winners come from volume. 2 to 4 ads a month means you're guessing, not testing.",
  },
];

export default function Problem() {
  return (
    <Canvas id="problem" idx="01" name="THE PROBLEM" note="CREATIVE FATIGUE" tint="sand">
      {/* header row: two-tone headline left, supporting paragraph right */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-baseline">
        <h2 id="problem-title" className="display-2">
          Your winning ad is <span className="title-deep">already dying.</span>
        </h2>
        <p className="body-lg max-w-none">
          The gap between how fast creative fatigues and how fast most brands can
          replace it is where media efficiency quietly disappears.
        </p>
      </div>

      {/* bento row 1: dying-ad card (~55%) + volume gap (~45%), equal heights */}
      <div className="mt-10 grid items-stretch gap-4 lg:mt-12 lg:grid-cols-[1.2fr_1fr]">
        <DyingAdCard />
        <VolumeGap />
      </div>

      {/* bento row 2: three cost tiles */}
      <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <RevealItem key={t.title}>
              <div className="h-full rounded-frame border border-line bg-bg p-6 transition-[transform,border-color] duration-[180ms] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-line-hover">
                <span className="grid h-7 w-7 place-items-center rounded-chip bg-accent-soft">
                  <Icon className="h-4 w-4 text-accent" />
                </span>
                <h3 className="title-1 mt-4">{t.title}</h3>
                <p className="body-copy mt-2">{t.body}</p>
              </div>
            </RevealItem>
          );
        })}
      </StaggerGroup>

      {/* footer strip */}
      <div className="mt-4 flex flex-col gap-5 rounded-frame border border-line bg-bg p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="title-2 text-ink">
          The bottleneck is production. We remove it.
        </p>
        <Button href="#process" variant="primary" className="w-full sm:w-auto">
          See how it works →
        </Button>
      </div>
    </Canvas>
  );
}
