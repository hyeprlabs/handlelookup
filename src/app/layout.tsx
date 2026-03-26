import { RootLayoutJsonLd } from "@/app/json-ld";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";

// Metadata
import { metadata } from "@/app/metadata";

// Providers
import { Providers } from "@/app/providers";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(GeistSans.variable, GeistMono.variable, "font-sans")}>
      <body className="antialiased">
        <RootLayoutJsonLd />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
