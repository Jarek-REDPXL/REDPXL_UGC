import { Check } from "lucide-react";
import Canvas from "@/components/ui/Canvas";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * DESIGN.md §8.9 pricing card + §9 [09] PRICING.
 * Full-width trial card, three plan cards (Growth featured), quiet mono-notes.
 */
type Plan = {
  name: string;
  price: string;
  volume: string;
  features: string[];
  featured: boolean;
};

// Every plan starts with these four shared inclusions, in this order.
const SHARED_INCLUSIONS = [
  "Mix of image + video ads — you choose the split",
  "All sizes: 9:16 · 1:1 · 4:5",
  "1 revision per ad",
  "Full paid usage rights",
];

const PLANS: Plan[] = [
  {
    name: "STARTER",
    price: "£2,000",
    volume: "15 ads per month",
    features: [...SHARED_INCLUSIONS],
    featured: false,
  },
  {
    name: "GROWTH",
    price: "£3,500",
    volume: "30 ads per month",
    features: [...SHARED_INCLUSIONS, "Monthly performance & angle review"],
    featured: true,
  },
  {
    name: "SCALE",
    price: "£6,000",
    volume: "60 ads per month",
    features: [
      ...SHARED_INCLUSIONS,
      "Dedicated creative lead",
      "We work inside your ad account",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <Canvas
      id="pricing"
      idx="09"
      name="PRICING"
      note="EXCL. VAT · NO CONTRACTS"
      tint="blush"
      title="Start with a trial. "
      titleDeep="Scale with a plan."
    >
      {/* (A) Trial card */}
      <div className="flex flex-col gap-6 rounded-card border border-accent bg-bg p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="mono-note inline-flex rounded-chip bg-accent-soft px-2 py-1 text-accent">
            TRIAL BATCH
          </span>
          <h3 className="title-1 mt-4">See the quality before you commit.</h3>
          <p className="body-copy mt-2 max-w-[520px]">
            8 ads, delivered in 72 hours. The full £750 is credited toward month
            one if you start a plan within 14 days — so trying us is effectively
            free.
          </p>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="stat">£750</span>
            <span className="mono-note">ONE-TIME</span>
          </div>
          {/* TODO:STRIPE checkout link */}
          <Button href="#" external={false} variant="primary" className="mt-4">
            Start a trial batch
          </Button>
        </div>
      </div>

      {/* (B) Three plan cards */}
      <StaggerGroup className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <RevealItem key={plan.name} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-card border bg-bg p-8 ${
                plan.featured
                  ? "border-accent lg:-translate-y-2"
                  : "border-line"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-8 rounded-chip bg-accent-soft px-2 py-1 mono-note text-accent">
                  Most popular
                </span>
              )}

              <p className="mono-note">{plan.name}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="stat">{plan.price}</span>
                <span className="mono-note">/mo</span>
              </div>

              <p className="body-copy mt-2 text-ink">{plan.volume}</p>

              <div className="mt-6 border-t border-line" />

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 body-copy"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pos"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={site.bookingUrl}
                external
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Book a call
              </Button>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>

      {/* (C) Quiet mono-note lines */}
      {/* TODO: confirm VAT registration before launch */}
      <div className="mt-8 space-y-1">
        <p className="mono-note text-center">
          Prefer a one-off batch? £150 per ad, 10-ad minimum.
        </p>
        <p className="mono-note text-center">
          Rush 48-hour delivery +25% · Pay 3 months upfront −10% · Pay 12 months
          −15%
        </p>
        <p className="mono-note text-center">All prices excluding VAT</p>
      </div>
    </Canvas>
  );
}
