import Canvas from "@/components/ui/Canvas";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Reveal from "@/components/Reveal";

/**
 * DESIGN.md §9 [10] THE GUARANTEE — the risk-reversal hammer.
 * A compact dark ink mini-canvas placed right after pricing: short centered
 * copy plus one invert CTA. Reads smaller than the full sections by design.
 */
export default function Guarantee() {
  return (
    <Canvas
      id="guarantee"
      idx="10"
      name="THE GUARANTEE"
      note="ZERO RISK"
      tint="ink"
      title="If you wouldn't run them, you don't pay."
      centered
    >
      <Reveal className="mx-auto max-w-[560px]">
        {/* TODO:REAL-DATA trial terms */}
        <p className="body-lg text-white/70">
          Start with a £750 trial batch of 8 ads. If the quality isn&apos;t
          there, the batch is on us. If you continue, the £750 comes off
          month one.
        </p>
        <WhatsAppButton variant="invert" className="mt-6" />
      </Reveal>
    </Canvas>
  );
}
