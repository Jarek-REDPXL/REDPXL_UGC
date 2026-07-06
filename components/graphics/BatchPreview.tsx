import PhoneFrame from "@/components/ui/PhoneFrame";

/**
 * DESIGN.md §14 — BatchPreview (Concept D). The [06] "what you get" visual: our
 * real shared PhoneFrame playing a live batch clip, standing on its own beside a
 * batch file-list panel — one ad, and the whole ready-to-run batch it belongs to.
 *
 * The phone IS the left element (no wrapper panel): same bezel/radius/shadow as
 * the hero/marquee, playing AI_UGC1.mp4 (muted/looped/autoplay via the shared
 * editorial VideoSlot treatment, EditorialPoster onError fallback) with the
 * niche chip + hook/meta caption. The right panel is a white card listing the
 * batch's files (name + type + format chip) with a READY header.
 *
 * lg/md: phone + list side by side; <sm: phone stacked above the list.
 */

/* TODO:REAL-DATA sample batch manifest */
const FILES: { name: string; sub: string; fmt: string }[] = [
  { name: "AD-01_HOOK-POV_9X16.MP4", sub: "VIDEO · POV HOOK", fmt: "9:16" },
  { name: "AD-02_BENEFIT_1X1.JPG", sub: "STATIC · BENEFIT", fmt: "1:1" },
  { name: "AD-03_OBJECTION_9X16.MP4", sub: "VIDEO · OBJECTION", fmt: "9:16" },
  { name: "AD-04_3WAYS_4X5.MP4", sub: "VIDEO · 3 WAYS", fmt: "4:5" },
  { name: "AD-05_DEMO_1X1.JPG", sub: "STATIC · DEMO", fmt: "1:1" },
  { name: "AD-06_HOOK-POV_9X16.MP4", sub: "VIDEO · POV HOOK", fmt: "9:16" },
  { name: "AD-07_BENEFIT_4X5.JPG", sub: "STATIC · BENEFIT", fmt: "4:5" },
];

export default function BatchPreview({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 items-start gap-5 sm:grid-cols-[210px_1fr] ${className}`}>
      {/* the phone — our real shared component, live video + chips */}
      <div className="mx-auto w-[210px] sm:mx-0">
        <PhoneFrame
          chip="SKINCARE · TIKTOK"
          editorial={{
            variant: "leaf",
            palette: "sand",
            hook: "THE £40 AD THAT SOLD OUT",
            meta: "30S · HOOK: POV",
          }}
          src="/videos/AI_UGC1.mp4"
        />
      </div>

      {/* the batch file-list panel */}
      <div className="flex flex-col rounded-card border border-line bg-bg p-4">
        {/* header */}
        <div className="flex items-center justify-between gap-2">
          <span className="mono-note text-text-2">BATCH_014 · 30 ASSETS</span>
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
                <div className="mono-note truncate text-ink">{f.name}</div>
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
