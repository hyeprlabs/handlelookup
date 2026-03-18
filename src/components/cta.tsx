import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-between mb-36">
      <FullWidthDivider className="-top-px" />
      <div className="border-b px-2 py-8">
        <h2 className="text-center font-semibold text-lg md:text-2xl">
          Build faster with the Handle Lookup API
        </h2>
        <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
          Check handle availability in milliseconds, reduce friction, and ship a
          smoother coding flow.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 bg-secondary/80 p-4 dark:bg-secondary/40">
        <Button asChild variant="outline">
          <Link href="/feature/api">Learn More</Link>
        </Button>
        <Button asChild>
          <Link href="/upgrade">
            Get API Access
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}
