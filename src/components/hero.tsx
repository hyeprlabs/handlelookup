import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { LookupForm } from "@/components/lookup-form";

export function HeroSection() {
  return (
    <section>
      <div className="relative flex flex-col items-center justify-center gap-5 px-6 py-14 md:px-8 md:py-24 lg:py-28">
        {/* Faded borders & radial gradient */}
        <div aria-hidden="true" className="absolute inset-0 -z-1 size-full overflow-hidden">
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
          Find Available Handles Across Platforms
        </h1>

        <p
          className={cn(
            "max-w-md text-center text-muted-foreground text-sm tracking-wider sm:text-base",
            "fade-in slide-in-from-bottom-6 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
          )}
        >
          Enter a username once and instantly see where it&apos;s available across hundreds of platforms.
        </p>

        <LookupForm />
      </div>

      {/* Bottom decorative divider */}
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <FullWidthDivider position="top" />
      </div>
    </section>
  );
}
