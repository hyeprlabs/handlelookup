import { CheckCircle2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "@/components/features/api/section-shell";

const responseItems = [
  {
    field: "platform",
    details: "The social network being checked, for example x or instagram.",
  },
  {
    field: "available",
    details: "Boolean value: true when the handle can be claimed.",
  },
  {
    field: "status",
    details: "Readable status label such as available or taken.",
  },
  {
    field: "url",
    details: "Direct profile URL for quick manual verification.",
  },
];

export function ResponseFieldsSection() {
  return (
    <SectionShell
      title="Response Fields"
      description="Each platform result includes a small, predictable set of fields for easy rendering."
      className="mt-12 mb-32 md:mt-16"
      sectionId="04"
    >
      <div className="grid gap-4 p-4 md:p-5">
        <Card className="gap-0 p-0">
          <CardHeader className="border-b px-4 py-3">
            <CardTitle>What you get back</CardTitle>
            <CardDescription>
              Use these fields to display clear availability status in your
              product.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 px-4 py-3 md:grid-cols-2">
            {responseItems.map((item) => (
              <div
                key={item.field}
                className="rounded-xl border bg-secondary/20 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-muted-foreground" />
                  <p className="font-mono text-xs text-foreground">
                    {item.field}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">{item.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
