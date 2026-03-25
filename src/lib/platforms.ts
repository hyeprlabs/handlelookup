export type ErrorType = "status_code" | "message" | "response_url";
export type Category =
  | "social"
  | "developer"
  | "gaming"
  | "creative"
  | "music"
  | "writing"
  | "professional";

export interface Platform {
  name: string;
  category: Category;
  url: string;        // Profile URL template, {} = username
  urlMain: string;    // Platform homepage
  errorType: ErrorType;
  errorCode?: number;      // Status code = user NOT found (default 404 for status_code type)
  errorMsg?: string[];     // Body strings = user NOT found (for message type)
  errorUrl?: string;       // Response URL fragment = user NOT found (for response_url type)
  requestHeaders?: Record<string, string>;
  usernameRegex?: string;  // Optional: regex to validate username format before checking
}

export const PLATFORMS: Platform[] = [
  // === DEVELOPER ===
  { name: "GitHub", category: "developer", url: "https://github.com/{}", urlMain: "https://github.com", errorType: "status_code" },
  { name: "GitLab", category: "developer", url: "https://gitlab.com/{}", urlMain: "https://gitlab.com", errorType: "status_code" },
  { name: "Bitbucket", category: "developer", url: "https://bitbucket.org/{}", urlMain: "https://bitbucket.org", errorType: "status_code" },
  { name: "npm", category: "developer", url: "https://www.npmjs.com/~{}", urlMain: "https://www.npmjs.com", errorType: "status_code" },
  { name: "PyPI", category: "developer", url: "https://pypi.org/user/{}/", urlMain: "https://pypi.org", errorType: "status_code" },
  { name: "Dev.to", category: "developer", url: "https://dev.to/{}", urlMain: "https://dev.to", errorType: "status_code" },
  { name: "HackerNews", category: "developer", url: "https://hn.algolia.com/api/v1/users/{}", urlMain: "https://news.ycombinator.com", errorType: "status_code" },
  { name: "CodePen", category: "developer", url: "https://codepen.io/{}", urlMain: "https://codepen.io", errorType: "status_code" },
  { name: "itch.io", category: "developer", url: "https://{}.itch.io", urlMain: "https://itch.io", errorType: "status_code" },

  // === SOCIAL ===
  {
    name: "Reddit",
    category: "social",
    url: "https://www.reddit.com/user/{}",
    urlMain: "https://www.reddit.com",
    errorType: "status_code",
  },
  {
    name: "X (Twitter)",
    category: "social",
    url: "https://x.com/{}",
    urlMain: "https://x.com",
    errorType: "status_code",
    requestHeaders: { "Accept-Language": "en-US,en;q=0.9" },
  },
  {
    name: "Instagram",
    category: "social",
    url: "https://www.instagram.com/{}/",
    urlMain: "https://www.instagram.com",
    errorType: "status_code",
  },
  {
    name: "TikTok",
    category: "social",
    url: "https://www.tiktok.com/@{}",
    urlMain: "https://www.tiktok.com",
    errorType: "status_code",
  },
  {
    name: "Pinterest",
    category: "social",
    url: "https://www.pinterest.com/{}/",
    urlMain: "https://www.pinterest.com",
    errorType: "status_code",
  },
  {
    name: "Tumblr",
    category: "social",
    url: "https://{}.tumblr.com/",
    urlMain: "https://www.tumblr.com",
    errorType: "message",
    errorMsg: ["There's nothing here.", "Not found.", "Whatever you were looking for doesn't live here"],
  },
  {
    name: "Snapchat",
    category: "social",
    url: "https://www.snapchat.com/add/{}",
    urlMain: "https://www.snapchat.com",
    errorType: "message",
    errorMsg: ["Sorry, we couldn't find", "Sorry, we can't find"],
  },
  {
    name: "Telegram",
    category: "social",
    url: "https://t.me/{}",
    urlMain: "https://telegram.org",
    errorType: "message",
    errorMsg: ["If you have Telegram, you can contact", "Sorry, this username doesn't exist"],
    usernameRegex: "^[a-zA-Z][a-zA-Z0-9_]{4,}$",
  },
  {
    name: "Mastodon",
    category: "social",
    url: "https://mastodon.social/api/v1/accounts/lookup?acct={}",
    urlMain: "https://mastodon.social",
    errorType: "status_code",
  },
  {
    name: "Bluesky",
    category: "social",
    url: "https://bsky.app/profile/{}",
    urlMain: "https://bsky.app",
    errorType: "status_code",
  },

  // === VIDEO/STREAMING ===
  {
    name: "YouTube",
    category: "social",
    url: "https://www.youtube.com/@{}",
    urlMain: "https://www.youtube.com",
    errorType: "status_code",
  },
  {
    name: "Twitch",
    category: "gaming",
    url: "https://www.twitch.tv/{}",
    urlMain: "https://www.twitch.tv",
    errorType: "status_code",
  },
  {
    name: "Vimeo",
    category: "social",
    url: "https://vimeo.com/{}",
    urlMain: "https://vimeo.com",
    errorType: "status_code",
  },

  // === MUSIC ===
  {
    name: "SoundCloud",
    category: "music",
    url: "https://soundcloud.com/{}",
    urlMain: "https://soundcloud.com",
    errorType: "status_code",
  },
  {
    name: "Last.fm",
    category: "music",
    url: "https://www.last.fm/user/{}",
    urlMain: "https://www.last.fm",
    errorType: "status_code",
  },
  {
    name: "Bandcamp",
    category: "music",
    url: "https://{}.bandcamp.com/",
    urlMain: "https://bandcamp.com",
    errorType: "status_code",
  },

  // === CREATIVE ===
  {
    name: "Behance",
    category: "creative",
    url: "https://www.behance.net/{}",
    urlMain: "https://www.behance.net",
    errorType: "status_code",
  },
  {
    name: "Dribbble",
    category: "creative",
    url: "https://dribbble.com/{}",
    urlMain: "https://dribbble.com",
    errorType: "status_code",
  },
  {
    name: "DeviantArt",
    category: "creative",
    url: "https://www.deviantart.com/{}",
    urlMain: "https://www.deviantart.com",
    errorType: "status_code",
  },
  {
    name: "Flickr",
    category: "creative",
    url: "https://www.flickr.com/people/{}/",
    urlMain: "https://www.flickr.com",
    errorType: "message",
    errorMsg: ["Oops! We couldn't find that page.", "page not found"],
  },
  {
    name: "Redbubble",
    category: "creative",
    url: "https://www.redbubble.com/people/{}/shop",
    urlMain: "https://www.redbubble.com",
    errorType: "status_code",
  },
  {
    name: "ArtStation",
    category: "creative",
    url: "https://www.artstation.com/{}",
    urlMain: "https://www.artstation.com",
    errorType: "status_code",
  },

  // === WRITING/BLOGGING ===
  {
    name: "Medium",
    category: "writing",
    url: "https://medium.com/@{}",
    urlMain: "https://medium.com",
    errorType: "status_code",
  },
  {
    name: "Substack",
    category: "writing",
    url: "https://{}.substack.com",
    urlMain: "https://substack.com",
    errorType: "status_code",
  },
  {
    name: "Wattpad",
    category: "writing",
    url: "https://www.wattpad.com/user/{}",
    urlMain: "https://www.wattpad.com",
    errorType: "status_code",
  },

  // === GAMING ===
  {
    name: "Steam",
    category: "gaming",
    url: "https://steamcommunity.com/id/{}",
    urlMain: "https://steamcommunity.com",
    errorType: "message",
    errorMsg: ["The specified profile could not be found.", "this user has not yet set up"],
  },
  {
    name: "Chess.com",
    category: "gaming",
    url: "https://www.chess.com/member/{}",
    urlMain: "https://www.chess.com",
    errorType: "status_code",
  },
  {
    name: "Lichess",
    category: "gaming",
    url: "https://lichess.org/@/{}/all",
    urlMain: "https://lichess.org",
    errorType: "status_code",
  },
  {
    name: "Roblox",
    category: "gaming",
    url: "https://www.roblox.com/user.aspx?username={}",
    urlMain: "https://www.roblox.com",
    errorType: "message",
    errorMsg: ["Profile is not found", "page does not exist"],
  },

  // === PROFESSIONAL / OTHER ===
  {
    name: "LinkedIn",
    category: "professional",
    url: "https://www.linkedin.com/in/{}/",
    urlMain: "https://www.linkedin.com",
    errorType: "status_code",
  },
  {
    name: "Keybase",
    category: "professional",
    url: "https://keybase.io/{}",
    urlMain: "https://keybase.io",
    errorType: "status_code",
  },
  {
    name: "Ko-fi",
    category: "professional",
    url: "https://ko-fi.com/{}",
    urlMain: "https://ko-fi.com",
    errorType: "status_code",
  },
  {
    name: "Patreon",
    category: "professional",
    url: "https://www.patreon.com/{}",
    urlMain: "https://www.patreon.com",
    errorType: "status_code",
  },
  {
    name: "Fiverr",
    category: "professional",
    url: "https://www.fiverr.com/{}",
    urlMain: "https://www.fiverr.com",
    errorType: "status_code",
  },
  {
    name: "Linktree",
    category: "professional",
    url: "https://linktr.ee/{}",
    urlMain: "https://linktr.ee",
    errorType: "status_code",
  },
  {
    name: "Duolingo",
    category: "professional",
    url: "https://www.duolingo.com/profile/{}",
    urlMain: "https://www.duolingo.com",
    errorType: "status_code",
  },
  {
    name: "About.me",
    category: "professional",
    url: "https://about.me/{}",
    urlMain: "https://about.me",
    errorType: "status_code",
  },
  {
    name: "Product Hunt",
    category: "professional",
    url: "https://www.producthunt.com/@{}",
    urlMain: "https://www.producthunt.com",
    errorType: "status_code",
  },
];
