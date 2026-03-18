import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Gauge, Layers3, Workflow } from "lucide-react";
import { SectionShell } from "@/components/features/api/section-shell";

const featureItems = [
  {
    title: "Multi-platform lookup",
    description:
      "Check one handle across multiple social platforms in a single API call.",
    icon: Layers3,
  },
  {
    title: "Fast responses",
    description:
      "Get availability results quickly so users can decide and claim names sooner.",
    icon: Gauge,
  },
  {
    title: "Simple integration",
    description:
      "Use straightforward JSON payloads that are easy to plug into any app stack.",
    icon: Workflow,
  },
  {
    title: "Consistent output",
    description:
      "Receive predictable fields per platform to simplify UI and backend logic.",
    icon: BadgeCheck,
  },
];

export function FeaturesSection() {
  return (
    <SectionShell
      title="API Features"
      description="Core capabilities of Handle Lookup API, ordered from lookup workflow to developer integration."
      className="mt-12 md:mt-16"
      sectionId="02"
    >
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5">
        {featureItems.map((feature) => (
          <Card key={feature.title} className="gap-0 p-0">
            <CardHeader className="border-b px-4 py-3">
              <CardAction>
                <feature.icon className="size-4 text-muted-foreground" />
              </CardAction>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-3">
              <CardDescription>{feature.description}</CardDescription>
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                Built for product signup flows
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
