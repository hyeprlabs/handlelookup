import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AtSign, InstagramIcon, LinkedinIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-5xl",
          "dark:bg-[radial-gradient(35%_80%_at_15%_0%,--theme(--color-foreground/.1),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4 pt-8">
          {/* Brand column */}
          <div className="col-span-6 flex flex-col gap-4 md:col-span-3">
            <Link className="w-max" href="/">
              <div className="flex items-center gap-2">
                <AtSign className="size-4" />
                <span className="text-sm font-semibold">Handle Lookup</span>
              </div>
            </Link>
            <p className="max-w-sm text-balance text-muted-foreground text-sm">
              Check username availability across GitHub, Twitter, Instagram,
              TikTok, and 60+ more platforms with a single API call.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  asChild
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="outline"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div className="col-span-2 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Product
            </span>
            <div className="mt-3 flex flex-col gap-2">
              {product.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline text-foreground/80 hover:text-foreground transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div className="col-span-2 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Company
            </span>
            <div className="mt-3 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline text-foreground/80 hover:text-foreground transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Legal column */}
          <div className="col-span-2 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Legal
            </span>
            <div className="mt-3 flex flex-col gap-2">
              {legal.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline text-foreground/80 hover:text-foreground transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-mono text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Hyepr Labs UG, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

const product = [
  { title: "Features", href: "/features" },
  { title: "API Docs", href: "/features/api" },
  { title: "Blog", href: "/blog" },
  { title: "Pricing", href: "/pricing" },
  {
    title: "Changelog",
    href: "https://hyeprlabs.com/changelog?app=handlelookup",
  },
];

const company = [
  { title: "About", href: "https://hyeprlabs.com" },
  { title: "Brand assets", href: "https://hyeprlabs.com/brand" },
  { title: "Support", href: "https://hyeprlabs.com/support?app=handlelookup" },
  { title: "Contact", href: "https://hyeprlabs.com/contact" },
  { title: "Security", href: "https://hyeprlabs.com/security" },
];

const legal = [
  {
    title: "Imprint",
    href: "https://hyeprlabs.com/legal/imprint?app=handlelookup",
  },
  {
    title: "Privacy Policy",
    href: "https://hyeprlabs.com/legal/privacy-policy?app=handlelookup",
  },
  {
    title: "Terms of Service",
    href: "https://hyeprlabs.com/legal/terms-of-service?app=handlelookup",
  },
];

const socialLinks = [
  { icon: <XIcon className="size-3.5" />, link: "https://x.com/hyeprlabs" },
  {
    icon: <InstagramIcon className="size-3.5" />,
    link: "https://www.instagram.com/hyeprlabs",
  },
  {
    icon: <LinkedinIcon className="size-3.5" />,
    link: "https://www.linkedin.com/company/hyeprlabs",
  },
];

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
  );
}
