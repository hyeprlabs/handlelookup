import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export type Interval = "monthly" | "yearly";

type Limits = {
  credits: string;
  requests: string;
  rateLimit: string;
};

export type Product = {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  featuresTitle: string;
  href?: string;
  usage: {
    monthly: Limits;
    yearly: Limits;
  };
  features: {
    monthly: string[];
    yearly: string[];
  };
  isPopular?: boolean;
};

type PricingCardProps = {
  product: Product;
  interval: Interval;
};

export function PricingCard({ product, interval }: PricingCardProps) {
  const isYearly = interval === "yearly";
  const displayedPrice = isYearly ? product.yearlyPrice : product.monthlyPrice;
  const periodLabel =
    displayedPrice === "Free" ? "" : isYearly ? "/ year" : "/ month";
  const features = product.features[interval];
  const usage = product.usage[interval];
  const usageRows: Array<[string, string]> = [
    ["Credits", usage.credits],
    ["Requests", usage.requests],
    ["Rate limit", usage.rateLimit],
  ];

  return (
    <div className="flex flex-col bg-background">
      <div className="border-b px-4 py-6">
        <p className="mb-4 text-muted-foreground text-xs uppercase tracking-wider">
          {product.name}
        </p>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className="font-bold text-3xl sm:text-4xl">{displayedPrice}</h2>
          <span className="text-muted-foreground text-xs">{periodLabel}</span>
        </div>
        <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
          {product.description}
        </p>

        <Button
          asChild
          className="w-full"
          variant={product.isPopular ? "default" : "outline"}
        >
          <Link href={product.href ?? "/"}>Get started</Link>
        </Button>
      </div>

      <div className="text-muted-foreground text-sm">
        <div className="px-4 py-6">
          <p className="mb-4 text-xs uppercase">{product.featuresTitle}</p>

          <ul className="space-y-3">
            {features.map((feature) => (
              <li
                className="flex items-center gap-2 text-foreground/80"
                key={feature}
              >
                <CheckIcon className="size-4 flex-shrink-0 text-emerald-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t px-4 py-3">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
            Usage limits
          </p>
        </div>

        <div className="border-t">
          <table className="w-full border-collapse">
            <tbody>
              {usageRows.map(([label, value], index) => (
                <tr
                  className={index < usageRows.length - 1 ? "border-b" : ""}
                  key={label}
                >
                  <th className="border-r bg-muted/20 px-3 py-3 text-left font-medium text-foreground/70 text-sm">
                    {label}
                  </th>
                  <td className="bg-secondary/45 px-3 py-3 text-sm truncate">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
