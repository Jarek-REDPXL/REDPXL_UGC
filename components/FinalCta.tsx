import Canvas from "@/components/ui/Canvas";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/**
 * DESIGN.md §9 [12] START — the closing invitation.
 * White Canvas (hairline --line border), centered, typography only. Light
 * mode — the only dark block left is the footer.
 */
export default function FinalCta() {
  return (
    <Canvas
      id="cta"
      idx="13"
      name="START"
      note="15 MIN CALL"
      tint="white-border"
      title="Stop running tired ads."
      sub="Get your first batch this week and give your paid social the creative volume it's been missing."
      centered
    >
      <Reveal>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WhatsAppButton />
          <Button href={`mailto:${site.email}`} variant="ghost">
            {site.email}
          </Button>
        </div>
      </Reveal>

      <p className="mono-note mt-8 text-text-3">
        REDPXL UGC · LONDON · EST. 2024
      </p>
    </Canvas>
  );
}
