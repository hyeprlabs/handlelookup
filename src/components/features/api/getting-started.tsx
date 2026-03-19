import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "@/components/features/api/section-shell";

const quickSteps = [
  {
    title: "1. Get your API key",
    description:
      "Create an account and generate a private API key from your dashboard.",
  },
  {
    title: "2. Send a handle",
    description:
      "Call the lookup endpoint with one username and the platforms you want to check.",
  },
  {
    title: "3. Read the result",
    description:
      "Receive per-platform availability status so you can pick a handle fast.",
  },
];

export function GettingStarted() {
  return (
    <SectionShell
      title="Getting Started"
      description="Authenticate with your key, send a handle, and receive per-platform availability in one response."
      sectionId="01"
    >
      <div className="grid gap-4 p-4 md:grid-cols-3 md:p-5">
        {quickSteps.map((step, index) => (
          <Card key={step.title} size="sm" className="gap-0 p-0">
            <CardHeader className="border-b px-4 py-3">
              <CardAction>
                <span className="rounded-full border bg-secondary/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </CardAction>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
