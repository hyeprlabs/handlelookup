import type { Metadata } from "next";
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
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Features — Username Availability API",
  description:
    "One API call checks 65+ platforms instantly. Predictable JSON responses, no per-platform rate limit headaches, and coverage of all major social and developer platforms.",
  alternates: { canonical: "https://handlelookup.com/features" },
};

export default function FeaturesPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://handlelookup.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Features",
                  item: "https://handlelookup.com/features",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Handle Lookup work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Send a single API request with a username and list of platforms. Handle Lookup returns structured JSON with per-platform availability status, a readable status label, and a direct profile URL — all in one response.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which platforms does Handle Lookup support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Handle Lookup supports 65+ platforms including Instagram, TikTok, X/Twitter, Facebook, YouTube, Twitch, GitHub, GitLab, LinkedIn, SoundCloud, Steam, and many more across social, video, developer, professional, music, and gaming categories.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why use Handle Lookup instead of building your own solution?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Building your own username availability checker requires N separate API requests with different auth and schemas, parsing each platform's HTML or undocumented APIs, handling per-platform rate limits, and maintaining integrations as platforms change. Handle Lookup replaces all of that with a single POST endpoint, a unified JSON response, and maintenance-free integrations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does the API response look like?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each platform result contains: platform (the social network identifier), available (boolean — true when the handle can be claimed), status (readable label such as 'available' or 'taken'), and url (direct profile URL for verification).",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the use cases for Handle Lookup?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Common use cases include: signup flows (show live handle availability as users register), brand launches (verify name availability across all social channels before launch), creator tools (help creators find consistent handles across platforms), and developer utilities (build CLI tools or dashboards that surface username data).",
                  },
                },
              ],
            },
          ],
        }}
      />
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
                <Link href="/pricing">
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
