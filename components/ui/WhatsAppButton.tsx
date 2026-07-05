import WhatsAppIcon from "./WhatsAppIcon";
import Button from "./Button";
import { WHATSAPP_URL } from "@/lib/config";

/**
 * The site's primary conversion CTA: "WhatsApp us", opening a WhatsApp chat
 * (WHATSAPP_URL) in a new tab. Always the brand-green `whatsapp` variant (white
 * label + white WhatsApp glyph via currentColor) — the same green on light and
 * dark bands so the action reads consistently everywhere. Change the number in
 * lib/config.ts to update every CTA.
 */
export default function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <Button href={WHATSAPP_URL} external variant="whatsapp" className={className}>
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      WhatsApp us
    </Button>
  );
}
