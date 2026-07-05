import type { ComponentType, ReactNode } from "react";
import Section from "@/components/ui/Section";
import Chip from "@/components/ui/Chip";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import { Users, Zap, Clock, Layers, Smartphone, FileCheck } from "lucide-react";

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
    <div className="h-full rounded-card border border-line bg-bg p-7 transition-[transform,border-color] duration-[180ms] hover:-translate-y-0.5 hover:border-line-hover">
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

/** §9 [02] WHY AI UGC — 12-col bento (§4.5), two wide cards + four thirds. */
export default function Why() {
  return (
    <Section
      id="why"
      idx="02"
      name="WHY AI UGC"
      note="06 REASONS"
      title="Everything creators do. None of what slows you down."
      dividerTop
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
              hook frameworks — not guesswork.
            </p>
            <div className="mt-4 rounded-btn border border-line bg-bg-subtle p-3">
              {[
                "POV: I FOUND OUT WHY MY SKIN…",
                "STOP SCROLLING IF YOU…",
                "3 REASONS YOUR ADS…",
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

        {/* Delivery — stat variant */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Clock} label="DELIVERY">
            <div className="mt-4 flex items-baseline gap-2">
              <span className="stat text-ink">48</span>
              <span className="mono-note">HOURS</span>
            </div>
            <h3 className="title-1 mt-3">48h turnaround</h3>
          </BentoCard>
        </RevealItem>

        {/* Testing */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Layers} label="TESTING">
            <h3 className="title-1 mt-4">Unlimited variations</h3>
            <p className="body-copy mt-2">
              Same ad, ten angles. Test hooks, creators and formats without
              reshooting.
            </p>
          </BentoCard>
        </RevealItem>

        {/* Formats */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={Smartphone} label="FORMATS">
            <h3 className="title-1 mt-4">Every format</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip>9:16</Chip>
              <Chip>1:1</Chip>
              <Chip>16:9</Chip>
            </div>
          </BentoCard>
        </RevealItem>

        {/* Rights */}
        <RevealItem className="md:col-span-3">
          <BentoCard icon={FileCheck} label="RIGHTS">
            <h3 className="title-1 mt-4">Full usage rights</h3>
            <p className="body-copy mt-2">
              Yours forever. No creator licensing fees, no renewal negotiations.
            </p>
          </BentoCard>
        </RevealItem>
      </StaggerGroup>
    </Section>
  );
}
