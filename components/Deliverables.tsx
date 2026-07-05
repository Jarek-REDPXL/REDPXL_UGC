import { Check } from "lucide-react";
import Canvas from "@/components/ui/Canvas";
import BatchDrop from "@/components/graphics/BatchDrop";

/**
 * DESIGN.md §9 [06] / §13 — WHAT YOU GET canvas (cream, deep `--deep-sand`).
 * "One brief in. A ready-to-run batch out." A deliverables checklist on the
 * left, the BatchDrop batch-resolution graphic on the right. Two-column on
 * lg+, stacking to a single column (BatchDrop full-width below) on mobile.
 */

const DELIVERABLES = [
  "Scripted, edited, captioned — nothing to finish",
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
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <ul className="flex flex-col gap-4">
          {DELIVERABLES.map((item) => (
            <li key={item} className="flex items-start gap-2.5 body-copy">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-pos" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <BatchDrop className="w-full" />
      </div>
    </Canvas>
  );
}
