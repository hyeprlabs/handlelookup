import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { OverviewSection } from "@/components/features/overview-section";
import { HowItWorksSection } from "@/components/features/how-it-works-section";
import { UseCasesSection } from "@/components/features/use-cases-section";
import { PlatformCoverageSection } from "@/components/features/platform-coverage-section";
import { WhySection } from "@/components/features/why-section";

export default function FeaturesPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />

      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection
          title="Everything Handle Lookup does"
          description="Username availability checking for any platform, from a single API. Here's what that means for your product."
          actions={
            <>
              <Button asChild>
                <Link href="/upgrade">
                  Get started free
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/features/api">View API docs</Link>
              </Button>
            </>
          }
        />

        <OverviewSection />
        <HowItWorksSection />
        <UseCasesSection />
        <PlatformCoverageSection />
        <WhySection />

        <Footer />
      </main>
    </div>
  );
}
