import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type SectionShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  sectionId?: string;
};

export function SectionShell({
  title,
  description,
  children,
  className,
  sectionId,
}: SectionShellProps) {
  return (
    <section className={cn("relative mx-auto w-full max-w-5xl", className)}>
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <FullWidthDivider className="-top-px" />

      <div className="border-b bg-linear-to-b from-secondary/35 via-secondary/10 to-transparent px-3 py-10 md:px-4">
        {sectionId ? (
          <p className="mb-2 text-center font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
            {sectionId}
          </p>
        ) : null}
        <h2 className="text-center font-semibold text-xl md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-balance text-center text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      </div>

      {children}

      <FullWidthDivider className="-bottom-px" />
    </section>
  );
}
