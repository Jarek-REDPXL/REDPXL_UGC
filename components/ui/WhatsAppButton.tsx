import WhatsAppIcon from "./WhatsAppIcon";
import Button from "./Button";
import { WHATSAPP_URL } from "@/lib/config";

type Variant = "primary" | "secondary" | "invert" | "ghost";

/**
 * The site's primary conversion CTA: "WhatsApp us", opening a WhatsApp chat
 * (WHATSAPP_URL) in a new tab. Reuses the standard Button styles/variants; the
 * WhatsApp glyph renders in currentColor (white on dark, ink on light — no
 * coloured logo). Change the number in lib/config.ts to update every CTA.
 */
export default function WhatsAppButton({
  variant = "primary",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button href={WHATSAPP_URL} external variant={variant} className={className}>
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      WhatsApp us
    </Button>
  );
}
