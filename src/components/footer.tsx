import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { InstagramIcon, LinkedinIcon } from "lucide-react";

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
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <a className="w-max" href="#">
              <Logo className="h-5" />
            </a>
            <p className="max-w-sm text-balance text-muted-foreground text-sm">
              Beautify your app with efferd.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  asChild
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="outline"
                >
                  <a href={item.link} target="_blank">
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline"
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

const company = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Brand assets",
    href: "https://hyeprlabs.com/brand",
  },
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

const resources = [
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Support",
    href: "https://hyeprlabs.com/support?app=handlelookup",
  },
  {
    title: "Contact",
    href: "https://hyeprlabs.com/contact",
  },
  {
    title: "Changelog",
    href: "https://hyeprlabs.com/changelog?app=handlelookup",
  },
  {
    title: "Security",
    href: "https://hyeprlabs.com/security",
  },
];

const socialLinks = [
  {
    icon: <XIcon />,
    link: "https://x.com/hyeprlabs",
  },
  {
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/hyeprlabs",
  },
  {
    icon: <LinkedinIcon />,
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
