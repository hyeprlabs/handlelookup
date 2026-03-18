import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { SectionShell } from "@/components/features/api/section-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Requirement
            </TableHead>
            <TableHead className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              DIY
            </TableHead>
            <TableHead className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Handle Lookup
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparisons.map((row) => (
            <TableRow key={row.point}>
              <TableCell className="py-4">
                <p className="text-sm font-medium">{row.point}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {row.withoutUs}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <XIcon className="mx-auto size-4 text-muted-foreground/50" />
              </TableCell>
              <TableCell className="text-center">
                <CheckIcon className="mx-auto size-4 text-emerald-500" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionShell>
  );
}
