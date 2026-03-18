import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { SectionShell } from "@/components/features/api/section-shell";

const comparisons = [
  {
    point: "One API call for all platforms",
    withoutUs: "N separate requests, each with different auth and schemas",
    withUs: "Single POST, unified JSON response",
  },
  {
    point: "Consistent response shape",
    withoutUs: "Parse every platform's HTML or undocumented API differently",
    withUs: "Same fields every time: platform, available, status, url",
  },
  {
    point: "Maintenance-free",
    withoutUs: "Scraping breaks when platforms change their markup",
    withUs: "We update the integrations — your code stays the same",
  },
  {
    point: "Rate limiting handled",
    withoutUs: "Hit per-platform limits, manage backoff yourself",
    withUs: "Single credit-based rate limit, predictable billing",
  },
];

export function WhySection() {
  return (
    <SectionShell
      sectionId="05"
      title="Why not build it yourself"
      description="DIY platform checking is deceptively complex. Here's what Handle Lookup replaces."
      className="my-12 md:my-16"
    >
      <div className="relative">
        <div className="grid grid-cols-[1fr_auto_auto] gap-px bg-border">
          {/* Header row */}
          <div className="bg-background px-4 py-3">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
              Requirement
            </p>
          </div>
          <div className="bg-background px-4 py-3 text-center">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
              DIY
            </p>
          </div>
          <div className="bg-background px-4 py-3 text-center">
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
              Handle Lookup
            </p>
          </div>

          {/* Data rows */}
          {comparisons.map((row) => (
            <React.Fragment key={row.point}>
              <div className="bg-background px-4 py-4">
                <p className="text-sm font-medium">{row.point}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {row.withoutUs}
                </p>
              </div>
              <div className="flex items-center justify-center bg-background px-4 py-4">
                <XIcon className="size-4 text-muted-foreground/50" />
              </div>
              <div className="flex items-center justify-center bg-background px-4 py-4">
                <CheckIcon className="size-4 text-emerald-500" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
