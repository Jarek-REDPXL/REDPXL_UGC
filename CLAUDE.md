# REDPXL UGC — Project Guide

> **All design decisions follow [DESIGN.md](./DESIGN.md).** It is the single
> source of truth. Never invent tokens, colours, sizes or motion outside it.
> If code and DESIGN.md disagree, DESIGN.md wins — extend that file first
> (with a version bump + changelog line), then implement. This file only
> covers stack, structure and workflow.

**Repo: github.com/Jarek-REDPXL/REDPXL_UGC — push to main deploys to Vercel.**

Single-page marketing site for **REDPXL UGC**, a done-for-you AI UGC video-ad
service by Redpxl (London agency). Next.js 15+ App Router, TypeScript,
Tailwind CSS v4, `motion`, `lucide-react`.

Design direction (see DESIGN.md for the authoritative spec): Attio's
engineered restraint, carrying video-heavy UGC content, accented in Redpxl
red. The signature device is the production-index annotation system
(DESIGN.md §6).

---

## Stack & structure

- `app/` — App Router. `layout.tsx` (self-hosted Inter Variable + Geist Mono,
  metadata), `page.tsx` (composes sections), `globals.css` (all DESIGN.md
  tokens + §3 type-scale utility classes + §8.1 buttons).
- `components/` — one component per section (`Nav, Hero, LogoStrip, Work, Why,
  Process, Results, Comparison, Pricing, Faq, FinalCta, Footer`), plus
  `Reveal` / `Stagger` motion wrappers and `Logo`.
- `components/ui/` — shared primitives: `Section` (+ `Annotation`), `Button`,
  `VideoSlot`, `PhoneFrame`, `Chip`.
- Motion is pure CSS (no JS motion library): `.reveal` scroll-reveal, `hero-rise`,
  graphic keyframes + CSS Motion Path, all in `globals.css` (DESIGN.md §7). Only
  tiny client islands remain (Nav, Faq toggle, CountUp, BatchCaption, cycling
  caption, desktop-only Lenis).
- `lib/site.ts` — links / contact constants.
- `public/fonts/InterVariable.woff2` — self-hosted display+body face (opsz).
- `public/videos/` — drop real MP4s here (see VideoSlot `TODO:REAL-DATA`).

Run: `npm run dev` · Build: `npm run build` (must pass with zero errors).

---

## Design system

The complete system — colour tokens, type scale, layout grid, borders,
the annotation system, motion, per-component specs and section blueprints —
lives in **[DESIGN.md](./DESIGN.md)**. Do not duplicate or paraphrase values
here; read DESIGN.md and reference tokens/utility classes from `globals.css`.

Quick pointers: colour/spacing/motion tokens → DESIGN.md §2/§4/§7; type-scale
classes (`.display-1`, `.title-1`, `.body-copy`, `.stat`, `.mono-note`,
`.mono-idx`) → §3; component specs → §8; section blueprints → §9; a11y floor
→ §10.

---

## HARD RULES (do not break)

1. **All design decisions follow DESIGN.md. Never invent tokens, colours,
   sizes or motion outside it.**
2. **No component may hardcode a hex, px shadow, or font weight** — tokens and
   type-scale utility classes only (DESIGN.md §11).
3. **lucide SVG icons only, never emoji** (DESIGN.md §1.7).
4. **Never present placeholder metrics / testimonials / logos / prices as
   real.** Mark them `{/* TODO:REAL-DATA */}` (DESIGN.md §1.8).
5. **Hairlines over shadows; one dark moment (Final CTA); red is a scalpel
   (≤1% per screen).** (DESIGN.md §1).
6. `npm run build` must pass with zero errors/warnings before any handoff.
7. **No visual change is complete until screenshots have been captured and
   reviewed across the responsive range.** Run `npm run audit:shots` (dev
   server up) — it screens all 8 widths (320→1920), captures per-section +
   interaction states into `/audit`, and runs an automated horizontal-overflow
   check. **Zero overflow at every width is a hard gate**; the script exits
   non-zero on any breach. Review the shots before calling work done.

---

## Responsive & audit

- **Envelope:** 320, 390, 430, 768, 1024, 1280, 1440, 1920. No horizontal
  scroll at any width — `document.scrollWidth <= innerWidth` everywhere.
- **Capture:** `npm run audit:shots` → `/audit` (gitignored). Full-page per
  width, per-section at 390/768/1280/1920, FAQ-open + nav-scrolled states, and
  `audit/overflow-report.json`.
- **Drop-in assets:** see [ASSETS.md](./ASSETS.md) for the video-slot / image /
  `TODO:REAL-DATA` registry. Dev-only placeholder badges mark every unfilled
  slot (`NODE_ENV=development`).

---

## Where to drop real assets before launch
- **Videos** → `public/videos/`, pass `src` to `<VideoSlot>` / `<PhoneFrame>`
  (grep `TODO:REAL-DATA`).
- **Client logos** → replace text wordmarks in `LogoStrip.tsx`.
- **Prices** → `Pricing.tsx` (`£X` placeholders).
- **Metrics / quotes** → `Results.tsx` (all `TODO:REAL-DATA`).
- **Comparison price** → `Comparison.tsx` ("From £40" TODO).
- **Primary CTA is WhatsApp** → single source in `lib/config.ts` (`WHATSAPP_URL`,
  wa.me to +44 7525 832432 / `447525832432`). Every "WhatsApp us" button renders
  `<WhatsAppButton>`; change the number/prefilled text in `lib/config.ts` only.
