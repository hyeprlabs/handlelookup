import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "@/components/features/api/section-shell";

const steps = [
  {
    step: "01",
    title: "Authenticate",
    description:
      "Generate an API key from your dashboard and pass it as a Bearer token. Every request is tied to your account and its credit balance.",
  },
  {
    step: "02",
    title: "Send a handle",
    description:
      "POST a JSON body with the username you want to check and the list of platforms. No SDK required — plain HTTP works anywhere.",
  },
  {
    step: "03",
    title: "Read the result",
    description:
      "Receive a structured JSON response with per-platform availability, status code, and a direct profile URL — all in one response.",
  },
  {
    step: "04",
    title: "Act on it",
    description:
      "Show a live availability grid in your signup flow, block conflicting usernames, or surface suggestions — whatever your product needs.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionShell
      sectionId="02"
      title="How it works"
      description="Four steps from API key to availability data. No wrapper libraries, no complex setup."
      className="mt-12 md:mt-16"
    >
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5">
        {steps.map((step) => (
          <Card key={step.step} size="sm" className="gap-0 p-0">
            <CardHeader className="border-b px-4 py-3">
              <CardAction>
                <span className="rounded-full border bg-secondary/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {step.step}
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
