import { CreditsSlider } from "@/components/pricing/credits-slider";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CoinsIcon, GaugeIcon, RefreshCwIcon } from "lucide-react";

const creditRules = [
  {
    icon: CoinsIcon,
    text: "1 lookup = 1 credit",
  },
  {
    icon: GaugeIcon,
    text: "Free: 15 req/min, Pro: 240 req/min",
  },
  {
    icon: RefreshCwIcon,
    text: "Top-ups in 10k credit packs",
  },
];

export function CreditsSection() {
  return (
    <section className="mx-auto my-12 max-w-5xl sm:my-16 md:my-20">
      <div className="relative">
        <FullWidthDivider position="top" />
        <FullWidthDivider position="bottom" />

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          <div className="flex flex-col bg-background px-4 py-6 sm:col-span-1">
            <p className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">
              CREDITS
            </p>
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl leading-tight">
              Flexible, predictable API costs
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              Clear credit math with volume discounts.
            </p>

            <ul className="mt-6 space-y-3">
              {creditRules.map((rule) => {
                const Icon = rule.icon;

                return (
                  <li
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                    key={rule.text}
                  >
                    <Icon className="size-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                    <span>{rule.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-background px-4 py-6 sm:col-span-2">
            <CreditsSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
