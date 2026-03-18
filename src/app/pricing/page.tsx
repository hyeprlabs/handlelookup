import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CreditsSection } from "@/components/pricing/credits-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { Button } from "@/components/ui/button";

export default function Page() {
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
          title="Simple Pricing for Handle Search and API"
          description="Choose Free for lightweight checks or Pro for ad-free usage, broader platform coverage, and production-grade API volume."
          actions={
            <>
              <Button asChild>
                <Link href="/upgrade">
                  Start Pro
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/features/api">View API Docs</Link>
              </Button>
            </>
          }
        />

        <PricingSection />
        <CreditsSection />

        <Footer />
      </main>
    </div>
  );
}
