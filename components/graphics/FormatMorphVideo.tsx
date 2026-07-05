import InViewVideo from "@/components/ui/InViewVideo";

/**
 * FormatMorphVideo — the Native card's "every format" device. One real clip
 * plays (object-cover) inside a single rounded frame whose dimensions morph on
 * an infinite loop through the three delivery ratios 9:16 → 1:1 → 4:5, so the
 * video re-crops to each format; a bottom-left mono chip crossfades its label
 * (9:16 / 1:1 / 4:5) in sync. A fixed outer box means the morph is zero layout
 * shift. The video is viewport-gated (InViewVideo) + muted/looped; on error the
 * empty --bg-inset frame shows so it never looks broken.
 *
 * 6.6s loop = three ~2.2s states (~1s hold + ~1.2s morph). Motion is gated by
 * `prefers-reduced-motion: no-preference`; the un-animated base state holds 9:16
 * + the "9:16" label, so reduced-motion users get a correct still. A `fmv-`
 * class prefix keeps it from colliding with the graphic-only FormatMorph.
 */
export default function FormatMorphVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden>
      <style>{`
        /* base = reduced/static rest state: 9:16 frame, "9:16" label */
        .fmv-frame{width:56.25%;height:90.91%}
        .fmv-l2,.fmv-l3{opacity:0}
        .fmv-l1{opacity:1}
        @media (prefers-reduced-motion: no-preference){
          .fmv-frame{animation:fmv-morph 6.6s ease-in-out infinite}
          .fmv-l1{animation:fmv-l1 6.6s ease-in-out infinite}
          .fmv-l2{animation:fmv-l2 6.6s ease-in-out infinite}
          .fmv-l3{animation:fmv-l3 6.6s ease-in-out infinite}
        }
        @keyframes fmv-morph{
          0%,15%{width:56.25%;height:90.91%}   /* 9:16 hold */
          33%,48%{width:85%;height:77.27%}     /* 1:1 hold  */
          66%,82%{width:80%;height:90.91%}     /* 4:5 hold  */
          100%{width:56.25%;height:90.91%}     /* → back to 9:16 */
        }
        @keyframes fmv-l1{0%,18%{opacity:1}26%,92%{opacity:0}100%{opacity:1}}
        @keyframes fmv-l2{0%,26%{opacity:0}33%,48%{opacity:1}56%,100%{opacity:0}}
        @keyframes fmv-l3{0%,59%{opacity:0}66%,82%{opacity:1}90%,100%{opacity:0}}
      `}</style>

      <div className="relative aspect-[200/220] w-full max-w-[180px]">
        <div className="fmv-frame absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] border border-line bg-bg-inset">
          <InViewVideo src={src} fallback={<div className="absolute inset-0 bg-bg-inset" />} />
          {/* ratio chip — the visible one is driven by the opacity keyframes */}
          <span className="mono-note fmv-l1 absolute bottom-2 left-2 z-10 rounded-[4px] bg-white/[0.92] px-1.5 py-0.5 text-[10px]! leading-tight text-ink tabular-nums">9:16</span>
          <span className="mono-note fmv-l2 absolute bottom-2 left-2 z-10 rounded-[4px] bg-white/[0.92] px-1.5 py-0.5 text-[10px]! leading-tight text-ink tabular-nums">1:1</span>
          <span className="mono-note fmv-l3 absolute bottom-2 left-2 z-10 rounded-[4px] bg-white/[0.92] px-1.5 py-0.5 text-[10px]! leading-tight text-ink tabular-nums">4:5</span>
        </div>
      </div>
    </div>
  );
}
