import Canvas from "@/components/ui/Canvas";
import Grain from "@/components/ui/Grain";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/**
 * DESIGN.md §9 [12] START — the single dark moment.
 * Ink Canvas, left-aligned, typography only. Grain is added explicitly since
 * Canvas only auto-grains tinted (non-ink) canvases.
 */
export default function FinalCta() {
  return (
    <Canvas
      id="cta"
      idx="13"
      name="START"
      note="15 MIN CALL"
      tint="ink"
      title="Stop running tired ads."
      sub="Get your first batch this week and give your paid social the creative volume it's been missing."
      centered
      flushBottom
    >
      <Grain opacity={0.025} />

      <Reveal>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WhatsAppButton />
          <Button href={`mailto:${site.email}`} variant="ghost">
            {site.email}
          </Button>
        </div>
      </Reveal>

      <p className="mono-note mt-8 text-white/40">
        REDPXL UGC · LONDON · EST. 2024
      </p>
    </Canvas>
  );
}
