import { PlatformsCard } from "@/components/platforms-card";

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    status: "Available",
    url: "https://www.instagram.com/hyeprlabs",
    handle: "hyeprlabs",
  },
  {
    id: "x",
    name: "X (Twitter)",
    status: "Taken",
    url: "https://x.com/hyeprlabs",
    handle: "hyeprlabs",
  },
  {
    id: "tiktok",
    name: "TikTok",
    status: "Unknown",
    url: "https://www.tiktok.com/@hyeprlabs",
    handle: "hyeprlabs",
  },
  {
    id: "youtube",
    name: "YouTube",
    status: "Available",
    url: "https://www.youtube.com/@hyeprlabs",
    handle: "hyeprlabs",
  },
  {
    id: "github",
    name: "GitHub",
    status: "Taken",
    url: "https://github.com/hyeprlabs",
    handle: "hyeprlabs",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    status: "Unknown",
    url: "https://www.linkedin.com/in/hyeprlabs",
    handle: "hyeprlabs",
  },
];

export function PlatformsGrid() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => {
          return (
            <PlatformsCard
              key={platform.id}
              name={platform.name}
              status={platform.status}
              url={platform.url}
              handle={platform.handle}
            />
          );
        })}
      </div>
    </div>
  );
}
