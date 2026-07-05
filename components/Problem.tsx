import Section from "@/components/ui/Section";

/**
 * DESIGN.md §6 / §8.5 — THE PROBLEM.
 * Inserted between LOGO STRIP and THE WORK. Single-paragraph statement of the
 * creative-fatigue problem, no cards. Uses the standard Section shell.
 */
export default function Problem() {
  return (
    <Section
      idx="01"
      name="THE PROBLEM"
      note="CREATIVE FATIGUE"
      title="Your winning ad is already dying."
    >
      <p className="body-lg max-w-[720px]!">
        On Meta and TikTok, a top creative fatigues in 7–14 days — and most
        brands ship 2–4 new ads a month, nowhere near the 15–20 it takes to keep
        CPMs down. The bottleneck was never budget. It&apos;s production. We
        remove it.
      </p>
    </Section>
  );
}
