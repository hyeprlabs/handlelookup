import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header"; // @efferd/header-2
import { HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Check Username Availability Across 65+ Platforms",
  description:
    "Enter a username once and instantly see availability across GitHub, Twitter, Instagram, TikTok, and 60+ platforms. Free to try, API access available.",
  alternates: { canonical: "https://handlelookup.com" },
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": "https://handlelookup.com/#app",
          name: "Handle Lookup",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          url: "https://handlelookup.com",
          description:
            "Instantly check if a username is available across GitHub, Twitter, Instagram, TikTok, and 60+ more platforms with a single API call.",
          featureList: [
            "Check username availability across 65+ platforms",
            "Single API call for all platforms",
            "Results in milliseconds",
            "Consistent JSON response format",
            "No maintenance burden",
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Free",
              price: "0",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Pro",
              priceCurrency: "USD",
              url: "https://handlelookup.com/pricing",
            },
          ],
          publisher: { "@id": "https://handlelookup.com/#organization" },
        }}
      />
      <Header />
      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection />
        <LogosSection />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
