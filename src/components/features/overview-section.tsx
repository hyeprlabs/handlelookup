import { AtSign, Layers3, Zap } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "@/components/features/api/section-shell";

const items = [
  {
    title: "One handle, every platform",
    description:
      "Send a single username and get back availability for every platform you care about — no parallel requests, no glue code.",
    icon: AtSign,
    label: "Single API call",
  },
  {
    title: "65+ platforms covered",
    description:
      "From Instagram and TikTok to GitHub, LinkedIn, and Twitch — one integration covers the full landscape of social and developer platforms.",
    icon: Layers3,
    label: "Broad coverage",
  },
  {
    title: "Results in milliseconds",
    description:
      "Optimised lookup pipelines return clean, per-platform JSON fast enough to use directly in signup flows without hurting UX.",
    icon: Zap,
    label: "Production speed",
  },
];

export function OverviewSection() {
  return (
    <SectionShell
      sectionId="01"
      title="What Handle Lookup does"
      description="Username availability checking, solved. One endpoint returns structured results across every major platform."
    >
      <div className="grid gap-4 p-4 md:grid-cols-3 md:p-5">
        {items.map((item) => (
          <Card key={item.title} className="gap-0 p-0">
            <CardHeader className="border-b px-4 py-3">
              <CardAction>
                <item.icon className="size-4 text-muted-foreground" />
              </CardAction>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-3">
              <CardDescription>{item.description}</CardDescription>
              <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                {item.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
