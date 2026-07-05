import { MessageCircle } from "lucide-react";
import Button from "./Button";
import { WHATSAPP_URL } from "@/lib/config";

type Variant = "primary" | "secondary" | "invert" | "ghost";

/**
 * The site's primary conversion CTA: "WhatsApp us", opening a WhatsApp chat
 * (WHATSAPP_URL) in a new tab. Reuses the standard Button styles/variants; the
 * MessageCircle icon renders in currentColor (no coloured logo). Change the
 * number in lib/config.ts to update every CTA at once.
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
      <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
      WhatsApp us
    </Button>
  );
}
