import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import { StaggerGroup, RevealItem } from "@/components/Stagger";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * DESIGN.md §9 [06] PRICING + §8.9 pricing card.
 * Three plans; Growth is featured (accent border, chip, lifted, primary CTA).
 */
type Plan = {
  name: string;
  price: string;
  perMonth: boolean;
  features: string[];
  cta: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "£X",
    perMonth: true,
    features: [
      "10 videos per month",
      "2 AI creators",
      "1 revision round",
      "48-hour delivery",
      "Full usage rights",
    ],
    cta: "Book a call",
    featured: false,
  },
  {
    name: "Growth",
    price: "£X",
    perMonth: true,
    features: [
      "25 videos per month",
      "5 AI creators",
      "Weekly winner iterations",
      "Priority 48-hour delivery",
      "Full usage rights",
      "Private Slack channel",
    ],
    cta: "Book a call",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    perMonth: false,
    features: [
      "Unlimited pipeline",
      "Dedicated strategist",
      "Ad account collaboration",
      "Custom AI creators",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <Section
      id="pricing"
      idx="06"
      name="PRICING"
      note="NO CONTRACTS"
      title="Simple plans. Serious output."
    >
      <StaggerGroup className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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
                {/* TODO:REAL-DATA */}
                <span className="stat">{plan.price}</span>
                {plan.perMonth && <span className="mono-note">/mo</span>}
              </div>

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
                {plan.cta}
              </Button>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>

      <p className="mono-note mt-8 text-center">
        Pause or cancel anytime · Every plan includes full usage rights
      </p>
    </Section>
  );
}
