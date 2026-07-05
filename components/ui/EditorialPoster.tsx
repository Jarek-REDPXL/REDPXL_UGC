import CyclingChips from "./CyclingChips";

/**
 * DESIGN.md §9 [00] / §12 — EditorialPoster.
 * A quiet, premium poster for a src-less hero PhoneFrame: a soft 2-stop niche
 * duotone + one hand-built SVG texture layer (blurred, low-contrast, lots of
 * negative space), a 4% grain overlay, and a two-chip caption (hook + meta).
 *
 * Pure server component. Only the center hero phone passes `cycleSets`, which
 * mounts a tiny CyclingChips client island; every other poster is static markup
 * with no hydration. All colour comes from tokens (color-mix over CSS vars), so
 * the component stays hex-free (§11).
 */

export type PosterPalette = "sand" | "mist" | "cream" | "blush" | "sage";
export type PosterVariant = "leaf" | "smear" | "sphere" | "ripple" | "gel";

const PALETTE: Record<PosterPalette, { light: string; deep: string }> = {
  sand: { light: "--canvas-sand", deep: "--deep-sand" },
  mist: { light: "--canvas-mist", deep: "--deep-mist" },
  cream: { light: "--canvas-cream", deep: "--deep-sand" },
  blush: { light: "--canvas-blush", deep: "--deep-blush" },
  sage: { light: "--canvas-sage", deep: "--deep-sage" },
};

/** the two stacked caption chips (shared shape; static here, animated in CyclingChips) */
function ChipPair({ hook, meta }: { hook: string; meta: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="mono-note rounded-[4px] bg-white/[0.92] px-2 py-1 text-[11px]! leading-tight text-ink">
        {hook}
      </span>
      <span className="mono-note rounded-[4px] bg-white/80 px-2 py-1 text-[10px]! leading-tight text-text-2">
        {meta}
      </span>
    </div>
  );
}

/** one blurred, low-contrast texture layer per variant (deep tone / white), viewBox 200×356 (~9:16) */
function Texture({ variant, deep }: { variant: PosterVariant; deep: string }) {
  const fid = `edb-${variant}`;
  const common = {
    viewBox: "0 0 200 356",
    preserveAspectRatio: "xMidYMid slice" as const,
    className: "absolute inset-0 h-full w-full",
  };
  const dc = `var(${deep})`;

  if (variant === "leaf") {
    // two blurred dark leaf silhouettes falling diagonally
    return (
      <svg {...common} aria-hidden>
        <defs>
          <filter id={fid} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g filter={`url(#${fid})`} fill={dc} opacity="0.09">
          <path d="M150 20 C 210 60, 205 150, 120 175 C 150 110, 150 60, 150 20 Z" />
          <path d="M40 180 C 100 215, 96 300, 12 330 C 44 262, 44 216, 40 180 Z" />
        </g>
      </svg>
    );
  }

  if (variant === "smear") {
    // wide soft bezier swoosh in a lighter tone
    return (
      <svg {...common} aria-hidden>
        <defs>
          <filter id={fid} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path
          d="M-20 250 C 60 170, 150 300, 240 190"
          fill="none"
          stroke="#fff"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.5"
          filter={`url(#${fid})`}
        />
      </svg>
    );
  }

  if (variant === "sphere") {
    // a soft sphere resting on a faint horizon line, with a blurred shadow
    return (
      <svg {...common} aria-hidden>
        <defs>
          <filter id={fid} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <radialGradient id={`${fid}-g`} cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor={dc} stopOpacity="0.14" />
          </radialGradient>
        </defs>
        <line x1="0" y1="232" x2="200" y2="232" stroke={dc} strokeWidth="1.5" opacity="0.12" />
        <ellipse cx="104" cy="240" rx="66" ry="12" fill={dc} opacity="0.12" filter={`url(#${fid})`} />
        <circle cx="100" cy="176" r="64" fill={`url(#${fid}-g)`} />
      </svg>
    );
  }

  if (variant === "ripple") {
    // six thin concentric arcs
    return (
      <svg {...common} aria-hidden>
        <g fill="none" stroke={dc} strokeWidth="1.4" opacity="0.12">
          {[34, 60, 86, 112, 138, 164].map((r) => (
            <path key={r} d={`M ${140 - r} 250 A ${r} ${r} 0 0 1 ${140 + r} 250`} />
          ))}
        </g>
      </svg>
    );
  }

  // gel-drop: a rounded blob with a specular highlight
  return (
    <svg {...common} aria-hidden>
      <defs>
        <filter id={fid} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <path
        d="M100 120 C 150 120, 172 168, 158 210 C 146 250, 96 268, 62 240 C 30 214, 40 150, 100 120 Z"
        fill={dc}
        opacity="0.12"
        filter={`url(#${fid})`}
      />
      <ellipse cx="86" cy="162" rx="20" ry="12" fill="#fff" opacity="0.5" filter={`url(#${fid})`} />
    </svg>
  );
}

export default function EditorialPoster({
  variant,
  palette,
  hook,
  meta,
  cycleSets,
}: {
  variant: PosterVariant;
  palette: PosterPalette;
  hook: string;
  meta: string;
  /** center hero phone only — the chip pair crossfades through these */
  cycleSets?: { hook: string; meta: string }[];
}) {
  const p = PALETTE[palette];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* soft 2-stop niche duotone */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(158deg, var(${p.light}) 0%, color-mix(in oklab, var(${p.light}) 66%, var(${p.deep})) 100%)`,
        }}
      />

      {/* editorial texture */}
      <Texture variant={variant} deep={p.deep} />

      {/* grain (cached raster) */}
      <div className="grain-tex absolute inset-0 opacity-[0.04]" />

      {/* two-chip caption, lower-left; texture bleeds below it */}
      <div className="absolute bottom-[20%] left-3 right-3">
        {cycleSets && cycleSets.length > 1 ? (
          <CyclingChips sets={cycleSets} />
        ) : (
          <ChipPair hook={hook} meta={meta} />
        )}
      </div>
    </div>
  );
}
