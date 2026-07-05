"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import Logo from "./Logo";
import Button from "./ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[180ms] ${
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-[12px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x grid h-16 grid-cols-[auto_1fr_auto] items-center">
        {/* Left: wordmark */}
        <a href="#top" aria-label="REDPXL home" className="flex items-center">
          <Logo className="h-[22px] w-auto" />
        </a>

        {/* Center: anchors (lg+) */}
        <ul className="hidden items-center justify-center gap-7 lg:flex">
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

        {/* Right: contact + CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`mailto:${site.email}`}
            className="mono-note text-text-3 transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <Button href={site.bookingUrl} external variant="primary">
            Book a call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="col-start-3 grid h-10 w-10 place-items-center rounded-btn border border-line text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="container-x flex flex-col py-1">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className="border-b border-line last:border-b-0"
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="label block py-4 text-[1rem]! text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x flex flex-col gap-3 pb-5 pt-3">
            <a
              href={`mailto:${site.email}`}
              className="mono-note text-text-3"
            >
              {site.email}
            </a>
            <Button
              href={site.bookingUrl}
              external
              variant="primary"
              className="w-full"
            >
              Book a call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
