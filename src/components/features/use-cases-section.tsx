import {
  UserPlusIcon,
  BuildingIcon,
  PaletteIcon,
  CodeIcon,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "@/components/features/api/section-shell";

const useCases = [
  {
    title: "Signup flows",
    description:
      "Show live handle availability as users type their name during registration. Prevent frustration from taken usernames before the form is submitted.",
    icon: UserPlusIcon,
    label: "Most common use case",
  },
  {
    title: "Brand launches",
    description:
      "Before launching a product or rebrand, verify your chosen name is available across every relevant social channel in a single check.",
    icon: BuildingIcon,
    label: "Brand strategy",
  },
  {
    title: "Creator tools",
    description:
      "Help content creators find a consistent handle across platforms. Power name-suggestion features and availability dashboards in creator apps.",
    icon: PaletteIcon,
    label: "Creator economy",
  },
  {
    title: "Developer utilities",
    description:
      "Build CLI tools, browser extensions, or internal dashboards that surface username data across platforms without maintaining per-platform scraping logic.",
    icon: CodeIcon,
    label: "Developer tooling",
  },
];

export function UseCasesSection() {
  return (
    <SectionShell
      sectionId="03"
      title="Who builds with Handle Lookup"
      description="From indie hackers to product teams — any app that cares about usernames benefits from a single, reliable lookup API."
      className="mt-12 md:mt-16"
    >
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5">
        {useCases.map((item) => (
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
