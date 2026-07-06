import Canvas from "@/components/ui/Canvas";
import PipelineFlow from "@/components/graphics/PipelineFlow";
import { StaggerGroup, RevealItem } from "@/components/Stagger";

/** §9 [05] PROCESS — mist canvas, PipelineFlow over 3 equal text cards (§4.5). */
const STEPS = [
  {
    title: "Brief",
    body: "Send us your product, brand, and current ads. We study what's working and where you're leaving performance on the table.",
  },
  {
    title: "Produce",
    body: "We generate platform-ready statics and videos built to your brand. Fresh hooks, new angles, native formats.",
  },
  {
    title: "Test",
    body: "A clean, labelled, ready-to-run batch in 72 hours. Rotate them, find your winners, and we refresh before they fatigue.",
  },
];

export default function Process() {
  return (
    <Canvas
      id="process"
      idx="05"
      name="PROCESS"
      note="BRIEF TO LIVE IN 72H"
      tint="mist"
      title="Three steps. "
      titleDeep="Zero friction."
    >
      <PipelineFlow className="w-full mb-10" />

      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((step) => (
          <RevealItem key={step.title}>
            <div className="h-full rounded-card border border-line bg-bg p-7">
              <h3 className="title-1">{step.title}</h3>
              <p className="body-copy mt-2">{step.body}</p>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>
    </Canvas>
  );
}
