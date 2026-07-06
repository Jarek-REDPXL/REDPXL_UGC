import Canvas from "@/components/ui/Canvas";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Reveal from "@/components/Reveal";

/**
 * DESIGN.md §9 [10] THE GUARANTEE — the risk-reversal hammer.
 * A compact soft-grey mini-canvas (--bg-subtle + hairline --line border) placed
 * right after pricing: short centered copy plus one green WhatsApp CTA. Reads
 * smaller than the full sections by design. Light mode.
 */
export default function Guarantee() {
  return (
    <Canvas
      id="guarantee"
      idx="10"
      name="THE GUARANTEE"
      note="ZERO RISK"
      tint="grey"
      title="If you wouldn't run them, you don't pay."
      centered
    >
      <Reveal className="mx-auto max-w-[560px]">
        {/* TODO:REAL-DATA trial terms */}
        <p className="body-lg text-text-2">
          Start with a £750 trial batch of 8 ads. If the quality isn&apos;t
          there, the batch is on us. If you continue, the £750 comes off
          month one.
        </p>
        <WhatsAppButton className="mt-6" />
      </Reveal>
    </Canvas>
  );
}
