// Central site constants. Update links/contact details here.

// Primary CTA (WhatsApp) lives in lib/config.ts → WHATSAPP_URL.
export const site = {
  name: "REDPXL",
  productName: "REDPXL UGC",
  email: "hello@redpxl.uk",
  supportEmail: "support@redpxl.uk",
  location: "Canary Wharf, London",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Why AI UGC", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;
