import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroSectionProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function HeroSection({
  title,
  description,
  actions,
  className,
}: HeroSectionProps) {
  return (
    <section className={className}>
      <div className="relative flex flex-col items-center justify-center gap-5 px-4 py-12 md:px-4 md:py-24 lg:py-28">
        {/* X Faded Borders & Shades */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div
            className={cn(
              "absolute -inset-x-20 inset-y-0 z-0 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.1),transparent,transparent)]",
              "blur-[50px]",
            )}
          />
          <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
          <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
          <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
          <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        </div>

        <h1
          className={cn(
            "max-w-2xl text-balance text-center text-3xl text-foreground md:text-5xl lg:text-6xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
          )}
        >
          {title}
        </h1>

        <p
          className={cn(
            "text-center text-muted-foreground text-sm tracking-wider sm:text-lg max-w-2xl",
            "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
          )}
        >
          {description}
        </p>

        {actions ? (
          <div className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-2 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
