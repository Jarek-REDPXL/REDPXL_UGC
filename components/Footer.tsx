import Logo from "@/components/Logo";
import { navLinks, site } from "@/lib/site";

/**
 * DESIGN.md §9 [FOOTER] — quiet meta footer.
 * Row 1: wordmark + anchor links. Row 2: mono-note company/legal meta.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-x py-12">
        {/* Row 1 — wordmark + nav */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" aria-label="REDPXL home">
            <Logo className="h-[22px] w-auto" />
          </a>

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
