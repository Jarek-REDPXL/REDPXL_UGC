/**
 * FormatMorph — a single rounded frame that smoothly morphs between the three
 * delivery aspect ratios 9:16 → 1:1 → 4:5 on an infinite loop (Why canvas,
 * "Every format" tile). A single CSS keyframe drives the frame dimensions; three
 * stacked labels crossfade in sync via matching opacity keyframes. A fixed
 * 200×220 outer box means the inner frame resizes with zero layout shift.
 *
 * Pure-CSS server component — no JS, no hydration. The 6.6s loop = three ~2.2s
 * states (≈1s hold + ≈1.2s morph each). Motion is gated by
 * `prefers-reduced-motion: no-preference`; the un-animated base state is a static
 * 4:5 frame + "4:5" label, so reduced-motion users get the correct still.
 *
 * Frame sizes are percentages of the fixed box, each aspect-fitted inside a
 * 170×200 area and centered via a constant transform (only width/height animate).
 */
export default function FormatMorph({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden>
      <style>{`
        /* base = reduced/static rest state: 4:5 frame, "4:5" label */
        .fm-frame{width:80%;height:90.91%}
        .fm-l1,.fm-l2{opacity:0}
        .fm-l3{opacity:1}
        @media (prefers-reduced-motion: no-preference){
          .fm-frame{animation:fm-morph 6.6s ease-in-out infinite}
          .fm-l1{animation:fm-l1 6.6s ease-in-out infinite}
          .fm-l2{animation:fm-l2 6.6s ease-in-out infinite}
          .fm-l3{animation:fm-l3 6.6s ease-in-out infinite}
        }
        @keyframes fm-morph{
          0%,15%{width:56.25%;height:90.91%}   /* 9:16 hold */
          33%,48%{width:85%;height:77.27%}     /* 1:1 hold  */
          66%,82%{width:80%;height:90.91%}     /* 4:5 hold  */
          100%{width:56.25%;height:90.91%}     /* → back to 9:16 */
        }
        @keyframes fm-l1{0%,18%{opacity:1}26%,92%{opacity:0}100%{opacity:1}}
        @keyframes fm-l2{0%,26%{opacity:0}33%,48%{opacity:1}56%,100%{opacity:0}}
        @keyframes fm-l3{0%,59%{opacity:0}66%,82%{opacity:1}90%,100%{opacity:0}}
      `}</style>

      <div className="relative aspect-[200/220] w-full max-w-[200px]">
        <div className="fm-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[14px] border-[1.5px] border-ink bg-bg-inset" />
      </div>

      {/* three stacked labels; the visible one is driven by the opacity keyframes */}
      <div className="relative mt-4 h-[1.2em] w-full text-center">
        <span className="mono-note fm-l1 absolute inset-x-0 tabular-nums">9:16</span>
        <span className="mono-note fm-l2 absolute inset-x-0 tabular-nums">1:1</span>
        <span className="mono-note fm-l3 absolute inset-x-0 tabular-nums">4:5</span>
      </div>
    </div>
  );
}
