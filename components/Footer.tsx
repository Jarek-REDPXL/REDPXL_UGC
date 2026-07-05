import Logo from "@/components/Logo";
import { navLinks, site } from "@/lib/site";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/config";

// lucide-react dropped brand glyphs — inline monochrome currentColor icons keep
// the socials on-system (no coloured brand logos). Instagram matches lucide's
// stroke style; TikTok is a single filled path.
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
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

/**
 * DESIGN.md §9 [FOOTER] — quiet meta footer.
 * Row 1: wordmark + socials + anchor links. Row 2: mono-note company/legal meta.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-x py-12">
        {/* Row 1 — wordmark + nav */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <a href="#top" aria-label="REDPXL home">
              <Logo className="h-[22px] w-auto" />
            </a>
            <span className="h-4 w-px bg-line" aria-hidden />
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REDPXL on Instagram"
                className="text-text-2 transition-colors hover:text-ink"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REDPXL on TikTok"
                className="text-text-2 transition-colors hover:text-ink"
              >
                <TikTokIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="label text-text-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Row 2 — company + legal meta */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <span className="mono-note">
            A Redpxl company, {site.location}
          </span>
          <a
            href={`mailto:${site.supportEmail}`}
            className="mono-note transition-colors hover:text-ink"
          >
            {site.supportEmail}
          </a>
          <span className="mono-note">© 2026 REDPXL LIMITED</span>
          <a href="#" className="mono-note transition-colors hover:text-ink">
            Terms
          </a>
          <a href="#" className="mono-note transition-colors hover:text-ink">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
