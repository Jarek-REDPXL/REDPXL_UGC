"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import Logo from "./Logo";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // §4 nav active-section indicator: observe the sections referenced by
  // navLinks; the active one is whichever crosses the upper-middle band
  // (rootMargin accounts for the 64px sticky nav).
  useEffect(() => {
    const elements = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[180ms] ease-[var(--ease-out)] ${
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-[12px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="content-x grid h-16 grid-cols-[auto_1fr_auto] items-center">
        {/* Left: wordmark */}
        <a href="#top" aria-label="REDPXL home" className="flex items-center">
          <Logo className="h-[22px] w-auto" />
        </a>

        {/* Center: anchors (lg+) */}
        <ul className="hidden items-center justify-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className="label inline-flex items-center gap-1.5 text-text-2 transition-colors hover:text-ink"
                >
                  {link.label}
                  {/* §4 active-section dot — fades between links (180ms) */}
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full bg-accent transition-opacity duration-[180ms] ease-[var(--ease-out)] motion-reduce:transition-none ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right: CTA */}
        <div className="hidden items-center lg:flex">
          <WhatsAppButton variant="primary" />
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
          <ul className="content-x flex flex-col py-1">
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
          <div className="content-x flex flex-col gap-3 pb-5 pt-3">
            <WhatsAppButton variant="primary" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
