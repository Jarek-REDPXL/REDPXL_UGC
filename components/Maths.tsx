import Canvas from "@/components/ui/Canvas";
import MathsBars from "@/components/graphics/MathsBars";

/**
 * DESIGN.md §9 [04] / §13 — THE MATHS canvas (sage, deep `--deep-sage`).
 * The unit-economics section: a body-lg framing on the left, the MathsBars
 * cost/volume graphic on the right. Two-column on lg+, stacking to a single
 * column (bars full-width below the copy) on mobile.
 */
export default function Maths() {
  return (
    <Canvas
      id="maths"
      idx="04"
      name="THE MATHS"
      note="COST PER AD"
      tint="sage"
      title="Ten times the creative. "
      titleDeep="A fraction of the spend."
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <p className="body-lg max-w-[480px]!">
          A single UGC creator video runs £150–£500. Our Growth plan lands 30
          ads a month at £117 each — statics and video, delivered in one batch.
        </p>
        <MathsBars className="w-full" />
      </div>
    </Canvas>
  );
}
