# REDPXL UGC — Design Specification v1.2

This document is the single source of truth for the REDPXL UGC landing page.
Every colour, size, weight, spacing value and interaction on the page derives
from this spec. If code and spec disagree, the spec wins. Do not invent new
tokens; extend this file first, then implement.

Design direction: **Attio's engineered restraint, carrying video-heavy UGC
content, accented in Redpxl red.** The page should feel like a precision
instrument — a spec sheet for ad creative production — not a marketing splash
page. Nothing decorative. Every visual device encodes information.

The page's signature: the **production-index annotation system** (§6). The
entire page reads as an indexed production run — sections are numbered like
batches, captions read like output logs. This is the one memorable device;
everything else stays quiet so it can carry the identity.

---

## 1. Design principles (non-negotiable)

1. Hairlines over shadows. Structure comes from 1px borders, not elevation.
2. One dark moment. The page is white; only the final CTA band is dark.
3. Red is a scalpel. The accent appears in small doses: annotations, icons,
   one border, one chip. Never large red surfaces, never red headlines.
4. The videos are the decoration. No illustrations, no 3D blobs, no gradient
   orbs. Media does the persuading; the frame stays neutral.
5. Ink is not black. Headings are `#17181A`. Pure `#000` is forbidden.
6. Restraint is the aesthetic. When in doubt, remove.
7. Icons are lucide-react SVGs at 16px. Emoji are forbidden everywhere.
8. Placeholder metrics/testimonials/logos are marked `{/* TODO:REAL-DATA */}`
   and must be replaced or reframed before launch.

---

## 2. Colour system

All colours are defined once as CSS custom properties in `globals.css` and
mapped into the Tailwind theme. No raw hex anywhere in components.

### 2.1 Neutrals (Attio-derived)

| Token          | Hex       | Usage                                             |
|----------------|-----------|---------------------------------------------------|
| `--bg`         | `#FFFFFF` | Page background, cards, nav                       |
| `--bg-subtle`  | `#F9F9FB` | Alternate section bands (Process), input fields   |
| `--bg-inset`   | `#F3F3F5` | Video poster base, code/mock inlays               |
| `--ink`        | `#17181A` | Headings, primary buttons, final CTA band bg      |
| `--ink-2`      | `#2B2C2F` | Primary button hover                              |
| `--text-2`     | `#5F6368` | Body copy, secondary text                         |
| `--text-3`     | `#8A8D93` | Captions, annotations, footer meta                |
| `--line`       | `#E8E9EC` | ALL hairline borders, dividers                    |
| `--line-hover` | `#D9DADE` | Card border on hover                              |
| `--bezel`      | `#1D1E20` | Phone frame bezels                                |

### 2.2 Accent — Redpxl Red

| Token            | Hex       | Usage                                                  |
|------------------|-----------|--------------------------------------------------------|
| `--accent`       | `#E62E2E` | Annotation index numbers, icons, active states, chip   |
| `--accent-dark`  | `#C42222` | Accent hover, link hover                               |
| `--accent-soft`  | `#FCEBEB` | Highlighted comparison column bg, icon tiles           |
| `--accent-faint` | `#FDF5F5` | Barely-there hover tint on highlighted pricing card    |

> If the official brand red differs, change `--accent` only; the ramp
> regenerates: dark = accent −12% lightness, soft = accent at 8% opacity on
> white, faint = 4%.

### 2.3 Semantic (comparison table only)

| Token       | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| `--pos`     | `#188544` | Check icons in REDPXL column   |
| `--neg`     | `#B42318` | X icons (used sparingly)       |
| `--neutral` | `#8A8D93` | Minus icons                    |

### 2.4 Usage ratios

Per viewport, approximately: 88% white/neutral surfaces, 8% ink (text, one
button), 3% subtle tints, **≤1% red**. If red exceeds ~1% of a screen, remove
an instance.

---

## 3. Typography system

### 3.1 Faces

| Role      | Face                      | Loading                                        |
|-----------|---------------------------|------------------------------------------------|
| Display   | **Inter Variable** with optical sizing (`opsz` axis → Inter Display cut at large sizes) | Self-host `InterVariable.woff2` (rsms v4.x) in `/public/fonts`, `@font-face` with `font-optical-sizing: auto` |
| Body / UI | Inter Variable (same file, small opsz)             | same                                           |
| Mono      | **Geist Mono** (annotations, chips, numerals' units, captions) | `next/font` or self-host, weights 400/500      |

Fallback stacks:
`--font-sans: InterVariable, Inter, -apple-system, "Segoe UI", sans-serif;`
`--font-mono: "Geist Mono", "SFMono-Regular", ui-monospace, monospace;`

Global: `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;`
Enable `font-feature-settings: "ss01","cv05","cv11";` on display text
(single-storey a alternates off; keep default unless testing shows otherwise —
`"ss01"` only if it renders cleanly, else remove).

### 3.2 Type scale (exact)

| Style       | Size (desktop → mobile)              | Weight | Tracking  | Leading | Colour     | Usage                       |
|-------------|--------------------------------------|--------|-----------|---------|------------|-----------------------------|
| `display-1` | `clamp(2.875rem, 6vw, 4.5rem)`       | 600    | `-0.028em`| 1.04    | `--ink`    | Hero H1 only                |
| `display-2` | `clamp(2rem, 4vw, 3rem)`             | 600    | `-0.024em`| 1.08    | `--ink`    | Section titles              |
| `title-1`   | `1.375rem / 22px`                    | 600    | `-0.015em`| 1.25    | `--ink`    | Card titles, FAQ questions  |
| `title-2`   | `1.0625rem / 17px`                   | 550    | `-0.01em` | 1.35    | `--ink`    | Small card titles, table head |
| `body-lg`   | `1.125rem / 18px`                    | 400    | `0`       | 1.6     | `--text-2` | Hero sub, section subs      |
| `body`      | `0.9375rem / 15px`                   | 400    | `0`       | 1.6     | `--text-2` | Card copy, FAQ answers      |
| `label`     | `0.875rem / 14px`                    | 500    | `0`       | 1.4     | `--ink`    | Buttons, nav links          |
| `stat`      | `clamp(3rem, 5vw, 3.75rem)`          | 600    | `-0.03em` | 1.0     | `--ink`    | Result numerals, "48"       |
| `mono-note` | `0.75rem / 12px`                     | 450    | `+0.06em` | 1.4     | `--text-3` | Annotations, captions, chips — ALWAYS UPPERCASE, mono |
| `mono-idx`  | `0.75rem / 12px`                     | 500    | `+0.06em` | 1.4     | `--accent` | The `[01]` index inside annotations |

Rules: display styles never exceed 640px measure. Body text max measure 560px.
Never use weight 700+ anywhere. Never letterspace body text.

### 3.3 Hierarchy rhythm inside a section

Annotation row → 20px gap → `display-2` title → 12px gap → `body-lg` sub
(optional, one sentence) → 48px gap → content. Titles are sentence case with a
full stop ("Made to stop the scroll."). Attio convention: confident, short,
punctuated.

---

## 4. Layout, spacing, grid

### 4.1 Container

- Max content width: **1152px** (`max-w-[1152px]`), horizontal padding 24px
  (mobile) / 32px (≥768) / 40px (≥1152).
- The Work reel and hero phone cluster may bleed to viewport edge (full-bleed
  scroll container with the annotation row still inside the container).

### 4.2 Spacing scale

Base unit 4px. Allowed steps only: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80,
96, 112, 128, 144. No arbitrary values outside this list.

### 4.3 Section rhythm

- Vertical padding per section: **py-[112px]** desktop, **py-[72px]** mobile.
- Hero: pt-[64px] below nav, pb-[96px].
- Full-width hairline divider (`border-t --line`) between: Work→Why, 
  Results→Comparison, FAQ→Final CTA. Elsewhere, whitespace alone separates.
- Alternate band: only Process sits on `--bg-subtle` (full-width band).

### 4.4 Breakpoints

| Name | Width   | Key changes                                              |
|------|---------|----------------------------------------------------------|
| `sm` | 640px   | Buttons inline (stacked below)                           |
| `md` | 768px   | Bento 2-col, process 3-col, pricing 3-col begin          |
| `lg` | 1024px  | Hero becomes 2-col (text left / frame right), table view |
| `xl` | 1152px  | Container caps                                           |

### 4.5 Grid specs

- Bento (§ Why): CSS grid, 12-col, gap 16px. Two wide cards `col-span-7` /
  `col-span-5` (row 1), four cards `col-span-3` each (row 2). Mobile: single
  column, wide cards first.
- Process: 3 equal cols, gap 20px.
- Results stats: 3 cols gap 16px; quotes: 2 cols gap 16px.
- Pricing: 3 cols gap 20px, middle card visually elevated (see §8.9).

---

## 5. Borders, radius, elevation

| Element                | Radius | Border           | Shadow                                        |
|------------------------|--------|------------------|-----------------------------------------------|
| Buttons                | 8px    | see §8.1         | none (inner highlight on primary)             |
| Cards (bento, quotes)  | 12px   | 1px `--line`     | none; hover: border `--line-hover` + `translateY(-2px)` |
| Large frames (hero)    | 16px   | 1px `--line`     | `0 1px 2px rgb(0 0 0 / .04), 0 12px 32px rgb(0 0 0 / .06)` |
| Phone frames           | 28px   | none (bezel)     | `0 8px 28px rgb(0 0 0 / .10)`                 |
| Chips                  | 6px    | 1px `--line`     | none                                          |
| Inputs (if any)        | 8px    | 1px `--line`     | focus: 1px `--accent` + 3px `--accent-soft` ring |

Only three shadows exist on the whole page: hero frame, phone frames, sticky
nav's border-appearance. Nothing else elevates.

---

## 6. The production-index annotation system (SIGNATURE)

Every section opens with a full-width annotation row, and media carries
output-log captions. This system encodes real information: section order,
content counts, delivery facts. It is justified because the product IS a
production pipeline — the page presents itself as its own spec sheet.

### 6.1 Section annotation row

Layout: flex row, space-between, baseline aligned, `mono-note` style, 
border-bottom NONE (whitespace only), margin-bottom 20px.

Left: `[NN] SECTION NAME` — the `[NN]` in `--accent` (`mono-idx`), name in
`--text-3`, 12px gap between.
Right: a true fact counterpart in `--text-3`, e.g. `/ HOLD ↔ DRAG`,
`/ 08 FORMATS`, `/ BRIEF → LIVE IN 72H`, `/ PLACEHOLDER DATA` (Results, until
real numbers exist), `/ NO CONTRACTS`, `/ 06 QUESTIONS`.

Index assignments: 00 HERO (rendered inside hero, above H1, left only),
01 THE PROBLEM, 02 THE WORK, 03 WHY AI UGC, 04 PROCESS, 05 RESULTS,
06 THE DIFFERENCE, 07 PRICING, 08 FAQ, 09 START (inside dark CTA band, index
stays `--accent`).

### 6.2 Output-log captions

Under the hero frame and on video chips, mono-note captions read like logs:
`OUTPUT / BATCH 014 — SKINCARE · 9:16 · 72H`, chip labels like
`SKINCARE · TIKTOK`. Never cute, always factual format: SUBJECT · PLATFORM.

---

## 7. Motion system

Library: `motion` (framer-motion successor). One shared variants file
`lib/motion.ts`.

| Token         | Value                                  |
|---------------|----------------------------------------|
| `ease-out`    | `cubic-bezier(0.16, 1, 0.3, 1)`        |
| `dur-fast`    | 180ms (hovers, accordion icon)         |
| `dur-base`    | 400ms (reveals)                        |
| `dur-slow`    | 600ms (hero sequence)                  |

Patterns:
1. **Reveal**: `opacity 0→1, y 8px→0`, `dur-base`, `whileInView`, `once: true`,
   `viewport margin -10%`. Parents stagger children 60ms.
2. **Hero load sequence**: annotation → H1 → sub → CTAs → frame, stagger 90ms,
   `dur-slow` on the frame (opacity + y 12px). Runs on mount, not scroll.
3. **Hover lift**: cards `translateY(-2px)` + border colour, `dur-fast`.
   Primary button: background `--ink → --ink-2`, arrow icon `translateX(2px)`.
4. **Marquee**: CSS keyframes, linear, 40s loop, pause on hover. Duplicated
   track for seamless loop.
5. **Accordion**: height auto-animate 260ms `ease-out`; Plus icon rotates 45°.
6. **Reel drag**: native scroll-snap; on desktop add pointer-drag with inertia
   (simple pointerdown/move handler), progress hairline 2px `--ink` on
   `--line` track beneath, width = scroll progress.

Forbidden: parallax, scale-in >1.02, scroll-jacking, spring bounces, blur-in,
letter-by-letter text animation.

`prefers-reduced-motion: reduce` → all reveals render visible immediately,
marquee static (single row, overflow hidden), video autoplay still allowed but
no motion transforms.

---

## 8. Component specifications

### 8.1 Buttons

- **Primary**: bg `--ink`, text `#FFFFFF`, `label` type, radius 8px, padding
  10px 18px, inner highlight `inset 0 1px 0 rgb(255 255 255 / .08)`. Hover:
  bg `--ink-2`. With trailing `ArrowRight` 16px where specified.
- **Secondary**: bg `--bg`, 1px `--line`, text `--ink`. Hover: border
  `--line-hover`, bg `--bg-subtle`.
- **Inverted** (dark band only): bg `#FFFFFF`, text `--ink`. Hover: bg
  `#F3F3F5`.
- Focus-visible (all): `outline: 2px solid --accent; outline-offset: 2px`.

### 8.2 Nav

Height 64px, sticky top-0 z-50. Default: transparent bg, no border. After
8px scroll: `background: rgb(255 255 255 / .85)`, `backdrop-blur: 12px`,
`border-bottom: 1px solid --line` (animate opacity 180ms). Left: wordmark
`REDPXL` (`label`, weight 650, tracking -0.02em, `--ink`) + 6×6px `--accent`
square, 8px gap, baseline-aligned. Center (lg+): anchors, `label` `--text-2`,
hover `--ink`, 28px gaps. Right: mailto `hello@redpxl.uk` (`mono-note`,
hidden <lg) + Primary button "Book a call". Mobile: Menu icon → full-width
white dropdown, hairline separators, 16px links, CTA at bottom.

### 8.3 VideoSlot

Props: `src?`, `poster?`, `chip: string`, `ratio: "9:16" | "1:1" | "16:9"`.
Renders `<video muted loop playsInline preload="none">`; if no `src`, renders
poster state: `--bg-inset` base with a 1px `--line` inner border and a
centred 44px white circle (1px `--line`) holding lucide `Play` 16px `--ink`.
Chip: absolute top-2 left-2, white/92 bg, 1px `--line`, radius 6px, padding
3px 8px, `mono-note` `--ink`. `{/* TODO:REAL-DATA drop MP4s in /public/videos */}`.

### 8.4 PhoneFrame

Wrapper: radius 28px, bg `--bezel`, padding 8px, shadow per §5. Inner: radius
20px overflow-hidden holding a 9:16 VideoSlot. Standard width 220px desktop /
160px mobile. Hero cluster: 3 frames, middle 240px and translateY(-12px),
outer two rotate -2.5° / +2° and overlap middle by 24px, z-index middle top.

### 8.5 Section shell

`<Section idx="01" name="THE WORK" note="HOLD ↔ DRAG" title="..." sub="...">` —
renders container, annotation row (§6.1), title `display-2`, optional sub
`body-lg`, then children. All sections use this shell. `id` prop for anchors;
`scroll-margin-top: 96px`.

### 8.6 Bento card

White, 1px `--line`, radius 12px, padding 28px. Header row: 28×28 tile radius
6px bg `--accent-soft` containing lucide icon 16px `--accent`, beside it a
`mono-note` micro-label. Then 16px gap, `title-1`, 8px, `body`. Stat variant:
`stat` numeral + `mono-note` unit on baseline. Hover per §5.

### 8.7 Comparison table

lg+: real `<table>`, hairline row dividers only (no verticals, no zebra).
Header `title-2`; REDPXL column: `--accent-soft` bg, 2px `--accent` top
border, header text `--accent-dark`. Cells: icon (16px, §2.3 colours) + 
`body` short text. <lg: three stacked cards, REDPXL card first with accent
border.

### 8.8 Accordion (FAQ)

No boxes. Items divided by 1px `--line`. Row: `title-1` question left,
lucide `Plus` 18px `--text-3` right (rotates 45° open, colour `--accent`
when open). Padding 24px 0. Answer: `body`, max-w 640px, pb 24px. One item
open at a time. Buttons are `<button aria-expanded>` for a11y.

### 8.9 Pricing card

White, 1px `--line`, radius 12px, padding 32px. Top: `mono-note` plan name,
then price row: `stat`-sized numeral + `/mo` in `mono-note`. Divider. Feature
list: lucide `Check` 14px `--pos`, `body`. CTA secondary (primary on
featured). Featured (Growth): 1px `--accent` border, chip `MOST POPULAR`
(`mono-note`, `--accent`, bg `--accent-soft`) top-right, translateY(-8px) on
lg+, primary CTA.

### 8.10 Quote card

White, 1px `--line`, radius 12px, padding 28px. Quote: 18px, `--ink`, weight
450, leading 1.5. Footer: 32px circle `--bg-inset` (initials, `mono-note`) +
name `title-2` + role `mono-note`. `{/* TODO:REAL-DATA */}`.

### 8.11 Logo marquee

Row height 56px, mask-image linear fade 48px both edges. Items: text
wordmarks `title-2` weight 550, `--text-3`, 64px gaps. `{/* TODO:REAL-DATA */}`.

### 8.12 Stat card (Results)

White, 1px `--line`, radius 12px, padding 28px. `stat` numeral (`--ink`) with
sign/unit in `mono-note` `--accent`; below, `body` one-line description;
bottom, `mono-note` `--text-3` source line reading `SOURCE: CAMPAIGN DATA —
PENDING` until real. Honest by design.

---

## 9. Section-by-section blueprint (final)

### [NAV]
Per §8.2. Anchors: Work `#work`, Why AI UGC `#why`, Process `#process`,
Pricing `#pricing`, FAQ `#faq`. CTA href: `https://calendly.com/meeting-redpxl`
(target _blank).

### [00] HERO — lg+: 2-col (7/5), <lg: stacked
Left col: annotation `[00] AI UGC VIDEO ADS — DONE FOR YOU` (left part only);
H1 `display-1`: **"UGC ads engineered to convert."**; sub `body-lg` max-w
560px: "Hyper-realistic AI-generated video and static ads for your brand.
Scripted with proven direct-response hooks, delivered in 72 hours, ready for
TikTok, Meta and YouTube."; CTA row (16px gap): Primary "Book a free strategy
call" + Secondary "See the work →" (`#work`).
Right col: hero frame per §5 (16px radius) with 24px inner padding on
`--bg` — contains the 3-phone cluster (§8.4). Below frame, caption
`mono-note`: `OUTPUT / BATCH 014 — SKINCARE · 9:16 · 72H`.
Mobile: text → CTAs stacked full-width → frame (2 phones only, no rotation).

### [—] LOGO STRIP
No annotation (it's connective tissue, not a section). 13px `--text-3` line:
"Trusted by brands across e-commerce, apps and FMCG", 24px, marquee §8.11.
py-48px only.

### [01] THE PROBLEM — note `/ CREATIVE FATIGUE`
Title: "Your winning ad is already dying." Single-paragraph statement, no
cards, standard Section shell. Body `body-lg` max-w 720px: "On Meta and
TikTok, a top creative fatigues in 7–14 days — and most brands ship 2–4 new
ads a month, nowhere near the 15–20 it takes to keep CPMs down. The bottleneck
was never budget. It's production. We remove it."

### [02] THE WORK `#work` — note `/ HOLD ↔ DRAG`
Title: "Made to stop the scroll." Sub: "See it, then judge it. Most people
can't tell it's AI — and on paid social, native beats polished." Full-bleed
scroll-snap reel: 8 PhoneFrames, gap 20px, chips: SKINCARE · TIKTOK,
SUPPLEMENTS · META, FASHION · TIKTOK, MOBILE APP · META, BEAUTY · TIKTOK,
FITNESS · REELS, FOOD & BEV · TIKTOK, SAAS · YOUTUBE. Progress hairline per
§7.6. Edge fade masks 48px.

### [03] WHY AI UGC `#why` — note `/ 06 REASONS`
Title: "Everything creators do. None of what slows you down." Bento per §4.5:
- Wide A "Hyper-realistic creators" — micro-label `GENERATION` — "AI-generated
  people indistinguishable from filmed UGC. No casting calls, no shipping
  products, no chasing creators for reshoots." Icon: `Users`.
- Wide B "Hooks that convert" — micro-label `SCRIPTING` — "Every script is
  built from a library of 50+ proven direct-response hook frameworks — not
  guesswork." Contains inline mock: bordered mini-frame (radius 8px, bg
  `--bg-subtle`) with 3 stacked `mono-note` hook lines: "POV: YOU'VE BEEN
  DOING IT WRONG", "STOP SCROLLING IF YOU…", "3 REASONS YOUR ADS FLOP".
  Icon: `Zap`.
- "72h turnaround" — stat variant, numeral 72, unit `HOURS` — "Fresh statics
  and videos in three days — not the two weeks a creator shoot takes." Icon
  `Clock`. Micro-label `SPEED`.
- "The volume you need" — "Most brands ship 2–4 ads a month. Winning on paid
  social takes 15–20. We produce at that pace." Icon `Layers`. Micro-label
  `VOLUME`.
- "A fraction of the cost" — "Creator video runs £150–500 a piece. Our plans
  work out from around £100 an ad." Icon `PoundSterling`. Micro-label `COST`.
- "Native, not glossy" — "UGC-style creative built to convert on paid social —
  not studio gloss that gets scrolled past." Icon `Smartphone`. Micro-label
  `NATIVE`.
Formats moved out of Why (now shown in Pricing) — sizes are 9:16 · 1:1 · 4:5.

### [04] PROCESS `#process` — note `/ BRIEF → LIVE IN 72H` — on `--bg-subtle`
Title: "Three steps. Zero friction." 3 white cards (§4.5), each: ghost
numeral 01/02/03 (`stat` size, `--accent` at 12% opacity, absolute top-right),
`title-1` + `body`:
01 **Brief** — "Send us your product, brand, and current ads. We study what's
working and where you're leaving performance on the table."
02 **Produce** — "We generate platform-ready statics and videos — fresh hooks,
new angles, native formats — built to your brand."
03 **Test** — "A clean, labeled, ready-to-run batch in 72 hours. Rotate them,
find your winners, and we refresh before they fatigue."
Desktop: 16px `ArrowRight` `--text-3` centered between cards.

### [05] RESULTS — note `/ PLACEHOLDER DATA`
Title: "Built for performance, measured in revenue." 3 stat cards (§8.12):
`212%` AVG ROAS UPLIFT / `−38%` COST PER ACQUISITION / `10×` CREATIVE OUTPUT.
Then 2 quote cards (§8.10) with obviously-placeholder names ("Founder,
DTC skincare brand"). ALL `{/* TODO:REAL-DATA */}`. Note stays
`/ PLACEHOLDER DATA` until real; then becomes `/ LAST 90 DAYS`.

### [06] THE DIFFERENCE — note `/ OLD WAY VS REDPXL`
Title: "The old way vs the Redpxl way." Table §8.7. Rows:
| Row              | Creators            | DIY AI tools        | REDPXL UGC              |
| Cost per video   | £150–£400           | Your time           | From £100/ad on plans   |
| Turnaround       | 2–4 weeks           | Days of trial/error | 72 hours                |
| Consistency      | Varies per creator  | Varies per prompt   | Engineered pipeline     |
| Usage rights     | Licensed, expiring  | Unclear             | Full, forever           |
| Hook strategy    | Creator's instinct  | None                | 50+ tested frameworks   |
| Revisions        | Renegotiated        | Start over          | Included                |

### [07] PRICING `#pricing` — note `/ EXCL. VAT · NO CONTRACTS`
Title: "Start with a trial. Scale with a plan." Trial-first funnel:

(A) Full-width TRIAL card (§8.9 styling, accent border): chip `TRIAL BATCH`
(`mono-note`, `--accent`, bg `--accent-soft`); `title-1` "See the quality
before you commit."; `body` "8 ads, delivered in 72 hours. The full £750 is
credited toward month one if you start a plan within 14 days — so trying us is
effectively free."; price `stat` £750 + `mono-note` `ONE-TIME`; primary CTA
"Start a trial batch" (`{/* TODO:STRIPE checkout link */}`).

(B) Three plan cards §8.9 (Growth featured, chip `Most popular`), each with
the price `stat` + `/mo`, a volume line, then the shared inclusions:
- STARTER £2,000/mo — 15 ads per month.
- GROWTH (featured) £3,500/mo — 30 ads per month · + Monthly performance &
  angle review.
- SCALE £6,000/mo — 60 ads per month · + Dedicated creative lead · + We work
  inside your ad account.
Shared inclusions on every plan: "Mix of image + video ads — you choose the
split", "All sizes: 9:16 · 1:1 · 4:5", "1 revision per ad", "Full paid usage
rights". Plan CTA "Book a call" (secondary; primary on Growth).

(C) Three centered `mono-note` lines: "Prefer a one-off batch? £150 per ad,
10-ad minimum." · "Rush 48-hour delivery +25% · Pay 3 months upfront −10% ·
Pay 12 months −15%" · "All prices excluding VAT". (The rush line is the only
place 48h still appears.)

### [08] FAQ `#faq` — note `/ 06 QUESTIONS`
Title: "The honest answers." Items (write answers confident, 2–3 sentences,
first-person plural):
1. Does AI-made creative actually convert?
2. Will it match my brand?
3. Do I keep the rights?
4. How fast can we start?
5. What if I don't like them? (risk reversal)
6. What's the difference between the trial and a plan?

### [09] START — dark band
Full-width `--ink` bg, py-112px, container inside. Annotation `[09] START`
(index `--accent`, name `rgb(255 255 255 / .5)`), right note `/ 15 MIN CALL`.
Title `display-2` white: "Stop running tired ads." Sub `body-lg`
`rgb(255 255 255 / .65)`: "Get your first batch this week and give your paid
social the creative volume it's been missing." CTAs: Inverted "Book a free
strategy call" + ghost link `hello@redpxl.uk` (white/70, hover white). No
other decoration — flat ink, typography only.

### [FOOTER]
White, 1px `--line` top. Row 1: wordmark + red square; right: anchor links
`label` `--text-2`. Row 2 (`mono-note` `--text-3`): "A REDPXL COMPANY —
CANARY WHARF, LONDON" · `SUPPORT@REDPXL.UK` · "© 2026 REDPXL LIMITED" ·
Terms · Privacy (# placeholders). py-48px.

---

## 10. Accessibility & quality floor

- Contrast: `--text-2` on white = 5.9:1 ✓; `--text-3` only for 12px+ mono
  captions (4.0:1 — acceptable for incidental text, never for body copy).
  Never `--accent` text below 14px except annotations (incidental).
- All interactive elements keyboard reachable; focus-visible per §8.1.
- Videos: `muted playsInline`, `preload="none"`, `aria-label` from chip text.
- Semantic landmarks: `header / main / section[aria-labelledby] / footer`.
- `prefers-reduced-motion` per §7. Lighthouse targets: Perf ≥ 95, A11y ≥ 95.

## 11. Implementation notes

- Tokens live in `globals.css` `:root`; map to Tailwind via `@theme` (v4).
- File structure: `components/{Nav,Hero,LogoStrip,Work,Why,Process,Results,
  Comparison,Pricing,Faq,FinalCta,Footer,ui/{Button,Section,VideoSlot,
  PhoneFrame,Chip}}.tsx`, shared `lib/motion.ts`.
- No component may hardcode a hex, px shadow, or font weight — tokens only.
- `npm run build` must pass with zero errors/warnings before any handoff.

---

## 12. PosterCanvas — the placeholder system (v1.2)

Every `VideoSlot` without a `src` renders `components/ui/PosterCanvas.tsx` — a
designed placeholder that reads as a paused UGC video, never an empty box. The
reel and hero therefore read as a wall of real, varied content.

Each poster carries:
- **Per-niche duotone** — a soft two-stop radial gradient, desaturated and
  quiet, derived from the chip subject (skincare / fitness / fashion /
  beauty / food / supplements / app·saas / default). All poster hexes live as
  `--poster-{niche}-1/2` CSS vars in `globals.css` (§11 — components stay
  hex-free); the component only references the vars.
- **UGC UI overlay** — two short mono-note caption chips (10px, white on
  `black/35`, radius 4px) reading like hook text, plus a 2px `white/70`
  progress bar at a deterministic 30–70% width (hashed from the chip, SSR-safe).
- **Film grain** — an inline SVG `feTurbulence` layer at 4% opacity,
  `mix-blend: overlay`.
- **Hover** (driven by the parent VideoSlot `group`): poster inner content
  scales 1.03, the border goes `--line-hover`, and the centre play button
  scales 1.08 with its fill inverting to `--ink` / white icon — all
  `dur-fast` on `--ease-out`.
- **Hero cycling** — the hero middle phone passes `cycleHooks`; the top caption
  crossfades (opacity only, 400ms) through them every 3.5s, pausing on hover.
  This is the page's one "alive" moment above the fold.

Supporting craft added in v1.2: `CountUp` (§4 count-up stats, tabular-nums,
in-view once, reduced-motion safe), tabular figures on stats/prices/indexes,
`text-wrap: balance` on display titles / `pretty` on body-lg subs, the
annotation rule-fill (label — rule — note), 6px phone bezels, Attio corner
ticks on the hero frame, nav active-section dot, reel momentum, and the
32px SVG favicon + 1200×630 `og.png`.

Reduced motion: counters, the hero caption cycler, the batch-number tick, the
marquee, and the load sequence all degrade to their static end state.

*End of specification. v1.0 — changes require a version bump and changelog line here.*

*v1.1 — 72h standard delivery (48h now a rush add-on); image+video mix; formats 9:16·1:1·4:5; new THE PROBLEM section (sections renumbered); trial-first pricing funnel with real prices; copy overhaul.*

*v1.2 — Ultra polish pass: PosterCanvas placeholder system (§12); count-up stats; hero life (cycling caption, corner ticks, batch tick); motion/craft details (tabular figures, text-wrap, annotation rule-fill, nav active dot, reel momentum, comparison row hover, 6px bezels); 32px SVG favicon + og.png.*
