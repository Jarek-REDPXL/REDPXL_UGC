import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { navLinks, site } from "@/lib/site";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/config";

// lucide-react dropped brand glyphs — inline monochrome currentColor icons.
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const EXPLORE = navLinks;
const CONTACT = [
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.supportEmail, href: `mailto:${site.supportEmail}` },
];

/** A quiet right-hand link column: mono-note header + white links → hover accent. */
function LinkCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mono-note text-text-3-dark">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

/**
 * DESIGN.md §9 [FOOTER] — the statement footer. A single dark ink band: a
 * display-2 CTA headline + sub + green WhatsApp CTA on the left, three
 * config-driven link columns (Explore / Contact / Social) on the right, a giant
 * low-opacity REDPXL watermark behind the lower-right, and a hairline meta row
 * carrying the real wordmark + legal links.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="relative isolate mx-auto max-w-[1152px] px-6 pb-12 pt-24 md:px-8 lg:px-10">
        {/* giant watermark — full wordmark, behind the lower-right, red dot as "."
            Constrained to the container width (text-right, inset) so it never
            clips at the edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-2 z-0 select-none text-right text-[clamp(3rem,12vw,9rem)] font-semibold leading-none tracking-tight text-white/[0.05]"
        >
          REDPXL<span className="text-accent/[0.15]">.</span>
        </span>

        {/* annotation */}
        <p className="relative z-10 flex items-center gap-2 mono-note text-text-3-dark">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
          LET&apos;S TALK
        </p>

        {/* main — left statement block + right link columns */}
        <div className="relative z-10 mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="display-2 text-white">Ready to stop running tired ads?</h2>
            <p className="body-lg mt-4 text-text-2-dark">
              Build a reliable flow of fresh creative, without the production
              drag that slows testing down.
            </p>
            <div className="mt-8">
              <WhatsAppButton className="w-full sm:w-auto" />
            </div>
            <p className="mono-note mt-8 text-text-3-dark">
              A REDPXL COMPANY · CANARY WHARF, LONDON
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <LinkCol title="EXPLORE">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="label text-white/85 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </LinkCol>
            <LinkCol title="CONTACT">
              {CONTACT.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="label text-white/85 transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </LinkCol>
            <LinkCol title="SOCIAL">
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 text-white/85 transition-colors hover:text-accent">
                  <InstagramIcon className="h-[15px] w-[15px]" /> Instagram
                </a>
              </li>
              <li>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 text-white/85 transition-colors hover:text-accent">
                  <TikTokIcon className="h-[14px] w-[14px]" /> TikTok
                </a>
              </li>
            </LinkCol>
          </div>
        </div>

        {/* meta row on a hairline */}
        <div className="relative z-10 mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono-note text-text-3-dark">© 2026 REDPXL LIMITED</span>
          <div className="flex items-center gap-6">
            <a href="#top" aria-label="REDPXL home" className="flex items-center">
              <Logo className="h-[18px] w-auto brightness-0 invert" />
            </a>
            <a href="#" className="mono-note text-text-3-dark transition-colors hover:text-white">Terms</a>
            <a href="#" className="mono-note text-text-3-dark transition-colors hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
