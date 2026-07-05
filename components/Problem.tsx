import Canvas from "@/components/ui/Canvas";
import FatigueCurve from "@/components/graphics/FatigueCurve";

/**
 * DESIGN.md §9 [01] / §13 — THE PROBLEM canvas (sand, deep-sand two-tone).
 * Two-column layout: the creative-fatigue statement on the left, the
 * FatigueCurve graphic on the right. Stacks copy-first on mobile.
 */
export default function Problem() {
  return (
    <Canvas
      id="problem"
      idx="01"
      name="THE PROBLEM"
      note="CREATIVE FATIGUE"
      tint="sand"
      title="Your winning ad is already "
      titleDeep="dying."
      contentClassName="grid gap-12 lg:grid-cols-2 items-center"
    >
      <p className="body-lg max-w-[520px]!">
        On Meta and TikTok, a top creative fatigues in 7 to 14 days. Most
        brands ship 2 to 4 new ads a month, nowhere near the 15 to 20 it takes
        to keep CPMs down. The bottleneck was never budget. It&apos;s
        production. We remove it.
      </p>

      <FatigueCurve className="w-full" />
    </Canvas>
  );
}
