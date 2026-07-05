import { FileText, Sparkles, Target } from "lucide-react";
import type { ComponentType } from "react";

/**
 * DESIGN.md §14 — PipelineFlow. The Process story as one continuous pipeline:
 * BRIEF → PRODUCE → TEST with every sub-step on the rail and an iterate loop
 * back from Test to Produce.
 *
 * Three major nodes (white 64px circles, lucide icon, label below) sit on a
 * 1.5px rail; ten small hollow sub-step nodes carry alternating above/below
 * mono micro-labels connected by 1px ticks. A dashed --text-3 arc sweeps below
 * from Test back to Produce ("ITERATE WINNERS ↺" in --accent). A single 6px
 * --accent dot travels the rail left→right then follows the iterate arc, on a
 * calm ~8s loop (CSS offset-path). Reduced-motion / no offset-path support park
 * the dot at Test with a static arc.
 *
 * ≥md: horizontal. <md: a vertical pipeline (rail top→bottom, labels right,
 * iterate arc a return curve on the left) so it never overflows. SVG strokes
 * use non-scaling-stroke to stay crisp; aria-hidden (the 3 cards carry meaning).
 */

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  brief: FileText,
  produce: Sparkles,
  test: Target,
};

type Point = { label: string; major?: "brief" | "produce" | "test" };

const SEQ: Point[] = [
  { label: "AUDIT ADS" },
  { label: "STUDY WINNERS" },
  { label: "BRIEF", major: "brief" },
  { label: "DEFINE ANGLES" },
  { label: "SCRIPT HOOKS" },
  { label: "AI GENERATION" },
  { label: "PRODUCE", major: "produce" },
  { label: "EDIT & CAPTION" },
  { label: "QA CHECK" },
  { label: "LAUNCH BATCH" },
  { label: "READ PERFORMANCE" },
  { label: "REFRESH · FATIGUE" },
  { label: "TEST", major: "test" },
];

/* ---- horizontal geometry ---- */
const HW = 1180;
const HH = 360;
const RAIL_Y = 168;
const HX0 = 60;
const HX1 = 1116;
const hx = (i: number) => HX0 + (i * (HX1 - HX0)) / (SEQ.length - 1);

function Horizontal() {
  const produceX = hx(6);
  const testX = hx(12);
  let subN = -1;

  // dot path: full rail, then the iterate arc back Test → Produce
  const dotPath = `M${HX0} ${RAIL_Y} H${testX} C${testX} 300 ${produceX} 300 ${produceX} ${RAIL_Y}`;
  const arcPath = `M${testX} ${RAIL_Y + 22} C${testX} 300 ${produceX} 300 ${produceX} ${RAIL_Y + 22}`;

  return (
    <div className="hidden md:block">
      <svg viewBox={`0 0 ${HW} ${HH}`} preserveAspectRatio="xMidYMid meet" className="h-auto w-full">
        <style>{`
          .pf-dot{offset-path:path('${dotPath}');offset-distance:63%;offset-rotate:0deg}
          @media (prefers-reduced-motion: no-preference){
            @supports (offset-path: path('M0 0 L1 1')){
              .pf-dot{animation:pf-run 8s linear infinite}
            }
          }
          @keyframes pf-run{
            0%{offset-distance:0%;opacity:0}
            4%{opacity:1}
            94%{opacity:1}
            100%{offset-distance:100%;opacity:0}
          }
        `}</style>

        {/* rail */}
        <line x1={HX0} y1={RAIL_Y} x2={HX1} y2={RAIL_Y} stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* iterate arc + label */}
        <path d={arcPath} fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" opacity="0.7" />
        <foreignObject x={(produceX + testX) / 2 - 90} y={290} width="180" height="22">
          <div className="flex h-full w-full items-center justify-center">
            <span className="mono-note text-[10px]! text-accent-dark">ITERATE WINNERS ↺</span>
          </div>
        </foreignObject>

        {/* sub-steps: ticks + alternating labels */}
        {SEQ.map((p, i) => {
          if (p.major) return null;
          subN += 1;
          const x = hx(i);
          const above = subN % 2 === 0;
          const labelY = above ? 96 : 214;
          const tickY1 = above ? RAIL_Y - 6 : RAIL_Y + 6;
          const tickY2 = above ? 122 : 200;
          return (
            <g key={p.label}>
              <line x1={x} y1={tickY1} x2={x} y2={tickY2} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx={x} cy={RAIL_Y} r="4" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <foreignObject x={x - 80} y={labelY} width="160" height="16">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="mono-note whitespace-nowrap text-[10px]! leading-none text-text-3">{p.label}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* major nodes + labels */}
        {SEQ.map((p, i) => {
          if (!p.major) return null;
          const x = hx(i);
          const Icon = ICONS[p.major];
          return (
            <g key={p.label}>
              <circle cx={x} cy={RAIL_Y} r="30" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(var(--shadow-node))" }} />
              <foreignObject x={x - 22} y={RAIL_Y - 22} width="44" height="44">
                <div className="grid h-full w-full place-items-center">
                  <Icon className="h-[22px] w-[22px] text-ink" />
                </div>
              </foreignObject>
              <foreignObject x={x - 70} y={RAIL_Y + 38} width="140" height="18">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="mono-note text-[11px]! font-medium tracking-wide text-ink">{p.label}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* travelling accent dot */}
        <circle className="pf-dot" r="5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

/* ---- vertical geometry (mobile) ---- */
const VW = 340;
const RAIL_X = 40;
const VY0 = 34;
const VSTEP = 58;
const vy = (i: number) => VY0 + i * VSTEP;
const VH = vy(SEQ.length - 1) + 34;

function Vertical() {
  const produceY = vy(6);
  const testY = vy(12);
  const dotPath = `M${RAIL_X} ${VY0} V${testY} C${RAIL_X - 26} ${testY} ${RAIL_X - 26} ${produceY} ${RAIL_X} ${produceY}`;
  const arcPath = `M${RAIL_X - 22} ${testY} C${RAIL_X - 30} ${testY} ${RAIL_X - 30} ${produceY} ${RAIL_X - 22} ${produceY}`;

  return (
    <div className="md:hidden">
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" className="mx-auto h-auto w-full max-w-[340px]">
        <style>{`
          .pfv-dot{offset-path:path('${dotPath}');offset-distance:63%}
          @media (prefers-reduced-motion: no-preference){
            @supports (offset-path: path('M0 0 L1 1')){
              .pfv-dot{animation:pfv-run 8s linear infinite}
            }
          }
          @keyframes pfv-run{0%{offset-distance:0%;opacity:0}4%{opacity:1}94%{opacity:1}100%{offset-distance:100%;opacity:0}}
        `}</style>

        <line x1={RAIL_X} y1={VY0} x2={RAIL_X} y2={vy(SEQ.length - 1)} stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* iterate return arc on the left */}
        <path d={arcPath} fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" opacity="0.7" />
        <foreignObject x={0} y={(produceY + testY) / 2 - 14} width="34" height="30">
          <div className="flex h-full w-full items-center justify-center text-center">
            <span className="mono-note text-[8px]! leading-tight text-accent-dark">ITER ↺</span>
          </div>
        </foreignObject>

        {SEQ.map((p, i) => {
          const y = vy(i);
          if (p.major) {
            const Icon = ICONS[p.major];
            return (
              <g key={p.label}>
                <circle cx={RAIL_X} cy={y} r="20" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(var(--shadow-node))" }} />
                <foreignObject x={RAIL_X - 14} y={y - 14} width="28" height="28">
                  <div className="grid h-full w-full place-items-center">
                    <Icon className="h-[16px] w-[16px] text-ink" />
                  </div>
                </foreignObject>
                <foreignObject x={RAIL_X + 34} y={y - 12} width={VW - RAIL_X - 40} height="24">
                  <div className="flex h-full items-center">
                    <span className="mono-note text-[12px]! font-medium tracking-wide text-ink">{p.label}</span>
                  </div>
                </foreignObject>
              </g>
            );
          }
          return (
            <g key={p.label}>
              <circle cx={RAIL_X} cy={y} r="4" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <foreignObject x={RAIL_X + 22} y={y - 9} width={VW - RAIL_X - 28} height="18">
                <div className="flex h-full items-center">
                  <span className="mono-note text-[10px]! leading-none text-text-3">{p.label}</span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        <circle className="pfv-dot" r="5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

export default function PipelineFlow({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Horizontal />
      <Vertical />
    </div>
  );
}
