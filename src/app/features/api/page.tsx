import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { GettingStarted } from "@/components/features/api/getting-started";
import { FeaturesSection } from "@/components/features/api/features-section";
import { RequestFormatSection } from "@/components/features/api/request-format-section";
import { ResponseFieldsSection } from "@/components/features/api/response-fields-section";
import { Button } from "@/components/ui/button";

export default function ApiFeaturePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />

      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection
          title="Handle Lookup API"
          description="Check username availability across multiple social platforms with one request and return clean, predictable results for your app."
          actions={
            <>
              <Button asChild>
                <Link href="/upgrade">
                  Get API Access
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </>
          }
        />
        <GettingStarted />
        <FeaturesSection />
        <RequestFormatSection />
        <ResponseFieldsSection />

        <Footer />
      </main>
    </div>
  );
}
