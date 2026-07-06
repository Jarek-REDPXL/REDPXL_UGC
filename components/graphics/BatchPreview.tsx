import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * DESIGN.md §14 — BatchPreview (Concept D). The [06] "what you get" visual: our
 * real shared PhoneFrame playing a live batch clip, standing on its own beside a
 * batch file-list panel — one ad, and the whole ready-to-run batch it belongs to.
 *
 * The phone IS the left element (no wrapper panel): same bezel/radius/shadow as
 * the hero/marquee, playing AI_UGC1.mp4 (muted/looped/autoplay via the shared
 * editorial VideoSlot treatment, EditorialPoster onError fallback) — video only,
 * no caption chips. The right panel is a white card listing the batch's files
 * (name + type + format chip) with a READY header. Both columns share a height
 * (items-stretch) so the phone and list align top and bottom.
 *
 * lg/md: phone + list side by side; <sm: phone stacked above the list.
 */

/* TODO:REAL-DATA sample batch manifest */
const FILES: { name: string; sub: string; fmt: string }[] = [
  { name: "RDXL-014_POV-HOOK_9x16.mp4", sub: "VIDEO · POV HOOK", fmt: "9:16" },
  { name: "RDXL-014_BENEFIT-STACK_1x1.jpg", sub: "STATIC · BENEFIT", fmt: "1:1" },
  { name: "RDXL-014_OBJECTION_9x16.mp4", sub: "VIDEO · OBJECTION", fmt: "9:16" },
  { name: "RDXL-014_3-WAYS_4x5.mp4", sub: "VIDEO · LISTICLE", fmt: "4:5" },
  { name: "RDXL-014_SOCIAL-PROOF_1x1.jpg", sub: "STATIC · PROOF", fmt: "1:1" },
  { name: "RDXL-014_TRANSFORM_9x16.mp4", sub: "VIDEO · TRANSFORMATION", fmt: "9:16" },
  { name: "RDXL-014_UNBOXING_4x5.jpg", sub: "STATIC · UNBOXING", fmt: "4:5" },
];

export default function BatchPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 items-stretch gap-5 sm:grid-cols-[264px_1fr] ${className}`}>
      {/* the phone — our real shared component, live video only (no caption).
          Mobile (<sm, stacked): full column width so it scales up proportionally
          (9:16 ratio drives height). sm+ (beside the list): fixed 264px as before. */}
      <div className="flex w-full items-center sm:w-[264px]">
        <PhoneFrame
          chip="Skincare UGC ad"
          editorial={{
            variant: "leaf",
            palette: "sand",
            hook: "THE £40 AD THAT SOLD OUT",
            meta: "30S · HOOK: POV",
          }}
          src="/videos/AI_UGC4.mp4"
          hideCaption
          className="w-full"
        />
      </div>

      {/* the batch file-list panel */}
      <div className="flex flex-col rounded-card border border-line bg-bg p-4">
        {/* header */}
        <div className="flex items-center justify-between gap-2">
          <span className="mono-note text-text-2">RDXL-014 · 30 ASSETS</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 mono-note text-text-2">
            <span className="h-1.5 w-1.5 rounded-full bg-pos" aria-hidden /> READY
          </span>
        </div>

        {/* file rows */}
        <ul className="mt-2 flex flex-1 flex-col">
          {FILES.map((f, i) => (
            <li
              key={f.name}
              className={`flex items-center justify-between gap-3 py-[9px] ${i > 0 ? "border-t border-line" : ""}`}
            >
              <div className="min-w-0">
                <div className="mono-note truncate normal-case text-ink">{f.name}</div>
                <div className="mono-note mt-0.5 text-[9px]! text-text-3">{f.sub}</div>
              </div>
              <span className="shrink-0 rounded border border-line px-1.5 py-0.5 mono-note text-[9px]! tabular-nums text-text-3">
                {f.fmt}
              </span>
            </li>
          ))}
        </ul>

        {/* footer */}
        <div className="mt-2 border-t border-line pt-3">
          <span className="mono-note text-[9px]! text-text-3">
            7 OF 30 SHOWN · VIDEO + STATICS · UPLOAD-READY
          </span>
        </div>
      </div>
    </div>
  );
}
