import type { ComponentType, ReactNode } from "react";
import Canvas from "@/components/ui/Canvas";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import VolumeCadence from "@/components/graphics/VolumeCadence";
import FormatMorphVideo from "@/components/graphics/FormatMorphVideo";
import SpeedDial from "@/components/graphics/SpeedDial";
import CostLadder from "@/components/graphics/CostLadder";
import { Users, Zap, Clock, Layers, PoundSterling, Smartphone } from "lucide-react";

/**
 * DESIGN.md §8.6 Bento card — white, 1px line, radius 12px, padding 28px.
 * Header row: 28×28 accent-soft tile + 16px lucide icon, then a mono-note
 * micro-label; 16px gap; then card content. Hover lift per §5.
 */
function BentoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="h-full rounded-card border border-line bg-bg p-7 transition-[transform,border-color] duration-[180ms] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-line-hover">
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-chip bg-accent-soft">
          <Icon className="h-4 w-4 text-accent" />
        </span>
        <span className="mono-note">{label}</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * §9/§13 [03] WHY AI UGC — white-border Section Canvas holding the 12-col bento
 * (§4.5). Two tiles carry bespoke §14 graphics: Volume → VariationExploder,
 * Native → FormatMorph. White canvas stays single-tone ink (no titleDeep).
 */
export default function Why() {
  return (
    <Canvas
      id="why"
      idx="03"
      name="WHY AI UGC"
      note="06 REASONS"
      tint="white-border"
      title="Everything creators do. None of what slows you down."
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Wide A — Generation */}
        <RevealItem className="md:col-span-7">
          <BentoCard icon={Users} label="GENERATION">
            <h3 className="title-1">Hyper-realistic creators</h3>
            <p className="body-copy mt-2">
              AI-generated people indistinguishable from filmed UGC. No casting
              calls, no shipping products, no chasing creators for reshoots.
            </p>
          </BentoCard>
        </RevealItem>

        {/* Wide B — Scripting */}
        <RevealItem className="md:col-span-5">
          <BentoCard icon={Zap} label="SCRIPTING">
            <h3 className="title-1">Hooks that convert</h3>
            <p className="body-copy mt-2">
              Every script is built from a library of 50+ proven direct-response
              hook frameworks, not guesswork.
            </p>
            <div className="mt-4 rounded-btn border border-line bg-bg-subtle p-3">
              {[
                "POV: YOU'VE BEEN DOING IT WRONG",
                "STOP SCROLLING IF YOU RUN ADS",
                "3 REASONS YOUR ADS FLOP",
              ].map((line) => (
                <div
                  key={line}
                  className="mono-note flex items-center gap-2 py-1"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {line}
                </div>
              ))}
            </div>
          </BentoCard>
        </RevealItem>

        {/* Speed — delivery-speed dial + traditional-wait track */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Clock} label="SPEED">
            <h3 className="title-1 mt-4">Not two weeks</h3>
            <p className="body-copy mt-2">
              Every batch is briefed, produced and delivered inside three days.
            </p>
            <SpeedDial className="mt-5" />
          </BentoCard>
        </RevealItem>

        {/* Volume — the calendar-cadence graphic (§14) */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Layers} label="VOLUME">
            <h3 className="title-1 mt-4">The volume you need</h3>
            <p className="body-copy mt-2">
              Most brands ship 2 to 4 ads a month. Winning on paid social takes
              15 to 20. We produce at that pace.
            </p>
            <VolumeCadence className="mt-5" />
          </BentoCard>
        </RevealItem>

        {/* Cost — the descending price ladder (§14) */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={PoundSterling} label="COST">
            <h3 className="title-1 mt-4">A fraction of the cost</h3>
            <p className="body-copy mt-2">
              Creator video runs £150 to £500 a piece. Our plans work out from
              around £100 an ad.
            </p>
            <CostLadder className="mt-5" />
          </BentoCard>
        </RevealItem>

        {/* Native — the real clip (hero phone 2) inside the morphing "every
            format" frame: 9:16 → 1:1 → 4:5 with a synced ratio label */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Smartphone} label="NATIVE">
            <h3 className="title-1 mt-4">Native, not glossy</h3>
            <p className="body-copy mt-2">
              UGC-style creative built to convert on paid social, not studio
              gloss that gets scrolled past.
            </p>
            <FormatMorphVideo src="/videos/Main%20Hero%20(2).mp4" className="mt-5" />
          </BentoCard>
        </RevealItem>
      </StaggerGroup>
    </Canvas>
  );
}
