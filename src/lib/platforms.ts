import sherlockData from "./sherlock-data.json";

export type ErrorType = "status_code" | "message" | "response_url";
export type Category =
  | "featured"
  | "social"
  | "developer"
  | "gaming"
  | "creative"
  | "music"
  | "writing"
  | "business"
  | "other";

export interface Platform {
  name: string;
  category: Category;
  url: string;
  urlMain: string;
  urlProbe?: string;
  errorType: ErrorType;
  errorCode?: number;
  errorMsg?: string[];
  errorUrl?: string;
  headers?: Record<string, string>;
  requestMethod?: "GET" | "POST";
  requestPayload?: Record<string, unknown>;
  regexCheck?: string;
}

// ── Category Rules ──────────────────────────────────────────────────────────

// Business-first: platforms every new business founder should claim
const BUSINESS = new Set([
  "LinkedIn",
  "ProductHunt",
  "Patreon",
  "Gumroad",
  "kofi",
  "BuyMeACoffee",
  "Freelancer",
  "Trello",
  "Wix",
]);

const FEATURED = new Set([
  "GitHub",
  "Instagram",
  "Twitter",
  "TikTok",
  "YouTube",
  "Reddit",
  "Snapchat",
  "Pinterest",
  "Twitch",
  "Discord",
  "Telegram",
  "SoundCloud",
  "Medium",
  "GitLab",
  "Spotify",
  "Behance",
  "Dribbble",
  "DeviantArt",
  "HackerNews",
  "last.fm",
  "Keybase",
  "Vimeo",
  "Bluesky",
  "Codepen",
  "Linktree",
  "npm",
]);

const DEVELOPER_KEYS = [
  "github", "gitlab", "bitbucket", "npm", "pypi", "stackoverflow",
  "codepen", "replit", "hackerrank", "leetcode", "codeforces", "coderwall",
  "sourcehut", "launchpad", "bugcrowd", "hackerone", "keybase",
  "tryhackme", "hackthebox", "hackernews", "devto", "hackster", "kaggle",
  "gitea", "codeberg", "codeproject", "codewars", "exercism", "topcoder",
  "spoj", "atcoder", "jsfiddle", "ideone", "pastebin",
];

const GAMING_KEYS = [
  "twitch", "steam", "roblox", "chess", "lichess", "xbox", "playstation",
  "nintendo", "battlenet", "epicgames", "ubisoft", "origin", "gog",
  "itchio", "speedrun", "kongregate", "faceit", "battlefy", "challonge",
  "gamejolt", "newgrounds", "armorgames", "psnprofiles", "razer",
  "alienware", "esport", "gamertag", "duolingo",
];

const CREATIVE_KEYS = [
  "behance", "dribbble", "flickr", "deviantart", "artstation", "redbubble",
  "society6", "zazzle", "500px", "unsplash", "pixiv", "carbonmade",
  "coroflot", "vsco", "smugmug", "fineartamerica", "saatchiart",
  "threadless", "teepublic", "cargo", "portfoliobox", "designspiration",
];

const MUSIC_KEYS = [
  "soundcloud", "spotify", "lastfm", "bandcamp", "mixcloud", "reverbnation",
  "audiomack", "genius", "musixmatch", "beatport", "traxsource", "discogs",
  "rateyourmusic", "gaana", "anghami",
];

const WRITING_KEYS = [
  "medium", "substack", "wattpad", "goodreads", "tumblr", "wordpress",
  "livejournal", "fanfiction", "quotev", "movellas", "inkitt", "ao3",
  "blog", "ghost", "hashnode", "blogger", "weebly",
];

function getCategory(name: string, urlMain: string): Category {
  if (BUSINESS.has(name)) return "business";
  if (FEATURED.has(name)) return "featured";
  const lower = (name + " " + urlMain)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (DEVELOPER_KEYS.some((k) => lower.includes(k.replace(/[^a-z0-9]/g, "")))) return "developer";
  if (GAMING_KEYS.some((k) => lower.includes(k.replace(/[^a-z0-9]/g, "")))) return "gaming";
  if (MUSIC_KEYS.some((k) => lower.includes(k.replace(/[^a-z0-9]/g, "")))) return "music";
  if (WRITING_KEYS.some((k) => lower.includes(k.replace(/[^a-z0-9]/g, "")))) return "writing";
  if (CREATIVE_KEYS.some((k) => lower.includes(k.replace(/[^a-z0-9]/g, "")))) return "creative";
  return "social";
}

// ── Transform Sherlock data ──────────────────────────────────────────────────

type SherlockEntry = {
  errorType: string;
  errorCode?: number;
  errorMsg?: string | string[];
  errorUrl?: string;
  url: string;
  urlMain: string;
  urlProbe?: string;
  headers?: Record<string, string>;
  request_method?: string;
  request_payload?: Record<string, unknown>;
  regexCheck?: string;
  isNSFW?: boolean;
};

const rawData = sherlockData as unknown as Record<string, SherlockEntry>;

export const PLATFORMS: Platform[] = Object.entries(rawData)
  .filter(([key, p]) => key !== "$schema" && !p.isNSFW)
  .map(([name, p]) => ({
    name,
    category: getCategory(name, p.urlMain),
    url: p.url,
    urlMain: p.urlMain,
    urlProbe: p.urlProbe,
    errorType: p.errorType as ErrorType,
    errorCode: p.errorCode,
    errorMsg: p.errorMsg
      ? Array.isArray(p.errorMsg)
        ? p.errorMsg
        : [p.errorMsg]
      : undefined,
    errorUrl: p.errorUrl,
    headers: p.headers,
    requestMethod: p.request_method as "GET" | "POST" | undefined,
    requestPayload: p.request_payload,
    regexCheck: p.regexCheck,
  }))
  .sort((a, b) => {
    if (a.category === "featured" && b.category !== "featured") return -1;
    if (a.category !== "featured" && b.category === "featured") return 1;
    return a.name.localeCompare(b.name);
  });

const countOf = (cat: Category | "all") =>
  cat === "all" ? PLATFORMS.length : PLATFORMS.filter((p) => p.category === cat).length;

export const CATEGORIES: {
  id: Category | "all";
  label: string;
}[] = [
  { id: "all", label: `All (${countOf("all")})` },
  { id: "featured", label: `Featured (${countOf("featured")})` },
  { id: "business", label: `Business (${countOf("business")})` },
  { id: "social", label: `Social (${countOf("social")})` },
  { id: "developer", label: `Developer (${countOf("developer")})` },
  { id: "gaming", label: `Gaming (${countOf("gaming")})` },
  { id: "creative", label: `Creative (${countOf("creative")})` },
  { id: "music", label: `Music (${countOf("music")})` },
  { id: "writing", label: `Writing (${countOf("writing")})` },
  { id: "other", label: `Other (${countOf("other")})` },
];
