import { Annotation } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/**
 * DESIGN.md §9 [08] START — the single dark moment.
 * Flat ink band, left-aligned, typography only. The FAQ→Final CTA hairline
 * (§4.3) is provided by `divider-top`.
 */
export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-ink divider-top">
      <div className="section-y">
        <div className="container-x">
          <Reveal>
            <Annotation
              idx="09"
              name="START"
              note="15 MIN CALL"
              tone="dark"
              labelId="cta-title"
            />
          </Reveal>

          <Reveal>
            <h2 id="cta-title" className="display-2 text-white mt-5">
              Stop running tired ads.
            </h2>
          </Reveal>

          <Reveal>
            <p className="body-lg text-white/65 mt-3">
              Get your first batch this week and give your paid social the
              creative volume it&apos;s been missing.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={site.bookingUrl} external variant="invert">
                Book a free strategy call
              </Button>
              <Button href={`mailto:${site.email}`} variant="ghost">
                {site.email}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
