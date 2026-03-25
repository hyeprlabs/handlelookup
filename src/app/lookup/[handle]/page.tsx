import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LookupResults } from "@/components/lookup-results";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: `@${handle} — Handle Lookup`,
    description: `Check if @${handle} is available across GitHub, Instagram, TikTok, Twitter, and 40+ platforms.`,
    robots: { index: false },
  };
}

export default async function LookupPage({ params }: Props) {
  const { handle } = await params;

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden px-4",
        "supports-[overflow:clip]:overflow-clip"
      )}
    >
      <Header />
      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border"
        )}
      >
        <LookupResults handle={handle} />
      </main>
      <Footer />
    </div>
  );
}
