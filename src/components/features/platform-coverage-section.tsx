import { SectionShell } from "@/components/features/api/section-shell";

const platformGroups = [
  {
    category: "Social",
    platforms: [
      "Instagram",
      "TikTok",
      "X / Twitter",
      "Facebook",
      "Snapchat",
      "Pinterest",
      "Threads",
      "BeReal",
    ],
  },
  {
    category: "Video",
    platforms: ["YouTube", "Twitch", "Vimeo", "Dailymotion", "Rumble", "Kick"],
  },
  {
    category: "Developer",
    platforms: [
      "GitHub",
      "GitLab",
      "npm",
      "PyPI",
      "Replit",
      "Dev.to",
      "Hashnode",
    ],
  },
  {
    category: "Professional",
    platforms: [
      "LinkedIn",
      "AngelList",
      "Product Hunt",
      "Behance",
      "Dribbble",
      "Contra",
    ],
  },
  {
    category: "Music & Audio",
    platforms: ["SoundCloud", "Spotify", "Last.fm", "Bandcamp", "Apple Music"],
  },
  {
    category: "Gaming",
    platforms: [
      "Steam",
      "Xbox",
      "PlayStation",
      "Chess.com",
      "Lichess",
      "Roblox",
    ],
  },
];

export function PlatformCoverageSection() {
  return (
    <SectionShell
      sectionId="04"
      title="65+ platforms covered"
      description="A growing library of social, developer, gaming, and professional platforms — all queryable from a single endpoint."
      className="mt-12 md:mt-16"
    >
      <div className="relative">
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
          {platformGroups.map((group) => (
            <div key={group.category} className="bg-background px-4 py-5">
              <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                {group.category}
              </p>
              <ul className="space-y-1.5">
                {group.platforms.map((platform) => (
                  <li key={platform} className="text-sm text-foreground/80">
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-background px-4 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            + many more. New platforms added regularly.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
