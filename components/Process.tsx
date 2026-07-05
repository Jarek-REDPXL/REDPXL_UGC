import Canvas from "@/components/ui/Canvas";
import PipelineFlow from "@/components/graphics/PipelineFlow";
import { StaggerGroup, RevealItem } from "@/components/Stagger";

/** §9 [05] PROCESS — mist canvas, PipelineFlow over 3 equal cols (§4.5), ghost numerals. */
const STEPS = [
  {
    num: "01",
    title: "Brief",
    body: "Send us your product, brand, and current ads. We study what's working and where you're leaving performance on the table.",
  },
  {
    num: "02",
    title: "Produce",
    body: "We generate platform-ready statics and videos — fresh hooks, new angles, native formats — built to your brand.",
  },
  {
    num: "03",
    title: "Test",
    body: "A clean, labeled, ready-to-run batch in 72 hours. Rotate them, find your winners, and we refresh before they fatigue.",
  },
];

export default function Process() {
  return (
    <Canvas
      id="process"
      idx="05"
      name="PROCESS"
      note="BRIEF → LIVE IN 72H"
      tint="mist"
      title="Three steps. "
      titleDeep="Zero friction."
    >
      <PipelineFlow className="w-full mb-10" />

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((step) => (
          <RevealItem key={step.num}>
            <div className="relative h-full overflow-hidden rounded-card border border-line bg-bg p-7">
              <span
                className="stat absolute right-5 top-4 select-none text-accent"
                style={{ opacity: 0.12 }}
                aria-hidden
              >
                {step.num}
              </span>
              <div className="relative">
                <h3 className="title-1">{step.title}</h3>
                <p className="body-copy mt-2">{step.body}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>
    </Canvas>
  );
}
