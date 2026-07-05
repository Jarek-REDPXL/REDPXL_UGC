import Section from "@/components/ui/Section";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import { ArrowRight } from "lucide-react";

/** §9 [03] PROCESS — 3 equal cols (§4.5), ghost numerals, on --bg-subtle band. */
const STEPS = [
  {
    num: "01",
    title: "Brief us",
    body: "A 15-minute call or an async form. Brand, product, audience, offer — that's all we need.",
  },
  {
    num: "02",
    title: "We create",
    body: "Scripts, AI generation, editing, captions. First drafts in your inbox within 48 hours.",
  },
  {
    num: "03",
    title: "You scale",
    body: "Launch the batch. We iterate on the winners with fresh variations every week.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      idx="03"
      name="PROCESS"
      note="BRIEF → LIVE IN 48H"
      title="Three steps. Zero friction."
      band
    >
      <StaggerGroup className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <RevealItem key={step.num} className="relative">
            <div className="relative h-full overflow-hidden rounded-card border border-line bg-bg p-7">
              <span
                className="stat absolute right-5 top-4 select-none text-accent"
                style={{ opacity: 0.12 }}
                aria-hidden
              >
                {step.num}
              </span>
              <div className="relative">
                <h3 className="title-1">{step.title}</h3>
                <p className="body-copy mt-2">{step.body}</p>
              </div>
            </div>

            {i < STEPS.length - 1 && (
              <span className="absolute -right-[10px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg">
                  <ArrowRight className="h-3 w-3 text-text-3" />
                </span>
              </span>
            )}
          </RevealItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
