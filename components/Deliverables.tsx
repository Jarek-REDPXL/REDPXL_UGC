import { Check } from "lucide-react";
import Canvas from "@/components/ui/Canvas";
import BatchPreview from "@/components/graphics/BatchPreview";

/**
 * DESIGN.md §9 [06] / §13 — WHAT YOU GET canvas (cream, deep `--deep-sand`).
 * "One brief in. A ready-to-run batch out." A deliverables checklist on the
 * left; on the right, the BatchPreview — our real shared PhoneFrame with a live
 * clip beside the batch file list. Two-column on lg+ (checklist narrower),
 * stacking to a single column (checklist → phone → list) on mobile.
 */

const DELIVERABLES = [
  "Scripted, edited, captioned. Nothing to finish.",
  "Named + labeled files, organised by hook & format",
  "Statics and video, your chosen split",
  "All sizes: 9:16 · 1:1 · 4:5",
  "Paid usage rights included",
];

export default function Deliverables() {
  return (
    <Canvas
      id="deliverables"
      idx="06"
      name="WHAT YOU GET"
      note="EVERY BATCH"
      tint="cream"
      title="One brief in. "
      titleDeep="A ready-to-run batch out."
      contentClassName="!mt-8"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <ul className="flex flex-col gap-4">
          {DELIVERABLES.map((item) => (
            <li key={item} className="flex items-start gap-2.5 body-copy">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-pos" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <BatchPreview className="w-full" />
      </div>
    </Canvas>
  );
}
