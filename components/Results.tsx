import Canvas from "@/components/ui/Canvas";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/ui/CountUp";

/**
 * DESIGN.md §9 [04] RESULTS — stat cards (§8.12) + quote cards (§8.10).
 * All figures and testimonials are illustrative placeholders; the note stays
 * "/ PLACEHOLDER DATA" until real, attributable data replaces them.
 */

type Tone = "ink" | "accent";
// §4 motion — numeric part counts up from 0; sign/unit parts stay static.
type Part = { value: number; tone: Tone } | { t: string; tone: Tone };

const STATS: { parts: Part[]; desc: string }[] = [
  {
    // §8.12 — numeral in ink, sign/unit in accent
    parts: [
      { value: 212, tone: "ink" },
      { t: "%", tone: "accent" },
    ],
    desc: "Average ROAS uplift.",
  },
  {
    parts: [
      { t: "−", tone: "accent" },
      { value: 38, tone: "ink" },
      { t: "%", tone: "accent" },
    ],
    desc: "Cost per acquisition.",
  },
  {
    parts: [
      { value: 10, tone: "ink" },
      { t: "×", tone: "accent" },
    ],
    desc: "Creative output.",
  },
];

// §9 [07] — each stat card gets a 3px top border in a different deep tone,
// tying the section back to the v2.0 clay canvas palette. Colours resolve from
// CSS vars (no hardcoded hex), applied via arbitrary border-colour utilities.
const STAT_DEEP_BORDER = [
  "border-t-[color:var(--deep-sand)]",
  "border-t-[color:var(--deep-sage)]",
  "border-t-[color:var(--deep-mist)]",
];

const QUOTES = [
  {
    quote:
      "We stopped waiting weeks for creator footage. Fresh, on-brand ads now land in our ad account every few days.",
    initials: "PN",
    name: "Placeholder name",
    role: "Founder, DTC skincare brand",
  },
  {
    quote:
      "The hooks are the difference. Every batch is built to test angles, and our winners keep beating our old creator UGC.",
    initials: "PN",
    name: "Placeholder name",
    role: "Head of growth, mobile app",
  },
];

export default function Results() {
  return (
    <Canvas
      idx="07"
      name="RESULTS"
      note="PLACEHOLDER DATA"
      tint="white-border"
      title="Built for performance, measured in revenue."
    >
      {/* Stat cards (§8.12) */}
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <RevealItem
            key={s.desc}
            className={`rounded-card border border-line bg-bg p-7 border-t-[3px] ${STAT_DEEP_BORDER[i]}`}
          >
            {/* TODO:REAL-DATA */}
            <div>
              {s.parts.map((p, i) => (
                <span
                  key={i}
                  className={`stat ${p.tone === "accent" ? "text-accent" : "text-ink"}`}
                >
                  {"value" in p ? <CountUp value={p.value} /> : p.t}
                </span>
              ))}
            </div>
            <p className="body-copy mt-4">{s.desc}</p>
            <p className="mono-note text-text-3 mt-6">
              Source: campaign data — pending
            </p>
          </RevealItem>
        ))}
      </StaggerGroup>

      {/* Quote cards (§8.10) */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {QUOTES.map((q) => (
          <Reveal
            key={q.quote}
            className="rounded-card border border-line bg-bg p-7"
          >
            {/* TODO:REAL-DATA */}
            <p className="quote">“{q.quote}”</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-bg-inset">
                <span className="mono-note text-text-2">{q.initials}</span>
              </div>
              <div>
                <p className="title-2">{q.name}</p>
                <p className="mono-note">{q.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Canvas>
  );
}
